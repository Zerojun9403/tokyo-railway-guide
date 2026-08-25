import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Tokyo Railway Guide
 * Toei Shinjuku Line
 * 都営新宿線
 * =========================================================
 *
 * S01 신주쿠
 * ↓
 * S21 모토야와타
 *
 * shinjuku
 * = 신주쿠 방면
 *
 * motoyawata
 * = 모토야와타 방면
 *
 * =========================================================
 */

export const SHINJUKU_COLOR = "#6CBB5A";

/*
 * =========================================================
 * 기본 역 타입
 * =========================================================
 */

type ShinjukuStationBase = {
  id: string;
  nameKo: string;
  nameJa: string;
};

/*
 * =========================================================
 * 신주쿠선 역 목록
 * =========================================================
 */

const SHINJUKU_STATION_BASE: ShinjukuStationBase[] = [
  {
    id: "S01",
    nameKo: "신주쿠",
    nameJa: "新宿",
  },
  {
    id: "S02",
    nameKo: "신주쿠산초메",
    nameJa: "新宿三丁目",
  },
  {
    id: "S03",
    nameKo: "아케보노바시",
    nameJa: "曙橋",
  },
  {
    id: "S04",
    nameKo: "이치가야",
    nameJa: "市ヶ谷",
  },
  {
    id: "S05",
    nameKo: "구단시타",
    nameJa: "九段下",
  },
  {
    id: "S06",
    nameKo: "진보초",
    nameJa: "神保町",
  },
  {
    id: "S07",
    nameKo: "오가와마치",
    nameJa: "小川町",
  },
  {
    id: "S08",
    nameKo: "이와모토초",
    nameJa: "岩本町",
  },
  {
    id: "S09",
    nameKo: "바쿠로요코야마",
    nameJa: "馬喰横山",
  },
  {
    id: "S10",
    nameKo: "하마초",
    nameJa: "浜町",
  },
  {
    id: "S11",
    nameKo: "모리시타",
    nameJa: "森下",
  },
  {
    id: "S12",
    nameKo: "기쿠카와",
    nameJa: "菊川",
  },
  {
    id: "S13",
    nameKo: "스미요시",
    nameJa: "住吉",
  },
  {
    id: "S14",
    nameKo: "니시오지마",
    nameJa: "西大島",
  },
  {
    id: "S15",
    nameKo: "오지마",
    nameJa: "大島",
  },
  {
    id: "S16",
    nameKo: "히가시오지마",
    nameJa: "東大島",
  },
  {
    id: "S17",
    nameKo: "후나보리",
    nameJa: "船堀",
  },
  {
    id: "S18",
    nameKo: "이치노에",
    nameJa: "一之江",
  },
  {
    id: "S19",
    nameKo: "미즈에",
    nameJa: "瑞江",
  },
  {
    id: "S20",
    nameKo: "시노자키",
    nameJa: "篠崎",
  },
  {
    id: "S21",
    nameKo: "모토야와타",
    nameJa: "本八幡",
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
  S01: [
    transfer(
      "yamanote",
      "JY",
      "야마노테선",
      "山手線",
      "#80C41C",
    ),
    transfer(
      "chuo-rapid",
      "JC",
      "주오 쾌속선",
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
    transfer(
      "oedo",
      "E",
      "도에이 오에도선",
      "都営大江戸線",
      "#CE045B",
    ),
  ],

  S02: [
    transfer(
      "marunouchi",
      "M",
      "마루노우치선",
      "丸ノ内線",
      "#F62E36",
    ),
    transfer(
      "fukutoshin",
      "F",
      "후쿠토신선",
      "副都心線",
      "#9C5E31",
    ),
  ],

  S04: [
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
  ],

  S05: [
    transfer(
      "tozai",
      "T",
      "도자이선",
      "東西線",
      "#009BBF",
    ),
    transfer(
      "hanzomon",
      "Z",
      "한조몬선",
      "半蔵門線",
      "#8F76D6",
    ),
  ],

  S06: [
    transfer(
      "mita",
      "I",
      "도에이 미타선",
      "都営三田線",
      "#0079C2",
    ),
    transfer(
      "hanzomon",
      "Z",
      "한조몬선",
      "半蔵門線",
      "#8F76D6",
    ),
  ],

  S07: [
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

  S08: [
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
      "chuo-sobu-local",
      "JB",
      "주오·소부선",
      "中央・総武線",
      "#FFD400",
    ),
    transfer(
      "hibiya",
      "H",
      "히비야선",
      "日比谷線",
      "#B5B5AC",
    ),
  ],

  S09: [
    transfer(
      "asakusa",
      "A",
      "도에이 아사쿠사선",
      "都営浅草線",
      "#E85298",
    ),
  ],

  S11: [
    transfer(
      "oedo",
      "E",
      "도에이 오에도선",
      "都営大江戸線",
      "#CE045B",
    ),
  ],

  S13: [
    transfer(
      "hanzomon",
      "Z",
      "한조몬선",
      "半蔵門線",
      "#8F76D6",
    ),
  ],

  S21: [
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부선",
      "中央・総武線",
      "#FFD400",
    ),
  ],
};

/*
 * =========================================================
 * NextStation
 * =========================================================
 */

const createNextStation = (
  station: ShinjukuStationBase,
) => {
  return {
    id: station.id,

    code: station.id,

    nameKo: station.nameKo,

    nameJa: station.nameJa,

    lineId: "shinjuku",

    lineCode: "S",

    lineNameKo: "도에이 신주쿠선",

    color: SHINJUKU_COLOR,
  };
};

/*
 * =========================================================
 * Station[]
 * =========================================================
 */

export const shinjukuStations: Station[] =
  SHINJUKU_STATION_BASE.map(
    (
      station,
      index,
      stations,
    ) => {
      const isShinjuku =
        index === 0;

      const isMotoyawata =
        index === stations.length - 1;

      const shinjukuNext =
        index > 0
          ? stations[index - 1]
          : undefined;

      const motoyawataNext =
        index < stations.length - 1
          ? stations[index + 1]
          : undefined;

      /*
       * =====================================================
       * S01 신주쿠
       * =====================================================
       */

      if (
        isShinjuku &&
        motoyawataNext
      ) {
        return {
          id: station.id,

          operatorId: "toei",

          lineId: "shinjuku",

          lineCode: "S",

          lineNameKo: "도에이 신주쿠선",

          lineNameJa: "都営新宿線",

          code: station.id,

          nameKo: station.nameKo,

          nameJa: station.nameJa,

          color: SHINJUKU_COLOR,

          type: "terminal",

          directions: [
            {
              id: "motoyawata",

              label: "모토야와타 방면",

              description:
                "→ 진보초·모리시타·오지마·모토야와타 방면",

              nextStations: [
                createNextStation(
                  motoyawataNext,
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
       * S21 모토야와타
       * =====================================================
       */

      if (
        isMotoyawata &&
        shinjukuNext
      ) {
        return {
          id: station.id,

          operatorId: "toei",

          lineId: "shinjuku",

          lineCode: "S",

          lineNameKo: "도에이 신주쿠선",

          lineNameJa: "都営新宿線",

          code: station.id,

          nameKo: station.nameKo,

          nameJa: station.nameJa,

          color: SHINJUKU_COLOR,

          type: "terminal",

          directions: [
            {
              id: "shinjuku",

              label: "신주쿠 방면",

              description:
                "→ 모리시타·진보초·이치가야·신주쿠 방면",

              nextStations: [
                createNextStation(
                  shinjukuNext,
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
        !shinjukuNext ||
        !motoyawataNext
      ) {
        throw new Error(
          `신주쿠선 다음역 생성 실패: ${station.id}`,
        );
      }

      return {
        id: station.id,

        operatorId: "toei",

        lineId: "shinjuku",

        lineCode: "S",

        lineNameKo: "도에이 신주쿠선",

        lineNameJa: "都営新宿線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: SHINJUKU_COLOR,

        type: "normal",

        directions: [
          {
            id: "shinjuku",

            label: "신주쿠 방면",

            description:
              "→ 진보초·이치가야·신주쿠 방면",

            nextStations: [
              createNextStation(
                shinjukuNext,
              ),
            ],
          },

          {
            id: "motoyawata",

            label: "모토야와타 방면",

            description:
              "→ 모리시타·오지마·모토야와타 방면",

            nextStations: [
              createNextStation(
                motoyawataNext,
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

export const shinjukuTrains: Record<
  string,
  Train[]
> = {};