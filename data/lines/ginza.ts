import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Tokyo Railway Guide
 * Tokyo Metro Ginza Line
 * 東京メトロ銀座線
 * =========================================================
 *
 * G01 시부야
 * ↓
 * G09 긴자
 * ↓
 * G16 우에노
 * ↓
 * G19 아사쿠사
 *
 * asakusa
 * = 아사쿠사 방면
 *
 * shibuya
 * = 시부야 방면
 *
 * =========================================================
 */

export const GINZA_COLOR = "#F39700";

/*
 * =========================================================
 * 기본 역 타입
 * =========================================================
 */

type GinzaStationBase = {
  id: string;

  nameKo: string;

  nameJa: string;
};

/*
 * =========================================================
 * 긴자선 역 목록
 * =========================================================
 *
 * G01 시부야
 * ↓
 * G19 아사쿠사
 * =========================================================
 */

const GINZA_STATION_BASE: GinzaStationBase[] = [
  {
    id: "G01",
    nameKo: "시부야",
    nameJa: "渋谷",
  },

  {
    id: "G02",
    nameKo: "오모테산도",
    nameJa: "表参道",
  },

  {
    id: "G03",
    nameKo: "가이엔마에",
    nameJa: "外苑前",
  },

  {
    id: "G04",
    nameKo: "아오야마잇초메",
    nameJa: "青山一丁目",
  },

  {
    id: "G05",
    nameKo: "아카사카미쓰케",
    nameJa: "赤坂見附",
  },

  {
    id: "G06",
    nameKo: "다메이케산노",
    nameJa: "溜池山王",
  },

  {
    id: "G07",
    nameKo: "도라노몬",
    nameJa: "虎ノ門",
  },

  {
    id: "G08",
    nameKo: "신바시",
    nameJa: "新橋",
  },

  {
    id: "G09",
    nameKo: "긴자",
    nameJa: "銀座",
  },

  {
    id: "G10",
    nameKo: "교바시",
    nameJa: "京橋",
  },

  {
    id: "G11",
    nameKo: "니혼바시",
    nameJa: "日本橋",
  },

  {
    id: "G12",
    nameKo: "미쓰코시마에",
    nameJa: "三越前",
  },

  {
    id: "G13",
    nameKo: "간다",
    nameJa: "神田",
  },

  {
    id: "G14",
    nameKo: "스에히로초",
    nameJa: "末広町",
  },

  {
    id: "G15",
    nameKo: "우에노히로코지",
    nameJa: "上野広小路",
  },

  {
    id: "G16",
    nameKo: "우에노",
    nameJa: "上野",
  },

  {
    id: "G17",
    nameKo: "이나리초",
    nameJa: "稲荷町",
  },

  {
    id: "G18",
    nameKo: "다와라마치",
    nameJa: "田原町",
  },

  {
    id: "G19",
    nameKo: "아사쿠사",
    nameJa: "浅草",
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
   * G01 시부야
   * =======================================================
   */

  G01: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer("hanzomon", "Z", "한조몬선", "半蔵門線", "#8F76D6"),

    transfer("fukutoshin", "F", "후쿠토신선", "副都心線", "#9C5E31"),

    transfer("tokyu-toyoko", "TY", "도큐 도요코선", "東急東横線", "#DA0442"),

    transfer(
      "tokyu-denentoshi",
      "DT",
      "도큐 덴엔토시선",
      "東急田園都市線",
      "#00AA8E",
    ),
  ],

  /*
   * =======================================================
   * G02 오모테산도
   * =======================================================
   */

  G02: [
    transfer("chiyoda", "C", "지요다선", "千代田線", "#00BB85"),

    transfer("hanzomon", "Z", "한조몬선", "半蔵門線", "#8F76D6"),
  ],

  /*
   * =======================================================
   * G04 아오야마잇초메
   * =======================================================
   */

  G04: [
    transfer("hanzomon", "Z", "한조몬선", "半蔵門線", "#8F76D6"),

    transfer("oedo", "E", "도에이 오에도선", "都営大江戸線", "#CE045B"),
  ],

  /*
   * =======================================================
   * G05 아카사카미쓰케
   * =======================================================
   */

  G05: [
    transfer("marunouchi", "M", "마루노우치선", "丸ノ内線", "#F62E36"),

    transfer("yurakucho", "Y", "유라쿠초선", "有楽町線", "#C1A470"),

    transfer("hanzomon", "Z", "한조몬선", "半蔵門線", "#8F76D6"),

    transfer("namboku", "N", "난보쿠선", "南北線", "#00AC9B"),
  ],

  /*
   * =======================================================
   * G06 다메이케산노
   * =======================================================
   */

  G06: [transfer("namboku", "N", "난보쿠선", "南北線", "#00AC9B")],

  /*
   * =======================================================
   * G08 신바시
   * =======================================================
   */

  G08: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer(
      "keihin-tohoku",
      "JK",
      "게이힌도호쿠·네기시선",
      "京浜東北・根岸線",
      "#00A7DB",
    ),

    transfer("toei-asakusa", "A", "도에이 아사쿠사선", "都営浅草線", "#E85298"),
  ],

  /*
   * =======================================================
   * G09 긴자
   * =======================================================
   */

  G09: [
    transfer("marunouchi", "M", "마루노우치선", "丸ノ内線", "#F62E36"),

    transfer("hibiya", "H", "히비야선", "日比谷線", "#B5B5AC"),
  ],

  /*
   * =======================================================
   * G11 니혼바시
   * =======================================================
   */

  G11: [
    transfer("tozai", "T", "도자이선", "東西線", "#009BBF"),

    transfer("toei-asakusa", "A", "도에이 아사쿠사선", "都営浅草線", "#E85298"),
  ],

  /*
   * =======================================================
   * G12 미쓰코시마에
   * =======================================================
   */

  G12: [transfer("hanzomon", "Z", "한조몬선", "半蔵門線", "#8F76D6")],

  /*
   * =======================================================
   * G13 간다
   * =======================================================
   */

  G13: [
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
   * G15 우에노히로코지
   * =======================================================
   */

  G15: [transfer("oedo", "E", "도에이 오에도선", "都営大江戸線", "#CE045B")],

  /*
   * =======================================================
   * G16 우에노
   * =======================================================
   */

  G16: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer(
      "keihin-tohoku",
      "JK",
      "게이힌도호쿠·네기시선",
      "京浜東北・根岸線",
      "#00A7DB",
    ),

    transfer("hibiya", "H", "히비야선", "日比谷線", "#B5B5AC"),
  ],

  /*
   * =======================================================
   * G19 아사쿠사
   * =======================================================
   */

  G19: [
    transfer("toei-asakusa", "A", "도에이 아사쿠사선", "都営浅草線", "#E85298"),
  ],
};

