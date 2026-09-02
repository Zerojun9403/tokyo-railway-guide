import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Seibu Shinjuku Line
 * 西武新宿線
 * =========================================================
 */

export const SEIBU_SHINJUKU_COLOR = "#00A6BF";

/*
 * =========================================================
 * 기본 역 데이터
 * =========================================================
 *
 * SS01 세이부신주쿠
 *   ↓
 * SS29 혼카와고에
 * =========================================================
 */

const SEIBU_SHINJUKU_STATION_BASE = [
  { id: "SS01", nameKo: "세이부신주쿠", nameJa: "西武新宿" },
  { id: "SS02", nameKo: "다카다노바바", nameJa: "高田馬場" },
  { id: "SS03", nameKo: "시모오치아이", nameJa: "下落合" },
  { id: "SS04", nameKo: "나카이", nameJa: "中井" },
  { id: "SS05", nameKo: "아라이야쿠시마에", nameJa: "新井薬師前" },
  { id: "SS06", nameKo: "누마부쿠로", nameJa: "沼袋" },
  { id: "SS07", nameKo: "노가타", nameJa: "野方" },
  { id: "SS08", nameKo: "도리쓰카세이", nameJa: "都立家政" },
  { id: "SS09", nameKo: "사기노미야", nameJa: "鷺ノ宮" },
  { id: "SS10", nameKo: "시모이구사", nameJa: "下井草" },
  { id: "SS11", nameKo: "이오기", nameJa: "井荻" },
  { id: "SS12", nameKo: "가미이구사", nameJa: "上井草" },
  { id: "SS13", nameKo: "가미샤쿠지이", nameJa: "上石神井" },
  { id: "SS14", nameKo: "무사시세키", nameJa: "武蔵関" },
  { id: "SS15", nameKo: "히가시후시미", nameJa: "東伏見" },
  { id: "SS16", nameKo: "세이부야기사와", nameJa: "西武柳沢" },
  { id: "SS17", nameKo: "다나시", nameJa: "田無" },
  { id: "SS18", nameKo: "하나코가네이", nameJa: "花小金井" },
  { id: "SS19", nameKo: "고다이라", nameJa: "小平" },
  { id: "SS20", nameKo: "구메가와", nameJa: "久米川" },
  { id: "SS21", nameKo: "히가시무라야마", nameJa: "東村山" },
  { id: "SS22", nameKo: "도코로자와", nameJa: "所沢" },
  { id: "SS23", nameKo: "고쿠코엔", nameJa: "航空公園" },
  { id: "SS24", nameKo: "신토코로자와", nameJa: "新所沢" },
  { id: "SS25", nameKo: "이리소", nameJa: "入曽" },
  { id: "SS26", nameKo: "사야마시", nameJa: "狭山市" },
  { id: "SS27", nameKo: "신사야마", nameJa: "新狭山" },
  { id: "SS28", nameKo: "미나미오쓰카", nameJa: "南大塚" },
  { id: "SS29", nameKo: "혼카와고에", nameJa: "本川越" },
] as const;

/*
 * =========================================================
 * 다음 역 변환
 * =========================================================
 */

const createNextStation = (
  station: (typeof SEIBU_SHINJUKU_STATION_BASE)[number],
) => {
  return {
    id: station.id,
    code: station.id,
    nameKo: station.nameKo,
    nameJa: station.nameJa,
    lineId: "seibu-shinjuku",
    lineCode: "SS",
    lineNameKo: "세이부 신주쿠선",
    color: SEIBU_SHINJUKU_COLOR,
  };
};

/*
 * =========================================================
 * 환승 노선
 * =========================================================
 *
 * 현재 Expo Registry에 실제 등록된 노선만 활성화한다.
 *
 * SS01 세이부신주쿠
 *   - JR 야마노테선
 *   - JR 주오선 쾌속
 *   - JR 주오·소부선 각역정차
 *   - 도쿄메트로 마루노우치선
 *   - 도에이 신주쿠선
 *   - 도에이 오에도선
 *
 * SS02 다카다노바바
 *   - JR 야마노테선
 *   - 도쿄메트로 도자이선
 *
 * SS04 나카이
 *   - 도에이 오에도선
 *
 * SS22 도코로자와
 *   - 세이부 이케부쿠로선
 *
 * 향후 세이부 지선들이 Registry에 등록되면
 * 고다이라 / 히가시무라야마 등의 환승도 추가한다.
 * =========================================================
 */

