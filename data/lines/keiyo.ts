import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * 게이요선
 * 京葉線
 * JE01 도쿄 ~ JE18 소가
 * =========================================================
 */

export const KEIYO_COLOR = "#C9252F";

/*
 * =========================================================
 * 환승 타입
 * =========================================================
 */

type Transfer = NonNullable<Station["transfers"]>[number];

/*
 * =========================================================
 * 환승 노선 생성
 * =========================================================
 */

const transfer = (
  id: string,
  code: string,
  nameKo: string,
  nameJa: string,
  color: string,
): Transfer => ({
  id,
  code,
  nameKo,
  nameJa,
  color,
});

/*
 * =========================================================
 * 다음 역 생성
 * =========================================================
 */

const createNextStation = (station: {
  id: string;
  code: string;
  nameKo: string;
  nameJa: string;
}) => ({
  id: station.id,
  code: station.code,
  nameKo: station.nameKo,
  nameJa: station.nameJa,

  lineId: "keiyo",
  lineCode: "JE",
  lineNameKo: "게이요선",

  color: KEIYO_COLOR,
});

/*
 * =========================================================
 * 역 기본 데이터
 *
 * 배열 순서:
 * 도쿄 → 소가
 *
 * Inbound:
 * 도쿄 방면
 *
 * Outbound:
 * 마이하마 · 가이힌마쿠하리 · 소가 방면
 * =========================================================
 */

const stations = [
  {
    id: "JE01",
    code: "JE01",
    nameKo: "도쿄",
    nameJa: "東京",
  },
  {
    id: "JE02",
    code: "JE02",
    nameKo: "핫초보리",
    nameJa: "八丁堀",
  },
  {
    id: "JE03",
    code: "JE03",
    nameKo: "엣추지마",
    nameJa: "越中島",
  },
  {
    id: "JE04",
    code: "JE04",
    nameKo: "시오미",
    nameJa: "潮見",
  },
  {
    id: "JE05",
    code: "JE05",
    nameKo: "신키바",
    nameJa: "新木場",
  },
  {
    id: "JE06",
    code: "JE06",
    nameKo: "가사이린카이코엔",
    nameJa: "葛西臨海公園",
  },
  {
    id: "JE07",
    code: "JE07",
    nameKo: "마이하마",
    nameJa: "舞浜",
  },
  {
    id: "JE08",
    code: "JE08",
    nameKo: "신우라야스",
    nameJa: "新浦安",
  },
  {
    id: "JE09",
    code: "JE09",
    nameKo: "이치카와시오하마",
    nameJa: "市川塩浜",
  },
  {
    id: "JE10",
    code: "JE10",
    nameKo: "후타마타신마치",
    nameJa: "二俣新町",
  },
  {
    id: "JE11",
    code: "JE11",
    nameKo: "미나미후나바시",
    nameJa: "南船橋",
  },
  {
    id: "JE12",
    code: "JE12",
    nameKo: "신나라시노",
    nameJa: "新習志野",
  },
  {
    id: "JE13",
    code: "JE13",
    nameKo: "마쿠하리토요스나",
    nameJa: "幕張豊砂",
  },
  {
    id: "JE14",
    code: "JE14",
    nameKo: "가이힌마쿠하리",
    nameJa: "海浜幕張",
  },
  {
    id: "JE15",
    code: "JE15",
    nameKo: "게미가와하마",
    nameJa: "検見川浜",
  },
  {
    id: "JE16",
    code: "JE16",
    nameKo: "이나게카이간",
    nameJa: "稲毛海岸",
  },
  {
    id: "JE17",
    code: "JE17",
    nameKo: "지바미나토",
    nameJa: "千葉みなと",
  },
  {
    id: "JE18",
    code: "JE18",
    nameKo: "소가",
    nameJa: "蘇我",
  },
] as const;

/*
 * =========================================================
 * 환승 정보
 * =========================================================
 */

