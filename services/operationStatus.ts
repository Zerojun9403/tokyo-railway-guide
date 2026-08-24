/*
 * =========================================================
 * Tokyo Railway Guide
 * Operation Status
 * =========================================================
 *
 * 철도회사마다 서로 다른 운행정보를
 * 앱에서 사용할 하나의 형식으로 통일한다.
 *
 * JR / Keisei / Toei
 *
 *        ↓
 *
 * OperationStatus
 *
 *        ↓
 *
 * normal
 * delay
 * suspended
 * disruption
 * unknown
 *
 * =========================================================
 */

/*
 * =========================================================
 * 운행 상태
 * =========================================================
 */

export type OperationStatusType =
  | "normal"
  | "delay"
  | "suspended"
  | "disruption"
  | "unknown";

/*
 * =========================================================
 * 철도회사
 * =========================================================
 */

export type OperationOperatorId = "jr-east" | "keisei" | "toei";

/*
 * =========================================================
 * 공통 운행정보
 * =========================================================
 */

export type OperationStatus = {
  /*
   * 철도회사
   *
   * jr-east
   * keisei
   * toei
   */

  operatorId: OperationOperatorId;

  /*
   * 앱 내부 노선 ID
   *
   * yamanote
   * keisei-main
   * oedo
   */

  lineId: string;

  /*
   * 노선명
   */

  lineNameKo: string;

  lineNameJa: string;

  /*
   * 상태
   */

  status: OperationStatusType;

  /*
   * 사용자에게 보여줄 제목
   *
   * 정상운행
   * 지연
   * 운전중지
   */

  title: string;

  /*
   * 상세 메시지
   */

  message: string | null;

  /*
   * 원본 데이터 업데이트 시간
   */

  updatedAt: string | null;

  /*
   * 데이터 출처
   */

  source: "JR-East" | "Keisei" | "Toei";

  /*
   * 원본 URL
   */

  sourceUrl?: string;
};

/*
 * =========================================================
 * UI용 상태 정보
 * =========================================================
 */

export type OperationStatusDisplay = {
  label: string;

  symbol: "●" | "▲" | "×" | "!";

  color: string;

  backgroundColor: string;
};

/*
 * =========================================================
 * 상태별 UI
 * =========================================================
 */

const STATUS_DISPLAY: Record<OperationStatusType, OperationStatusDisplay> = {
  normal: {
    label: "정상운행",

    symbol: "●",

    color: "#16A34A",

    backgroundColor: "#ECFDF3",
  },

  delay: {
    label: "지연",

    symbol: "▲",

    color: "#D97706",

    backgroundColor: "#FFF7E6",
  },

  suspended: {
    label: "운전중지",

    symbol: "×",

    color: "#DC2626",

    backgroundColor: "#FEF2F2",
  },

  disruption: {
    label: "운행장애",

    symbol: "!",

    color: "#DC2626",

    backgroundColor: "#FEF2F2",
  },

  unknown: {
    label: "정보확인중",

    symbol: "●",

    color: "#8A94A3",

    backgroundColor: "#F3F4F6",
  },
};

/*
 * =========================================================
 * 상태 → UI 정보
 * =========================================================
 */

export const getOperationStatusDisplay = (
  status: OperationStatusType,
): OperationStatusDisplay => {
  return STATUS_DISPLAY[status] ?? STATUS_DISPLAY.unknown;
};

/*
 * =========================================================
 * 정상운행 생성
 * =========================================================
 */

export const createNormalOperationStatus = (params: {
  operatorId: OperationOperatorId;

  lineId: string;

  lineNameKo: string;

  lineNameJa: string;

  source: OperationStatus["source"];

  updatedAt?: string | null;

  sourceUrl?: string;
}): OperationStatus => {
  return {
    operatorId: params.operatorId,

    lineId: params.lineId,

    lineNameKo: params.lineNameKo,

    lineNameJa: params.lineNameJa,

    status: "normal",

    title: "정상운행",

    message: null,

    updatedAt: params.updatedAt ?? null,

    source: params.source,

    sourceUrl: params.sourceUrl,
  };
};

/*
 * =========================================================
 * 알 수 없는 상태 생성
 * =========================================================
 *
 * API 실패했다고 정상운행으로 표시하면 안 된다.
 *
 * 네트워크 오류 / 파싱 오류 등은 반드시
 * unknown으로 처리한다.
 * =========================================================
 */

