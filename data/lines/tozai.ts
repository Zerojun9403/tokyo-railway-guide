import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Tokyo Railway Guide
 * Tokyo Metro Tozai Line
 * 東京メトロ東西線
 * =========================================================
 *
 * T01 나카노
 * ↓
 * T23 니시후나바시
 *
 * nakano
 * = 나카노 방면
 *
 * nishifunabashi
 * = 니시후나바시 방면
 *
 * =========================================================
 */

export const TOZAI_COLOR = "#009BBF";

/*
 * =========================================================
 * 기본 역 타입
 * =========================================================
 */

type TozaiStationBase = {
  id: string;

  nameKo: string;

  nameJa: string;
};

/*
 * =========================================================
 * 도자이선 역 목록
 * =========================================================
 */

const TOZAI_STATION_BASE: TozaiStationBase[] = [
  {
    id: "T01",
    nameKo: "나카노",
    nameJa: "中野",
  },
  {
    id: "T02",
    nameKo: "오치아이",
    nameJa: "落合",
  },
  {
    id: "T03",
    nameKo: "다카다노바바",
    nameJa: "高田馬場",
  },
  {
    id: "T04",
    nameKo: "와세다",
    nameJa: "早稲田",
  },
  {
    id: "T05",
    nameKo: "가구라자카",
    nameJa: "神楽坂",
  },
  {
    id: "T06",
    nameKo: "이다바시",
    nameJa: "飯田橋",
  },
  {
    id: "T07",
    nameKo: "구단시타",
    nameJa: "九段下",
  },
  {
    id: "T08",
    nameKo: "다케바시",
    nameJa: "竹橋",
  },
  {
    id: "T09",
    nameKo: "오테마치",
    nameJa: "大手町",
  },
  {
    id: "T10",
    nameKo: "니혼바시",
    nameJa: "日本橋",
  },
  {
    id: "T11",
    nameKo: "가야바초",
    nameJa: "茅場町",
  },
  {
    id: "T12",
    nameKo: "몬젠나카초",
    nameJa: "門前仲町",
  },
  {
    id: "T13",
    nameKo: "기바",
    nameJa: "木場",
  },
  {
    id: "T14",
    nameKo: "도요초",
    nameJa: "東陽町",
  },
  {
    id: "T15",
    nameKo: "미나미스나마치",
    nameJa: "南砂町",
  },
  {
    id: "T16",
    nameKo: "니시카사이",
    nameJa: "西葛西",
  },
  {
    id: "T17",
    nameKo: "카사이",
    nameJa: "葛西",
  },
  {
    id: "T18",
    nameKo: "우라야스",
    nameJa: "浦安",
  },
  {
    id: "T19",
    nameKo: "미나미교토쿠",
    nameJa: "南行徳",
  },
  {
    id: "T20",
    nameKo: "교토쿠",
    nameJa: "行徳",
  },
  {
    id: "T21",
    nameKo: "묘덴",
    nameJa: "妙典",
  },
  {
    id: "T22",
    nameKo: "바라키나카야마",
    nameJa: "原木中山",
  },
  {
    id: "T23",
    nameKo: "니시후나바시",
    nameJa: "西船橋",
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
   * T01 나카노
   */

  T01: [
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부선",
      "中央・総武線",
      "#FFD400",
    ),
  ],

  /*
   * T03 다카다노바바
   */

  T03: [
    transfer(
      "yamanote",
      "JY",
      "야마노테선",
      "山手線",
      "#80C41C",
    ),
    transfer(
      "seibu-shinjuku",
      "SS",
      "세이부 신주쿠선",
      "西武新宿線",
      "#00A6BF",
    ),
  ],

  /*
   * T06 이다바시
   */

  T06: [
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부선",
      "中央・総武線",
      "#FFD400",
    ),
    transfer(
      "yurakucho",
      "Y",
      "유라쿠초선",
      "有楽町線",
      "#C1A470",
    ),
    transfer(
      "namboku",
      "N",
      "난보쿠선",
      "南北線",
      "#00AC9B",
    ),
    transfer(
      "oedo",
      "E",
      "도에이 오에도선",
      "都営大江戸線",
      "#CE045B",
    ),
  ],

  /*
   * T07 구단시타
   */

  T07: [
    transfer(
      "hanzomon",
      "Z",
      "한조몬선",
      "半蔵門線",
      "#8F76D6",
    ),
    transfer(
      "shinjuku",
      "S",
      "도에이 신주쿠선",
      "都営新宿線",
      "#6CBB5A",
    ),
  ],

  /*
   * T09 오테마치
   */

  T09: [
    transfer(
      "marunouchi",
      "M",
      "마루노우치선",
      "丸ノ内線",
      "#F62E36",
    ),
    transfer(
      "chiyoda",
      "C",
      "지요다선",
      "千代田線",
      "#00BB85",
    ),
    transfer(
      "hanzomon",
      "Z",
      "한조몬선",
      "半蔵門線",
      "#8F76D6",
    ),
    transfer(
      "mita",
      "I",
      "도에이 미타선",
      "都営三田線",
      "#0079C2",
    ),
  ],

  /*
   * T10 니혼바시
   */

  T10: [
    transfer(
      "ginza",
      "G",
      "긴자선",
      "銀座線",
      "#F39700",
    ),
    transfer(
      "asakusa",
      "A",
      "도에이 아사쿠사선",
      "都営浅草線",
      "#E85298",
    ),
  ],

  /*
   * T11 가야바초
   */

  T11: [
    transfer(
      "hibiya",
      "H",
      "히비야선",
      "日比谷線",
      "#B5B5AC",
    ),
  ],

  /*
   * T12 몬젠나카초
   */

  T12: [
    transfer(
      "oedo",
      "E",
      "도에이 오에도선",
      "都営大江戸線",
      "#CE045B",
    ),
  ],

  /*
   * T23 니시후나바시
   */

  T23: [
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부선",
      "中央・総武線",
      "#FFD400",
    ),
    transfer(
      "musashino",
      "JM",
      "무사시노선",
      "武蔵野線",
      "#F15A22",
    ),
    transfer(
      "keiyo",
      "JE",
      "게이요선",
      "京葉線",
      "#C9252F",
    ),
    transfer(
      "toyo-rapid",
      "TR",
      "도요고속선",
      "東葉高速線",
      "#3FB5E5",
    ),
  ],
};

