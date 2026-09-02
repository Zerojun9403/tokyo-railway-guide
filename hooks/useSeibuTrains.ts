import { useEffect, useState } from "react";

import { getSeibuTrains } from "../services/seibuService";

import type { Train } from "../types/train";

/*
 * =========================================================
 * useSeibuTrains
 * =========================================================
 *
 * 세이부 역 시간표를 tokyo-railway-api에서 가져온다.
 *
 * 현재 지원:
 * seibu-ikebukuro
 *
 * directionId:
 * Inbound
 * Outbound
 *
 * 향후 세이부 노선이 추가되면
 * 동일한 hook을 그대로 확장해서 사용한다.
 * =========================================================
 */

type UseSeibuTrainsParams = {
  lineId?: string;

  stationId?: string;

  directionId?: string;

  enabled?: boolean;
};

type UseSeibuTrainsResult = {
  trains: Train[];

  loading: boolean;

  error: string | null;
};

export const useSeibuTrains = ({
  lineId,

  stationId,

  directionId,

  enabled = true,
}: UseSeibuTrainsParams): UseSeibuTrainsResult => {
  const [trains, setTrains] = useState<Train[]>([]);

  const [loading, setLoading] = useState(false);

  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    /*
     * 필요한 값이 없거나
     * 세이부 화면이 아니면 요청하지 않는다.
     */

    if (
      !enabled ||
      !lineId ||
      !stationId ||
      !directionId ||
      !lineId.startsWith("seibu-")
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

        const result = await getSeibuTrains(
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

        console.error("세이부 시간표 조회 실패:", error);

        setTrains([]);

        setError(
          error instanceof Error
            ? error.message
            : "세이부 시간표를 불러오지 못했습니다.",
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