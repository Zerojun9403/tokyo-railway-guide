/*
 * =========================================================
 * Tokyo Railway Guide - JR East Service
 * =========================================================
 *
 * 프로젝트:
 * tokyo-railway-guide (Expo)
 *
 * 역할:
 *
 * tokyo-metro-sigma 서버
 *      ↓
 * /api/timetable
 *      ↓
 * JR East / ODPT 시간표
 *      ↓
 * Expo 앱
 *
 * =========================================================
 */

const JR_EAST_API_BASE_URL = "https://tokyo-metro-sigma.vercel.app";

/*
 * =========================================================
 * JR 지원 노선
 * =========================================================
 */

export type JrRailway =
  | "Yamanote"
  | "ChuoRapid"
  | "ChuoSobuLocal"
  | "KeihinTohokuNegishi"
  | "SaikyoKawagoe"
  | "YokosukaSobu"
  | "NaritaAirport"
  | "Tokaido"
  | "ShonanShinjuku"
  | "Keiyo";

/*
 * =========================================================
 * JR 다음 열차
 * =========================================================
 */

export type JrNextTrain = {
  id: string;

  operator: "jr-east";

  lineId: string;

  stationId: string;

  directionId: string;

  departureTime: string;

  trainType?: string;

  trainTypeKo?: string;

  trainTypeJa?: string;

  destinationStation?: string;

  destinationKo?: string;

  destinationJa?: string;
};

export type JrTimetableApiResponse = {
  operator: "jr-east";

  lineId: string;

  stationId: string;

  directionId: string;

  updatedAt: string;

  timetable: JrNextTrain[];
};
/*
 * =========================================================
 * JR 시간표 API 응답
 * =========================================================
 */

export type JrTimetableResponse = {
  station: string;

  railway: JrRailway;

  calendar: "Weekday" | "SaturdayHoliday";

  updatedAt: string;

  directions: {
    /*
     * 야마노테
     */

    innerLoop?: JrNextTrain[];

    outerLoop?: JrNextTrain[];

    /*
     * 주오 쾌속
     */

    inbound?: JrNextTrain[];

    outbound?: JrNextTrain[];

    /*
     * 주오·소부 완행
     */

    eastbound?: JrNextTrain[];

    westbound?: JrNextTrain[];
  };
};

/*
 * =========================================================
 * JR 앱 Station ID → ODPT Station ID
 * =========================================================
 *
 * Expo 앱에서는:
 *
 * JY17
 * JC05
 * JB10
 *
 * 같은 역번호를 사용한다.
 *
 * Next.js API에서는:
 *
 * Shinjuku
 * Tokyo
 * Nakano
 *
 * 같은 ODPT station ID를 사용한다.
 * =========================================================
 */

/*
 * =========================================================
 * 야마노테선
 * =========================================================
 */

const YAMANOTE_STATION_MAP: Record<string, string> = {
  JY01: "Tokyo",
  JY02: "Kanda",
  JY03: "Akihabara",
  JY04: "Okachimachi",
  JY05: "Ueno",
  JY06: "Uguisudani",
  JY07: "Nippori",
  JY08: "NishiNippori",
  JY09: "Tabata",
  JY10: "Komagome",
  JY11: "Sugamo",
  JY12: "Otsuka",
  JY13: "Ikebukuro",
  JY14: "Mejiro",
  JY15: "Takadanobaba",
  JY16: "ShinOkubo",
  JY17: "Shinjuku",
  JY18: "Yoyogi",
  JY19: "Harajuku",
  JY20: "Shibuya",
  JY21: "Ebisu",
  JY22: "Meguro",
  JY23: "Gotanda",
  JY24: "Osaki",
  JY25: "Shinagawa",
  JY26: "TakanawaGateway",
  JY27: "Tamachi",
  JY28: "Hamamatsucho",
  JY29: "Shimbashi",
  JY30: "Yurakucho",
};

