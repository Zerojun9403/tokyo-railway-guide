import type {
  JourneySegment,
  JourneyStructure,
} from "./journeyTypes";
import { resolveJourneySegment } from "./resolveJourneySegment";
import type {
  ResolvedTrain,
  TrainCandidate,
} from "./trainResolverTypes";

/*
 * =========================================================
 * Journey Resolver
 * =========================================================
 *
 * 여러 JourneySegment를 순서대로 처리해서
 * 실제 탑승 가능한 전체 여정을 만든다.
 *
 * 핵심 흐름:
 *
 * 현재 시각
 *    ↓
 * Segment 1 열차 선택
 *    ↓
 * Segment 1 도착
 *    ↓
 * 환승시간 추가
 *    ↓
 * Segment 2 탑승 가능 시각
 *    ↓
 * Segment 2 열차 선택
 *    ↓
 * ...
 *    ↓
 * 최종 도착
 */

/*
 * =========================================================
 * 기본 환승시간
 * =========================================================
 *
 * 현재 Mock 단계에서는 기존 정적 길찾기와 동일하게
 * 환승시간을 3분으로 사용한다.
 *
 * 추후에는:
 *
 * - 역별 환승시간
 * - 같은 역사 내 환승
 * - 대형역 환승거리
 * - 회사 간 환승
 *
 * 등을 반영할 수 있다.
 */
const DEFAULT_TRANSFER_MINUTES = 3;

/*
 * =========================================================
 * 전체 Journey에서 선택된 Segment
 * =========================================================
 */
export type ResolvedJourneySegment = {
  segment: JourneySegment;

  train: ResolvedTrain;

  /*
   * 이 Segment에서 열차를 탈 수 있었던
   * 가장 이른 시각.
   *
   * 첫 Segment:
   * 사용자가 출발하는 현재 시각
   *
   * 환승 Segment:
   * 이전 열차 도착 + 환승시간
   */
  availableFromTime: string;
};

/*
 * =========================================================
 * 전체 Journey Resolver 결과
 * =========================================================
 */
export type JourneyResolverResult =
  | {
      status: "resolved";

      segments: ResolvedJourneySegment[];

      departureTime: string;
      arrivalTime: string;

      transferCount: number;
    }
  | {
      status: "not-found";

      segments: ResolvedJourneySegment[];

      /*
       * 어느 Segment에서 더 이상
       * 탑승 가능한 열차를 찾지 못했는지 표시한다.
       *
       * 0부터 시작한다.
       */
      failedSegmentIndex: number;
    };

/*
 * =========================================================
 * HH:mm → 분
 * =========================================================
 */
