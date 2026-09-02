import type { Train } from "../types/train";

/*
 * =========================================================
 * Tokyu API
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

type TokyuTimetableItem = {
  id: string;

  operator: "tokyu";

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

type TokyuTimetableResponse = {
  operator: "tokyu";

  lineId: string;

  stationId: string;

  directionId: string;

  updatedAt: string;

  timetable: TokyuTimetableItem[];
};

/*
 * =========================================================
 * 앱 lineId → API lineId
 * =========================================================
 *
 * 앱:
 * tokyu-toyoko
 *
 * API:
 * toyoko
 *
 * 향후:
 * tokyu-meguro
 * tokyu-den-en-toshi
 * tokyu-oimachi
 * tokyu-ikegami
 * ...
 * =========================================================
 */

const LINE_ID_MAP: Record<string, string> = {
  "tokyu-toyoko": "toyoko",
  "tokyu-meguro": "meguro",
  "tokyu-den-en-toshi": "den-en-toshi",
  "tokyu-oimachi": "oimachi",
  "tokyu-ikegami": "ikegami",
  "tokyu-tamagawa": "tokyu-tamagawa",
  "tokyu-setagaya": "setagaya",
  "tokyu-kodomonokuni": "kodomonokuni",
  "tokyu-shin-yokohama": "tokyu-shin-yokohama",
};

const resolveApiLineId = (lineId: string) => {
  return LINE_ID_MAP[lineId] ?? lineId;
};

/*
 * =========================================================
 * 앱 stationId → ODPT stationId
 * =========================================================
 *
 * 앱에서는 TY 역번호를 사용한다.
 *
 * ODPT API는:
 *
 * Shibuya
 * Nakameguro
 * Jiyugaoka
 * MusashiKosugi
 * Kikuna
 * Yokohama
 *
 * 같은 station ID를 사용한다.
 * =========================================================
 */

const STATION_ID_MAP: Record<string, string> = {
  // Tokyu Toyoko Line
  TY01: "Shibuya",
  TY02: "Daikanyama",
  TY03: "NakaMeguro",
  TY04: "Yutenji",
  TY05: "GakugeiDaigaku",
  TY06: "ToritsuDaigaku",
  TY07: "Jiyugaoka",
  TY08: "DenEnChofu",
  TY09: "Tamagawa",
  TY10: "ShinMaruko",
  TY11: "MusashiKosugi",
  TY12: "Motosumiyoshi",
  TY13: "Hiyoshi",
  TY14: "Tsunashima",
  TY15: "Okurayama",
  TY16: "Kikuna",
  TY17: "Myorenji",
  TY18: "Hakuraku",
  TY19: "HigashiHakuraku",
  TY20: "Tammachi",
  TY21: "Yokohama",

  // Tokyu Meguro Line
  MG01: "Meguro",
  MG02: "Fudomae",
  MG03: "MusashiKoyama",
  MG04: "NishiKoyama",
  MG05: "Senzoku",
  MG06: "Ookayama",
  MG07: "Okusawa",
  MG08: "DenEnChofu",
  MG09: "Tamagawa",
  MG10: "ShinMaruko",
  MG11: "MusashiKosugi",
  MG12: "Motosumiyoshi",
  MG13: "Hiyoshi",

  // Tokyu Den-en-toshi Line
  DT01: "Shibuya",
  DT02: "IkejiriOhashi",
  DT03: "SangenJaya",
  DT04: "KomazawaDaigaku",
  DT05: "SakuraShimmachi",
  DT06: "Yoga",
  DT07: "FutakoTamagawa",
  DT08: "FutakoShinchi",
  DT09: "Takatsu",
  DT10: "Mizonokuchi",
  DT11: "Kajigaya",
  DT12: "Miyazakidai",
  DT13: "Miyamaedaira",
  DT14: "Saginuma",
  DT15: "TamaPlaza",
  DT16: "Azamino",
  DT17: "Eda",
  DT18: "Ichigao",
  DT19: "Fujigaoka",
  DT20: "Aobadai",
  DT21: "Tana",
  DT22: "Nagatsuta",
  DT23: "Tsukushino",
  DT24: "Suzukakedai",
  DT25: "MinamiMachidaGrandberryPark",
  DT26: "Tsukimino",
  DT27: "ChuoRinkan",

  // Tokyu Oimachi Line
  OM01: "Oimachi",
  OM02: "ShimoShimmei",
  OM03: "TogoshiKoen",
  OM04: "Nakanobu",
  OM05: "Ebaramachi",
  OM06: "Hatanodai",
  OM07: "Kitasenzoku",
  OM08: "Ookayama",
  OM09: "Midorigaoka",
  OM10: "Jiyugaoka",
  OM11: "Kuhombutsu",
  OM12: "Oyamadai",
  OM13: "Todoroki",
  OM14: "Kaminoge",
  OM15: "FutakoTamagawa",
  OM16: "Mizonokuchi",

  // Tokyu Shin-Yokohama Line
  SH01: "ShinYokohama",
  SH02: "ShinTsunashima",
  SH03: "Hiyoshi",
};

/*
 * =========================================================
 * 시간표 → 앱 Train
 * =========================================================
 */

const adaptTimetableItem = (item: TokyuTimetableItem): Train => {
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
 * 도큐 시간표 가져오기
 * =========================================================
 */

export const getTokyuTrains = async (
  lineId: string,

  stationId: string,

  directionId: string,
): Promise<Train[]> => {
  const apiLineId = resolveApiLineId(lineId);

  const apiStationId = STATION_ID_MAP[stationId];

  if (!apiStationId) {
    throw new Error(`지원하지 않는 도큐 역입니다: ${stationId}`);
  }

  const params = new URLSearchParams({
    operator: "tokyu",

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
      `도큐 시간표 API 오류: ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as TokyuTimetableResponse;

  return data.timetable.map(adaptTimetableItem);
};
