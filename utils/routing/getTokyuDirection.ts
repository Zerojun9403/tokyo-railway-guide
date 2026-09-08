type TokyuLineConfig = {
  stationOrder: string[];
  forwardDirection: string;
  backwardDirection: string;
};

const TOKYU_LINES: Record<string, TokyuLineConfig> = {
  "tokyu-toyoko": {
    stationOrder: [
      "TY01", "TY02", "TY03", "TY04", "TY05", "TY06", "TY07",
      "TY08", "TY09", "TY10", "TY11", "TY12", "TY13", "TY14",
      "TY15", "TY16", "TY17", "TY18", "TY19", "TY20", "TY21",
    ],
    forwardDirection: "Outbound",
    backwardDirection: "Inbound",
  },

  "tokyu-meguro": {
    stationOrder: [
      "MG01", "MG02", "MG03", "MG04", "MG05", "MG06", "MG07",
      "MG08", "MG09", "MG10", "MG11", "MG12", "MG13",
    ],
    forwardDirection: "Outbound",
    backwardDirection: "Inbound",
  },

  "tokyu-den-en-toshi": {
    stationOrder: [
      "DT01", "DT02", "DT03", "DT04", "DT05", "DT06", "DT07",
      "DT08", "DT09", "DT10", "DT11", "DT12", "DT13", "DT14",
      "DT15", "DT16", "DT17", "DT18", "DT19", "DT20", "DT21",
      "DT22", "DT23", "DT24", "DT25", "DT26", "DT27",
    ],
    forwardDirection: "Outbound",
    backwardDirection: "Inbound",
  },

  "tokyu-oimachi": {
    stationOrder: [
      "OM01", "OM02", "OM03", "OM04", "OM05", "OM06", "OM07",
      "OM08", "OM09", "OM10", "OM11", "OM12", "OM13", "OM14",
      "OM15", "OM16",
    ],
    forwardDirection: "Outbound",
    backwardDirection: "Inbound",
  },

  "tokyu-shin-yokohama": {
    stationOrder: [
      "SH01", "SH02", "SH03",
    ],
    forwardDirection: "Inbound",
    backwardDirection: "Outbound",
  },
};

export const getTokyuDirection = (
  lineId: string,
  fromStationId: string,
  toStationId: string,
): string | null => {
  const config = TOKYU_LINES[lineId];

  if (!config) {
    return null;
  }

  const fromIndex =
    config.stationOrder.indexOf(fromStationId);

  const toIndex =
    config.stationOrder.indexOf(toStationId);

  if (
    fromIndex === -1 ||
    toIndex === -1 ||
    fromIndex === toIndex
  ) {
    return null;
  }

  return toIndex > fromIndex
    ? config.forwardDirection
    : config.backwardDirection;
};
