type KeikyuLineConfig = {
  stationOrder: string[];
  forwardDirection: string;
  backwardDirection: string;
};

const KEIKYU_LINES: Record<string, KeikyuLineConfig> = {
  "keikyu-main": {
    stationOrder: [
      "KK01",
      "KK02",
      "KK03",
      "KK04",
      "KK05",
      "KK06",
      "KK07",
      "KK08",
      "KK09",
      "KK10",
      "KK11",
      "KK18",
      "KK19",
      "KK20",
      "KK27",
      "KK28",
      "KK29",
      "KK30",
      "KK31",
      "KK32",
      "KK33",
      "KK34",
      "KK35",
      "KK36",
      "KK37",
      "KK38",
      "KK39",
      "KK40",
      "KK41",
      "KK42",
      "KK43",
      "KK44",
      "KK45",
      "KK46",
      "KK47",
      "KK48",
      "KK49",
      "KK50",
      "KK54",
      "KK55",
      "KK56",
      "KK57",
      "KK58",
      "KK59",
      "KK60",
      "KK61",
      "KK62",
      "KK63",
      "KK64",
    ],
    forwardDirection: "Outbound",
    backwardDirection: "Inbound",
  },

  "keikyu-airport": {
    stationOrder: [
      "KK11",
      "KK12",
      "KK13",
      "KK14",
      "KK15",
      "KK16",
      "KK17",
    ],
    forwardDirection: "Outbound",
    backwardDirection: "Inbound",
  },
};

export const getKeikyuDirection = (
  lineId: string,
  fromStationId: string,
  toStationId: string,
): string | null => {
  const config = KEIKYU_LINES[lineId];

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
