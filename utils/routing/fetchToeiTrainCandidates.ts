import {
  buildToeiTrainCandidates,
  type ToeiTimetableEntry,
} from "./toeiTrainCandidateAdapter";

import type { RailwayNodeId } from "./types";
import type { TrainCandidate } from "./trainResolverTypes";

type TimetableResponse = {
  timetable: ToeiTimetableEntry[];
};

type FetchToeiTrainCandidatesParams = {
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
): Promise<ToeiTimetableEntry[]> => {
  const params = new URLSearchParams({
    operator: "toei",
    lineId,
    stationId,
    directionId,
  });

  const response = await fetch(
    `${apiBaseUrl}/api/timetable?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(
      `Toei timetable request failed: ${response.status}`,
    );
  }

  const data = (await response.json()) as TimetableResponse;

  return data.timetable ?? [];
};

export const fetchToeiTrainCandidates = async ({
  apiBaseUrl,
  lineId,
  directionId,
  fromNodeId,
  fromStationId,
  toNodeId,
  toStationId,
}: FetchToeiTrainCandidatesParams): Promise<TrainCandidate[]> => {
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

  return buildToeiTrainCandidates({
    lineId,
    fromNodeId,
    fromStationId,
    toNodeId,
    toStationId,
    originTimetable,
    destinationTimetable,
  });
};