/*
 * =========================================================
 * Tokyo Railway Guide
 * Toei Service
 * =========================================================
 *
 * 도에이 지하철 실제 시간표 API 연결
 *
 * Expo
 *   ↓
 * 기존 Next.js Toei API
 *   ↓
 * /api/station-timetable
 *   ↓
 * ODPT StationTimetable
 *
 * =========================================================
 */

/*
 * =========================================================
 * API 서버 주소
 * =========================================================
 *
 * ⚠️ 기존에 사용하던 실제 Toei Vercel 주소를
 * 그대로 넣어주세요.
 *
 * 예:
 *
 * const TOEI_API_BASE_URL =
 *   "https://xxxxx.vercel.app";
 *
 * =========================================================
 */

const TOEI_API_BASE_URL = "https://toei-metro.vercel.app";

/*
 * =========================================================
 * 지원 도에이 노선
 * =========================================================
 */

export type ToeiRailway = "Asakusa" | "Mita" | "Shinjuku" | "Oedo";

/*
 * =========================================================
 * API 다음 열차
 * =========================================================
 */

export type ToeiUpcomingTrain = {
  departureTime: string;

  minutesUntilDeparture: number;

  trainNumber: string | null;

  trainType: string | null;

  destinationStations: string[];

  train: string | null;
};

/*
 * =========================================================
 * API 방향
 * =========================================================
 */

export type ToeiDirectionData = {
  direction: string;

  railway: string;

  station: string;

  calendar: "Weekday" | "SaturdayHoliday";

  timetableCount: number;

  upcoming: ToeiUpcomingTrain[];
};

/*
 * =========================================================
 * API 전체 응답
 * =========================================================
 */

export type ToeiStationTimetableResponse = {
  railway: string;

  station: string;

  currentTime: {
    timezone: string;

    hour: number;

    minute: number;
  };

  calendar: "Weekday" | "SaturdayHoliday";

  totalTimetableCount: number;

  todayTimetableCount: number;

  directionCount: number;

  directions: ToeiDirectionData[];

  error?: string;
};

/*
 * =========================================================
 * 오에도선
 *
 * 앱 역번호
 *     ↓
 * ODPT Station 이름
 *
 * E01 ~ E38
 * =========================================================
 */

const OEDO_STATION_MAP: Record<string, string> = {
  /*
   * -------------------------------------------------------
   * 신주쿠니시구치 → 도초마에 순환부
   * -------------------------------------------------------
   */

  E01: "ShinjukuNishiguchi",

  E02: "HigashiShinjuku",

  E03: "WakamatsuKawada",

  E04: "UshigomeYanagicho",

  E05: "UshigomeKagurazaka",

  E06: "Iidabashi",

  E07: "Kasuga",

  E08: "HongoSanchome",

  E09: "UenoOkachimachi",

  E10: "ShinOkachimachi",

  E11: "Kuramae",

  E12: "Ryogoku",

  E13: "Morishita",

  E14: "KiyosumiShirakawa",

  E15: "MonzenNakacho",

  E16: "Tsukishima",

  E17: "Kachidoki",

  E18: "Tsukijishijo",

  E19: "Shiodome",

  E20: "Daimon",

  E21: "Akabanebashi",

  E22: "AzabuJuban",

  E23: "Roppongi",

  E24: "AoyamaItchome",

  E25: "KokuritsuKyogijo",

  E26: "Yoyogi",

  E27: "Shinjuku",

  /*
   * -------------------------------------------------------
   * 특수역
   * -------------------------------------------------------
   */

  E28: "Tochomae",

  /*
   * -------------------------------------------------------
   * 도초마에 → 히카리가오카
   * -------------------------------------------------------
   */

  E29: "NishiShinjukuGochome",

  E30: "NakanoSakaue",

  E31: "HigashiNakano",

  E32: "Nakai",

  E33: "OchiaiMinamiNagasaki",

  E34: "ShinEgota",

  E35: "Nerima",

  E36: "Toshimaen",

  E37: "NerimaKasugacho",

  E38: "Hikarigaoka",
};

