import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Keikyu Airport Line
 * 京急空港線
 * =========================================================
 */

export const KEIKYU_AIRPORT_COLOR = "#00BFFF";

/*
 * =========================================================
 * 기본 역 데이터
 * =========================================================
 */

const KEIKYU_AIRPORT_STATION_BASE = [
  {
    id: "KK11",
    nameKo: "게이큐카마타",
    nameJa: "京急蒲田",
  },
  {
    id: "KK12",
    nameKo: "고지야",
    nameJa: "糀谷",
  },
  {
    id: "KK13",
    nameKo: "오토리이",
    nameJa: "大鳥居",
  },
  {
    id: "KK14",
    nameKo: "아나모리이나리",
    nameJa: "穴守稲荷",
  },
  {
    id: "KK15",
    nameKo: "덴쿠바시",
    nameJa: "天空橋",
  },
  {
    id: "KK16",
    nameKo: "하네다공항 제3터미널",
    nameJa: "羽田空港第3ターミナル",
  },
  {
    id: "KK17",
    nameKo: "하네다공항 제1·제2터미널",
    nameJa: "羽田空港第1・第2ターミナル",
  },
] as const;

/*
 * =========================================================
 * NextStation 생성
 * =========================================================
 */

const createNextStation = (
  station: (typeof KEIKYU_AIRPORT_STATION_BASE)[number],
) => {
  return {
    id: station.id,

    code: station.id,

    nameKo: station.nameKo,

    nameJa: station.nameJa,

    lineId: "keikyu-airport",

    lineCode: "KK",

    lineNameKo: "게이큐 공항선",

    color: KEIKYU_AIRPORT_COLOR,
  };
};

/*
 * =========================================================
 * Station[]
 * =========================================================
 */

export const keikyuAirportStations: Station[] = KEIKYU_AIRPORT_STATION_BASE.map(
  (station, index) => {
    const previousStation = KEIKYU_AIRPORT_STATION_BASE[index - 1];

    const nextStation = KEIKYU_AIRPORT_STATION_BASE[index + 1];

    const isKeikyuKamata = station.id === "KK11";

    const isHanedaTerminal12 = station.id === "KK17";

    /*
     * =====================================================
     * KK11 게이큐카마타
     * =====================================================
     *
     * 공항선 기점이지만
     * 실제 열차는 게이큐 본선 시나가와 방면으로 직통한다.
     *
     * 따라서 앱에서는
     *
     * Inbound  → 시나가와 방면
     * Outbound → 하네다공항 방면
     *
     * 두 방향을 모두 표시한다.
     * =====================================================
     */

    if (isKeikyuKamata && nextStation) {
      return {
        id: station.id,

        operatorId: "keikyu",

        lineId: "keikyu-airport",

        lineCode: "KK",

        lineNameKo: "게이큐 공항선",

        lineNameJa: "京急空港線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: KEIKYU_AIRPORT_COLOR,

        type: "normal",

        directions: [
          /*
           * ===============================================
           * 상행
           * ===============================================
           *
           * 공항선 → 게이큐 본선 직통
           *
           * API directionId:
           * Inbound
           */

          {
            id: "Inbound",

            label: "시나가와 방면",

            description: "→ 시나가와·센가쿠지·도에이 아사쿠사선 방면",

            nextStations: [
              {
                id: "KK10",

                code: "KK10",

                nameKo: "우메야시키",

                nameJa: "梅屋敷",

                lineId: "keikyu-main",

                lineCode: "KK",

                lineNameKo: "게이큐 본선",

                color: KEIKYU_AIRPORT_COLOR,
              },
            ],
          },

          /*
           * ===============================================
           * 하행
           * ===============================================
           *
           * API directionId:
           * Outbound
           */

          {
            id: "Outbound",

            label: "하네다공항 방면",

            description: "→ 고지야·아나모리이나리·하네다공항 방면",

            nextStations: [createNextStation(nextStation)],
          },
        ],

        transfers: [
          {
            id: "keikyu-main",

            nameKo: "게이큐 본선",

            nameJa: "京急本線",

            code: "KK",

            color: KEIKYU_AIRPORT_COLOR,
          },
        ],
      };
    }

    /*
     * =====================================================
     * KK17 하네다공항 제1·제2터미널
     * =====================================================
     */

    if (isHanedaTerminal12 && previousStation) {
      return {
        id: station.id,

        operatorId: "keikyu",

        lineId: "keikyu-airport",

        lineCode: "KK",

        lineNameKo: "게이큐 공항선",

        lineNameJa: "京急空港線",

        code: station.id,

        nameKo: station.nameKo,

        nameJa: station.nameJa,

        color: KEIKYU_AIRPORT_COLOR,

        type: "terminal",

        directions: [
          {
            id: "Inbound",

            label: "게이큐카마타·시나가와 방면",

            description: "→ 하네다공항 제3터미널·게이큐카마타·시나가와 방면",

            nextStations: [createNextStation(previousStation)],
          },
        ],

        transfers: [],
      };
    }

    /*
     * =====================================================
     * 일반역
     * =====================================================
     */

    if (!previousStation || !nextStation) {
      throw new Error(`게이큐 공항선 다음역 생성 실패: ${station.id}`);
    }

    return {
      id: station.id,

      operatorId: "keikyu",

      lineId: "keikyu-airport",

      lineCode: "KK",

      lineNameKo: "게이큐 공항선",

      lineNameJa: "京急空港線",

      code: station.id,

      nameKo: station.nameKo,

      nameJa: station.nameJa,

      color: KEIKYU_AIRPORT_COLOR,

      type: "normal",

      directions: [
        /*
         * ===============================================
         * 상행
         * ===============================================
         *
         * API directionId:
         * Inbound
         */

        {
          id: "Inbound",

          label: "게이큐카마타·시나가와 방면",

          description: "→ 게이큐카마타·시나가와·도에이 아사쿠사선 방면",

          nextStations: [createNextStation(previousStation)],
        },

        /*
         * ===============================================
         * 하행
         * ===============================================
         *
         * API directionId:
         * Outbound
         */

        {
          id: "Outbound",

          label: "하네다공항 방면",

          description: "→ 하네다공항 제3터미널·제1·제2터미널 방면",

          nextStations: [createNextStation(nextStation)],
        },
      ],

      transfers: [],
    };
  },
);

/*
 * =========================================================
 * Registry fallback
 * =========================================================
 *
 * 실제 시간표는
 *
 * tokyo-railway-api
 *        ↓
 * Vercel
 *        ↓
 * ODPT Challenge API
 *
 * 를 사용할 예정.
 *
 * 따라서 더미 열차 데이터는 넣지 않는다.
 * =========================================================
 */

export const keikyuAirportTrains: Record<string, Train[]> = {};
