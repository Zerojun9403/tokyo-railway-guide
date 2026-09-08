import type { TrainCandidate } from "./trainResolverTypes";
import type { RailwayNodeId } from "./types";

type SeibuTimetableEntry = {
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

const SEIBU_API_LINE_IDS: Record<string, string> = {
  "seibu-ikebukuro": "ikebukuro",
  "seibu-shinjuku": "shinjuku",
};

export const getSeibuApiLineId = (
  guideLineId: string,
): string | null => {
  return SEIBU_API_LINE_IDS[guideLineId] ?? null;
};

export const adaptSeibuTimetableToTrainCandidates = ({
  lineId,
  fromNodeId,
  toNodeId,
  fromStationId,
  toStationId,
  originTimetable,
  destinationTimetable,
}: {
  lineId: string;
  fromNodeId: RailwayNodeId;
  toNodeId: RailwayNodeId;
  fromStationId: string;
  toStationId: string;
  originTimetable: SeibuTimetableEntry[];
  destinationTimetable: SeibuTimetableEntry[];
}): TrainCandidate[] => {
  const apiLineId = getSeibuApiLineId(lineId);

  if (!apiLineId) {
    return [];
  }

  return originTimetable.flatMap((origin) => {
    if (!origin.trainNumber) {
      return [];
    }

    const destination = destinationTimetable.find(
      (item) =>
        item.lineId === apiLineId &&
        item.trainNumber === origin.trainNumber,
    );

    if (!destination) {
      return [];
    }

    return [
      {
        id: `seibu:${lineId}:${origin.trainNumber}:${fromStationId}:${toStationId}`,
        lineId,
        fromNodeId,
        toNodeId,
        fromStationId,
        toStationId,
        departureTime: origin.departureTime,
        arrivalTime: destination.departureTime,
        trainType: origin.trainType ?? "Unknown",
        trainTypeKo: origin.trainTypeKo,
        trainTypeJa: origin.trainTypeJa,
        trainNumber: origin.trainNumber,
        destinationKo: origin.destinationKo,
        destinationJa: origin.destinationJa,
        stopsAtDestination: true,
        status: "unknown",
      },
    ];
  });
};
