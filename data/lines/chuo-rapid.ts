import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

export const CHUO_RAPID_COLOR = "#F15A22";

/*
 * =========================================================
 * JR 동일본 - 주오선 쾌속
 * 中央線快速
 * JC01 ~ JC24
 * =========================================================
 *
 * 앱 범위:
 * 도쿄(JC01) ~ 다카오(JC24)
 *
 * 방향:
 * inbound  = 도쿄 방면
 * outbound = 다카오 방면
 *
 * 실제 시간표:
 * services/jrEast.ts
 *   ↓
 * hooks/useJrEastTrains.ts
 *   ↓
 * adapters/jrEastTrainAdapter.ts
 *
 * 이 파일에는 실제 열차 더미 데이터를 넣지 않는다.
 * =========================================================
 */

type ChuoRapidStationBase = {
  id: string;
  nameKo: string;
  nameJa: string;
};

/*
 * =========================================================
 * 기본 역 정보
 * =========================================================
 */

const CHUO_RAPID_STATION_BASE: ChuoRapidStationBase[] = [
  {
    id: "JC01",
    nameKo: "도쿄",
    nameJa: "東京",
  },
  {
    id: "JC02",
    nameKo: "간다",
    nameJa: "神田",
  },
  {
    id: "JC03",
    nameKo: "오차노미즈",
    nameJa: "御茶ノ水",
  },
  {
    id: "JC04",
    nameKo: "요쓰야",
    nameJa: "四ツ谷",
  },
  {
    id: "JC05",
    nameKo: "신주쿠",
    nameJa: "新宿",
  },
  {
    id: "JC06",
    nameKo: "나카노",
    nameJa: "中野",
  },
  {
    id: "JC07",
    nameKo: "고엔지",
    nameJa: "高円寺",
  },
  {
    id: "JC08",
    nameKo: "아사가야",
    nameJa: "阿佐ケ谷",
  },
  {
    id: "JC09",
    nameKo: "오기쿠보",
    nameJa: "荻窪",
  },
  {
    id: "JC10",
    nameKo: "니시오기쿠보",
    nameJa: "西荻窪",
  },
  {
    id: "JC11",
    nameKo: "기치조지",
    nameJa: "吉祥寺",
  },
  {
    id: "JC12",
    nameKo: "미타카",
    nameJa: "三鷹",
  },
  {
    id: "JC13",
    nameKo: "무사시사카이",
    nameJa: "武蔵境",
  },
  {
    id: "JC14",
    nameKo: "히가시코가네이",
    nameJa: "東小金井",
  },
  {
    id: "JC15",
    nameKo: "무사시코가네이",
    nameJa: "武蔵小金井",
  },
  {
    id: "JC16",
    nameKo: "고쿠분지",
    nameJa: "国分寺",
  },
  {
    id: "JC17",
    nameKo: "니시고쿠분지",
    nameJa: "西国分寺",
  },
  {
    id: "JC18",
    nameKo: "구니타치",
    nameJa: "国立",
  },
  {
    id: "JC19",
    nameKo: "다치카와",
    nameJa: "立川",
  },
  {
    id: "JC20",
    nameKo: "히노",
    nameJa: "日野",
  },
  {
    id: "JC21",
    nameKo: "도요다",
    nameJa: "豊田",
  },
  {
    id: "JC22",
    nameKo: "하치오지",
    nameJa: "八王子",
  },
  {
    id: "JC23",
    nameKo: "니시하치오지",
    nameJa: "西八王子",
  },
  {
    id: "JC24",
    nameKo: "다카오",
    nameJa: "高尾",
  },
];

/*
 * =========================================================
 * 환승 타입
 * =========================================================
 */

type Transfer = NonNullable<Station["transfers"]>[number];

/*
 * =========================================================
 * 환승 생성 Helper
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
 * 환승 정보
 * =========================================================
 *
 * 같은 JR 노선 + 지하철 + 주요 사철 중심.
 * =========================================================
 */