/*
 * =========================================================
 * 주오 쾌속선
 * =========================================================
 *
 * 우선 주요 도쿄권 역 기준.
 *
 * 노선 데이터 파일을 만들면서
 * 필요한 역을 계속 추가할 수 있다.
 * =========================================================
 */

const CHUO_RAPID_STATION_MAP: Record<string, string> = {
  JC01: "Tokyo",
  JC02: "Kanda",
  JC03: "Ochanomizu",
  JC04: "Yotsuya",
  JC05: "Shinjuku",
  JC06: "Nakano",
  JC07: "Koenji",
  JC08: "Asagaya",
  JC09: "Ogikubo",
  JC10: "NishiOgikubo",
  JC11: "Kichijoji",
  JC12: "Mitaka",
  JC13: "MusashiSakai",
  JC14: "HigashiKoganei",
  JC15: "MusashiKoganei",
  JC16: "Kokubunji",
  JC17: "NishiKokubunji",
  JC18: "Kunitachi",
  JC19: "Tachikawa",
  JC20: "Hino",
  JC21: "Toyoda",
  JC22: "Hachioji",
  JC23: "NishiHachioji",
  JC24: "Takao",
};

/*
 * =========================================================
 * 주오·소부 완행선
 * =========================================================
 *
 * 미타카 → 치바 방향
 *
 * 현재 앱에서 사용할 역 기준으로 먼저 등록.
 * 이후 필요 역 추가 가능.
 * =========================================================
 */

const CHUO_SOBU_LOCAL_STATION_MAP: Record<string, string> = {
  JB01: "Mitaka",
  JB02: "Kichijoji",
  JB03: "NishiOgikubo",
  JB04: "Ogikubo",
  JB05: "Asagaya",
  JB06: "Koenji",
  JB07: "Nakano",
  JB08: "HigashiNakano",
  JB09: "Okubo",
  JB10: "Shinjuku",
  JB11: "Yoyogi",
  JB12: "Sendagaya",
  JB13: "Shinanomachi",
  JB14: "Yotsuya",
  JB15: "Ichigaya",
  JB16: "Iidabashi",
  JB17: "Suidobashi",
  JB18: "Ochanomizu",
  JB19: "Akihabara",
  JB20: "Asakusabashi",
  JB21: "Ryogoku",
  JB22: "Kinshicho",
  JB23: "Kameido",
  JB24: "Hirai",
  JB25: "Shinkoiwa",
  JB26: "Koiwa",
  JB27: "Ichikawa",
  JB28: "Motoyawata",
  JB29: "ShimosaNakayama",
  JB30: "NishiFunabashi",
  JB31: "Funabashi",
  JB32: "HigashiFunabashi",
  JB33: "Tsudanuma",
  JB34: "MakuhariHongo",
  JB35: "Makuhari",
  JB36: "ShinKemigawa",
  JB37: "Inage",
  JB38: "NishiChiba",
  JB39: "Chiba",
};

/*
 * =========================================================
 * 게이힌도호쿠·네기시선 Station Map
 * =========================================================
 *
 * JK47 오미야
 * ↓
 * JK26 도쿄
 * ↓
 * JK12 요코하마
 * ↓
 * JK01 오후나
 *
 * =========================================================
 */

