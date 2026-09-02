import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

/*
 * =========================================================
 * Seibu Ikebukuro Line
 * 西武池袋線
 * =========================================================
 */

export const SEIBU_IKEBUKURO_COLOR = "#EF7A00";

/*
 * =========================================================
 * 기본 역 데이터
 * =========================================================
 *
 * SI01 이케부쿠로
 *   ↓
 * SI31 아가노
 *
 * 아가노 이후 SI32 ~ SI36은
 * 세이부 치치부선으로 별도 구현한다.
 * =========================================================
 */

const SEIBU_IKEBUKURO_STATION_BASE = [
  { id: "SI01", nameKo: "이케부쿠로", nameJa: "池袋" },
  { id: "SI02", nameKo: "시이나마치", nameJa: "椎名町" },
  { id: "SI03", nameKo: "히가시나가사키", nameJa: "東長崎" },
  { id: "SI04", nameKo: "에코다", nameJa: "江古田" },
  { id: "SI05", nameKo: "사쿠라다이", nameJa: "桜台" },
  { id: "SI06", nameKo: "네리마", nameJa: "練馬" },
  { id: "SI07", nameKo: "나카무라바시", nameJa: "中村橋" },
  { id: "SI08", nameKo: "후지미다이", nameJa: "富士見台" },
  { id: "SI09", nameKo: "네리마타카노다이", nameJa: "練馬高野台" },
  { id: "SI10", nameKo: "샤쿠지이코엔", nameJa: "石神井公園" },
  { id: "SI11", nameKo: "오이즈미가쿠엔", nameJa: "大泉学園" },
  { id: "SI12", nameKo: "호야", nameJa: "保谷" },
  { id: "SI13", nameKo: "히바리가오카", nameJa: "ひばりヶ丘" },
  { id: "SI14", nameKo: "히가시쿠루메", nameJa: "東久留米" },
  { id: "SI15", nameKo: "키요세", nameJa: "清瀬" },
  { id: "SI16", nameKo: "아키쓰", nameJa: "秋津" },
  { id: "SI17", nameKo: "토코로자와", nameJa: "所沢" },
  { id: "SI18", nameKo: "니시토코로자와", nameJa: "西所沢" },
  { id: "SI19", nameKo: "코테사시", nameJa: "小手指" },
  { id: "SI20", nameKo: "사야마가오카", nameJa: "狭山ヶ丘" },
  { id: "SI21", nameKo: "무사시후지사와", nameJa: "武蔵藤沢" },
  { id: "SI22", nameKo: "이나리야마코엔", nameJa: "稲荷山公園" },
  { id: "SI23", nameKo: "이루마시", nameJa: "入間市" },
  { id: "SI24", nameKo: "부시", nameJa: "仏子" },
  { id: "SI25", nameKo: "모토카지", nameJa: "元加治" },
  { id: "SI26", nameKo: "한노", nameJa: "飯能" },
  { id: "SI27", nameKo: "히가시한노", nameJa: "東飯能" },
  { id: "SI28", nameKo: "코마", nameJa: "高麗" },
  { id: "SI29", nameKo: "무사시요코테", nameJa: "武蔵横手" },
  { id: "SI30", nameKo: "히가시아가노", nameJa: "東吾野" },
  { id: "SI31", nameKo: "아가노", nameJa: "吾野" },
] as const;

/*
 * =========================================================
 * 다음 역 변환
 * =========================================================
 */

const createNextStation = (
  station: (typeof SEIBU_IKEBUKURO_STATION_BASE)[number],
) => {
  return {
    id: station.id,
    code: station.id,
    nameKo: station.nameKo,
    nameJa: station.nameJa,
    lineId: "seibu-ikebukuro",
    lineCode: "SI",
    lineNameKo: "세이부 이케부쿠로선",
    color: SEIBU_IKEBUKURO_COLOR,
  };
};

/*
 * =========================================================
 * 환승 노선
 * =========================================================
 *
 * 현재 Expo 앱에 실제 등록되어 있는 노선만 활성화한다.
 *
 * SI01 이케부쿠로
 *   - JR 야마노테선
 *   - 도쿄메트로 마루노우치선
 *   - 도쿄메트로 유라쿠초선
 *   - 도쿄메트로 후쿠토신선
 *
 * SI06 네리마
 *   - 도에이 오에도선
 *
 * 향후 추가:
 * SI06  세이부 유라쿠초선 / 도시마선
 * SI17  세이부 신주쿠선
 * SI18  세이부 사야마선
 * SI26  JR 하치코선
 * SI31  세이부 치치부선
 *
 * 해당 노선이 Expo Registry에 등록된 뒤 활성화한다.
 * =========================================================
 */

