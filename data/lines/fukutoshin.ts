import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Tokyo Railway Guide
 * Tokyo Metro Fukutoshin Line
 * 東京メトロ副都心線
 * =========================================================
 *
 * F01 와코시
 * ↓
 * F16 시부야
 *
 * wakoshi
 * = 와코시 방면
 *
 * shibuya
 * = 시부야 방면
 *
 * =========================================================
 */

export const FUKUTOSHIN_COLOR = "#9C5E31";

/*
 * =========================================================
 * 기본 역 타입
 * =========================================================
 */

type FukutoshinStationBase = {
  id: string;

  nameKo: string;

  nameJa: string;
};

/*
 * =========================================================
 * 후쿠토신선 역 목록
 * =========================================================
 */

const FUKUTOSHIN_STATION_BASE: FukutoshinStationBase[] = [
  {
    id: "F01",
    nameKo: "와코시",
    nameJa: "和光市",
  },
  {
    id: "F02",
    nameKo: "지카테쓰나리마스",
    nameJa: "地下鉄成増",
  },
  {
    id: "F03",
    nameKo: "지카테쓰아카쓰카",
    nameJa: "地下鉄赤塚",
  },
  {
    id: "F04",
    nameKo: "헤이와다이",
    nameJa: "平和台",
  },
  {
    id: "F05",
    nameKo: "히카와다이",
    nameJa: "氷川台",
  },
  {
    id: "F06",
    nameKo: "고타케무카이하라",
    nameJa: "小竹向原",
  },
  {
    id: "F07",
    nameKo: "센카와",
    nameJa: "千川",
  },
  {
    id: "F08",
    nameKo: "가나메초",
    nameJa: "要町",
  },
  {
    id: "F09",
    nameKo: "이케부쿠로",
    nameJa: "池袋",
  },
  {
    id: "F10",
    nameKo: "조시가야",
    nameJa: "雑司が谷",
  },
  {
    id: "F11",
    nameKo: "니시와세다",
    nameJa: "西早稲田",
  },
  {
    id: "F12",
    nameKo: "히가시신주쿠",
    nameJa: "東新宿",
  },
  {
    id: "F13",
    nameKo: "신주쿠산초메",
    nameJa: "新宿三丁目",
  },
  {
    id: "F14",
    nameKo: "기타산도",
    nameJa: "北参道",
  },
  {
    id: "F15",
    nameKo: "메이지진구마에〈하라주쿠〉",
    nameJa: "明治神宮前〈原宿〉",
  },
  {
    id: "F16",
    nameKo: "시부야",
    nameJa: "渋谷",
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
   * F01 와코시
   */
  F01: [
    transfer("yurakucho", "Y", "유라쿠초선", "有楽町線", "#C1A470"),
    transfer("tobu-tojo", "TJ", "도부 도조선", "東武東上線", "#004098"),
  ],

  /*
   * F02 지카테쓰나리마스
   */
  F02: [transfer("yurakucho", "Y", "유라쿠초선", "有楽町線", "#C1A470")],

  /*
   * F03 지카테쓰아카쓰카
   */
  F03: [transfer("yurakucho", "Y", "유라쿠초선", "有楽町線", "#C1A470")],

  /*
   * F04 헤이와다이
   */
  F04: [transfer("yurakucho", "Y", "유라쿠초선", "有楽町線", "#C1A470")],

  /*
   * F05 히카와다이
   */
  F05: [transfer("yurakucho", "Y", "유라쿠초선", "有楽町線", "#C1A470")],

  /*
   * F06 고타케무카이하라
   */
  F06: [
    transfer("yurakucho", "Y", "유라쿠초선", "有楽町線", "#C1A470"),
    transfer(
      "seibu-yurakucho",
      "SI",
      "세이부 유라쿠초선",
      "西武有楽町線",
      "#00A6BF",
    ),
  ],

  /*
   * F07 센카와
   */
  F07: [transfer("yurakucho", "Y", "유라쿠초선", "有楽町線", "#C1A470")],

  /*
   * F08 가나메초
   */
  F08: [transfer("yurakucho", "Y", "유라쿠초선", "有楽町線", "#C1A470")],

  /*
   * F09 이케부쿠로
   */
  F09: [
    transfer("marunouchi", "M", "마루노우치선", "丸ノ内線", "#F62E36"),
    transfer("yurakucho", "Y", "유라쿠초선", "有楽町線", "#C1A470"),
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),
    transfer("saikyo", "JA", "사이쿄선", "埼京線", "#00AC9A"),
  ],

  /*
   * F10 조시가야
   */
  F10: [
    transfer(
      "toden-arakawa",
      "SA",
      "도덴 아라카와선",
      "東京さくらトラム",
      "#EE86A7",
    ),
  ],

  /*
   * F12 히가시신주쿠
   */
  F12: [transfer("oedo", "E", "도에이 오에도선", "都営大江戸線", "#CE045B")],

  /*
   * F13 신주쿠산초메
   */
  F13: [
    transfer("marunouchi", "M", "마루노우치선", "丸ノ内線", "#F62E36"),
    transfer("shinjuku", "S", "도에이 신주쿠선", "都営新宿線", "#6CBB5A"),
  ],

  /*
   * F15 메이지진구마에〈하라주쿠〉
   */
  F15: [
    transfer("chiyoda", "C", "치요다선", "千代田線", "#00BB85"),
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),
  ],

  /*
   * F16 시부야
   */
  F16: [
    transfer("ginza", "G", "긴자선", "銀座線", "#F39700"),
    transfer("hanzomon", "Z", "한조몬선", "半蔵門線", "#8F76D6"),
    transfer("yamanote", "JY", "야마노테선", "山手線", "#80C41C"),
    transfer("saikyo", "JA", "사이쿄선", "埼京線", "#00AC9A"),
    transfer("tokyu-toyoko", "TY", "도큐 도요코선", "東急東横線", "#DA0442"),
    transfer(
      "tokyu-denentoshi",
      "DT",
      "도큐 덴엔토시선",
      "東急田園都市線",
      "#20A288",
    ),
    transfer(
      "keio-inokashira",
      "IN",
      "게이오 이노카시라선",
      "京王井の頭線",
      "#000088",
    ),
  ],
};

