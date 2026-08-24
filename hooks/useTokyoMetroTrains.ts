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
   * Load
   * =======================================================
   */

  const loadTrains = useCallback(async () => {
    if (!lineId || !stationId || !directionId) {
      setTrains([]);

      setLoading(false);

      setError(null);

      return;
    }

    /*
     * lineId
     *
     * ginza
     * marunouchi
     *
     * ↓
     *
     * Ginza
     * Marunouchi
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
       * ===============================================
       * 실제 시간표
       * ===============================================
       */

      const rawTrains = await fetchTokyoMetroTrains(
        railway,

        stationId,

        directionId,
      );

      /*
       * ===============================================
       * 공통 Train[]
       * ===============================================
       */

      const adaptedTrains = adaptTokyoMetroTrains(
        rawTrains,

        directionId,
      );

      /*
       * ===============================================
       * 다음 3대
       * ===============================================
       */

      setTrains(
        adaptedTrains
          .sort((a, b) => a.minutesUntilDeparture - b.minutesUntilDeparture)
          .slice(0, 3),
      );
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
   * 자동 요청
   * =======================================================
   */

  useEffect(() => {
    void loadTrains();
  }, [loadTrains]);

  return {
    trains,

    loading,

    error,

    reload: loadTrains,
  };
};
