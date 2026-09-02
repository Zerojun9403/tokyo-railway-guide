import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * 쇼난신주쿠라인
 * 湘南新宿ライン
 * JS09 오후나 ~ JS24 오미야
 * =========================================================
 */

export const SHONAN_SHINJUKU_COLOR = "#E21F26";

/*
 * =========================================================
 * 환승 타입
 * =========================================================
 */

type Transfer = NonNullable<Station["transfers"]>[number];

/*
 * =========================================================
 * 환승 노선 생성
 * =========================================================
 */

const transfer = (
  id: string,
  code: string,
  nameKo: string,
  nameJa: string,
  color: string,
): Transfer => ({
  id,
  code,
  nameKo,
  nameJa,
  color,
});

/*
 * =========================================================
 * 다음 역 생성
 * =========================================================
 */

const createNextStation = (station: {
  id: string;
  code: string;
  nameKo: string;
  nameJa: string;
}) => ({
  id: station.id,
  code: station.code,
  nameKo: station.nameKo,
  nameJa: station.nameJa,

  lineId: "shonan-shinjuku",
  lineCode: "JS",
  lineNameKo: "쇼난신주쿠라인",

  color: SHONAN_SHINJUKU_COLOR,
});

/*
 * =========================================================
 * 역 기본 데이터
 *
 * 배열 순서:
 * 오후나 → 오미야
 *
 * Northbound:
 * 요코하마 · 신주쿠 · 이케부쿠로 · 오미야 방면
 *
 * Southbound:
 * 요코하마 · 오후나 방면
 * =========================================================
 */

const stations = [
  {
    id: "JS09",
    code: "JS09",
    nameKo: "오후나",
    nameJa: "大船",
  },
  {
    id: "JS10",
    code: "JS10",
    nameKo: "도츠카",
    nameJa: "戸塚",
  },
  {
    id: "JS11",
    code: "JS11",
    nameKo: "히가시토츠카",
    nameJa: "東戸塚",
  },
  {
    id: "JS12",
    code: "JS12",
    nameKo: "호도가야",
    nameJa: "保土ケ谷",
  },
  {
    id: "JS13",
    code: "JS13",
    nameKo: "요코하마",
    nameJa: "横浜",
  },
  {
    id: "JS14",
    code: "JS14",
    nameKo: "신카와사키",
    nameJa: "新川崎",
  },
  {
    id: "JS15",
    code: "JS15",
    nameKo: "무사시코스기",
    nameJa: "武蔵小杉",
  },
  {
    id: "JS16",
    code: "JS16",
    nameKo: "니시오이",
    nameJa: "西大井",
  },
  {
    id: "JS17",
    code: "JS17",
    nameKo: "오사키",
    nameJa: "大崎",
  },
  {
    id: "JS18",
    code: "JS18",
    nameKo: "에비스",
    nameJa: "恵比寿",
  },
  {
    id: "JS19",
    code: "JS19",
    nameKo: "시부야",
    nameJa: "渋谷",
  },
  {
    id: "JS20",
    code: "JS20",
    nameKo: "신주쿠",
    nameJa: "新宿",
  },
  {
    id: "JS21",
    code: "JS21",
    nameKo: "이케부쿠로",
    nameJa: "池袋",
  },
  {
    id: "JS22",
    code: "JS22",
    nameKo: "아카바네",
    nameJa: "赤羽",
  },
  {
    id: "JS23",
    code: "JS23",
    nameKo: "우라와",
    nameJa: "浦和",
  },
  {
    id: "JS24",
    code: "JS24",
    nameKo: "오미야",
    nameJa: "大宮",
  },
] as const;

/*
 * =========================================================
 * 환승 정보
 * =========================================================
 */

