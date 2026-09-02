import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

export const KEISEI_COLOR = "#005AAA";

/*
 * =========================================================
 * 게이세이 본선
 * KS01 ~ KS42
 * =========================================================
 *
 * 기본 방향
 *
 * d1 = 게이세이우에노 방면
 * d2 = 나리타공항 방면
 *
 * KS01은 종점이므로 d1 하나만 사용하며,
 * 앱에서는 나리타공항 방면 시간표로 연결한다.
 *
 * KS42도 종점이므로 게이세이우에노 방면 하나만 사용한다.
 *
 * =========================================================
 */

const createNextStation = (id: string, nameKo: string, nameJa: string) => ({
  id,
  code: id,

  nameKo,
  nameJa,

  lineId: "keisei-main",
  lineCode: "KS",

  lineNameKo: "게이세이 본선",

  color: KEISEI_COLOR,
});

/*
 * =========================================================
 * 역 데이터
 * =========================================================
 */

export const keiseiMainStations: Station[] = [
  /*
   * =======================================================
   * KS01 게이세이우에노
   * =======================================================
   */

  {
    id: "KS01",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS01",

    nameKo: "게이세이우에노",
    nameJa: "京成上野",

    color: KEISEI_COLOR,

    type: "terminal",

    directions: [
      {
        id: "d1",

        label: "나리타공항 방면",

        description: "→ 닛포리 · 아오토 · 나리타공항 방면",

        nextStations: [createNextStation("KS02", "닛포리", "日暮里")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS02 닛포리
   * =======================================================
   */

  {
    id: "KS02",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS02",

    nameKo: "닛포리",
    nameJa: "日暮里",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",

        label: "게이세이우에노 방면",

        description: "→ 게이세이우에노 방면",

        nextStations: [createNextStation("KS01", "게이세이우에노", "京成上野")],
      },

      {
        id: "d2",

        label: "나리타공항 방면",

        description: "→ 아오토 · 나리타공항 방면",

        nextStations: [createNextStation("KS03", "신미카와시마", "新三河島")],
      },
    ],

    transfers: [
      {
        id: "yamanote",

        code: "JY",

        nameKo: "야마노테선",
        nameJa: "山手線",

        color: "#80C41C",
      },

      {
        id: "keihin-tohoku",

        code: "JK",

        nameKo: "게이힌도호쿠선",
        nameJa: "京浜東北線",

        color: "#00A7DB",
      },

      {
        id: "joban",

        code: "JJ",

        nameKo: "조반선",
        nameJa: "常磐線",

        color: "#00B261",
      },
    ],
  },

  /*
   * =======================================================
   * KS03 신미카와시마
   * =======================================================
   */

  {
    id: "KS03",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS03",

    nameKo: "신미카와시마",
    nameJa: "新三河島",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",

        label: "게이세이우에노 방면",

        description: "→ 닛포리 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS02", "닛포리", "日暮里")],
      },

      {
        id: "d2",

        label: "나리타공항 방면",

        description: "→ 아오토 · 나리타공항 방면",

        nextStations: [createNextStation("KS04", "마치야", "町屋")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS04 마치야
   * =======================================================
   */

  {
    id: "KS04",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS04",

    nameKo: "마치야",
    nameJa: "町屋",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",

        label: "게이세이우에노 방면",

        description: "→ 닛포리 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS03", "신미카와시마", "新三河島")],
      },

      {
        id: "d2",

        label: "나리타공항 방면",

        description: "→ 아오토 · 나리타공항 방면",

        nextStations: [createNextStation("KS05", "센주오하시", "千住大橋")],
      },
    ],

    transfers: [
      {
        id: "chiyoda",

        code: "C",

        nameKo: "도쿄메트로 지요다선",
        nameJa: "東京メトロ千代田線",

        color: "#00BB85",
      },
    ],
  },

  /*
   * =======================================================
   * KS05 센주오하시
   * =======================================================
   */

  {
    id: "KS05",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS05",

    nameKo: "센주오하시",
    nameJa: "千住大橋",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",

        label: "게이세이우에노 방면",

        description: "→ 닛포리 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS04", "마치야", "町屋")],
      },

      {
        id: "d2",

        label: "나리타공항 방면",

        description: "→ 아오토 · 나리타공항 방면",

        nextStations: [createNextStation("KS06", "게이세이세키야", "京成関屋")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS06 게이세이세키야
   * =======================================================
   */

  {
    id: "KS06",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS06",

    nameKo: "게이세이세키야",
    nameJa: "京成関屋",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",

        label: "게이세이우에노 방면",

        description: "→ 닛포리 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS05", "센주오하시", "千住大橋")],
      },

      {
        id: "d2",

        label: "나리타공항 방면",

        description: "→ 아오토 · 나리타공항 방면",

        nextStations: [
          createNextStation("KS07", "호리키리쇼부엔", "堀切菖蒲園"),
        ],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS07 호리키리쇼부엔
   * =======================================================
   */

  {
    id: "KS07",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS07",

    nameKo: "호리키리쇼부엔",
    nameJa: "堀切菖蒲園",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",

        label: "게이세이우에노 방면",

        description: "→ 닛포리 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS06", "게이세이세키야", "京成関屋")],
      },

      {
        id: "d2",

        label: "나리타공항 방면",

        description: "→ 아오토 · 나리타공항 방면",

        nextStations: [createNextStation("KS08", "오하나자야", "お花茶屋")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS08 오하나자야
   * =======================================================
   */

  {
    id: "KS08",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS08",

    nameKo: "오하나자야",
    nameJa: "お花茶屋",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",

        label: "게이세이우에노 방면",

        description: "→ 닛포리 · 게이세이우에노 방면",

        nextStations: [
          createNextStation("KS07", "호리키리쇼부엔", "堀切菖蒲園"),
        ],
      },

      {
        id: "d2",

        label: "나리타공항 방면",

        description: "→ 아오토 · 나리타공항 방면",

        nextStations: [createNextStation("KS09", "아오토", "青砥")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS09 아오토
   * =======================================================
   */

  {
    id: "KS09",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS09",

    nameKo: "아오토",
    nameJa: "青砥",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",

        label: "게이세이우에노 방면",

        description: "→ 게이세이우에노 방면",

        nextStations: [createNextStation("KS08", "오하나자야", "お花茶屋")],
      },

      {
        id: "d2",

        label: "나리타공항 방면",

        description: "→ 다카사고 · 나리타공항 방면",

        nextStations: [
          createNextStation("KS10", "게이세이다카사고", "京成高砂"),
        ],
      },
    ],

    transfers: [
      {
        id: "oshiage",

        code: "KS",

        nameKo: "게이세이 오시아게선",
        nameJa: "京成押上線",

        color: KEISEI_COLOR,
      },
    ],
  },

  /*
   * =======================================================
   * KS10 게이세이다카사고
   * =======================================================
   */

  {
    id: "KS10",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS10",

    nameKo: "게이세이다카사고",
    nameJa: "京成高砂",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",

        label: "게이세이우에노 방면",

        description: "→ 아오토 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS09", "아오토", "青砥")],
      },

      {
        id: "d2",

        label: "나리타공항 방면",

        description: "→ 게이세이사쿠라 · 나리타공항 방면",

        nextStations: [createNextStation("KS11", "게이세이고이와", "京成小岩")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS11 게이세이고이와
   * =======================================================
   */

  {
    id: "KS11",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS11",

    nameKo: "게이세이고이와",
    nameJa: "京成小岩",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",

        label: "게이세이우에노 방면",

        description: "→ 아오토 · 게이세이우에노 방면",

        nextStations: [
          createNextStation("KS10", "게이세이다카사고", "京成高砂"),
        ],
      },

      {
        id: "d2",

        label: "나리타공항 방면",

        description: "→ 후나바시 · 나리타공항 방면",

        nextStations: [createNextStation("KS12", "에도가와", "江戸川")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS12 에도가와
   * =======================================================
   */

  {
    id: "KS12",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS12",

    nameKo: "에도가와",
    nameJa: "江戸川",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",

        label: "게이세이우에노 방면",

        description: "→ 아오토 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS11", "게이세이고이와", "京成小岩")],
      },

      {
        id: "d2",

        label: "나리타공항 방면",

        description: "→ 후나바시 · 나리타공항 방면",

        nextStations: [createNextStation("KS13", "고노다이", "国府台")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS13 고노다이
   * =======================================================
   */

  {
    id: "KS13",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS13",

    nameKo: "고노다이",
    nameJa: "国府台",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 아오토 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS12", "에도가와", "江戸川")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 후나바시 · 나리타공항 방면",

        nextStations: [createNextStation("KS14", "이치카와마마", "市川真間")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS14 이치카와마마
   * =======================================================
   */

  {
    id: "KS14",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS14",

    nameKo: "이치카와마마",
    nameJa: "市川真間",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 아오토 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS13", "고노다이", "国府台")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 후나바시 · 나리타공항 방면",

        nextStations: [createNextStation("KS15", "스가노", "菅野")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS15 스가노
   * =======================================================
   */

  {
    id: "KS15",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS15",

    nameKo: "스가노",
    nameJa: "菅野",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 아오토 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS14", "이치카와마마", "市川真間")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 후나바시 · 나리타공항 방면",

        nextStations: [createNextStation("KS16", "게이세이야와타", "京成八幡")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS16 게이세이야와타
   * =======================================================
   */

  {
    id: "KS16",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS16",

    nameKo: "게이세이야와타",
    nameJa: "京成八幡",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 아오토 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS15", "스가노", "菅野")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 후나바시 · 나리타공항 방면",

        nextStations: [createNextStation("KS17", "오니고에", "鬼越")],
      },
    ],

    transfers: [
      {
        id: "shinjuku",

        code: "S",

        nameKo: "도에이 신주쿠선",
        nameJa: "都営新宿線",

        color: "#6CBB5A",
      },
    ],
  },

  /*
   * =======================================================
   * KS17 오니고에
   * =======================================================
   */

  {
    id: "KS17",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS17",

    nameKo: "오니고에",
    nameJa: "鬼越",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 아오토 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS16", "게이세이야와타", "京成八幡")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 후나바시 · 나리타공항 방면",

        nextStations: [
          createNextStation("KS18", "게이세이나카야마", "京成中山"),
        ],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS18 게이세이나카야마
   * =======================================================
   */

  {
    id: "KS18",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS18",

    nameKo: "게이세이나카야마",
    nameJa: "京成中山",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 아오토 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS17", "오니고에", "鬼越")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 후나바시 · 나리타공항 방면",

        nextStations: [createNextStation("KS19", "히가시나카야마", "東中山")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS19 히가시나카야마
   * =======================================================
   */

  {
    id: "KS19",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS19",

    nameKo: "히가시나카야마",
    nameJa: "東中山",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 아오토 · 게이세이우에노 방면",

        nextStations: [
          createNextStation("KS18", "게이세이나카야마", "京成中山"),
        ],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 후나바시 · 나리타공항 방면",

        nextStations: [
          createNextStation("KS20", "게이세이니시후나", "京成西船"),
        ],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS20 게이세이니시후나
   * =======================================================
   */

  {
    id: "KS20",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS20",

    nameKo: "게이세이니시후나",
    nameJa: "京成西船",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 게이세이우에노 방면",

        nextStations: [createNextStation("KS19", "히가시나카야마", "東中山")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 게이세이쓰다누마 · 나리타공항 방면",

        nextStations: [createNextStation("KS21", "가이진", "海神")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS21 가이진
   * =======================================================
   */

  {
    id: "KS21",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS21",

    nameKo: "가이진",
    nameJa: "海神",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 후나바시 · 게이세이우에노 방면",

        nextStations: [
          createNextStation("KS20", "게이세이니시후나", "京成西船"),
        ],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 게이세이쓰다누마 · 나리타공항 방면",

        nextStations: [
          createNextStation("KS22", "게이세이후나바시", "京成船橋"),
        ],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS22 게이세이후나바시
   * =======================================================
   */

  {
    id: "KS22",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS22",

    nameKo: "게이세이후나바시",
    nameJa: "京成船橋",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 아오토 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS21", "가이진", "海神")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 게이세이쓰다누마 · 나리타공항 방면",

        nextStations: [createNextStation("KS23", "다이진구시타", "大神宮下")],
      },
    ],

    transfers: [
      {
        id: "chuo-sobu-local",

        code: "JB",

        nameKo: "주오·소부선",
        nameJa: "中央・総武線",

        color: "#FFD400",
      },
    ],
  },

  /*
   * =======================================================
   * KS23 다이진구시타
   * =======================================================
   */

  {
    id: "KS23",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS23",

    nameKo: "다이진구시타",
    nameJa: "大神宮下",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 후나바시 · 게이세이우에노 방면",

        nextStations: [
          createNextStation("KS22", "게이세이후나바시", "京成船橋"),
        ],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 게이세이쓰다누마 · 나리타공항 방면",

        nextStations: [
          createNextStation("KS24", "후나바시케이바조", "船橋競馬場"),
        ],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS24 후나바시케이바조
   * =======================================================
   */

  {
    id: "KS24",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS24",

    nameKo: "후나바시케이바조",
    nameJa: "船橋競馬場",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 후나바시 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS23", "다이진구시타", "大神宮下")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 게이세이쓰다누마 · 나리타공항 방면",

        nextStations: [createNextStation("KS25", "야쓰", "谷津")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS25 야쓰
   * =======================================================
   */

  {
    id: "KS25",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS25",

    nameKo: "야쓰",
    nameJa: "谷津",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 후나바시 · 게이세이우에노 방면",

        nextStations: [
          createNextStation("KS24", "후나바시케이바조", "船橋競馬場"),
        ],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 게이세이쓰다누마 · 나리타공항 방면",

        nextStations: [
          createNextStation("KS26", "게이세이쓰다누마", "京成津田沼"),
        ],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS26 게이세이쓰다누마
   * =======================================================
   */

  {
    id: "KS26",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS26",

    nameKo: "게이세이쓰다누마",
    nameJa: "京成津田沼",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 후나바시 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS25", "야쓰", "谷津")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 야치요다이 · 나리타공항 방면",

        nextStations: [
          createNextStation("KS27", "게이세이오쿠보", "京成大久保"),
        ],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS27 게이세이오쿠보
   * =======================================================
   */

  {
    id: "KS27",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS27",

    nameKo: "게이세이오쿠보",
    nameJa: "京成大久保",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 게이세이쓰다누마 · 게이세이우에노 방면",

        nextStations: [
          createNextStation("KS26", "게이세이쓰다누마", "京成津田沼"),
        ],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 야치요다이 · 나리타공항 방면",

        nextStations: [createNextStation("KS28", "미모미", "実籾")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS28 미모미
   * =======================================================
   */

  {
    id: "KS28",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS28",

    nameKo: "미모미",
    nameJa: "実籾",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 게이세이쓰다누마 · 게이세이우에노 방면",

        nextStations: [
          createNextStation("KS27", "게이세이오쿠보", "京成大久保"),
        ],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 야치요다이 · 나리타공항 방면",

        nextStations: [createNextStation("KS29", "야치요다이", "八千代台")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS29 야치요다이
   * =======================================================
   */

  {
    id: "KS29",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS29",

    nameKo: "야치요다이",
    nameJa: "八千代台",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 게이세이쓰다누마 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS28", "미모미", "実籾")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 게이세이사쿠라 · 나리타공항 방면",

        nextStations: [
          createNextStation("KS30", "게이세이오와다", "京成大和田"),
        ],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS30 게이세이오와다
   * =======================================================
   */

  {
    id: "KS30",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS30",

    nameKo: "게이세이오와다",
    nameJa: "京成大和田",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 야치요다이 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS29", "야치요다이", "八千代台")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 게이세이사쿠라 · 나리타공항 방면",

        nextStations: [createNextStation("KS31", "가쓰타다이", "勝田台")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS31 가쓰타다이
   * =======================================================
   */

  {
    id: "KS31",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS31",

    nameKo: "가쓰타다이",
    nameJa: "勝田台",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 야치요다이 · 게이세이우에노 방면",

        nextStations: [
          createNextStation("KS30", "게이세이오와다", "京成大和田"),
        ],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 게이세이사쿠라 · 나리타공항 방면",

        nextStations: [createNextStation("KS32", "시즈", "志津")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS32 시즈
   * =======================================================
   */

  {
    id: "KS32",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS32",

    nameKo: "시즈",
    nameJa: "志津",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 야치요다이 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS31", "가쓰타다이", "勝田台")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 게이세이사쿠라 · 나리타공항 방면",

        nextStations: [
          createNextStation("KS33", "유카리가오카", "ユーカリが丘"),
        ],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS33 유카리가오카
   * =======================================================
   */

  {
    id: "KS33",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS33",

    nameKo: "유카리가오카",
    nameJa: "ユーカリが丘",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 야치요다이 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS32", "시즈", "志津")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 게이세이사쿠라 · 나리타공항 방면",

        nextStations: [createNextStation("KS34", "게이세이우스이", "京成臼井")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS34 게이세이우스이
   * =======================================================
   */

  {
    id: "KS34",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS34",

    nameKo: "게이세이우스이",
    nameJa: "京成臼井",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 야치요다이 · 게이세이우에노 방면",

        nextStations: [
          createNextStation("KS33", "유카리가오카", "ユーカリが丘"),
        ],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 게이세이사쿠라 · 나리타공항 방면",

        nextStations: [createNextStation("KS35", "게이세이사쿠라", "京成佐倉")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS35 게이세이사쿠라
   * =======================================================
   */

  {
    id: "KS35",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS35",

    nameKo: "게이세이사쿠라",
    nameJa: "京成佐倉",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 야치요다이 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS34", "게이세이우스이", "京成臼井")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 게이세이나리타 · 나리타공항 방면",

        nextStations: [createNextStation("KS36", "오사쿠라", "大佐倉")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS36 오사쿠라
   * =======================================================
   */

  {
    id: "KS36",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS36",

    nameKo: "오사쿠라",
    nameJa: "大佐倉",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 게이세이사쿠라 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS35", "게이세이사쿠라", "京成佐倉")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 게이세이나리타 · 나리타공항 방면",

        nextStations: [
          createNextStation("KS37", "게이세이시스이", "京成酒々井"),
        ],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS37 게이세이시스이
   * =======================================================
   */

  {
    id: "KS37",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS37",

    nameKo: "게이세이시스이",
    nameJa: "京成酒々井",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 게이세이사쿠라 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS36", "오사쿠라", "大佐倉")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 게이세이나리타 · 나리타공항 방면",

        nextStations: [createNextStation("KS38", "소고산도", "宗吾参道")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS38 소고산도
   * =======================================================
   */

  {
    id: "KS38",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS38",

    nameKo: "소고산도",
    nameJa: "宗吾参道",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 게이세이사쿠라 · 게이세이우에노 방면",

        nextStations: [
          createNextStation("KS37", "게이세이시스이", "京成酒々井"),
        ],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 게이세이나리타 · 나리타공항 방면",

        nextStations: [createNextStation("KS39", "고즈노모리", "公津の杜")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS39 고즈노모리
   * =======================================================
   */

  {
    id: "KS39",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS39",

    nameKo: "고즈노모리",
    nameJa: "公津の杜",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",
        label: "게이세이우에노 방면",
        description: "→ 게이세이사쿠라 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS38", "소고산도", "宗吾参道")],
      },

      {
        id: "d2",
        label: "나리타공항 방면",
        description: "→ 게이세이나리타 · 나리타공항 방면",

        nextStations: [createNextStation("KS40", "게이세이나리타", "京成成田")],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS40 게이세이나리타
   * =======================================================
   */

  {
    id: "KS40",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS40",

    nameKo: "게이세이나리타",
    nameJa: "京成成田",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",

        label: "게이세이우에노 방면",

        description: "→ 게이세이사쿠라 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS39", "고즈노모리", "公津の杜")],
      },

      {
        id: "d2",

        label: "나리타공항 방면",

        description: "→ 공항제2빌딩 · 나리타공항 방면",

        nextStations: [
          createNextStation("KS41", "공항제2빌딩", "空港第２ビル"),
        ],
      },
    ],

    transfers: [],
  },

  /*
   * =======================================================
   * KS41 공항제2빌딩
   * =======================================================
   */

  {
    id: "KS41",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS41",

    nameKo: "공항제2빌딩",
    nameJa: "空港第２ビル",

    color: KEISEI_COLOR,

    type: "normal",

    directions: [
      {
        id: "d1",

        label: "게이세이우에노 방면",

        description: "→ 게이세이나리타 · 게이세이우에노 방면",

        nextStations: [createNextStation("KS40", "게이세이나리타", "京成成田")],
      },

      {
        id: "d2",

        label: "나리타공항 방면",

        description: "→ 나리타공항 방면",

        nextStations: [createNextStation("KS42", "나리타공항", "成田空港")],
      },
    ],

    transfers: [
      {
        id: "narita",

        code: "JO",

        nameKo: "JR 나리타선",
        nameJa: "JR成田線",

        color: "#00B261",
      },
    ],
  },

  /*
   * =======================================================
   * KS42 나리타공항
   * =======================================================
   */

  {
    id: "KS42",

    operatorId: "keisei",

    lineId: "keisei-main",
    lineCode: "KS",

    lineNameKo: "게이세이 본선",
    lineNameJa: "京成本線",

    code: "KS42",

    nameKo: "나리타공항",
    nameJa: "成田空港",

    color: KEISEI_COLOR,

    type: "terminal",

    directions: [
      {
        id: "d1",

        label: "게이세이우에노 방면",

        description: "→ 게이세이나리타 · 게이세이우에노 방면",

        nextStations: [
          createNextStation("KS41", "공항제2빌딩", "空港第２ビル"),
        ],
      },
    ],

    transfers: [
      {
        id: "narita",

        code: "JO",

        nameKo: "JR 나리타선",
        nameJa: "JR成田線",

        color: "#00B261",
      },
    ],
  },
];

/*
 * =========================================================
 * Registry fallback / UI 테스트용
 * =========================================================
 *
 * 게이세이 역 상세 화면에서는 실제로
 * useKeiseiTrains() → timetable API를 사용하기 때문에
 * 아래 값들은 앱의 주 데이터가 아니다.
 *
 * 실제 API 실패나 UI 개발 상황을 고려해서
 * 최소한의 fallback만 유지한다.
 * =========================================================
 */

export const keiseiMainTrains: Record<string, Train[]> = {
  d1: [
    {
      id: "keisei-d1-fallback-1",

      time: "10:30",

      minutesUntilDeparture: 5,

      trainType: "보통",

      destinationKo: "게이세이우에노",
      destinationJa: "京成上野",

      directionId: "d1",

      status: "normal",
    },
  ],

  d2: [
    {
      id: "keisei-d2-fallback-1",

      time: "10:35",

      minutesUntilDeparture: 10,

      trainType: "보통",

      destinationKo: "나리타공항",
      destinationJa: "成田空港",

      directionId: "d2",

      status: "normal",
    },
  ],
};

