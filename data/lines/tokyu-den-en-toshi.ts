import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Tokyu Den-en-toshi Line
 * 東急田園都市線
 * =========================================================
 */

export const TOKYU_DEN_EN_TOSHI_COLOR = "#20A288";

type TokyuDenEnToshiStationBase = {
  id: string;
  nameKo: string;
  nameJa: string;
};

const stationBase: TokyuDenEnToshiStationBase[] = [
  { id: "DT01", nameKo: "시부야", nameJa: "渋谷" },
  { id: "DT02", nameKo: "이케지리오하시", nameJa: "池尻大橋" },
  { id: "DT03", nameKo: "산겐자야", nameJa: "三軒茶屋" },
  { id: "DT04", nameKo: "고마자와다이가쿠", nameJa: "駒沢大学" },
  { id: "DT05", nameKo: "사쿠라신마치", nameJa: "桜新町" },
  { id: "DT06", nameKo: "요가", nameJa: "用賀" },
  { id: "DT07", nameKo: "후타코타마가와", nameJa: "二子玉川" },
  { id: "DT08", nameKo: "후타코신치", nameJa: "二子新地" },
  { id: "DT09", nameKo: "다카쓰", nameJa: "高津" },
  { id: "DT10", nameKo: "미조노쿠치", nameJa: "溝の口" },
  { id: "DT11", nameKo: "가지가야", nameJa: "梶が谷" },
  { id: "DT12", nameKo: "미야자키다이", nameJa: "宮崎台" },
  { id: "DT13", nameKo: "미야마에다이라", nameJa: "宮前平" },
  { id: "DT14", nameKo: "사기누마", nameJa: "鷺沼" },
  { id: "DT15", nameKo: "다마플라자", nameJa: "たまプラーザ" },
  { id: "DT16", nameKo: "아자미노", nameJa: "あざみ野" },
  { id: "DT17", nameKo: "에다", nameJa: "江田" },
  { id: "DT18", nameKo: "이치가오", nameJa: "市が尾" },
  { id: "DT19", nameKo: "후지가오카", nameJa: "藤が丘" },
  { id: "DT20", nameKo: "아오바다이", nameJa: "青葉台" },
  { id: "DT21", nameKo: "다나", nameJa: "田奈" },
  { id: "DT22", nameKo: "나가쓰타", nameJa: "長津田" },
  { id: "DT23", nameKo: "쓰쿠시노", nameJa: "つくし野" },
  { id: "DT24", nameKo: "스즈카케다이", nameJa: "すずかけ台" },
  {
    id: "DT25",
    nameKo: "미나미마치다 그랑베리파크",
    nameJa: "南町田グランベリーパーク",
  },
  { id: "DT26", nameKo: "쓰키미노", nameJa: "つきみ野" },
  { id: "DT27", nameKo: "주오린칸", nameJa: "中央林間" },
];

/*
 * =========================================================
 * Next Station
 * =========================================================
 */

const createNextStation = (station: TokyuDenEnToshiStationBase) => {
  return {
    id: station.id,
    code: station.id,

    nameKo: station.nameKo,
    nameJa: station.nameJa,

    lineId: "tokyu-den-en-toshi",

    lineCode: "DT",

    lineNameKo: "도큐 덴엔토시선",

    color: TOKYU_DEN_EN_TOSHI_COLOR,
  };
};

/*
 * =========================================================
 * Transfers
 * =========================================================
 *
 * 현재 Expo에 구현되어 있는 노선만 우선 연결한다.
 * 미구현 노선은 해당 노선 추가 시 연결한다.
 * =========================================================
 */

