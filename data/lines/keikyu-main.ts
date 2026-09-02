import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Keikyu Main Line
 * 京急本線
 * =========================================================
 */

export const KEIKYU_MAIN_COLOR = "#00BFFF";

/*
 * =========================================================
 * 기본 역 데이터
 * =========================================================
 *
 * 주의:
 *
 * 센가쿠지(泉岳寺)는 게이큐 본선 구간이지만
 * 게이큐 KK 역번호가 없고 도에이 A07을 사용한다.
 *
 * 현재 앱에서는 station.id 중복을 피하기 위해
 * KK01 시나가와부터 시작한다.
 * =========================================================
 */

const KEIKYU_MAIN_STATION_BASE = [
  { id: "KK01", nameKo: "시나가와", nameJa: "品川" },
  { id: "KK02", nameKo: "기타시나가와", nameJa: "北品川" },
  { id: "KK03", nameKo: "신반바", nameJa: "新馬場" },
  { id: "KK04", nameKo: "아오모노요코초", nameJa: "青物横丁" },
  { id: "KK05", nameKo: "사메즈", nameJa: "鮫洲" },
  { id: "KK06", nameKo: "다치아이가와", nameJa: "立会川" },
  { id: "KK07", nameKo: "오모리카이간", nameJa: "大森海岸" },
  { id: "KK08", nameKo: "헤이와지마", nameJa: "平和島" },
  { id: "KK09", nameKo: "오모리마치", nameJa: "大森町" },
  { id: "KK10", nameKo: "우메야시키", nameJa: "梅屋敷" },
  { id: "KK11", nameKo: "게이큐카마타", nameJa: "京急蒲田" },

  /*
   * KK12 ~ KK17
   * 게이큐 공항선
   */

  { id: "KK18", nameKo: "조시키", nameJa: "雑色" },
  { id: "KK19", nameKo: "로쿠고도테", nameJa: "六郷土手" },
  { id: "KK20", nameKo: "게이큐카와사키", nameJa: "京急川崎" },

  /*
   * KK21 ~ KK26
   * 게이큐 다이시선
   */

  { id: "KK27", nameKo: "핫초나와테", nameJa: "八丁畷" },
  { id: "KK28", nameKo: "쓰루미이치바", nameJa: "鶴見市場" },
  { id: "KK29", nameKo: "게이큐쓰루미", nameJa: "京急鶴見" },
  { id: "KK30", nameKo: "가게쓰소지지", nameJa: "花月総持寺" },
  { id: "KK31", nameKo: "나마무기", nameJa: "生麦" },
  { id: "KK32", nameKo: "게이큐신코야스", nameJa: "京急新子安" },
  { id: "KK33", nameKo: "고야스", nameJa: "子安" },
  { id: "KK34", nameKo: "가나가와신마치", nameJa: "神奈川新町" },
  { id: "KK35", nameKo: "게이큐히가시카나가와", nameJa: "京急東神奈川" },
  { id: "KK36", nameKo: "가나가와", nameJa: "神奈川" },
  { id: "KK37", nameKo: "요코하마", nameJa: "横浜" },
  { id: "KK38", nameKo: "도베", nameJa: "戸部" },
  { id: "KK39", nameKo: "히노데초", nameJa: "日ノ出町" },
  { id: "KK40", nameKo: "고가네초", nameJa: "黄金町" },
  { id: "KK41", nameKo: "미나미오타", nameJa: "南太田" },
  { id: "KK42", nameKo: "이도가야", nameJa: "井土ヶ谷" },
  { id: "KK43", nameKo: "구묘지", nameJa: "弘明寺" },
  { id: "KK44", nameKo: "가미오오카", nameJa: "上大岡" },
  { id: "KK45", nameKo: "뵤부가우라", nameJa: "屏風浦" },
  { id: "KK46", nameKo: "스기타", nameJa: "杉田" },
  { id: "KK47", nameKo: "게이큐토미오카", nameJa: "京急富岡" },
  { id: "KK48", nameKo: "노켄다이", nameJa: "能見台" },
  { id: "KK49", nameKo: "가나자와분코", nameJa: "金沢文庫" },
  { id: "KK50", nameKo: "가나자와핫케이", nameJa: "金沢八景" },

  /*
   * KK51 ~ KK53
   * 게이큐 즈시선
   */

  { id: "KK54", nameKo: "옷파마", nameJa: "追浜" },
  { id: "KK55", nameKo: "게이큐타우라", nameJa: "京急田浦" },
  { id: "KK56", nameKo: "안진즈카", nameJa: "安針塚" },
  { id: "KK57", nameKo: "헤미", nameJa: "逸見" },
  { id: "KK58", nameKo: "시오이리", nameJa: "汐入" },
  { id: "KK59", nameKo: "요코스카추오", nameJa: "横須賀中央" },
  { id: "KK60", nameKo: "겐리쓰다이가쿠", nameJa: "県立大学" },
  { id: "KK61", nameKo: "호리노우치", nameJa: "堀ノ内" },
  { id: "KK62", nameKo: "게이큐오쓰", nameJa: "京急大津" },
  { id: "KK63", nameKo: "마보리카이간", nameJa: "馬堀海岸" },
  { id: "KK64", nameKo: "우라가", nameJa: "浦賀" },
] as const;

/*
 * =========================================================
 * 다음 역 변환
 * =========================================================
 */

