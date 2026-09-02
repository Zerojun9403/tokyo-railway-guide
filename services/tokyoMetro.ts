/*
 * =========================================================
 * Tokyo Railway Guide
 * Tokyo Metro Service
 * =========================================================
 */

const TOKYO_METRO_API_BASE_URL = "https://tokyo-metro-app.vercel.app";

/*
 * =========================================================
 * 지원 노선
 * =========================================================
 */

export type TokyoMetroRailway =
  | "Ginza"
  | "Marunouchi"
  | "Hibiya"
  | "Tozai"
  | "Chiyoda"
  | "Yurakucho"
  | "Hanzomon"
  | "Namboku"
  | "Fukutoshin";

/*
 * =========================================================
 * API 열차 타입
 * =========================================================
 */

export type TokyoMetroUpcomingTrain = {
  departureTime: string | null;

  minutesUntilDeparture: number | null;

  trainNumber: string | null;

  trainType: string | null;

  destinationStations: (string | null)[];

  train: string | null;
};

/*
 * =========================================================
 * 방향
 * =========================================================
 */

export type TokyoMetroDirection = {
  direction: string | null;

  railway: string | null;

  station: string | null;

  calendar: string | null;

  timetableCount: number;

  upcoming: TokyoMetroUpcomingTrain[];
};

/*
 * =========================================================
 * API Response
 * =========================================================
 */

export type TokyoMetroTimetableResponse = {
  railway: string;

  station: string;

  currentTime: {
    timezone: string;

    hour: number;

    minute: number;
  };

  calendar: string;

  totalTimetableCount: number;

  todayTimetableCount: number;

  directionCount: number;

  directions: TokyoMetroDirection[];
};

/*
 * =========================================================
 * 긴자선 Station Map
 * =========================================================
 */

const GINZA_STATION_MAP: Record<string, string> = {
  G01: "Shibuya",
  G02: "OmoteSando",
  G03: "Gaiemmae",
  G04: "AoyamaItchome",
  G05: "AkasakaMitsuke",
  G06: "TameikeSanno",
  G07: "Toranomon",
  G08: "Shimbashi",
  G09: "Ginza",
  G10: "Kyobashi",
  G11: "Nihombashi",
  G12: "Mitsukoshimae",
  G13: "Kanda",
  G14: "Suehirocho",
  G15: "UenoHiroKoji",
  G16: "Ueno",
  G17: "Inaricho",
  G18: "Tawaramachi",
  G19: "Asakusa",
};

/*
 * =========================================================
 * 마루노우치선 Station Map
 * =========================================================
 */

const MARUNOUCHI_STATION_MAP: Record<string, string> = {
  M01: "Ogikubo",
  M02: "MinamiAsagaya",
  M03: "ShinKoenji",
  M04: "HigashiKoenji",
  M05: "ShinNakano",
  M06: "NakanoSakaue",
  M07: "NishiShinjuku",
  M08: "Shinjuku",
  M09: "ShinjukuSanchome",
  M10: "ShinjukuGyoemmae",
  M11: "YotsuyaSanchome",
  M12: "Yotsuya",
  M13: "AkasakaMitsuke",
  M14: "KokkaiGijidomae",
  M15: "Kasumigaseki",
  M16: "Ginza",
  M17: "Tokyo",
  M18: "Otemachi",
  M19: "Awajicho",
  M20: "Ochanomizu",
  M21: "HongoSanchome",
  M22: "Korakuen",
  M23: "Myogadani",
  M24: "ShinOtsuka",
  M25: "Ikebukuro",
};

/*
 * =========================================================
 * 히비야선 Station Map
 * =========================================================
 */

const HIBIYA_STATION_MAP: Record<string, string> = {
  H01: "NakaMeguro",
  H02: "Ebisu",
  H03: "HiroO",
  H04: "Roppongi",
  H05: "Kamiyacho",
  H06: "ToranomonHills",
  H07: "Kasumigaseki",
  H08: "Hibiya",
  H09: "Ginza",
  H10: "HigashiGinza",
  H11: "Tsukiji",
  H12: "Hatchobori",
  H13: "Kayabacho",
  H14: "Ningyocho",
  H15: "Kodemmacho",
  H16: "Akihabara",
  H17: "NakaOkachimachi",
  H18: "Ueno",
  H19: "Iriya",
  H20: "Minowa",
  H21: "MinamiSenju",
  H22: "KitaSenju",
};

/*
 * =========================================================
 * 도자이선 Station Map
 * =========================================================
 *
 * T01 나카노
 * ↓
 * T23 니시후나바시
 * =========================================================
 */

