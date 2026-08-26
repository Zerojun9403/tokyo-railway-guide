import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * JR 동일본 - 주오·소부선 각역정차
 * 中央・総武線各駅停車
 * =========================================================
 *
 * JB01 미타카
 * ↓
 * JB10 신주쿠
 * ↓
 * JB19 아키하바라
 * ↓
 * JB30 니시후나바시
 * ↓
 * JB39 지바
 *
 * eastbound
 * = 지바 방면
 *
 * westbound
 * = 미타카 방면
 * =========================================================
 */

export const CHUO_SOBU_LOCAL_COLOR = "#FFD400";

/*
 * =========================================================
 * 기본 역 타입
 * =========================================================
 */

type ChuoSobuLocalStationBase = {
  id: string;

  nameKo: string;

  nameJa: string;
};

/*
 * =========================================================
 * 기본 역
 * =========================================================
 */

const CHUO_SOBU_LOCAL_STATION_BASE: ChuoSobuLocalStationBase[] = [
  {
    id: "JB01",
    nameKo: "미타카",
    nameJa: "三鷹",
  },

  {
    id: "JB02",
    nameKo: "기치조지",
    nameJa: "吉祥寺",
  },

  {
    id: "JB03",
    nameKo: "니시오기쿠보",
    nameJa: "西荻窪",
  },

  {
    id: "JB04",
    nameKo: "오기쿠보",
    nameJa: "荻窪",
  },

  {
    id: "JB05",
    nameKo: "아사가야",
    nameJa: "阿佐ケ谷",
  },

  {
    id: "JB06",
    nameKo: "고엔지",
    nameJa: "高円寺",
  },

  {
    id: "JB07",
    nameKo: "나카노",
    nameJa: "中野",
  },

  {
    id: "JB08",
    nameKo: "히가시나카노",
    nameJa: "東中野",
  },

  {
    id: "JB09",
    nameKo: "오쿠보",
    nameJa: "大久保",
  },

  {
    id: "JB10",
    nameKo: "신주쿠",
    nameJa: "新宿",
  },

  {
    id: "JB11",
    nameKo: "요요기",
    nameJa: "代々木",
  },

  {
    id: "JB12",
    nameKo: "센다가야",
    nameJa: "千駄ケ谷",
  },

  {
    id: "JB13",
    nameKo: "시나노마치",
    nameJa: "信濃町",
  },

  {
    id: "JB14",
    nameKo: "요쓰야",
    nameJa: "四ツ谷",
  },

  {
    id: "JB15",
    nameKo: "이치가야",
    nameJa: "市ケ谷",
  },

  {
    id: "JB16",
    nameKo: "이다바시",
    nameJa: "飯田橋",
  },

  {
    id: "JB17",
    nameKo: "스이도바시",
    nameJa: "水道橋",
  },

  {
    id: "JB18",
    nameKo: "오차노미즈",
    nameJa: "御茶ノ水",
  },

  {
    id: "JB19",
    nameKo: "아키하바라",
    nameJa: "秋葉原",
  },

  {
    id: "JB20",
    nameKo: "아사쿠사바시",
    nameJa: "浅草橋",
  },

  {
    id: "JB21",
    nameKo: "료고쿠",
    nameJa: "両国",
  },

  {
    id: "JB22",
    nameKo: "긴시초",
    nameJa: "錦糸町",
  },

  {
    id: "JB23",
    nameKo: "가메이도",
    nameJa: "亀戸",
  },

  {
    id: "JB24",
    nameKo: "히라이",
    nameJa: "平井",
  },

  {
    id: "JB25",
    nameKo: "신코이와",
    nameJa: "新小岩",
  },

  {
    id: "JB26",
    nameKo: "고이와",
    nameJa: "小岩",
  },

  {
    id: "JB27",
    nameKo: "이치카와",
    nameJa: "市川",
  },

  {
    id: "JB28",
    nameKo: "모토야와타",
    nameJa: "本八幡",
  },

  {
    id: "JB29",
    nameKo: "시모사나카야마",
    nameJa: "下総中山",
  },

  {
    id: "JB30",
    nameKo: "니시후나바시",
    nameJa: "西船橋",
  },

  {
    id: "JB31",
    nameKo: "후나바시",
    nameJa: "船橋",
  },

  {
    id: "JB32",
    nameKo: "히가시후나바시",
    nameJa: "東船橋",
  },

  {
    id: "JB33",
    nameKo: "쓰다누마",
    nameJa: "津田沼",
  },

  {
    id: "JB34",
    nameKo: "마쿠하리혼고",
    nameJa: "幕張本郷",
  },

  {
    id: "JB35",
    nameKo: "마쿠하리",
    nameJa: "幕張",
  },

  {
    id: "JB36",
    nameKo: "신케미가와",
    nameJa: "新検見川",
  },

  {
    id: "JB37",
    nameKo: "이나게",
    nameJa: "稲毛",
  },

  {
    id: "JB38",
    nameKo: "니시치바",
    nameJa: "西千葉",
  },

  {
    id: "JB39",
    nameKo: "지바",
    nameJa: "千葉",
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
 * 환승 생성
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
 * 환승 정보
 * =========================================================
 *
 * 우선 주요 환승역 중심.
 *
 * 나중에 각 노선을 Registry에 추가하면서
 * 더 세밀하게 확장할 수 있다.
 * =========================================================
 */

const TRANSFERS: Record<string, Transfer[]> = {
  /*
   * JB01 미타카
   */

  JB01: [transfer("chuo-rapid", "JC", "주오선 쾌속", "中央線快速", "#F15A22")],

  /*
   * JB02 기치조지
   */

  JB02: [
    transfer("chuo-rapid", "JC", "주오선 쾌속", "中央線快速", "#F15A22"),

    transfer(
      "keio-inokashira",
      "IN",
      "게이오 이노카시라선",
      "京王井の頭線",
      "#000088",
    ),
  ],

  /*
   * JB03 니시오기쿠보
   */

  JB03: [transfer("chuo-rapid", "JC", "주오선 쾌속", "中央線快速", "#F15A22")],

  /*
   * JB04 오기쿠보
   */

  JB04: [
    transfer("chuo-rapid", "JC", "주오선 쾌속", "中央線快速", "#F15A22"),

    transfer(
      "marunouchi",
      "M",
      "도쿄메트로 마루노우치선",
      "東京メトロ丸ノ内線",
      "#F62E36",
    ),
  ],

  /*
   * JB05 아사가야
   */

  JB05: [transfer("chuo-rapid", "JC", "주오선 쾌속", "中央線快速", "#F15A22")],

  /*
   * JB06 고엔지
   */

  JB06: [transfer("chuo-rapid", "JC", "주오선 쾌속", "中央線快速", "#F15A22")],

  /*
   * JB07 나카노
   */

  JB07: [
    transfer("chuo-rapid", "JC", "주오선 쾌속", "中央線快速", "#F15A22"),

    transfer(
      "tozai",
      "T",
      "도쿄메트로 도자이선",
      "東京メトロ東西線",
      "#009BBF",
    ),
  ],

  /*
   * JB10 신주쿠
   */

  JB10: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer("chuo-rapid", "JC", "주오선 쾌속", "中央線快速", "#F15A22"),

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
  ],

  /*
   * JB11 요요기
   */

  JB11: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer("oedo", "E", "도에이 오에도선", "都営大江戸線", "#CE045B"),
  ],

  /*
   * JB14 요쓰야
   */

  JB14: [
    transfer("chuo-rapid", "JC", "주오선 쾌속", "中央線快速", "#F15A22"),

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
   * JB15 이치가야
   */

  JB15: [
    transfer(
      "yurakucho",
      "Y",
      "도쿄메트로 유라쿠초선",
      "東京メトロ有楽町線",
      "#C1A470",
    ),

    transfer(
      "namboku",
      "N",
      "도쿄메트로 난보쿠선",
      "東京メトロ南北線",
      "#00AC9B",
    ),

    transfer("shinjuku", "S", "도에이 신주쿠선", "都営新宿線", "#6CBB5A"),
  ],

  /*
   * JB16 이다바시
   */

  JB16: [
    transfer(
      "tozai",
      "T",
      "도쿄메트로 도자이선",
      "東京メトロ東西線",
      "#009BBF",
    ),

    transfer(
      "yurakucho",
      "Y",
      "도쿄메트로 유라쿠초선",
      "東京メトロ有楽町線",
      "#C1A470",
    ),

    transfer(
      "namboku",
      "N",
      "도쿄메트로 난보쿠선",
      "東京メトロ南北線",
      "#00AC9B",
    ),

    transfer("oedo", "E", "도에이 오에도선", "都営大江戸線", "#CE045B"),
  ],

  /*
   * JB18 오차노미즈
   */

  JB18: [
    transfer("chuo-rapid", "JC", "주오선 쾌속", "中央線快速", "#F15A22"),

    transfer(
      "marunouchi",
      "M",
      "도쿄메트로 마루노우치선",
      "東京メトロ丸ノ内線",
      "#F62E36",
    ),
  ],

  /*
   * JB19 아키하바라
   */

  JB19: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer("keihin-tohoku", "JK", "게이힌도호쿠선", "京浜東北線", "#00A7DB"),

    transfer(
      "hibiya",
      "H",
      "도쿄메트로 히비야선",
      "東京メトロ日比谷線",
      "#B5B5AC",
    ),

    transfer(
      "tsukuba-express",
      "TX",
      "쓰쿠바 익스프레스",
      "つくばエクスプレス",
      "#000084",
    ),
  ],

  /*
   * JB20 아사쿠사바시
   */

  JB20: [
    transfer("asakusa", "A", "도에이 아사쿠사선", "都営浅草線", "#E85298"),
  ],

  /*
   * JB21 료고쿠
   */

  JB21: [transfer("oedo", "E", "도에이 오에도선", "都営大江戸線", "#CE045B")],

  /*
   * JB22 긴시초
   */

  JB22: [
    transfer(
      "yokosuka-sobu-rapid",
      "JO",
      "소부 쾌속선",
      "総武快速線",
      "#1069B4",
    ),

    transfer(
      "hanzomon",
      "Z",
      "도쿄메트로 한조몬선",
      "東京メトロ半蔵門線",
      "#8F76D6",
    ),
  ],

  /*
   * JB25 신코이와
   */

  JB25: [
    transfer(
      "yokosuka-sobu-rapid",
      "JO",
      "소부 쾌속선",
      "総武快速線",
      "#1069B4",
    ),
  ],

  /*
   * JB27 이치카와
   */

  JB27: [
    transfer(
      "yokosuka-sobu-rapid",
      "JO",
      "소부 쾌속선",
      "総武快速線",
      "#1069B4",
    ),
  ],

  /*
   * JB28 모토야와타
   */

  JB28: [
    transfer("shinjuku", "S", "도에이 신주쿠선", "都営新宿線", "#6CBB5A"),
  ],

  /*
   * JB30 니시후나바시
   */

  JB30: [
    transfer("musashino", "JM", "무사시노선", "武蔵野線", "#F15A22"),

    transfer("keiyo", "JE", "게이요선", "京葉線", "#C9242F"),

    transfer(
      "tozai",
      "T",
      "도쿄메트로 도자이선",
      "東京メトロ東西線",
      "#009BBF",
    ),

    transfer("toyo-rapid", "TR", "도요 고속선", "東葉高速線", "#3FB4E5"),
  ],

  /*
   * JB31 후나바시
   */

  JB31: [
    transfer(
      "yokosuka-sobu-rapid",
      "JO",
      "소부 쾌속선",
      "総武快速線",
      "#1069B4",
    ),

    transfer(
      "tobu-urban-park",
      "TD",
      "도부 어번파크라인",
      "東武アーバンパークライン",
      "#00A0DE",
    ),
  ],

  /*
   * JB33 쓰다누마
   */

  JB33: [
    transfer(
      "yokosuka-sobu-rapid",
      "JO",
      "소부 쾌속선",
      "総武快速線",
      "#1069B4",
    ),
  ],

  /*
   * JB37 이나게
   */

  JB37: [
    transfer(
      "yokosuka-sobu-rapid",
      "JO",
      "소부 쾌속선",
      "総武快速線",
      "#1069B4",
    ),
  ],

  /*
   * JB39 지바
   */

  JB39: [
    transfer(
      "yokosuka-sobu-rapid",
      "JO",
      "소부 쾌속선",
      "総武快速線",
      "#1069B4",
    ),

    transfer("sotobo", "외房", "소토보선", "外房線", "#E31F26"),

    transfer("uchibo", "内房", "우치보선", "内房線", "#00A7DB"),

    transfer("narita", "JO", "나리타선", "成田線", "#00A7DB"),
  ],
};

