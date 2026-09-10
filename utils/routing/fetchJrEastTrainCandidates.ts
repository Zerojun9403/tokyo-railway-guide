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

  const url = `${apiBaseUrl}/api/timetable?${params.toString()}`;

  console.log("💎 [CULLINAN JR API Request]", {
    lineId,
    apiLineId,
    stationId,
    directionId,
    url,
  });

  const response = await fetch(url);

  if (!response.ok) {
    console.error("💎 [CULLINAN JR API Error]", {
      lineId,
      stationId,
      directionId,
      status: response.status,
    });
    throw new Error(`JR East timetable request failed: ${response.status}`);
  }

  const data = (await response.json()) as TimetableResponse;

  const timetable = (data.timetable ?? []).map((item) => ({
    ...item,
    lineId,
  }));

  console.log("💎 [CULLINAN JR Timetable]", {
    lineId,
    stationId,
    directionId,
    count: timetable.length,
    sample: timetable.slice(0, 5).map((item) => ({
      departureTime: item.departureTime,
      trainNumber: item.trainNumber,
      trainType: item.trainType,
      destinationStation: item.destinationStation,
    })),
  });

  return timetable;
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
  console.log("💎 [CULLINAN JR Candidate Start]", {
    apiBaseUrl,
    lineId,
    directionId,
    fromStationId,
    toStationId,
  });

  const [originTimetable, destinationTimetable] = await Promise.all([
    fetchTimetable(apiBaseUrl, lineId, fromStationId, directionId),
    fetchTimetable(apiBaseUrl, lineId, toStationId, directionId),
  ]);

  const originTrainNumbers = new Set(
    originTimetable
      .map((item) => item.trainNumber)
      .filter((value): value is string => Boolean(value)),
  );

  const destinationTrainNumbers = new Set(
    destinationTimetable
      .map((item) => item.trainNumber)
      .filter((value): value is string => Boolean(value)),
  );

  const matchedTrainNumbers = [...originTrainNumbers].filter((trainNumber) =>
    destinationTrainNumbers.has(trainNumber),
  );

  console.log("💎 [CULLINAN JR Match Diagnostic]", {
    lineId,
    directionId,
    fromStationId,
    toStationId,
    originCount: originTimetable.length,
    destinationCount: destinationTimetable.length,
    originWithTrainNumber: originTrainNumbers.size,
    destinationWithTrainNumber: destinationTrainNumbers.size,
    matchedCount: matchedTrainNumbers.length,
    matchedTrainNumbers: matchedTrainNumbers.slice(0, 20),
  });

  const candidates = buildJrEastTrainCandidates({
    lineId,
    fromNodeId,
    fromStationId,
    toNodeId,
    toStationId,
    originTimetable,
    destinationTimetable,
  });

  // 같은 열차번호가 하루 안에 재사용되거나 순환선의 다른 회차와
  // 잘못 매칭되는 경우를 차단한다. 자정 통과(예: 23:33→00:00)는 허용한다.
  const toServiceMinutes = (value: string): number => {
    const [hour, minute] = value.split(":").map(Number);
    return hour * 60 + minute;
  };

  const safeCandidates = candidates.filter((candidate) => {
    const departure = toServiceMinutes(candidate.departureTime);
    let arrival = toServiceMinutes(candidate.arrivalTime);

    if (arrival < departure) {
      arrival += 24 * 60;
    }

    const duration = arrival - departure;

    return duration >= 0 && duration <= 180;
  });

  if (safeCandidates.length !== candidates.length) {
    console.warn("💎 [CULLINAN JR Invalid Pair Removed]", {
      lineId,
      removed: candidates.length - safeCandidates.length,
    });
  }

  console.log("💎 [CULLINAN JR Candidate Result]", {
    lineId,
    fromStationId,
    toStationId,
    candidateCount: safeCandidates.length,
    sample: safeCandidates.slice(0, 5).map((candidate) => ({
      trainNumber: candidate.trainNumber,
      departureTime: candidate.departureTime,
      arrivalTime: candidate.arrivalTime,
    })),
  });

  return safeCandidates;
};