const timeToMinutes = (
  time: string,
): number | null => {
  const [hourText, minuteText] =
    time.split(":");

  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (
    !Number.isInteger(hour) ||
    !Number.isInteger(minute)
  ) {
    return null;
  }

  if (
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
 * =========================================================
 * 분 → HH:mm
 * =========================================================
 *
 * 현재 단계에서는 같은 날짜 안의
 * 여정만 처리한다.
 *
 * 24:00을 넘어가는 경우에는 null을 반환한다.
 *
 * 심야 / 막차 / 익일 도착 처리는
 * 이후 단계에서 별도로 확장한다.
 */
const minutesToTime = (
  minutes: number,
): string | null => {
  if (
    !Number.isInteger(minutes) ||
    minutes < 0 ||
    minutes >= 24 * 60
  ) {
    return null;
  }

  const hour = Math.floor(
    minutes / 60,
  );

  const minute = minutes % 60;

  return `${String(hour).padStart(
    2,
    "0",
  )}:${String(minute).padStart(
    2,
    "0",
  )}`;
};

/*
 * =========================================================
 * 환승 이후 탑승 가능 시각 계산
 * =========================================================
 *
 * 예:
 *
 * 이전 열차 도착
 * 21:29
 *
 * 환승시간
 * 3분
 *
 * 다음 열차 탑승 가능
 * 21:32
 */
const addMinutesToTime = (
  time: string,
  minutesToAdd: number,
): string | null => {
  const baseMinutes =
    timeToMinutes(time);

  if (baseMinutes === null) {
    return null;
  }

  return minutesToTime(
    baseMinutes + minutesToAdd,
  );
};

/*
 * =========================================================
 * 전체 Journey Resolver
 * =========================================================
 *
 * journey:
 * 기존 길찾기 결과를 buildJourneySegments()로
 * 변환한 JourneyStructure.
 *
 * candidates:
 * 모든 Segment에서 사용할 수 있는
 * 열차 후보 목록.
 *
 * currentTime:
 * 사용자가 출발하려는 현재 시각.
 *
 * transferMinutes:
 * 환승에 필요한 시간.
 *
 * 현재 기본값은 3분.
 */
export const resolveJourney = (
  journey: JourneyStructure,
  candidates: TrainCandidate[],
  currentTime: string,
  transferMinutes: number =
    DEFAULT_TRANSFER_MINUTES,
): JourneyResolverResult => {
  const resolvedSegments:
    ResolvedJourneySegment[] = [];

  /*
   * =====================================================
   * Segment가 하나도 없는 경우
   * =====================================================
   */
  if (journey.segments.length === 0) {
    return {
      status: "not-found",
      segments: [],
      failedSegmentIndex: 0,
    };
  }

  /*
   * 첫 번째 Segment는
   * 사용자가 지정한 현재 시각부터 시작한다.
   */
  let availableFromTime = currentTime;

  for (
    let index = 0;
    index < journey.segments.length;
    index += 1
  ) {
    const segment =
      journey.segments[index];

    /*
     * ===================================================
     * 현재 Segment의 최적 열차 선택
     * ===================================================
     */
    const result =
      resolveJourneySegment(
        segment,
        candidates,
        availableFromTime,
      );

    /*
     * ===================================================
     * 탑승 가능한 열차가 없는 경우
     * ===================================================
     *
     * 앞 Segment들이 성공했더라도
     * 현재 Segment에서 열차를 찾지 못하면
     * 전체 Journey는 완성되지 않은 것으로 본다.
     */
    if (result.status === "not-found") {
      return {
        status: "not-found",
        segments: resolvedSegments,
        failedSegmentIndex: index,
      };
    }

    /*
     * ===================================================
     * 선택된 열차 저장
     * ===================================================
     */
    resolvedSegments.push({
      segment,
      train: result.train,
      availableFromTime,
    });

    /*
     * ===================================================
     * 마지막 Segment라면
     * 다음 환승시각을 계산할 필요가 없다.
     * ===================================================
     */
    const isLastSegment =
      index ===
      journey.segments.length - 1;

    if (isLastSegment) {
      continue;
    }

    /*
     * ===================================================
     * 다음 Segment 탑승 가능 시각 계산
     * ===================================================
     *
     * 현재 열차 도착시간
     * +
     * 환승시간
     *
     * 예:
     *
     * 21:29 도착
     * + 3분
     * = 21:32
     */
    const nextAvailableTime =
      addMinutesToTime(
        result.train.arrivalTime,
        transferMinutes,
      );

    /*
     * 자정 초과 또는 잘못된 시간이라면
     * 현재 단계에서는 처리하지 않는다.
     */
    if (nextAvailableTime === null) {
      return {
        status: "not-found",
        segments: resolvedSegments,
        failedSegmentIndex:
          index + 1,
      };
    }

    availableFromTime =
      nextAvailableTime;
  }

  /*
   * =====================================================
   * 전체 Journey 성공
   * =====================================================
   */
  const firstResolvedSegment =
    resolvedSegments[0];

  const lastResolvedSegment =
    resolvedSegments[
      resolvedSegments.length - 1
    ];

  if (
    !firstResolvedSegment ||
    !lastResolvedSegment
  ) {
    return {
      status: "not-found",
      segments: resolvedSegments,
      failedSegmentIndex: 0,
    };
  }

  return {
    status: "resolved",

    segments: resolvedSegments,

    departureTime:
      firstResolvedSegment.train
        .departureTime,

    arrivalTime:
      lastResolvedSegment.train
        .arrivalTime,

    transferCount:
      Math.max(
        0,
        resolvedSegments.length - 1,
      ),
  };
};