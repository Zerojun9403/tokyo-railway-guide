import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * JR 동일본 - 게이힌도호쿠·네기시선
 * 京浜東北・根岸線
 * =========================================================
 *
 * JK47 오미야
 * ↓
 * JK30 우에노
 * ↓
 * JK26 도쿄
 * ↓
 * JK20 시나가와
 * ↓
 * JK12 요코하마
 * ↓
 * JK01 오후나
 *
 *
 * southbound
 * = 요코하마 · 오후나 방면
 *
 * northbound
 * = 우에노 · 아카바네 · 오미야 방면
 *
 * =========================================================
 */

export const KEIHIN_TOHOKU_COLOR = "#00A7DB";

/*
 * =========================================================
 * 기본 역 타입
 * =========================================================
 */

type KeihinTohokuStationBase = {
  id: string;

  nameKo: string;

  nameJa: string;
};

/*
 * =========================================================
 * 역 목록
 * =========================================================
 *
 * 배열은 북쪽 → 남쪽
 *
 * JK47 오미야
 * ↓
 * JK01 오후나
 *
 * 순서로 작성한다.
 * =========================================================
 */

const KEIHIN_TOHOKU_STATION_BASE: KeihinTohokuStationBase[] = [
  {
    id: "JK47",
    nameKo: "오미야",
    nameJa: "大宮",
  },

  {
    id: "JK46",
    nameKo: "사이타마신토신",
    nameJa: "さいたま新都心",
  },

  {
    id: "JK45",
    nameKo: "요노",
    nameJa: "与野",
  },

  {
    id: "JK44",
    nameKo: "기타우라와",
    nameJa: "北浦和",
  },

  {
    id: "JK43",
    nameKo: "우라와",
    nameJa: "浦和",
  },

  {
    id: "JK42",
    nameKo: "미나미우라와",
    nameJa: "南浦和",
  },

  {
    id: "JK41",
    nameKo: "와라비",
    nameJa: "蕨",
  },

  {
    id: "JK40",
    nameKo: "니시카와구치",
    nameJa: "西川口",
  },

  {
    id: "JK39",
    nameKo: "가와구치",
    nameJa: "川口",
  },

  {
    id: "JK38",
    nameKo: "아카바네",
    nameJa: "赤羽",
  },

  {
    id: "JK37",
    nameKo: "히가시주조",
    nameJa: "東十条",
  },

  {
    id: "JK36",
    nameKo: "오지",
    nameJa: "王子",
  },

  {
    id: "JK35",
    nameKo: "가미나카자토",
    nameJa: "上中里",
  },

  {
    id: "JK34",
    nameKo: "다바타",
    nameJa: "田端",
  },

  {
    id: "JK33",
    nameKo: "니시닛포리",
    nameJa: "西日暮里",
  },

  {
    id: "JK32",
    nameKo: "닛포리",
    nameJa: "日暮里",
  },

  {
    id: "JK31",
    nameKo: "우구이스다니",
    nameJa: "鶯谷",
  },

  {
    id: "JK30",
    nameKo: "우에노",
    nameJa: "上野",
  },

  {
    id: "JK29",
    nameKo: "오카치마치",
    nameJa: "御徒町",
  },

  {
    id: "JK28",
    nameKo: "아키하바라",
    nameJa: "秋葉原",
  },

  {
    id: "JK27",
    nameKo: "간다",
    nameJa: "神田",
  },

  {
    id: "JK26",
    nameKo: "도쿄",
    nameJa: "東京",
  },

  {
    id: "JK25",
    nameKo: "유라쿠초",
    nameJa: "有楽町",
  },

  {
    id: "JK24",
    nameKo: "신바시",
    nameJa: "新橋",
  },

  {
    id: "JK23",
    nameKo: "하마마쓰초",
    nameJa: "浜松町",
  },

  {
    id: "JK22",
    nameKo: "다마치",
    nameJa: "田町",
  },

  {
    id: "JK21",
    nameKo: "다카나와 게이트웨이",
    nameJa: "高輪ゲートウェイ",
  },

  {
    id: "JK20",
    nameKo: "시나가와",
    nameJa: "品川",
  },

  {
    id: "JK19",
    nameKo: "오이마치",
    nameJa: "大井町",
  },

  {
    id: "JK18",
    nameKo: "오모리",
    nameJa: "大森",
  },

  {
    id: "JK17",
    nameKo: "가마타",
    nameJa: "蒲田",
  },

  {
    id: "JK16",
    nameKo: "가와사키",
    nameJa: "川崎",
  },

  {
    id: "JK15",
    nameKo: "쓰루미",
    nameJa: "鶴見",
  },

  {
    id: "JK14",
    nameKo: "신코야스",
    nameJa: "新子安",
  },

  {
    id: "JK13",
    nameKo: "히가시카나가와",
    nameJa: "東神奈川",
  },

  {
    id: "JK12",
    nameKo: "요코하마",
    nameJa: "横浜",
  },

  {
    id: "JK11",
    nameKo: "사쿠라기초",
    nameJa: "桜木町",
  },

  {
    id: "JK10",
    nameKo: "간나이",
    nameJa: "関内",
  },

  {
    id: "JK09",
    nameKo: "이시카와초",
    nameJa: "石川町",
  },

  {
    id: "JK08",
    nameKo: "야마테",
    nameJa: "山手",
  },

  {
    id: "JK07",
    nameKo: "네기시",
    nameJa: "根岸",
  },

  {
    id: "JK06",
    nameKo: "이소고",
    nameJa: "磯子",
  },

  {
    id: "JK05",
    nameKo: "신스기타",
    nameJa: "新杉田",
  },

  {
    id: "JK04",
    nameKo: "요코다이",
    nameJa: "洋光台",
  },

  {
    id: "JK03",
    nameKo: "고난다이",
    nameJa: "港南台",
  },

  {
    id: "JK02",
    nameKo: "혼고다이",
    nameJa: "本郷台",
  },

  {
    id: "JK01",
    nameKo: "오후나",
    nameJa: "大船",
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
 *
 * 모든 환승을 한 번에 완벽하게 넣기보다는
 * 현재 앱에서 중요도가 높은 JR / Metro / Toei /
 * 주요 사철 중심으로 구성한다.
 * =========================================================
 */

const TRANSFERS: Record<string, Transfer[]> = {
  /*
   * =======================================================
   * JK47 오미야
   * =======================================================
   */

  JK47: [
    transfer("saikyo", "JA", "사이쿄선", "埼京線", "#00AC9A"),

    transfer(
      "ueno-tokyo",
      "JU",
      "우쓰노미야·다카사키선",
      "宇都宮・高崎線",
      "#7A3E98",
    ),

    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),

    transfer("kawagoe", "川越", "가와고에선", "川越線", "#00AC9A"),
  ],

  /*
   * JK46 사이타마신토신
   */

  JK46: [
    transfer(
      "ueno-tokyo",
      "JU",
      "우쓰노미야·다카사키선",
      "宇都宮・高崎線",
      "#7A3E98",
    ),
  ],

  /*
   * JK43 우라와
   */

  JK43: [
    transfer(
      "ueno-tokyo",
      "JU",
      "우쓰노미야·다카사키선",
      "宇都宮・高崎線",
      "#7A3E98",
    ),

    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),
  ],

  /*
   * JK42 미나미우라와
   */

  JK42: [transfer("musashino", "JM", "무사시노선", "武蔵野線", "#F15A22")],

  /*
   * JK38 아카바네
   */

  JK38: [
    transfer("saikyo", "JA", "사이쿄선", "埼京線", "#00AC9A"),

    transfer(
      "ueno-tokyo",
      "JU",
      "우쓰노미야·다카사키선",
      "宇都宮・高崎線",
      "#7A3E98",
    ),

    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),
  ],

  /*
   * JK36 오지
   */

  JK36: [
    transfer(
      "namboku",
      "N",
      "도쿄메트로 난보쿠선",
      "東京メトロ南北線",
      "#00AC9B",
    ),
  ],

  /*
   * JK34 다바타
   */

  JK34: [transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C")],

  /*
   * JK33 니시닛포리
   */

  JK33: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer(
      "chiyoda",
      "C",
      "도쿄메트로 지요다선",
      "東京メトロ千代田線",
      "#00BB85",
    ),
  ],

  /*
   * JK32 닛포리
   */

  JK32: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer("keisei-main", "KS", "게이세이 본선", "京成本線", "#005AAA"),
  ],

  /*
   * JK31 우구이스다니
   */

  JK31: [transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C")],

  /*
   * JK30 우에노
   */

  JK30: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer("ginza", "G", "도쿄메트로 긴자선", "東京メトロ銀座線", "#F39700"),

    transfer(
      "hibiya",
      "H",
      "도쿄메트로 히비야선",
      "東京メトロ日比谷線",
      "#B5B5AC",
    ),
  ],

  /*
   * JK29 오카치마치
   */

  JK29: [transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C")],

  /*
   * JK28 아키하바라
   */

  JK28: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부선 각역정차",
      "中央・総武線各駅停車",
      "#FFD400",
    ),

    transfer(
      "hibiya",
      "H",
      "도쿄메트로 히비야선",
      "東京メトロ日比谷線",
      "#B5B5AC",
    ),
  ],

  /*
   * JK27 간다
   */

  JK27: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer("chuo-rapid", "JC", "주오선 쾌속", "中央線快速", "#F15A22"),

    transfer("ginza", "G", "도쿄메트로 긴자선", "東京メトロ銀座線", "#F39700"),
  ],

  /*
   * JK26 도쿄
   */

  JK26: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer("chuo-rapid", "JC", "주오선 쾌속", "中央線快速", "#F15A22"),

    transfer("tokaido", "JT", "도카이도선", "東海道線", "#F68B1E"),

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
   * JK25 유라쿠초
   */

  JK25: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer(
      "yurakucho",
      "Y",
      "도쿄메트로 유라쿠초선",
      "東京メトロ有楽町線",
      "#C1A470",
    ),
  ],

  /*
   * JK24 신바시
   */

  JK24: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer("tokaido", "JT", "도카이도선", "東海道線", "#F68B1E"),

    transfer("ginza", "G", "도쿄메트로 긴자선", "東京メトロ銀座線", "#F39700"),

    transfer("toei-asakusa", "A", "도에이 아사쿠사선", "都営浅草線", "#E85298"),
  ],

  /*
   * JK23 하마마쓰초
   */

  JK23: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer(
      "tokyo-monorail",
      "MO",
      "도쿄 모노레일",
      "東京モノレール",
      "#0072BC",
    ),

    transfer("oedo", "E", "도에이 오에도선", "都営大江戸線", "#CE045B"),
  ],

  /*
   * JK22 다마치
   */

  JK22: [transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C")],

  /*
   * JK21 다카나와 게이트웨이
   */

  JK21: [transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C")],

  /*
   * JK20 시나가와
   */

  JK20: [
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer("tokaido", "JT", "도카이도선", "東海道線", "#F68B1E"),

    transfer("yokosuka", "JO", "요코스카선", "横須賀線", "#1069B4"),

    transfer("keikyu", "KK", "게이큐 본선", "京急本線", "#00A5DE"),
  ],

  /*
   * JK19 오이마치
   */

  JK19: [
    transfer(
      "tokyu-oimachi",
      "OM",
      "도큐 오이마치선",
      "東急大井町線",
      "#F18C43",
    ),
  ],

  /*
   * JK16 가와사키
   */

  JK16: [
    transfer("tokaido", "JT", "도카이도선", "東海道線", "#F68B1E"),

    transfer("nambu", "JN", "난부선", "南武線", "#FFD400"),
  ],

  /*
   * JK15 쓰루미
   */

  JK15: [transfer("tsurumi", "JI", "쓰루미선", "鶴見線", "#FFD400")],

  /*
   * JK13 히가시카나가와
   */

  JK13: [transfer("yokohama", "JH", "요코하마선", "横浜線", "#9ACD32")],

  /*
   * JK12 요코하마
   */

  JK12: [
    transfer("tokaido", "JT", "도카이도선", "東海道線", "#F68B1E"),

    transfer("yokosuka", "JO", "요코스카선", "横須賀線", "#1069B4"),

    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),

    transfer("tokyu-toyoko", "TY", "도큐 도요코선", "東急東横線", "#DA0442"),

    transfer("keikyu", "KK", "게이큐 본선", "京急本線", "#00A5DE"),
  ],

  /*
   * JK11 사쿠라기초
   */

  JK11: [transfer("yokohama", "JH", "요코하마선", "横浜線", "#9ACD32")],

  /*
   * JK05 신스기타
   */

  JK05: [
    transfer("seaside", "金沢", "시사이드라인", "シーサイドライン", "#00AEEF"),
  ],

  /*
   * JK01 오후나
   */

  JK01: [
    transfer("tokaido", "JT", "도카이도선", "東海道線", "#F68B1E"),

    transfer("yokosuka", "JO", "요코스카선", "横須賀線", "#1069B4"),

    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),
  ],
};

