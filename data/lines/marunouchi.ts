import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Tokyo Railway Guide
 * Tokyo Metro Marunouchi Line
 * 東京メトロ丸ノ内線
 * =========================================================
 *
 * M01 오기쿠보
 * ↓
 * M25 이케부쿠로
 *
 * 일반역:
 * 긴자선과 동일한 DirectionTabs
 *
 * M01 / M25:
 * terminal
 *
 * =========================================================
 */

export const MARUNOUCHI_COLOR = "#F62E36";

/*
 * =========================================================
 * 기본 역 타입
 * =========================================================
 */

type MarunouchiStationBase = {
  id: string;

  nameKo: string;

  nameJa: string;
};

/*
 * =========================================================
 * 마루노우치선 역 목록
 * =========================================================
 */

const MARUNOUCHI_STATION_BASE: MarunouchiStationBase[] = [
  {
    id: "M01",
    nameKo: "오기쿠보",
    nameJa: "荻窪",
  },

  {
    id: "M02",
    nameKo: "미나미아사가야",
    nameJa: "南阿佐ケ谷",
  },

  {
    id: "M03",
    nameKo: "신코엔지",
    nameJa: "新高円寺",
  },

  {
    id: "M04",
    nameKo: "히가시코엔지",
    nameJa: "東高円寺",
  },

  {
    id: "M05",
    nameKo: "신나카노",
    nameJa: "新中野",
  },

  {
    id: "M06",
    nameKo: "나카노사카우에",
    nameJa: "中野坂上",
  },

  {
    id: "M07",
    nameKo: "니시신주쿠",
    nameJa: "西新宿",
  },

  {
    id: "M08",
    nameKo: "신주쿠",
    nameJa: "新宿",
  },

  {
    id: "M09",
    nameKo: "신주쿠산초메",
    nameJa: "新宿三丁目",
  },

  {
    id: "M10",
    nameKo: "신주쿠교엔마에",
    nameJa: "新宿御苑前",
  },

  {
    id: "M11",
    nameKo: "요쓰야산초메",
    nameJa: "四谷三丁目",
  },

  {
    id: "M12",
    nameKo: "요쓰야",
    nameJa: "四ツ谷",
  },

  {
    id: "M13",
    nameKo: "아카사카미쓰케",
    nameJa: "赤坂見附",
  },

  {
    id: "M14",
    nameKo: "국회의사당앞",
    nameJa: "国会議事堂前",
  },

  {
    id: "M15",
    nameKo: "가스미가세키",
    nameJa: "霞ケ関",
  },

  {
    id: "M16",
    nameKo: "긴자",
    nameJa: "銀座",
  },

  {
    id: "M17",
    nameKo: "도쿄",
    nameJa: "東京",
  },

  {
    id: "M18",
    nameKo: "오테마치",
    nameJa: "大手町",
  },

  {
    id: "M19",
    nameKo: "아와지초",
    nameJa: "淡路町",
  },

  {
    id: "M20",
    nameKo: "오차노미즈",
    nameJa: "御茶ノ水",
  },

  {
    id: "M21",
    nameKo: "혼고산초메",
    nameJa: "本郷三丁目",
  },

  {
    id: "M22",
    nameKo: "고라쿠엔",
    nameJa: "後楽園",
  },

  {
    id: "M23",
    nameKo: "묘가다니",
    nameJa: "茗荷谷",
  },

  {
    id: "M24",
    nameKo: "신오쓰카",
    nameJa: "新大塚",
  },

  {
    id: "M25",
    nameKo: "이케부쿠로",
    nameJa: "池袋",
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
 * 환승 Helper
 * =========================================================
 */

const transfer = (
  id: string,
  code: string,
  nameKo: string,
  nameJa: string,
  color: string,
): Transfer => {
  return {
    id,
    code,
    nameKo,
    nameJa,
    color,
  };
};

/*
 * =========================================================
 * 주요 환승역
 * =========================================================
 */

const TRANSFERS: Record<string, Transfer[]> = {
  /*
   * =======================================================
   * M06 나카노사카우에
   * =======================================================
   */

  M06: [transfer("oedo", "E", "도에이 오에도선", "都営大江戸線", "#CE045B")],

  /*
   * =======================================================
   * M08 신주쿠
   * =======================================================
   */

  M08: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer("chuo-rapid", "JC", "주오선 쾌속", "中央線快速", "#F15A22"),

    transfer("chuo-sobu-local", "JB", "주오·소부선", "中央・総武線", "#FFD400"),

    transfer("saikyo", "JA", "사이쿄선", "埼京線", "#00AC9A"),

    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),

    transfer("shinjuku", "S", "도에이 신주쿠선", "都営新宿線", "#6CBB5A"),

    transfer("oedo", "E", "도에이 오에도선", "都営大江戸線", "#CE045B"),

    transfer(
      "odakyu-odawara",
      "OH",
      "오다큐 오다와라선",
      "小田急小田原線",
      "#2288CC",
    ),

    transfer("keio", "KO", "게이오선", "京王線", "#DD0077"),
  ],

  /*
   * =======================================================
   * M09 신주쿠산초메
   * =======================================================
   */

  M09: [
    transfer("fukutoshin", "F", "후쿠토신선", "副都心線", "#9C5E31"),

    transfer("shinjuku", "S", "도에이 신주쿠선", "都営新宿線", "#6CBB5A"),
  ],

  /*
   * =======================================================
   * M12 요쓰야
   * =======================================================
   */

  M12: [
    transfer("chuo-rapid", "JC", "주오선 쾌속", "中央線快速", "#F15A22"),

    transfer("chuo-sobu-local", "JB", "주오·소부선", "中央・総武線", "#FFD400"),

    transfer("namboku", "N", "난보쿠선", "南北線", "#00AC9B"),
  ],

  /*
   * =======================================================
   * M13 아카사카미쓰케
   * =======================================================
   */

  M13: [
    transfer("ginza", "G", "긴자선", "銀座線", "#F39700"),

    transfer("yurakucho", "Y", "유라쿠초선", "有楽町線", "#C1A470"),

    transfer("hanzomon", "Z", "한조몬선", "半蔵門線", "#8F76D6"),

    transfer("namboku", "N", "난보쿠선", "南北線", "#00AC9B"),
  ],

  /*
   * =======================================================
   * M14 국회의사당앞
   * =======================================================
   */

  M14: [
    transfer("chiyoda", "C", "지요다선", "千代田線", "#00BB85"),

    transfer("ginza", "G", "긴자선", "銀座線", "#F39700"),

    transfer("namboku", "N", "난보쿠선", "南北線", "#00AC9B"),
  ],

  /*
   * =======================================================
   * M15 가스미가세키
   * =======================================================
   */

  M15: [
    transfer("hibiya", "H", "히비야선", "日比谷線", "#B5B5AC"),

    transfer("chiyoda", "C", "지요다선", "千代田線", "#00BB85"),
  ],

  /*
   * =======================================================
   * M16 긴자
   * =======================================================
   */

  M16: [
    transfer("ginza", "G", "긴자선", "銀座線", "#F39700"),

    transfer("hibiya", "H", "히비야선", "日比谷線", "#B5B5AC"),
  ],

  /*
   * =======================================================
   * M17 도쿄
   * =======================================================
   */

  M17: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer("chuo-rapid", "JC", "주오선 쾌속", "中央線快速", "#F15A22"),

    transfer(
      "keihin-tohoku",
      "JK",
      "게이힌도호쿠·네기시선",
      "京浜東北・根岸線",
      "#00A7DB",
    ),
  ],

  /*
   * =======================================================
   * M18 오테마치
   * =======================================================
   */

  M18: [
    transfer("tozai", "T", "도자이선", "東西線", "#009BBF"),

    transfer("chiyoda", "C", "지요다선", "千代田線", "#00BB85"),

    transfer("hanzomon", "Z", "한조몬선", "半蔵門線", "#8F76D6"),

    transfer("mita", "I", "도에이 미타선", "都営三田線", "#0079C2"),
  ],

  /*
   * =======================================================
   * M19 아와지초
   * =======================================================
   */

  M19: [
    transfer("chiyoda", "C", "지요다선", "千代田線", "#00BB85"),

    transfer("shinjuku", "S", "도에이 신주쿠선", "都営新宿線", "#6CBB5A"),
  ],

  /*
   * =======================================================
   * M20 오차노미즈
   * =======================================================
   */

  M20: [
    transfer("chuo-rapid", "JC", "주오선 쾌속", "中央線快速", "#F15A22"),

    transfer("chuo-sobu-local", "JB", "주오·소부선", "中央・総武線", "#FFD400"),
  ],

  /*
   * =======================================================
   * M21 혼고산초메
   * =======================================================
   */

  M21: [transfer("oedo", "E", "도에이 오에도선", "都営大江戸線", "#CE045B")],

  /*
   * =======================================================
   * M22 고라쿠엔
   * =======================================================
   */

  M22: [
    transfer("namboku", "N", "난보쿠선", "南北線", "#00AC9B"),

    transfer("mita", "I", "도에이 미타선", "都営三田線", "#0079C2"),

    transfer("oedo", "E", "도에이 오에도선", "都営大江戸線", "#CE045B"),
  ],

  /*
   * =======================================================
   * M25 이케부쿠로
   * =======================================================
   */

  M25: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer("saikyo", "JA", "사이쿄선", "埼京線", "#00AC9A"),

    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),

    transfer("yurakucho", "Y", "유라쿠초선", "有楽町線", "#C1A470"),

    transfer("fukutoshin", "F", "후쿠토신선", "副都心線", "#9C5E31"),

    transfer(
      "seibu-ikebukuro",
      "SI",
      "세이부 이케부쿠로선",
      "西武池袋線",
      "#EF810F",
    ),

    transfer("tobu-tojo", "TJ", "도부 도조선", "東武東上線", "#004098"),
  ],
};

