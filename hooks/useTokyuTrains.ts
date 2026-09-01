import { useEffect, useState } from "react";

import { getTokyuTrains } from "../services/tokyuService";

import type { Train } from "../types/train";

/*
 * =========================================================
 * useTokyuTrains
 * =========================================================
 *
 * 도큐 역 시간표를 tokyo-railway-api에서 가져온다.
 *
 * 현재 지원:
 * tokyu-toyoko
 *
 * directionId:
 * Inbound
 * Outbound
 *
 * 향후 도큐 노선이 추가되면
 * 동일한 hook을 그대로 확장해서 사용한다.
 * =========================================================
 */

type UseTokyuTrainsParams = {
  lineId?: string;

  stationId?: string;

  directionId?: string;

  enabled?: boolean;
};

type UseTokyuTrainsResult = {
  trains: Train[];

  loading: boolean;

  error: string | null;
};

export const useTokyuTrains = ({
  lineId,

  stationId,

  directionId,

  enabled = true,
}: UseTokyuTrainsParams): UseTokyuTrainsResult => {
  const [trains, setTrains] = useState<Train[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /*
     * 필요한 값이 없거나
     * 도큐 화면이 아니면 요청하지 않는다.
     */

    if (
      !enabled ||
      !lineId ||
      !stationId ||
      !directionId ||
      !lineId.startsWith("tokyu-")
    ) {
      setTrains([]);
      setLoading(false);
      setError(null);

      return;
    }

    let cancelled = false;

    const loadTrains = async () => {
      try {
        setLoading(true);

        setError(null);

        const result = await getTokyuTrains(
          lineId,
          stationId,
          directionId,
        );

        if (cancelled) {
          return;
        }

        setTrains(result);
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error("도큐 시간표 조회 실패:", error);

        setTrains([]);

        setError(
          error instanceof Error
            ? error.message
            : "도큐 시간표를 불러오지 못했습니다.",
        );
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    };

    loadTrains();

    return () => {
      cancelled = true;
    };
  }, [lineId, stationId, directionId, enabled]);

  return {
    trains,
    loading,
    error,
  };
};