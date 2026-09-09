import {
  buildJrEastTrainCandidates,
  type JrEastTimetableEntry,
} from "./jrEastTrainCandidateAdapter";

import type { RailwayNodeId } from "./types";
import type { TrainCandidate } from "./trainResolverTypes";

type TimetableResponse = {
  timetable: JrEastTimetableEntry[];
};

type FetchJrEastTrainCandidatesParams = {
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
): Promise<JrEastTimetableEntry[]> => {
  const apiLineId = lineId === "chuo-sobu-local" ? "chuo-sobu" : lineId;

  const params = new URLSearchParams({
    operator: "jr-east",
    lineId: apiLineId,
    stationId,
    directionId,
  });

  const response = await fetch(
    `${apiBaseUrl}/api/timetable?${params.toString()}`,
  );

  if (!response.ok) {
    throw new Error(`JR East timetable request failed: ${response.status}`);
  }

  const data = (await response.json()) as TimetableResponse;

  // API 경계에서 API용 lineId를 CULLINAN 내부 lineId로 되돌린다.
  // 예: API "chuo-sobu" -> 내부 "chuo-sobu-local"
  return (data.timetable ?? []).map((item) => ({
    ...item,
    lineId,
  }));
};

export const fetchJrEastTrainCandidates = async ({
  apiBaseUrl,
  lineId,
  directionId,
  fromNodeId,
  fromStationId,
  toNodeId,
  toStationId,
}: FetchJrEastTrainCandidatesParams): Promise<TrainCandidate[]> => {
  const [originTimetable, destinationTimetable] = await Promise.all([
    fetchTimetable(apiBaseUrl, lineId, fromStationId, directionId),
    fetchTimetable(apiBaseUrl, lineId, toStationId, directionId),
  ]);

  return buildJrEastTrainCandidates({
    lineId,
    fromNodeId,
    fromStationId,
    toNodeId,
    toStationId,
    originTimetable,
    destinationTimetable,
  });
};
