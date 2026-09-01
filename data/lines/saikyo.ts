import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * JR 동일본 - 사이쿄선
 * 埼京線
 * =========================================================
 *
 * JA08 오사키
 * ↓
 * JA11 신주쿠
 * ↓
 * JA12 이케부쿠로
 * ↓
 * JA15 아카바네
 * ↓
 * JA21 무사시우라와
 * ↓
 * JA26 오미야
 *
 * Northbound
 * = 이케부쿠로 · 아카바네 · 오미야 방면
 *
 * Southbound
 * = 신주쿠 · 시부야 · 오사키 방면
 *
 * ODPT에서는 SaikyoKawagoe로 제공되므로
 * 가와고에선 직통 열차의 목적지도 시간표에 표시할 수 있다.
 * =========================================================
 */

export const SAIKYO_COLOR = "#00AC9A";

type SaikyoStationBase = {
  id: string;
  nameKo: string;
  nameJa: string;
};

const SAIKYO_STATION_BASE: SaikyoStationBase[] = [
  {
    id: "JA08",
    nameKo: "오사키",
    nameJa: "大崎",
  },
  {
    id: "JA09",
    nameKo: "에비스",
    nameJa: "恵比寿",
  },
  {
    id: "JA10",
    nameKo: "시부야",
    nameJa: "渋谷",
  },
  {
    id: "JA11",
    nameKo: "신주쿠",
    nameJa: "新宿",
  },
  {
    id: "JA12",
    nameKo: "이케부쿠로",
    nameJa: "池袋",
  },
  {
    id: "JA13",
    nameKo: "이타바시",
    nameJa: "板橋",
  },
  {
    id: "JA14",
    nameKo: "주조",
    nameJa: "十条",
  },
  {
    id: "JA15",
    nameKo: "아카바네",
    nameJa: "赤羽",
  },
  {
    id: "JA16",
    nameKo: "기타아카바네",
    nameJa: "北赤羽",
  },
  {
    id: "JA17",
    nameKo: "우키마후나도",
    nameJa: "浮間舟渡",
  },
  {
    id: "JA18",
    nameKo: "도다코엔",
    nameJa: "戸田公園",
  },
  {
    id: "JA19",
    nameKo: "도다",
    nameJa: "戸田",
  },
  {
    id: "JA20",
    nameKo: "기타토다",
    nameJa: "北戸田",
  },
  {
    id: "JA21",
    nameKo: "무사시우라와",
    nameJa: "武蔵浦和",
  },
  {
    id: "JA22",
    nameKo: "나카우라와",
    nameJa: "中浦和",
  },
  {
    id: "JA23",
    nameKo: "미나미요노",
    nameJa: "南与野",
  },
  {
    id: "JA24",
    nameKo: "요노혼마치",
    nameJa: "与野本町",
  },
  {
    id: "JA25",
    nameKo: "기타요노",
    nameJa: "北与野",
  },
  {
    id: "JA26",
    nameKo: "오미야",
    nameJa: "大宮",
  },
];

type Transfer = NonNullable<Station["transfers"]>[number];

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

const TRANSFERS: Record<string, Transfer[]> = {
  JA08: [
    transfer(
      "yamanote",
      "JY",
      "야마노테선",
      "山手線",
      "#80C41C",
    ),
    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),
  ],

  JA09: [
    transfer(
      "yamanote",
      "JY",
      "야마노테선",
      "山手線",
      "#80C41C",
    ),
    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),
    transfer(
      "hibiya",
      "H",
      "도쿄메트로 히비야선",
      "東京メトロ日比谷線",
      "#B5B5AC",
    ),
  ],

  JA10: [
    transfer(
      "yamanote",
      "JY",
      "야마노테선",
      "山手線",
      "#80C41C",
    ),
    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),
    transfer(
      "ginza",
      "G",
      "도쿄메트로 긴자선",
      "東京メトロ銀座線",
      "#F39700",
    ),
    transfer(
      "hanzomon",
      "Z",
      "도쿄메트로 한조몬선",
      "東京メトロ半蔵門線",
      "#8F76D6",
    ),
    transfer(
      "fukutoshin",
      "F",
      "도쿄메트로 후쿠토신선",
      "東京メトロ副都心線",
      "#9C5E31",
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

  JA11: [
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
      "주오선 쾌속",
      "中央線快速",
      "#F15A22",
    ),
    transfer(
      "chuo-sobu-local",
      "JB",
      "주오·소부선 각역정차",
      "中央・総武線各駅停車",
      "#FFD400",
    ),
    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),
    transfer(
      "marunouchi",
      "M",
      "도쿄메트로 마루노우치선",
      "東京メトロ丸ノ内線",
      "#F62E36",
    ),
    transfer(
      "shinjuku",
      "S",
      "도에이 신주쿠선",
      "都営新宿線",
      "#6CBB5A",
    ),
    transfer(
      "oedo",
      "E",
      "도에이 오에도선",
      "都営大江戸線",
      "#CE045B",
    ),
  ],

  JA12: [
    transfer(
      "yamanote",
      "JY",
      "야마노테선",
      "山手線",
      "#80C41C",
    ),
    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),
    transfer(
      "marunouchi",
      "M",
      "도쿄메트로 마루노우치선",
      "東京メトロ丸ノ内線",
      "#F62E36",
    ),
    transfer(
      "yurakucho",
      "Y",
      "도쿄메트로 유라쿠초선",
      "東京メトロ有楽町線",
      "#C1A470",
    ),
    transfer(
      "fukutoshin",
      "F",
      "도쿄메트로 후쿠토신선",
      "東京メトロ副都心線",
      "#9C5E31",
    ),
    transfer(
      "seibu-ikebukuro",
      "SI",
      "세이부 이케부쿠로선",
      "西武池袋線",
      "#EF810F",
    ),
  ],

  JA15: [
    transfer(
      "keihin-tohoku",
      "JK",
      "게이힌도호쿠·네기시선",
      "京浜東北・根岸線",
      "#00A7DB",
    ),
    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),
  ],

  JA21: [
    transfer(
      "musashino",
      "JM",
      "무사시노선",
      "武蔵野線",
      "#F15A22",
    ),
  ],

  JA26: [
    transfer(
      "keihin-tohoku",
      "JK",
      "게이힌도호쿠·네기시선",
      "京浜東北・根岸線",
      "#00A7DB",
    ),
    transfer(
      "shonan-shinjuku",
      "JS",
      "쇼난신주쿠라인",
      "湘南新宿ライン",
      "#E21F26",
    ),
  ],
};

