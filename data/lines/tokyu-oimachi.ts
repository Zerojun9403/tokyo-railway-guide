import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Tokyu Oimachi Line
 * 東急大井町線
 * =========================================================
 */

export const TOKYU_OIMACHI_COLOR = "#F18C43";

type TokyuOimachiStationBase = {
  id: string;
  nameKo: string;
  nameJa: string;
};

const stationBase: TokyuOimachiStationBase[] = [
  { id: "OM01", nameKo: "오이마치", nameJa: "大井町" },
  { id: "OM02", nameKo: "시모신메이", nameJa: "下神明" },
  { id: "OM03", nameKo: "도고시코엔", nameJa: "戸越公園" },
  { id: "OM04", nameKo: "나카노부", nameJa: "中延" },
  { id: "OM05", nameKo: "에바라마치", nameJa: "荏原町" },
  { id: "OM06", nameKo: "하타노다이", nameJa: "旗の台" },
  { id: "OM07", nameKo: "기타센조쿠", nameJa: "北千束" },
  { id: "OM08", nameKo: "오오카야마", nameJa: "大岡山" },
  { id: "OM09", nameKo: "미도리가오카", nameJa: "緑が丘" },
  { id: "OM10", nameKo: "지유가오카", nameJa: "自由が丘" },
  { id: "OM11", nameKo: "구혼부쓰", nameJa: "九品仏" },
  { id: "OM12", nameKo: "오야마다이", nameJa: "尾山台" },
  { id: "OM13", nameKo: "도도로키", nameJa: "等々力" },
  { id: "OM14", nameKo: "가미노게", nameJa: "上野毛" },
  { id: "OM15", nameKo: "후타코타마가와", nameJa: "二子玉川" },
  { id: "OM16", nameKo: "미조노쿠치", nameJa: "溝の口" },
];

/*
 * =========================================================
 * Next Station
 * =========================================================
 */

const createNextStation = (station: TokyuOimachiStationBase) => {
  return {
    id: station.id,
    code: station.id,

    nameKo: station.nameKo,
    nameJa: station.nameJa,

    lineId: "tokyu-oimachi",

    lineCode: "OM",

    lineNameKo: "도큐 오이마치선",

    color: TOKYU_OIMACHI_COLOR,
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
     * 오이마치
     *
     * JR 게이힌토호쿠선
     */

    case "OM01":
      return [
        {
          id: "keihin-tohoku",
          nameKo: "JR 게이힌토호쿠선",
          nameJa: "JR京浜東北線",
          code: "JK",
          color: "#00A7E3",
        },
      ];

    /*
     * 나카노부
     *
     * 도에이 아사쿠사선
     */

    case "OM04":
      return [
        {
          id: "asakusa",
          nameKo: "도에이 아사쿠사선",
          nameJa: "都営浅草線",
          code: "A",
          color: "#E85298",
        },
      ];

    /*
     * 하타노다이
     *
     * 도큐 이케가미선은 추후 연결
     */

    case "OM06":
      return [];

    /*
     * 오오카야마
     *
     * 도큐 메구로선
     */

    case "OM08":
      return [
        {
          id: "tokyu-meguro",
          nameKo: "도큐 메구로선",
          nameJa: "東急目黒線",
          code: "MG",
          color: "#009CD2",
        },
      ];

    /*
     * 지유가오카
     *
     * 도큐 도요코선
     */

    case "OM10":
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
     * 후타코타마가와
     *
     * 도큐 덴엔토시선
     */

    case "OM15":
      return [
        {
          id: "tokyu-den-en-toshi",
          nameKo: "도큐 덴엔토시선",
          nameJa: "東急田園都市線",
          code: "DT",
          color: "#20A288",
        },
      ];

    /*
     * 미조노쿠치
     *
     * 도큐 덴엔토시선
     */

    case "OM16":
      return [
        {
          id: "tokyu-den-en-toshi",
          nameKo: "도큐 덴엔토시선",
          nameJa: "東急田園都市線",
          code: "DT",
          color: "#20A288",
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

export const tokyuOimachiStations: Station[] = stationBase.map(
  (station, index) => {
    const previousStation = stationBase[index - 1];
    const nextStation = stationBase[index + 1];

    /*
     * OM01 오이마치
     */

    if (station.id === "OM01") {
      return {
        id: station.id,
        code: station.id,

        nameKo: station.nameKo,
        nameJa: station.nameJa,

        lineId: "tokyu-oimachi",

        operatorId: "tokyu",

        lineCode: "OM",

        lineNameKo: "도큐 오이마치선",
        lineNameJa: "東急大井町線",

        color: TOKYU_OIMACHI_COLOR,

        type: "terminal",

        transfers: getTransfers(station.id),

        directions: [
          {
            id: "Outbound",

            label: "후타코타마가와·미조노쿠치 방면",

            description:
              "→ 오오카야마·지유가오카·후타코타마가와·미조노쿠치 방면",

            nextStations: nextStation
              ? [createNextStation(nextStation)]
              : [],
          },
        ],
      };
    }

    /*
     * OM16 미조노쿠치
     */

    if (station.id === "OM16") {
      return {
        id: station.id,
        code: station.id,

        nameKo: station.nameKo,
        nameJa: station.nameJa,

        lineId: "tokyu-oimachi",

        operatorId: "tokyu",

        lineCode: "OM",

        lineNameKo: "도큐 오이마치선",
        lineNameJa: "東急大井町線",

        color: TOKYU_OIMACHI_COLOR,

        type: "terminal",

        transfers: getTransfers(station.id),

        directions: [
          {
            id: "Inbound",

            label: "오이마치 방면",

            description: "→ 지유가오카·오오카야마·오이마치 방면",

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

      lineId: "tokyu-oimachi",

      operatorId: "tokyu",

      lineCode: "OM",

      lineNameKo: "도큐 오이마치선",
      lineNameJa: "東急大井町線",

      color: TOKYU_OIMACHI_COLOR,

      type: "normal",

      transfers: getTransfers(station.id),

      directions: [
        {
          id: "Inbound",

          label: "오이마치 방면",

          description: "→ 지유가오카·오오카야마·오이마치 방면",

          nextStations: previousStation
            ? [createNextStation(previousStation)]
            : [],
        },
        {
          id: "Outbound",

          label: "후타코타마가와·미조노쿠치 방면",

          description: "→ 지유가오카·후타코타마가와·미조노쿠치 방면",

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

export const tokyuOimachiTrains: Record<string, Train[]> = {};