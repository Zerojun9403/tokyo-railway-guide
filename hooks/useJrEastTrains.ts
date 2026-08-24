import { useCallback, useEffect, useState } from "react";

import type { Train } from "../types/train";

import { fetchJrEastTrains } from "../services/jrEast";

import { adaptJrEastTrains } from "../adapters/jrEastTrainAdapter";

/*
 * =========================================================
 * JR동일본 지원 노선
 * =========================================================
 *
 * 여기부터 하나씩 확장한다.
 *
 * Yamanote
 * ChuoRapid
 * ChuoSobuLocal
 * KeihinTohokuNegishi
 * SaikyoKawagoe
 * ...
 * =========================================================
 */

export type JrEastRailway =
  | "Yamanote"
  | "ChuoRapid"
  | "ChuoSobuLocal"
  | "KeihinTohokuNegishi"
  | "SaikyoKawagoe";

/*
 * =========================================================
 * Hook 반환 타입
 * =========================================================
 */

type UseJrEastTrainsResult = {
  trains: Train[];

  loading: boolean;

  error: string | null;

  reload: () => Promise<void>;
};

/*
 * =========================================================
 * 앱 방향 → API 방향
 * =========================================================
 */

const resolveJrEastDirection = (
  railway: JrEastRailway,
  directionId: string,
) => {
  const normalized = directionId.trim().toLowerCase();

  /*
   * =======================================================
   * 야마노테선
   * =======================================================
   */

  if (railway === "Yamanote") {
    if (normalized === "innerloop" || normalized === "inner") {
      return "innerLoop";
    }

    if (normalized === "outerloop" || normalized === "outer") {
      return "outerLoop";
    }
  }

  /*
   * =======================================================
   * 주오 쾌속선
   * =======================================================
   */

  if (railway === "ChuoRapid") {
    if (normalized === "inbound" || normalized === "tokyo") {
      return "inbound";
    }

    if (normalized === "outbound" || normalized === "takao") {
      return "outbound";
    }
  }

  /*
   * =======================================================
   * 주오·소부 완행선
   * =======================================================
   */

  if (railway === "ChuoSobuLocal") {
    if (normalized === "eastbound" || normalized === "chiba") {
      return "eastbound";
    }

    if (normalized === "westbound" || normalized === "mitaka") {
      return "westbound";
    }
  }

  /*
   * =======================================================
   * 게이힌도호쿠·네기시선
   * =======================================================
   */

  if (railway === "KeihinTohokuNegishi") {
    if (normalized === "northbound" || normalized === "omiya") {
      return "northbound";
    }

    if (
      normalized === "southbound" ||
      normalized === "yokohama" ||
      normalized === "ofuna"
    ) {
      return "southbound";
    }
  }

  /*
   * =======================================================
   * 사이쿄·가와고에선
   * =======================================================
   */

  if (railway === "SaikyoKawagoe") {
    if (normalized === "northbound" || normalized === "kawagoe") {
      return "northbound";
    }

    if (normalized === "southbound" || normalized === "osaki") {
      return "southbound";
    }
  }

  /*
   * 이미 API 방향 형식이라면 그대로 사용
   */

  return directionId;
};

/*
 * =========================================================
 * JR동일본 공통 Hook
 * =========================================================
 */

export const useJrEastTrains = (
  railway: JrEastRailway,
  stationId: string,
  directionId: string,
): UseJrEastTrainsResult => {
  const [trains, setTrains] = useState<Train[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  /*
   * =======================================================
   * 열차 조회
   * =======================================================
   */

  const loadTrains = useCallback(async () => {
    /*
     * 다른 노선 화면에서도
     * Hook 호출 순서를 유지하기 위해
     * 빈 값을 허용한다.
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
       * 앱 방향 → JR API 방향
       * ===============================================
       */

      const apiDirection = resolveJrEastDirection(railway, directionId);

      /*
       * ===============================================
       * JR동일본 API
       * ===============================================
       */

      const rawTrains = await fetchJrEastTrains(
        railway,
        stationId,
        apiDirection,
      );

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

      /*
       * =================================================
       * 10대 보관
       * =================================================
       *
       * Station 화면에서는 3대만 보여주더라도
       * Hook에서는 여유 있게 받아둔다.
       *
       * 앞 열차가 자동으로 사라졌을 때
       * 뒤 열차가 올라올 수 있다.
       * =================================================
       */

      setTrains(sortedTrains.slice(0, 10));
    } catch (loadError) {
      console.error(`${railway} 열차 데이터 오류:`, loadError);

      setTrains([]);

      setError(
        loadError instanceof Error
          ? loadError.message
          : "JR동일본 시간표를 불러오지 못했습니다.",
      );
    } finally {
      setLoading(false);
    }
  }, [railway, stationId, directionId]);

  /*
   * =======================================================
   * 노선 / 역 / 방향 변경
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