const TRANSFERS: Record<string, Transfer[]> = {
  /*
   * JC01 도쿄
   */

  JC01: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),
    transfer("keihin-tohoku", "JK", "게이힌도호쿠선", "京浜東北線", "#00A7DB"),
    transfer("tokaido", "JT", "도카이도선", "東海道線", "#F68B1E"),
    transfer("ueno-tokyo", "JU", "우에노도쿄라인", "上野東京ライン", "#7A3E98"),
    transfer(
      "yokosuka-sobu-rapid",
      "JO",
      "요코스카·소부 쾌속선",
      "横須賀・総武快速線",
      "#1069B4",
    ),
    transfer("keiyo", "JE", "게이요선", "京葉線", "#C9242F"),
    transfer(
      "marunouchi",
      "M",
      "도쿄메트로 마루노우치선",
      "東京メトロ丸ノ内線",
      "#F62E36",
    ),
  ],

  /*
   * JC02 간다
   */

  JC02: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),
    transfer("keihin-tohoku", "JK", "게이힌도호쿠선", "京浜東北線", "#00A7DB"),
    transfer("ginza", "G", "도쿄메트로 긴자선", "東京メトロ銀座線", "#F39700"),
  ],

  /*
   * JC03 오차노미즈
   */

  JC03: [
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부 완행선",
      "中央・総武線各駅停車",
      "#FFD400",
    ),
    transfer(
      "marunouchi",
      "M",
      "도쿄메트로 마루노우치선",
      "東京メトロ丸ノ内線",
      "#F62E36",
    ),
  ],

  /*
   * JC04 요쓰야
   */

  JC04: [
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부 완행선",
      "中央・総武線各駅停車",
      "#FFD400",
    ),
    transfer(
      "marunouchi",
      "M",
      "도쿄메트로 마루노우치선",
      "東京メトロ丸ノ内線",
      "#F62E36",
    ),
    transfer(
      "namboku",
      "N",
      "도쿄메트로 난보쿠선",
      "東京メトロ南北線",
      "#00AC9B",
    ),
  ],

  /*
   * JC05 신주쿠
   */

  JC05: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부 완행선",
      "中央・総武線各駅停車",
      "#FFD400",
    ),
    transfer("saikyo", "JA", "사이쿄선", "埼京線", "#00AC9A"),
    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),
    transfer(
      "marunouchi",
      "M",
      "도쿄메트로 마루노우치선",
      "東京メトロ丸ノ内線",
      "#F62E36",
    ),
    transfer("shinjuku", "S", "도에이 신주쿠선", "都営新宿線", "#6CBB5A"),
    transfer("oedo", "E", "도에이 오에도선", "都営大江戸線", "#CE045B"),
    transfer("keio", "KO", "게이오선", "京王線", "#DD0077"),
    transfer("odakyu", "OH", "오다큐선", "小田急線", "#2288CC"),
  ],

  /*
   * JC06 나카노
   */

  JC06: [
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부 완행선",
      "中央・総武線各駅停車",
      "#FFD400",
    ),
    transfer(
      "tozai",
      "T",
      "도쿄메트로 도자이선",
      "東京メトロ東西線",
      "#009BBF",
    ),
  ],

  /*
   * JC07 고엔지
   */

  JC07: [
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부 완행선",
      "中央・総武線各駅停車",
      "#FFD400",
    ),
  ],

  /*
   * JC08 아사가야
   */

  JC08: [
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부 완행선",
      "中央・総武線各駅停車",
      "#FFD400",
    ),
  ],

  /*
   * JC09 오기쿠보
   */

  JC09: [
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부 완행선",
      "中央・総武線各駅停車",
      "#FFD400",
    ),
    transfer(
      "marunouchi",
      "M",
      "도쿄메트로 마루노우치선",
      "東京メトロ丸ノ内線",
      "#F62E36",
    ),
  ],

  /*
   * JC10 니시오기쿠보
   */

  JC10: [
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부 완행선",
      "中央・総武線各駅停車",
      "#FFD400",
    ),
  ],

  /*
   * JC11 기치조지
   */

  JC11: [
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부 완행선",
      "中央・総武線各駅停車",
      "#FFD400",
    ),
    transfer(
      "keio-inokashira",
      "IN",
      "게이오 이노카시라선",
      "京王井の頭線",
      "#000088",
    ),
  ],

  /*
   * JC12 미타카
   */

  JC12: [
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부 완행선",
      "中央・総武線各駅停車",
      "#FFD400",
    ),
  ],

  /*
   * JC13 무사시사카이
   */

  JC13: [
    transfer(
      "seibu-tamagawa",
      "SW",
      "세이부 다마가와선",
      "西武多摩川線",
      "#EF810F",
    ),
  ],

  /*
   * JC16 고쿠분지
   */

  JC16: [
    transfer(
      "seibu-kokubunji",
      "SK",
      "세이부 고쿠분지선",
      "西武国分寺線",
      "#00A6BF",
    ),
    transfer(
      "seibu-tamako",
      "ST",
      "세이부 다마코선",
      "西武多摩湖線",
      "#00A6BF",
    ),
  ],

  /*
   * JC17 니시고쿠분지
   */

  JC17: [transfer("musashino", "JM", "무사시노선", "武蔵野線", "#F15A22")],

  /*
   * JC19 다치카와
   */

  JC19: [
    transfer("nambu", "JN", "난부선", "南武線", "#FFD400"),
    transfer("ome", "JC", "오메선", "青梅線", "#F15A22"),
    transfer(
      "tama-monorail",
      "TT",
      "다마 모노레일",
      "多摩モノレール",
      "#FF6633",
    ),
  ],

  /*
   * JC22 하치오지
   */

  JC22: [
    transfer("yokohama", "JH", "요코하마선", "横浜線", "#9ACD32"),
    transfer("hachiko", "八高", "하치코선", "八高線", "#A8A39D"),
  ],

  /*
   * JC24 다카오
   */

  JC24: [
    transfer("keio-takao", "KO", "게이오 다카오선", "京王高尾線", "#DD0077"),
  ],
};