const TOZAI_STATION_MAP: Record<string, string> = {
  T01: "Nakano",
  T02: "Ochiai",
  T03: "Takadanobaba",
  T04: "Waseda",
  T05: "Kagurazaka",
  T06: "Iidabashi",
  T07: "Kudanshita",
  T08: "Takebashi",
  T09: "Otemachi",
  T10: "Nihombashi",
  T11: "Kayabacho",
  T12: "MonzenNakacho",
  T13: "Kiba",
  T14: "Toyocho",
  T15: "MinamiSunamachi",
  T16: "NishiKasai",
  T17: "Kasai",
  T18: "Urayasu",
  T19: "MinamiGyotoku",
  T20: "Gyotoku",
  T21: "Myoden",
  T22: "BarakiNakayama",
  T23: "NishiFunabashi",
};

/*
 * =========================================================
 * 치요다선 Station Map
 * =========================================================
 *
 * C01 요요기우에하라
 * ↓
 * C20 기타아야세
 * =========================================================
 */

const CHIYODA_STATION_MAP: Record<string, string> = {
  C01: "YoyogiUehara",
  C02: "YoyogiKoen",
  C03: "MeijiJingumae",
  C04: "OmoteSando",
  C05: "Nogizaka",
  C06: "Akasaka",
  C07: "KokkaiGijidomae",
  C08: "Kasumigaseki",
  C09: "Hibiya",
  C10: "Nijubashimae",
  C11: "Otemachi",
  C12: "ShinOchanomizu",
  C13: "Yushima",
  C14: "Nezu",
  C15: "Sendagi",
  C16: "NishiNippori",
  C17: "Machiya",
  C18: "KitaSenju",
  C19: "Ayase",
  C20: "KitaAyase",
};

/*
 * =========================================================
 * 유라쿠초선 Station Map
 * =========================================================
 *
 * Y01 와코시
 * ↓
 * Y24 신키바
 * =========================================================
 */

const YURAKUCHO_STATION_MAP: Record<string, string> = {
  Y01: "Wakoshi",
  Y02: "ChikatetsuNarimasu",
  Y03: "ChikatetsuAkatsuka",
  Y04: "Heiwadai",
  Y05: "Hikawadai",
  Y06: "KotakeMukaihara",
  Y07: "Senkawa",
  Y08: "Kanamecho",
  Y09: "Ikebukuro",
  Y10: "HigashiIkebukuro",
  Y11: "Gokokuji",
  Y12: "Edogawabashi",
  Y13: "Iidabashi",
  Y14: "Ichigaya",
  Y15: "Kojimachi",
  Y16: "Nagatacho",
  Y17: "Sakuradamon",
  Y18: "Yurakucho",
  Y19: "GinzaItchome",
  Y20: "Shintomicho",
  Y21: "Tsukishima",
  Y22: "Toyosu",
  Y23: "Tatsumi",
  Y24: "ShinKiba",
};

/*
 * =========================================================
 * 한조몬선 Station Map
 * =========================================================
 *
 * Z01 시부야
 * ↓
 * Z14 오시아게
 * =========================================================
 */

const HANZOMON_STATION_MAP: Record<string, string> = {
  Z01: "Shibuya",
  Z02: "OmoteSando",
  Z03: "AoyamaItchome",
  Z04: "Nagatacho",
  Z05: "Hanzomon",
  Z06: "Kudanshita",
  Z07: "Jimbocho",
  Z08: "Otemachi",
  Z09: "Mitsukoshimae",
  Z10: "Suitengumae",
  Z11: "KiyosumiShirakawa",
  Z12: "Sumiyoshi",
  Z13: "Kinshicho",
  Z14: "Oshiage",
};

/*
 * =========================================================
 * 난보쿠선 Station Map
 * =========================================================
 *
 * N01 메구로
 * ↓
 * N19 아카바네이와부치
 * =========================================================
 */

const NAMBOKU_STATION_MAP: Record<string, string> = {
  N01: "Meguro",
  N02: "Shirokanedai",
  N03: "ShirokaneTakanawa",
  N04: "AzabuJuban",
  N05: "RoppongiItchome",
  N06: "TameikeSanno",
  N07: "Nagatacho",
  N08: "Yotsuya",
  N09: "Ichigaya",
  N10: "Iidabashi",
  N11: "Korakuen",
  N12: "Todaimae",
  N13: "HonKomagome",
  N14: "Komagome",
  N15: "Nishigahara",
  N16: "Oji",
  N17: "OjiKamiya",
  N18: "Shimo",
  N19: "AkabaneIwabuchi",
};

/*
 * =========================================================
 * 후쿠토신선 Station Map
 * =========================================================
 *
 * F01 와코시
 * ~
 * F16 시부야
 * =========================================================
 */

