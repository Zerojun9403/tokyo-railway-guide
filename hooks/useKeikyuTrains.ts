import { useEffect, useState } from "react";

import { getKeikyuTrains } from "../services/keikyuService";

import type { Train } from "../types/train";

/*
 * =========================================================
 * useKeikyuTrains
 * =========================================================
 *
 * 게이큐 역 시간표를 tokyo-railway-api에서 가져온다.
 *
 * lineId:
 * keikyu-main
 * keikyu-airport
 *
 * directionId:
 * Inbound
 * Outbound
 * =========================================================
 */

type UseKeikyuTrainsParams = {
  lineId?: string;

  stationId?: string;

  directionId?: string;

  enabled?: boolean;
};

type UseKeikyuTrainsResult = {
  trains: Train[];

  loading: boolean;

  error: string | null;
};

export const useKeikyuTrains = ({
  lineId,

  stationId,

  directionId,

  enabled = true,
}: UseKeikyuTrainsParams): UseKeikyuTrainsResult => {
  const [trains, setTrains] = useState<Train[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /*
     * 필요한 값이 없거나
     * 게이큐 화면이 아니면 요청하지 않는다.
     */

    if (
      !enabled ||
      !lineId ||
      !stationId ||
      !directionId ||
      !lineId.startsWith("keikyu-")
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

        const result = await getKeikyuTrains(lineId, stationId, directionId);

        if (cancelled) {
          return;
        }

        setTrains(result);
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error("게이큐 시간표 조회 실패:", error);

        setTrains([]);

        setError(
          error instanceof Error
            ? error.message
            : "게이큐 시간표를 불러오지 못했습니다.",
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
