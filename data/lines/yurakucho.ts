import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Tokyo Railway Guide
 * Tokyo Metro Yurakucho Line
 * 東京メトロ有楽町線
 * =========================================================
 *
 * Y01 와코시
 * ↓
 * Y24 신키바
 *
 * wakoshi
 * = 와코시 방면
 *
 * shinkiba
 * = 신키바 방면
 *
 * =========================================================
 */

export const YURAKUCHO_COLOR = "#C1A470";

/*
 * =========================================================
 * 기본 역 타입
 * =========================================================
 */

type YurakuchoStationBase = {
  id: string;

  nameKo: string;

  nameJa: string;
};

/*
 * =========================================================
 * 유라쿠초선 역 목록
 * =========================================================
 */

const YURAKUCHO_STATION_BASE: YurakuchoStationBase[] = [
  {
    id: "Y01",
    nameKo: "와코시",
    nameJa: "和光市",
  },
  {
    id: "Y02",
    nameKo: "지카테쓰나리마스",
    nameJa: "地下鉄成増",
  },
  {
    id: "Y03",
    nameKo: "지카테쓰아카쓰카",
    nameJa: "地下鉄赤塚",
  },
  {
    id: "Y04",
    nameKo: "헤이와다이",
    nameJa: "平和台",
  },
  {
    id: "Y05",
    nameKo: "히카와다이",
    nameJa: "氷川台",
  },
  {
    id: "Y06",
    nameKo: "고타케무카이하라",
    nameJa: "小竹向原",
  },
  {
    id: "Y07",
    nameKo: "센카와",
    nameJa: "千川",
  },
  {
    id: "Y08",
    nameKo: "가나메초",
    nameJa: "要町",
  },
  {
    id: "Y09",
    nameKo: "이케부쿠로",
    nameJa: "池袋",
  },
  {
    id: "Y10",
    nameKo: "히가시이케부쿠로",
    nameJa: "東池袋",
  },
  {
    id: "Y11",
    nameKo: "고코쿠지",
    nameJa: "護国寺",
  },
  {
    id: "Y12",
    nameKo: "에도가와바시",
    nameJa: "江戸川橋",
  },
  {
    id: "Y13",
    nameKo: "이다바시",
    nameJa: "飯田橋",
  },
  {
    id: "Y14",
    nameKo: "이치가야",
    nameJa: "市ケ谷",
  },
  {
    id: "Y15",
    nameKo: "고지마치",
    nameJa: "麹町",
  },
  {
    id: "Y16",
    nameKo: "나가타초",
    nameJa: "永田町",
  },
  {
    id: "Y17",
    nameKo: "사쿠라다몬",
    nameJa: "桜田門",
  },
  {
    id: "Y18",
    nameKo: "유라쿠초",
    nameJa: "有楽町",
  },
  {
    id: "Y19",
    nameKo: "긴자잇초메",
    nameJa: "銀座一丁目",
  },
  {
    id: "Y20",
    nameKo: "신토미초",
    nameJa: "新富町",
  },
  {
    id: "Y21",
    nameKo: "쓰키시마",
    nameJa: "月島",
  },
  {
    id: "Y22",
    nameKo: "도요스",
    nameJa: "豊洲",
  },
  {
    id: "Y23",
    nameKo: "다쓰미",
    nameJa: "辰巳",
  },
  {
    id: "Y24",
    nameKo: "신키바",
    nameJa: "新木場",
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
   * Y01 와코시
   */

  Y01: [
    transfer(
      "tobu-tojo",
      "TJ",
      "도부 도조선",
      "東武東上線",
      "#004098",
    ),
  ],

  /*
   * Y06 고타케무카이하라
   */

  Y06: [
    transfer(
      "fukutoshin",
      "F",
      "후쿠토신선",
      "副都心線",
      "#9C5E31",
    ),
    transfer(
      "seibu-yurakucho",
      "SI",
      "세이부 유라쿠초선",
      "西武有楽町線",
      "#00A6BF",
    ),
  ],

  /*
   * Y09 이케부쿠로
   */

  Y09: [
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
  ],

  /*
   * Y13 이다바시
   */

  Y13: [
    transfer(
      "tozai",
      "T",
      "도자이선",
      "東西線",
      "#009BBF",
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
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부선",
      "中央・総武線",
      "#FFD400",
    ),
  ],

  /*
   * Y14 이치가야
   */

  Y14: [
    transfer(
      "namboku",
      "N",
      "난보쿠선",
      "南北線",
      "#00AC9B",
    ),
    transfer(
      "shinjuku",
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
   * Y16 나가타초
   */

  Y16: [
    transfer(
      "hanzomon",
      "Z",
      "한조몬선",
      "半蔵門線",
      "#8F76D6",
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
   * Y18 유라쿠초
   */

  Y18: [
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
      "mita",
      "I",
      "도에이 미타선",
      "都営三田線",
      "#0079C2",
    ),
  ],

  /*
   * Y20 신토미초
   */

  Y20: [
    transfer(
      "hibiya",
      "H",
      "히비야선",
      "日比谷線",
      "#B5B5AC",
    ),
  ],

  /*
   * Y21 쓰키시마
   */

  Y21: [
    transfer(
      "oedo",
      "E",
      "도에이 오에도선",
      "都営大江戸線",
      "#CE045B",
    ),
  ],

  /*
   * Y22 도요스
   */

  Y22: [
    transfer(
      "yurikamome",
      "U",
      "유리카모메",
      "ゆりかもめ",
      "#0067C0",
    ),
  ],

  /*
   * Y24 신키바
   */

  Y24: [
    transfer(
      "keiyo",
      "JE",
      "게이요선",
      "京葉線",
      "#C9252F",
    ),
    transfer(
      "rinkai",
      "R",
      "린카이선",
      "りんかい線",
      "#00418E",
    ),
  ],
};

/*
 * =========================================================
 * NextStation
 * =========================================================
 */

const createNextStation = (
  station: YurakuchoStationBase,
) => {
  return {
    id: station.id,

    code: station.id,

    nameKo: station.nameKo,

    nameJa: station.nameJa,

    lineId: "yurakucho",

    lineCode: "Y",

    lineNameKo: "유라쿠초선",

    color: YURAKUCHO_COLOR,
  };
};

/*
 * =========================================================
 * Station[]
 * =========================================================
 */

export const yurakuchoStations: Station[] =
  YURAKUCHO_STATION_BASE.map(
    (
      station,
      index,
      stations,
    ) => {
      const isWakoshi =
        index === 0;

      const isShinKiba =
        index ===
        stations.length - 1;

      const wakoshiNext =
        index > 0
          ? stations[index - 1]
          : undefined;

      const shinKibaNext =
        index <
        stations.length - 1
          ? stations[index + 1]
          : undefined;

      /*
       * =====================================================
       * Y01 와코시
       * =====================================================
       */

      if (
        isWakoshi &&
        shinKibaNext
      ) {
        return {
          id: station.id,

          operatorId:
            "tokyo-metro",

          lineId:
            "yurakucho",

          lineCode:
            "Y",

          lineNameKo:
            "유라쿠초선",

          lineNameJa:
            "有楽町線",

          code:
            station.id,

          nameKo:
            station.nameKo,

          nameJa:
            station.nameJa,

          color:
            YURAKUCHO_COLOR,

          type:
            "terminal",

          directions: [
            {
              id:
                "shinkiba",

              label:
                "신키바 방면",

              description:
                "→ 이케부쿠로·유라쿠초·도요스·신키바 방면",

              nextStations: [
                createNextStation(
                  shinKibaNext,
                ),
              ],
            },
          ],

          transfers:
            TRANSFERS[
              station.id
            ] ?? [],
        };
      }

      /*
       * =====================================================
       * Y24 신키바
       * =====================================================
       */

      if (
        isShinKiba &&
        wakoshiNext
      ) {
        return {
          id: station.id,

          operatorId:
            "tokyo-metro",

          lineId:
            "yurakucho",

          lineCode:
            "Y",

          lineNameKo:
            "유라쿠초선",

          lineNameJa:
            "有楽町線",

          code:
            station.id,

          nameKo:
            station.nameKo,

          nameJa:
            station.nameJa,

          color:
            YURAKUCHO_COLOR,

          type:
            "terminal",

          directions: [
            {
              id:
                "wakoshi",

              label:
                "와코시 방면",

              description:
                "→ 유라쿠초·이케부쿠로·고타케무카이하라·와코시 방면",

              nextStations: [
                createNextStation(
                  wakoshiNext,
                ),
              ],
            },
          ],

          transfers:
            TRANSFERS[
              station.id
            ] ?? [],
        };
      }

      /*
       * =====================================================
       * 일반역
       * =====================================================
       */

      if (
        !wakoshiNext ||
        !shinKibaNext
      ) {
        throw new Error(
          `유라쿠초선 다음역 생성 실패: ${station.id}`,
        );
      }

      return {
        id:
          station.id,

        operatorId:
          "tokyo-metro",

        lineId:
          "yurakucho",

        lineCode:
          "Y",

        lineNameKo:
          "유라쿠초선",

        lineNameJa:
          "有楽町線",

        code:
          station.id,

        nameKo:
          station.nameKo,

        nameJa:
          station.nameJa,

        color:
          YURAKUCHO_COLOR,

        type:
          "normal",

        directions: [
          /*
           * 와코시 방면
           */

          {
            id:
              "wakoshi",

            label:
              "와코시 방면",

            description:
              "→ 이케부쿠로·고타케무카이하라·와코시 방면",

            nextStations: [
              createNextStation(
                wakoshiNext,
              ),
            ],
          },

          /*
           * 신키바 방면
           */

          {
            id:
              "shinkiba",

            label:
              "신키바 방면",

            description:
              "→ 유라쿠초·도요스·신키바 방면",

            nextStations: [
              createNextStation(
                shinKibaNext,
              ),
            ],
          },
        ],

        transfers:
          TRANSFERS[
            station.id
          ] ?? [],
      };
    },
  );

/*
 * =========================================================
 * Registry fallback
 * =========================================================
 */

export const yurakuchoTrains: Record<
  string,
  Train[]
> = {};
