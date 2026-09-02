import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Tokyo Railway Guide
 * Toei Asakusa Line
 * 都営浅草線
 * =========================================================
 *
 * A01 니시마고메
 * ↓
 * A20 오시아게
 *
 * nishimagome
 * = 니시마고메 방면
 *
 * oshiage
 * = 오시아게 방면
 *
 * =========================================================
 */

export const ASAKUSA_COLOR = "#E85298";

/*
 * =========================================================
 * 기본 역 타입
 * =========================================================
 */

type AsakusaStationBase = {
  id: string;

  nameKo: string;

  nameJa: string;
};

/*
 * =========================================================
 * 아사쿠사선 역 목록
 * =========================================================
 */

const ASAKUSA_STATION_BASE: AsakusaStationBase[] = [
  {
    id: "A01",
    nameKo: "니시마고메",
    nameJa: "西馬込",
  },
  {
    id: "A02",
    nameKo: "마고메",
    nameJa: "馬込",
  },
  {
    id: "A03",
    nameKo: "나카노부",
    nameJa: "中延",
  },
  {
    id: "A04",
    nameKo: "도고시",
    nameJa: "戸越",
  },
  {
    id: "A05",
    nameKo: "고탄다",
    nameJa: "五反田",
  },
  {
    id: "A06",
    nameKo: "다카나와다이",
    nameJa: "高輪台",
  },
  {
    id: "A07",
    nameKo: "센가쿠지",
    nameJa: "泉岳寺",
  },
  {
    id: "A08",
    nameKo: "미타",
    nameJa: "三田",
  },
  {
    id: "A09",
    nameKo: "다이몬",
    nameJa: "大門",
  },
  {
    id: "A10",
    nameKo: "신바시",
    nameJa: "新橋",
  },
  {
    id: "A11",
    nameKo: "히가시긴자",
    nameJa: "東銀座",
  },
  {
    id: "A12",
    nameKo: "다카라초",
    nameJa: "宝町",
  },
  {
    id: "A13",
    nameKo: "니혼바시",
    nameJa: "日本橋",
  },
  {
    id: "A14",
    nameKo: "닌교초",
    nameJa: "人形町",
  },
  {
    id: "A15",
    nameKo: "히가시니혼바시",
    nameJa: "東日本橋",
  },
  {
    id: "A16",
    nameKo: "아사쿠사바시",
    nameJa: "浅草橋",
  },
  {
    id: "A17",
    nameKo: "구라마에",
    nameJa: "蔵前",
  },
  {
    id: "A18",
    nameKo: "아사쿠사",
    nameJa: "浅草",
  },
  {
    id: "A19",
    nameKo: "혼조아즈마바시",
    nameJa: "本所吾妻橋",
  },
  {
    id: "A20",
    nameKo: "오시아게〈스카이트리마에〉",
    nameJa: "押上〈スカイツリー前〉",
  },
];

/*
 * =========================================================
 * 환승 타입
 * =========================================================
 */

type Transfer =
  NonNullable<
    Station["transfers"]
  >[number];

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
 * 환승 노선
 * =========================================================
 */

