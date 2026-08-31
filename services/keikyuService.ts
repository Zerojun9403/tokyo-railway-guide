import type { Train } from "../types/train";

/*
 * =========================================================
 * Keikyu API
 * =========================================================
 *
 * Expo
 *   ↓
 * tokyo-railway-api (Vercel)
 *   ↓
 * ODPT Challenge API
 *
 * ODPT API Key는 Expo 앱에 넣지 않는다.
 * =========================================================
 */

const API_BASE_URL = "https://tokyo-railway-api.vercel.app";

/*
 * =========================================================
 * API Response
 * =========================================================
 */

type KeikyuTimetableItem = {
  id: string;

  operator: "keikyu";

  lineId: string;

  stationId: string;

  directionId: string;

  departureTime: string;

  trainType?: string;

  destinationStation?: string;

  destinationKo?: string;

  destinationJa?: string;
};

type KeikyuTimetableResponse = {
  operator: "keikyu";

  lineId: string;

  stationId: string;

  directionId: string;

  updatedAt: string;

  timetable: KeikyuTimetableItem[];
};

/*
 * =========================================================
 * 앱 lineId → API lineId
 * =========================================================
 *
 * 앱:
 * keikyu-main
 * keikyu-airport
 *
 * API:
 * main
 * airport
 * =========================================================
 */

const resolveApiLineId = (lineId: string) => {
  switch (lineId) {
    case "keikyu-main":
      return "main";

    case "keikyu-airport":
      return "airport";

    default:
      return lineId.replace("keikyu-", "");
  }
};

/*
 * =========================================================
 * 앱 stationId → ODPT stationId
 * =========================================================
 *
 * 앱에서는 KK 번호를 사용한다.
 *
 * ODPT API는:
 *
 * AnamoriInari
 * KeikyuKamata
 * HanedaAirportTerminal1and2
 *
 * 같은 station ID를 사용한다.
 * =========================================================
 */

const STATION_ID_MAP: Record<string, string> = {
  /*
   * Main Line
   */

  KK01: "Shinagawa",
  KK02: "Kitashinagawa",
  KK03: "Shimbamba",
  KK04: "Aomonoyokocho",
  KK05: "Samezu",
  KK06: "Tachiaigawa",
  KK07: "Omorikaigan",
  KK08: "Heiwajima",
  KK09: "Omorimachi",
  KK10: "Umeyashiki",
  KK11: "KeikyuKamata",

  KK18: "Zoshiki",
  KK19: "Rokugodote",
  KK20: "KeikyuKawasaki",

  KK27: "Hatchonawate",
  KK28: "Tsurumiichiba",
  KK29: "KeikyuTsurumi",
  KK30: "Kagetsusojiji",
  KK31: "Namamugi",
  KK32: "KeikyuShinkoyasu",
  KK33: "Koyasu",
  KK34: "Kanagawashimmachi",
  KK35: "KeikyuHigashikanagawa",
  KK36: "Kanagawa",
  KK37: "Yokohama",
  KK38: "Tobe",
  KK39: "Hinodecho",
  KK40: "Koganecho",
  KK41: "Minamiota",
  KK42: "Idogaya",
  KK43: "Gumyoji",
  KK44: "Kamiooka",
  KK45: "Byobugaura",
  KK46: "Sugita",
  KK47: "KeikyuTomioka",
  KK48: "Nokendai",
  KK49: "Kanazawabunko",
  KK50: "Kanazawahakkei",

  KK54: "Oppama",
  KK55: "KeikyuTaura",
  KK56: "Anjinzuka",
  KK57: "Hemi",
  KK58: "Shioiri",
  KK59: "Yokosukachuo",
  KK60: "Kenritsudaigaku",
  KK61: "Horinouchi",
  KK62: "KeikyuOtsu",
  KK63: "Maborikaigan",
  KK64: "Uraga",

  /*
   * Airport Line
   */

  KK12: "Kojiya",
  KK13: "Otorii",
  KK14: "AnamoriInari",
  KK15: "Tenkubashi",
  KK16: "HanedaAirportTerminal3",
  KK17: "HanedaAirportTerminal1and2",
};

/*
 * =========================================================
 * 시간표 → 앱 Train
 * =========================================================
 */

const adaptTimetableItem = (item: KeikyuTimetableItem): Train => {
  const now = new Date();

  const [hours, minutes] = item.departureTime.split(":").map(Number);

  const departure = new Date(now);

  departure.setHours(hours, minutes, 0, 0);

  const minutesUntilDeparture = Math.max(
    0,
    Math.ceil((departure.getTime() - now.getTime()) / 60000),
  );

  return {
    id: item.id,

    time: item.departureTime,

    minutesUntilDeparture,

    directionId: item.directionId,

    trainType: item.trainType,

    destinationKo: item.destinationKo,

    destinationJa: item.destinationJa,

    status: "normal",
  };
};

/*
 * =========================================================
 * 게이큐 시간표 가져오기
 * =========================================================
 */

export const getKeikyuTrains = async (
  lineId: string,

  stationId: string,

  directionId: string,
): Promise<Train[]> => {
  const apiLineId = resolveApiLineId(lineId);

  const apiStationId = STATION_ID_MAP[stationId];

  if (!apiStationId) {
    throw new Error(`지원하지 않는 게이큐 역입니다: ${stationId}`);
  }

  const params = new URLSearchParams({
    operator: "keikyu",

    lineId: apiLineId,

    stationId: apiStationId,

    directionId,

    upcoming: "true",

    limit: "3",
  });

  const url = `${API_BASE_URL}/api/timetable?${params.toString()}`;

  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(
      `게이큐 시간표 API 오류: ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as KeikyuTimetableResponse;

  return data.timetable.map(adaptTimetableItem);
};
