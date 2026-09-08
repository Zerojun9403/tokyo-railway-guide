import {
  buildTokyuTrainCandidates,
  getTokyuApiLineId,
  type TokyuTimetableEntry,
} from "./tokyuTrainCandidateAdapter";
import type { TrainCandidate } from "./trainResolverTypes";
import type { RailwayNodeId } from "./types";

type FetchTokyuTrainCandidatesParams = {
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
}): Promise<TokyuTimetableEntry[]> => {
  const params = new URLSearchParams({
    operator: "tokyu",
    lineId,
    stationId,
    directionId,
  });

  const response = await fetch(
    `${apiBaseUrl}/api/timetable?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(
      `Tokyu timetable request failed: ${response.status}`,
    );
  }

  return (await response.json()) as TokyuTimetableEntry[];
};

export const fetchTokyuTrainCandidates = async ({
  apiBaseUrl,
  lineId,
  directionId,
  fromNodeId,
  fromStationId,
  toNodeId,
  toStationId,
}: FetchTokyuTrainCandidatesParams): Promise<TrainCandidate[]> => {
  const apiLineId = getTokyuApiLineId(lineId);

  if (!apiLineId) {
    return [];
  }

  const [originTimetable, destinationTimetable] =
    await Promise.all([
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

  return buildTokyuTrainCandidates({
    lineId,
    fromNodeId,
    fromStationId,
    toNodeId,
    toStationId,
    originTimetable,
    destinationTimetable,
  });
};