/*
 * =========================================================
 * NextStation
 * =========================================================
 */

const createNextStation = (station: FukutoshinStationBase) => {
  return {
    id: station.id,

    code: station.id,

    nameKo: station.nameKo,

    nameJa: station.nameJa,

    lineId: "fukutoshin",

    lineCode: "F",

    lineNameKo: "후쿠토신선",

    color: FUKUTOSHIN_COLOR,
  };
};

/*
 * =========================================================
 * Station[]
 * =========================================================
 */

export const fukutoshinStations: Station[] = FUKUTOSHIN_STATION_BASE.map(
  (station, index, stations) => {
    const isWakoshi = index === 0;

    const isShibuya = index === stations.length - 1;

    const wakoshiNext = index > 0 ? stations[index - 1] : undefined;

    const shibuyaNext =
      index < stations.length - 1 ? stations[index + 1] : undefined;

    /*
     * =====================================================
     * F01 와코시
     * =====================================================
     */

    if (isWakoshi && shibuyaNext) {
      return {
        id: station.id,

        operatorId: "tokyo-metro",

        lineId: "fukutoshin",

        lineCode: "F",

        lineNameKo: "후쿠토신선",

        lineNameJa: "副都心線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: FUKUTOSHIN_COLOR,

        type: "terminal",

        directions: [
          {
            id: "shibuya",

            label: "시부야 방면",

            description: "→ 이케부쿠로·신주쿠산초메·시부야 방면",

            nextStations: [createNextStation(shibuyaNext)],
          },
        ],

        transfers: TRANSFERS[station.id] ?? [],
      };
    }

    /*
     * =====================================================
     * F16 시부야
     * =====================================================
     */

    if (isShibuya && wakoshiNext) {
      return {
        id: station.id,

        operatorId: "tokyo-metro",

        lineId: "fukutoshin",

        lineCode: "F",

        lineNameKo: "후쿠토신선",

        lineNameJa: "副都心線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: FUKUTOSHIN_COLOR,

        type: "terminal",

        directions: [
          {
            id: "wakoshi",

            label: "와코시 방면",

            description:
              "→ 신주쿠산초메·이케부쿠로·고타케무카이하라·와코시 방면",

            nextStations: [createNextStation(wakoshiNext)],
          },
        ],

        transfers: TRANSFERS[station.id] ?? [],
      };
    }

    /*
     * =====================================================
     * 일반역
     * =====================================================
     */

    if (!wakoshiNext || !shibuyaNext) {
      throw new Error(`후쿠토신선 다음역 생성 실패: ${station.id}`);
    }

    return {
      id: station.id,

      operatorId: "tokyo-metro",

      lineId: "fukutoshin",

      lineCode: "F",

      lineNameKo: "후쿠토신선",

      lineNameJa: "副都心線",

      code: station.id,

      nameKo: station.nameKo,

      nameJa: station.nameJa,

      color: FUKUTOSHIN_COLOR,

      type: "normal",

      directions: [
        /*
         * 와코시 방면
         */
        {
          id: "wakoshi",

          label: "와코시 방면",

          description: "→ 이케부쿠로·고타케무카이하라·와코시 방면",

          nextStations: [createNextStation(wakoshiNext)],
        },

        /*
         * 시부야 방면
         */
        {
          id: "shibuya",

          label: "시부야 방면",

          description: "→ 이케부쿠로·신주쿠산초메·시부야 방면",

          nextStations: [createNextStation(shibuyaNext)],
        },
      ],

      transfers: TRANSFERS[station.id] ?? [],
    };
  },
);

/*
 * =========================================================
 * Registry fallback
 * =========================================================
 */

export const fukutoshinTrains: Record<string, Train[]> = {};
