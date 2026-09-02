import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

export const YAMANOTE_COLOR = "#80C41C";

/*
 * =========================================================
 * 야마노테선
 * JY01 ~ JY30
 * =========================================================
 *
 * inner = 내선순환
 *
 * 도쿄
 * → 간다
 * → 아키하바라
 * → 우에노
 * → 이케부쿠로
 * → 신주쿠
 * → 시부야
 * → 시나가와
 * → 도쿄
 *
 *
 * outer = 외선순환
 *
 * 위 방향의 반대
 *
 * =========================================================
 */

/*
 * =========================================================
 * 기본 역 정보
 * =========================================================
 */

type YamanoteStationBase = {
  id: string;

  nameKo: string;
  nameJa: string;
};

const YAMANOTE_STATION_BASE: YamanoteStationBase[] = [
  {
    id: "JY01",
    nameKo: "도쿄",
    nameJa: "東京",
  },

  {
    id: "JY02",
    nameKo: "간다",
    nameJa: "神田",
  },

  {
    id: "JY03",
    nameKo: "아키하바라",
    nameJa: "秋葉原",
  },

  {
    id: "JY04",
    nameKo: "오카치마치",
    nameJa: "御徒町",
  },

  {
    id: "JY05",
    nameKo: "우에노",
    nameJa: "上野",
  },

  {
    id: "JY06",
    nameKo: "우구이스다니",
    nameJa: "鶯谷",
  },

  {
    id: "JY07",
    nameKo: "닛포리",
    nameJa: "日暮里",
  },

  {
    id: "JY08",
    nameKo: "니시닛포리",
    nameJa: "西日暮里",
  },

  {
    id: "JY09",
    nameKo: "다바타",
    nameJa: "田端",
  },

  {
    id: "JY10",
    nameKo: "고마고메",
    nameJa: "駒込",
  },

  {
    id: "JY11",
    nameKo: "스가모",
    nameJa: "巣鴨",
  },

  {
    id: "JY12",
    nameKo: "오쓰카",
    nameJa: "大塚",
  },

  {
    id: "JY13",
    nameKo: "이케부쿠로",
    nameJa: "池袋",
  },

  {
    id: "JY14",
    nameKo: "메지로",
    nameJa: "目白",
  },

  {
    id: "JY15",
    nameKo: "다카다노바바",
    nameJa: "高田馬場",
  },

  {
    id: "JY16",
    nameKo: "신오쿠보",
    nameJa: "新大久保",
  },

  {
    id: "JY17",
    nameKo: "신주쿠",
    nameJa: "新宿",
  },

  {
    id: "JY18",
    nameKo: "요요기",
    nameJa: "代々木",
  },

  {
    id: "JY19",
    nameKo: "하라주쿠",
    nameJa: "原宿",
  },

  {
    id: "JY20",
    nameKo: "시부야",
    nameJa: "渋谷",
  },

  {
    id: "JY21",
    nameKo: "에비스",
    nameJa: "恵比寿",
  },

  {
    id: "JY22",
    nameKo: "메구로",
    nameJa: "目黒",
  },

  {
    id: "JY23",
    nameKo: "고탄다",
    nameJa: "五反田",
  },

  {
    id: "JY24",
    nameKo: "오사키",
    nameJa: "大崎",
  },

  {
    id: "JY25",
    nameKo: "시나가와",
    nameJa: "品川",
  },

  {
    id: "JY26",
    nameKo: "다카나와 게이트웨이",
    nameJa: "高輪ゲートウェイ",
  },

  {
    id: "JY27",
    nameKo: "다마치",
    nameJa: "田町",
  },

  {
    id: "JY28",
    nameKo: "하마마쓰초",
    nameJa: "浜松町",
  },

  {
    id: "JY29",
    nameKo: "신바시",
    nameJa: "新橋",
  },

  {
    id: "JY30",
    nameKo: "유라쿠초",
    nameJa: "有楽町",
  },
];

/*
 * =========================================================
 * NextStation 생성
 * =========================================================
 */

const createNextStation = (station: YamanoteStationBase) => {
  return {
    id: station.id,

    code: station.id,

    nameKo: station.nameKo,
    nameJa: station.nameJa,

    lineId: "yamanote",
    lineCode: "JY",

    lineNameKo: "야마노테선",

    color: YAMANOTE_COLOR,
  };
};

/*
 * =========================================================
 * 환승 데이터
 * =========================================================
 *
 * 지금은 기존에 테스트했던 역과
 * 확실하게 필요한 대표 역 중심으로 유지한다.
 *
 * 이후 JR / Metro / Toei 노선을
 * Registry에 추가하면서 전체 환승 데이터를
 * 별도 파일로 분리하는 것이 좋다.
 *
 * =========================================================
 */

