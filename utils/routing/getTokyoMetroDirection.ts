type TokyoMetroLineConfig = {
  stationOrder: string[];
  forwardDirection: string;
  backwardDirection: string;
};

const TOKYO_METRO_LINES: Record<string, TokyoMetroLineConfig> = {
  ginza: {
    stationOrder: [
      "G01", "G02", "G03", "G04", "G05",
      "G06", "G07", "G08", "G09", "G10",
      "G11", "G12", "G13", "G14", "G15",
      "G16", "G17", "G18", "G19",
    ],
    forwardDirection: "asakusa",
    backwardDirection: "shibuya",
  },

  marunouchi: {
    stationOrder: [
      "M01", "M02", "M03", "M04", "M05",
      "M06", "M07", "M08", "M09", "M10",
      "M11", "M12", "M13", "M14", "M15",
      "M16", "M17", "M18", "M19", "M20",
      "M21", "M22", "M23", "M24", "M25",
    ],
    forwardDirection: "ikebukuro",
    backwardDirection: "ogikubo",
  },

  hibiya: {
    stationOrder: [
      "H01", "H02", "H03", "H04", "H05",
      "H06", "H07", "H08", "H09", "H10",
      "H11", "H12", "H13", "H14", "H15",
      "H16", "H17", "H18", "H19", "H20",
      "H21", "H22",
    ],
    forwardDirection: "kitasenju",
    backwardDirection: "nakameguro",
  },

  tozai: {
    stationOrder: [
      "T01", "T02", "T03", "T04", "T05",
      "T06", "T07", "T08", "T09", "T10",
      "T11", "T12", "T13", "T14", "T15",
      "T16", "T17", "T18", "T19", "T20",
      "T21", "T22", "T23",
    ],
    forwardDirection: "nishifunabashi",
    backwardDirection: "nakano",
  },

  chiyoda: {
    stationOrder: [
      "C01", "C02", "C03", "C04", "C05",
      "C06", "C07", "C08", "C09", "C10",
      "C11", "C12", "C13", "C14", "C15",
      "C16", "C17", "C18", "C19", "C20",
    ],
    forwardDirection: "kitaayase",
    backwardDirection: "yoyogiuehara",
  },

  yurakucho: {
    stationOrder: [
      "Y01", "Y02", "Y03", "Y04", "Y05",
      "Y06", "Y07", "Y08", "Y09", "Y10",
      "Y11", "Y12", "Y13", "Y14", "Y15",
      "Y16", "Y17", "Y18", "Y19", "Y20",
      "Y21", "Y22", "Y23", "Y24",
    ],
    forwardDirection: "shinkiba",
    backwardDirection: "wakoshi",
  },

  hanzomon: {
    stationOrder: [
      "Z01", "Z02", "Z03", "Z04", "Z05",
      "Z06", "Z07", "Z08", "Z09", "Z10",
      "Z11", "Z12", "Z13", "Z14",
    ],
    forwardDirection: "oshiage",
    backwardDirection: "shibuya",
  },

  namboku: {
    stationOrder: [
      "N01", "N02", "N03", "N04", "N05",
      "N06", "N07", "N08", "N09", "N10",
      "N11", "N12", "N13", "N14", "N15",
      "N16", "N17", "N18", "N19",
    ],
    forwardDirection: "akabaneiwabuchi",
    backwardDirection: "meguro",
  },

  fukutoshin: {
    stationOrder: [
      "F01", "F02", "F03", "F04", "F05",
      "F06", "F07", "F08", "F09", "F10",
      "F11", "F12", "F13", "F14", "F15",
      "F16",
    ],
    forwardDirection: "shibuya",
    backwardDirection: "wakoshi",
  },
};

export const getTokyoMetroDirection = (
  lineId: string,
  fromStationId: string,
  toStationId: string,
): string | null => {
  const config = TOKYO_METRO_LINES[lineId];

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