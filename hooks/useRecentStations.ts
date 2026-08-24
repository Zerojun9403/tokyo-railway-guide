import { useCallback, useEffect, useState } from "react";

import {
  addRecentStation,
  clearRecentStations,
  getRecentStationIds,
  removeRecentStation,
} from "../storage/stationStorage";

/*
 * =========================================================
 * 반환 타입
 * =========================================================
 */

type UseRecentStationsResult = {
  recentStationIds: string[];

  loading: boolean;

  error: string | null;

  addRecent: (stationId: string) => Promise<void>;

  removeRecent: (stationId: string) => Promise<void>;

  clearRecent: () => Promise<void>;

  reload: () => Promise<void>;
};

/*
 * =========================================================
 * 최근 본 역 Hook
 * =========================================================
 *
 * 사용 예:
 *
 * const {
 *   recentStationIds,
 * } = useRecentStations("JY17");
 *
 *
 * stationId를 전달하면
 * 해당 역이 자동으로 최근 본 역에 추가된다.
 *
 * stationId 없이 사용하면
 * 최근 본 역 목록만 관리할 수도 있다.
 * =========================================================
 */

export const useRecentStations = (
  stationId?: string,
): UseRecentStationsResult => {
  const [recentStationIds, setRecentStationIds] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  /*
   * =======================================================
   * 역 ID 정규화
   * =======================================================
   */

  const normalizedStationId = stationId?.trim().toUpperCase() ?? "";

  /*
   * =======================================================
   * 최근 본 역 목록 불러오기
   * =======================================================
   */

  const loadRecentStations = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      const ids = await getRecentStationIds();

      setRecentStationIds(ids);
    } catch (loadError) {
      console.error("최근 본 역 불러오기 오류:", loadError);

      setError(
        loadError instanceof Error
          ? loadError.message
          : "최근 본 역을 불러오지 못했습니다.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /*
   * =======================================================
   * 최근 본 역 추가
   * =======================================================
   */

  const handleAddRecent = useCallback(async (targetStationId: string) => {
    const normalizedId = targetStationId.trim().toUpperCase();

    if (!normalizedId) {
      return;
    }

    try {
      setError(null);

      const updated = await addRecentStation(normalizedId);

      setRecentStationIds(updated);
    } catch (addError) {
      console.error("최근 본 역 추가 오류:", addError);

      setError(
        addError instanceof Error
          ? addError.message
          : "최근 본 역을 저장하지 못했습니다.",
      );
    }
  }, []);

  /*
   * =======================================================
   * 최근 본 역 하나 삭제
   * =======================================================
   */

  const handleRemoveRecent = useCallback(async (targetStationId: string) => {
    const normalizedId = targetStationId.trim().toUpperCase();

    if (!normalizedId) {
      return;
    }

    try {
      setError(null);

      const updated = await removeRecentStation(normalizedId);

      setRecentStationIds(updated);
    } catch (removeError) {
      console.error("최근 본 역 삭제 오류:", removeError);

      setError(
        removeError instanceof Error
          ? removeError.message
          : "최근 본 역을 삭제하지 못했습니다.",
      );
    }
  }, []);

  /*
   * =======================================================
   * 최근 본 역 전체 삭제
   * =======================================================
   */

  const handleClearRecent = useCallback(async () => {
    try {
      setError(null);

      await clearRecentStations();

      setRecentStationIds([]);
    } catch (clearError) {
      console.error("최근 본 역 초기화 오류:", clearError);

      setError(
        clearError instanceof Error
          ? clearError.message
          : "최근 본 역을 초기화하지 못했습니다.",
      );
    }
  }, []);

  /*
   * =======================================================
   * 최초 목록 불러오기
   * =======================================================
   */

  useEffect(() => {
    void loadRecentStations();
  }, [loadRecentStations]);

  /*
   * =======================================================
   * 역 상세 진입 시 자동 저장
   * =======================================================
   *
   * 예:
   *
   * /station/JY17
   *
   * 진입
   *
   * ↓
   *
   * ["JY17"]
   *
   *
   * 이후 E35 진입
   *
   * ↓
   *
   * ["E35", "JY17"]
   *
   *
   * 다시 JY17 진입
   *
   * ↓
   *
   * ["JY17", "E35"]
   *
   * =======================================================
   */

  useEffect(() => {
    if (!normalizedStationId) {
      return;
    }

    void handleAddRecent(normalizedStationId);
  }, [normalizedStationId, handleAddRecent]);

  /*
   * =======================================================
   * 반환
   * =======================================================
   */

  return {
    recentStationIds,

    loading,

    error,

    addRecent: handleAddRecent,

    removeRecent: handleRemoveRecent,

    clearRecent: handleClearRecent,

    reload: loadRecentStations,
  };
};