/*
 * =========================================================
 * NextStation 생성
 * =========================================================
 */

const createNextStation = (station: MarunouchiStationBase) => {
  return {
    id: station.id,

    code: station.id,

    nameKo: station.nameKo,

    nameJa: station.nameJa,

    lineId: "marunouchi",

    lineCode: "M",

    lineNameKo: "마루노우치선",

    color: MARUNOUCHI_COLOR,
  };
};

/*
 * =========================================================
 * Station[] 생성
 * =========================================================
 *
 * M01 오기쿠보
 * ↓
 * M25 이케부쿠로
 *
 * previousStation
 * = 오기쿠보 방면
 *
 * nextStation
 * = 이케부쿠로 방면
 *
 * =========================================================
 */

export const marunouchiStations: Station[] = MARUNOUCHI_STATION_BASE.map(
  (station, index, stations) => {
    const isOgikubo = index === 0;

    const isIkebukuro = index === stations.length - 1;

    const ogikuboNext = index > 0 ? stations[index - 1] : undefined;

    const ikebukuroNext =
      index < stations.length - 1 ? stations[index + 1] : undefined;

    /*
     * =====================================================
     * M01 오기쿠보
     * =====================================================
     */

    if (isOgikubo && ikebukuroNext) {
      return {
        id: station.id,

        operatorId: "tokyo-metro",

        lineId: "marunouchi",

        lineCode: "M",

        lineNameKo: "마루노우치선",

        lineNameJa: "丸ノ内線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: MARUNOUCHI_COLOR,

        type: "terminal",

        directions: [
          {
            id: "ikebukuro",

            label: "이케부쿠로 방면",

            description: "→ 신주쿠·도쿄·이케부쿠로 방면",

            nextStations: [createNextStation(ikebukuroNext)],
          },
        ],

        transfers: TRANSFERS[station.id] ?? [],
      };
    }

    /*
     * =====================================================
     * M25 이케부쿠로
     * =====================================================
     */

    if (isIkebukuro && ogikuboNext) {
      return {
        id: station.id,

        operatorId: "tokyo-metro",

        lineId: "marunouchi",

        lineCode: "M",

        lineNameKo: "마루노우치선",

        lineNameJa: "丸ノ内線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: MARUNOUCHI_COLOR,

        type: "terminal",

        directions: [
          {
            id: "ogikubo",

            label: "오기쿠보 방면",

            description: "→ 도쿄·신주쿠·오기쿠보 방면",

            nextStations: [createNextStation(ogikuboNext)],
          },
        ],

        transfers: TRANSFERS[station.id] ?? [],
      };
    }

    /*
     * =====================================================
     * 일반역
     * =====================================================
     */

    if (!ogikuboNext || !ikebukuroNext) {
      throw new Error(`마루노우치선 다음역 생성 실패: ${station.id}`);
    }

    return {
      id: station.id,

      operatorId: "tokyo-metro",

      lineId: "marunouchi",

      lineCode: "M",

      lineNameKo: "마루노우치선",

      lineNameJa: "丸ノ内線",

      code: station.id,

      nameKo: station.nameKo,

      nameJa: station.nameJa,

      color: MARUNOUCHI_COLOR,

      /*
       * 긴자선과 동일한 탭 UI
       */

      type: "normal",

      directions: [
        /*
         * ===============================================
         * 오기쿠보 방면
         * ===============================================
         */

        {
          id: "ogikubo",

          label: "오기쿠보 방면",

          description: "→ 신주쿠·오기쿠보 방면",

          nextStations: [createNextStation(ogikuboNext)],
        },

        /*
         * ===============================================
         * 이케부쿠로 방면
         * ===============================================
         */

        {
          id: "ikebukuro",

          label: "이케부쿠로 방면",

          description: "→ 도쿄·이케부쿠로 방면",

          nextStations: [createNextStation(ikebukuroNext)],
        },
      ],

      /*
       * 핵심:
       * 역 ID에 맞는 환승노선 자동 적용
       */

      transfers: TRANSFERS[station.id] ?? [],
    };
  },
);

/*
 * =========================================================
 * Registry fallback
 * =========================================================
 *
 * 실제 열차 시간표는
 * Tokyo Metro API + Hook에서 가져온다.
 * =========================================================
 */

export const marunouchiTrains: Record<string, Train[]> = {};

