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

    const destination = destinationTimetable.find(
      (item) =>
        item.lineId === lineId &&
        item.directionId === origin.directionId &&
        item.trainNumber === origin.trainNumber,
    );

    let matchedDestination = destination;

    if (!matchedDestination) {
      const originMinutes = toServiceMinutes(origin.departureTime);

      matchedDestination = destinationTimetable
        .filter(
          (item) =>
            item.lineId === lineId &&
            item.directionId === origin.directionId &&
            (!origin.trainType ||
              !item.trainType ||
              item.trainType === origin.trainType) &&
            (!origin.destinationStation ||
              !item.destinationStation ||
              item.destinationStation === origin.destinationStation) &&
            toServiceMinutes(item.departureTime) >= originMinutes &&
            toServiceMinutes(item.departureTime) - originMinutes <= 180,
        )
        .sort(
          (a, b) =>
            toServiceMinutes(a.departureTime) -
            toServiceMinutes(b.departureTime),
        )[0];
    }

    if (!matchedDestination) {
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