export const createUnknownOperationStatus = (params: {
  operatorId: OperationOperatorId;

  lineId: string;

  lineNameKo: string;

  lineNameJa: string;

  source: OperationStatus["source"];

  message?: string;

  updatedAt?: string | null;

  sourceUrl?: string;
}): OperationStatus => {
  return {
    operatorId: params.operatorId,

    lineId: params.lineId,

    lineNameKo: params.lineNameKo,

    lineNameJa: params.lineNameJa,

    status: "unknown",

    title: "정보확인중",

    message: params.message ?? "운행정보를 확인하고 있습니다.",

    updatedAt: params.updatedAt ?? null,

    source: params.source,

    sourceUrl: params.sourceUrl,
  };
};

/*
 * =========================================================
 * 운행정보 텍스트 → 상태 판별
 * =========================================================
 *
 * 각 철도회사 원본 텍스트를 공통 상태로 변환할 때
 * 보조적으로 사용할 수 있다.
 *
 * 주의:
 *
 * 가능하면 각 회사 Adapter에서
 * 원본 데이터의 구조화된 상태값을 우선 사용한다.
 *
 * 텍스트 판별은 fallback 용도.
 * =========================================================
 */

export const detectOperationStatus = (
  text?: string | null,
): OperationStatusType => {
  if (!text) {
    return "unknown";
  }

  const normalized = text.replace(/\s+/g, "").toLowerCase();

  /*
   * =======================================================
   * 운전중지
   * =======================================================
   */

  const suspendedKeywords = [
    "運転見合わせ",
    "運転を見合わせ",
    "運休",
    "운전중지",
    "운행중지",
    "운휴",
  ];

  if (
    suspendedKeywords.some((keyword) =>
      normalized.includes(keyword.toLowerCase()),
    )
  ) {
    return "suspended";
  }

  /*
   * =======================================================
   * 지연
   * =======================================================
   */

  const delayKeywords = ["遅延", "遅れ", "delay", "지연"];

  if (
    delayKeywords.some((keyword) => normalized.includes(keyword.toLowerCase()))
  ) {
    return "delay";
  }

  /*
   * =======================================================
   * 기타 운행장애
   * =======================================================
   */

  const disruptionKeywords = [
    "運転変更",
    "運転再開",
    "直通運転中止",
    "振替輸送",
    "一部運休",
    "운행변경",
    "운전재개",
    "직통운전중지",
    "대체수송",
  ];

  if (
    disruptionKeywords.some((keyword) =>
      normalized.includes(keyword.toLowerCase()),
    )
  ) {
    return "disruption";
  }

  /*
   * =======================================================
   * 정상
   * =======================================================
   */

  const normalKeywords = [
    "平常運転",
    "平常通り",
    "通常運転",
    "正常運行",
    "正常運転",
    "normal",
    "정상운행",
    "정상운전",
  ];

  if (
    normalKeywords.some((keyword) => normalized.includes(keyword.toLowerCase()))
  ) {
    return "normal";
  }

  return "unknown";
};

/*
 * =========================================================
 * 상태 제목
 * =========================================================
 */

export const getOperationStatusTitle = (status: OperationStatusType) => {
  return getOperationStatusDisplay(status).label;
};

/*
 * =========================================================
 * 심각도
 * =========================================================
 *
 * 여러 노선 상태를 홈에서 보여줄 때 사용.
 *
 * 숫자가 높을수록 사용자에게 중요한 상태.
 * =========================================================
 */

export const getOperationStatusSeverity = (status: OperationStatusType) => {
  switch (status) {
    case "suspended":
      return 4;

    case "disruption":
      return 3;

    case "delay":
      return 2;

    case "unknown":
      return 1;

    case "normal":
    default:
      return 0;
  }
};

/*
 * =========================================================
 * 여러 상태 중 가장 심각한 상태
 * =========================================================
 */

export const getWorstOperationStatus = (
  statuses: OperationStatus[],
): OperationStatus | null => {
  if (statuses.length === 0) {
    return null;
  }

  return [...statuses].sort(
    (a, b) =>
      getOperationStatusSeverity(b.status) -
      getOperationStatusSeverity(a.status),
  )[0];
};
