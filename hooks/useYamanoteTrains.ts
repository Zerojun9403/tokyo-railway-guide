import { useCallback, useEffect, useState } from "react";

import type { Train } from "../types/train";

import { fetchYamanoteTrains } from "../services/jrEast";

import { adaptJrEastTrains } from "../adapters/jrEastTrainAdapter";

type UseYamanoteTrainsResult = {
  trains: Train[];

  loading: boolean;

  error: string | null;

  reload: () => Promise<void>;
};

export const useYamanoteTrains = (
  stationId: string,
  directionId: string,
): UseYamanoteTrainsResult => {
  const [trains, setTrains] = useState<Train[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const loadTrains = useCallback(async () => {
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
       * JR East 시간표 API
       * ===============================================
       */

      const rawTrains = await fetchYamanoteTrains(stationId, directionId);

      /*
       * ===============================================
       * 공통 Train[] 변환
       * ===============================================
       */

      const adaptedTrains = adaptJrEastTrains(rawTrains, directionId);

      /*
       * ===============================================
       * 가까운 열차부터 정렬
       * ===============================================
       */

      const sortedTrains = [...adaptedTrains].sort(
        (a, b) => a.minutesUntilDeparture - b.minutesUntilDeparture,
      );

      setTrains(sortedTrains.slice(0, 3));
    } catch (loadError) {
      console.error("야마노테 열차 데이터 오류:", loadError);

      setTrains([]);

      setError(
        loadError instanceof Error
          ? loadError.message
          : "야마노테 시간표를 불러오지 못했습니다.",
      );
    } finally {
      setLoading(false);
    }
  }, [stationId, directionId]);

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
