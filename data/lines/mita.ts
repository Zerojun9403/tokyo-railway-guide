import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Tokyo Railway Guide
 * Toei Mita Line
 * 都営三田線
 * =========================================================
 *
 * I01 메구로
 * ↓
 * I27 니시타카시마다이라
 *
 * meguro
 * = 메구로 방면
 *
 * nishitakashimadaira
 * = 니시타카시마다이라 방면
 *
 * =========================================================
 */

export const MITA_COLOR = "#0079C2";

/*
 * =========================================================
 * 기본 역 타입
 * =========================================================
 */

type MitaStationBase = {
  id: string;
  nameKo: string;
  nameJa: string;
};

/*
 * =========================================================
 * 미타선 역 목록
 * =========================================================
 */

const MITA_STATION_BASE: MitaStationBase[] = [
  {
    id: "I01",
    nameKo: "메구로",
    nameJa: "目黒",
  },
  {
    id: "I02",
    nameKo: "시로카네다이",
    nameJa: "白金台",
  },
  {
    id: "I03",
    nameKo: "시로카네타카나와",
    nameJa: "白金高輪",
  },
  {
    id: "I04",
    nameKo: "미타",
    nameJa: "三田",
  },
  {
    id: "I05",
    nameKo: "시바코엔",
    nameJa: "芝公園",
  },
  {
    id: "I06",
    nameKo: "오나리몬",
    nameJa: "御成門",
  },
  {
    id: "I07",
    nameKo: "우치사이와이초",
    nameJa: "内幸町",
  },
  {
    id: "I08",
    nameKo: "히비야",
    nameJa: "日比谷",
  },
  {
    id: "I09",
    nameKo: "오테마치",
    nameJa: "大手町",
  },
  {
    id: "I10",
    nameKo: "진보초",
    nameJa: "神保町",
  },
  {
    id: "I11",
    nameKo: "스이도바시",
    nameJa: "水道橋",
  },
  {
    id: "I12",
    nameKo: "가스가",
    nameJa: "春日",
  },
  {
    id: "I13",
    nameKo: "하쿠산",
    nameJa: "白山",
  },
  {
    id: "I14",
    nameKo: "센고쿠",
    nameJa: "千石",
  },
  {
    id: "I15",
    nameKo: "스가모",
    nameJa: "巣鴨",
  },
  {
    id: "I16",
    nameKo: "니시스가모",
    nameJa: "西巣鴨",
  },
  {
    id: "I17",
    nameKo: "신이타바시",
    nameJa: "新板橋",
  },
  {
    id: "I18",
    nameKo: "이타바시쿠야쿠쇼마에",
    nameJa: "板橋区役所前",
  },
  {
    id: "I19",
    nameKo: "이타바시혼초",
    nameJa: "板橋本町",
  },
  {
    id: "I20",
    nameKo: "모토하스누마",
    nameJa: "本蓮沼",
  },
  {
    id: "I21",
    nameKo: "시무라사카우에",
    nameJa: "志村坂上",
  },
  {
    id: "I22",
    nameKo: "시무라산초메",
    nameJa: "志村三丁目",
  },
  {
    id: "I23",
    nameKo: "하스네",
    nameJa: "蓮根",
  },
  {
    id: "I24",
    nameKo: "니시다이",
    nameJa: "西台",
  },
  {
    id: "I25",
    nameKo: "다카시마다이라",
    nameJa: "高島平",
  },
  {
    id: "I26",
    nameKo: "신타카시마다이라",
    nameJa: "新高島平",
  },
  {
    id: "I27",
    nameKo: "니시타카시마다이라",
    nameJa: "西高島平",
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
  I01: [
    transfer(
      "yamanote",
      "JY",
      "야마노테선",
      "山手線",
      "#80C41C",
    ),
    transfer(
      "namboku",
      "N",
      "난보쿠선",
      "南北線",
      "#00AC9B",
    ),
    transfer(
      "tokyu-meguro",
      "MG",
      "도큐 메구로선",
      "東急目黒線",
      "#009CD2",
    ),
  ],

  I02: [
    transfer(
      "namboku",
      "N",
      "난보쿠선",
      "南北線",
      "#00AC9B",
    ),
  ],

  I03: [
    transfer(
      "namboku",
      "N",
      "난보쿠선",
      "南北線",
      "#00AC9B",
    ),
  ],

  I04: [
    transfer(
      "asakusa",
      "A",
      "도에이 아사쿠사선",
      "都営浅草線",
      "#E85298",
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

  I08: [
    transfer(
      "hibiya",
      "H",
      "히비야선",
      "日比谷線",
      "#B5B5AC",
    ),
    transfer(
      "chiyoda",
      "C",
      "치요다선",
      "千代田線",
      "#00BB85",
    ),
    transfer(
      "yurakucho",
      "Y",
      "유라쿠초선",
      "有楽町線",
      "#C1A470",
    ),
  ],

  I09: [
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
      "hanzomon",
      "Z",
      "한조몬선",
      "半蔵門線",
      "#8F76D6",
    ),
  ],

  I10: [
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

  I11: [
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부선",
      "中央・総武線",
      "#FFD400",
    ),
  ],

  I12: [
    transfer(
      "oedo",
      "E",
      "도에이 오에도선",
      "都営大江戸線",
      "#CE045B",
    ),
    transfer(
      "marunouchi",
      "M",
      "마루노우치선",
      "丸ノ内線",
      "#F62E36",
    ),
    transfer(
      "namboku",
      "N",
      "난보쿠선",
      "南北線",
      "#00AC9B",
    ),
  ],

  I15: [
    transfer(
      "yamanote",
      "JY",
      "야마노테선",
      "山手線",
      "#80C41C",
    ),
  ],
};

/*
 * =========================================================
 * NextStation
 * =========================================================
 */

const createNextStation = (
  station: MitaStationBase,
) => {
  return {
    id: station.id,

    code: station.id,

    nameKo: station.nameKo,

    nameJa: station.nameJa,

    lineId: "mita",

    lineCode: "I",

    lineNameKo: "도에이 미타선",

    color: MITA_COLOR,
  };
};

/*
 * =========================================================
 * Station[]
 * =========================================================
 */

export const mitaStations: Station[] =
  MITA_STATION_BASE.map(
    (
      station,
      index,
      stations,
    ) => {
      const isMeguro =
        index === 0;

      const isNishiTakashimadaira =
        index === stations.length - 1;

      const meguroNext =
        index > 0
          ? stations[index - 1]
          : undefined;

      const nishiTakashimadairaNext =
        index < stations.length - 1
          ? stations[index + 1]
          : undefined;

      /*
       * =====================================================
       * I01 메구로
       * =====================================================
       */

      if (
        isMeguro &&
        nishiTakashimadairaNext
      ) {
        return {
          id: station.id,

          operatorId: "toei",

          lineId: "mita",

          lineCode: "I",

          lineNameKo: "도에이 미타선",

          lineNameJa: "都営三田線",

          code: station.id,

          nameKo: station.nameKo,

          nameJa: station.nameJa,

          color: MITA_COLOR,

          type: "terminal",

          directions: [
            {
              id: "nishitakashimadaira",

              label: "니시타카시마다이라 방면",

              description:
                "→ 미타·오테마치·스가모·니시타카시마다이라 방면",

              nextStations: [
                createNextStation(
                  nishiTakashimadairaNext,
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
       * I27 니시타카시마다이라
       * =====================================================
       */

      if (
        isNishiTakashimadaira &&
        meguroNext
      ) {
        return {
          id: station.id,

          operatorId: "toei",

          lineId: "mita",

          lineCode: "I",

          lineNameKo: "도에이 미타선",

          lineNameJa: "都営三田線",

          code: station.id,

          nameKo: station.nameKo,

          nameJa: station.nameJa,

          color: MITA_COLOR,

          type: "terminal",

          directions: [
            {
              id: "meguro",

              label: "메구로 방면",

              description:
                "→ 스가모·오테마치·미타·메구로 방면",

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
        !nishiTakashimadairaNext
      ) {
        throw new Error(
          `미타선 다음역 생성 실패: ${station.id}`,
        );
      }

      return {
        id: station.id,

        operatorId: "toei",

        lineId: "mita",

        lineCode: "I",

        lineNameKo: "도에이 미타선",

        lineNameJa: "都営三田線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: MITA_COLOR,

        type: "normal",

        directions: [
          {
            id: "meguro",

            label: "메구로 방면",

            description:
              "→ 오테마치·미타·메구로 방면",

            nextStations: [
              createNextStation(
                meguroNext,
              ),
            ],
          },

          {
            id: "nishitakashimadaira",

            label: "니시타카시마다이라 방면",

            description:
              "→ 스가모·다카시마다이라·니시타카시마다이라 방면",

            nextStations: [
              createNextStation(
                nishiTakashimadairaNext,
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

export const mitaTrains: Record<
  string,
  Train[]
> = {};
