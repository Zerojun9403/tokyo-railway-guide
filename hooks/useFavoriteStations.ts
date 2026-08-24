import { useCallback, useEffect, useState } from "react";

import {
  getFavoriteStationIds,
  toggleFavoriteStation,
} from "../storage/stationStorage";

/*
 * =========================================================
 * 반환 타입
 * =========================================================
 */

type UseFavoriteStationsResult = {
  favoriteStationIds: string[];

  isFavorite: boolean;

  loading: boolean;

  error: string | null;

  toggleFavorite: () => Promise<void>;

  reload: () => Promise<void>;
};

/*
 * =========================================================
 * 즐겨찾기 Hook
 * =========================================================
 *
 * 사용 예:
 *
 * const {
 *   isFavorite,
 *   toggleFavorite,
 * } = useFavoriteStations("JY17");
 *
 * =========================================================
 */

export const useFavoriteStations = (
  stationId: string,
): UseFavoriteStationsResult => {
  const [favoriteStationIds, setFavoriteStationIds] = useState<string[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState<string | null>(null);

  /*
   * =======================================================
   * 즐겨찾기 목록 불러오기
   * =======================================================
   */

  const loadFavorites = useCallback(async () => {
    try {
      setLoading(true);

      setError(null);

      const ids = await getFavoriteStationIds();

      setFavoriteStationIds(ids);
    } catch (loadError) {
      console.error("즐겨찾기 불러오기 오류:", loadError);

      setError(
        loadError instanceof Error
          ? loadError.message
          : "즐겨찾기를 불러오지 못했습니다.",
      );
    } finally {
      setLoading(false);
    }
  }, []);

  /*
   * =======================================================
   * 최초 실행
   * =======================================================
   */

  useEffect(() => {
    void loadFavorites();
  }, [loadFavorites]);

  /*
   * =======================================================
   * 현재 역 즐겨찾기 여부
   * =======================================================
   */

  const normalizedStationId = stationId.trim().toUpperCase();

  const isFavorite =
    normalizedStationId.length > 0 &&
    favoriteStationIds.includes(normalizedStationId);

  /*
   * =======================================================
   * 즐겨찾기 토글
   * =======================================================
   */

  const handleToggleFavorite = useCallback(async () => {
    if (!normalizedStationId) {
      return;
    }

    try {
      setError(null);

      const result = await toggleFavoriteStation(normalizedStationId);

      setFavoriteStationIds(result.stationIds);
    } catch (toggleError) {
      console.error("즐겨찾기 변경 오류:", toggleError);

      setError(
        toggleError instanceof Error
          ? toggleError.message
          : "즐겨찾기를 변경하지 못했습니다.",
      );
    }
  }, [normalizedStationId]);

  /*
   * =======================================================
   * 반환
   * =======================================================
   */

  return {
    favoriteStationIds,

    isFavorite,

    loading,

    error,

    toggleFavorite: handleToggleFavorite,

    reload: loadFavorites,
  };
};