const FUKUTOSHIN_STATION_MAP: Record<string, string> = {
  F01: "Wakoshi",
  F02: "ChikatetsuNarimasu",
  F03: "ChikatetsuAkatsuka",
  F04: "Heiwadai",
  F05: "Hikawadai",
  F06: "KotakeMukaihara",
  F07: "Senkawa",
  F08: "Kanamecho",
  F09: "Ikebukuro",
  F10: "Zoshigaya",
  F11: "NishiWaseda",
  F12: "HigashiShinjuku",
  F13: "ShinjukuSanchome",
  F14: "KitaSando",
  F15: "MeijiJingumae",
  F16: "Shibuya",
};

/*
 * =========================================================
 * 노선별 Station Map
 * =========================================================
 */

const STATION_MAPS: Record<TokyoMetroRailway, Record<string, string>> = {
  Ginza: GINZA_STATION_MAP,

  Marunouchi: MARUNOUCHI_STATION_MAP,

  Hibiya: HIBIYA_STATION_MAP,

  Tozai: TOZAI_STATION_MAP,

  Chiyoda: CHIYODA_STATION_MAP,

  Yurakucho: YURAKUCHO_STATION_MAP,

  Hanzomon: HANZOMON_STATION_MAP,

  Namboku: NAMBOKU_STATION_MAP,

  Fukutoshin: FUKUTOSHIN_STATION_MAP,
};

/*
 * =========================================================
 * 앱 lineId → Tokyo Metro Railway
 * =========================================================
 */

export const resolveTokyoMetroRailway = (
  lineId?: string,
): TokyoMetroRailway | undefined => {
  switch (lineId) {
    case "ginza":
      return "Ginza";

    case "marunouchi":
      return "Marunouchi";

    case "hibiya":
      return "Hibiya";

    case "tozai":
      return "Tozai";

    case "chiyoda":
      return "Chiyoda";

    case "yurakucho":
      return "Yurakucho";

    case "hanzomon":
      return "Hanzomon";

    case "namboku":
      return "Namboku";

    case "fukutoshin":
      return "Fukutoshin";

    default:
      return undefined;
  }
};

/*
 * =========================================================
 * Station ID 변환
 * =========================================================
 */

export const getTokyoMetroStationName = (
  railway: TokyoMetroRailway,

  stationId: string,
) => {
  return STATION_MAPS[railway][stationId];
};

/*
 * =========================================================
 * Fetch JSON
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
    const text = await response.text();

    console.error("Tokyo Metro API 오류:", response.status, text);

    throw new Error(`Tokyo Metro API 요청 실패 (${response.status})`);
  }

  return (await response.json()) as T;
};

/*
 * =========================================================
 * 역 시간표
 * =========================================================
 */

export const fetchTokyoMetroTimetable = async (
  railway: TokyoMetroRailway,

  stationId: string,
): Promise<TokyoMetroTimetableResponse> => {
  const station = getTokyoMetroStationName(
    railway,

    stationId,
  );

  if (!station) {
    throw new Error(`${railway} 역 매핑을 찾을 수 없습니다: ${stationId}`);
  }

  const params = new URLSearchParams({
    railway,

    station,
  });

  const url =
    `${TOKYO_METRO_API_BASE_URL}` +
    `/api/station-timetable?${params.toString()}`;

  return fetchJson<TokyoMetroTimetableResponse>(url);
};

/*
 * =========================================================
 * 방향 정규화
 * =========================================================
 */

const normalizeDirection = (value?: string | null) => {
  return value?.trim().toLowerCase() ?? "";
};

/*
 * =========================================================
 * 방향별 다음 열차
 * =========================================================
 */

export const fetchTokyoMetroTrains = async (
  railway: TokyoMetroRailway,

  stationId: string,

  directionId: string,
): Promise<TokyoMetroUpcomingTrain[]> => {
  const data = await fetchTokyoMetroTimetable(
    railway,

    stationId,
  );

  const requested = normalizeDirection(directionId);

  /*
   * 앱 directionId
   *
   * 긴자선
   * asakusa
   * shibuya
   *
   * 마루노우치선
   * ogikubo
   * ikebukuro
   *
   * 히비야선
   * nakameguro
   * kitasenju
   *
   * 도자이선
   * nakano
   * nishifunabashi
   *
   * API direction
   *
   * Asakusa
   * Shibuya
   * Ogikubo
   * Ikebukuro
   * NakaMeguro
   * KitaSenju
   * Nakano
   * NishiFunabashi
   *
   * normalizeDirection()을 통해
   * 대소문자 차이를 제거한다.
   */

  const matchingDirection = data.directions.find(
    (direction) => normalizeDirection(direction.direction) === requested,
  );

  if (!matchingDirection) {
    const directions = data.directions
      .map((item) => item.direction)
      .filter(Boolean)
      .join(", ");

    throw new Error(
      `${railway} ${stationId}에서 ${directionId} 방향을 찾을 수 없습니다. API 방향: ${
        directions || "없음"
      }`,
    );
  }

  return matchingDirection.upcoming ?? [];
};