const KEIHIN_TOHOKU_NEGISHI_STATION_MAP: Record<string, string> = {
  JK47: "Omiya",
  JK46: "SaitamaShintoshin",
  JK45: "Yono",
  JK44: "KitaUrawa",
  JK43: "Urawa",
  JK42: "MinamiUrawa",
  JK41: "Warabi",
  JK40: "NishiKawaguchi",
  JK39: "Kawaguchi",
  JK38: "Akabane",
  JK37: "HigashiJujo",
  JK36: "Oji",
  JK35: "Kaminakazato",
  JK34: "Tabata",
  JK33: "NishiNippori",
  JK32: "Nippori",
  JK31: "Uguisudani",
  JK30: "Ueno",
  JK29: "Okachimachi",
  JK28: "Akihabara",
  JK27: "Kanda",
  JK26: "Tokyo",
  JK25: "Yurakucho",
  JK24: "Shimbashi",
  JK23: "Hamamatsucho",
  JK22: "Tamachi",
  JK21: "TakanawaGateway",
  JK20: "Shinagawa",
  JK19: "Oimachi",
  JK18: "Omori",
  JK17: "Kamata",
  JK16: "Kawasaki",
  JK15: "Tsurumi",
  JK14: "ShinKoyasu",
  JK13: "HigashiKanagawa",
  JK12: "Yokohama",
  JK11: "Sakuragicho",
  JK10: "Kannai",
  JK09: "Ishikawacho",
  JK08: "Yamate",
  JK07: "Negishi",
  JK06: "Isogo",
  JK05: "ShinSugita",
  JK04: "Yokodai",
  JK03: "Konandai",
  JK02: "Hongodai",
  JK01: "Ofuna",
};

/*
 * =========================================================
 * 사이쿄선 Station Map
 * =========================================================
 *
 * JA08 오사키
 * ↓
 * JA11 신주쿠
 * ↓
 * JA15 아카바네
 * ↓
 * JA21 무사시우라와
 * ↓
 * JA26 오미야
 *
 * ODPT Railway:
 * JR-East.SaikyoKawagoe
 *
 * =========================================================
 */

const SAIKYO_KAWAGOE_STATION_MAP: Record<string, string> = {
  JA08: "Osaki",
  JA09: "Ebisu",
  JA10: "Shibuya",
  JA11: "Shinjuku",
  JA12: "Ikebukuro",
  JA13: "Itabashi",
  JA14: "Jujo",
  JA15: "Akabane",
  JA16: "KitaAkabane",
  JA17: "Ukimafunado",
  JA18: "TodaKoen",
  JA19: "Toda",
  JA20: "KitaToda",
  JA21: "MusashiUrawa",
  JA22: "NakaUrawa",
  JA23: "MinamiYono",
  JA24: "YonoHommachi",
  JA25: "KitaYono",
  JA26: "Omiya",
};

/*
 * =========================================================
 * 요코스카선 · 소부쾌속선 Station Map
 * =========================================================
 *
 * Kurihama
 * ↓
 * Yokohama
 * ↓
 * Tokyo
 * ↓
 * Kinshicho
 * ↓
 * Chiba
 *
 * ODPT Railway:
 * Tokyo 서쪽/남쪽 → JR-East.Yokosuka
 * Tokyo 동쪽       → JR-East.SobuRapid
 *
 * =========================================================
 */

const YOKOSUKA_SOBU_STATION_MAP: Record<string, string> = {
  JO01: "Kurihama",
  JO02: "Kinugasa",
  JO03: "Yokosuka",
  JO04: "Taura",
  JO05: "HigashiZushi",
  JO06: "Zushi",
  JO07: "Kamakura",
  JO08: "KitaKamakura",
  JO09: "Ofuna",
  JO10: "Totsuka",
  JO11: "HigashiTotsuka",
  JO12: "Hodogaya",
  JO13: "Yokohama",
  JO14: "ShinKawasaki",
  JO15: "MusashiKosugi",
  JO16: "NishiOi",
  JO17: "Shinagawa",
  JO18: "Shimbashi",
  JO19: "Tokyo",
  JO20: "ShinNihombashi",
  JO21: "Bakurocho",
  JO22: "Kinshicho",
  JO23: "ShinKoiwa",
  JO24: "Ichikawa",
  JO25: "Funabashi",
  JO26: "Tsudanuma",
  JO27: "Inage",
  JO28: "Chiba",
};

const NARITA_AIRPORT_STATION_MAP: Record<string, string> = {
  JO28: "Chiba",
  JO29: "HigashiChiba",
  JO30: "Tsuga",
  JO31: "Yotsukaido",
  JO32: "Monoi",
  JO33: "Sakura",
  JO34: "Shisui",
  JO35: "Narita",
  JO36: "NaritaAirportTerminal2and3",
  JO37: "NaritaAirportTerminal1",
};

