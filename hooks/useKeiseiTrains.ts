import { useCallback, useEffect, useState } from "react";

import type { Train } from "../types/train";

import { fetchKeiseiUpcomingDepartures } from "../services/keisei";

import { adaptKeiseiTimetableDepartures } from "../adapters/keiseiTrainAdapter";

type UseKeiseiTrainsResult = {
  trains: Train[];

  loading: boolean;

  error: string | null;

  reload: () => Promise<void>;
};

const resolveTimetableDirection = (
  stationId: string,
  directionId?: string,
): "d1" | "d2" | undefined => {
  /*
   * KS01 게이세이우에노는
   * 시간표 방향이 d1 하나
   */

  if (stationId === "KS01") {
    return "d1";
  }

  if (directionId === "d1") {
    return "d1";
  }

  if (directionId === "d2") {
    return "d2";
  }

  return undefined;
};

export const useKeiseiTrains = (
  stationId: string,
  directionId?: string,
): UseKeiseiTrainsResult => {
  const [trains, setTrains] = useState<Train[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  const loadTrains = useCallback(async () => {
    if (!stationId) {
      setTrains([]);

      setLoading(false);

      setError(null);

      return;
    }

    try {
      setLoading(true);

      setError(null);

      /*
       * 시간표 방향 결정
       */

      const timetableDirection = resolveTimetableDirection(
        stationId,
        directionId,
      );

      /*
       * keisei-two 시간표 API 호출
       */

      const departures = await fetchKeiseiUpcomingDepartures(
        stationId,
        timetableDirection,
      );

      /*
       * 공통 Train[]으로 변환
       */

      const adaptedTrains = adaptKeiseiTimetableDepartures(
        departures,

        directionId ?? timetableDirection ?? "outbound",
      );

      /*
       * 가까운 열차부터 정렬
       */

      const sortedTrains = [...adaptedTrains].sort(
        (a, b) => a.minutesUntilDeparture - b.minutesUntilDeparture,
      );

      setTrains(sortedTrains.slice(0, 10));
    } catch (loadError) {
      console.error("게이세이 열차 데이터 오류:", loadError);

      setTrains([]);

      setError(
        loadError instanceof Error
          ? loadError.message
          : "게이세이 시간표를 불러오지 못했습니다.",
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
