export type ChuoSobuDirection =
  | "Eastbound"
  | "Westbound";

const CHUO_SOBU_ORDER = [
  "JB01",
  "JB02",
  "JB03",
  "JB04",
  "JB05",
  "JB06",
  "JB07",
  "JB08",
  "JB09",
  "JB10",
  "JB11",
  "JB12",
  "JB13",
  "JB14",
  "JB15",
  "JB16",
  "JB17",
  "JB18",
  "JB19",
  "JB20",
  "JB21",
  "JB22",
  "JB23",
  "JB24",
  "JB25",
  "JB26",
  "JB27",
  "JB28",
  "JB29",
  "JB30",
  "JB31",
  "JB32",
  "JB33",
  "JB34",
  "JB35",
  "JB36",
  "JB37",
  "JB38",
  "JB39",
] as const;

export const getChuoSobuDirection = (
  fromStationId: string,
  toStationId: string,
): ChuoSobuDirection | null => {
  const fromIndex = CHUO_SOBU_ORDER.indexOf(
    fromStationId as (typeof CHUO_SOBU_ORDER)[number],
  );

  const toIndex = CHUO_SOBU_ORDER.indexOf(
    toStationId as (typeof CHUO_SOBU_ORDER)[number],
  );

  if (
    fromIndex === -1 ||
    toIndex === -1 ||
    fromIndex === toIndex
  ) {
    return null;
  }

  return toIndex > fromIndex
    ? "Eastbound"
    : "Westbound";
};