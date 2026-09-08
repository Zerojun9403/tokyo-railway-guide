type ToeiLineConfig = {
  stationOrder: string[];
  forwardDirection: string;
  backwardDirection: string;
};

const TOEI_LINES: Record<string, ToeiLineConfig> = {
  /*
   * =========================================================
   * Asakusa Line
   * A01 Nishi-magome → A20 Oshiage
   * =========================================================
   */
  asakusa: {
    stationOrder: [
      "A01", "A02", "A03", "A04", "A05",
      "A06", "A07", "A08", "A09", "A10",
      "A11", "A12", "A13", "A14", "A15",
      "A16", "A17", "A18", "A19", "A20",
    ],
    forwardDirection: "oshiage",
    backwardDirection: "nishimagome",
  },

  /*
   * =========================================================
   * Mita Line
   * I01 Meguro → I27 Nishi-takashimadaira
   * =========================================================
   */
  mita: {
    stationOrder: [
      "I01", "I02", "I03", "I04", "I05",
      "I06", "I07", "I08", "I09", "I10",
      "I11", "I12", "I13", "I14", "I15",
      "I16", "I17", "I18", "I19", "I20",
      "I21", "I22", "I23", "I24", "I25",
      "I26", "I27",
    ],
    forwardDirection: "nishitakashimadaira",
    backwardDirection: "meguro",
  },

  /*
   * =========================================================
   * Shinjuku Line
   * S01 Shinjuku → S21 Motoyawata
   * =========================================================
   */
  shinjuku: {
    stationOrder: [
      "S01", "S02", "S03", "S04", "S05",
      "S06", "S07", "S08", "S09", "S10",
      "S11", "S12", "S13", "S14", "S15",
      "S16", "S17", "S18", "S19", "S20",
      "S21",
    ],
    forwardDirection: "motoyawata",
    backwardDirection: "shinjuku",
  },
};

const OEDO_STATION_ORDER = [
  "E01", "E02", "E03", "E04", "E05",
  "E06", "E07", "E08", "E09", "E10",
  "E11", "E12", "E13", "E14", "E15",
  "E16", "E17", "E18", "E19", "E20",
  "E21", "E22", "E23", "E24", "E25",
  "E26", "E27", "E28", "E29", "E30",
  "E31", "E32", "E33", "E34", "E35",
  "E36", "E37", "E38",
];

const getOedoDirection = (
  fromStationId: string,
  toStationId: string,
): string | null => {
  const fromIndex =
    OEDO_STATION_ORDER.indexOf(fromStationId);

  const toIndex =
    OEDO_STATION_ORDER.indexOf(toStationId);

  if (
    fromIndex === -1 ||
    toIndex === -1 ||
    fromIndex === toIndex
  ) {
    return null;
  }

  /*
   * E01 → E28 구간
   * 신주쿠니시구치 → 도초마에
   *
   * 역 번호가 증가하는 방향은
   * 롯폰기 / 다이몬 방면 InnerLoop.
   */
  if (fromIndex < 28 && toIndex < 28) {
    return toIndex > fromIndex
      ? "inner"
      : "outer";
  }

  /*
   * E28 → E38 구간
   * 도초마에 → 히카리가오카
   *
   * 도초마에에서 히카리가오카 방향은
   * 기존 API Provider의 전용 direction ID 사용.
   */
  if (fromIndex >= 27 && toIndex >= 27) {
    return toIndex > fromIndex
      ? "nerima-hikarigaoka"
      : "outer";
  }

  /*
   * 순환부 → 히카리가오카 방면
   */
  if (fromIndex < 27 && toIndex > 27) {
    return "inner";
  }

  /*
   * 히카리가오카 방면 → 순환부
   */
  if (fromIndex > 27 && toIndex < 27) {
    return "outer";
  }

  return null;
};

export const getToeiDirection = (
  lineId: string,
  fromStationId: string,
  toStationId: string,
): string | null => {
  if (lineId === "oedo") {
    return getOedoDirection(
      fromStationId,
      toStationId,
    );
  }

  const config = TOEI_LINES[lineId];

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