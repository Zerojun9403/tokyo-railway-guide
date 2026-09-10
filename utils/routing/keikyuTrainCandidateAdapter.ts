import type { RailwayNodeId } from "./types";
import type { TrainCandidate } from "./trainResolverTypes";

export type KeikyuTimetableEntry = {
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

type BuildKeikyuTrainCandidatesParams = {
  lineId: string;
  fromNodeId: RailwayNodeId;
  fromStationId: string;
  toNodeId: RailwayNodeId;
  toStationId: string;
  originTimetable: KeikyuTimetableEntry[];
  destinationTimetable: KeikyuTimetableEntry[];
};

const KEIKYU_API_LINE_IDS: Record<string, string> = {
  "keikyu-main": "main",
  "keikyu-airport": "airport",
};

export const getKeikyuApiLineId = (
  guideLineId: string,
): string | null => {
  return KEIKYU_API_LINE_IDS[guideLineId] ?? null;
};

const isSameKeikyuLine = (
  timetableLineId: string,
  guideLineId: string,
) => {
  const apiLineId = getKeikyuApiLineId(guideLineId);

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

export const buildKeikyuTrainCandidates = ({
  lineId,
  fromNodeId,
  fromStationId,
  toNodeId,
  toStationId,
  originTimetable,
  destinationTimetable,
}: BuildKeikyuTrainCandidatesParams): TrainCandidate[] => {
  const candidates: TrainCandidate[] = [];

  for (const origin of originTimetable) {
    if (!isSameKeikyuLine(origin.lineId, lineId)) continue;

    const originMinutes = toServiceMinutes(origin.departureTime);

    if (originMinutes === null) {
      continue;
    }

    // CULLINAN 안전 원칙:
    // trainNumber가 없는 케이큐 시간표는 동일 열차임을 확정할 수 없으므로
    // 열차종별/목적지/가까운 시각을 이용한 추정 매칭을 하지 않는다.
    if (!origin.trainNumber) {
      continue;
    }

    const destination = destinationTimetable.find((item) => {
      if (!isSameKeikyuLine(item.lineId, lineId)) return false;
      if (item.directionId !== origin.directionId) return false;
      if (!item.trainNumber) return false;
      if (item.trainNumber !== origin.trainNumber) return false;

      const destinationMinutes = toServiceMinutes(item.departureTime);

      if (destinationMinutes === null) return false;

      const travelMinutes = destinationMinutes - originMinutes;

      return travelMinutes > 0 && travelMinutes <= 180;
    });

    if (!destination) continue;

    const candidate: TrainCandidate = {
      id: `keikyu:${lineId}:${origin.trainNumber}:${fromStationId}:${toStationId}`,
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