const TRANSFERS: Record<string, Transfer[]> = {
  /*
   * A03 나카노부
   */

  A03: [
    transfer(
      "tokyu-oimachi",
      "OM",
      "도큐 오이마치선",
      "東急大井町線",
      "#F18C43",
    ),
  ],

  /*
   * A05 고탄다
   */

  A05: [
    transfer(
      "yamanote",
      "JY",
      "야마노테선",
      "山手線",
      "#80C41C",
    ),
    transfer(
      "tokyu-ikegami",
      "IK",
      "도큐 이케가미선",
      "東急池上線",
      "#EE86A7",
    ),
  ],

  /*
   * A07 센가쿠지
   */

  A07: [
    transfer(
      "keikyu-main",
      "KK",
      "게이큐 본선",
      "京急本線",
      "#00A7E3",
    ),
  ],

  /*
   * A08 미타
   */

  A08: [
    transfer(
      "mita",
      "I",
      "도에이 미타선",
      "都営三田線",
      "#0079C2",
    ),
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
      "게이힌도호쿠선",
      "京浜東北線",
      "#00B2E5",
    ),
  ],

  /*
   * A09 다이몬
   */

  A09: [
    transfer(
      "oedo",
      "E",
      "도에이 오에도선",
      "都営大江戸線",
      "#CE045B",
    ),
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
      "게이힌도호쿠선",
      "京浜東北線",
      "#00B2E5",
    ),
  ],

  /*
   * A10 신바시
   */

  A10: [
    transfer(
      "ginza",
      "G",
      "긴자선",
      "銀座線",
      "#F39700",
    ),
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
      "게이힌도호쿠선",
      "京浜東北線",
      "#00B2E5",
    ),
    transfer(
      "tokaido",
      "JT",
      "도카이도선",
      "東海道線",
      "#F68B1E",
    ),
    transfer(
      "yokosuka-sobu",
      "JO",
      "요코스카선",
      "横須賀線",
      "#0074BE",
    ),
    transfer(
      "yurikamome",
      "U",
      "유리카모메",
      "ゆりかもめ",
      "#0067C0",
    ),
  ],

  /*
   * A11 히가시긴자
   */

  A11: [
    transfer(
      "hibiya",
      "H",
      "히비야선",
      "日比谷線",
      "#B5B5AC",
    ),
  ],

  /*
   * A13 니혼바시
   */

  A13: [
    transfer(
      "ginza",
      "G",
      "긴자선",
      "銀座線",
      "#F39700",
    ),
    transfer(
      "tozai",
      "T",
      "도자이선",
      "東西線",
      "#009BBF",
    ),
  ],

  /*
   * A14 닌교초
   */

  A14: [
    transfer(
      "hibiya",
      "H",
      "히비야선",
      "日比谷線",
      "#B5B5AC",
    ),
    transfer(
      "hanzomon",
      "Z",
      "한조몬선",
      "半蔵門線",
      "#8F76D6",
    ),
  ],

  /*
   * A15 히가시니혼바시
   */

  A15: [
    transfer(
      "shinjuku",
      "S",
      "도에이 신주쿠선",
      "都営新宿線",
      "#6CBB5A",
    ),
    transfer(
      "yokosuka-sobu",
      "JO",
      "JR 소부선 쾌속",
      "JR総武線快速",
      "#0074BE",
    ),
  ],

  /*
   * A16 아사쿠사바시
   */

  A16: [
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부선",
      "中央・総武線",
      "#FFD400",
    ),
  ],

  /*
   * A17 구라마에
   */

  A17: [
    transfer(
      "oedo",
      "E",
      "도에이 오에도선",
      "都営大江戸線",
      "#CE045B",
    ),
  ],

  /*
   * A18 아사쿠사
   */

  A18: [
    transfer(
      "ginza",
      "G",
      "긴자선",
      "銀座線",
      "#F39700",
    ),
    transfer(
      "tobu-skytree",
      "TS",
      "도부 스카이트리 라인",
      "東武スカイツリーライン",
      "#0067C0",
    ),
  ],

  /*
   * A20 오시아게
   */

  A20: [
    transfer(
      "hanzomon",
      "Z",
      "한조몬선",
      "半蔵門線",
      "#8F76D6",
    ),
    transfer(
      "keisei-oshiage",
      "KS",
      "게이세이 오시아게선",
      "京成押上線",
      "#005AAA",
    ),
    transfer(
      "tobu-skytree",
      "TS",
      "도부 스카이트리 라인",
      "東武スカイツリーライン",
      "#0067C0",
    ),
  ],
};

/*
 * =========================================================
 * NextStation
 * =========================================================
 */