/*
 * =========================================================
 * NextStation 생성
 * =========================================================
 */

const createNextStation = (station: GinzaStationBase) => {
  return {
    id: station.id,

    code: station.id,

    nameKo: station.nameKo,

    nameJa: station.nameJa,

    lineId: "ginza",

    lineCode: "G",

    lineNameKo: "긴자선",

    color: GINZA_COLOR,
  };
};

/*
 * =========================================================
 * Station[] 생성
 * =========================================================
 *
 * 배열:
 *
 * G01 시부야
 * ↓
 * G19 아사쿠사
 *
 *
 * asakusa
 * = index + 1
 *
 * shibuya
 * = index - 1
 * =========================================================
 */

export const ginzaStations: Station[] = GINZA_STATION_BASE.map(
  (station, index, stations) => {
    const isShibuya = index === 0;

    const isAsakusa = index === stations.length - 1;

    const shibuyaNext = index > 0 ? stations[index - 1] : undefined;

    const asakusaNext =
      index < stations.length - 1 ? stations[index + 1] : undefined;

    /*
     * =====================================================
     * G01 시부야
     * =====================================================
     */

    if (isShibuya && asakusaNext) {
      return {
        id: station.id,

        operatorId: "tokyo-metro",

        lineId: "ginza",

        lineCode: "G",

        lineNameKo: "긴자선",

        lineNameJa: "銀座線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: GINZA_COLOR,

        type: "terminal",

        directions: [
          {
            id: "asakusa",

            label: "아사쿠사 방면",

            description: "→ 긴자·우에노·아사쿠사 방면",

            nextStations: [createNextStation(asakusaNext)],
          },
        ],

        transfers: TRANSFERS[station.id] ?? [],
      };
    }

    /*
     * =====================================================
     * G19 아사쿠사
     * =====================================================
     */

    if (isAsakusa && shibuyaNext) {
      return {
        id: station.id,

        operatorId: "tokyo-metro",

        lineId: "ginza",

        lineCode: "G",

        lineNameKo: "긴자선",

        lineNameJa: "銀座線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: GINZA_COLOR,

        type: "terminal",

        directions: [
          {
            id: "shibuya",

            label: "시부야 방면",

            description: "→ 우에노·긴자·시부야 방면",

            nextStations: [createNextStation(shibuyaNext)],
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

    if (!shibuyaNext || !asakusaNext) {
      throw new Error(`긴자선 다음역 생성 실패: ${station.id}`);
    }

    return {
      id: station.id,

      operatorId: "tokyo-metro",

      lineId: "ginza",

      lineCode: "G",

      lineNameKo: "긴자선",

      lineNameJa: "銀座線",

      code: station.id,

      nameKo: station.nameKo,

      nameJa: station.nameJa,

      color: GINZA_COLOR,

      type: "normal",

      directions: [
        /*
         * ===============================================
         * 아사쿠사 방면
         * ===============================================
         */

        {
          id: "asakusa",

          label: "아사쿠사 방면",

          description: "→ 긴자·우에노·아사쿠사 방면",

          nextStations: [createNextStation(asakusaNext)],
        },

        /*
         * ===============================================
         * 시부야 방면
         * ===============================================
         */

        {
          id: "shibuya",

          label: "시부야 방면",

          description: "→ 긴자·시부야 방면",

          nextStations: [createNextStation(shibuyaNext)],
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
 * 실제 시간표 API 연결 전이므로
 * 더미 열차는 사용하지 않는다.
 * =========================================================
 */

export const ginzaTrains: Record<string, Train[]> = {};