const TRANSFERS: Record<string, NonNullable<Station["transfers"]>> = {
  /*
   * JY01 도쿄
   */

  JY01: [
    {
      id: "chuo-rapid",

      code: "JC",

      nameKo: "주오선 쾌속",
      nameJa: "中央線快速",

      color: "#F15A22",
    },

    {
      id: "keihin-tohoku",

      code: "JK",

      nameKo: "게이힌도호쿠선",
      nameJa: "京浜東北線",

      color: "#00A7DB",
    },

    {
      id: "tokaido",

      code: "JT",

      nameKo: "도카이도선",
      nameJa: "東海道線",

      color: "#F68B1E",
    },

    {
      id: "ueno-tokyo",

      code: "JU",

      nameKo: "우에노도쿄라인",
      nameJa: "上野東京ライン",

      color: "#7A3E98",
    },
  ],

  /*
   * JY02 간다
   */

  JY02: [
    {
      id: "chuo-rapid",

      code: "JC",

      nameKo: "주오선 쾌속",
      nameJa: "中央線快速",

      color: "#F15A22",
    },

    {
      id: "keihin-tohoku",

      code: "JK",

      nameKo: "게이힌도호쿠선",
      nameJa: "京浜東北線",

      color: "#00A7DB",
    },

    {
      id: "ginza",

      code: "G",

      nameKo: "도쿄메트로 긴자선",
      nameJa: "東京メトロ銀座線",

      color: "#F39700",
    },
  ],

  /*
   * JY03 아키하바라
   */

  JY03: [
    {
      id: "keihin-tohoku",

      code: "JK",

      nameKo: "게이힌도호쿠선",
      nameJa: "京浜東北線",

      color: "#00A7DB",
    },

    {
      id: "chuo-sobu-local",

      code: "JB",

      nameKo: "주오·소부선",
      nameJa: "中央・総武線",

      color: "#FFD400",
    },

    {
      id: "hibiya",

      code: "H",

      nameKo: "도쿄메트로 히비야선",
      nameJa: "東京メトロ日比谷線",

      color: "#B5B5AC",
    },
  ],

  /*
   * JY05 우에노
   */

  JY05: [
    {
      id: "keihin-tohoku",

      code: "JK",

      nameKo: "게이힌도호쿠선",
      nameJa: "京浜東北線",

      color: "#00A7DB",
    },

    {
      id: "ginza",

      code: "G",

      nameKo: "도쿄메트로 긴자선",
      nameJa: "東京メトロ銀座線",

      color: "#F39700",
    },

    {
      id: "hibiya",

      code: "H",

      nameKo: "도쿄메트로 히비야선",
      nameJa: "東京メトロ日比谷線",

      color: "#B5B5AC",
    },
  ],

  /*
   * JY07 닛포리
   */

  JY07: [
    {
      id: "keihin-tohoku",

      code: "JK",

      nameKo: "게이힌도호쿠선",
      nameJa: "京浜東北線",

      color: "#00A7DB",
    },

    {
      id: "keisei-main",

      code: "KS",

      nameKo: "게이세이 본선",
      nameJa: "京成本線",

      color: "#005AAA",
    },
  ],

  /*
   * JY08 니시닛포리
   */

  JY08: [
    {
      id: "keihin-tohoku",

      code: "JK",

      nameKo: "게이힌도호쿠선",
      nameJa: "京浜東北線",

      color: "#00A7DB",
    },

    {
      id: "chiyoda",

      code: "C",

      nameKo: "도쿄메트로 지요다선",
      nameJa: "東京メトロ千代田線",

      color: "#00BB85",
    },
  ],

  /*
   * JY13 이케부쿠로
   */

  JY13: [
    {
      id: "saikyo",

      code: "JA",

      nameKo: "사이쿄선",
      nameJa: "埼京線",

      color: "#00AC9A",
    },

    {
      id: "marunouchi",

      code: "M",

      nameKo: "도쿄메트로 마루노우치선",
      nameJa: "東京メトロ丸ノ内線",

      color: "#F62E36",
    },

    {
      id: "yurakucho",

      code: "Y",

      nameKo: "도쿄메트로 유라쿠초선",
      nameJa: "東京メトロ有楽町線",

      color: "#C1A470",
    },

    {
      id: "fukutoshin",

      code: "F",

      nameKo: "도쿄메트로 후쿠토신선",
      nameJa: "東京メトロ副都心線",

      color: "#9C5E31",
    },

    {
      id: "seibu-ikebukuro",

      code: "SI",

      nameKo: "세이부 이케부쿠로선",
      nameJa: "西武池袋線",

      color: "#F5A200",
    },
  ],

  /*
   * JY15 다카다노바바
   */

  JY15: [
    {
      id: "seibu-shinjuku",

      code: "SS",

      nameKo: "세이부 신주쿠선",
      nameJa: "西武新宿線",

      color: "#00A6BF",
    },

    {
      id: "tozai",

      code: "T",

      nameKo: "도쿄메트로 도자이선",
      nameJa: "東京メトロ東西線",

      color: "#009BBF",
    },
  ],

  /*
   * JY17 신주쿠
   */

  JY17: [
    {
      id: "chuo-rapid",

      code: "JC",

      nameKo: "주오선 쾌속",
      nameJa: "中央線快速",

      color: "#F15A22",
    },

    {
      id: "chuo-sobu-local",

      code: "JB",

      nameKo: "주오·소부선",
      nameJa: "中央・総武線",

      color: "#FFD400",
    },

    {
      id: "saikyo",

      code: "JA",

      nameKo: "사이쿄선",
      nameJa: "埼京線",

      color: "#00AC9A",
    },

    {
      id: "marunouchi",

      code: "M",

      nameKo: "도쿄메트로 마루노우치선",
      nameJa: "東京メトロ丸ノ内線",

      color: "#F62E36",
    },

    {
      id: "shinjuku",

      code: "S",

      nameKo: "도에이 신주쿠선",
      nameJa: "都営新宿線",

      color: "#6CBB5A",
    },

    {
      id: "oedo",

      code: "E",

      nameKo: "도에이 오에도선",
      nameJa: "都営大江戸線",

      color: "#CE045B",
    },
  ],

  /*
   * JY20 시부야
   */

  JY20: [
    {
      id: "saikyo",

      code: "JA",

      nameKo: "사이쿄선",
      nameJa: "埼京線",

      color: "#00AC9A",
    },

    {
      id: "ginza",

      code: "G",

      nameKo: "도쿄메트로 긴자선",
      nameJa: "東京メトロ銀座線",

      color: "#F39700",
    },

    {
      id: "hanzomon",

      code: "Z",

      nameKo: "도쿄메트로 한조몬선",
      nameJa: "東京メトロ半蔵門線",

      color: "#8F76D6",
    },

    {
      id: "fukutoshin",

      code: "F",

      nameKo: "도쿄메트로 후쿠토신선",
      nameJa: "東京メトロ副都心線",

      color: "#9C5E31",
    },
  ],

  /*
   * JY21 에비스
   */

  JY21: [
    {
      id: "saikyo",

      code: "JA",

      nameKo: "사이쿄선",
      nameJa: "埼京線",

      color: "#00AC9A",
    },

    {
      id: "hibiya",

      code: "H",

      nameKo: "도쿄메트로 히비야선",
      nameJa: "東京メトロ日比谷線",

      color: "#B5B5AC",
    },
  ],

  /*
   * JY22 메구로
   */

  JY22: [
    {
      id: "namboku",

      code: "N",

      nameKo: "도쿄메트로 난보쿠선",
      nameJa: "東京メトロ南北線",

      color: "#00AC9B",
    },

    {
      id: "mita",

      code: "I",

      nameKo: "도에이 미타선",
      nameJa: "都営三田線",

      color: "#0067C0",
    },
  ],

  /*
   * JY23 고탄다
   */

  JY23: [
    {
      id: "asakusa",

      code: "A",

      nameKo: "도에이 아사쿠사선",
      nameJa: "都営浅草線",

      color: "#E85298",
    },
  ],

  /*
   * JY24 오사키
   */

  JY24: [
    {
      id: "saikyo",

      code: "JA",

      nameKo: "사이쿄선",
      nameJa: "埼京線",

      color: "#00AC9A",
    },
  ],

  /*
   * JY25 시나가와
   */

  JY25: [
    {
      id: "keihin-tohoku",

      code: "JK",

      nameKo: "게이힌도호쿠선",
      nameJa: "京浜東北線",

      color: "#00A7DB",
    },

    {
      id: "tokaido",

      code: "JT",

      nameKo: "도카이도선",
      nameJa: "東海道線",

      color: "#F68B1E",
    },

    {
      id: "keikyu-main",

      code: "KK",

      nameKo: "게이큐 본선",
      nameJa: "京急本線",

      color: "#00A5DE",
    },
  ],

  /*
   * JY27 다마치
   */

  JY27: [
    {
      id: "keihin-tohoku",

      code: "JK",

      nameKo: "게이힌도호쿠선",
      nameJa: "京浜東北線",

      color: "#00A7DB",
    },
  ],

  /*
   * JY28 하마마쓰초
   */

  JY28: [
    {
      id: "keihin-tohoku",

      code: "JK",

      nameKo: "게이힌도호쿠선",
      nameJa: "京浜東北線",

      color: "#00A7DB",
    },

    {
      id: "tokyo-monorail",

      code: "MO",

      nameKo: "도쿄 모노레일",
      nameJa: "東京モノレール",

      color: "#0072BC",
    },
  ],

  /*
   * JY29 신바시
   */

  JY29: [
    {
      id: "keihin-tohoku",

      code: "JK",

      nameKo: "게이힌도호쿠선",
      nameJa: "京浜東北線",

      color: "#00A7DB",
    },

    {
      id: "tokaido",

      code: "JT",

      nameKo: "도카이도선",
      nameJa: "東海道線",

      color: "#F68B1E",
    },

    {
      id: "ginza",

      code: "G",

      nameKo: "도쿄메트로 긴자선",
      nameJa: "東京メトロ銀座線",

      color: "#F39700",
    },

    {
      id: "asakusa",

      code: "A",

      nameKo: "도에이 아사쿠사선",
      nameJa: "都営浅草線",

      color: "#E85298",
    },

    {
      id: "yurikamome",

      code: "U",

      nameKo: "유리카모메",
      nameJa: "ゆりかもめ",

      color: "#27404E",
    },
  ],

  /*
   * JY30 유라쿠초
   */

  JY30: [
    {
      id: "keihin-tohoku",

      code: "JK",

      nameKo: "게이힌도호쿠선",
      nameJa: "京浜東北線",

      color: "#00A7DB",
    },

    {
      id: "yurakucho",

      code: "Y",

      nameKo: "도쿄메트로 유라쿠초선",
      nameJa: "東京メトロ有楽町線",

      color: "#C1A470",
    },
  ],
};

