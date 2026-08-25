import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

export const OEDO_COLOR = "#CE045B";

/*
 * =========================================================
 * 도에이 오에도선
 * E01 ~ E38
 * =========================================================
 *
 * 실제 열차 시간은 이 파일에서 관리하지 않는다.
 *
 * Toei ODPT
 *   ↓
 * services/toei.ts
 *   ↓
 * hooks/useOedoTrains.ts
 *   ↓
 * adapters/toeiTrainAdapter.ts
 *
 * =========================================================
 */

type OedoStationBase = {
  id: string;

  nameKo: string;
  nameJa: string;
};

/*
 * =========================================================
 * 역 기본 데이터
 * =========================================================
 */

const OEDO_STATION_BASE: OedoStationBase[] = [
  {
    id: "E01",
    nameKo: "신주쿠니시구치",
    nameJa: "新宿西口",
  },
  {
    id: "E02",
    nameKo: "히가시신주쿠",
    nameJa: "東新宿",
  },
  {
    id: "E03",
    nameKo: "와카마쓰카와다",
    nameJa: "若松河田",
  },
  {
    id: "E04",
    nameKo: "우시고메야나기초",
    nameJa: "牛込柳町",
  },
  {
    id: "E05",
    nameKo: "우시고메카구라자카",
    nameJa: "牛込神楽坂",
  },
  {
    id: "E06",
    nameKo: "이이다바시",
    nameJa: "飯田橋",
  },
  {
    id: "E07",
    nameKo: "가스가",
    nameJa: "春日",
  },
  {
    id: "E08",
    nameKo: "혼고산초메",
    nameJa: "本郷三丁目",
  },
  {
    id: "E09",
    nameKo: "우에노오카치마치",
    nameJa: "上野御徒町",
  },
  {
    id: "E10",
    nameKo: "신오카치마치",
    nameJa: "新御徒町",
  },
  {
    id: "E11",
    nameKo: "구라마에",
    nameJa: "蔵前",
  },
  {
    id: "E12",
    nameKo: "료고쿠",
    nameJa: "両国",
  },
  {
    id: "E13",
    nameKo: "모리시타",
    nameJa: "森下",
  },
  {
    id: "E14",
    nameKo: "기요스미시라카와",
    nameJa: "清澄白河",
  },
  {
    id: "E15",
    nameKo: "몬젠나카초",
    nameJa: "門前仲町",
  },
  {
    id: "E16",
    nameKo: "쓰키시마",
    nameJa: "月島",
  },
  {
    id: "E17",
    nameKo: "가치도키",
    nameJa: "勝どき",
  },
  {
    id: "E18",
    nameKo: "쓰키지시조",
    nameJa: "築地市場",
  },
  {
    id: "E19",
    nameKo: "시오도메",
    nameJa: "汐留",
  },
  {
    id: "E20",
    nameKo: "다이몬",
    nameJa: "大門",
  },
  {
    id: "E21",
    nameKo: "아카바네바시",
    nameJa: "赤羽橋",
  },
  {
    id: "E22",
    nameKo: "아자부주반",
    nameJa: "麻布十番",
  },
  {
    id: "E23",
    nameKo: "롯폰기",
    nameJa: "六本木",
  },
  {
    id: "E24",
    nameKo: "아오야마잇초메",
    nameJa: "青山一丁目",
  },
  {
    id: "E25",
    nameKo: "고쿠리쓰쿄기조",
    nameJa: "国立競技場",
  },
  {
    id: "E26",
    nameKo: "요요기",
    nameJa: "代々木",
  },
  {
    id: "E27",
    nameKo: "신주쿠",
    nameJa: "新宿",
  },
  {
    id: "E28",
    nameKo: "도초마에",
    nameJa: "都庁前",
  },
  {
    id: "E29",
    nameKo: "니시신주쿠고초메",
    nameJa: "西新宿五丁目",
  },
  {
    id: "E30",
    nameKo: "나카노사카우에",
    nameJa: "中野坂上",
  },
  {
    id: "E31",
    nameKo: "히가시나카노",
    nameJa: "東中野",
  },
  {
    id: "E32",
    nameKo: "나카이",
    nameJa: "中井",
  },
  {
    id: "E33",
    nameKo: "오치아이미나미나가사키",
    nameJa: "落合南長崎",
  },
  {
    id: "E34",
    nameKo: "신에고타",
    nameJa: "新江古田",
  },
  {
    id: "E35",
    nameKo: "네리마",
    nameJa: "練馬",
  },
  {
    id: "E36",
    nameKo: "도시마엔",
    nameJa: "豊島園",
  },
  {
    id: "E37",
    nameKo: "네리마카스가초",
    nameJa: "練馬春日町",
  },
  {
    id: "E38",
    nameKo: "히카리가오카",
    nameJa: "光が丘",
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
 */

const TRANSFERS: Record<string, Transfer[]> = {
  /*
   * E01 신주쿠니시구치
   */

  E01: [
    transfer(
      "marunouchi",
      "M",
      "도쿄메트로 마루노우치선",
      "東京メトロ丸ノ内線",
      "#F62E36",
    ),

    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),

    transfer("chuo-sobu", "JB", "주오·소부선", "中央・総武線", "#FFD400"),

    transfer("chuo-rapid", "JC", "주오선 쾌속", "中央線快速", "#F15A22"),

    transfer("saikyo", "JA", "사이쿄선", "埼京線", "#00AC9A"),

    transfer("keio", "KO", "게이오선", "京王線", "#DD0077"),

    transfer("odakyu", "OH", "오다큐선", "小田急線", "#2288CC"),

    transfer(
      "seibu-shinjuku",
      "SS",
      "세이부 신주쿠선",
      "西武新宿線",
      "#00A6BF",
    ),
  ],

  /*
   * E02 히가시신주쿠
   */

  E02: [
    transfer(
      "fukutoshin",
      "F",
      "도쿄메트로 후쿠토신선",
      "東京メトロ副都心線",
      "#9C5E31",
    ),
  ],

  /*
   * E06 이이다바시
   */

  E06: [
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

    transfer("chuo-sobu", "JB", "JR 주오·소부선", "JR中央・総武線", "#FFD400"),
  ],

  /*
   * E07 가스가
   */

  E07: [
    transfer("mita", "I", "도에이 미타선", "都営三田線", "#0067C0"),

    transfer(
      "namboku",
      "N",
      "도쿄메트로 난보쿠선",
      "東京メトロ南北線",
      "#00AC9B",
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
   * E08 혼고산초메
   */

  E08: [
    transfer(
      "marunouchi",
      "M",
      "도쿄메트로 마루노우치선",
      "東京メトロ丸ノ内線",
      "#F62E36",
    ),
  ],

  /*
   * E09 우에노오카치마치
   */

  E09: [
    transfer("ginza", "G", "도쿄메트로 긴자선", "東京メトロ銀座線", "#F39700"),

    transfer(
      "hibiya",
      "H",
      "도쿄메트로 히비야선",
      "東京メトロ日比谷線",
      "#B5B5AC",
    ),

    transfer("yamanote", "JY", "JR 야마노테선", "JR山手線", "#80C41C"),

    transfer(
      "keihin-tohoku",
      "JK",
      "JR 게이힌도호쿠선",
      "JR京浜東北線",
      "#00A7DB",
    ),
  ],

  /*
   * E10 신오카치마치
   */

  E10: [
    transfer(
      "tsukuba-express",
      "TX",
      "쓰쿠바 익스프레스",
      "つくばエクスプレス",
      "#007AC3",
    ),
  ],

  /*
   * E11 구라마에
   */

  E11: [transfer("asakusa", "A", "도에이 아사쿠사선", "都営浅草線", "#E85298")],

  /*
   * E12 료고쿠
   */

  E12: [
    transfer("chuo-sobu", "JB", "JR 주오·소부선", "JR中央・総武線", "#FFD400"),
  ],

  /*
   * E13 모리시타
   */

  E13: [
    transfer("shinjuku", "S", "도에이 신주쿠선", "都営新宿線", "#6CBB5A"),
  ],

  /*
   * E14 기요스미시라카와
   */

  E14: [
    transfer(
      "hanzomon",
      "Z",
      "도쿄메트로 한조몬선",
      "東京メトロ半蔵門線",
      "#8F76D6",
    ),
  ],

  /*
   * E15 몬젠나카초
   */

  E15: [
    transfer(
      "tozai",
      "T",
      "도쿄메트로 도자이선",
      "東京メトロ東西線",
      "#009BBF",
    ),
  ],

  /*
   * E16 쓰키시마
   */

  E16: [
    transfer(
      "yurakucho",
      "Y",
      "도쿄메트로 유라쿠초선",
      "東京メトロ有楽町線",
      "#C1A470",
    ),
  ],

  /*
   * E19 시오도메
   */

  E19: [transfer("yurikamome", "U", "유리카모메", "ゆりかもめ", "#27404E")],

  /*
   * E20 다이몬
   */

  E20: [
    transfer("asakusa", "A", "도에이 아사쿠사선", "都営浅草線", "#E85298"),

    transfer("yamanote", "JY", "JR 야마노테선", "JR山手線", "#80C41C"),

    transfer(
      "keihin-tohoku",
      "JK",
      "JR 게이힌도호쿠선",
      "JR京浜東北線",
      "#00A7DB",
    ),

    transfer(
      "tokyo-monorail",
      "MO",
      "도쿄 모노레일",
      "東京モノレール",
      "#0072BC",
    ),
  ],

  /*
   * E22 아자부주반
   */

  E22: [
    transfer(
      "namboku",
      "N",
      "도쿄메트로 난보쿠선",
      "東京メトロ南北線",
      "#00AC9B",
    ),
  ],

  /*
   * E23 롯폰기
   */

  E23: [
    transfer(
      "hibiya",
      "H",
      "도쿄메트로 히비야선",
      "東京メトロ日比谷線",
      "#B5B5AC",
    ),
  ],

  /*
   * E24 아오야마잇초메
   */

  E24: [
    transfer("ginza", "G", "도쿄메트로 긴자선", "東京メトロ銀座線", "#F39700"),

    transfer(
      "hanzomon",
      "Z",
      "도쿄메트로 한조몬선",
      "東京メトロ半蔵門線",
      "#8F76D6",
    ),
  ],

  /*
   * E26 요요기
   */

  E26: [
    transfer("yamanote", "JY", "JR 야마노테선", "JR山手線", "#80C41C"),

    transfer("chuo-sobu", "JB", "JR 주오·소부선", "JR中央・総武線", "#FFD400"),
  ],

  /*
   * E27 신주쿠
   */

  E27: [
    transfer("shinjuku", "S", "도에이 신주쿠선", "都営新宿線", "#6CBB5A"),

    transfer("yamanote", "JY", "JR 야마노테선", "JR山手線", "#80C41C"),

    transfer("chuo-sobu", "JB", "JR 주오·소부선", "JR中央・総武線", "#FFD400"),

    transfer("chuo-rapid", "JC", "JR 주오선 쾌속", "JR中央線快速", "#F15A22"),

    transfer("saikyo", "JA", "JR 사이쿄선", "JR埼京線", "#00AC9A"),

    transfer("keio", "KO", "게이오선", "京王線", "#DD0077"),

    transfer("odakyu", "OH", "오다큐선", "小田急線", "#2288CC"),
  ],

  /*
   * E30 나카노사카우에
   */

  E30: [
    transfer(
      "marunouchi",
      "M",
      "도쿄메트로 마루노우치선",
      "東京メトロ丸ノ内線",
      "#F62E36",
    ),
  ],

  /*
   * E31 히가시나카노
   */

  E31: [
    transfer("chuo-sobu", "JB", "JR 주오·소부선", "JR中央・総武線", "#FFD400"),
  ],

  /*
   * E32 나카이
   */

  E32: [
    transfer(
      "seibu-shinjuku",
      "SS",
      "세이부 신주쿠선",
      "西武新宿線",
      "#00A6BF",
    ),
  ],

  /*
   * E35 네리마
   */

  E35: [
    transfer(
      "seibu-ikebukuro",
      "SI",
      "세이부 이케부쿠로선",
      "西武池袋線",
      "#F5A200",
    ),

    transfer(
      "seibu-yurakucho",
      "SI",
      "세이부 유라쿠초선",
      "西武有楽町線",
      "#F5A200",
    ),

    transfer("seibu-toshima", "SI", "세이부 도시마선", "西武豊島線", "#F5A200"),
  ],

  /*
   * E36 도시마엔
   */

  E36: [
    transfer("seibu-toshima", "SI", "세이부 도시마선", "西武豊島線", "#F5A200"),
  ],
};

/*
 * =========================================================
 * NextStation
 * =========================================================
 */

const createNextStation = (station: OedoStationBase) => ({
  id: station.id,

  code: station.id,

  nameKo: station.nameKo,
  nameJa: station.nameJa,

  lineId: "oedo",

  lineCode: "E",

  lineNameKo: "오에도선",

  color: OEDO_COLOR,
});

/*
 * =========================================================
 * 역 찾기
 * =========================================================
 */

const findStation = (id: string) => {
  const station = OEDO_STATION_BASE.find((item) => item.id === id);

  if (!station) {
    throw new Error(`오에도선 역을 찾을 수 없습니다: ${id}`);
  }

  return station;
};

/*
 * =========================================================
 * 일반 역 생성
 * =========================================================
 */

const createNormalStation = (
  station: OedoStationBase,
  innerNextId: string,
  outerNextId: string,
): Station => {
  const stationNumber = Number(station.id.slice(1));

  /*
   * E29 ~ E37은
   * 도초마에 ↔ 히카리가오카 구간이라
   * 관광객에게 실제 방면명으로 표시.
   *
   * 순환부는 내선/외선으로 표시.
   */

  const branchArea = stationNumber >= 29;

  return {
    id: station.id,

    operatorId: "toei",

    lineId: "oedo",

    lineCode: "E",

    lineNameKo: "오에도선",
    lineNameJa: "大江戸線",

    code: station.id,

    nameKo: station.nameKo,
    nameJa: station.nameJa,

    color: OEDO_COLOR,

    type: "normal",

    directions: [
      {
        id: "inner",

        label: branchArea ? "도초마에 방면" : "내선순환",

        description: branchArea ? "→ 도초마에 방면" : "→ 내선순환",

        nextStations: [createNextStation(findStation(innerNextId))],
      },

      {
        id: "outer",

        label: branchArea ? "히카리가오카 방면" : "외선순환",

        description: branchArea ? "→ 히카리가오카 방면" : "→ 외선순환",

        nextStations: [createNextStation(findStation(outerNextId))],
      },
    ],

    transfers: TRANSFERS[station.id] ?? [],
  };
};

/*
 * =========================================================
 * E01 ~ E38 생성
 * =========================================================
 */

export const oedoStations: Station[] = [
  /*
   * =======================================================
   * E01 신주쿠니시구치
   *
   * InnerLoop → E28 도초마에
   * OuterLoop → E02 히가시신주쿠
   * =======================================================
   */

  createNormalStation(findStation("E01"), "E28", "E02"),

  /*
   * =======================================================
   * E02 ~ E27
   * =======================================================
   */

  ...OEDO_STATION_BASE.filter((station) => {
    const number = Number(station.id.slice(1));

    return number >= 2 && number <= 27;
  }).map((station) => {
    const number = Number(station.id.slice(1));

    const innerId = `E${String(number - 1).padStart(2, "0")}`;

    const outerId = `E${String(number + 1).padStart(2, "0")}`;

    return createNormalStation(station, innerId, outerId);
  }),

  /*
   * =======================================================
   * E28 도초마에
   * =======================================================
   *
   * 오에도선 특수 구조.
   *
   * ① 신주쿠 · 롯폰기 · 다이몬
   * ② 신주쿠니시구치 · 이이다바시 · 료고쿠
   * ③ 네리마 · 히카리가오카
   *
   * ODPT에서는 InnerLoop / OuterLoop로 제공되므로
   * useOedoTrains.ts에서 별도로 매핑한다.
   * =======================================================
   */

  {
    id: "E28",

    operatorId: "toei",

    lineId: "oedo",

    lineCode: "E",

    lineNameKo: "오에도선",
    lineNameJa: "大江戸線",

    code: "E28",

    nameKo: "도초마에",
    nameJa: "都庁前",

    color: OEDO_COLOR,

    type: "special",

    directions: [
      {
        id: "roppongi-daimon",

        label: "롯폰기 · 다이몬 방면",

        description: "→ 신주쿠 · 롯폰기 · 다이몬 방면",

        nextStations: [createNextStation(findStation("E27"))],
      },

      {
        id: "iidabashi-ryogoku",

        label: "이이다바시 · 료고쿠 방면",

        description: "→ 신주쿠니시구치 · 이이다바시 · 료고쿠 방면",

        nextStations: [createNextStation(findStation("E01"))],
      },

      {
        id: "nerima-hikarigaoka",

        label: "네리마 · 히카리가오카 방면",

        description: "→ 네리마 · 히카리가오카 방면",

        nextStations: [createNextStation(findStation("E29"))],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * E29 ~ E37
   * =======================================================
   */

  ...OEDO_STATION_BASE.filter((station) => {
    const number = Number(station.id.slice(1));

    return number >= 29 && number <= 37;
  }).map((station) => {
    const number = Number(station.id.slice(1));

    const innerId = `E${String(number - 1).padStart(2, "0")}`;

    const outerId = `E${String(number + 1).padStart(2, "0")}`;

    return createNormalStation(station, innerId, outerId);
  }),

  /*
   * =======================================================
   * E38 히카리가오카
   * =======================================================
   *
   * 종점
   * =======================================================
   */

  {
    id: "E38",

    operatorId: "toei",

    lineId: "oedo",

    lineCode: "E",

    lineNameKo: "오에도선",
    lineNameJa: "大江戸線",

    code: "E38",

    nameKo: "히카리가오카",
    nameJa: "光が丘",

    color: OEDO_COLOR,

    type: "terminal",

    directions: [
      {
        id: "inner",

        label: "도초마에 방면",

        description: "→ 네리마 · 도초마에 방면",

        nextStations: [createNextStation(findStation("E37"))],
      },
    ],

    transfers: [],
  },
];

/*
 * =========================================================
 * 열차 데이터
 * =========================================================
 *
 * 더미 데이터 없음.
 *
 * 실제 ODPT 시간표 사용.
 * =========================================================
 */

export const oedoTrains: Record<string, Train[]> = {};

