import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Tokyo Railway Guide
 * Tokyo Metro Hibiya Line
 * 東京メトロ日比谷線
 * =========================================================
 *
 * H01 나카메구로
 * ↓
 * H22 기타센주
 *
 * nakaMeguro
 * = 나카메구로 방면
 *
 * kitaSenju
 * = 기타센주 방면
 *
 * =========================================================
 */

export const HIBIYA_COLOR = "#B5B5AC";

/*
 * =========================================================
 * 기본 역 타입
 * =========================================================
 */

type HibiyaStationBase = {
  id: string;

  nameKo: string;

  nameJa: string;
};

/*
 * =========================================================
 * 히비야선 역 목록
 * =========================================================
 */

const HIBIYA_STATION_BASE: HibiyaStationBase[] = [
  {
    id: "H01",
    nameKo: "나카메구로",
    nameJa: "中目黒",
  },

  {
    id: "H02",
    nameKo: "에비스",
    nameJa: "恵比寿",
  },

  {
    id: "H03",
    nameKo: "히로오",
    nameJa: "広尾",
  },

  {
    id: "H04",
    nameKo: "롯폰기",
    nameJa: "六本木",
  },

  {
    id: "H05",
    nameKo: "가미야초",
    nameJa: "神谷町",
  },

  {
    id: "H06",
    nameKo: "도라노몬힐즈",
    nameJa: "虎ノ門ヒルズ",
  },

  {
    id: "H07",
    nameKo: "가스미가세키",
    nameJa: "霞ケ関",
  },

  {
    id: "H08",
    nameKo: "히비야",
    nameJa: "日比谷",
  },

  {
    id: "H09",
    nameKo: "긴자",
    nameJa: "銀座",
  },

  {
    id: "H10",
    nameKo: "히가시긴자",
    nameJa: "東銀座",
  },

  {
    id: "H11",
    nameKo: "쓰키지",
    nameJa: "築地",
  },

  {
    id: "H12",
    nameKo: "핫초보리",
    nameJa: "八丁堀",
  },

  {
    id: "H13",
    nameKo: "가야바초",
    nameJa: "茅場町",
  },

  {
    id: "H14",
    nameKo: "닌교초",
    nameJa: "人形町",
  },

  {
    id: "H15",
    nameKo: "고덴마초",
    nameJa: "小伝馬町",
  },

  {
    id: "H16",
    nameKo: "아키하바라",
    nameJa: "秋葉原",
  },

  {
    id: "H17",
    nameKo: "나카오카치마치",
    nameJa: "仲御徒町",
  },

  {
    id: "H18",
    nameKo: "우에노",
    nameJa: "上野",
  },

  {
    id: "H19",
    nameKo: "이리야",
    nameJa: "入谷",
  },

  {
    id: "H20",
    nameKo: "미노와",
    nameJa: "三ノ輪",
  },

  {
    id: "H21",
    nameKo: "미나미센주",
    nameJa: "南千住",
  },

  {
    id: "H22",
    nameKo: "기타센주",
    nameJa: "北千住",
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
   * H01 나카메구로
   */

  H01: [
    transfer("tokyu-toyoko", "TY", "도큐 도요코선", "東急東横線", "#DA0442"),
  ],

  /*
   * H02 에비스
   */

  H02: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer("saikyo", "JA", "사이쿄선", "埼京線", "#00AC9A"),

    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),
  ],

  /*
   * H04 롯폰기
   */

  H04: [transfer("oedo", "E", "도에이 오에도선", "都営大江戸線", "#CE045B")],

  /*
   * H06 도라노몬힐즈
   */

  H06: [transfer("ginza", "G", "긴자선", "銀座線", "#F39700")],

  /*
   * H07 가스미가세키
   */

  H07: [
    transfer("marunouchi", "M", "마루노우치선", "丸ノ内線", "#F62E36"),

    transfer("chiyoda", "C", "지요다선", "千代田線", "#00BB85"),
  ],

  /*
   * H08 히비야
   */

  H08: [
    transfer("chiyoda", "C", "지요다선", "千代田線", "#00BB85"),

    transfer("toei-mita", "I", "도에이 미타선", "都営三田線", "#0079C2"),

    transfer("yurakucho", "Y", "유라쿠초선", "有楽町線", "#C1A470"),
  ],

  /*
   * H09 긴자
   */

  H09: [
    transfer("ginza", "G", "긴자선", "銀座線", "#F39700"),

    transfer("marunouchi", "M", "마루노우치선", "丸ノ内線", "#F62E36"),
  ],

  /*
   * H10 히가시긴자
   */

  H10: [
    transfer("toei-asakusa", "A", "도에이 아사쿠사선", "都営浅草線", "#E85298"),
  ],

  /*
   * H12 핫초보리
   */

  H12: [transfer("keiyo", "JE", "게이요선", "京葉線", "#C9252F")],

  /*
   * H13 가야바초
   */

  H13: [transfer("tozai", "T", "도자이선", "東西線", "#009BBF")],

  /*
   * H14 닌교초
   */

  H14: [
    transfer("toei-asakusa", "A", "도에이 아사쿠사선", "都営浅草線", "#E85298"),

    transfer("hanzomon", "Z", "한조몬선", "半蔵門線", "#8F76D6"),
  ],

  /*
   * H16 아키하바라
   */

  H16: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer("chuo-sobu-local", "JB", "주오·소부선", "中央・総武線", "#FFD400"),

    transfer(
      "keihin-tohoku",
      "JK",
      "게이힌도호쿠·네기시선",
      "京浜東北・根岸線",
      "#00A7DB",
    ),

    transfer(
      "tsukuba-express",
      "TX",
      "쓰쿠바 익스프레스",
      "つくばエクスプレス",
      "#003399",
    ),
  ],

  /*
   * H17 나카오카치마치
   */

  H17: [
    transfer("oedo", "E", "도에이 오에도선", "都営大江戸線", "#CE045B"),

    transfer("ginza", "G", "긴자선", "銀座線", "#F39700"),
  ],

  /*
   * H18 우에노
   */

  H18: [
    transfer("ginza", "G", "긴자선", "銀座線", "#F39700"),

    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer(
      "keihin-tohoku",
      "JK",
      "게이힌도호쿠·네기시선",
      "京浜東北・根岸線",
      "#00A7DB",
    ),
  ],

  /*
   * H21 미나미센주
   */

  H21: [
    transfer("joban", "JJ", "조반선", "常磐線", "#00B261"),

    transfer(
      "tsukuba-express",
      "TX",
      "쓰쿠바 익스프레스",
      "つくばエクスプレス",
      "#003399",
    ),
  ],

  /*
   * H22 기타센주
   */

  H22: [
    transfer("chiyoda", "C", "지요다선", "千代田線", "#00BB85"),

    transfer("joban", "JJ", "조반선", "常磐線", "#00B261"),

    transfer(
      "tobu-skytree",
      "TS",
      "도부 스카이트리라인",
      "東武スカイツリーライン",
      "#0F6CC3",
    ),

    transfer(
      "tsukuba-express",
      "TX",
      "쓰쿠바 익스프레스",
      "つくばエクスプレス",
      "#003399",
    ),
  ],
};