/*
 * =========================================================
 * Station[] 자동 생성
 * =========================================================
 *
 * 30개 역 각각을 일일이 객체로 작성하는 대신
 * 기본 배열에서 순환 구조를 계산한다.
 *
 * 이렇게 하면 역 추가/변경 시
 * nextStation 실수를 줄일 수 있다.
 *
 * =========================================================
 */

export const yamanoteStations: Station[] = YAMANOTE_STATION_BASE.map(
  (station, index, stations) => {
    /*
     * 내선순환 다음 역
     *
     * JY01 → JY02
     * ...
     * JY30 → JY01
     */

    const innerNextIndex = (index + 1) % stations.length;

    /*
     * 외선순환 다음 역
     *
     * JY01 → JY30
     * JY30 → JY29
     * ...
     */

    const outerNextIndex = (index - 1 + stations.length) % stations.length;

    const innerNext = stations[innerNextIndex];

    const outerNext = stations[outerNextIndex];

    return {
      id: station.id,

      operatorId: "jr-east",

      lineId: "yamanote",

      lineCode: "JY",

      lineNameKo: "야마노테선",

      lineNameJa: "山手線",

      code: station.id,

      nameKo: station.nameKo,

      nameJa: station.nameJa,

      color: YAMANOTE_COLOR,

      type: "loop",

      directions: [
        /*
         * =================================
         * 내선순환
         * =================================
         */

        {
          id: "inner",

          label: "내선순환",

          description: "→ 내선순환",

          nextStations: [createNextStation(innerNext)],
        },

        /*
         * =================================
         * 외선순환
         * =================================
         */

        {
          id: "outer",

          label: "외선순환",

          description: "→ 외선순환",

          nextStations: [createNextStation(outerNext)],
        },
      ],

      transfers: TRANSFERS[station.id] ?? [],
    };
  },
);

