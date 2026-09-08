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
        item.trainNumber === origin.trainNumber,
    );

    if (!destination) {
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
      arrivalTime: destination.departureTime,

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