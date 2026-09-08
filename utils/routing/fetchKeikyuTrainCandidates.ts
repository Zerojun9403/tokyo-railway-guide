import {
  buildKeikyuTrainCandidates,
  getKeikyuApiLineId,
  type KeikyuTimetableEntry,
} from "./keikyuTrainCandidateAdapter";
import type { TrainCandidate } from "./trainResolverTypes";
import type { RailwayNodeId } from "./types";

type FetchKeikyuTrainCandidatesParams = {
  apiBaseUrl: string;
  lineId: string;
  directionId: string;
  fromNodeId: RailwayNodeId;
  fromStationId: string;
  toNodeId: RailwayNodeId;
  toStationId: string;
};

const fetchTimetable = async ({
  apiBaseUrl,
  lineId,
  stationId,
  directionId,
}: {
  apiBaseUrl: string;
  lineId: string;
  stationId: string;
  directionId: string;
}): Promise<KeikyuTimetableEntry[]> => {
  const params = new URLSearchParams({
    operator: "keikyu",
    lineId,
    stationId,
    directionId,
  });

  const response = await fetch(
    `${apiBaseUrl}/api/timetable?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(
      `Keikyu timetable request failed: ${response.status}`,
    );
  }

  return (await response.json()) as KeikyuTimetableEntry[];
};

export const fetchKeikyuTrainCandidates = async ({
  apiBaseUrl,
  lineId,
  directionId,
  fromNodeId,
  fromStationId,
  toNodeId,
  toStationId,
}: FetchKeikyuTrainCandidatesParams): Promise<TrainCandidate[]> => {
  const apiLineId = getKeikyuApiLineId(lineId);

  if (!apiLineId) {
    return [];
  }

  const [originTimetable, destinationTimetable] = await Promise.all([
    fetchTimetable({
      apiBaseUrl,
      lineId: apiLineId,
      stationId: fromStationId,
      directionId,
    }),
    fetchTimetable({
      apiBaseUrl,
      lineId: apiLineId,
      stationId: toStationId,
      directionId,
    }),
  ]);

  return buildKeikyuTrainCandidates({
    lineId,
    fromNodeId,
    fromStationId,
    toNodeId,
    toStationId,
    originTimetable,
    destinationTimetable,
  });
};
