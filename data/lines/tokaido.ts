import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * 도카이도선
 * 東海道線
 * JT01 도쿄 ~ JT21 아타미
 * =========================================================
 */

export const TOKAIDO_COLOR = "#F68B1E";

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

  lineId: "tokaido",
  lineCode: "JT",
  lineNameKo: "도카이도선",

  color: TOKAIDO_COLOR,
});

/*
 * =========================================================
 * 역 기본 데이터
 *
 * 배열 순서:
 * 도쿄 → 아타미
 *
 * Inbound:
 * 도쿄 방면
 *
 * Outbound:
 * 요코하마 · 오후나 · 오다와라 · 아타미 방면
 * =========================================================
 */

const stations = [
  {
    id: "JT01",
    code: "JT01",
    nameKo: "도쿄",
    nameJa: "東京",
  },
  {
    id: "JT02",
    code: "JT02",
    nameKo: "신바시",
    nameJa: "新橋",
  },
  {
    id: "JT03",
    code: "JT03",
    nameKo: "시나가와",
    nameJa: "品川",
  },
  {
    id: "JT04",
    code: "JT04",
    nameKo: "가와사키",
    nameJa: "川崎",
  },
  {
    id: "JT05",
    code: "JT05",
    nameKo: "요코하마",
    nameJa: "横浜",
  },
  {
    id: "JT06",
    code: "JT06",
    nameKo: "도츠카",
    nameJa: "戸塚",
  },
  {
    id: "JT07",
    code: "JT07",
    nameKo: "오후나",
    nameJa: "大船",
  },
  {
    id: "JT08",
    code: "JT08",
    nameKo: "후지사와",
    nameJa: "藤沢",
  },
  {
    id: "JT09",
    code: "JT09",
    nameKo: "쓰지도",
    nameJa: "辻堂",
  },
  {
    id: "JT10",
    code: "JT10",
    nameKo: "지가사키",
    nameJa: "茅ケ崎",
  },
  {
    id: "JT11",
    code: "JT11",
    nameKo: "히라츠카",
    nameJa: "平塚",
  },
  {
    id: "JT12",
    code: "JT12",
    nameKo: "오이소",
    nameJa: "大磯",
  },
  {
    id: "JT13",
    code: "JT13",
    nameKo: "니노미야",
    nameJa: "二宮",
  },
  {
    id: "JT14",
    code: "JT14",
    nameKo: "고즈",
    nameJa: "国府津",
  },
  {
    id: "JT15",
    code: "JT15",
    nameKo: "가모노미야",
    nameJa: "鴨宮",
  },
  {
    id: "JT16",
    code: "JT16",
    nameKo: "오다와라",
    nameJa: "小田原",
  },
  {
    id: "JT17",
    code: "JT17",
    nameKo: "하야카와",
    nameJa: "早川",
  },
  {
    id: "JT18",
    code: "JT18",
    nameKo: "네부카와",
    nameJa: "根府川",
  },
  {
    id: "JT19",
    code: "JT19",
    nameKo: "마나즈루",
    nameJa: "真鶴",
  },
  {
    id: "JT20",
    code: "JT20",
    nameKo: "유가와라",
    nameJa: "湯河原",
  },
  {
    id: "JT21",
    code: "JT21",
    nameKo: "아타미",
    nameJa: "熱海",
  },
] as const;

/*
 * =========================================================
 * 환승 정보
 * =========================================================
 */

const transfersByStation: Record<string, Transfer[]> = {
  JT01: [
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
      "yokosuka-sobu",
      "JO",
      "요코스카선",
      "横須賀線",
      "#0067C0",
    ),
    transfer(
      "keiyo",
      "JE",
      "게이요선",
      "京葉線",
      "#C9252F",
    ),
    transfer(
      "marunouchi",
      "M",
      "마루노우치선",
      "丸ノ内線",
      "#F62E36",
    ),
  ],

  JT02: [
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
      "yokosuka-sobu",
      "JO",
      "요코스카선",
      "横須賀線",
      "#0067C0",
    ),
    transfer(
      "ginza",
      "G",
      "긴자선",
      "銀座線",
      "#F39700",
    ),
  ],

  JT03: [
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
      "yokosuka-sobu",
      "JO",
      "요코스카선",
      "横須賀線",
      "#0067C0",
    ),
    transfer(
      "keikyu-main",
      "KK",
      "게이큐 본선",
      "京急本線",
      "#00A1E9",
    ),
  ],

  JT04: [
    transfer(
      "keihin-tohoku",
      "JK",
      "게이힌도호쿠·네기시선",
      "京浜東北・根岸線",
      "#00A7DB",
    ),
  ],

  JT05: [
    transfer(
      "keihin-tohoku",
      "JK",
      "게이힌도호쿠·네기시선",
      "京浜東北・根岸線",
      "#00A7DB",
    ),
    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),
    transfer(
      "yokosuka-sobu",
      "JO",
      "요코스카선",
      "横須賀線",
      "#0067C0",
    ),
    transfer(
      "tokyu-toyoko",
      "TY",
      "도큐 도요코선",
      "東急東横線",
      "#DA0442",
    ),
    transfer(
      "keikyu-main",
      "KK",
      "게이큐 본선",
      "京急本線",
      "#00A1E9",
    ),
  ],

  JT06: [
    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),
    transfer(
      "yokosuka-sobu",
      "JO",
      "요코스카선",
      "横須賀線",
      "#0067C0",
    ),
  ],

  JT07: [
    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),
    transfer(
      "yokosuka-sobu",
      "JO",
      "요코스카선",
      "横須賀線",
      "#0067C0",
    ),
  ],
};

/*
 * =========================================================
 * Station 데이터 생성
 * =========================================================
 */

export const tokaidoStations: Station[] = stations.map(
  (station, index) => {
    const previousStation = stations[index - 1];
    const nextStation = stations[index + 1];

    /*
     * 배열:
     * 도쿄 → 아타미
     *
     * previousStation = 도쿄 방향
     * nextStation     = 아타미 방향
     */

    if (index === 0) {
      return {
        id: station.id,
        code: station.code,

        nameKo: station.nameKo,
        nameJa: station.nameJa,

        operatorId: "jr-east",
        lineId: "tokaido",
        lineCode: "JT",
        lineNameKo: "도카이도선",
        lineNameJa: "東海道線",
        color: TOKAIDO_COLOR,

        type: "terminal",

        transfers: transfersByStation[station.id] ?? [],

        directions: [
          {
            id: "Outbound",

            label: "요코하마 · 오후나 · 오다와라 · 아타미 방면",

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
        lineId: "tokaido",
        lineCode: "JT",
        lineNameKo: "도카이도선",
        lineNameJa: "東海道線",
        color: TOKAIDO_COLOR,

        type: "terminal",

        transfers: transfersByStation[station.id] ?? [],

        directions: [
          {
            id: "Inbound",

            label: "오다와라 · 오후나 · 요코하마 · 도쿄 방면",

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
      lineId: "tokaido",
      lineCode: "JT",
      lineNameKo: "도카이도선",
      lineNameJa: "東海道線",
      color: TOKAIDO_COLOR,

      type: "normal",

      transfers: transfersByStation[station.id] ?? [],

      directions: [
        {
          id: "Inbound",

          label: "요코하마 · 도쿄 방면",

          description: "상행",

          nextStations: previousStation
            ? [createNextStation(previousStation)]
            : [],
        },
        {
          id: "Outbound",

          label: "오다와라 · 아타미 방면",

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

export const tokaidoTrains: Record<string, Train[]> = {};