import type {
  JourneySegment,
  JourneyStructure,
} from "./journeyTypes";
import type {
  ResolvedTrain,
  TrainCandidate,
} from "./trainResolverTypes";

/*
 * =========================================================
 * CULLINAN Last Journey Resolver
 * =========================================================
 *
 * 일반 resolveJourney()가 현재 시각부터 앞쪽으로 열차를 고른다면,
 * 이 Resolver는 마지막 Segment부터 거꾸로 계산한다.
 *
 * 목적:
 *
 * "이 경로로 숙소까지 돌아가려면
 *  가장 늦게 몇 시 열차를 타야 하는가?"
 *
 * 마지막 Segment의 가장 늦은 열차
 *        ↓
 * 그 열차 출발 - 환승시간
 *        ↓
 * 이전 Segment에서 그 시각까지 도착 가능한 가장 늦은 열차
 *        ↓
 * 첫 Segment까지 반복
 */

const DEFAULT_TRANSFER_MINUTES = 3;

export type ResolvedLastJourneySegment = {
  segment: JourneySegment;
  train: ResolvedTrain;

  /*
   * 이 Segment가 늦어도 도착해야 하는 시각.
   *
   * 마지막 Segment는 제한이 없으므로 undefined.
   * 이전 Segment는 다음 열차 출발 - 환승시간.
   */
  latestArrivalTime?: string;
};

export type LastJourneyResolverResult =
  | {
      status: "resolved";
      segments: ResolvedLastJourneySegment[];
      departureTime: string;
      arrivalTime: string;
      transferCount: number;
    }
  | {
      status: "not-found";
      segments: ResolvedLastJourneySegment[];
      failedSegmentIndex: number;
    };

