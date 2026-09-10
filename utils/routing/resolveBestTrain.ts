import type {
  ResolvedTrain,
  TrainCandidate,
  TrainResolverResult,
} from "./trainResolverTypes";

/*
 * =========================================================
 * HH:mm → 분 단위 숫자 변환
 * =========================================================
 *
 * 예:
 * 21:13
 *
 * 21 * 60 + 13
 * = 1273
 */
const timeToMinutes = (time: string): number | null => {
  const [hourText, minuteText] = time.split(":");

  const hour = Number(hourText);
  const minute = Number(minuteText);

  if (!Number.isInteger(hour) || !Number.isInteger(minute)) {
    return null;
  }

  if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
    return null;
  }

  return hour * 60 + minute;
};

/*
 * =========================================================
 * TrainCandidate → ResolvedTrain
 * =========================================================
 */
const createResolvedTrain = (
  candidate: TrainCandidate,
): ResolvedTrain | null => {
  const departureMinutes = timeToMinutes(candidate.departureTime);

  let arrivalMinutes = timeToMinutes(candidate.arrivalTime);

  if (departureMinutes === null || arrivalMinutes === null) {
    return null;
  }

  /*
   * 자정을 넘어 도착하는 정상 열차는
   * 도착 시각을 다음 날 분 값으로 보정한다.
   *
   * 예: 23:33(1413) → 00:00(0)
   *     00:00 + 1440 = 1440
   */
  if (arrivalMinutes < departureMinutes) {
    arrivalMinutes += 24 * 60;
  }

  return {
    candidate,

    departureTime: candidate.departureTime,
    arrivalTime: candidate.arrivalTime,

    departureMinutes,
    arrivalMinutes,
  };
};

/*
 * =========================================================
 * 가장 좋은 열차 비교
 * =========================================================
 *
 * 1순위:
 * 목적지에 가장 빨리 도착하는 열차
 *
 * 2순위:
 * 도착시간이 같다면 더 빨리 출발하는 열차
 */
const isBetterTrain = (
  candidate: ResolvedTrain,
  currentBest: ResolvedTrain,
): boolean => {
  if (candidate.arrivalMinutes < currentBest.arrivalMinutes) {
    return true;
  }

  if (candidate.arrivalMinutes > currentBest.arrivalMinutes) {
    return false;
  }

  return candidate.departureMinutes < currentBest.departureMinutes;
};

/*
 * =========================================================
 * Best Train Resolver
 * =========================================================
 *
 * 현재 시각 이후 출발 가능한 열차 중에서:
 *
 * 1. 운휴 열차 제외
 * 2. 목적지에 정차하지 않는 열차 제외
 * 3. 이미 출발한 열차 제외
 * 4. 잘못된 시간 데이터 제외
 * 5. 가장 빨리 목적지에 도착하는 열차 선택
 *
 * 중요:
 *
 * "가장 먼저 출발하는 열차"를 선택하는 것이 아니다.
 *
 * 예:
 *
 * 현재 21:08
 *
 * Local
 * 21:10 → 21:34
 *
 * Express
 * 21:13 → 21:29
 *
 * Express가 목적지에 정차한다면
 * 21:13 Express가 최종 선택된다.
 */
export const resolveBestTrain = (
  candidates: TrainCandidate[],
  currentTime: string,
): TrainResolverResult => {
  const currentMinutes = timeToMinutes(currentTime);

  /*
   * 현재 시각 자체가 잘못된 경우
   */
  if (currentMinutes === null) {
    return {
      status: "not-found",
      train: null,
    };
  }

  let bestTrain: ResolvedTrain | null = null;

  const diagnostics = {
    inputCandidateCount: candidates.length,
    cancelledCount: 0,
    nonStoppingCount: 0,
    invalidTimeCount: 0,
    alreadyDepartedCount: 0,
    validCandidateCount: 0,
  };

  for (const candidate of candidates) {
    /*
     * =====================================================
     * 운휴 열차 제외
     * =====================================================
     */
    if (candidate.status === "cancelled") {
      diagnostics.cancelledCount += 1;
      continue;
    }

    /*
     * =====================================================
     * 목적지 통과 열차 제외
     * =====================================================
     */
    if (!candidate.stopsAtDestination) {
      diagnostics.nonStoppingCount += 1;
      continue;
    }

    /*
     * =====================================================
     * 시간 데이터 변환
     * =====================================================
     */
    const resolvedTrain = createResolvedTrain(candidate);

    if (!resolvedTrain) {
      diagnostics.invalidTimeCount += 1;
      continue;
    }

    /*
     * =====================================================
     * 이미 출발한 열차 제외
     * =====================================================
     *
     * 현재 21:08인데
     * 21:07 출발 열차라면 탈 수 없다.
     *
     * 현재 시각과 출발 시각이 정확히 같다면
     * 현재 Mock 단계에서는 탑승 가능한 것으로 본다.
     */
    if (resolvedTrain.departureMinutes < currentMinutes) {
      diagnostics.alreadyDepartedCount += 1;
      continue;
    }

    diagnostics.validCandidateCount += 1;

    /*
     * =====================================================
     * 첫 번째 유효 열차
     * =====================================================
     */
    if (!bestTrain) {
      bestTrain = resolvedTrain;
      continue;
    }

    /*
     * =====================================================
     * 더 빨리 도착하는 열차인지 비교
     * =====================================================
     */
    if (isBetterTrain(resolvedTrain, bestTrain)) {
      bestTrain = resolvedTrain;
    }
  }

  /*
   * =========================================================
   * 탑승 가능한 열차가 없는 경우
   * =========================================================
   */
  if (!bestTrain) {
    console.warn("🚃 [BestTrain Not Found]", {
      currentTime,
      ...diagnostics,
      sampleCandidates: candidates.slice(0, 5).map((candidate) => ({
        trainNumber: candidate.trainNumber,
        departureTime: candidate.departureTime,
        arrivalTime: candidate.arrivalTime,
        status: candidate.status,
        stopsAtDestination: candidate.stopsAtDestination,
      })),
    });

    return {
      status: "not-found",
      train: null,
    };
  }

  console.log("🚃 [BestTrain Resolved]", {
    currentTime,
    ...diagnostics,
    selectedTrain: {
      trainNumber: bestTrain.candidate.trainNumber,
      departureTime: bestTrain.departureTime,
      arrivalTime: bestTrain.arrivalTime,
    },
  });

  /*
   * =========================================================
   * 최종 선택 완료
   * =========================================================
   */
  return {
    status: "resolved",
    train: bestTrain,
  };
};