const createNextStation = (
  station: AsakusaStationBase,
) => {
  return {
    id: station.id,

    code: station.id,

    nameKo: station.nameKo,

    nameJa: station.nameJa,

    lineId: "asakusa",

    lineCode: "A",

    lineNameKo: "도에이 아사쿠사선",

    color: ASAKUSA_COLOR,
  };
};

/*
 * =========================================================
 * Station[]
 * =========================================================
 */

export const asakusaStations: Station[] =
  ASAKUSA_STATION_BASE.map(
    (
      station,
      index,
      stations,
    ) => {
      const isNishiMagome =
        index === 0;

      const isOshiage =
        index === stations.length - 1;

      const nishiMagomeNext =
        index > 0
          ? stations[index - 1]
          : undefined;

      const oshiageNext =
        index < stations.length - 1
          ? stations[index + 1]
          : undefined;

      /*
       * =====================================================
       * A01 니시마고메
       * =====================================================
       */

      if (
        isNishiMagome &&
        oshiageNext
      ) {
        return {
          id: station.id,

          operatorId: "toei",

          lineId: "asakusa",

          lineCode: "A",

          lineNameKo: "도에이 아사쿠사선",

          lineNameJa: "都営浅草線",

          code: station.id,

          nameKo: station.nameKo,

          nameJa: station.nameJa,

          color: ASAKUSA_COLOR,

          type: "terminal",

          directions: [
            {
              id: "oshiage",

              label: "오시아게 방면",

              description:
                "→ 센가쿠지·신바시·니혼바시·아사쿠사·오시아게 방면",

              nextStations: [
                createNextStation(
                  oshiageNext,
                ),
              ],
            },
          ],

          transfers:
            TRANSFERS[station.id] ?? [],
        };
      }

      /*
       * =====================================================
       * A20 오시아게
       * =====================================================
       */

      if (
        isOshiage &&
        nishiMagomeNext
      ) {
        return {
          id: station.id,

          operatorId: "toei",

          lineId: "asakusa",

          lineCode: "A",

          lineNameKo: "도에이 아사쿠사선",

          lineNameJa: "都営浅草線",

          code: station.id,

          nameKo: station.nameKo,

          nameJa: station.nameJa,

          color: ASAKUSA_COLOR,

          type: "terminal",

          directions: [
            {
              id: "nishimagome",

              label: "니시마고메 방면",

              description:
                "→ 아사쿠사·니혼바시·신바시·센가쿠지·니시마고메 방면",

              nextStations: [
                createNextStation(
                  nishiMagomeNext,
                ),
              ],
            },
          ],

          transfers:
            TRANSFERS[station.id] ?? [],
        };
      }

      /*
       * =====================================================
       * 일반역
       * =====================================================
       */

      if (
        !nishiMagomeNext ||
        !oshiageNext
      ) {
        throw new Error(
          `아사쿠사선 다음역 생성 실패: ${station.id}`,
        );
      }

      return {
        id: station.id,

        operatorId: "toei",

        lineId: "asakusa",

        lineCode: "A",

        lineNameKo: "도에이 아사쿠사선",

        lineNameJa: "都営浅草線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: ASAKUSA_COLOR,

        type: "normal",

        directions: [
          /*
           * 니시마고메 방면
           */

          {
            id: "nishimagome",

            label: "니시마고메 방면",

            description:
              "→ 신바시·센가쿠지·니시마고메 방면",

            nextStations: [
              createNextStation(
                nishiMagomeNext,
              ),
            ],
          },

          /*
           * 오시아게 방면
           */

          {
            id: "oshiage",

            label: "오시아게 방면",

            description:
              "→ 니혼바시·아사쿠사·오시아게 방면",

            nextStations: [
              createNextStation(
                oshiageNext,
              ),
            ],
          },
        ],

        transfers:
          TRANSFERS[station.id] ?? [],
      };
    },
  );

/*
 * =========================================================
 * Registry fallback
 * =========================================================
 */

export const asakusaTrains: Record<
  string,
  Train[]
> = {};
