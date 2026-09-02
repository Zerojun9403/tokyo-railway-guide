import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * 나리타선 · 나리타공항지선
 * =========================================================
 *
 * JO28 지바
 * ↓
 * JO35 나리타
 * ↓
 * JO36 공항제2빌딩
 * ↓
 * JO37 나리타공항
 *
 * 앱에서는 하나의 연속된 노선으로 표시한다.
 * =========================================================
 */

export const NARITA_COLOR = "#00A85A";

const createNextStation = (station: Station) => ({
  id: station.id,
  code: station.code,
  nameKo: station.nameKo,
  nameJa: station.nameJa,
  lineId: station.lineId,
  lineCode: station.lineCode,
  lineNameKo: station.lineNameKo,
  color: station.color,
});

const createStation = (
  id: string,
  nameKo: string,
  nameJa: string,
  type: "terminal" | "normal" = "normal",
): Station => ({
  id,
  code: id,
  nameKo,
  nameJa,
  operatorId: "jr-east",
  lineId: "narita",
  lineCode: "JO",
  lineNameKo: "나리타선",
  lineNameJa: "成田線",
  color: NARITA_COLOR,
  type,
  directions: [],
  transfers: [],
});

/*
 * =========================================================
 * 역 목록
 * =========================================================
 */

const stations = [
  createStation("JO28", "지바", "千葉", "terminal"),
  createStation("JO29", "히가시치바", "東千葉"),
  createStation("JO30", "쓰가", "都賀"),
  createStation("JO31", "요쓰카이도", "四街道"),
  createStation("JO32", "모노이", "物井"),
  createStation("JO33", "사쿠라", "佐倉"),
  createStation("JO34", "시스이", "酒々井"),
  createStation("JO35", "나리타", "成田"),
  createStation(
    "JO36",
    "공항제2빌딩",
    "空港第2ビル",
  ),
  createStation(
    "JO37",
    "나리타공항",
    "成田空港",
    "terminal",
  ),
];

/*
 * =========================================================
 * 방향
 * =========================================================
 *
 * Outbound
 * → 나리타 · 나리타공항 방면
 *
 * Inbound
 * → 사쿠라 · 지바 방면
 * =========================================================
 */

export const naritaStations: Station[] = stations.map(
  (station, index) => {
    const previousStation = stations[index - 1];
    const nextStation = stations[index + 1];

    /*
     * 지바
     */

    if (station.id === "JO28") {
      return {
        ...station,
        directions: [
          {
            id: "Outbound",
            label: "나리타 · 나리타공항 방면",
            description: "나리타 · 나리타공항 방면",
            nextStations: nextStation
              ? [createNextStation(nextStation)]
              : [],
          },
        ],
      };
    }

    /*
     * 나리타공항
     */

    if (station.id === "JO37") {
      return {
        ...station,
        directions: [
          {
            id: "Inbound",
            label: "나리타 · 사쿠라 · 지바 방면",
            description: "나리타 · 사쿠라 · 지바 방면",
            nextStations: previousStation
              ? [createNextStation(previousStation)]
              : [],
          },
        ],
      };
    }

    /*
     * 일반역
     */

    return {
      ...station,
      directions: [
        {
          id: "Outbound",
          label: "나리타 · 나리타공항 방면",
          description: "나리타 · 나리타공항 방면",
          nextStations: nextStation
            ? [createNextStation(nextStation)]
            : [],
        },
        {
          id: "Inbound",
          label: "사쿠라 · 지바 방면",
          description: "사쿠라 · 지바 방면",
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
 * fallback
 * =========================================================
 */

export const naritaTrains: Record<string, Train[]> = {};