/*
 * =========================================================
 * NextStation
 * =========================================================
 */

const createNextStation = (
  station: TozaiStationBase,
) => {
  return {
    id: station.id,

    code: station.id,

    nameKo: station.nameKo,

    nameJa: station.nameJa,

    lineId: "tozai",

    lineCode: "T",

    lineNameKo: "도자이선",

    color: TOZAI_COLOR,
  };
};

/*
 * =========================================================
 * Station[]
 * =========================================================
 */

export const tozaiStations: Station[] =
  TOZAI_STATION_BASE.map(
    (
      station,
      index,
      stations,
    ) => {
      const isNakano =
        index === 0;

      const isNishiFunabashi =
        index === stations.length - 1;

      const nakanoNext =
        index > 0
          ? stations[index - 1]
          : undefined;

      const nishiFunabashiNext =
        index < stations.length - 1
          ? stations[index + 1]
          : undefined;

      /*
       * =====================================================
       * T01 나카노
       * =====================================================
       */

      if (
        isNakano &&
        nishiFunabashiNext
      ) {
        return {
          id: station.id,

          operatorId: "tokyo-metro",

          lineId: "tozai",

          lineCode: "T",

          lineNameKo: "도자이선",

          lineNameJa: "東西線",

          code: station.id,

          nameKo: station.nameKo,

          nameJa: station.nameJa,

          color: TOZAI_COLOR,

          type: "terminal",

          directions: [
            {
              id: "nishifunabashi",

              label: "니시후나바시 방면",

              description:
                "→ 오테마치·우라야스·니시후나바시 방면",

              nextStations: [
                createNextStation(
                  nishiFunabashiNext,
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
       * T23 니시후나바시
       * =====================================================
       */

      if (
        isNishiFunabashi &&
        nakanoNext
      ) {
        return {
          id: station.id,

          operatorId: "tokyo-metro",

          lineId: "tozai",

          lineCode: "T",

          lineNameKo: "도자이선",

          lineNameJa: "東西線",

          code: station.id,

          nameKo: station.nameKo,

          nameJa: station.nameJa,

          color: TOZAI_COLOR,

          type: "terminal",

          directions: [
            {
              id: "nakano",

              label: "나카노 방면",

              description:
                "→ 오테마치·다카다노바바·나카노 방면",

              nextStations: [
                createNextStation(
                  nakanoNext,
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
        !nakanoNext ||
        !nishiFunabashiNext
      ) {
        throw new Error(
          `도자이선 다음역 생성 실패: ${station.id}`,
        );
      }

      return {
        id: station.id,

        operatorId: "tokyo-metro",

        lineId: "tozai",

        lineCode: "T",

        lineNameKo: "도자이선",

        lineNameJa: "東西線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: TOZAI_COLOR,

        type: "normal",

        directions: [
          /*
           * 나카노 방면
           */

          {
            id: "nakano",

            label: "나카노 방면",

            description:
              "→ 오테마치·다카다노바바·나카노 방면",

            nextStations: [
              createNextStation(
                nakanoNext,
              ),
            ],
          },

          /*
           * 니시후나바시 방면
           */

          {
            id: "nishifunabashi",

            label: "니시후나바시 방면",

            description:
              "→ 오테마치·우라야스·니시후나바시 방면",

            nextStations: [
              createNextStation(
                nishiFunabashiNext,
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

export const tozaiTrains: Record<
  string,
  Train[]
> = {};