const parseTime = (
  time: string,
): number | null => {
  const match = /^(\d{1,2}):(\d{2})$/.exec(time);

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

/*
 * service-day 분으로 변환한다.
 *
 * CULLINAN의 심야 여정에서는 00:xx를
 * 전날 23:xx 뒤에 오는 시각으로 해석해야 한다.
 *
 * 기준은 도쿄 철도 막차 영역을 넉넉히 포함하도록
 * 06:00 이전 시각을 다음 서비스일(24:00+)로 본다.
 *
 * 예:
 * 23:58 -> 1438
 * 00:07 -> 1447
 */
const toServiceMinutes = (
  time: string,
): number | null => {
  const minutes = parseTime(time);

  if (minutes === null) {
    return null;
  }

  if (minutes < 6 * 60) {
    return minutes + 24 * 60;
  }

  return minutes;
};

const serviceMinutesToTime = (
  minutes: number,
): string | null => {
  if (
    !Number.isInteger(minutes) ||
    minutes < 0
  ) {
    return null;
  }

  const normalized =
    ((minutes % (24 * 60)) + 24 * 60) %
    (24 * 60);

  const hour = Math.floor(normalized / 60);
  const minute = normalized % 60;

  return `${String(hour).padStart(
    2,
    "0",
  )}:${String(minute).padStart(
    2,
    "0",
  )}`;
};

const matchesSegment = (
  segment: JourneySegment,
  candidate: TrainCandidate,
): boolean => {
  return (
    candidate.lineId === segment.lineId &&
    candidate.fromNodeId === segment.fromNodeId &&
    candidate.toNodeId === segment.toNodeId &&
    candidate.fromStationId === segment.fromStationId &&
    candidate.toStationId === segment.toStationId
  );
};

const toResolvedTrain = (
  candidate: TrainCandidate,
  departureMinutes: number,
  arrivalMinutes: number,
): ResolvedTrain => ({
  candidate,
  departureTime: candidate.departureTime,
  arrivalTime: candidate.arrivalTime,
  departureMinutes,
  arrivalMinutes,
});

/*
 * 한 Segment에서 "가장 늦게 탈 수 있는 열차"를 고른다.
 *
 * latestArrivalMinutes가 있으면:
 * 그 시각까지 목적지역에 도착해야 한다.
 *
 * 없으면:
 * 마지막 Segment이므로 해당 Segment의 마지막 유효 열차를 고른다.
 */
const resolveLatestTrainForSegment = (
  segment: JourneySegment,
  candidates: TrainCandidate[],
  latestArrivalMinutes?: number,
): ResolvedTrain | null => {
  const usable = candidates
    .filter((candidate) =>
      matchesSegment(segment, candidate),
    )
    .filter(
      (candidate) =>
        candidate.status !== "cancelled" &&
        candidate.stopsAtDestination,
    )
    .map((candidate) => {
      const departureMinutes =
        toServiceMinutes(candidate.departureTime);

      let arrivalMinutes =
        toServiceMinutes(candidate.arrivalTime);

      if (
        departureMinutes === null ||
        arrivalMinutes === null
      ) {
        return null;
      }

      /*
       * 23:xx -> 00:xx처럼 자정을 통과했는데
       * service-day 보정만으로도 여전히 도착이 앞서는 경우
       * 다음 날로 한 번 더 넘긴다.
       */
      if (arrivalMinutes < departureMinutes) {
        arrivalMinutes += 24 * 60;
      }

      if (
        latestArrivalMinutes !== undefined &&
        arrivalMinutes > latestArrivalMinutes
      ) {
        return null;
      }

      return toResolvedTrain(
        candidate,
        departureMinutes,
        arrivalMinutes,
      );
    })
    .filter(
      (train): train is ResolvedTrain =>
        train !== null,
    )
    /*
     * 가장 늦게 출발할 수 있는 열차 우선.
     * 출발시각이 같으면 더 빨리 도착하는 열차 우선.
     */
    .sort((a, b) => {
      if (
        b.departureMinutes !==
        a.departureMinutes
      ) {
        return (
          b.departureMinutes -
          a.departureMinutes
        );
      }

      return (
        a.arrivalMinutes -
        b.arrivalMinutes
      );
    });

  return usable[0] ?? null;
};

export const resolveLastJourney = (
  journey: JourneyStructure,
  candidates: TrainCandidate[],
  transferMinutes: number =
    DEFAULT_TRANSFER_MINUTES,
): LastJourneyResolverResult => {
  if (journey.segments.length === 0) {
    return {
      status: "not-found",
      segments: [],
      failedSegmentIndex: 0,
    };
  }

  if (
    !Number.isInteger(transferMinutes) ||
    transferMinutes < 0
  ) {
    return {
      status: "not-found",
      segments: [],
      failedSegmentIndex: 0,
    };
  }

  const resolvedByIndex:
    Array<ResolvedLastJourneySegment | undefined> =
      new Array(journey.segments.length);

  /*
   * 마지막 Segment는 시간 제한 없이 막차를 선택한다.
   * 그 뒤 앞 Segment로 갈 때마다
   *
   * 다음 열차 출발 - 환승시간
   *
   * 을 이전 Segment의 도착 한계로 사용한다.
   */
  let latestArrivalMinutes:
    number | undefined;

  for (
    let index = journey.segments.length - 1;
    index >= 0;
    index -= 1
  ) {
    const segment = journey.segments[index];

    const train =
      resolveLatestTrainForSegment(
        segment,
        candidates,
        latestArrivalMinutes,
      );

    if (!train) {
      return {
        status: "not-found",
        segments: resolvedByIndex.filter(
          (
            item,
          ): item is ResolvedLastJourneySegment =>
            item !== undefined,
        ),
        failedSegmentIndex: index,
      };
    }

    resolvedByIndex[index] = {
      segment,
      train,
      latestArrivalTime:
        latestArrivalMinutes === undefined
          ? undefined
          : serviceMinutesToTime(
              latestArrivalMinutes,
            ) ?? undefined,
    };

    /*
     * 다음 반복에서는 현재 Segment보다 하나 앞의
     * 열차를 선택한다.
     *
     * 현재 열차 출발 23:52
     * 환승 3분
     * -> 앞 Segment는 23:49까지 도착해야 한다.
     */
    latestArrivalMinutes =
      train.departureMinutes -
      transferMinutes;
  }

  const segments = resolvedByIndex.filter(
    (
      item,
    ): item is ResolvedLastJourneySegment =>
      item !== undefined,
  );

  const first = segments[0];
  const last = segments[segments.length - 1];

  if (!first || !last) {
    return {
      status: "not-found",
      segments,
      failedSegmentIndex: 0,
    };
  }

  return {
    status: "resolved",
    segments,
    departureTime:
      first.train.departureTime,
    arrivalTime:
      last.train.arrivalTime,
    transferCount: Math.max(
      0,
      segments.length - 1,
    ),
  };
};
