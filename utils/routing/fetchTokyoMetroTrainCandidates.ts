import {
  buildTokyoMetroTrainCandidates,
  type TokyoMetroTimetableEntry,
} from "./tokyoMetroTrainCandidateAdapter";

import type { RailwayNodeId } from "./types";
import type { TrainCandidate } from "./trainResolverTypes";

type TimetableResponse = {
  timetable: TokyoMetroTimetableEntry[];
};

type FetchTokyoMetroTrainCandidatesParams = {
  apiBaseUrl: string;
  lineId: string;
  directionId: string;
  fromNodeId: RailwayNodeId;
  fromStationId: string;
  toNodeId: RailwayNodeId;
  toStationId: string;
};

const fetchTimetable = async (
  apiBaseUrl: string,
  lineId: string,
  stationId: string,
  directionId: string,
): Promise<TokyoMetroTimetableEntry[]> => {
  const params = new URLSearchParams({
    operator: "tokyo-metro",
    lineId,
    stationId,
    directionId,
  });

  const response = await fetch(
    `${apiBaseUrl}/api/timetable?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(
      `Tokyo Metro timetable request failed: ${response.status}`,
    );
  }

  const data = (await response.json()) as TimetableResponse;

  return data.timetable ?? [];
};

export const fetchTokyoMetroTrainCandidates = async ({
  apiBaseUrl,
  lineId,
  directionId,
  fromNodeId,
  fromStationId,
  toNodeId,
  toStationId,
}: FetchTokyoMetroTrainCandidatesParams): Promise<TrainCandidate[]> => {
  const [originTimetable, destinationTimetable] =
    await Promise.all([
      fetchTimetable(
        apiBaseUrl,
        lineId,
        fromStationId,
        directionId,
      ),
      fetchTimetable(
        apiBaseUrl,
        lineId,
        toStationId,
        directionId,
      ),
    ]);

  return buildTokyoMetroTrainCandidates({
    lineId,
    fromNodeId,
    fromStationId,
    toNodeId,
    toStationId,
    originTimetable,
    destinationTimetable,
  });
};