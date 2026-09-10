import type { RailwayNodeId } from "./types";
import type { TrainCandidate } from "./trainResolverTypes";

export type ToeiTimetableEntry = {
  id: string;

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

type BuildToeiTrainCandidatesParams = {
  lineId: string;

  fromNodeId: RailwayNodeId;
  fromStationId: string;

  toNodeId: RailwayNodeId;
  toStationId: string;

  originTimetable: ToeiTimetableEntry[];
  destinationTimetable: ToeiTimetableEntry[];
};

export const buildToeiTrainCandidates = ({
  lineId,
  fromNodeId,
  fromStationId,
  toNodeId,
  toStationId,
  originTimetable,
  destinationTimetable,
}: BuildToeiTrainCandidatesParams): TrainCandidate[] => {
  const candidates: TrainCandidate[] = [];

  for (const origin of originTimetable) {
    if (!origin.trainNumber) {
      continue;
    }

    if (origin.lineId !== lineId) {
      continue;
    }

    /*
     * 같은 열차번호가 목적지역 시간표에 여러 번 존재할 수 있으므로
     * find()의 첫 번째 항목을 그대로 사용하지 않는다.
     *
     * 출발시각 이후에 도착하는 동일 열차 후보만 남긴 뒤
     * 가장 가까운 시각을 선택한다.
     *
     * 자정 통과 예:
     * 23:58 -> 00:07
     * 00:07은 다음 서비스일의 시각으로 보고 24:07처럼 비교한다.
     */
    const toServiceMinutes = (
      time: string,
      originTime: string,
    ): number | null => {
      const parseTime = (value: string): number | null => {
        const match = /^(\d{1,2}):(\d{2})$/.exec(value);

        if (!match) {
          return null;
        }

        const hour = Number(match[1]);
        const minute = Number(match[2]);

        if (
          !Number.isInteger(hour) ||
          !Number.isInteger(minute) ||
          hour < 0 ||
          hour > 23 ||
          minute < 0 ||
          minute > 59
        ) {
          return null;
        }

        return hour * 60 + minute;
      };

      const originMinutes = parseTime(originTime);
      const candidateMinutes = parseTime(time);

      if (originMinutes === null || candidateMinutes === null) {
        return null;
      }

      /*
       * 목적지역 시각이 출발보다 이른 경우:
       *
       * - 출발이 늦은 밤(18:00 이후)
       * - 목적지가 새벽(06:00 이전)
       *
       * 인 경우에만 다음 날로 간주한다.
       *
       * 따라서 05:18 -> 05:13 같은 잘못된 역전은
       * 다음 날로 오인하지 않고 제외된다.
       */
      if (
        candidateMinutes < originMinutes &&
        originMinutes >= 18 * 60 &&
        candidateMinutes < 6 * 60
      ) {
        return candidateMinutes + 24 * 60;
      }

      return candidateMinutes;
    };

    const originMinutes = toServiceMinutes(
      origin.departureTime,
      origin.departureTime,
    );

    if (originMinutes === null) {
      continue;
    }

    const destination = destinationTimetable
      .filter(
        (item) =>
          item.lineId === lineId &&
          item.trainNumber === origin.trainNumber,
      )
      .map((item) => ({
        item,
        minutes: toServiceMinutes(
          item.departureTime,
          origin.departureTime,
        ),
      }))
      .filter(
        (
          candidate,
        ): candidate is {
          item: ToeiTimetableEntry;
          minutes: number;
        } =>
          candidate.minutes !== null &&
          candidate.minutes >= originMinutes,
      )
      .sort((a, b) => a.minutes - b.minutes)[0]?.item;

    if (!destination) {
      continue;
    }

    candidates.push({
      id: `toei:${lineId}:${origin.trainNumber}:${fromStationId}:${toStationId}`,

      lineId,

      fromNodeId,
      fromStationId,

      toNodeId,
      toStationId,

      departureTime: origin.departureTime,

      // 목적지역 StationTimetable의 같은 열차 시간을
      // 도착 시각 추정값으로 사용한다.
      arrivalTime: destination.departureTime,

      trainType: origin.trainType ?? "unknown",

      trainTypeKo: origin.trainTypeKo,
      trainTypeJa: origin.trainTypeJa,

      trainNumber: origin.trainNumber,

      destinationKo: origin.destinationKo,
      destinationJa: origin.destinationJa,

      // 출발역과 목적지역 양쪽에서 같은 trainNumber가
      // 확인된 열차만 Candidate로 만든다.
      stopsAtDestination: true,

      status: "unknown",
    });
  }

  return candidates;
};