const createTransfers = (stationId: string) => {
  switch (stationId) {
    case "SI01":
      return [
        {
          id: "yamanote",
          nameKo: "JR 야마노테선",
          nameJa: "JR山手線",
          code: "JY",
          color: "#80C41C",
        },
        {
          id: "marunouchi",
          nameKo: "도쿄메트로 마루노우치선",
          nameJa: "東京メトロ丸ノ内線",
          code: "M",
          color: "#F62E36",
        },
        {
          id: "yurakucho",
          nameKo: "도쿄메트로 유라쿠초선",
          nameJa: "東京メトロ有楽町線",
          code: "Y",
          color: "#C1A470",
        },
        {
          id: "fukutoshin",
          nameKo: "도쿄메트로 후쿠토신선",
          nameJa: "東京メトロ副都心線",
          code: "F",
          color: "#9C5E31",
        },
      ];

    case "SI06":
      return [
        {
          id: "oedo",
          nameKo: "도에이 오에도선",
          nameJa: "都営大江戸線",
          code: "E",
          color: "#B6007A",
        },
      ];
      
    case "SI17":
      return [
        {
          id: "seibu-shinjuku",
          nameKo: "세이부 신주쿠선",
          nameJa: "西武新宿線",
          code: "SS",
          color: "#00A6BF",
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

export const seibuIkebukuroStations: Station[] =
  SEIBU_IKEBUKURO_STATION_BASE.map((station, index) => {
    const previousStation = SEIBU_IKEBUKURO_STATION_BASE[index - 1];
    const nextStation = SEIBU_IKEBUKURO_STATION_BASE[index + 1];

    const isIkebukuro = station.id === "SI01";
    const isAgano = station.id === "SI31";

    /*
     * =====================================================
     * SI01 이케부쿠로
     * =====================================================
     */

    if (isIkebukuro && nextStation) {
      return {
        id: station.id,
        operatorId: "seibu",
        lineId: "seibu-ikebukuro",
        lineCode: "SI",
        lineNameKo: "세이부 이케부쿠로선",
        lineNameJa: "西武池袋線",
        code: station.id,
        nameKo: station.nameKo,
        nameJa: station.nameJa,
        color: SEIBU_IKEBUKURO_COLOR,
        type: "terminal",
        directions: [
          {
            id: "Outbound",
            label: "토코로자와·한노 방면",
            description: "→ 네리마·토코로자와·한노·아가노 방면",
            nextStations: [createNextStation(nextStation)],
          },
        ],
        transfers: createTransfers(station.id),
      };
    }

    /*
     * =====================================================
     * SI31 아가노
     * =====================================================
     */

    if (isAgano && previousStation) {
      return {
        id: station.id,
        operatorId: "seibu",
        lineId: "seibu-ikebukuro",
        lineCode: "SI",
        lineNameKo: "세이부 이케부쿠로선",
        lineNameJa: "西武池袋線",
        code: station.id,
        nameKo: station.nameKo,
        nameJa: station.nameJa,
        color: SEIBU_IKEBUKURO_COLOR,
        type: "terminal",
        directions: [
          {
            id: "Inbound",
            label: "한노·이케부쿠로 방면",
            description: "→ 한노·토코로자와·네리마·이케부쿠로 방면",
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
        `세이부 이케부쿠로선 다음역 생성 실패: ${station.id}`,
      );
    }

    return {
      id: station.id,
      operatorId: "seibu",
      lineId: "seibu-ikebukuro",
      lineCode: "SI",
      lineNameKo: "세이부 이케부쿠로선",
      lineNameJa: "西武池袋線",
      code: station.id,
      nameKo: station.nameKo,
      nameJa: station.nameJa,
      color: SEIBU_IKEBUKURO_COLOR,
      type: "normal",
      directions: [
        {
          id: "Inbound",
          label: "이케부쿠로 방면",
          description: "→ 토코로자와·네리마·이케부쿠로 방면",
          nextStations: [createNextStation(previousStation)],
        },
        {
          id: "Outbound",
          label: "한노·아가노 방면",
          description: "→ 토코로자와·한노·아가노 방면",
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
 * 실제 시간표는
 * tokyo-railway-api → ODPT Challenge API 사용.
 *
 * Backend:
 * operator = seibu
 * lineId = ikebukuro
 *
 * 실시간 getTrains는 현재 Seibu Provider에서
 * 아직 구현되지 않았으므로 빈 fallback을 사용한다.
 * =========================================================
 */

export const seibuIkebukuroTrains: Record<string, Train[]> = {};