const transfersByStation: Record<string, Transfer[]> = {
  JS09: [
    transfer(
      "tokaido",
      "JT",
      "도카이도선",
      "東海道線",
      "#F68B1E",
    ),
    transfer(
      "yokosuka",
      "JO",
      "요코스카선",
      "横須賀線",
      "#0067C0",
    ),
  ],

  JS10: [
    transfer(
      "tokaido",
      "JT",
      "도카이도선",
      "東海道線",
      "#F68B1E",
    ),
    transfer(
      "yokosuka",
      "JO",
      "요코스카선",
      "横須賀線",
      "#0067C0",
    ),
  ],

  JS13: [
    transfer(
      "keihin-tohoku",
      "JK",
      "게이힌도호쿠·네기시선",
      "京浜東北・根岸線",
      "#00A7DB",
    ),
    transfer(
      "tokaido",
      "JT",
      "도카이도선",
      "東海道線",
      "#F68B1E",
    ),
    transfer(
      "yokosuka",
      "JO",
      "요코스카선",
      "横須賀線",
      "#0067C0",
    ),
    transfer(
      "tokyu-toyoko",
      "TY",
      "도큐 도요코선",
      "東急東横線",
      "#DA0442",
    ),
  ],

  JS15: [
    transfer(
      "yokosuka",
      "JO",
      "요코스카선",
      "横須賀線",
      "#0067C0",
    ),
    transfer(
      "tokyu-toyoko",
      "TY",
      "도큐 도요코선",
      "東急東横線",
      "#DA0442",
    ),
    transfer(
      "tokyu-meguro",
      "MG",
      "도큐 메구로선",
      "東急目黒線",
      "#009CD2",
    ),
  ],

  JS17: [
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

  JS18: [
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
      "hibiya",
      "H",
      "히비야선",
      "日比谷線",
      "#B5B5AC",
    ),
  ],

  JS19: [
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
    transfer(
      "fukutoshin",
      "F",
      "후쿠토신선",
      "副都心線",
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

  JS20: [
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
      "marunouchi",
      "M",
      "마루노우치선",
      "丸ノ内線",
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

  JS21: [
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
      "marunouchi",
      "M",
      "마루노우치선",
      "丸ノ内線",
      "#F62E36",
    ),
    transfer(
      "yurakucho",
      "Y",
      "유라쿠초선",
      "有楽町線",
      "#C1A470",
    ),
    transfer(
      "fukutoshin",
      "F",
      "후쿠토신선",
      "副都心선",
      "#9C5E31",
    ),
    transfer(
      "seibu-ikebukuro",
      "SI",
      "세이부 이케부쿠로선",
      "西武池袋線",
      "#EF7A00",
    ),
  ],

  JS22: [
    transfer(
      "saikyo",
      "JA",
      "사이쿄선",
      "埼京線",
      "#00AC9A",
    ),
    transfer(
      "keihin-tohoku",
      "JK",
      "게이힌도호쿠·네기시선",
      "京浜東北・根岸線",
      "#00A7DB",
    ),
  ],

  JS23: [
    transfer(
      "keihin-tohoku",
      "JK",
      "게이힌도호쿠·네기시선",
      "京浜東北・根岸線",
      "#00A7DB",
    ),
  ],

  JS24: [
    transfer(
      "saikyo",
      "JA",
      "사이쿄선",
      "埼京線",
      "#00AC9A",
    ),
    transfer(
      "keihin-tohoku",
      "JK",
      "게이힌도호쿠·네기시선",
      "京浜東北・根岸線",
      "#00A7DB",
    ),
  ],
};

/*
 * =========================================================
 * Station 데이터 생성
 * =========================================================
 */

export const shonanShinjukuStations: Station[] = stations.map(
  (station, index) => {
    const previousStation = stations[index - 1];
    const nextStation = stations[index + 1];

    /*
     * 배열:
     * 오후나 → 오미야
     *
     * previousStation = 남쪽
     * nextStation     = 북쪽
     */

    if (index === 0) {
      return {
        id: station.id,
        code: station.code,

        nameKo: station.nameKo,
        nameJa: station.nameJa,

        operatorId: "jr-east",
        lineId: "shonan-shinjuku",
        lineCode: "JS",
        lineNameKo: "쇼난신주쿠라인",
        lineNameJa: "湘南新宿ライン",
        color: SHONAN_SHINJUKU_COLOR,

        type: "terminal",

        transfers: transfersByStation[station.id] ?? [],

        directions: [
          {
            id: "Northbound",

            label: "신주쿠 · 이케부쿠로 · 오미야 방면",

            description: "북행",

            nextStations: nextStation
              ? [createNextStation(nextStation)]
              : [],
          },
        ],
      };
    }

    if (index === stations.length - 1) {
      return {
        id: station.id,
        code: station.code,

        nameKo: station.nameKo,
        nameJa: station.nameJa,

        operatorId: "jr-east",
        lineId: "shonan-shinjuku",
        lineCode: "JS",
        lineNameKo: "쇼난신주쿠라인",
        lineNameJa: "湘南新宿ライン",
        color: SHONAN_SHINJUKU_COLOR,

        type: "terminal",

        transfers: transfersByStation[station.id] ?? [],

        directions: [
          {
            id: "Southbound",

            label: "신주쿠 · 요코하마 · 오후나 방면",

            description: "남행",

            nextStations: previousStation
              ? [createNextStation(previousStation)]
              : [],
          },
        ],
      };
    }

    return {
      id: station.id,
      code: station.code,

      nameKo: station.nameKo,
      nameJa: station.nameJa,

      operatorId: "jr-east",
      lineId: "shonan-shinjuku",
      lineCode: "JS",
      lineNameKo: "쇼난신주쿠라인",
      lineNameJa: "湘南新宿ライン",
      color: SHONAN_SHINJUKU_COLOR,

      type: "normal",

      transfers: transfersByStation[station.id] ?? [],

      directions: [
        {
          id: "Northbound",

          label: "이케부쿠로 · 우라와 · 오미야 방면",

          description: "북행",

          nextStations: nextStation
            ? [createNextStation(nextStation)]
            : [],
        },
        {
          id: "Southbound",

          label: "요코하마 · 오후나 방면",

          description: "남행",

          nextStations: previousStation
            ? [createNextStation(previousStation)]
            : [],
        },
      ],
    };
  },
);

/*
 * =========================================================
 * 시간표 fallback
 * =========================================================
 */

export const shonanShinjukuTrains: Record<string, Train[]> = {};