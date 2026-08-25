import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Tokyo Railway Guide
 * Tokyo Metro Chiyoda Line
 * 東京メトロ千代田線
 * =========================================================
 *
 * C01 요요기우에하라
 * ↓
 * C20 기타아야세
 *
 * yoyogiuehara
 * = 요요기우에하라 방면
 *
 * kitaayase
 * = 기타아야세 방면
 *
 * =========================================================
 */

export const CHIYODA_COLOR = "#00BB85";

/*
 * =========================================================
 * 기본 역 타입
 * =========================================================
 */

type ChiyodaStationBase = {
  id: string;

  nameKo: string;

  nameJa: string;
};

/*
 * =========================================================
 * 치요다선 역 목록
 * =========================================================
 */

const CHIYODA_STATION_BASE: ChiyodaStationBase[] = [
  {
    id: "C01",
    nameKo: "요요기우에하라",
    nameJa: "代々木上原",
  },
  {
    id: "C02",
    nameKo: "요요기코엔",
    nameJa: "代々木公園",
  },
  {
    id: "C03",
    nameKo: "메이지진구마에〈하라주쿠〉",
    nameJa: "明治神宮前〈原宿〉",
  },
  {
    id: "C04",
    nameKo: "오모테산도",
    nameJa: "表参道",
  },
  {
    id: "C05",
    nameKo: "노기자카",
    nameJa: "乃木坂",
  },
  {
    id: "C06",
    nameKo: "아카사카",
    nameJa: "赤坂",
  },
  {
    id: "C07",
    nameKo: "곳카이기지도마에",
    nameJa: "国会議事堂前",
  },
  {
    id: "C08",
    nameKo: "가스미가세키",
    nameJa: "霞ケ関",
  },
  {
    id: "C09",
    nameKo: "히비야",
    nameJa: "日比谷",
  },
  {
    id: "C10",
    nameKo: "니주바시마에〈마루노우치〉",
    nameJa: "二重橋前〈丸の内〉",
  },
  {
    id: "C11",
    nameKo: "오테마치",
    nameJa: "大手町",
  },
  {
    id: "C12",
    nameKo: "신오차노미즈",
    nameJa: "新御茶ノ水",
  },
  {
    id: "C13",
    nameKo: "유시마",
    nameJa: "湯島",
  },
  {
    id: "C14",
    nameKo: "네즈",
    nameJa: "根津",
  },
  {
    id: "C15",
    nameKo: "센다기",
    nameJa: "千駄木",
  },
  {
    id: "C16",
    nameKo: "니시닛포리",
    nameJa: "西日暮里",
  },
  {
    id: "C17",
    nameKo: "마치야",
    nameJa: "町屋",
  },
  {
    id: "C18",
    nameKo: "기타센주",
    nameJa: "北千住",
  },
  {
    id: "C19",
    nameKo: "아야세",
    nameJa: "綾瀬",
  },
  {
    id: "C20",
    nameKo: "기타아야세",
    nameJa: "北綾瀬",
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
   * C01 요요기우에하라
   */

  C01: [
    transfer(
      "odakyu-odawara",
      "OH",
      "오다큐 오다와라선",
      "小田急小田原線",
      "#2288CC",
    ),
  ],

  /*
   * C03 메이지진구마에〈하라주쿠〉
   */

  C03: [
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
  ],

  /*
   * C04 오모테산도
   */

  C04: [
    transfer(
      "ginza",
      "G",
      "긴자선",
      "銀座線",
      "#F39700",
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
   * C07 곳카이기지도마에
   *
   * 다메이케산노역과 환승역으로 취급
   */

  C07: [
    transfer(
      "marunouchi",
      "M",
      "마루노우치선",
      "丸ノ内線",
      "#F62E36",
    ),
    transfer(
      "ginza",
      "G",
      "긴자선",
      "銀座線",
      "#F39700",
    ),
    transfer(
      "namboku",
      "N",
      "난보쿠선",
      "南北線",
      "#00AC9B",
    ),
  ],

  /*
   * C08 가스미가세키
   */

  C08: [
    transfer(
      "marunouchi",
      "M",
      "마루노우치선",
      "丸ノ内線",
      "#F62E36",
    ),
    transfer(
      "hibiya",
      "H",
      "히비야선",
      "日比谷線",
      "#B5B5AC",
    ),
  ],

  /*
   * C09 히비야
   *
   * 유라쿠초역과 환승 연결
   */

  C09: [
    transfer(
      "hibiya",
      "H",
      "히비야선",
      "日比谷線",
      "#B5B5AC",
    ),
    transfer(
      "toei-mita",
      "I",
      "도에이 미타선",
      "都営三田線",
      "#0079C2",
    ),
    transfer(
      "yurakucho",
      "Y",
      "유라쿠초선",
      "有楽町線",
      "#C1A470",
    ),
  ],

  /*
   * C11 오테마치
   */

  C11: [
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
      "hanzomon",
      "Z",
      "한조몬선",
      "半蔵門線",
      "#8F76D6",
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
   * C12 신오차노미즈
   */

  C12: [
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
    transfer(
      "toei-shinjuku",
      "S",
      "도에이 신주쿠선",
      "都営新宿線",
      "#6CBB5A",
    ),
  ],

  /*
   * C16 니시닛포리
   */

  C16: [
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
      "nippori-toneri",
      "NT",
      "닛포리·도네리 라이너",
      "日暮里・舎人ライナー",
      "#E4007F",
    ),
  ],

  /*
   * C17 마치야
   */

  C17: [
    transfer(
      "keisei-main",
      "KS",
      "게이세이 본선",
      "京成本線",
      "#005AAA",
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
   * C18 기타센주
   */

  C18: [
    transfer(
      "hibiya",
      "H",
      "히비야선",
      "日比谷線",
      "#B5B5AC",
    ),
    transfer(
      "joban",
      "JJ",
      "JR 조반선",
      "JR常磐線",
      "#00A7E3",
    ),
    transfer(
      "tobu-skytree",
      "TS",
      "도부 스카이트리 라인",
      "東武スカイツリーライン",
      "#0067C0",
    ),
    transfer(
      "tsukuba-express",
      "TX",
      "쓰쿠바 익스프레스",
      "つくばエクスプレス",
      "#000084",
    ),
  ],

  /*
   * C19 아야세
   */

  C19: [
    transfer(
      "joban-local",
      "JL",
      "JR 조반선 각역정차",
      "JR常磐線各駅停車",
      "#868584",
    ),
  ],
};

/*
 * =========================================================
 * NextStation
 * =========================================================
 */

const createNextStation = (
  station: ChiyodaStationBase,
) => {
  return {
    id: station.id,

    code: station.id,

    nameKo: station.nameKo,

    nameJa: station.nameJa,

    lineId: "chiyoda",

    lineCode: "C",

    lineNameKo: "치요다선",

    color: CHIYODA_COLOR,
  };
};

/*
 * =========================================================
 * Station[]
 * =========================================================
 */

export const chiyodaStations: Station[] =
  CHIYODA_STATION_BASE.map(
    (
      station,
      index,
      stations,
    ) => {
      const isYoyogiUehara =
        index === 0;

      const isKitaAyase =
        index === stations.length - 1;

      const yoyogiUeharaNext =
        index > 0
          ? stations[index - 1]
          : undefined;

      const kitaAyaseNext =
        index < stations.length - 1
          ? stations[index + 1]
          : undefined;

      /*
       * =====================================================
       * C01 요요기우에하라
       * =====================================================
       */

      if (
        isYoyogiUehara &&
        kitaAyaseNext
      ) {
        return {
          id: station.id,

          operatorId: "tokyo-metro",

          lineId: "chiyoda",

          lineCode: "C",

          lineNameKo: "치요다선",

          lineNameJa: "千代田線",

          code: station.id,

          nameKo: station.nameKo,

          nameJa: station.nameJa,

          color: CHIYODA_COLOR,

          type: "terminal",

          directions: [
            {
              id: "kitaayase",

              label: "기타아야세 방면",

              description:
                "→ 오모테산도·오테마치·기타센주·기타아야세 방면",

              nextStations: [
                createNextStation(
                  kitaAyaseNext,
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
       * C20 기타아야세
       * =====================================================
       */

      if (
        isKitaAyase &&
        yoyogiUeharaNext
      ) {
        return {
          id: station.id,

          operatorId: "tokyo-metro",

          lineId: "chiyoda",

          lineCode: "C",

          lineNameKo: "치요다선",

          lineNameJa: "千代田線",

          code: station.id,

          nameKo: station.nameKo,

          nameJa: station.nameJa,

          color: CHIYODA_COLOR,

          type: "terminal",

          directions: [
            {
              id: "yoyogiuehara",

              label: "요요기우에하라 방면",

              description:
                "→ 기타센주·오테마치·오모테산도·요요기우에하라 방면",

              nextStations: [
                createNextStation(
                  yoyogiUeharaNext,
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
        !yoyogiUeharaNext ||
        !kitaAyaseNext
      ) {
        throw new Error(
          `치요다선 다음역 생성 실패: ${station.id}`,
        );
      }

      return {
        id: station.id,

        operatorId: "tokyo-metro",

        lineId: "chiyoda",

        lineCode: "C",

        lineNameKo: "치요다선",

        lineNameJa: "千代田線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: CHIYODA_COLOR,

        type: "normal",

        directions: [
          /*
           * 요요기우에하라 방면
           */

          {
            id: "yoyogiuehara",

            label: "요요기우에하라 방면",

            description:
              "→ 오테마치·오모테산도·요요기우에하라 방면",

            nextStations: [
              createNextStation(
                yoyogiUeharaNext,
              ),
            ],
          },

          /*
           * 기타아야세 방면
           */

          {
            id: "kitaayase",

            label: "기타아야세 방면",

            description:
              "→ 오테마치·기타센주·아야세·기타아야세 방면",

            nextStations: [
              createNextStation(
                kitaAyaseNext,
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

export const chiyodaTrains: Record<
  string,
  Train[]
> = {};