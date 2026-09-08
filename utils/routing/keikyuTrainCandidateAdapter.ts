import type { RailwayNodeId } from "./types";
import type { TrainCandidate } from "./trainResolverTypes";

export type KeikyuTimetableEntry = {
  id: string;
  operator?: string;
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

type BuildKeikyuTrainCandidatesParams = {
  lineId: string;
  fromNodeId: RailwayNodeId;
  fromStationId: string;
  toNodeId: RailwayNodeId;
  toStationId: string;
  originTimetable: KeikyuTimetableEntry[];
  destinationTimetable: KeikyuTimetableEntry[];
};

const KEIKYU_API_LINE_IDS: Record<string, string> = {
  "keikyu-main": "main",
  "keikyu-airport": "airport",
};

export const getKeikyuApiLineId = (
  guideLineId: string,
): string | null => {
  return KEIKYU_API_LINE_IDS[guideLineId] ?? null;
};

const isSameKeikyuLine = (
  timetableLineId: string,
  guideLineId: string,
) => {
  const apiLineId = getKeikyuApiLineId(guideLineId);

  return (
    timetableLineId === guideLineId ||
    timetableLineId === apiLineId
  );
};

export const buildKeikyuTrainCandidates = ({
  lineId,
  fromNodeId,
  fromStationId,
  toNodeId,
  toStationId,
  originTimetable,
  destinationTimetable,
}: BuildKeikyuTrainCandidatesParams): TrainCandidate[] => {
  const candidates: TrainCandidate[] = [];

  for (const origin of originTimetable) {
    if (!origin.trainNumber) continue;
    if (!isSameKeikyuLine(origin.lineId, lineId)) continue;

    const destination = destinationTimetable.find(
      (item) =>
        isSameKeikyuLine(item.lineId, lineId) &&
        item.trainNumber === origin.trainNumber,
    );

    if (!destination) continue;

    const candidate: TrainCandidate = {
      id: `keikyu:${lineId}:${origin.trainNumber}:${fromStationId}:${toStationId}`,
      lineId,
      fromNodeId,
      fromStationId,
      toNodeId,
      toStationId,
      departureTime: origin.departureTime,
      arrivalTime: destination.departureTime,
      trainType: origin.trainType ?? "unknown",
      trainTypeKo: origin.trainTypeKo,
      trainTypeJa: origin.trainTypeJa,
      trainNumber: origin.trainNumber,
      destinationKo: origin.destinationKo,
      destinationJa: origin.destinationJa,
      stopsAtDestination: true,
      status: "unknown",
    };

    candidates.push(candidate);
  }

  return candidates;
};