/*
 * =========================================================
 * 도카이도선 Station Map
 * =========================================================
 */

const TOKAIDO_STATION_MAP: Record<string, string> = {
  JT01: "Tokyo",
  JT02: "Shimbashi",
  JT03: "Shinagawa",
  JT04: "Kawasaki",
  JT05: "Yokohama",
  JT06: "Totsuka",
  JT07: "Ofuna",
  JT08: "Fujisawa",
  JT09: "Tsujido",
  JT10: "Chigasaki",
  JT11: "Hiratsuka",
  JT12: "Oiso",
  JT13: "Ninomiya",
  JT14: "Kozu",
  JT15: "Kamonomiya",
  JT16: "Odawara",
  JT17: "Hayakawa",
  JT18: "Nebukawa",
  JT19: "Manazuru",
  JT20: "Yugawara",
  JT21: "Atami",
};

/*
 * =========================================================
 * 쇼난신주쿠라인 Station Map
 * =========================================================
 */

const SHONAN_SHINJUKU_STATION_MAP: Record<string, string> = {
  JS09: "Ofuna",
  JS10: "Totsuka",
  JS11: "HigashiTotsuka",
  JS12: "Hodogaya",
  JS13: "Yokohama",
  JS14: "ShinKawasaki",
  JS15: "MusashiKosugi",
  JS16: "NishiOi",
  JS17: "Osaki",
  JS18: "Ebisu",
  JS19: "Shibuya",
  JS20: "Shinjuku",
  JS21: "Ikebukuro",
  JS22: "Akabane",
  JS23: "Urawa",
  JS24: "Omiya",
};

/*
 * =========================================================
 * 게이요선 Station Map
 * =========================================================
 */

const KEIYO_STATION_MAP: Record<string, string> = {
  JE01: "Tokyo",
  JE02: "Hatchobori",
  JE03: "Etchujima",
  JE04: "Shiomi",
  JE05: "ShinKiba",
  JE06: "KasaiRinkaiKoen",
  JE07: "Maihama",
  JE08: "ShinUrayasu",
  JE09: "IchikawaShiohama",
  JE10: "FutamataShimmachi",
  JE11: "MinamiFunabashi",
  JE12: "ShinNarashino",
  JE13: "MakuhariToyosuna",
  JE14: "KaihinMakuhari",
  JE15: "Kemigawahama",
  JE16: "InageKaigan",
  JE17: "ChibaMinato",
  JE18: "Soga",
};

/*
 * =========================================================
 * 노선별 Station Map
 * =========================================================
 */

const JR_STATION_MAPS: Record<JrRailway, Record<string, string>> = {
  Yamanote: YAMANOTE_STATION_MAP,
  ChuoRapid: CHUO_RAPID_STATION_MAP,
  ChuoSobuLocal: CHUO_SOBU_LOCAL_STATION_MAP,
  KeihinTohokuNegishi: KEIHIN_TOHOKU_NEGISHI_STATION_MAP,
  SaikyoKawagoe: SAIKYO_KAWAGOE_STATION_MAP,
  YokosukaSobu: YOKOSUKA_SOBU_STATION_MAP,
  NaritaAirport: NARITA_AIRPORT_STATION_MAP,
  Tokaido: TOKAIDO_STATION_MAP,
  ShonanShinjuku: SHONAN_SHINJUKU_STATION_MAP,
  Keiyo: KEIYO_STATION_MAP,
};

/*
 * =========================================================
 * 앱 Station ID → ODPT Station ID
 * =========================================================
 */

export const getJrEastOdptStationId = (
  railway: JrRailway,
  stationId: string,
): string | undefined => {
  return JR_STATION_MAPS[railway][stationId];
};

