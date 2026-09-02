import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Tokyu Meguro Line
 * 東急目黒線
 * =========================================================
 */

export const TOKYU_MEGURO_COLOR = "#009CD2";

type TokyuMeguroStationBase = {
  id: string;
  nameKo: string;
  nameJa: string;
};

const stationBase: TokyuMeguroStationBase[] = [
  {
    id: "MG01",
    nameKo: "메구로",
    nameJa: "目黒",
  },
  {
    id: "MG02",
    nameKo: "후도마에",
    nameJa: "不動前",
  },
  {
    id: "MG03",
    nameKo: "무사시코야마",
    nameJa: "武蔵小山",
  },
  {
    id: "MG04",
    nameKo: "니시코야마",
    nameJa: "西小山",
  },
  {
    id: "MG05",
    nameKo: "센조쿠",
    nameJa: "洗足",
  },
  {
    id: "MG06",
    nameKo: "오오카야마",
    nameJa: "大岡山",
  },
  {
    id: "MG07",
    nameKo: "오쿠사와",
    nameJa: "奥沢",
  },
  {
    id: "MG08",
    nameKo: "덴엔초후",
    nameJa: "田園調布",
  },
  {
    id: "MG09",
    nameKo: "다마가와",
    nameJa: "多摩川",
  },
  {
    id: "MG10",
    nameKo: "신마루코",
    nameJa: "新丸子",
  },
  {
    id: "MG11",
    nameKo: "무사시코스기",
    nameJa: "武蔵小杉",
  },
  {
    id: "MG12",
    nameKo: "모토스미요시",
    nameJa: "元住吉",
  },
  {
    id: "MG13",
    nameKo: "히요시",
    nameJa: "日吉",
  },
];

/*
 * =========================================================
 * Next Station
 * =========================================================
 */

const createNextStation = (station: TokyuMeguroStationBase) => {
  return {
    id: station.id,

    code: station.id,

    nameKo: station.nameKo,
    nameJa: station.nameJa,

    lineId: "tokyu-meguro",

    lineCode: "MG",

    lineNameKo: "도큐 메구로선",

    color: TOKYU_MEGURO_COLOR,
  };
};

/*
 * =========================================================
 * Transfers
 * =========================================================
 */

const getTransfers = (stationId: string) => {
  switch (stationId) {
    /*
     * 메구로
     *
     * 현재 앱에 존재하는 노선만 등록
     */

    case "MG01":
      return [
        {
          id: "yamanote",
          nameKo: "JR 야마노테선",
          nameJa: "JR山手線",
          code: "JY",
          color: "#80C41C",
        },
        {
          id: "namboku",
          nameKo: "도쿄메트로 난보쿠선",
          nameJa: "東京メトロ南北線",
          code: "N",
          color: "#00AC9B",
        },
        {
          id: "mita",
          nameKo: "도에이 미타선",
          nameJa: "都営三田線",
          code: "I",
          color: "#0079C2",
        },
      ];

    /*
     * 오오카야마
     *
     * 도큐 오이마치선 추가 후 연결
     */

    case "MG06":
      return [];

    /*
     * 덴엔초후
     */

    case "MG08":
      return [
        {
          id: "tokyu-toyoko",
          nameKo: "도큐 도요코선",
          nameJa: "東急東横線",
          code: "TY",
          color: "#DA0442",
        },
      ];

    /*
     * 다마가와
     *
     * 도큐 다마가와선은 추후 추가
     */

    case "MG09":
      return [
        {
          id: "tokyu-toyoko",
          nameKo: "도큐 도요코선",
          nameJa: "東急東横線",
          code: "TY",
          color: "#DA0442",
        },
      ];

    /*
     * 신마루코
     */

    case "MG10":
      return [
        {
          id: "tokyu-toyoko",
          nameKo: "도큐 도요코선",
          nameJa: "東急東横線",
          code: "TY",
          color: "#DA0442",
        },
      ];

    /*
     * 무사시코스기
     *
     * JR 요코스카선 / 쇼난신주쿠라인 / 난부선은
     * 해당 노선 Expo 구현 후 추가
     */

    case "MG11":
      return [
        {
          id: "tokyu-toyoko",
          nameKo: "도큐 도요코선",
          nameJa: "東急東横線",
          code: "TY",
          color: "#DA0442",
        },
      ];

    /*
     * 모토스미요시
     */

    case "MG12":
      return [
        {
          id: "tokyu-toyoko",
          nameKo: "도큐 도요코선",
          nameJa: "東急東横線",
          code: "TY",
          color: "#DA0442",
        },
      ];

    /*
     * 히요시
     *
     * 도큐 신요코하마선은 추후 추가
     */

    case "MG13":
      return [
        {
          id: "tokyu-toyoko",
          nameKo: "도큐 도요코선",
          nameJa: "東急東横線",
          code: "TY",
          color: "#DA0442",
        },
      ];

    default:
      return [];
  }
};

/*
 * =========================================================
 * Stations
 * =========================================================
 */

export const tokyuMeguroStations: Station[] = stationBase.map(
  (station, index) => {
    const previousStation = stationBase[index - 1];

    const nextStation = stationBase[index + 1];

    /*
     * MG01 메구로
     */

    if (station.id === "MG01") {
      return {
        id: station.id,

        code: station.id,

        nameKo: station.nameKo,
        nameJa: station.nameJa,

        lineId: "tokyu-meguro",

        operatorId: "tokyu",

        lineCode: "MG",

        lineNameKo: "도큐 메구로선",
        lineNameJa: "東急目黒線",

        color: TOKYU_MEGURO_COLOR,

        type: "terminal",

        transfers: getTransfers(station.id),

        directions: [
          {
            id: "Outbound",

            label: "히요시·신요코하마 방면",

            description: "→ 무사시코야마·무사시코스기·히요시·신요코하마 방면",

            nextStations: nextStation
              ? [createNextStation(nextStation)]
              : [],
          },
        ],
      };
    }

    /*
     * MG13 히요시
     */

    if (station.id === "MG13") {
      return {
        id: station.id,

        code: station.id,

        nameKo: station.nameKo,
        nameJa: station.nameJa,

        lineId: "tokyu-meguro",

        operatorId: "tokyu",

        lineCode: "MG",

        lineNameKo: "도큐 메구로선",
        lineNameJa: "東急目黒線",

        color: TOKYU_MEGURO_COLOR,

        type: "terminal",

        transfers: getTransfers(station.id),

        directions: [
          {
            id: "Inbound",

            label: "메구로 방면",

            description: "→ 무사시코스기·오오카야마·메구로 방면",

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

      lineId: "tokyu-meguro",

      operatorId: "tokyu",

      lineCode: "MG",

      lineNameKo: "도큐 메구로선",
      lineNameJa: "東急目黒線",

      color: TOKYU_MEGURO_COLOR,

      type: "normal",

      transfers: getTransfers(station.id),

      directions: [
        {
          id: "Inbound",

          label: "메구로 방면",

          description: "→ 오오카야마·메구로 방면",

          nextStations: previousStation
            ? [createNextStation(previousStation)]
            : [],
        },
        {
          id: "Outbound",

          label: "히요시·신요코하마 방면",

          description: "→ 무사시코스기·히요시·신요코하마 방면",

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

export const tokyuMeguroTrains: Record<string, Train[]> = {};