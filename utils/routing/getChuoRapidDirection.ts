export type ChuoRapidDirection =
  | "Inbound"
  | "Outbound";

const CHUO_RAPID_ORDER = [
  "JC01",
  "JC02",
  "JC03",
  "JC04",
  "JC05",
  "JC06",
  "JC07",
  "JC08",
  "JC09",
  "JC10",
  "JC11",
  "JC12",
  "JC13",
  "JC14",
  "JC15",
  "JC16",
  "JC17",
  "JC18",
  "JC19",
  "JC20",
  "JC21",
  "JC22",
  "JC23",
  "JC24",
] as const;

export const getChuoRapidDirection = (
  fromStationId: string,
  toStationId: string,
): ChuoRapidDirection | null => {
  const fromIndex =
    CHUO_RAPID_ORDER.indexOf(
      fromStationId as (typeof CHUO_RAPID_ORDER)[number],
    );

  const toIndex =
    CHUO_RAPID_ORDER.indexOf(
      toStationId as (typeof CHUO_RAPID_ORDER)[number],
    );

  if (
    fromIndex === -1 ||
    toIndex === -1 ||
    fromIndex === toIndex
  ) {
    return null;
  }

  return toIndex > fromIndex
    ? "Outbound"
    : "Inbound";
};