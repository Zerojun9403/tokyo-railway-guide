import type { RailwayNodeId } from "./types";
import type { TrainCandidate } from "./trainResolverTypes";

export type TokyoMetroTimetableEntry = {
  id: string;

  lineId: string;
  stationId: string;
  directionId: string;

  departureTime: string;

  trainType?: string;
  trainTypeKo?: string;
  trainTypeJa?: string;

  trainNumber?: string;

  destinationStation?: string;
  destinationKo?: string;
  destinationJa?: string;
};

type BuildTokyoMetroTrainCandidatesParams = {
  lineId: string;

  fromNodeId: RailwayNodeId;
  fromStationId: string;

  toNodeId: RailwayNodeId;
  toStationId: string;

  originTimetable: TokyoMetroTimetableEntry[];
  destinationTimetable: TokyoMetroTimetableEntry[];
};

const toServiceMinutes = (time: string): number => {
  const [hourText, minuteText] = time.split(":");
  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (!Number.isFinite(hour) || !Number.isFinite(minute)) {
    return Number.POSITIVE_INFINITY;
  }

  return (hour < 3 ? hour + 24 : hour) * 60 + minute;
};

export const buildTokyoMetroTrainCandidates = ({
  lineId,
  fromNodeId,
  fromStationId,
  toNodeId,
  toStationId,
  originTimetable,
  destinationTimetable,
}: BuildTokyoMetroTrainCandidatesParams): TrainCandidate[] => {
  const candidates: TrainCandidate[] = [];

  for (const origin of originTimetable) {
    if (!origin.trainNumber) {
      continue;
    }

    if (origin.lineId !== lineId) {
      continue;
    }

    /*
     * Tokyo Metro는 동일 trainNumber가 목적지역 시간표에 실제로 존재할 때만
     * 같은 열차로 확정한다.
     *
     * trainNumber가 없는 경우를 위한 시간/종별/행선지 휴리스틱은 막차 계산에서
     * 다른 열차를 같은 열차로 오인할 수 있으므로 사용하지 않는다.
     */
    const matchedDestination = destinationTimetable.find(
      (item) =>
        item.lineId === lineId &&
        item.directionId === origin.directionId &&
        item.trainNumber === origin.trainNumber &&
        toServiceMinutes(item.departureTime) >=
          toServiceMinutes(origin.departureTime),
    );

    if (!matchedDestination) {
      continue;
    }

    /*
     * 종착역 정보가 양쪽 시간표에 모두 있고 서로 다르면 동일 열차로 보지 않는다.
     * 예: 우에노 종착 열차를 아사쿠사까지 가는 열차로 만드는 오매칭 방지.
     */
    if (
      origin.destinationStation &&
      matchedDestination.destinationStation &&
      origin.destinationStation !== matchedDestination.destinationStation
    ) {
      continue;
    }

    const candidate: TrainCandidate = {
      id: `tokyo-metro:${lineId}:${origin.trainNumber}:${fromStationId}:${toStationId}`,

      lineId,

      fromNodeId,
      fromStationId,

      toNodeId,
      toStationId,

      departureTime: origin.departureTime,

      // 현재는 목적지역 StationTimetable의 departureTime을
      // station-time estimate로 사용한다.
      arrivalTime: matchedDestination.departureTime,

      trainType: origin.trainType ?? "unknown",

      trainTypeKo: origin.trainTypeKo,
      trainTypeJa: origin.trainTypeJa,

      trainNumber: origin.trainNumber,

      destinationKo: origin.destinationKo,
      destinationJa: origin.destinationJa,

      // 동일 trainNumber가 목적지역 시간표에도 있으므로
      // 해당 열차의 목적지역 정차가 확인된 상태다.
      stopsAtDestination: true,

      // StationTimetable만으로 지연/취소 여부는 판단하지 않는다.
      status: "unknown",
    };

    candidates.push(candidate);
  }

  return candidates;
};