const transfersByStation: Record<string, Transfer[]> = {
  JE01: [
    transfer(
      "yamanote",
      "JY",
      "야마노테선",
      "山手線",
      "#80C41C",
    ),
    transfer(
      "keihin-tohoku",
      "JK",
      "게이힌도호쿠·네기시선",
      "京浜東北・根岸線",
      "#00A7DB",
    ),
    transfer(
      "chuo-rapid",
      "JC",
      "주오선 쾌속",
      "中央線快速",
      "#F15A22",
    ),
    transfer(
      "tokaido",
      "JT",
      "도카이도선",
      "東海道線",
      "#F68B1E",
    ),
    transfer(
      "yokosuka",
      "JO",
      "요코스카선",
      "横須賀線",
      "#0067C0",
    ),
    transfer(
      "sobu",
      "JO",
      "소부선 쾌속",
      "総武線快速",
      "#0067C0",
    ),
    transfer(
      "marunouchi",
      "M",
      "마루노우치선",
      "丸ノ内線",
      "#F62E36",
    ),
  ],

  JE02: [
    transfer(
      "hibiya",
      "H",
      "히비야선",
      "日比谷線",
      "#B5B5AC",
    ),
  ],

  JE05: [
    transfer(
      "yurakucho",
      "Y",
      "유라쿠초선",
      "有楽町線",
      "#C1A470",
    ),
  ],
};

/*
 * =========================================================
 * Station 데이터 생성
 * =========================================================
 */

export const keiyoStations: Station[] = stations.map(
  (station, index) => {
    const previousStation = stations[index - 1];
    const nextStation = stations[index + 1];

    /*
     * 배열:
     * 도쿄 → 소가
     *
     * previousStation = 도쿄 방향
     * nextStation     = 소가 방향
     */

    if (index === 0) {
      return {
        id: station.id,
        code: station.code,

        nameKo: station.nameKo,
        nameJa: station.nameJa,

        operatorId: "jr-east",
        lineId: "keiyo",
        lineCode: "JE",
        lineNameKo: "게이요선",
        lineNameJa: "京葉線",
        color: KEIYO_COLOR,

        type: "terminal",

        transfers: transfersByStation[station.id] ?? [],

        directions: [
          {
            id: "Outbound",

            label: "마이하마 · 가이힌마쿠하리 · 소가 방면",

            description: "하행",

            nextStations: nextStation
              ? [createNextStation(nextStation)]
              : [],
          },
        ],
      };
    }

    if (index === stations.length - 1) {
      return {
        id: station.id,
        code: station.code,

        nameKo: station.nameKo,
        nameJa: station.nameJa,

        operatorId: "jr-east",
        lineId: "keiyo",
        lineCode: "JE",
        lineNameKo: "게이요선",
        lineNameJa: "京葉線",
        color: KEIYO_COLOR,

        type: "terminal",

        transfers: transfersByStation[station.id] ?? [],

        directions: [
          {
            id: "Inbound",

            label: "가이힌마쿠하리 · 마이하마 · 도쿄 방면",

            description: "상행",

            nextStations: previousStation
              ? [createNextStation(previousStation)]
              : [],
          },
        ],
      };
    }

    return {
      id: station.id,
      code: station.code,

      nameKo: station.nameKo,
      nameJa: station.nameJa,

      operatorId: "jr-east",
      lineId: "keiyo",
      lineCode: "JE",
      lineNameKo: "게이요선",
      lineNameJa: "京葉線",
      color: KEIYO_COLOR,

      type: "normal",

      transfers: transfersByStation[station.id] ?? [],

      directions: [
        {
          id: "Inbound",

          label: "마이하마 · 도쿄 방면",

          description: "상행",

          nextStations: previousStation
            ? [createNextStation(previousStation)]
            : [],
        },
        {
          id: "Outbound",

          label: "가이힌마쿠하리 · 소가 방면",

          description: "하행",

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
 * 시간표 fallback
 * =========================================================
 */

export const keiyoTrains: Record<string, Train[]> = {};