/*
 * =========================================================
 * 앱 stationId
 *
 * E01
 * E02
 * ...
 * E38
 *
 *      ↓
 *
 * ODPT station
 *
 * ShinjukuNishiguchi
 * HigashiShinjuku
 * ...
 * Hikarigaoka
 * =========================================================
 */

export const getOedoOdptStationId = (stationId: string): string | undefined => {
  return OEDO_STATION_MAP[stationId];
};

/*
 * =========================================================
 * 공통 JSON Fetch
 * =========================================================
 */

const fetchJson = async <T>(url: string): Promise<T> => {
  const response = await fetch(url, {
    method: "GET",

    headers: {
      Accept: "application/json",
    },
  });

  /*
   * HTTP 오류
   */

  if (!response.ok) {
    let message = `도에이 API 요청 실패 (${response.status})`;

    try {
      const errorData = (await response.json()) as {
        error?: string;
      };

      if (errorData.error) {
        message = errorData.error;
      }
    } catch {
      /*
       * JSON이 아닌 오류 응답이면
       * 기본 메시지를 사용한다.
       */
    }

    throw new Error(message);
  }

  return (await response.json()) as T;
};

/*
 * =========================================================
 * 도에이 역 시간표
 * =========================================================
 *
 * 예:
 *
 * railway = Oedo
 * station = Roppongi
 *
 * ↓
 *
 * /api/station-timetable
 * ?railway=Oedo
 * &station=Roppongi
 *
 * =========================================================
 */

export const fetchToeiStationTimetable = async (
  railway: ToeiRailway,
  station: string,
): Promise<ToeiStationTimetableResponse> => {
  if (!station) {
    throw new Error("도에이 역 ID가 없습니다.");
  }

  const params = new URLSearchParams({
    railway,
    station,
  });

  const url =
    `${TOEI_API_BASE_URL}` + `/api/station-timetable?${params.toString()}`;

  try {
    const data = await fetchJson<ToeiStationTimetableResponse>(url);

    /*
     * 서버가 200으로
     * error를 반환하는 경우까지 대응
     */

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error("fetchToeiStationTimetable 오류:", {
      railway,
      station,
      error,
    });

    throw error;
  }
};

/*
 * =========================================================
 * 오에도선 역 시간표
 * =========================================================
 *
 * Expo에서는 ODPT 영문명을 몰라도 된다.
 *
 * fetchOedoTimetable("E23")
 *
 * ↓
 *
 * Roppongi
 *
 * ↓
 *
 * 실제 시간표
 *
 * =========================================================
 */

export const fetchOedoTimetable = async (
  stationId: string,
): Promise<ToeiStationTimetableResponse> => {
  const odptStation = getOedoOdptStationId(stationId);

  if (!odptStation) {
    throw new Error(`오에도선 역 매핑을 찾을 수 없습니다: ${stationId}`);
  }

  return fetchToeiStationTimetable("Oedo", odptStation);
};

/*
 * =========================================================
 * 특정 ODPT 방향 열차
 * =========================================================
 *
 * 예:
 *
 * InnerLoop
 * OuterLoop
 * Hikarigaoka
 *
 * =========================================================
 */

export const fetchOedoDirectionTrains = async (
  stationId: string,
  apiDirection: string,
): Promise<ToeiUpcomingTrain[]> => {
  const data = await fetchOedoTimetable(stationId);

  const direction = data.directions.find(
    (item) => item.direction === apiDirection,
  );

  if (!direction) {
    return [];
  }

  return direction.upcoming ?? [];
};

/*
 * =========================================================
 * Debug / Test
 * =========================================================
 *
 * 필요하면 stationId가 실제로 어떤 ODPT ID로
 * 변환되는지 확인할 때 사용할 수 있다.
 *
 * getOedoStationMapping("E23")
 *
 * →
 *
 * {
 *   stationId: "E23",
 *   odptStation: "Roppongi"
 * }
 *
 * =========================================================
 */

export const getOedoStationMapping = (stationId: string) => {
  return {
    stationId,

    odptStation: getOedoOdptStationId(stationId) ?? null,
  };
};
