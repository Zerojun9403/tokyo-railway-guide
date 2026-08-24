import { useCallback, useEffect, useState } from "react";

import type { Train } from "../types/train";

import { fetchOedoTimetable } from "../services/toei";

import { adaptToeiTrains } from "../adapters/toeiTrainAdapter";

/*
 * =========================================================
 * 반환 타입
 * =========================================================
 */

type UseOedoTrainsResult = {
  trains: Train[];

  loading: boolean;

  error: string | null;

  reload: () => Promise<void>;
};

/*
 * =========================================================
 * directionId 정규화
 * =========================================================
 *
 * 기존 oedo.ts에서 방향 ID가
 *
 * Tochomae
 * tochomae
 * nerima-hikarigaoka
 *
 * 등 여러 형태로 존재해도 처리한다.
 * =========================================================
 */

const normalizeDirectionId = (directionId: string) => {
  return directionId.trim().toLowerCase();
};

/*
 * =========================================================
 * 앱 방향 ID → ODPT 방향
 * =========================================================
 *
 * ODPT:
 *
 * InnerLoop
 * OuterLoop
 *
 *
 * 공식 오에도선 운행 구조:
 *
 * InnerLoop
 * 광가오카
 * → 네리마
 * → 도초마에
 * → 신주쿠
 * → 롯폰기
 * → 다이몬
 * → 료고쿠
 * → 신주쿠니시구치
 * → 도초마에
 *
 *
 * OuterLoop
 * 도초마에
 * → 신주쿠니시구치
 * → 료고쿠
 * → 다이몬
 * → 롯폰기
 * → 신주쿠
 * → 도초마에
 * → 네리마
 * → 광가오카
 *
 * =========================================================
 */

const resolveOedoApiDirection = (
  stationId: string,
  directionId: string,
): "InnerLoop" | "OuterLoop" | undefined => {
  const normalized = normalizeDirectionId(directionId);

  /*
   * =======================================================
   * API 방향을 그대로 사용하는 경우
   * =======================================================
   */

  if (normalized === "inner" || normalized === "innerloop") {
    return "InnerLoop";
  }

  if (normalized === "outer" || normalized === "outerloop") {
    return "OuterLoop";
  }

  /*
   * =======================================================
   * 도초마에 방면
   * =======================================================
   *
   * E29 ~ E38:
   *
   * 광가오카 쪽에서 도초마에로 올라가는 방향
   * = InnerLoop
   *
   * E01:
   *
   * 신주쿠니시구치 → 도초마에
   * = InnerLoop
   * =======================================================
   */

  if (normalized === "tochomae" || normalized.includes("tochomae")) {
    return "InnerLoop";
  }

  /*
   * =======================================================
   * 히카리가오카 방면
   * =======================================================
   *
   * 도초마에에서 네리마 → 광가오카 쪽
   * = OuterLoop
   * =======================================================
   */

  if (normalized === "hikarigaoka" || normalized.includes("hikarigaoka")) {
    return "OuterLoop";
  }

  /*
   * =======================================================
   * E28 특수 방향
   * =======================================================
   *
   * 도초마에는 일반역과 달리
   * 앱 UI에서 3개 방향을 사용한다.
   *
   * 현재는 ODPT의 두 방향을 기준으로
   * 1차 매핑한다.
   *
   * 실제 E28 StationTimetable 응답을 확인한 뒤
   * destination / timetable 객체까지 이용해서
   * 세 방향을 완전히 분리할 예정이다.
   * =======================================================
   */

  if (stationId === "E28") {
    /*
     * 롯폰기 / 다이몬 쪽
     */

    if (normalized.includes("roppongi") || normalized.includes("daimon")) {
      return "InnerLoop";
    }

    /*
     * 이이다바시 / 료고쿠 쪽
     */

    if (normalized.includes("iidabashi") || normalized.includes("ryogoku")) {
      return "OuterLoop";
    }

    /*
     * 네리마 / 히카리가오카 쪽
     */

    if (normalized.includes("nerima")) {
      return "OuterLoop";
    }
  }

  return undefined;
};