/*
 * =========================================================
 * NextStation 생성
 * =========================================================
 */

const createNextStation = (station: KeihinTohokuStationBase) => {
  return {
    id: station.id,

    code: station.id,

    nameKo: station.nameKo,

    nameJa: station.nameJa,

    lineId: "keihin-tohoku",

    lineCode: "JK",

    lineNameKo: "게이힌도호쿠·네기시선",

    color: KEIHIN_TOHOKU_COLOR,
  };
};

/*
 * =========================================================
 * Station[] 자동 생성
 * =========================================================
 *
 * 배열:
 *
 * JK47 오미야
 * ↓
 * JK01 오후나
 *
 *
 * southbound
 * = index + 1
 * = 도쿄 · 요코하마 · 오후나 방면
 *
 *
 * northbound
 * = index - 1
 * = 도쿄 · 우에노 · 오미야 방면
 * =========================================================
 */

export const keihinTohokuStations: Station[] = KEIHIN_TOHOKU_STATION_BASE.map(
  (station, index, stations) => {
    const isOmiya = index === 0;

    const isOfuna = index === stations.length - 1;

    const northNext = index > 0 ? stations[index - 1] : undefined;

    const southNext =
      index < stations.length - 1 ? stations[index + 1] : undefined;

    /*
     * =====================================================
     * JK47 오미야
     *
     * 남행만
     * =====================================================
     */

    if (isOmiya && southNext) {
      return {
        id: station.id,

        operatorId: "jr-east",

        lineId: "keihin-tohoku",

        lineCode: "JK",

        lineNameKo: "게이힌도호쿠·네기시선",

        lineNameJa: "京浜東北・根岸線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: KEIHIN_TOHOKU_COLOR,

        type: "terminal",

        directions: [
          {
            id: "southbound",

            label: "요코하마·오후나 방면",

            description: "→ 우에노·도쿄·요코하마·오후나 방면",

            nextStations: [createNextStation(southNext)],
          },
        ],

        transfers: TRANSFERS[station.id] ?? [],
      };
    }

    /*
     * =====================================================
     * JK01 오후나
     *
     * 북행만
     * =====================================================
     */

    if (isOfuna && northNext) {
      return {
        id: station.id,

        operatorId: "jr-east",

        lineId: "keihin-tohoku",

        lineCode: "JK",

        lineNameKo: "게이힌도호쿠·네기시선",

        lineNameJa: "京浜東北・根岸線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: KEIHIN_TOHOKU_COLOR,

        type: "terminal",

        directions: [
          {
            id: "northbound",

            label: "도쿄·오미야 방면",

            description: "→ 요코하마·도쿄·우에노·오미야 방면",

            nextStations: [createNextStation(northNext)],
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

    if (!northNext || !southNext) {
      throw new Error(`게이힌도호쿠선 다음역 생성 실패: ${station.id}`);
    }

    return {
      id: station.id,

      operatorId: "jr-east",

      lineId: "keihin-tohoku",

      lineCode: "JK",

      lineNameKo: "게이힌도호쿠·네기시선",

      lineNameJa: "京浜東北・根岸線",

      code: station.id,

      nameKo: station.nameKo,

      nameJa: station.nameJa,

      color: KEIHIN_TOHOKU_COLOR,

      type: "normal",

      directions: [
        /*
         * ===============================================
         * 남행
         * ===============================================
         */

        {
          id: "southbound",

          label: "요코하마·오후나 방면",

          description: "→ 도쿄·시나가와·요코하마·오후나 방면",

          nextStations: [createNextStation(southNext)],
        },

        /*
         * ===============================================
         * 북행
         * ===============================================
         */

        {
          id: "northbound",

          label: "우에노·오미야 방면",

          description: "→ 도쿄·우에노·아카바네·오미야 방면",

          nextStations: [createNextStation(northNext)],
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
 * 실제 열차 시간표는 JR API를 사용한다.
 *
 * 따라서 더미 데이터는 넣지 않는다.
 * =========================================================
 */

export const keihinTohokuTrains: Record<string, Train[]> = {};

