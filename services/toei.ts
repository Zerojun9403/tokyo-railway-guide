/*
 * =========================================================
 * Tokyo Railway Guide
 * Toei Service
 * =========================================================
 *
 * 지원 노선
 *
 * A Asakusa
 * I Mita
 * S Shinjuku
 * E Oedo
 *
 * =========================================================
 */

const TOEI_API_BASE_URL = "https://toei-metro.vercel.app";

/*
 * =========================================================
 * 지원 노선
 * =========================================================
 */

export type ToeiRailway =
  | "Asakusa"
  | "Mita"
  | "Shinjuku"
  | "Oedo";

/*
 * =========================================================
 * API 열차 타입
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
 * API 방향 타입
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
 * API Response
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
 * 아사쿠사선 Station Map
 *
 * A01 니시마고메
 * ↓
 * A20 오시아게
 * =========================================================
 */

const ASAKUSA_STATION_MAP: Record<string, string> = {
  A01: "NishiMagome",

  A02: "Magome",

  A03: "Nakanobu",

  A04: "Togoshi",

  A05: "Gotanda",

  A06: "Takanawadai",

  A07: "Sengakuji",

  A08: "Mita",

  A09: "Daimon",

  A10: "Shimbashi",

  A11: "HigashiGinza",

  A12: "Takaracho",

  A13: "Nihombashi",

  A14: "Ningyocho",

  A15: "HigashiNihombashi",

  A16: "Asakusabashi",

  A17: "Kuramae",

  A18: "Asakusa",

  A19: "HonjoAzumabashi",

  A20: "Oshiage",
};

/*
 * =========================================================
 * 미타선 Station Map
 * =========================================================
 *
 * 아직 미타선 구현 전이므로 비워둔다.
 *
 * I01 ~
 * =========================================================
 */

const MITA_STATION_MAP: Record<string, string> = {};

/*
 * =========================================================
 * 신주쿠선 Station Map
 * =========================================================
 *
 * 아직 신주쿠선 구현 전이므로 비워둔다.
 *
 * S01 ~
 * =========================================================
 */

const SHINJUKU_STATION_MAP: Record<string, string> = {};

/*
 * =========================================================
 * 오에도선 Station Map
 *
 * E01 신주쿠니시구치
 * ↓
 * E28 도초마에
 * ↓
 * E38 히카리가오카
 * =========================================================
 */