/*
 * =========================================================
 * 기존 호환용 야마노테 함수
 * =========================================================
 */

export const getYamanoteOdptStationId = (
  stationId: string,
): string | undefined => {
  return getJrEastOdptStationId("Yamanote", stationId);
};

/*
 * =========================================================
 * 공통 JSON fetch
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
    throw new Error(`JR East API 요청 실패 (${response.status})`);
  }

  return (await response.json()) as T;
};

/*
 * =========================================================
 * JR 공통 시간표
 * =========================================================
 *
 * 예:
 *
 * fetchJrTimetable(
 *   "ChuoRapid",
 *   "Shinjuku",
 * )
 *
 * ↓
 *
 * /api/timetable
 * ?railway=ChuoRapid
 * &station=Shinjuku
 * =========================================================
 */

export const fetchJrTimetable = async (
  railway: JrRailway,
  station: string,
): Promise<JrTimetableResponse> => {
  if (!station) {
    throw new Error("JR 역 ID가 없습니다.");
  }

  const params = new URLSearchParams({
    railway,
    station,
  });

  const url = `${JR_EAST_API_BASE_URL}` + `/api/timetable?${params.toString()}`;

  try {
    return await fetchJson<JrTimetableResponse>(url);
  } catch (error) {
    console.error("fetchJrTimetable 오류:", error);

    throw error;
  }
};

/*
 * =========================================================
 * 앱 역번호를 받아 시간표 조회
 * =========================================================
 */

export const fetchJrEastTimetable = async (
  railway: JrRailway,
  stationId: string,
): Promise<JrTimetableResponse> => {
  const odptStationId = getJrEastOdptStationId(railway, stationId);

  if (!odptStationId) {
    throw new Error(`${railway} 역 매핑을 찾을 수 없습니다: ${stationId}`);
  }

  return fetchJrTimetable(railway, odptStationId);
};

/*
 * =========================================================
 * JR 공통 방향별 열차
 * =========================================================
 *
 * API 방향명:
 *
 * Yamanote
 * ├─ innerLoop
 * └─ outerLoop
 *
 * ChuoRapid
 * ├─ inbound
 * └─ outbound
 *
 * ChuoSobuLocal
 * ├─ eastbound
 * └─ westbound
 * =========================================================
 */

