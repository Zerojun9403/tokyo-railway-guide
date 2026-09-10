import { getYamanoteDirection } from "./getYamanoteDirection";
import { getSaikyoDirection } from "./getSaikyoDirection";
import { getChuoRapidDirection } from "./getChuoRapidDirection";
import { getChuoSobuDirection } from "./getChuoSobuDirection";

type LineDirectionConfig = {
  stationOrder: string[];
  forwardDirection: string;
  backwardDirection: string;
};

const range = (prefix: string, start: number, end: number): string[] =>
  Array.from(
    { length: end - start + 1 },
    (_, index) => `${prefix}${String(start + index).padStart(2, "0")}`,
  );

const JR_EAST_LINE_CONFIGS: Record<string, LineDirectionConfig> = {
  "shonan-shinjuku": {
    stationOrder: range("JS", 9, 24),
    forwardDirection: "Northbound",
    backwardDirection: "Southbound",
  },

  tokaido: {
    stationOrder: range("JT", 1, 21),
    forwardDirection: "Outbound",
    backwardDirection: "Inbound",
  },

  "keihin-tohoku": {
    stationOrder: range("JK", 1, 47),
    forwardDirection: "Northbound",
    backwardDirection: "Southbound",
  },

  keiyo: {
    stationOrder: range("JE", 1, 18),
    forwardDirection: "Outbound",
    backwardDirection: "Inbound",
  },

  yokosuka: {
    stationOrder: range("JO", 1, 19),
    forwardDirection: "Inbound",
    backwardDirection: "Outbound",
  },

  "sobu-rapid": {
    stationOrder: range("JO", 19, 28),
    forwardDirection: "Outbound",
    backwardDirection: "Inbound",
  },

  sobu: {
    stationOrder: range("JO", 28, 37),
    forwardDirection: "Outbound",
    backwardDirection: "Inbound",
  },
};

const getOrderedLineDirection = (
  lineId: string,
  fromStationId: string,
  toStationId: string,
): string | null => {
  const config = JR_EAST_LINE_CONFIGS[lineId];

  if (!config) {
    return null;
  }

  const fromIndex = config.stationOrder.indexOf(fromStationId);
  const toIndex = config.stationOrder.indexOf(toStationId);

  if (fromIndex === -1 || toIndex === -1 || fromIndex === toIndex) {
    return null;
  }

  return toIndex > fromIndex
    ? config.forwardDirection
    : config.backwardDirection;
};

export const getJrEastDirection = (
  lineId: string,
  fromStationId: string,
  toStationId: string,
): string | null => {
  switch (lineId) {
    case "yamanote":
      return getYamanoteDirection(fromStationId, toStationId);

    case "saikyo":
      return getSaikyoDirection(fromStationId, toStationId);

    case "chuo-rapid":
      return getChuoRapidDirection(fromStationId, toStationId);

    case "chuo-sobu":
    case "chuo-sobu-local":
      return getChuoSobuDirection(fromStationId, toStationId);

    case "shonan-shinjuku":
    case "tokaido":
    case "keihin-tohoku":
    case "keiyo":
    case "yokosuka":
    case "sobu":
    case "sobu-rapid":
      return getOrderedLineDirection(lineId, fromStationId, toStationId);

    default:
      return null;
  }
};