const OEDO_STATION_MAP: Record<string, string> = {
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

  E28: "Tochomae",

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
 * 노선별 Station Map
 * =========================================================
 */

const STATION_MAPS: Record<
  ToeiRailway,
  Record<string, string>
> = {
  Asakusa: ASAKUSA_STATION_MAP,

  Mita: MITA_STATION_MAP,

  Shinjuku: SHINJUKU_STATION_MAP,

  Oedo: OEDO_STATION_MAP,
};

/*
 * =========================================================
 * 앱 lineId → Toei Railway
 * =========================================================
 *
 * asakusa
 *   ↓
 * Asakusa
 *
 * mita
 *   ↓
 * Mita
 *
 * shinjuku
 *   ↓
 * Shinjuku
 *
 * oedo
 *   ↓
 * Oedo
 *
 * =========================================================
 */

export const resolveToeiRailway = (
  lineId?: string,
): ToeiRailway | undefined => {
  switch (lineId) {
    case "asakusa":
      return "Asakusa";

    case "mita":
      return "Mita";

    case "shinjuku":
      return "Shinjuku";

    case "oedo":
      return "Oedo";

    default:
      return undefined;
  }
};

/*
 * =========================================================
 * Station ID 변환
 * =========================================================
 *
 * 예:
 *
 * Asakusa + A18
 *      ↓
 * Asakusa
 *
 * Oedo + E23
 *      ↓
 * Roppongi
 *
 * =========================================================
 */

export const getToeiStationName = (
  railway: ToeiRailway,
  stationId: string,
): string | undefined => {
  return STATION_MAPS[railway][stationId];
};

/*
 * =========================================================
 * 공통 JSON Fetch
 * =========================================================
 */

const fetchJson = async <T>(
  url: string,
): Promise<T> => {
  const response = await fetch(url, {
    method: "GET",

    headers: {
      Accept: "application/json",
    },
  });

  if (!response.ok) {
    let message =
      `도에이 API 요청 실패 (${response.status})`;

    try {
      const errorData =
        (await response.json()) as {
          error?: string;
        };

      if (errorData.error) {
        message = errorData.error;
      }
    } catch {
      /*
       * JSON 형식이 아닌 오류 응답이면
       * 기본 메시지를 사용한다.
       */
    }

    throw new Error(message);
  }

  return (await response.json()) as T;
};

/*
 * =========================================================
 * 공통 도에이 역 시간표
 * =========================================================
 *
 * railway = Asakusa
 * station = Asakusa
 *
 * 또는
 *
 * railway = Oedo
 * station = Roppongi
 *
 * =========================================================
 */

export const fetchToeiStationTimetable = async (
  railway: ToeiRailway,
  station: string,
): Promise<ToeiStationTimetableResponse> => {
  if (!station) {
    throw new Error(
      "도에이 역 ID가 없습니다.",
    );
  }

  const params = new URLSearchParams({
    railway,

    station,
  });

  const url =
    `${TOEI_API_BASE_URL}` +
    `/api/station-timetable?${params.toString()}`;

  try {
    const data =
      await fetchJson<ToeiStationTimetableResponse>(
        url,
      );

    if (data.error) {
      throw new Error(data.error);
    }

    return data;
  } catch (error) {
    console.error(
      "fetchToeiStationTimetable 오류:",
      {
        railway,

        station,

        error,
      },
    );

    throw error;
  }
};

/*
 * =========================================================
 * 공통 노선별 시간표
 * =========================================================
 *
 * 앱에서는 ODPT 역 이름을 몰라도 된다.
 *
 * fetchToeiTimetable(
 *   "Asakusa",
 *   "A18"
 * )
 *
 *      ↓
 *
 * Asakusa
 *
 *      ↓
 *
 * 실제 API 요청
 *
 * =========================================================
 */

export const fetchToeiTimetable = async (
  railway: ToeiRailway,
  stationId: string,
): Promise<ToeiStationTimetableResponse> => {
  const station =
    getToeiStationName(
      railway,
      stationId,
    );

  if (!station) {
    throw new Error(
      `${railway} 역 매핑을 찾을 수 없습니다: ${stationId}`,
    );
  }

  return fetchToeiStationTimetable(
    railway,
    station,
  );
};

/*
 * =========================================================
 * 방향 정규화
 * =========================================================
 */

const normalizeDirection = (
  value?: string | null,
) => {
  return (
    value
      ?.trim()
      .toLowerCase() ?? ""
  );
};

/*
 * =========================================================
 * 공통 방향별 다음 열차
 * =========================================================
 *
 * Tokyo Metro와 같은 역할
 *
 * railway
 * stationId
 * directionId
 *
 *      ↓
 *
 * Train[]
 *
 * =========================================================
 */

export const fetchToeiTrains = async (
  railway: ToeiRailway,
  stationId: string,
  directionId: string,
): Promise<ToeiUpcomingTrain[]> => {
  const data =
    await fetchToeiTimetable(
      railway,
      stationId,
    );

  const requested =
    normalizeDirection(
      directionId,
    );

  const matchingDirection =
    data.directions.find(
      (direction) =>
        normalizeDirection(
          direction.direction,
        ) === requested,
    );

  if (!matchingDirection) {
    const directions =
      data.directions
        .map(
          (item) =>
            item.direction,
        )
        .filter(Boolean)
        .join(", ");

    throw new Error(
      `${railway} ${stationId}에서 ${directionId} 방향을 찾을 수 없습니다. API 방향: ${
        directions || "없음"
      }`,
    );
  }

  return (
    matchingDirection.upcoming ??
    []
  );
};

/*
 * =========================================================
 * 기존 오에도선 호환 API
 * =========================================================
 *
 * 기존 useOedoTrains.ts 등이 바로 깨지지 않도록
 * 기존 함수 이름을 유지한다.
 *
 * 새 공통 Hook으로 전환 완료 후에도
 * 필요하면 그대로 유지할 수 있다.
 *
 * =========================================================
 */

export const getOedoOdptStationId = (
  stationId: string,
): string | undefined => {
  return getToeiStationName(
    "Oedo",
    stationId,
  );
};

/*
 * =========================================================
 * 기존 오에도선 시간표
 * =========================================================
 */

export const fetchOedoTimetable = async (
  stationId: string,
): Promise<ToeiStationTimetableResponse> => {
  return fetchToeiTimetable(
    "Oedo",
    stationId,
  );
};

/*
 * =========================================================
 * 기존 오에도선 방향별 열차
 * =========================================================
 */

export const fetchOedoDirectionTrains = async (
  stationId: string,
  apiDirection: string,
): Promise<ToeiUpcomingTrain[]> => {
  const data =
    await fetchOedoTimetable(
      stationId,
    );

  const direction =
    data.directions.find(
      (item) =>
        item.direction ===
        apiDirection,
    );

  if (!direction) {
    return [];
  }

  return (
    direction.upcoming ?? []
  );
};

/*
 * =========================================================
 * 기존 오에도선 Debug / Test
 * =========================================================
 */

export const getOedoStationMapping = (
  stationId: string,
) => {
  return {
    stationId,

    odptStation:
      getOedoOdptStationId(
        stationId,
      ) ?? null,
  };
};

/*
 * =========================================================
 * 공통 Debug / Test
 * =========================================================
 */

export const getToeiStationMapping = (
  railway: ToeiRailway,
  stationId: string,
) => {
  return {
    railway,

    stationId,

    odptStation:
      getToeiStationName(
        railway,
        stationId,
      ) ?? null,
  };
};