export const fetchJrEastTrains = async (
  railway: JrRailway,
  stationId: string,
  directionId: string,
): Promise<JrNextTrain[]> => {
  /*
   * =====================================================
   * 주오 쾌속 - Tokyo Railway API
   * =====================================================
   */

  if (railway === "ChuoRapid") {
    const odptStationId = getJrEastOdptStationId(railway, stationId);

    if (!odptStationId) {
      throw new Error(`${railway} 역 매핑을 찾을 수 없습니다: ${stationId}`);
    }

    const normalizedDirection = directionId.trim().toLowerCase();

    const apiDirection =
      normalizedDirection === "inbound"
        ? "Inbound"
        : normalizedDirection === "outbound"
          ? "Outbound"
          : directionId;

    const params = new URLSearchParams({
      operator: "jr-east",
      lineId: "chuo-rapid",
      stationId: odptStationId,
      directionId: apiDirection,
      upcoming: "true",
      limit: "10",
    });

    const url =
      "https://tokyo-railway-api.vercel.app" +
      `/api/timetable?${params.toString()}`;

    const response = await fetchJson<JrTimetableApiResponse>(url);

    return response.timetable ?? [];
  }
  /*
   * =====================================================
   * 주오·소부선 각역정차 - Tokyo Railway API
   * =====================================================
   */

  if (railway === "ChuoSobuLocal") {
    const odptStationId = getJrEastOdptStationId(railway, stationId);

    if (!odptStationId) {
      throw new Error(`${railway} 역 매핑을 찾을 수 없습니다: ${stationId}`);
    }

    const normalizedDirection = directionId.trim().toLowerCase();

    const apiDirection =
      normalizedDirection === "eastbound"
        ? "Eastbound"
        : normalizedDirection === "westbound"
          ? "Westbound"
          : directionId;

    const params = new URLSearchParams({
      operator: "jr-east",
      lineId: "chuo-sobu",
      stationId: odptStationId,
      directionId: apiDirection,
      upcoming: "true",
      limit: "10",
    });

    const url =
      "https://tokyo-railway-api.vercel.app" +
      `/api/timetable?${params.toString()}`;

    const response = await fetchJson<JrTimetableApiResponse>(url);

    return response.timetable ?? [];
  }

  /*
   * =====================================================
   * 게이힌도호쿠·네기시선 - Tokyo Railway API
   * =====================================================
   */

  if (railway === "KeihinTohokuNegishi") {
    const odptStationId = getJrEastOdptStationId(railway, stationId);

    if (!odptStationId) {
      throw new Error(`${railway} 역 매핑을 찾을 수 없습니다: ${stationId}`);
    }

    const normalizedDirection = directionId.trim().toLowerCase();

    const apiDirection =
      normalizedDirection === "northbound"
        ? "Northbound"
        : normalizedDirection === "southbound"
          ? "Southbound"
          : directionId;

    const params = new URLSearchParams({
      operator: "jr-east",
      lineId: "keihin-tohoku",
      stationId: odptStationId,
      directionId: apiDirection,
      upcoming: "true",
      limit: "10",
    });

    const url =
      "https://tokyo-railway-api.vercel.app" +
      `/api/timetable?${params.toString()}`;

    const response = await fetchJson<JrTimetableApiResponse>(url);

    return response.timetable ?? [];
  }

  /*
   * =====================================================
   * 사이쿄선 - Tokyo Railway API
   * =====================================================
   */

  if (railway === "SaikyoKawagoe") {
    const odptStationId = getJrEastOdptStationId(railway, stationId);

    if (!odptStationId) {
      throw new Error(`${railway} 역 매핑을 찾을 수 없습니다: ${stationId}`);
    }

    const normalizedDirection = directionId.trim().toLowerCase();

    const apiDirection =
      normalizedDirection === "northbound"
        ? "Northbound"
        : normalizedDirection === "southbound"
          ? "Southbound"
          : directionId;

    const params = new URLSearchParams({
      operator: "jr-east",
      lineId: "saikyo",
      stationId: odptStationId,
      directionId: apiDirection,
      upcoming: "true",
      limit: "10",
    });

    const url =
      "https://tokyo-railway-api.vercel.app" +
      `/api/timetable?${params.toString()}`;

    const response = await fetchJson<JrTimetableApiResponse>(url);

    return response.timetable ?? [];
  }
  /*
   * =====================================================
   * 요코스카선 · 소부쾌속선 - Tokyo Railway API
   * =====================================================
   *
   * 앱에서는 하나의 YokosukaSobu 노선으로 취급한다.
   *
   * JO01 ~ JO18
   * → JR-East.Yokosuka
   *
   * JO19 Tokyo
   * → Chiba 방면: JR-East.SobuRapid / Outbound
   * → Kurihama 방면: JR-East.Yokosuka / Outbound
   *
   * JO20 ~ JO28
   * → JR-East.SobuRapid
   * =====================================================
   */

  if (railway === "YokosukaSobu") {
    const odptStationId = getJrEastOdptStationId(railway, stationId);

    if (!odptStationId) {
      throw new Error(`${railway} 역 매핑을 찾을 수 없습니다: ${stationId}`);
    }

    const normalizedDirection = directionId.trim().toLowerCase();

    const stationNumber = Number(stationId.replace("JO", ""));

    const isTokyo = stationId === "JO19";

    let apiLineId: "yokosuka" | "sobu-rapid";
    let apiDirection: "Inbound" | "Outbound";

    if (isTokyo) {
      if (
        normalizedDirection === "northbound" ||
        normalizedDirection === "chiba"
      ) {
        apiLineId = "sobu-rapid";
        apiDirection = "Outbound";
      } else {
        apiLineId = "yokosuka";
        apiDirection = "Outbound";
      }
    } else if (stationNumber < 19) {
      apiLineId = "yokosuka";

      apiDirection =
        normalizedDirection === "northbound" || normalizedDirection === "tokyo"
          ? "Inbound"
          : "Outbound";
    } else {
      apiLineId = "sobu-rapid";

      apiDirection =
        normalizedDirection === "northbound" || normalizedDirection === "chiba"
          ? "Outbound"
          : "Inbound";
    }

    const params = new URLSearchParams({
      operator: "jr-east",
      lineId: apiLineId,
      stationId: odptStationId,
      directionId: apiDirection,
      upcoming: "true",
      limit: "10",
    });

    const url =
      "https://tokyo-railway-api.vercel.app" +
      `/api/timetable?${params.toString()}`;

    const response = await fetchJson<JrTimetableApiResponse>(url);

    return response.timetable ?? [];
  }

  /*
   * =====================================================
   * 나리타선 · 나리타공항지선 - Tokyo Railway API
   * =====================================================
   *
   * JO28 ~ JO35
   * → JR-East.Narita
   *
   * JO36 ~ JO37
   * → JR-East.NaritaAirportBranch
   *
   * JO35 Narita
   * → 공항 방면은 NaritaAirportBranch / Outbound
   * =====================================================
   */

  if (railway === "NaritaAirport") {
    const odptStationId = getJrEastOdptStationId(railway, stationId);

    if (!odptStationId) {
      throw new Error(`${railway} 역 매핑을 찾을 수 없습니다: ${stationId}`);
    }

    const normalizedDirection = directionId.trim().toLowerCase();

    const stationNumber = Number(stationId.replace("JO", ""));

    const isNarita = stationId === "JO35";

    let apiLineId: "narita" | "narita-airport";
    let apiDirection: "Inbound" | "Outbound";

    if (isNarita) {
      if (
        normalizedDirection === "outbound" ||
        normalizedDirection === "airport" ||
        normalizedDirection === "naritaairport"
      ) {
        apiLineId = "narita-airport";
        apiDirection = "Outbound";
      } else {
        apiLineId = "narita";
        apiDirection = "Inbound";
      }
    } else if (stationNumber < 35) {
      apiLineId = "narita";

      apiDirection =
        normalizedDirection === "outbound" ||
        normalizedDirection === "airport" ||
        normalizedDirection === "naritaairport"
          ? "Outbound"
          : "Inbound";
    } else {
      apiLineId = "narita-airport";

      apiDirection =
        normalizedDirection === "outbound" ||
        normalizedDirection === "airport" ||
        normalizedDirection === "naritaairport"
          ? "Outbound"
          : "Inbound";
    }

    const params = new URLSearchParams({
      operator: "jr-east",
      lineId: apiLineId,
      stationId: odptStationId,
      directionId: apiDirection,
      upcoming: "true",
      limit: "10",
    });

    const url =
      "https://tokyo-railway-api.vercel.app" +
      `/api/timetable?${params.toString()}`;

    const response = await fetchJson<JrTimetableApiResponse>(url);

    return response.timetable ?? [];
  }
  /*
   * =====================================================
   * 도카이도선 - Tokyo Railway API
   * =====================================================
   */

  if (railway === "Tokaido") {
    const odptStationId = getJrEastOdptStationId(railway, stationId);

    if (!odptStationId) {
      throw new Error(`${railway} 역 매핑을 찾을 수 없습니다: ${stationId}`);
    }

    const normalizedDirection = directionId.trim().toLowerCase();

    const apiDirection =
      normalizedDirection === "inbound"
        ? "Inbound"
        : normalizedDirection === "outbound"
          ? "Outbound"
          : directionId;

    const params = new URLSearchParams({
      operator: "jr-east",
      lineId: "tokaido",
      stationId: odptStationId,
      directionId: apiDirection,
      upcoming: "true",
      limit: "10",
    });

    const url =
      "https://tokyo-railway-api.vercel.app" +
      `/api/timetable?${params.toString()}`;

    const response = await fetchJson<JrTimetableApiResponse>(url);

    return response.timetable ?? [];
  }

  /*
   * =====================================================
   * 쇼난신주쿠라인 - Tokyo Railway API
   * =====================================================
   */

  if (railway === "ShonanShinjuku") {
    const odptStationId = getJrEastOdptStationId(railway, stationId);

    if (!odptStationId) {
      throw new Error(`${railway} 역 매핑을 찾을 수 없습니다: ${stationId}`);
    }

    const normalizedDirection = directionId.trim().toLowerCase();

    const apiDirection =
      normalizedDirection === "northbound"
        ? "Northbound"
        : normalizedDirection === "southbound"
          ? "Southbound"
          : directionId;

    const params = new URLSearchParams({
      operator: "jr-east",
      lineId: "shonan-shinjuku",
      stationId: odptStationId,
      directionId: apiDirection,
      upcoming: "true",
      limit: "10",
    });

    const url =
      "https://tokyo-railway-api.vercel.app" +
      `/api/timetable?${params.toString()}`;

    const response = await fetchJson<JrTimetableApiResponse>(url);

    return response.timetable ?? [];
  }

  /*
   * =====================================================
   * 게이요선 - Tokyo Railway API
   * =====================================================
   */

  if (railway === "Keiyo") {
    const odptStationId = getJrEastOdptStationId(railway, stationId);

    if (!odptStationId) {
      throw new Error(`${railway} 역 매핑을 찾을 수 없습니다: ${stationId}`);
    }

    const normalizedDirection = directionId.trim().toLowerCase();

    const apiDirection =
      normalizedDirection === "inbound"
        ? "Inbound"
        : normalizedDirection === "outbound"
          ? "Outbound"
          : directionId;

    const params = new URLSearchParams({
      operator: "jr-east",
      lineId: "keiyo",
      stationId: odptStationId,
      directionId: apiDirection,
      upcoming: "true",
      limit: "10",
    });

    const url =
      "https://tokyo-railway-api.vercel.app" +
      `/api/timetable?${params.toString()}`;

    const response = await fetchJson<JrTimetableApiResponse>(url);

    return response.timetable ?? [];
  }

  /*
   * =====================================================
   * 기존 JR API
   * =====================================================
   *
   * 야마노테 등 기존 정상 동작을 유지한다.
   * =====================================================
   */

  const data = await fetchJrEastTimetable(railway, stationId);

  /*
   * =====================================================
   * 야마노테
   * =====================================================
   */

  if (railway === "Yamanote") {
    if (directionId === "inner" || directionId === "innerLoop") {
      return data.directions.innerLoop ?? [];
    }

    if (directionId === "outer" || directionId === "outerLoop") {
      return data.directions.outerLoop ?? [];
    }

    return [];
  }
  return [];
};

/*
 * =========================================================
 * 기존 야마노테 API 호환
 * =========================================================
 */

export const fetchYamanoteTimetable = async (
  stationId: string,
): Promise<JrTimetableResponse> => {
  return fetchJrEastTimetable("Yamanote", stationId);
};

export const fetchYamanoteInnerLoop = async (
  stationId: string,
): Promise<JrNextTrain[]> => {
  return fetchJrEastTrains("Yamanote", stationId, "innerLoop");
};

export const fetchYamanoteOuterLoop = async (
  stationId: string,
): Promise<JrNextTrain[]> => {
  return fetchJrEastTrains("Yamanote", stationId, "outerLoop");
};

export const fetchYamanoteTrains = async (
  stationId: string,
  directionId: string,
): Promise<JrNextTrain[]> => {
  return fetchJrEastTrains("Yamanote", stationId, directionId);
};