const createTransfers = (stationId: string) => {
  switch (stationId) {
    case "SS01":
      return [
        {
          id: "yamanote",
          nameKo: "JR 야마노테선",
          nameJa: "JR山手線",
          code: "JY",
          color: "#80C41C",
        },
        {
          id: "chuo-rapid",
          nameKo: "JR 주오선 쾌속",
          nameJa: "JR中央線快速",
          code: "JC",
          color: "#F15A22",
        },
        {
          id: "chuo-sobu-local",
          nameKo: "JR 주오·소부선 각역정차",
          nameJa: "JR中央・総武線各駅停車",
          code: "JB",
          color: "#FFD400",
        },
        {
          id: "marunouchi",
          nameKo: "도쿄메트로 마루노우치선",
          nameJa: "東京メトロ丸ノ内線",
          code: "M",
          color: "#F62E36",
        },
        {
          id: "shinjuku",
          nameKo: "도에이 신주쿠선",
          nameJa: "都営新宿線",
          code: "S",
          color: "#6CBB5A",
        },
        {
          id: "oedo",
          nameKo: "도에이 오에도선",
          nameJa: "都営大江戸線",
          code: "E",
          color: "#B6007A",
        },
      ];

    case "SS02":
      return [
        {
          id: "yamanote",
          nameKo: "JR 야마노테선",
          nameJa: "JR山手線",
          code: "JY",
          color: "#80C41C",
        },
        {
          id: "tozai",
          nameKo: "도쿄메트로 도자이선",
          nameJa: "東京メトロ東西線",
          code: "T",
          color: "#009BBF",
        },
      ];

    case "SS04":
      return [
        {
          id: "oedo",
          nameKo: "도에이 오에도선",
          nameJa: "都営大江戸線",
          code: "E",
          color: "#B6007A",
        },
      ];

    case "SS22":
      return [
        {
          id: "seibu-ikebukuro",
          nameKo: "세이부 이케부쿠로선",
          nameJa: "西武池袋線",
          code: "SI",
          color: "#EF7A00",
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

export const seibuShinjukuStations: Station[] =
  SEIBU_SHINJUKU_STATION_BASE.map((station, index) => {
    const previousStation = SEIBU_SHINJUKU_STATION_BASE[index - 1];
    const nextStation = SEIBU_SHINJUKU_STATION_BASE[index + 1];

    const isSeibuShinjuku = station.id === "SS01";
    const isHonKawagoe = station.id === "SS29";

    /*
     * =====================================================
     * SS01 세이부신주쿠
     * =====================================================
     */

    if (isSeibuShinjuku && nextStation) {
      return {
        id: station.id,
        operatorId: "seibu",
        lineId: "seibu-shinjuku",
        lineCode: "SS",
        lineNameKo: "세이부 신주쿠선",
        lineNameJa: "西武新宿線",
        code: station.id,
        nameKo: station.nameKo,
        nameJa: station.nameJa,
        color: SEIBU_SHINJUKU_COLOR,
        type: "terminal",
        directions: [
          {
            id: "Outbound",
            label: "도코로자와·혼카와고에 방면",
            description: "→ 다카다노바바·도코로자와·혼카와고에 방면",
            nextStations: [createNextStation(nextStation)],
          },
        ],
        transfers: createTransfers(station.id),
      };
    }

    /*
     * =====================================================
     * SS29 혼카와고에
     * =====================================================
     */

    if (isHonKawagoe && previousStation) {
      return {
        id: station.id,
        operatorId: "seibu",
        lineId: "seibu-shinjuku",
        lineCode: "SS",
        lineNameKo: "세이부 신주쿠선",
        lineNameJa: "西武新宿線",
        code: station.id,
        nameKo: station.nameKo,
        nameJa: station.nameJa,
        color: SEIBU_SHINJUKU_COLOR,
        type: "terminal",
        directions: [
          {
            id: "Inbound",
            label: "도코로자와·세이부신주쿠 방면",
            description: "→ 도코로자와·다카다노바바·세이부신주쿠 방면",
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
        `세이부 신주쿠선 다음역 생성 실패: ${station.id}`,
      );
    }

    return {
      id: station.id,
      operatorId: "seibu",
      lineId: "seibu-shinjuku",
      lineCode: "SS",
      lineNameKo: "세이부 신주쿠선",
      lineNameJa: "西武新宿線",
      code: station.id,
      nameKo: station.nameKo,
      nameJa: station.nameJa,
      color: SEIBU_SHINJUKU_COLOR,
      type: "normal",
      directions: [
        {
          id: "Inbound",
          label: "세이부신주쿠 방면",
          description: "→ 다카다노바바·세이부신주쿠 방면",
          nextStations: [createNextStation(previousStation)],
        },
        {
          id: "Outbound",
          label: "도코로자와·혼카와고에 방면",
          description: "→ 도코로자와·혼카와고에 방면",
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
 * operator = seibu
 * lineId = shinjuku
 *
 * 실시간 getTrains는 현재 Seibu Provider에서
 * 아직 구현되지 않았으므로 빈 fallback을 사용한다.
 * =========================================================
 */

export const seibuShinjukuTrains: Record<string, Train[]> = {};