const createNextStation = (station: SaikyoStationBase) => {
  return {
    id: station.id,
    code: station.id,
    nameKo: station.nameKo,
    nameJa: station.nameJa,
    lineId: "saikyo",
    lineCode: "JA",
    lineNameKo: "사이쿄선",
    color: SAIKYO_COLOR,
  };
};

export const saikyoStations: Station[] = SAIKYO_STATION_BASE.map(
  (station, index, stations) => {
    const isOsaki = index === 0;
    const isOmiya = index === stations.length - 1;

    const southNext =
      index > 0 ? stations[index - 1] : undefined;

    const northNext =
      index < stations.length - 1
        ? stations[index + 1]
        : undefined;

    if (isOsaki && northNext) {
      return {
        id: station.id,
        operatorId: "jr-east",
        lineId: "saikyo",
        lineCode: "JA",
        lineNameKo: "사이쿄선",
        lineNameJa: "埼京線",
        code: station.id,
        nameKo: station.nameKo,
        nameJa: station.nameJa,
        color: SAIKYO_COLOR,
        type: "terminal",
        directions: [
          {
            id: "Northbound",
            label: "신주쿠·이케부쿠로·오미야 방면",
            description:
              "→ 시부야·신주쿠·이케부쿠로·아카바네·오미야 방면",
            nextStations: [createNextStation(northNext)],
          },
        ],
        transfers: TRANSFERS[station.id] ?? [],
      };
    }

    if (isOmiya && southNext) {
      return {
        id: station.id,
        operatorId: "jr-east",
        lineId: "saikyo",
        lineCode: "JA",
        lineNameKo: "사이쿄선",
        lineNameJa: "埼京線",
        code: station.id,
        nameKo: station.nameKo,
        nameJa: station.nameJa,
        color: SAIKYO_COLOR,
        type: "terminal",
        directions: [
          {
            id: "Southbound",
            label: "이케부쿠로·신주쿠·오사키 방면",
            description:
              "→ 아카바네·이케부쿠로·신주쿠·시부야·오사키 방면",
            nextStations: [createNextStation(southNext)],
          },
        ],
        transfers: TRANSFERS[station.id] ?? [],
      };
    }

    if (!southNext || !northNext) {
      throw new Error(
        `사이쿄선 다음역 생성 실패: ${station.id}`,
      );
    }

    return {
      id: station.id,
      operatorId: "jr-east",
      lineId: "saikyo",
      lineCode: "JA",
      lineNameKo: "사이쿄선",
      lineNameJa: "埼京線",
      code: station.id,
      nameKo: station.nameKo,
      nameJa: station.nameJa,
      color: SAIKYO_COLOR,
      type: "normal",
      directions: [
        {
          id: "Northbound",
          label: "아카바네·오미야 방면",
          description:
            "→ 이케부쿠로·아카바네·무사시우라와·오미야 방면",
          nextStations: [createNextStation(northNext)],
        },
        {
          id: "Southbound",
          label: "신주쿠·오사키 방면",
          description:
            "→ 이케부쿠로·신주쿠·시부야·오사키 방면",
          nextStations: [createNextStation(southNext)],
        },
      ],
      transfers: TRANSFERS[station.id] ?? [],
    };
  },
);

export const saikyoTrains: Record<string, Train[]> = {};