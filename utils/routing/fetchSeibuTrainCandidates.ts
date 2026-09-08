import type { TrainCandidate } from "./trainResolverTypes";
import type { RailwayNodeId } from "./types";
import {
  adaptSeibuTimetableToTrainCandidates,
  getSeibuApiLineId,
} from "./seibuTrainCandidateAdapter";

type FetchSeibuTrainCandidatesParams = {
  apiBaseUrl: string;
  lineId: string;
  fromNodeId: RailwayNodeId;
  toNodeId: RailwayNodeId;
  fromStationId: string;
  toStationId: string;
  directionId: string;
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
}) => {
  const url = new URL("/api/timetable", apiBaseUrl);

  url.searchParams.set("operator", "seibu");
  url.searchParams.set("lineId", lineId);
  url.searchParams.set("stationId", stationId);
  url.searchParams.set("directionId", directionId);

  const response = await fetch(url.toString());

  if (!response.ok) {
    throw new Error(`Seibu timetable request failed: ${response.status}`);
  }

  const data = await response.json();

  if (Array.isArray(data)) {
    return data;
  }

  if (data && typeof data === "object" && Array.isArray(data.timetable)) {
    return data.timetable;
  }

  if (data && typeof data === "object" && Array.isArray(data.trains)) {
    return data.trains;
  }

  console.warn("🚃 [Seibu timetable] unexpected response:", data);

  return [];
};

export const fetchSeibuTrainCandidates = async ({
  apiBaseUrl,
  lineId,
  fromNodeId,
  toNodeId,
  fromStationId,
  toStationId,
  directionId,
}: FetchSeibuTrainCandidatesParams): Promise<TrainCandidate[]> => {
  const apiLineId = getSeibuApiLineId(lineId);

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

  return adaptSeibuTimetableToTrainCandidates({
    lineId,
    fromNodeId,
    toNodeId,
    fromStationId,
    toStationId,
    originTimetable,
    destinationTimetable,
  });
};
