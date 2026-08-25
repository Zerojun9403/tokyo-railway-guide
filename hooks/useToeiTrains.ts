import { useCallback, useEffect, useState } from "react";

import type { Train } from "../types/train";

import {
  fetchToeiTrains,
  resolveToeiRailway,
} from "../services/toei";

import { adaptToeiTrains } from "../adapters/toeiTrainAdapter";

/*
 * =========================================================
 * 반환 타입
 * =========================================================
 */

type UseToeiTrainsResult = {
  trains: Train[];

  loading: boolean;

  error: string | null;

  reload: () => Promise<void>;
};

/*
 * =========================================================
 * Toei Hook
 * =========================================================
 *
 * 지원 노선
 *
 * A Asakusa
 * I Mita
 * S Shinjuku
 * E Oedo
 *
 * =========================================================
 */

export const useToeiTrains = (
  lineId: string,

  stationId: string,

  directionId: string,
): UseToeiTrainsResult => {
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
     * asakusa
     * mita
     * shinjuku
     * oedo
     *
     * ↓
     *
     * Asakusa
     * Mita
     * Shinjuku
     * Oedo
     */

    const railway = resolveToeiRailway(lineId);

    if (!railway) {
      setTrains([]);

      setLoading(false);

      setError(`지원하지 않는 도에이 노선입니다: ${lineId}`);

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

      const rawTrains = await fetchToeiTrains(
        railway,

        stationId,

        directionId,
      );

      /*
       * ===============================================
       * 공통 Train[]
       * ===============================================
       */

      const adaptedTrains = adaptToeiTrains(
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
          .sort(
            (a, b) =>
              a.minutesUntilDeparture -
              b.minutesUntilDeparture,
          )
          .slice(0, 3),
      );
    } catch (loadError) {
      console.error(
        "도에이 열차 데이터 오류:",
        loadError,
      );

      setTrains([]);

      setError(
        loadError instanceof Error
          ? loadError.message
          : "도에이 시간표를 불러오지 못했습니다.",
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