/*
 * =========================================================
 * NextStation
 * =========================================================
 */

const createNextStation = (station: HibiyaStationBase) => {
  return {
    id: station.id,

    code: station.id,

    nameKo: station.nameKo,

    nameJa: station.nameJa,

    lineId: "hibiya",

    lineCode: "H",

    lineNameKo: "히비야선",

    color: HIBIYA_COLOR,
  };
};

/*
 * =========================================================
 * Station[]
 * =========================================================
 */

export const hibiyaStations: Station[] = HIBIYA_STATION_BASE.map(
  (station, index, stations) => {
    const isNakaMeguro = index === 0;

    const isKitaSenju = index === stations.length - 1;

    const nakaMeguroNext = index > 0 ? stations[index - 1] : undefined;

    const kitaSenjuNext =
      index < stations.length - 1 ? stations[index + 1] : undefined;

    /*
     * =====================================================
     * H01 나카메구로
     * =====================================================
     */

    if (isNakaMeguro && kitaSenjuNext) {
      return {
        id: station.id,

        operatorId: "tokyo-metro",

        lineId: "hibiya",

        lineCode: "H",

        lineNameKo: "히비야선",

        lineNameJa: "日比谷線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: HIBIYA_COLOR,

        type: "terminal",

        directions: [
          {
            id: "kitasenju",

            label: "기타센주 방면",

            description: "→ 긴자·우에노·기타센주 방면",

            nextStations: [createNextStation(kitaSenjuNext)],
          },
        ],

        transfers: TRANSFERS[station.id] ?? [],
      };
    }

    /*
     * =====================================================
     * H22 기타센주
     * =====================================================
     */

    if (isKitaSenju && nakaMeguroNext) {
      return {
        id: station.id,

        operatorId: "tokyo-metro",

        lineId: "hibiya",

        lineCode: "H",

        lineNameKo: "히비야선",

        lineNameJa: "日比谷線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: HIBIYA_COLOR,

        type: "terminal",

        directions: [
          {
            id: "nakameguro",

            label: "나카메구로 방면",

            description: "→ 우에노·긴자·나카메구로 방면",

            nextStations: [createNextStation(nakaMeguroNext)],
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

    if (!nakaMeguroNext || !kitaSenjuNext) {
      throw new Error(`히비야선 다음역 생성 실패: ${station.id}`);
    }

    return {
      id: station.id,

      operatorId: "tokyo-metro",

      lineId: "hibiya",

      lineCode: "H",

      lineNameKo: "히비야선",

      lineNameJa: "日比谷線",

      code: station.id,

      nameKo: station.nameKo,

      nameJa: station.nameJa,

      color: HIBIYA_COLOR,

      /*
       * 긴자선과 같은 방향 탭
       */

      type: "normal",

      directions: [
        /*
         * 나카메구로 방면
         */

        {
          id: "nakameguro",

          label: "나카메구로 방면",

          description: "→ 긴자·롯폰기·나카메구로 방면",

          nextStations: [createNextStation(nakaMeguroNext)],
        },

        /*
         * 기타센주 방면
         */

        {
          id: "kitasenju",

          label: "기타센주 방면",

          description: "→ 긴자·우에노·기타센주 방면",

          nextStations: [createNextStation(kitaSenjuNext)],
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
 */

export const hibiyaTrains: Record<string, Train[]> = {};
