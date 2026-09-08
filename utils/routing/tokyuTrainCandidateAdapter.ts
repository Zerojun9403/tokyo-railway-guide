import type { RailwayNodeId } from "./types";
import type { TrainCandidate } from "./trainResolverTypes";

export type TokyuTimetableEntry = {
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

type BuildTokyuTrainCandidatesParams = {
  lineId: string;

  fromNodeId: RailwayNodeId;
  fromStationId: string;

  toNodeId: RailwayNodeId;
  toStationId: string;

  originTimetable: TokyuTimetableEntry[];
  destinationTimetable: TokyuTimetableEntry[];
};

const TOKYU_API_LINE_IDS: Record<string, string> = {
  "tokyu-toyoko": "toyoko",
  "tokyu-meguro": "meguro",
  "tokyu-den-en-toshi": "den-en-toshi",
  "tokyu-oimachi": "oimachi",
  "tokyu-shin-yokohama": "tokyu-shin-yokohama",
};

export const getTokyuApiLineId = (
  guideLineId: string,
): string | null => {
  return TOKYU_API_LINE_IDS[guideLineId] ?? null;
};

const isSameTokyuLine = (
  timetableLineId: string,
  guideLineId: string,
) => {
  const apiLineId = getTokyuApiLineId(guideLineId);

  return (
    timetableLineId === guideLineId ||
    timetableLineId === apiLineId
  );
};

export const buildTokyuTrainCandidates = ({
  lineId,
  fromNodeId,
  fromStationId,
  toNodeId,
  toStationId,
  originTimetable,
  destinationTimetable,
}: BuildTokyuTrainCandidatesParams): TrainCandidate[] => {
  const candidates: TrainCandidate[] = [];

  for (const origin of originTimetable) {
    if (!origin.trainNumber) {
      continue;
    }

    if (!isSameTokyuLine(origin.lineId, lineId)) {
      continue;
    }

    const destination = destinationTimetable.find(
      (item) =>
        isSameTokyuLine(item.lineId, lineId) &&
        item.trainNumber === origin.trainNumber,
    );

    if (!destination) {
      continue;
    }

    const candidate: TrainCandidate = {
      id: `tokyu:${lineId}:${origin.trainNumber}:${fromStationId}:${toStationId}`,

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
