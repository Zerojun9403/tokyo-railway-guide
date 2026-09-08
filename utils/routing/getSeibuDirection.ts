type SeibuLineConfig = {
  stationOrder: string[];
  forwardDirection: string;
  backwardDirection: string;
};

const SEIBU_LINES: Record<string, SeibuLineConfig> = {
  "seibu-ikebukuro": {
    stationOrder: [
      "SI01", "SI02", "SI03", "SI04", "SI05", "SI06", "SI07", "SI08",
      "SI09", "SI10", "SI11", "SI12", "SI13", "SI14", "SI15", "SI16",
      "SI17", "SI18", "SI19", "SI20", "SI21", "SI22", "SI23", "SI24",
      "SI25", "SI26", "SI27", "SI28", "SI29", "SI30", "SI31",
    ],
    forwardDirection: "Outbound",
    backwardDirection: "Inbound",
  },

  "seibu-shinjuku": {
    stationOrder: [
      "SS01", "SS02", "SS03", "SS04", "SS05", "SS06", "SS07", "SS08",
      "SS09", "SS10", "SS11", "SS12", "SS13", "SS14", "SS15", "SS16",
      "SS17", "SS18", "SS19", "SS20", "SS21", "SS22", "SS23", "SS24",
      "SS25", "SS26", "SS27", "SS28", "SS29",
    ],
    forwardDirection: "Outbound",
    backwardDirection: "Inbound",
  },
};

export const getSeibuDirection = (
  lineId: string,
  fromStationId: string,
  toStationId: string,
): string | null => {
  const config = SEIBU_LINES[lineId];

  if (!config) {
    return null;
  }

  const fromIndex = config.stationOrder.indexOf(fromStationId);
  const toIndex = config.stationOrder.indexOf(toStationId);

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
