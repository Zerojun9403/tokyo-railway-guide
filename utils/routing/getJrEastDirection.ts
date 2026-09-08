import { getYamanoteDirection } from "./getYamanoteDirection";
import { getSaikyoDirection } from "./getSaikyoDirection";
import { getChuoRapidDirection } from "./getChuoRapidDirection";
import { getChuoSobuDirection } from "./getChuoSobuDirection";

/*
 * =========================================================
 * JR East Direction Resolver
 * =========================================================
 *
 * route-result.tsx가 개별 JR 노선의 방향 규칙을
 * 직접 알 필요가 없도록 한 곳에서 관리한다.
 *
 * 새 JR 노선을 지원할 때는 이 파일에만
 * 방향 판별 로직을 추가한다.
 *
 * 아직 검증되지 않은 노선은 null을 반환한다.
 * =========================================================
 */

export const getJrEastDirection = (
  lineId: string,
  fromStationId: string,
  toStationId: string,
): string | null => {
  switch (lineId) {
    case "yamanote":
      return getYamanoteDirection(
        fromStationId,
        toStationId,
      );

    case "saikyo":
      return getSaikyoDirection(
        fromStationId,
        toStationId,
      );

    case "chuo-rapid":
      return getChuoRapidDirection(
        fromStationId,
        toStationId,
      );

    case "chuo-sobu":
      return getChuoSobuDirection(
        fromStationId,
        toStationId,
      );

    /*
     * ===============================================
     * JR East Live Journey 예정 노선
     * ===============================================
     *
     * 실제 API 방향값과 역 순서를 검증한 뒤
     * 하나씩 활성화한다.
     */

    case "shonan-shinjuku": {
  if (fromStationId === "JS20" && toStationId === "JS19") {
    return "Southbound";
  }

  if (fromStationId === "JS19" && toStationId === "JS20") {
    return "Northbound";
  }

  return null;
}

case "tokaido":
  if (fromStationId === "JT01" && toStationId === "JT02") {
    return "Outbound";
  }

  if (fromStationId === "JT02" && toStationId === "JT01") {
    return "Inbound";
  }

  return null;

case "keihin-tohoku":
  if (fromStationId === "JK26" && toStationId === "JK25") {
    return "Southbound";
  }

  if (fromStationId === "JK25" && toStationId === "JK26") {
    return "Northbound";
  }

  return null;

case "keiyo":
  if (fromStationId === "JE01" && toStationId === "JE02") {
    return "Outbound";
  }

  if (fromStationId === "JE02" && toStationId === "JE01") {
    return "Inbound";
  }

  return null;

case "yokosuka":
  if (fromStationId === "JO19" && toStationId === "JO18") {
    return "Outbound";
  }

  if (fromStationId === "JO18" && toStationId === "JO19") {
    return "Inbound";
  }

  return null;

case "sobu":
  if (fromStationId === "JO28" && toStationId === "JO30") {
    return "Outbound";
  }

  if (fromStationId === "JO30" && toStationId === "JO28") {
    return "Inbound";
  }

  return null;

case "sobu-rapid":
  if (fromStationId === "JO19" && toStationId === "JO22") {
    return "Outbound";
  }

  if (fromStationId === "JO22" && toStationId === "JO19") {
    return "Inbound";
  }

  return null;
    default:
      return null;
  }
};