const createNextStation = (
  station: (typeof KEIKYU_MAIN_STATION_BASE)[number],
) => {
  return {
    id: station.id,
    code: station.id,
    nameKo: station.nameKo,
    nameJa: station.nameJa,
    lineId: "keikyu-main",
    lineCode: "KK",
    lineNameKo: "게이큐 본선",
    color: KEIKYU_MAIN_COLOR,
  };
};

/*
 * =========================================================
 * 환승 노선
 * =========================================================
 *
 * 현재 앱에 실제 등록되어 있고,
 * TransferBottomSheet에서 정상 이동할 수 있는 노선만 활성화한다.
 *
 * 미구현 노선을 억지로 id에 넣으면
 * 눌렀을 때 대상 역을 찾지 못하므로 아직 넣지 않는다.
 *
 * 현재 활성:
 * KK01 시나가와
 *   - JR 야마노테선
 *   - JR 게이힌토호쿠선
 *
 * KK11 게이큐카마타
 *   - 게이큐 공항선
 *
 * KK37 요코하마
 *   - JR 게이힌토호쿠선
 *
 * 향후 추가:
 * KK20 다이시선
 * KK50 즈시선
 * KK61 구리하마선
 * 및 JR/도큐/소테츠/블루라인/미나토미라이/시사이드라인 등
 * =========================================================
 */

const createTransfers = (stationId: string) => {
  switch (stationId) {
    case "KK01":
      return [
        {
          id: "yamanote",
          nameKo: "JR 야마노테선",
          nameJa: "JR山手線",
          code: "JY",
          color: "#80C41C",
        },
        {
          id: "keihin-tohoku",
          nameKo: "JR 게이힌토호쿠선",
          nameJa: "JR京浜東北線",
          code: "JK",
          color: "#00A7E3",
        },
      ];

    case "KK11":
      return [
        {
          id: "keikyu-airport",
          nameKo: "게이큐 공항선",
          nameJa: "京急空港線",
          code: "KK",
          color: KEIKYU_MAIN_COLOR,
        },
      ];

    case "KK37":
      return [
        {
          id: "keihin-tohoku",
          nameKo: "JR 게이힌토호쿠선·네기시선",
          nameJa: "JR京浜東北線・根岸線",
          code: "JK",
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

export const keikyuMainStations: Station[] = KEIKYU_MAIN_STATION_BASE.map(
  (station, index) => {
    const previousStation = KEIKYU_MAIN_STATION_BASE[index - 1];
    const nextStation = KEIKYU_MAIN_STATION_BASE[index + 1];

    const isShinagawa = station.id === "KK01";
    const isUraga = station.id === "KK64";

    /*
     * =====================================================
     * KK01 시나가와
     * =====================================================
     */

    if (isShinagawa && nextStation) {
      return {
        id: station.id,
        operatorId: "keikyu",
        lineId: "keikyu-main",
        lineCode: "KK",
        lineNameKo: "게이큐 본선",
        lineNameJa: "京急本線",
        code: station.id,
        nameKo: station.nameKo,
        nameJa: station.nameJa,
        color: KEIKYU_MAIN_COLOR,
        type: "terminal",
        directions: [
          {
            id: "Outbound",
            label: "요코하마·우라가 방면",
            description: "→ 게이큐카마타·요코하마·요코스카추오·우라가 방면",
            nextStations: [createNextStation(nextStation)],
          },
        ],
        transfers: createTransfers(station.id),
      };
    }

    /*
     * =====================================================
     * KK64 우라가
     * =====================================================
     */

    if (isUraga && previousStation) {
      return {
        id: station.id,
        operatorId: "keikyu",
        lineId: "keikyu-main",
        lineCode: "KK",
        lineNameKo: "게이큐 본선",
        lineNameJa: "京急本線",
        code: station.id,
        nameKo: station.nameKo,
        nameJa: station.nameJa,
        color: KEIKYU_MAIN_COLOR,
        type: "terminal",
        directions: [
          {
            id: "Inbound",
            label: "요코하마·시나가와 방면",
            description: "→ 요코스카추오·요코하마·게이큐카마타·시나가와 방면",
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
      throw new Error(`게이큐 본선 다음역 생성 실패: ${station.id}`);
    }

    return {
      id: station.id,
      operatorId: "keikyu",
      lineId: "keikyu-main",
      lineCode: "KK",
      lineNameKo: "게이큐 본선",
      lineNameJa: "京急本線",
      code: station.id,
      nameKo: station.nameKo,
      nameJa: station.nameJa,
      color: KEIKYU_MAIN_COLOR,
      type: "normal",
      directions: [
        {
          id: "Inbound",
          label: "시나가와 방면",
          description:
            "→ 요코하마·게이큐카마타·시나가와·도에이 아사쿠사선 방면",
          nextStations: [createNextStation(previousStation)],
        },
        {
          id: "Outbound",
          label: "우라가 방면",
          description: "→ 요코하마·요코스카추오·우라가 방면",
          nextStations: [createNextStation(nextStation)],
        },
      ],
      transfers: createTransfers(station.id),
    };
  },
);

/*
 * =========================================================
 * Registry fallback
 * =========================================================
 *
 * 실제 열차/시간표는
 * tokyo-railway-api → ODPT Challenge API 사용.
 * =========================================================
 */

export const keikyuMainTrains: Record<string, Train[]> = {};
