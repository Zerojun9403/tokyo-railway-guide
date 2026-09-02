import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Tokyu Shin-Yokohama Line
 * 東急新横浜線
 * =========================================================
 */

export const TOKYU_SHIN_YOKOHAMA_COLOR = "#6FBA2C";

type TokyuShinYokohamaStationBase = {
  id: string;
  nameKo: string;
  nameJa: string;
};

const stationBase: TokyuShinYokohamaStationBase[] = [
  {
    id: "SH01",
    nameKo: "신요코하마",
    nameJa: "新横浜",
  },
  {
    id: "SH02",
    nameKo: "신쓰나시마",
    nameJa: "新綱島",
  },
  {
    id: "SH03",
    nameKo: "히요시",
    nameJa: "日吉",
  },
];

/*
 * =========================================================
 * Next Station
 * =========================================================
 */

const createNextStation = (station: TokyuShinYokohamaStationBase) => {
  return {
    id: station.id,
    code: station.id,

    nameKo: station.nameKo,
    nameJa: station.nameJa,

    lineId: "tokyu-shin-yokohama",

    lineCode: "SH",

    lineNameKo: "도큐 신요코하마선",

    color: TOKYU_SHIN_YOKOHAMA_COLOR,
  };
};

/*
 * =========================================================
 * Transfers
 * =========================================================
 *
 * 현재 Expo에 구현되어 있는 노선만 우선 연결한다.
 * =========================================================
 */

const getTransfers = (stationId: string) => {
  switch (stationId) {
    /*
     * SH01 신요코하마
     *
     * JR 도카이도 신칸센
     * JR 요코하마선
     * 요코하마 시영 지하철 블루라인
     * 소테츠 신요코하마선
     *
     * 현재 미구현이므로 추후 연결
     */

    case "SH01":
      return [];

    /*
     * SH02 신쓰나시마
     */

    case "SH02":
      return [];

    /*
     * SH03 히요시
     *
     * 도큐 도요코선
     * 도큐 메구로선
     */

    case "SH03":
      return [
        {
          id: "tokyu-toyoko",
          nameKo: "도큐 도요코선",
          nameJa: "東急東横線",
          code: "TY",
          color: "#DA0442",
        },
        {
          id: "tokyu-meguro",
          nameKo: "도큐 메구로선",
          nameJa: "東急目黒線",
          code: "MG",
          color: "#009CD2",
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

export const tokyuShinYokohamaStations: Station[] = stationBase.map(
  (station, index) => {
    const previousStation = stationBase[index - 1];
    const nextStation = stationBase[index + 1];

    /*
     * SH01 신요코하마
     */

    if (station.id === "SH01") {
      return {
        id: station.id,
        code: station.id,

        nameKo: station.nameKo,
        nameJa: station.nameJa,

        lineId: "tokyu-shin-yokohama",

        operatorId: "tokyu",

        lineCode: "SH",

        lineNameKo: "도큐 신요코하마선",
        lineNameJa: "東急新横浜線",

        color: TOKYU_SHIN_YOKOHAMA_COLOR,

        type: "terminal",

        transfers: getTransfers(station.id),

        directions: [
          {
            id: "Inbound",

            label: "히요시 방면",

            description: "→ 신쓰나시마·히요시 방면",

            nextStations: nextStation
              ? [createNextStation(nextStation)]
              : [],
          },
        ],
      };
    }

    /*
     * SH03 히요시
     */

    if (station.id === "SH03") {
      return {
        id: station.id,
        code: station.id,

        nameKo: station.nameKo,
        nameJa: station.nameJa,

        lineId: "tokyu-shin-yokohama",

        operatorId: "tokyu",

        lineCode: "SH",

        lineNameKo: "도큐 신요코하마선",
        lineNameJa: "東急新横浜線",

        color: TOKYU_SHIN_YOKOHAMA_COLOR,

        type: "terminal",

        transfers: getTransfers(station.id),

        directions: [
          {
            id: "Outbound",

            label: "신요코하마 방면",

            description: "→ 신쓰나시마·신요코하마 방면",

            nextStations: previousStation
              ? [createNextStation(previousStation)]
              : [],
          },
        ],
      };
    }

    /*
     * SH02 신쓰나시마
     */

    return {
      id: station.id,
      code: station.id,

      nameKo: station.nameKo,
      nameJa: station.nameJa,

      lineId: "tokyu-shin-yokohama",

      operatorId: "tokyu",

      lineCode: "SH",

      lineNameKo: "도큐 신요코하마선",
      lineNameJa: "東急新横浜線",

      color: TOKYU_SHIN_YOKOHAMA_COLOR,

      type: "normal",

      transfers: getTransfers(station.id),

      directions: [
        {
          id: "Outbound",

          label: "신요코하마 방면",

          description: "→ 신요코하마 방면",

          nextStations: previousStation
            ? [createNextStation(previousStation)]
            : [],
        },
        {
          id: "Inbound",

          label: "히요시 방면",

          description: "→ 히요시 방면",

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

export const tokyuShinYokohamaTrains: Record<string, Train[]> = {};