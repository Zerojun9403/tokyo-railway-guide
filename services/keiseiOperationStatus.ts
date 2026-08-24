import type { OperationStatus, OperationStatusType } from "./operationStatus";

import {
  detectOperationStatus,
  getOperationStatusTitle,
} from "./operationStatus";

/*
 * =========================================================
 * Tokyo Railway Guide
 * Keisei Operation Status Service
 * =========================================================
 *
 * 역할:
 *
 * Expo App
 *
 *       ↓
 *
 * Next.js API
 *
 *       ↓
 *
 * Keisei traffic_info
 *
 *       ↓
 *
 * 이 파일에서 공통 OperationStatus로 변환
 *
 * =========================================================
 */

/*
 * =========================================================
 * API Base URL
 * =========================================================
 *
 * 현재 우리가 사용하고 있는 Next.js 서버.
 *
 * Vercel 배포 주소를 사용한다.
 * =========================================================
 */

const API_BASE_URL = "https://tokyo-metro-sigma.vercel.app";

/*
 * =========================================================
 * API 응답 타입
 * =========================================================
 *
 * Next.js API에서 반환할 공통 형태.
 * =========================================================
 */

type KeiseiOperationApiResponse = {
  success?: boolean;

  status?: string;

  title?: string;

  message?: string | null;

  updatedAt?: string | null;

  source?: string;

  sourceUrl?: string;

  /*
   * 원본 traffic_info를
   * 그대로 포함하는 경우를 대비한다.
   */

  trafficInfo?: unknown;

  data?: unknown;

  error?: string;
};

/*
 * =========================================================
 * JSON → 문자열 추출
 * =========================================================
 *
 * 게이세이 traffic_info의 구조가 변경되거나
 * 중첩 JSON 형태여도 fallback 판별할 수 있도록
 * 문자열로 변환한다.
 *
 * 구조화된 status 값이 있으면 그것을 우선 사용한다.
 * =========================================================
 */

const stringifyTrafficInfo = (value: unknown): string => {
  if (value == null) {
    return "";
  }

  if (typeof value === "string") {
    return value;
  }

  try {
    return JSON.stringify(value);
  } catch {
    return "";
  }
};

/*
 * =========================================================
 * API status → 공통 상태
 * =========================================================
 */

const normalizeStatus = (value?: string | null): OperationStatusType | null => {
  if (!value) {
    return null;
  }

  const normalized = value.trim().toLowerCase();

  switch (normalized) {
    case "normal":
    case "ok":
    case "正常":
    case "平常":
      return "normal";

    case "delay":
    case "delayed":
    case "遅延":
      return "delay";

    case "suspended":
    case "suspension":
    case "運休":
    case "運転見合わせ":
      return "suspended";

    case "disruption":
    case "trouble":
    case "運転変更":
      return "disruption";

    case "unknown":
      return "unknown";

    default:
      return null;
  }
};

/*
 * =========================================================
 * 게이세이 상태 판별
 * =========================================================
 */

const parseKeiseiStatus = (
  response: KeiseiOperationApiResponse,
): OperationStatusType => {
  /*
   * 1.
   * 서버가 구조화된 status를 반환한다면
   * 그것을 최우선 사용
   */

  const structuredStatus = normalizeStatus(response.status);

  if (structuredStatus) {
    return structuredStatus;
  }

  /*
   * 2.
   * title / message / trafficInfo 등을
   * 합쳐서 fallback 판별
   */

  const text = [
    response.title,
    response.message,
    stringifyTrafficInfo(response.trafficInfo),
    stringifyTrafficInfo(response.data),
  ]
    .filter(Boolean)
    .join(" ");

  return detectOperationStatus(text);
};

/*
 * =========================================================
 * 게이세이 운행정보 가져오기
 * =========================================================
 */

export const fetchKeiseiOperationStatus =
  async (): Promise<OperationStatus> => {
    /*
     * =====================================================
     * API Route
     * =====================================================
     *
     * 다음 단계에서 Next.js 쪽에
     *
     * /api/keisei/operation-status
     *
     * 를 만든다.
     * =====================================================
     */

    const url = `${API_BASE_URL}/api/keisei/operation-status`;

    try {
      const response = await fetch(url, {
        method: "GET",

        headers: {
          Accept: "application/json",
        },
      });

      /*
       * ===================================================
       * HTTP 오류
       * ===================================================
       */

      if (!response.ok) {
        return {
          operatorId: "keisei",

          lineId: "keisei-main",

          lineNameKo: "게이세이 본선",

          lineNameJa: "京成本線",

          status: "unknown",

          title: "정보확인중",

          message: `게이세이 운행정보를 불러오지 못했습니다. (${response.status})`,

          updatedAt: null,

          source: "Keisei",

          sourceUrl: url,
        };
      }

      /*
       * ===================================================
       * JSON
       * ===================================================
       */

      const data = (await response.json()) as KeiseiOperationApiResponse;

      /*
       * 서버에서 명시적으로 실패를 반환한 경우
       */

      if (data.success === false) {
        return {
          operatorId: "keisei",

          lineId: "keisei-main",

          lineNameKo: "게이세이 본선",

          lineNameJa: "京成本線",

          status: "unknown",

          title: "정보확인중",

          message: data.error ?? "게이세이 운행정보를 확인할 수 없습니다.",

          updatedAt: data.updatedAt ?? null,

          source: "Keisei",

          sourceUrl: data.sourceUrl ?? url,
        };
      }

      /*
       * ===================================================
       * 상태 판별
       * ===================================================
       */

      const status = parseKeiseiStatus(data);

      /*
       * ===================================================
       * 공통 OperationStatus
       * ===================================================
       */

      return {
        operatorId: "keisei",

        lineId: "keisei-main",

        lineNameKo: "게이세이 본선",

        lineNameJa: "京成本線",

        status,

        title: data.title ?? getOperationStatusTitle(status),

        message: data.message ?? null,

        updatedAt: data.updatedAt ?? null,

        source: "Keisei",

        sourceUrl: data.sourceUrl ?? url,
      };
    } catch (error) {
      /*
       * ===================================================
       * 네트워크 / JSON 오류
       * ===================================================
       *
       * 절대 normal로 반환하지 않는다.
       * ===================================================
       */

      console.error("Keisei operation status error:", error);

      return {
        operatorId: "keisei",

        lineId: "keisei-main",

        lineNameKo: "게이세이 본선",

        lineNameJa: "京成本線",

        status: "unknown",

        title: "정보확인중",

        message: "게이세이 운행정보 서버에 연결할 수 없습니다.",

        updatedAt: null,

        source: "Keisei",

        sourceUrl: url,
      };
    }
  };
