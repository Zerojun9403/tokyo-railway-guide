import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Tokyu Toyoko Line
 * 東急東横線
 * =========================================================
 */

export const TOKYU_TOYOKO_COLOR = "#DA0442";

/*
 * =========================================================
 * 기본 역 데이터
 * =========================================================
 *
 * TY01 시부야
 *   ↓
 * TY21 요코하마
 * =========================================================
 */

const TOKYU_TOYOKO_STATION_BASE = [
  { id: "TY01", nameKo: "시부야", nameJa: "渋谷" },
  { id: "TY02", nameKo: "다이칸야마", nameJa: "代官山" },
  { id: "TY03", nameKo: "나카메구로", nameJa: "中目黒" },
  { id: "TY04", nameKo: "유텐지", nameJa: "祐天寺" },
  { id: "TY05", nameKo: "가쿠게이다이가쿠", nameJa: "学芸大学" },
  { id: "TY06", nameKo: "도리쓰다이가쿠", nameJa: "都立大学" },
  { id: "TY07", nameKo: "지유가오카", nameJa: "自由が丘" },
  { id: "TY08", nameKo: "덴엔초후", nameJa: "田園調布" },
  { id: "TY09", nameKo: "다마가와", nameJa: "多摩川" },
  { id: "TY10", nameKo: "신마루코", nameJa: "新丸子" },
  { id: "TY11", nameKo: "무사시코스기", nameJa: "武蔵小杉" },
  { id: "TY12", nameKo: "모토스미요시", nameJa: "元住吉" },
  { id: "TY13", nameKo: "히요시", nameJa: "日吉" },
  { id: "TY14", nameKo: "쓰나시마", nameJa: "綱島" },
  { id: "TY15", nameKo: "오쿠라야마", nameJa: "大倉山" },
  { id: "TY16", nameKo: "기쿠나", nameJa: "菊名" },
  { id: "TY17", nameKo: "묘렌지", nameJa: "妙蓮寺" },
  { id: "TY18", nameKo: "하쿠라쿠", nameJa: "白楽" },
  { id: "TY19", nameKo: "히가시하쿠라쿠", nameJa: "東白楽" },
  { id: "TY20", nameKo: "단마치", nameJa: "反町" },
  { id: "TY21", nameKo: "요코하마", nameJa: "横浜" },
] as const;

/*
 * =========================================================
 * 다음 역 변환
 * =========================================================
 */

const createNextStation = (
  station: (typeof TOKYU_TOYOKO_STATION_BASE)[number],
) => {
  return {
    id: station.id,
    code: station.id,
    nameKo: station.nameKo,
    nameJa: station.nameJa,
    lineId: "tokyu-toyoko",
    lineCode: "TY",
    lineNameKo: "도큐 도요코선",
    color: TOKYU_TOYOKO_COLOR,
  };
};

/*
 * =========================================================
 * 환승 노선
 * =========================================================
 *
 * 현재 Expo Registry에 실제 등록된 노선만 활성화한다.
 *
 * TY01 시부야
 *   - JR 야마노테선
 *   - 도쿄메트로 긴자선
 *   - 도쿄메트로 한조몬선
 *   - 도쿄메트로 후쿠토신선
 *
 * TY03 나카메구로
 *   - 도쿄메트로 히비야선
 *
 * TY21 요코하마
 *   - 게이큐 본선
 *
 * 향후 추가:
 *   - 도큐 덴엔토시선
 *   - 도큐 오이마치선
 *   - 도큐 메구로선
 *   - 도큐 신요코하마선
 *   - JR 사이쿄선
 *   - JR 쇼난신주쿠라인
 *   - JR 도카이도선
 *   - JR 요코스카선
 *   - JR 게이힌도호쿠선
 *   - JR 요코하마선
 *   - 미나토미라이선
 *   - 소테츠선
 *   - 요코하마 시영지하철
 * =========================================================
 */

