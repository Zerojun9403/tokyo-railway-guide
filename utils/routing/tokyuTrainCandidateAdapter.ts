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


const toServiceMinutes = (time: string): number | null => {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time);

  if (!match) {
    return null;
  }

  let hour = Number(match[1]);
  const minute = Number(match[2]);

  if (!Number.isFinite(hour) || !Number.isFinite(minute)) {
    return null;
  }

  // 00:00~02:59는 전날 심야 운행의 24:00~26:59로 취급한다.
  if (hour < 3) {
    hour += 24;
  }

  return hour * 60 + minute;
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
    if (!isSameTokyuLine(origin.lineId, lineId)) {
      continue;
    }

    const originMinutes = toServiceMinutes(origin.departureTime);

    if (originMinutes === null) {
      continue;
    }

    const destination = destinationTimetable
      .filter((item) => {
        if (!isSameTokyuLine(item.lineId, lineId)) return false;
        if (item.directionId !== origin.directionId) return false;

        // trainNumber가 실제로 제공되는 경우에는 기존의 정확 매칭을 우선한다.
        if (origin.trainNumber && item.trainNumber) {
          return item.trainNumber === origin.trainNumber;
        }

        // 도큐/게이큐/세이부 API는 현재 trainNumber를 제공하지 않는다.
        // 같은 방향 + 열차종별 + 목적지를 만족하면서 출발 이후 가장 가까운
        // 도착역 시각을 같은 열차의 통과 시각으로 사용한다.
        if (
          origin.trainType &&
          item.trainType &&
          item.trainType !== origin.trainType
        ) {
          return false;
        }

        if (
          origin.destinationStation &&
          item.destinationStation &&
          item.destinationStation !== origin.destinationStation
        ) {
          return false;
        }

        const destinationMinutes = toServiceMinutes(item.departureTime);

        if (destinationMinutes === null) return false;

        const travelMinutes = destinationMinutes - originMinutes;

        return travelMinutes > 0 && travelMinutes <= 180;
      })
      .sort((a, b) => {
        const aMinutes = toServiceMinutes(a.departureTime) ?? Infinity;
        const bMinutes = toServiceMinutes(b.departureTime) ?? Infinity;
        return aMinutes - bMinutes;
      })[0];

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
