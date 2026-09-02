import type { Train } from "../types/train";

/*
 * =========================================================
 * Seibu API
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

type SeibuTimetableItem = {
  id: string;

  operator: "seibu";

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

type SeibuTimetableResponse = {
  operator: "seibu";

  lineId: string;

  stationId: string;

  directionId: string;

  updatedAt: string;

  timetable: SeibuTimetableItem[];
};

/*
 * =========================================================
 * 앱 lineId → API lineId
 * =========================================================
 *
 * 앱:
 * seibu-ikebukuro
 *
 * API:
 * ikebukuro
 *
 * 향후:
 * seibu-shinjuku
 * seibu-chichibu
 * seibu-yurakucho
 * seibu-sayama
 * ...
 * =========================================================
 */

const resolveApiLineId = (lineId: string) => {
  switch (lineId) {
    case "seibu-ikebukuro":
      return "ikebukuro";

    default:
      return lineId.replace("seibu-", "");
  }
};

/*
 * =========================================================
 * 앱 stationId → ODPT stationId
 * =========================================================
 *
 * 앱에서는 SI 역번호를 사용한다.
 *
 * ODPT API는:
 *
 * Ikebukuro
 * Nerima
 * Tokorozawa
 * Hanno
 *
 * 같은 station ID를 사용한다.
 * =========================================================
 */

const STATION_ID_MAP: Record<string, string> = {
  SI01: "Ikebukuro",
  SI02: "Shiinamachi",
  SI03: "HigashiNagasaki",
  SI04: "Ekoda",
  SI05: "Sakuradai",
  SI06: "Nerima",
  SI07: "Nakamurabashi",
  SI08: "Fujimidai",
  SI09: "NerimaTakanodai",
  SI10: "ShakujiiKoen",
  SI11: "OizumiGakuen",
  SI12: "Hoya",
  SI13: "Hibarigaoka",
  SI14: "HigashiKurume",
  SI15: "Kiyose",
  SI16: "Akitsu",
  SI17: "Tokorozawa",
  SI18: "NishiTokorozawa",
  SI19: "Kotesashi",
  SI20: "Sayamagaoka",
  SI21: "MusashiFujisawa",
  SI22: "InariyamaKoen",
  SI23: "Irumashi",
  SI24: "Bushi",
  SI25: "Motokaji",
  SI26: "Hanno",
  SI27: "HigashiHanno",
  SI28: "Koma",
  SI29: "MusashiYokote",
  SI30: "HigashiAgano",
  SI31: "Agano",



// Seibu Shinjuku Line
  SS01: "SeibuShinjuku",
  SS02: "Takadanobaba",
  SS03: "ShimoOchiai",
  SS04: "Nakai",
  SS05: "AraiyakushiMae",
  SS06: "Numabukuro",
  SS07: "Nogata",
  SS08: "ToritsuKasei",
  SS09: "Saginomiya",
  SS10: "ShimoIgusa",
  SS11: "Iogi",
  SS12: "KamiIgusa",
  SS13: "KamiShakujii",
  SS14: "MusashiSeki",
  SS15: "HigashiFushimi",
  SS16: "SeibuYagisawa",
  SS17: "Tanashi",
  SS18: "HanaKoganei",
  SS19: "Kodaira",
  SS20: "Kumegawa",
  SS21: "HigashiMurayama",
  SS22: "Tokorozawa",
  SS23: "KokuKoen",
  SS24: "ShinTokorozawa",
  SS25: "Iriso",
  SS26: "Sayamashi",
  SS27: "ShinSayama",
  SS28: "MinamiOtsuka",
  SS29: "HonKawagoe",
};

/*
 * =========================================================
 * 시간표 → 앱 Train
 * =========================================================
 */

const adaptTimetableItem = (item: SeibuTimetableItem): Train => {
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
 * 세이부 시간표 가져오기
 * =========================================================
 */

export const getSeibuTrains = async (
  lineId: string,

  stationId: string,

  directionId: string,
): Promise<Train[]> => {
  const apiLineId = resolveApiLineId(lineId);

  const apiStationId = STATION_ID_MAP[stationId];

  if (!apiStationId) {
    throw new Error(`지원하지 않는 세이부 역입니다: ${stationId}`);
  }

  const params = new URLSearchParams({
    operator: "seibu",

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
      `세이부 시간표 API 오류: ${response.status} ${response.statusText}`,
    );
  }

  const data = (await response.json()) as SeibuTimetableResponse;

  return data.timetable.map(adaptTimetableItem);
};