const createTransfers = (stationId: string) => {
  switch (stationId) {
    case "TY01":
      return [
        {
          id: "yamanote",
          nameKo: "JR 야마노테선",
          nameJa: "JR山手線",
          code: "JY",
          color: "#80C41C",
        },
        {
          id: "ginza",
          nameKo: "도쿄메트로 긴자선",
          nameJa: "東京メトロ銀座線",
          code: "G",
          color: "#FF9500",
        },
        {
          id: "hanzomon",
          nameKo: "도쿄메트로 한조몬선",
          nameJa: "東京メトロ半蔵門線",
          code: "Z",
          color: "#8F76D6",
        },
        {
          id: "fukutoshin",
          nameKo: "도쿄메트로 후쿠토신선",
          nameJa: "東京メトロ副都心線",
          code: "F",
          color: "#9C5E31",
        },
      ];

    case "TY03":
      return [
        {
          id: "hibiya",
          nameKo: "도쿄메트로 히비야선",
          nameJa: "東京メトロ日比谷線",
          code: "H",
          color: "#B5B5AC",
        },
      ];

    case "TY21":
      return [
        {
          id: "keikyu-main",
          nameKo: "게이큐 본선",
          nameJa: "京急本線",
          code: "KK",
          color: "#00A7E3",
        },
      ];

    default:
      return [];
  }
};

/*
 * =========================================================
 * Station[]
 * =========================================================
 */

export const tokyuToyokoStations: Station[] =
  TOKYU_TOYOKO_STATION_BASE.map((station, index) => {
    const previousStation = TOKYU_TOYOKO_STATION_BASE[index - 1];
    const nextStation = TOKYU_TOYOKO_STATION_BASE[index + 1];

    const isShibuya = station.id === "TY01";
    const isYokohama = station.id === "TY21";

    /*
     * =====================================================
     * TY01 시부야
     * =====================================================
     */

    if (isShibuya && nextStation) {
      return {
        id: station.id,
        operatorId: "tokyu",
        lineId: "tokyu-toyoko",
        lineCode: "TY",
        lineNameKo: "도큐 도요코선",
        lineNameJa: "東急東横線",
        code: station.id,
        nameKo: station.nameKo,
        nameJa: station.nameJa,
        color: TOKYU_TOYOKO_COLOR,
        type: "terminal",
        directions: [
          {
            id: "Outbound",
            label: "요코하마·모토마치·주카가이 방면",
            description: "→ 나카메구로·요코하마·모토마치·주카가이 방면",
            nextStations: [createNextStation(nextStation)],
          },
        ],
        transfers: createTransfers(station.id),
      };
    }

    /*
     * =====================================================
     * TY21 요코하마
     * =====================================================
     */

    if (isYokohama && previousStation) {
      return {
        id: station.id,
        operatorId: "tokyu",
        lineId: "tokyu-toyoko",
        lineCode: "TY",
        lineNameKo: "도큐 도요코선",
        lineNameJa: "東急東横線",
        code: station.id,
        nameKo: station.nameKo,
        nameJa: station.nameJa,
        color: TOKYU_TOYOKO_COLOR,
        type: "terminal",
        directions: [
          {
            id: "Inbound",
            label: "시부야 방면",
            description: "→ 무사시코스기·나카메구로·시부야 방면",
            nextStations: [createNextStation(previousStation)],
          },
        ],
        transfers: createTransfers(station.id),
      };
    }

    /*
     * =====================================================
     * 일반역
     * =====================================================
     */

    if (!previousStation || !nextStation) {
      throw new Error(
        `도큐 도요코선 다음역 생성 실패: ${station.id}`,
      );
    }

    return {
      id: station.id,
      operatorId: "tokyu",
      lineId: "tokyu-toyoko",
      lineCode: "TY",
      lineNameKo: "도큐 도요코선",
      lineNameJa: "東急東横線",
      code: station.id,
      nameKo: station.nameKo,
      nameJa: station.nameJa,
      color: TOKYU_TOYOKO_COLOR,
      type: "normal",
      directions: [
        {
          id: "Inbound",
          label: "시부야 방면",
          description: "→ 나카메구로·시부야 방면",
          nextStations: [createNextStation(previousStation)],
        },
        {
          id: "Outbound",
          label: "요코하마·모토마치·주카가이 방면",
          description: "→ 요코하마·모토마치·주카가이 방면",
          nextStations: [createNextStation(nextStation)],
        },
      ],
      transfers: createTransfers(station.id),
    };
  });

/*
 * =========================================================
 * Registry fallback
 * =========================================================
 *
 * 실제 시간표:
 * tokyo-railway-api → ODPT Challenge API
 *
 * Backend:
 * operator = tokyu
 * lineId = toyoko
 *
 * 실시간 getTrains는 현재 Tokyu Provider에서
 * 아직 구현되지 않았으므로 빈 fallback을 사용한다.
 * =========================================================
 */

export const tokyuToyokoTrains: Record<string, Train[]> = {};