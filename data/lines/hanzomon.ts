import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Tokyo Railway Guide
 * Tokyo Metro Hanzomon Line
 * 東京メトロ半蔵門線
 * =========================================================
 *
 * Z01 시부야
 * ↓
 * Z14 오시아게〈스카이트리마에〉
 *
 * shibuya
 * = 시부야 방면
 *
 * oshiage
 * = 오시아게 방면
 *
 * =========================================================
 */

export const HANZOMON_COLOR = "#8F76D6";

/*
 * =========================================================
 * 기본 역 타입
 * =========================================================
 */

type HanzomonStationBase = {
  id: string;

  nameKo: string;

  nameJa: string;
};

/*
 * =========================================================
 * 한조몬선 역 목록
 * =========================================================
 */

const HANZOMON_STATION_BASE: HanzomonStationBase[] = [
  {
    id: "Z01",
    nameKo: "시부야",
    nameJa: "渋谷",
  },
  {
    id: "Z02",
    nameKo: "오모테산도",
    nameJa: "表参道",
  },
  {
    id: "Z03",
    nameKo: "아오야마잇초메",
    nameJa: "青山一丁目",
  },
  {
    id: "Z04",
    nameKo: "나가타초",
    nameJa: "永田町",
  },
  {
    id: "Z05",
    nameKo: "한조몬",
    nameJa: "半蔵門",
  },
  {
    id: "Z06",
    nameKo: "구단시타",
    nameJa: "九段下",
  },
  {
    id: "Z07",
    nameKo: "진보초",
    nameJa: "神保町",
  },
  {
    id: "Z08",
    nameKo: "오테마치",
    nameJa: "大手町",
  },
  {
    id: "Z09",
    nameKo: "미쓰코시마에",
    nameJa: "三越前",
  },
  {
    id: "Z10",
    nameKo: "스이텐구마에",
    nameJa: "水天宮前",
  },
  {
    id: "Z11",
    nameKo: "기요스미시라카와",
    nameJa: "清澄白河",
  },
  {
    id: "Z12",
    nameKo: "스미요시",
    nameJa: "住吉",
  },
  {
    id: "Z13",
    nameKo: "긴시초",
    nameJa: "錦糸町",
  },
  {
    id: "Z14",
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
   * Z01 시부야
   */

  Z01: [
    transfer(
      "ginza",
      "G",
      "긴자선",
      "銀座線",
      "#F39700",
    ),
    transfer(
      "fukutoshin",
      "F",
      "후쿠토신선",
      "副都心線",
      "#9C5E31",
    ),
    transfer(
      "yamanote",
      "JY",
      "야마노테선",
      "山手線",
      "#80C41C",
    ),
    transfer(
      "saikyo",
      "JA",
      "사이쿄선",
      "埼京線",
      "#00AC9A",
    ),
    transfer(
      "tokyu-toyoko",
      "TY",
      "도큐 도요코선",
      "東急東横線",
      "#DA0442",
    ),
    transfer(
      "tokyu-den-en-toshi",
      "DT",
      "도큐 덴엔토시선",
      "東急田園都市線",
      "#20A288",
    ),
  ],

  /*
   * Z02 오모테산도
   */

  Z02: [
    transfer(
      "ginza",
      "G",
      "긴자선",
      "銀座線",
      "#F39700",
    ),
    transfer(
      "chiyoda",
      "C",
      "치요다선",
      "千代田線",
      "#00BB85",
    ),
  ],

  /*
   * Z03 아오야마잇초메
   */

  Z03: [
    transfer(
      "ginza",
      "G",
      "긴자선",
      "銀座線",
      "#F39700",
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
   * Z04 나가타초
   *
   * 아카사카미쓰케역과 환승 연결
   */

  Z04: [
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
      "ginza",
      "G",
      "긴자선",
      "銀座線",
      "#F39700",
    ),
    transfer(
      "marunouchi",
      "M",
      "마루노우치선",
      "丸ノ内線",
      "#F62E36",
    ),
  ],

  /*
   * Z06 구단시타
   */

  Z06: [
    transfer(
      "tozai",
      "T",
      "도자이선",
      "東西線",
      "#009BBF",
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
   * Z07 진보초
   */

  Z07: [
    transfer(
      "mita",
      "I",
      "도에이 미타선",
      "都営三田線",
      "#0079C2",
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
   * Z08 오테마치
   */

  Z08: [
    transfer(
      "marunouchi",
      "M",
      "마루노우치선",
      "丸ノ内線",
      "#F62E36",
    ),
    transfer(
      "tozai",
      "T",
      "도자이선",
      "東西線",
      "#009BBF",
    ),
    transfer(
      "chiyoda",
      "C",
      "치요다선",
      "千代田線",
      "#00BB85",
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
   * Z09 미쓰코시마에
   */

  Z09: [
    transfer(
      "ginza",
      "G",
      "긴자선",
      "銀座線",
      "#F39700",
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
   * Z10 스이텐구마에
   *
   * 닌교초역과 환승 연결
   */

  Z10: [
    transfer(
      "hibiya",
      "H",
      "히비야선",
      "日比谷線",
      "#B5B5AC",
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
   * Z11 기요스미시라카와
   */

  Z11: [
    transfer(
      "oedo",
      "E",
      "도에이 오에도선",
      "都営大江戸線",
      "#CE045B",
    ),
  ],

  /*
   * Z12 스미요시
   */

  Z12: [
    transfer(
      "shinjuku",
      "S",
      "도에이 신주쿠선",
      "都営新宿線",
      "#6CBB5A",
    ),
  ],

  /*
   * Z13 긴시초
   */

  Z13: [
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부선",
      "中央・総武線",
      "#FFD400",
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
   * Z14 오시아게
   */

  Z14: [
    transfer(
      "asakusa",
      "A",
      "도에이 아사쿠사선",
      "都営浅草線",
      "#E85298",
    ),
    transfer(
      "tobu-skytree",
      "TS",
      "도부 스카이트리 라인",
      "東武スカイツリーライン",
      "#0067C0",
    ),
    transfer(
      "keisei-oshiage",
      "KS",
      "게이세이 오시아게선",
      "京成押上線",
      "#005AAA",
    ),
  ],
};

/*
 * =========================================================
 * NextStation
 * =========================================================
 */

const createNextStation = (
  station: HanzomonStationBase,
) => {
  return {
    id: station.id,

    code: station.id,

    nameKo: station.nameKo,

    nameJa: station.nameJa,

    lineId: "hanzomon",

    lineCode: "Z",

    lineNameKo: "한조몬선",

    color: HANZOMON_COLOR,
  };
};

/*
 * =========================================================
 * Station[]
 * =========================================================
 */

export const hanzomonStations: Station[] =
  HANZOMON_STATION_BASE.map(
    (
      station,
      index,
      stations,
    ) => {
      const isShibuya =
        index === 0;

      const isOshiage =
        index === stations.length - 1;

      const shibuyaNext =
        index > 0
          ? stations[index - 1]
          : undefined;

      const oshiageNext =
        index < stations.length - 1
          ? stations[index + 1]
          : undefined;

      /*
       * =====================================================
       * Z01 시부야
       * =====================================================
       */

      if (
        isShibuya &&
        oshiageNext
      ) {
        return {
          id: station.id,

          operatorId: "tokyo-metro",

          lineId: "hanzomon",

          lineCode: "Z",

          lineNameKo: "한조몬선",

          lineNameJa: "半蔵門線",

          code: station.id,

          nameKo: station.nameKo,

          nameJa: station.nameJa,

          color: HANZOMON_COLOR,

          type: "terminal",

          directions: [
            {
              id: "oshiage",

              label: "오시아게 방면",

              description:
                "→ 오모테산도·오테마치·긴시초·오시아게 방면",

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
       * Z14 오시아게
       * =====================================================
       */

      if (
        isOshiage &&
        shibuyaNext
      ) {
        return {
          id: station.id,

          operatorId: "tokyo-metro",

          lineId: "hanzomon",

          lineCode: "Z",

          lineNameKo: "한조몬선",

          lineNameJa: "半蔵門線",

          code: station.id,

          nameKo: station.nameKo,

          nameJa: station.nameJa,

          color: HANZOMON_COLOR,

          type: "terminal",

          directions: [
            {
              id: "shibuya",

              label: "시부야 방면",

              description:
                "→ 긴시초·오테마치·오모테산도·시부야 방면",

              nextStations: [
                createNextStation(
                  shibuyaNext,
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
        !shibuyaNext ||
        !oshiageNext
      ) {
        throw new Error(
          `한조몬선 다음역 생성 실패: ${station.id}`,
        );
      }

      return {
        id: station.id,

        operatorId: "tokyo-metro",

        lineId: "hanzomon",

        lineCode: "Z",

        lineNameKo: "한조몬선",

        lineNameJa: "半蔵門線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: HANZOMON_COLOR,

        type: "normal",

        directions: [
          /*
           * 시부야 방면
           */

          {
            id: "shibuya",

            label: "시부야 방면",

            description:
              "→ 오테마치·나가타초·오모테산도·시부야 방면",

            nextStations: [
              createNextStation(
                shibuyaNext,
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
              "→ 오테마치·긴시초·오시아게 방면",

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

export const hanzomonTrains: Record<
  string,
  Train[]
> = {};