/*
 * =========================================================
 * NextStation 생성
 * =========================================================
 */

const createNextStation = (station: ChuoRapidStationBase) => {
  return {
    id: station.id,

    code: station.id,

    nameKo: station.nameKo,
    nameJa: station.nameJa,

    lineId: "chuo-rapid",

    lineCode: "JC",

    lineNameKo: "주오선 쾌속",

    color: CHUO_RAPID_COLOR,
  };
};

/*
 * =========================================================
 * Station[] 자동 생성
 * =========================================================
 *
 * JC01 도쿄
 * → outbound만
 *
 * JC02 ~ JC23
 * → inbound / outbound
 *
 * JC24 다카오
 * → 앱의 ChuoRapid 범위에서는 inbound만
 * =========================================================
 */

export const chuoRapidStations: Station[] = CHUO_RAPID_STATION_BASE.map(
  (station, index, stations) => {
    const isTokyo = index === 0;

    const isTakao = index === stations.length - 1;

    const previousStation = index > 0 ? stations[index - 1] : undefined;

    const nextStation =
      index < stations.length - 1 ? stations[index + 1] : undefined;

    /*
     * =====================================================
     * JC01 도쿄
     * =====================================================
     */

    if (isTokyo && nextStation) {
      return {
        id: station.id,

        operatorId: "jr-east",

        lineId: "chuo-rapid",

        lineCode: "JC",

        lineNameKo: "주오선 쾌속",

        lineNameJa: "中央線快速",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: CHUO_RAPID_COLOR,

        type: "terminal",

        directions: [
          {
            id: "outbound",

            label: "신주쿠·다카오 방면",

            description: "→ 신주쿠·다카오 방면",

            nextStations: [createNextStation(nextStation)],
          },
        ],

        transfers: TRANSFERS[station.id] ?? [],
      };
    }

    /*
     * =====================================================
     * JC24 다카오
     * =====================================================
     *
     * 실제 철도 운행은 다카오 서쪽으로 이어지는
     * 열차도 있지만, 이 앱의 ChuoRapid 데이터 범위는
     * JC01~JC24로 한정한다.
     * =====================================================
     */

    if (isTakao && previousStation) {
      return {
        id: station.id,

        operatorId: "jr-east",

        lineId: "chuo-rapid",

        lineCode: "JC",

        lineNameKo: "주오선 쾌속",

        lineNameJa: "中央線快速",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: CHUO_RAPID_COLOR,

        type: "terminal",

        directions: [
          {
            id: "inbound",

            label: "신주쿠·도쿄 방면",

            description: "→ 신주쿠·도쿄 방면",

            nextStations: [createNextStation(previousStation)],
          },
        ],

        transfers: TRANSFERS[station.id] ?? [],
      };
    }

    /*
     * =====================================================
     * JC02 ~ JC23
     * =====================================================
     */

    if (!previousStation || !nextStation) {
      throw new Error(`주오선 다음역 생성 실패: ${station.id}`);
    }

    return {
      id: station.id,

      operatorId: "jr-east",

      lineId: "chuo-rapid",

      lineCode: "JC",

      lineNameKo: "주오선 쾌속",

      lineNameJa: "中央線快速",

      code: station.id,

      nameKo: station.nameKo,

      nameJa: station.nameJa,

      color: CHUO_RAPID_COLOR,

      type: "normal",

      directions: [
        /*
         * ===============================================
         * 상행
         * ===============================================
         */

        {
          id: "inbound",

          label: "도쿄 방면",

          description: "→ 신주쿠·도쿄 방면",

          nextStations: [createNextStation(previousStation)],
        },

        /*
         * ===============================================
         * 하행
         * ===============================================
         */

        {
          id: "outbound",

          label: "다카오 방면",

          description: "→ 다치카와·하치오지·다카오 방면",

          nextStations: [createNextStation(nextStation)],
        },
      ],

      transfers: TRANSFERS[station.id] ?? [],
    };
  },
);

/*
 * =========================================================
 * Registry fallback
 * =========================================================
 *
 * 실제 시간표는 JR East API를 사용하므로
 * 더미 데이터 없음.
 * =========================================================
 */

export const chuoRapidTrains: Record<string, Train[]> = {};

