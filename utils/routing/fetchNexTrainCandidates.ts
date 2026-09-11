import type { JourneySegment } from "./journeyTypes";
import type { TrainCandidate } from "./trainResolverTypes";

type NexStop = {
  station: string;
  arrivalTime?: string;
  departureTime?: string;
  railway: string;
};

type NexBranch = {
  id: string;
  trainNumber: string;
  originStation?: string;
  joinStation: "Tokyo";
  stops: NexStop[];
};

type NexCommonSection = {
  trainNumber: string;
  fromStation: "Tokyo";
  destinationStation?: string;
  stops: NexStop[];
};

type NexService = {
  operator: "jr-east";
  service: "narita-express";
  primaryTrainNumber: string;
  connectedTrainNumbers: string[];
  branches: NexBranch[];
  commonSection: NexCommonSection;
};

type NexApiResponse = {
  ok: boolean;
  trainNumber?: string;
  service?: NexService;
  message?: string;
};

type NexDiscoveryResponse = {
  ok: boolean;
  count?: number;
  trainNumbers?: string[];
  message?: string;
};

type FetchNexTrainCandidatesParams = {
  segment: JourneySegment;
  apiBaseUrl: string;
  trainNumber?: string;
};

const normalizeBaseUrl = (value: string): string =>
  value.replace(/\/+$/, "");

const normalizeStationKey = (value: string): string =>
  value
    .toLowerCase()
    .replace(/^odpt\.station:[^.]+\.[^.]+\./, "")
    .replace(/[^a-z0-9]/g, "");

const matchesStation = (stopStation: string, stationId: string): boolean => {
  const stopKey = normalizeStationKey(stopStation);
  const stationKey = normalizeStationKey(stationId);

  return (
    stopKey === stationKey ||
    stationKey.endsWith(stopKey) ||
    stopKey.endsWith(stationKey)
  );
};

const findStop = (stops: NexStop[], stationId: string): NexStop | undefined =>
  stops.find((stop) => matchesStation(stop.station, stationId));

const getDepartureTime = (stop?: NexStop): string | undefined =>
  stop?.departureTime ?? stop?.arrivalTime;

const getArrivalTime = (stop?: NexStop): string | undefined =>
  stop?.arrivalTime ?? stop?.departureTime;

const createCandidate = ({
  segment,
  trainNumber,
  departureTime,
  arrivalTime,
}: {
  segment: JourneySegment;
  trainNumber: string;
  departureTime: string;
  arrivalTime: string;
}): TrainCandidate => ({
  id: `nex:${trainNumber}:${segment.fromStationId}:${segment.toStationId}`,
  lineId: segment.lineId,
  fromNodeId: segment.fromNodeId,
  fromStationId: segment.fromStationId,
  toNodeId: segment.toNodeId,
  toStationId: segment.toStationId,
  departureTime,
  arrivalTime,
  trainType: "limited-express",
  trainTypeKo: "나리타 익스프레스",
  trainTypeJa: "成田エクスプレス",
  trainNumber,
  destinationKo: "나리타공항",
  destinationJa: "成田空港",
  stopsAtDestination: true,
  status: "normal",
});