/*
 * =========================================================
 * NextStation 생성
 * =========================================================
 */

const createNextStation = (station: ChuoSobuLocalStationBase) => {
  return {
    id: station.id,

    code: station.id,

    nameKo: station.nameKo,

    nameJa: station.nameJa,

    lineId: "chuo-sobu-local",

    lineCode: "JB",

    lineNameKo: "주오·소부선 각역정차",

    color: CHUO_SOBU_LOCAL_COLOR,
  };
};

/*
 * =========================================================
 * Station[] 자동 생성
 * =========================================================
 *
 * 역 배열:
 *
 * 미타카
 * ↓
 * 지바
 *
 *
 * eastbound:
 *
 * index + 1
 * = 지바 방면
 *
 *
 * westbound:
 *
 * index - 1
 * = 미타카 방면
 * =========================================================
 */

export const chuoSobuLocalStations: Station[] =
  CHUO_SOBU_LOCAL_STATION_BASE.map((station, index, stations) => {
    const isMitaka = index === 0;

    const isChiba = index === stations.length - 1;

    const westNext = index > 0 ? stations[index - 1] : undefined;

    const eastNext =
      index < stations.length - 1 ? stations[index + 1] : undefined;

    /*
     * =====================================================
     * JB01 미타카
     *
     * 지바 방면만
     * =====================================================
     */

    if (isMitaka && eastNext) {
      return {
        id: station.id,

        operatorId: "jr-east",

        lineId: "chuo-sobu-local",

        lineCode: "JB",

        lineNameKo: "주오·소부선 각역정차",

        lineNameJa: "中央・総武線各駅停車",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: CHUO_SOBU_LOCAL_COLOR,

        type: "terminal",

        directions: [
          {
            id: "eastbound",

            label: "지바 방면",

            description: "→ 신주쿠·아키하바라·지바 방면",

            nextStations: [createNextStation(eastNext)],
          },
        ],

        transfers: TRANSFERS[station.id] ?? [],
      };
    }

    /*
     * =====================================================
     * JB39 지바
     *
     * 미타카 방면만
     * =====================================================
     */

    if (isChiba && westNext) {
      return {
        id: station.id,

        operatorId: "jr-east",

        lineId: "chuo-sobu-local",

        lineCode: "JB",

        lineNameKo: "주오·소부선 각역정차",

        lineNameJa: "中央・総武線各駅停車",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: CHUO_SOBU_LOCAL_COLOR,

        type: "terminal",

        directions: [
          {
            id: "westbound",

            label: "미타카 방면",

            description: "→ 아키하바라·신주쿠·미타카 방면",

            nextStations: [createNextStation(westNext)],
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

    if (!westNext || !eastNext) {
      throw new Error(`주오·소부선 다음역 생성 실패: ${station.id}`);
    }

    return {
      id: station.id,

      operatorId: "jr-east",

      lineId: "chuo-sobu-local",

      lineCode: "JB",

      lineNameKo: "주오·소부선 각역정차",

      lineNameJa: "中央・総武線各駅停車",

      code: station.id,

      nameKo: station.nameKo,

      nameJa: station.nameJa,

      color: CHUO_SOBU_LOCAL_COLOR,

      type: "normal",

      directions: [
        /*
         * ===============================================
         * 지바 방면
         * ===============================================
         */

        {
          id: "eastbound",

          label: "지바 방면",

          description: "→ 지바 방면",

          nextStations: [createNextStation(eastNext)],
        },

        /*
         * ===============================================
         * 미타카 방면
         * ===============================================
         */

        {
          id: "westbound",

          label: "미타카 방면",

          description: "→ 미타카 방면",

          nextStations: [createNextStation(westNext)],
        },
      ],

      transfers: TRANSFERS[station.id] ?? [],
    };
  });

/*
 * =========================================================
 * Registry fallback
 * =========================================================
 *
 * 실제 열차는 JR API를 사용한다.
 * =========================================================
 */

export const chuoSobuLocalTrains: Record<string, Train[]> = {};