/*
 * =========================================================
 * 오에도선 Hook
 * =========================================================
 */

export const useOedoTrains = (
  stationId: string,
  directionId: string,
): UseOedoTrainsResult => {
  const [trains, setTrains] = useState<Train[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  /*
   * =======================================================
   * 열차 로드
   * =======================================================
   */

  const loadTrains = useCallback(async () => {
    /*
     * 다른 노선 화면에서도
     * Hook 호출 순서를 유지하기 위해
     * 빈 stationId를 허용한다.
     */

    if (!stationId || !directionId) {
      setTrains([]);

      setLoading(false);

      setError(null);

      return;
    }

    try {
      setLoading(true);

      setError(null);

      /*
       * ===============================================
       * 앱 방향 → ODPT 방향
       * ===============================================
       */

      const apiDirection = resolveOedoApiDirection(stationId, directionId);

      if (!apiDirection) {
        setTrains([]);

        setError(
          `${stationId}의 ${directionId} 방향을 ODPT 방향으로 변환할 수 없습니다.`,
        );

        return;
      }

      /*
       * ===============================================
       * 도에이 실제 시간표
       * ===============================================
       */

      const data = await fetchOedoTimetable(stationId);

      /*
       * ===============================================
       * 해당 방향의 시간표 찾기
       * ===============================================
       */

      const matchingDirections = data.directions.filter(
        (item) => item.direction === apiDirection,
      );

      /*
       * 일반역은 보통 하나
       *
       * 도초마에 같은 특수역에서는
       * 같은 railDirection의 시간표가
       * 여러 개 존재할 가능성을 고려한다.
       */

      if (matchingDirections.length === 0) {
        const apiDirections = data.directions
          .map((item) => item.direction)
          .join(", ");

        setTrains([]);

        setError(
          `${stationId}에서 ${apiDirection} 방향 시간표를 찾을 수 없습니다. API 방향: ${apiDirections}`,
        );

        return;
      }

      /*
       * ===============================================
       * 같은 방향 시간표가 여러 개인 경우
       * upcoming을 모두 합친다.
       * ===============================================
       */

      const upcoming = matchingDirections.flatMap(
        (direction) => direction.upcoming ?? [],
      );

      /*
       * ===============================================
       * 중복 제거
       * ===============================================
       */

      const uniqueUpcoming = Array.from(
        new Map(
          upcoming.map((train) => [
            [
              train.trainNumber ?? "",
              train.departureTime,
              train.train ?? "",
            ].join("|"),

            train,
          ]),
        ).values(),
      );

      /*
       * ===============================================
       * ODPT → 공통 Train
       * ===============================================
       */

      const adaptedTrains = adaptToeiTrains(uniqueUpcoming, directionId);

      /*
       * ===============================================
       * 가까운 열차부터
       * ===============================================
       */

      const sortedTrains = [...adaptedTrains].sort(
        (a, b) => a.minutesUntilDeparture - b.minutesUntilDeparture,
      );

      /*
       * ===============================================
       * 최대 3대
       * ===============================================
       */

      setTrains(sortedTrains.slice(0, 3));
    } catch (loadError) {
      console.error("오에도선 열차 데이터 오류:", loadError);

      setTrains([]);

      setError(
        loadError instanceof Error
          ? loadError.message
          : "오에도선 시간표를 불러오지 못했습니다.",
      );
    } finally {
      setLoading(false);
    }
  }, [stationId, directionId]);

  /*
   * =======================================================
   * 역 / 방향 변경 시 재요청
   * =======================================================
   */

  useEffect(() => {
    void loadTrains();
  }, [loadTrains]);

  /*
   * =======================================================
   * 반환
   * =======================================================
   */

  return {
    trains,

    loading,

    error,

    reload: loadTrains,
  };
};
