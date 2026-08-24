import { useCallback, useEffect, useState } from "react";

import type { Train } from "../types/train";

import {
  fetchTokyoMetroTrains,
  resolveTokyoMetroRailway,
} from "../services/tokyoMetro";

import { adaptTokyoMetroTrains } from "../adapters/tokyoMetroTrainAdapter";

/*
 * =========================================================
 * 반환 타입
 * =========================================================
 */

type UseTokyoMetroTrainsResult = {
  trains: Train[];

  loading: boolean;

  error: string | null;

  reload: () => Promise<void>;
};

/*
 * =========================================================
 * Tokyo Metro Hook
 * =========================================================
 *
 * 지원 노선:
 *
 * ginza
 * marunouchi
 * hibiya
 *
 * lineId
 * ↓
 * resolveTokyoMetroRailway()
 * ↓
 * Ginza / Marunouchi / Hibiya
 *
 * =========================================================
 */

export const useTokyoMetroTrains = (
  lineId: string,

  stationId: string,

  directionId: string,
): UseTokyoMetroTrainsResult => {
  const [trains, setTrains] = useState<Train[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  /*
   * =======================================================
   * 열차 데이터 로드
   * =======================================================
   */

  const loadTrains = useCallback(async () => {
    /*
     * 필수 값이 없으면 요청하지 않는다.
     */

    if (!lineId || !stationId || !directionId) {
      setTrains([]);

      setLoading(false);

      setError(null);

      return;
    }

    /*
     * =====================================================
     * 앱 lineId → Tokyo Metro Railway
     * =====================================================
     *
     * ginza
     * ↓
     * Ginza
     *
     * marunouchi
     * ↓
     * Marunouchi
     *
     * hibiya
     * ↓
     * Hibiya
     * =====================================================
     */

    const railway = resolveTokyoMetroRailway(lineId);

    if (!railway) {
      setTrains([]);

      setLoading(false);

      setError(`지원하지 않는 도쿄메트로 노선입니다: ${lineId}`);

      return;
    }

    try {
      setLoading(true);

      setError(null);

      /*
       * ===================================================
       * 실제 Tokyo Metro 시간표
       * ===================================================
       */

      const rawTrains = await fetchTokyoMetroTrains(
        railway,

        stationId,

        directionId,
      );

      /*
       * ===================================================
       * Tokyo Metro API 데이터
       * ↓
       * 공통 Train[]
       * ===================================================
       */

      const adaptedTrains = adaptTokyoMetroTrains(
        rawTrains,

        directionId,
      );

      /*
       * ===================================================
       * 가까운 열차부터 최대 3대
       * ===================================================
       */

      const nextTrains = adaptedTrains
        .sort((a, b) => a.minutesUntilDeparture - b.minutesUntilDeparture)
        .slice(0, 3);

      setTrains(nextTrains);
    } catch (loadError) {
      console.error("도쿄메트로 열차 데이터 오류:", loadError);

      setTrains([]);

      setError(
        loadError instanceof Error
          ? loadError.message
          : "도쿄메트로 시간표를 불러오지 못했습니다.",
      );
    } finally {
      setLoading(false);
    }
  }, [lineId, stationId, directionId]);

  /*
   * =======================================================
   * lineId / stationId / directionId 변경 시 자동 요청
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
