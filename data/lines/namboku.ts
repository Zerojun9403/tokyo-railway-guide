import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Tokyo Railway Guide
 * Tokyo Metro Namboku Line
 * 東京メトロ南北線
 * =========================================================
 *
 * N01 메구로
 * ↓
 * N19 아카바네이와부치
 *
 * meguro
 * = 메구로 방면
 *
 * akabaneiwabuchi
 * = 아카바네이와부치 방면
 *
 * =========================================================
 */

export const NAMBOKU_COLOR = "#00AC9B";

/*
 * =========================================================
 * 기본 역 타입
 * =========================================================
 */

type NambokuStationBase = {
  id: string;
  nameKo: string;
  nameJa: string;
};

/*
 * =========================================================
 * 난보쿠선 역 목록
 * =========================================================
 */

const NAMBOKU_STATION_BASE: NambokuStationBase[] = [
  {
    id: "N01",
    nameKo: "메구로",
    nameJa: "目黒",
  },
  {
    id: "N02",
    nameKo: "시로카네다이",
    nameJa: "白金台",
  },
  {
    id: "N03",
    nameKo: "시로카네타카나와",
    nameJa: "白金高輪",
  },
  {
    id: "N04",
    nameKo: "아자부주반",
    nameJa: "麻布十番",
  },
  {
    id: "N05",
    nameKo: "롯폰기잇초메",
    nameJa: "六本木一丁目",
  },
  {
    id: "N06",
    nameKo: "다메이케산노",
    nameJa: "溜池山王",
  },
  {
    id: "N07",
    nameKo: "나가타초",
    nameJa: "永田町",
  },
  {
    id: "N08",
    nameKo: "요쓰야",
    nameJa: "四ツ谷",
  },
  {
    id: "N09",
    nameKo: "이치가야",
    nameJa: "市ケ谷",
  },
  {
    id: "N10",
    nameKo: "이다바시",
    nameJa: "飯田橋",
  },
  {
    id: "N11",
    nameKo: "고라쿠엔",
    nameJa: "後楽園",
  },
  {
    id: "N12",
    nameKo: "도다이마에",
    nameJa: "東大前",
  },
  {
    id: "N13",
    nameKo: "혼코마고메",
    nameJa: "本駒込",
  },
  {
    id: "N14",
    nameKo: "고마고메",
    nameJa: "駒込",
  },
  {
    id: "N15",
    nameKo: "니시가하라",
    nameJa: "西ケ原",
  },
  {
    id: "N16",
    nameKo: "오지",
    nameJa: "王子",
  },
  {
    id: "N17",
    nameKo: "오지카미야",
    nameJa: "王子神谷",
  },
  {
    id: "N18",
    nameKo: "시모",
    nameJa: "志茂",
  },
  {
    id: "N19",
    nameKo: "아카바네이와부치",
    nameJa: "赤羽岩淵",
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
 * 환승 노선
 * =========================================================
 */

const TRANSFERS: Record<string, Transfer[]> = {
  /*
   * N01 메구로
   */

  N01: [
    transfer(
      "yamanote",
      "JY",
      "야마노테선",
      "山手線",
      "#80C41C",
    ),
    transfer(
      "tokyu-meguro",
      "MG",
      "도큐 메구로선",
      "東急目黒線",
      "#009CD2",
    ),
    transfer(
      "toei-mita",
      "I",
      "도에이 미타선",
      "都営三田線",
      "#0079C2",
    ),
  ],

  /*
   * N02 시로카네다이
   */

  N02: [
    transfer(
      "toei-mita",
      "I",
      "도에이 미타선",
      "都営三田線",
      "#0079C2",
    ),
  ],

  /*
   * N03 시로카네타카나와
   */

  N03: [
    transfer(
      "toei-mita",
      "I",
      "도에이 미타선",
      "都営三田線",
      "#0079C2",
    ),
  ],

  /*
   * N04 아자부주반
   */

  N04: [
    transfer(
      "oedo",
      "E",
      "도에이 오에도선",
      "都営大江戸線",
      "#CE045B",
    ),
  ],

  /*
   * N06 다메이케산노
   * 곳카이기지도마에 연결
   */

  N06: [
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
    transfer(
      "chiyoda",
      "C",
      "치요다선",
      "千代田線",
      "#00BB85",
    ),
  ],

  /*
   * N07 나가타초
   * 아카사카미쓰케 연결
   */

  N07: [
    transfer(
      "yurakucho",
      "Y",
      "유라쿠초선",
      "有楽町線",
      "#C1A470",
    ),
    transfer(
      "hanzomon",
      "Z",
      "한조몬선",
      "半蔵門線",
      "#8F76D6",
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
   * N08 요쓰야
   */

  N08: [
    transfer(
      "marunouchi",
      "M",
      "마루노우치선",
      "丸ノ内線",
      "#F62E36",
    ),
    transfer(
      "chuo-rapid",
      "JC",
      "주오선 쾌속",
      "中央線快速",
      "#F15A22",
    ),
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부선",
      "中央・総武線",
      "#FFD400",
    ),
  ],

  /*
   * N09 이치가야
   */

  N09: [
    transfer(
      "yurakucho",
      "Y",
      "유라쿠초선",
      "有楽町線",
      "#C1A470",
    ),
    transfer(
      "toei-shinjuku",
      "S",
      "도에이 신주쿠선",
      "都営新宿線",
      "#6CBB5A",
    ),
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부선",
      "中央・総武線",
      "#FFD400",
    ),
  ],

  /*
   * N10 이다바시
   */

  N10: [
    transfer(
      "tozai",
      "T",
      "도자이선",
      "東西線",
      "#009BBF",
    ),
    transfer(
      "yurakucho",
      "Y",
      "유라쿠초선",
      "有楽町線",
      "#C1A470",
    ),
    transfer(
      "oedo",
      "E",
      "도에이 오에도선",
      "都営大江戸線",
      "#CE045B",
    ),
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부선",
      "中央・総武線",
      "#FFD400",
    ),
  ],

  /*
   * N11 고라쿠엔
   */

  N11: [
    transfer(
      "marunouchi",
      "M",
      "마루노우치선",
      "丸ノ内線",
      "#F62E36",
    ),
    transfer(
      "toei-mita",
      "I",
      "도에이 미타선",
      "都営三田線",
      "#0079C2",
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
   * N14 고마고메
   */

  N14: [
    transfer(
      "yamanote",
      "JY",
      "야마노테선",
      "山手線",
      "#80C41C",
    ),
  ],

  /*
   * N16 오지
   */

  N16: [
    transfer(
      "keihin-tohoku",
      "JK",
      "게이힌도호쿠선",
      "京浜東北線",
      "#00B2E5",
    ),
    transfer(
      "toden-arakawa",
      "SA",
      "도덴 아라카와선",
      "都電荒川線",
      "#EE86A7",
    ),
  ],

  /*
   * N19 아카바네이와부치
   */

  N19: [
    transfer(
      "saitama-railway",
      "SR",
      "사이타마 고속철도선",
      "埼玉高速鉄道線",
      "#345C9E",
    ),
  ],
};

/*
 * =========================================================
 * NextStation
 * =========================================================
 */

const createNextStation = (
  station: NambokuStationBase,
) => {
  return {
    id: station.id,
    code: station.id,

    nameKo: station.nameKo,
    nameJa: station.nameJa,

    lineId: "namboku",
    lineCode: "N",

    lineNameKo: "난보쿠선",

    color: NAMBOKU_COLOR,
  };
};

/*
 * =========================================================
 * Station[]
 * =========================================================
 */

export const nambokuStations: Station[] =
  NAMBOKU_STATION_BASE.map(
    (
      station,
      index,
      stations,
    ) => {
      const isMeguro = index === 0;

      const isAkabaneIwabuchi =
        index === stations.length - 1;

      const meguroNext =
        index > 0
          ? stations[index - 1]
          : undefined;

      const akabaneIwabuchiNext =
        index < stations.length - 1
          ? stations[index + 1]
          : undefined;

      /*
       * =====================================================
       * N01 메구로
       * =====================================================
       */

      if (
        isMeguro &&
        akabaneIwabuchiNext
      ) {
        return {
          id: station.id,

          operatorId: "tokyo-metro",

          lineId: "namboku",
          lineCode: "N",

          lineNameKo: "난보쿠선",
          lineNameJa: "南北線",

          code: station.id,

          nameKo: station.nameKo,
          nameJa: station.nameJa,

          color: NAMBOKU_COLOR,

          type: "terminal",

          directions: [
            {
              id: "akabaneiwabuchi",

              label:
                "아카바네이와부치 방면",

              description:
                "→ 나가타초·이다바시·고마고메·아카바네이와부치 방면",

              nextStations: [
                createNextStation(
                  akabaneIwabuchiNext,
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
       * N19 아카바네이와부치
       * =====================================================
       */

      if (
        isAkabaneIwabuchi &&
        meguroNext
      ) {
        return {
          id: station.id,

          operatorId: "tokyo-metro",

          lineId: "namboku",
          lineCode: "N",

          lineNameKo: "난보쿠선",
          lineNameJa: "南北線",

          code: station.id,

          nameKo: station.nameKo,
          nameJa: station.nameJa,

          color: NAMBOKU_COLOR,

          type: "terminal",

          directions: [
            {
              id: "meguro",

              label: "메구로 방면",

              description:
                "→ 고마고메·이다바시·나가타초·메구로 방면",

              nextStations: [
                createNextStation(
                  meguroNext,
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
        !meguroNext ||
        !akabaneIwabuchiNext
      ) {
        throw new Error(
          `난보쿠선 다음역 생성 실패: ${station.id}`,
        );
      }

      return {
        id: station.id,

        operatorId: "tokyo-metro",

        lineId: "namboku",
        lineCode: "N",

        lineNameKo: "난보쿠선",
        lineNameJa: "南北線",

        code: station.id,

        nameKo: station.nameKo,
        nameJa: station.nameJa,

        color: NAMBOKU_COLOR,

        type: "normal",

        directions: [
          {
            id: "meguro",

            label: "메구로 방면",

            description:
              "→ 이다바시·나가타초·메구로 방면",

            nextStations: [
              createNextStation(
                meguroNext,
              ),
            ],
          },

          {
            id: "akabaneiwabuchi",

            label:
              "아카바네이와부치 방면",

            description:
              "→ 이다바시·고마고메·오지·아카바네이와부치 방면",

            nextStations: [
              createNextStation(
                akabaneIwabuchiNext,
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

export const nambokuTrains: Record<
  string,
  Train[]
> = {};