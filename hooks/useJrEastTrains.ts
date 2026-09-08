import { useCallback, useEffect, useState } from "react";

import type { Train } from "../types/train";

import { fetchJrEastTrains } from "../services/jrEast";

import { adaptJrEastTrains } from "../adapters/jrEastTrainAdapter";

/*
 * =========================================================
 * JR동일본 지원 노선
 * =========================================================
 */

export type JrEastRailway =
  | "Yamanote"
  | "ChuoRapid"
  | "ChuoSobuLocal"
  | "KeihinTohokuNegishi"
  | "SaikyoKawagoe"
  | "ShonanShinjuku"
  | "Tokaido"
  | "Yokosuka"
  | "Sobu"
  | "SobuRapid"
  | "YokosukaSobu"
  | "NaritaAirport"
  | "Keiyo";

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
   * 야마노테선
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
   * 주오 쾌속선
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
   * 주오·소부 완행선
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
   * 게이힌도호쿠·네기시선
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
   * 사이쿄선
   */
  if (railway === "SaikyoKawagoe") {
    if (
      normalized === "northbound" ||
      normalized === "omiya" ||
      normalized === "kawagoe"
    ) {
      return "northbound";
    }

    if (
      normalized === "southbound" ||
      normalized === "shinjuku" ||
      normalized === "osaki"
    ) {
      return "southbound";
    }
  }

  /*
   * 쇼난신주쿠라인
   */
  if (railway === "ShonanShinjuku") {
    if (
      normalized === "northbound" ||
      normalized === "shinjuku" ||
      normalized === "ikebukuro" ||
      normalized === "omiya"
    ) {
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
   * 도카이도선
   */
  if (railway === "Tokaido") {
    if (normalized === "inbound" || normalized === "tokyo") {
      return "inbound";
    }

    if (
      normalized === "outbound" ||
      normalized === "yokohama" ||
      normalized === "ofuna"
    ) {
      return "outbound";
    }
  }

  /*
   * 요코스카선
   */
  if (railway === "Yokosuka") {
    if (normalized === "northbound" || normalized === "tokyo") {
      return "northbound";
    }

    if (
      normalized === "southbound" ||
      normalized === "yokohama" ||
      normalized === "kurihama"
    ) {
      return "southbound";
    }
  }

  /*
   * 소부선
   */
  if (railway === "Sobu") {
    if (
      normalized === "inbound" ||
      normalized === "westbound" ||
      normalized === "tokyo"
    ) {
      return "inbound";
    }

    if (
      normalized === "outbound" ||
      normalized === "eastbound" ||
      normalized === "chiba"
    ) {
      return "outbound";
    }
  }

  /*
   * 소부쾌속선
   */
  if (railway === "SobuRapid") {
    if (
      normalized === "inbound" ||
      normalized === "westbound" ||
      normalized === "tokyo"
    ) {
      return "inbound";
    }

    if (
      normalized === "outbound" ||
      normalized === "eastbound" ||
      normalized === "chiba"
    ) {
      return "outbound";
    }
  }

  /*
   * 기존 요코스카·소부 공통
   */
  if (railway === "YokosukaSobu") {
    if (
      normalized === "northbound" ||
      normalized === "tokyo" ||
      normalized === "chiba"
    ) {
      return "northbound";
    }

    if (
      normalized === "southbound" ||
      normalized === "yokohama" ||
      normalized === "kurihama"
    ) {
      return "southbound";
    }
  }

  /*
   * 나리타선 · 나리타공항지선
   */
  if (railway === "NaritaAirport") {
    if (
      normalized === "outbound" ||
      normalized === "airport" ||
      normalized === "naritaairport"
    ) {
      return "outbound";
    }

    if (normalized === "inbound" || normalized === "chiba") {
      return "inbound";
    }
  }

  /*
   * 게이요선
   */
  if (railway === "Keiyo") {
    if (normalized === "inbound" || normalized === "tokyo") {
      return "inbound";
    }

    if (
      normalized === "outbound" ||
      normalized === "soga" ||
      normalized === "kaihimmakuhari"
    ) {
      return "outbound";
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

      const apiDirection = resolveJrEastDirection(railway, directionId);

      const rawTrains = await fetchJrEastTrains(
        railway,
        stationId,
        apiDirection,
      );

      const adaptedTrains = adaptJrEastTrains(rawTrains, directionId);

      const sortedTrains = [...adaptedTrains].sort(
        (a, b) => a.minutesUntilDeparture - b.minutesUntilDeparture,
      );

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
