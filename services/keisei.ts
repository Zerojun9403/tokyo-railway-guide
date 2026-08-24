/*
 * =========================================================
 * Tokyo Railway Guide - Keisei Service
 * =========================================================
 *
 * 프로젝트:
 * tokyo-railway-guide (Expo)
 *
 * 역할:
 *
 * keisei-two 서버
 *      ↓
 * ① 실시간 열차 위치 API
 * ② 역별 시간표 API
 *      ↓
 * Expo 앱
 *
 * =========================================================
 */

const KEISEI_API_BASE_URL = "https://keisei-two.vercel.app";

/*
 * =========================================================
 * 실시간 열차 타입
 * =========================================================
 */

export type KeiseiApiTrain = {
  id?: string;

  trainNumber?: string;

  positionId?: string;

  positionType?: string;

  positionSlot?: number;

  trainType?: string;

  destination?: string;

  destinationKo?: string;

  destinationJa?: string;

  direction?: string;

  directionId?: string;

  directionCode?: string | number;

  delayMinutes?: number;

  origin?: boolean;

  /*
   * 기존 Adapter 호환용
   */
  time?: string;

  departureTime?: string;

  [key: string]: unknown;
};

/*
 * =========================================================
 * 실시간 API 응답
 * =========================================================
 */

type KeiseiRealtimeResponse = {
  success?: boolean;

  trains?: KeiseiApiTrain[];

  error?: string;

  [key: string]: unknown;
};

/*
 * =========================================================
 * 시간표 타입
 * =========================================================
 */

export type KeiseiTimetableDeparture = {
  time: string;

  hour: number;

  minute: number;

  trainType: string;

  destination: string;

  firstTrain: boolean;

  minutesUntilDeparture?: number;
};

/*
 * =========================================================
 * 시간표 방향
 * =========================================================
 */

export type KeiseiTimetableDirection = {
  code: "d1" | "d2";

  name: string;

  japaneseName: string;
};

/*
 * =========================================================
 * 시간표 역
 * =========================================================
 */

export type KeiseiTimetableStation = {
  code: string;

  name: string;

  japaneseName: string;

  timetableId: string;
};

/*
 * =========================================================
 * 시간표 API 응답
 * =========================================================
 */

export type KeiseiTimetableResponse = {
  success: boolean;

  station?: KeiseiTimetableStation;

  availableDirections?: KeiseiTimetableDirection[];

  direction?: KeiseiTimetableDirection;

  source?: string;

  sourceUrl?: string;

  fetchedAt?: string;

  japanTime?: {
    hour: number;

    minute: number;

    second: number;

    formatted: string;
  };

  count?: number;

  /*
   * 현재 시간 이후 최대 10대
   */
  upcomingDepartures?: KeiseiTimetableDeparture[];

  /*
   * 해당 방향 전체 시간표
   */
  departures?: KeiseiTimetableDeparture[];

  error?: string;
};

/*
 * =========================================================
 * 공통 fetch
 * =========================================================
 */

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: "GET",

    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    throw new Error(`게이세이 API 요청 실패 (${response.status})`);
  }

  return (await response.json()) as T;
};

/*
 * =========================================================
 * 1. 실시간 열차 위치 데이터
 * =========================================================
 *
 * 기존 코드와의 호환을 위해 유지한다.
 *
 * 사용:
 *
 * fetchKeiseiRawTrains("KS01")
 *
 * =========================================================
 */

export const fetchKeiseiRawTrains = async (
  stationId: string,
): Promise<KeiseiApiTrain[]> => {
  if (!stationId) {
    return [];
  }

  const url =
    `${KEISEI_API_BASE_URL}` +
    `/api/keisei?stationId=${encodeURIComponent(stationId)}`;

  try {
    const data = await fetchJson<KeiseiRealtimeResponse>(url);

    if (data.success === false) {
      throw new Error(
        data.error ?? "게이세이 실시간 데이터를 가져오지 못했습니다.",
      );
    }

    if (!Array.isArray(data.trains)) {
      return [];
    }

    return data.trains;
  } catch (error) {
    console.error("fetchKeiseiRawTrains 오류:", error);

    throw error;
  }
};

/*
 * =========================================================
 * 2. 게이세이 시간표
 * =========================================================
 *
 * 서버 API:
 *
 * /api/keisei/timetable
 *      ?station=KS01
 *      &direction=d1
 *
 * =========================================================
 */

export const fetchKeiseiTimetable = async (
  stationId: string,
  direction?: "d1" | "d2",
): Promise<KeiseiTimetableResponse> => {
  if (!stationId) {
    throw new Error("게이세이 역 코드가 없습니다.");
  }

  /*
   * 중요:
   *
   * timetable API의 query parameter는
   * stationId가 아니라 station이다.
   */

  let url =
    `${KEISEI_API_BASE_URL}` +
    `/api/keisei/timetable` +
    `?station=${encodeURIComponent(stationId)}`;

  /*
   * 방향이 있는 경우
   */

  if (direction) {
    url += `&direction=${encodeURIComponent(direction)}`;
  }

  try {
    const data = await fetchJson<KeiseiTimetableResponse>(url);

    if (data.success === false) {
      throw new Error(data.error ?? "게이세이 시간표를 가져오지 못했습니다.");
    }

    return data;
  } catch (error) {
    console.error("fetchKeiseiTimetable 오류:", error);

    throw error;
  }
};

/*
 * =========================================================
 * 3. 다음 출발 열차만 가져오기
 * =========================================================
 *
 * 서버가 이미 일본 현재시간을 기준으로
 * upcomingDepartures를 계산하고 있으므로
 * Expo에서 다시 시간을 계산하지 않는다.
 *
 * =========================================================
 */

export const fetchKeiseiUpcomingDepartures = async (
  stationId: string,
  direction?: "d1" | "d2",
): Promise<KeiseiTimetableDeparture[]> => {
  const data = await fetchKeiseiTimetable(stationId, direction);

  if (!Array.isArray(data.upcomingDepartures)) {
    return [];
  }

  return data.upcomingDepartures;
};
