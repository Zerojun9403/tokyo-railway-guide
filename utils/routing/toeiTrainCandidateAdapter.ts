import type { RailwayNodeId } from "./types";
import type { TrainCandidate } from "./trainResolverTypes";

export type ToeiTimetableEntry = {
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

type BuildToeiTrainCandidatesParams = {
  lineId: string;

  fromNodeId: RailwayNodeId;
  fromStationId: string;

  toNodeId: RailwayNodeId;
  toStationId: string;

  originTimetable: ToeiTimetableEntry[];
  destinationTimetable: ToeiTimetableEntry[];
};

export const buildToeiTrainCandidates = ({
  lineId,
  fromNodeId,
  fromStationId,
  toNodeId,
  toStationId,
  originTimetable,
  destinationTimetable,
}: BuildToeiTrainCandidatesParams): TrainCandidate[] => {
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

    candidates.push({
      id: `toei:${lineId}:${origin.trainNumber}:${fromStationId}:${toStationId}`,

      lineId,

      fromNodeId,
      fromStationId,

      toNodeId,
      toStationId,

      departureTime: origin.departureTime,

      // 목적지역 StationTimetable의 같은 열차 시간을
      // 도착 시각 추정값으로 사용한다.
      arrivalTime: destination.departureTime,

      trainType: origin.trainType ?? "unknown",

      trainTypeKo: origin.trainTypeKo,
      trainTypeJa: origin.trainTypeJa,

      trainNumber: origin.trainNumber,

      destinationKo: origin.destinationKo,
      destinationJa: origin.destinationJa,

      // 출발역과 목적지역 양쪽에서 같은 trainNumber가
      // 확인된 열차만 Candidate로 만든다.
      stopsAtDestination: true,

      status: "unknown",
    });
  }

  return candidates;
};