const getTransfers = (stationId: string) => {
  switch (stationId) {
    /*
     * 시부야
     */

    case "DT01":
      return [
        {
          id: "tokyu-toyoko",
          nameKo: "도큐 도요코선",
          nameJa: "東急東横線",
          code: "TY",
          color: "#DA0442",
        },
        {
          id: "yamanote",
          nameKo: "JR 야마노테선",
          nameJa: "JR山手線",
          code: "JY",
          color: "#80C41C",
        },
        {
          id: "ginza",
          nameKo: "도쿄메트로 긴자선",
          nameJa: "東京メトロ銀座線",
          code: "G",
          color: "#FF9500",
        },
        {
          id: "hanzomon",
          nameKo: "도쿄메트로 한조몬선",
          nameJa: "東京メトロ半蔵門線",
          code: "Z",
          color: "#8F76D6",
        },
        {
          id: "fukutoshin",
          nameKo: "도쿄메트로 후쿠토신선",
          nameJa: "東京メトロ副都心線",
          code: "F",
          color: "#9C5E31",
        },
      ];

    /*
     * 산겐자야
     *
     * 도큐 세타가야선 추가 후 연결
     */

    case "DT03":
      return [];

    /*
     * 후타코타마가와
     *
     * 도큐 오이마치선 추가 후 연결
     */

    case "DT07":
      return [];

    /*
     * 미조노쿠치
     *
     * 도큐 오이마치선 추가 후 연결
     */

    case "DT10":
      return [];

    /*
     * 아자미노
     *
     * 요코하마 시영 지하철 블루라인은
     * 해당 노선 구현 후 연결
     */

    case "DT16":
      return [];

    /*
     * 나가쓰타
     *
     * 도큐 고도모노쿠니선 / JR 요코하마선은
     * 해당 노선 구현 후 연결
     */

    case "DT22":
      return [];

    /*
     * 주오린칸
     *
     * 오다큐 에노시마선은
     * 해당 노선 구현 후 연결
     */

    case "DT27":
      return [];

    default:
      return [];
  }
};

/*
 * =========================================================
 * Stations
 * =========================================================
 */

export const tokyuDenEnToshiStations: Station[] = stationBase.map(
  (station, index) => {
    const previousStation = stationBase[index - 1];
    const nextStation = stationBase[index + 1];

    /*
     * DT01 시부야
     */

    if (station.id === "DT01") {
      return {
        id: station.id,
        code: station.id,

        nameKo: station.nameKo,
        nameJa: station.nameJa,

        lineId: "tokyu-den-en-toshi",

        operatorId: "tokyu",

        lineCode: "DT",

        lineNameKo: "도큐 덴엔토시선",
        lineNameJa: "東急田園都市線",

        color: TOKYU_DEN_EN_TOSHI_COLOR,

        type: "terminal",

        transfers: getTransfers(station.id),

        directions: [
          {
            id: "Outbound",

            label: "주오린칸 방면",

            description: "→ 산겐자야·후타코타마가와·나가쓰타·주오린칸 방면",

            nextStations: nextStation
              ? [createNextStation(nextStation)]
              : [],
          },
        ],
      };
    }

    /*
     * DT27 주오린칸
     */

    if (station.id === "DT27") {
      return {
        id: station.id,
        code: station.id,

        nameKo: station.nameKo,
        nameJa: station.nameJa,

        lineId: "tokyu-den-en-toshi",

        operatorId: "tokyu",

        lineCode: "DT",

        lineNameKo: "도큐 덴엔토시선",
        lineNameJa: "東急田園都市線",

        color: TOKYU_DEN_EN_TOSHI_COLOR,

        type: "terminal",

        transfers: getTransfers(station.id),

        directions: [
          {
            id: "Inbound",

            label: "시부야 방면",

            description: "→ 나가쓰타·후타코타마가와·시부야 방면",

            nextStations: previousStation
              ? [createNextStation(previousStation)]
              : [],
          },
        ],
      };
    }

    /*
     * 일반역
     */

    return {
      id: station.id,
      code: station.id,

      nameKo: station.nameKo,
      nameJa: station.nameJa,

      lineId: "tokyu-den-en-toshi",

      operatorId: "tokyu",

      lineCode: "DT",

      lineNameKo: "도큐 덴엔토시선",
      lineNameJa: "東急田園都市線",

      color: TOKYU_DEN_EN_TOSHI_COLOR,

      type: "normal",

      transfers: getTransfers(station.id),

      directions: [
        {
          id: "Inbound",

          label: "시부야 방면",

          description: "→ 후타코타마가와·시부야 방면",

          nextStations: previousStation
            ? [createNextStation(previousStation)]
            : [],
        },
        {
          id: "Outbound",

          label: "주오린칸 방면",

          description: "→ 나가쓰타·주오린칸 방면",

          nextStations: nextStation
            ? [createNextStation(nextStation)]
            : [],
        },
      ],
    };
  },
);

/*
 * =========================================================
 * Registry fallback
 * =========================================================
 */

export const tokyuDenEnToshiTrains: Record<string, Train[]> = {};