const buildCandidatesFromService = (
  segment: JourneySegment,
  service: NexService,
): TrainCandidate[] => {
  const candidates: TrainCandidate[] = [];

  // Branch only: e.g. Shinjuku -> Tokyo, Yokohama -> Tokyo.
  for (const branch of service.branches) {
    const fromStop = findStop(branch.stops, segment.fromStationId);
    const toStop = findStop(branch.stops, segment.toStationId);
    const departureTime = getDepartureTime(fromStop);
    const arrivalTime = getArrivalTime(toStop);

    if (departureTime && arrivalTime) {
      candidates.push(
        createCandidate({
          segment,
          trainNumber: branch.trainNumber,
          departureTime,
          arrivalTime,
        }),
      );
    }
  }

  // Common section only: e.g. Tokyo -> Narita Airport.
  {
    const fromStop = findStop(
      service.commonSection.stops,
      segment.fromStationId,
    );
    const toStop = findStop(
      service.commonSection.stops,
      segment.toStationId,
    );
    const departureTime = getDepartureTime(fromStop);
    const arrivalTime = getArrivalTime(toStop);

    if (departureTime && arrivalTime) {
      candidates.push(
        createCandidate({
          segment,
          trainNumber: service.commonSection.trainNumber,
          departureTime,
          arrivalTime,
        }),
      );
    }
  }

  // Branch + common section: e.g. Shinjuku/Yokohama -> Narita Airport.
  //
  // Tokyo는 branch의 합류역이므로 cross-section 후보를 만들지 않는다.
  // 그렇지 않으면 commonSection의 Tokyo departureTime(예: 06:18)이
  // Shinjuku -> Tokyo의 arrivalTime으로 잘못 사용될 수 있다.
  if (normalizeStationKey(segment.toStationId) !== "tokyo") {
    for (const branch of service.branches) {
      const fromStop = findStop(branch.stops, segment.fromStationId);
      const toStop = findStop(
        service.commonSection.stops,
        segment.toStationId,
      );
      const departureTime = getDepartureTime(fromStop);
      const arrivalTime = getArrivalTime(toStop);

      if (departureTime && arrivalTime) {
        candidates.push(
          createCandidate({
            segment,
            trainNumber: `${branch.trainNumber}/${service.commonSection.trainNumber}`,
            departureTime,
            arrivalTime,
          }),
        );
      }
    }
  }

  return candidates;
};

const fetchService = async (
  apiBaseUrl: string,
  trainNumber: string,
): Promise<NexService | undefined> => {
  const url = new URL(`${normalizeBaseUrl(apiBaseUrl)}/api/nex-test`);
  url.searchParams.set("trainNumber", trainNumber);

  const response = await fetch(url.toString());

  if (!response.ok) {
    return undefined;
  }

  const data = (await response.json()) as NexApiResponse;

  return data.ok ? data.service : undefined;
};

const discoverTrainNumbers = async (
  apiBaseUrl: string,
): Promise<string[]> => {
  const url = new URL(`${normalizeBaseUrl(apiBaseUrl)}/api/nex-discovery`);
  const response = await fetch(url.toString());

  if (!response.ok) {
    return [];
  }

  const data = (await response.json()) as NexDiscoveryResponse;

  if (!data.ok || !Array.isArray(data.trainNumbers)) {
    return [];
  }

  return data.trainNumbers;
};

const dedupeCandidates = (
  candidates: TrainCandidate[],
): TrainCandidate[] => {
  const seen = new Set<string>();

  return candidates.filter((candidate) => {
    const key = [
      candidate.lineId,
      candidate.fromStationId,
      candidate.toStationId,
      candidate.departureTime,
      candidate.arrivalTime,
      candidate.trainNumber ?? "",
    ].join("|");

    if (seen.has(key)) {
      return false;
    }

    seen.add(key);
    return true;
  });
};

export const fetchNexTrainCandidates = async ({
  segment,
  apiBaseUrl,
  trainNumber,
}: FetchNexTrainCandidatesParams): Promise<TrainCandidate[]> => {
  /*
   * Explicit trainNumber remains available for diagnostics and focused tests.
   * Production callers can omit it and discover today's outbound N'EX services.
   */
  if (trainNumber) {
    const service = await fetchService(apiBaseUrl, trainNumber);

    return service
      ? buildCandidatesFromService(segment, service)
      : [];
  }

  const trainNumbers = await discoverTrainNumbers(apiBaseUrl);
  const candidates: TrainCandidate[] = [];

  /*
   * Keep requests sequential. The ODPT-backed API previously returned empty
   * response bodies when many N'EX service requests were fired in parallel.
   */
  for (const discoveredTrainNumber of trainNumbers) {
    const service = await fetchService(
      apiBaseUrl,
      discoveredTrainNumber,
    );

    if (!service) {
      continue;
    }

    candidates.push(
      ...buildCandidatesFromService(segment, service),
    );
  }

  return dedupeCandidates(candidates);
};
