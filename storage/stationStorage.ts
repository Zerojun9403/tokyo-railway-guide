import AsyncStorage from "@react-native-async-storage/async-storage";

/*
 * =========================================================
 * Tokyo Railway Guide
 * Station Storage
 * =========================================================
 *
 * 역할:
 *
 * 1. 즐겨찾기 역 저장
 * 2. 최근 본 역 저장
 *
 * AsyncStorage에는 Station 객체 전체가 아니라
 * stationId만 저장한다.
 *
 * 실제 역 정보는 railwayRegistry에서 다시 조회한다.
 *
 * 이렇게 해야 나중에 역명/환승정보 등이 수정되어도
 * 저장 데이터가 오래된 상태로 남지 않는다.
 * =========================================================
 */

/*
 * =========================================================
 * Storage Key
 * =========================================================
 */

const FAVORITE_STATIONS_KEY = "@tokyo-railway-guide/favorite-stations";

const RECENT_STATIONS_KEY = "@tokyo-railway-guide/recent-stations";

/*
 * =========================================================
 * 최근 본 역 최대 개수
 * =========================================================
 */

const MAX_RECENT_STATIONS = 8;

/*
 * =========================================================
 * 공통 ID 정리
 * =========================================================
 */

const normalizeStationId = (stationId: string) => {
  return stationId.trim().toUpperCase();
};

/*
 * =========================================================
 * string[] 읽기
 * =========================================================
 */

const readStationIds = async (key: string): Promise<string[]> => {
  try {
    const saved = await AsyncStorage.getItem(key);

    if (!saved) {
      return [];
    }

    const parsed: unknown = JSON.parse(saved);

    if (!Array.isArray(parsed)) {
      return [];
    }

    return parsed.filter((value): value is string => typeof value === "string");
  } catch (error) {
    console.error(`Storage 읽기 오류 (${key}):`, error);

    return [];
  }
};

/*
 * =========================================================
 * string[] 저장
 * =========================================================
 */

const writeStationIds = async (
  key: string,
  stationIds: string[],
): Promise<void> => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(stationIds));
  } catch (error) {
    console.error(`Storage 저장 오류 (${key}):`, error);

    throw error;
  }
};

/*
 * =========================================================
 * 즐겨찾기 목록
 * =========================================================
 */

export const getFavoriteStationIds = async (): Promise<string[]> => {
  return readStationIds(FAVORITE_STATIONS_KEY);
};

/*
 * =========================================================
 * 즐겨찾기 여부
 * =========================================================
 */

export const isFavoriteStation = async (
  stationId: string,
): Promise<boolean> => {
  const normalizedId = normalizeStationId(stationId);

  const favorites = await getFavoriteStationIds();

  return favorites.includes(normalizedId);
};

/*
 * =========================================================
 * 즐겨찾기 추가
 * =========================================================
 */

export const addFavoriteStation = async (
  stationId: string,
): Promise<string[]> => {
  const normalizedId = normalizeStationId(stationId);

  if (!normalizedId) {
    return getFavoriteStationIds();
  }

  const favorites = await getFavoriteStationIds();

  /*
   * 이미 있으면 그대로
   */

  if (favorites.includes(normalizedId)) {
    return favorites;
  }

  /*
   * 새 즐겨찾기는 맨 앞
   */

  const updated = [normalizedId, ...favorites];

  await writeStationIds(FAVORITE_STATIONS_KEY, updated);

  return updated;
};

/*
 * =========================================================
 * 즐겨찾기 제거
 * =========================================================
 */

export const removeFavoriteStation = async (
  stationId: string,
): Promise<string[]> => {
  const normalizedId = normalizeStationId(stationId);

  const favorites = await getFavoriteStationIds();

  const updated = favorites.filter((id) => id !== normalizedId);

  await writeStationIds(FAVORITE_STATIONS_KEY, updated);

  return updated;
};

/*
 * =========================================================
 * 즐겨찾기 Toggle
 * =========================================================
 */

export const toggleFavoriteStation = async (
  stationId: string,
): Promise<{
  stationIds: string[];

  isFavorite: boolean;
}> => {
  const normalizedId = normalizeStationId(stationId);

  const favorites = await getFavoriteStationIds();

  /*
   * 이미 즐겨찾기
   * → 제거
   */

  if (favorites.includes(normalizedId)) {
    const updated = favorites.filter((id) => id !== normalizedId);

    await writeStationIds(FAVORITE_STATIONS_KEY, updated);

    return {
      stationIds: updated,

      isFavorite: false,
    };
  }

  /*
   * 즐겨찾기 아님
   * → 추가
   */

  const updated = [normalizedId, ...favorites];

  await writeStationIds(FAVORITE_STATIONS_KEY, updated);

  return {
    stationIds: updated,

    isFavorite: true,
  };
};

/*
 * =========================================================
 * 즐겨찾기 전체 삭제
 * =========================================================
 */

export const clearFavoriteStations = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(FAVORITE_STATIONS_KEY);
  } catch (error) {
    console.error("즐겨찾기 초기화 오류:", error);

    throw error;
  }
};

/*
 * =========================================================
 * 최근 본 역 목록
 * =========================================================
 */

export const getRecentStationIds = async (): Promise<string[]> => {
  return readStationIds(RECENT_STATIONS_KEY);
};

/*
 * =========================================================
 * 최근 본 역 추가
 * =========================================================
 *
 * 예:
 *
 * 기존
 *
 * JY17
 * KS02
 * E35
 *
 * 에서 KS02를 다시 보면:
 *
 * KS02
 * JY17
 * E35
 *
 * 순서가 된다.
 * =========================================================
 */

export const addRecentStation = async (
  stationId: string,
): Promise<string[]> => {
  const normalizedId = normalizeStationId(stationId);

  if (!normalizedId) {
    return getRecentStationIds();
  }

  const recent = await getRecentStationIds();

  /*
   * 기존 동일 역 제거 후
   * 맨 앞으로 이동
   */

  const withoutCurrent = recent.filter((id) => id !== normalizedId);

  const updated = [normalizedId, ...withoutCurrent].slice(
    0,
    MAX_RECENT_STATIONS,
  );

  await writeStationIds(RECENT_STATIONS_KEY, updated);

  return updated;
};

/*
 * =========================================================
 * 최근 본 역 하나 삭제
 * =========================================================
 */

export const removeRecentStation = async (
  stationId: string,
): Promise<string[]> => {
  const normalizedId = normalizeStationId(stationId);

  const recent = await getRecentStationIds();

  const updated = recent.filter((id) => id !== normalizedId);

  await writeStationIds(RECENT_STATIONS_KEY, updated);

  return updated;
};

/*
 * =========================================================
 * 최근 본 역 전체 삭제
 * =========================================================
 */

export const clearRecentStations = async (): Promise<void> => {
  try {
    await AsyncStorage.removeItem(RECENT_STATIONS_KEY);
  } catch (error) {
    console.error("최근 본 역 초기화 오류:", error);

    throw error;
  }
};

/*
 * =========================================================
 * 개발용 전체 초기화
 * =========================================================
 *
 * 필요할 때만 사용.
 *
 * 앱 설정의 "데이터 초기화" 기능으로
 * 나중에 연결할 수도 있다.
 * =========================================================
 */

export const clearStationStorage = async (): Promise<void> => {
  try {
    await AsyncStorage.multiRemove([
      FAVORITE_STATIONS_KEY,
      RECENT_STATIONS_KEY,
    ]);
  } catch (error) {
    console.error("Station Storage 초기화 오류:", error);

    throw error;
  }
};
