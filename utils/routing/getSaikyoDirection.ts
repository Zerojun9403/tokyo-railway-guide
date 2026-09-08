export type SaikyoDirection =
  | "Northbound"
  | "Southbound";

const SAIKYO_ORDER = [
  "JA08",
  "JA09",
  "JA10",
  "JA11",
  "JA12",
  "JA13",
  "JA14",
  "JA15",
  "JA16",
  "JA17",
  "JA18",
  "JA19",
  "JA20",
  "JA21",
  "JA22",
  "JA23",
  "JA24",
  "JA25",
  "JA26",
] as const;

export const getSaikyoDirection = (
  fromStationId: string,
  toStationId: string,
): SaikyoDirection | null => {
  const fromIndex =
    SAIKYO_ORDER.indexOf(
      fromStationId as (typeof SAIKYO_ORDER)[number],
    );

  const toIndex =
    SAIKYO_ORDER.indexOf(
      toStationId as (typeof SAIKYO_ORDER)[number],
    );

  if (
    fromIndex === -1 ||
    toIndex === -1 ||
    fromIndex === toIndex
  ) {
    return null;
  }

  return toIndex > fromIndex
    ? "Northbound"
    : "Southbound";
};