/*
 * =========================================================
 * Registry fallback / UI 테스트 열차
 * =========================================================
 *
 * 아직 JR 실제 시간표 / Train API를
 * Expo에 연결하지 않았기 때문에
 * UI 테스트용으로 유지한다.
 *
 * =========================================================
 */

export const yamanoteTrains: Record<string, Train[]> = {
  /*
   * =======================================================
   * 내선순환
   * =======================================================
   */

  inner: [
    {
      id: "yamanote-inner-1",

      time: "10:30",

      minutesUntilDeparture: 3,

      directionId: "inner",

      status: "normal",
    },

    {
      id: "yamanote-inner-2",

      time: "10:33",

      minutesUntilDeparture: 6,

      directionId: "inner",

      status: "normal",
    },

    {
      id: "yamanote-inner-3",

      time: "10:36",

      minutesUntilDeparture: 9,

      directionId: "inner",

      status: "normal",
    },
  ],

  /*
   * =======================================================
   * 외선순환
   * =======================================================
   */

  outer: [
    {
      id: "yamanote-outer-1",

      time: "10:31",

      minutesUntilDeparture: 4,

      directionId: "outer",

      status: "normal",
    },

    {
      id: "yamanote-outer-2",

      time: "10:34",

      minutesUntilDeparture: 7,

      directionId: "outer",

      status: "normal",
    },

    {
      id: "yamanote-outer-3",

      time: "10:37",

      minutesUntilDeparture: 10,

      directionId: "outer",

      status: "normal",
    },
  ],
};

