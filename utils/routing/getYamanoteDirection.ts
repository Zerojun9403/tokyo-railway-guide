const YAMANOTE_ORDER = [
  "JY01",
  "JY02",
  "JY03",
  "JY04",
  "JY05",
  "JY06",
  "JY07",
  "JY08",
  "JY09",
  "JY10",
  "JY11",
  "JY12",
  "JY13",
  "JY14",
  "JY15",
  "JY16",
  "JY17",
  "JY18",
  "JY19",
  "JY20",
  "JY21",
  "JY22",
  "JY23",
  "JY24",
  "JY25",
  "JY26",
  "JY27",
  "JY28",
  "JY29",
  "JY30",
] as const;

export type YamanoteDirection =
  | "InnerLoop"
  | "OuterLoop";

export const getYamanoteDirection = (
  fromStationId: string,
  toStationId: string,
): YamanoteDirection | null => {
  const fromIndex =
    YAMANOTE_ORDER.indexOf(
      fromStationId as (typeof YAMANOTE_ORDER)[number],
    );

  const toIndex =
    YAMANOTE_ORDER.indexOf(
      toStationId as (typeof YAMANOTE_ORDER)[number],
    );

  if (
    fromIndex === -1 ||
    toIndex === -1 ||
    fromIndex === toIndex
  ) {
    return null;
  }

  const stationCount =
    YAMANOTE_ORDER.length;

  const forwardDistance =
    (toIndex - fromIndex + stationCount) %
    stationCount;

  const backwardDistance =
    (fromIndex - toIndex + stationCount) %
    stationCount;

  /*
   * JY 번호 증가 방향:
   * Tokyo → ... → Ikebukuro → Shinjuku → Shibuya ...
   *
   * ODPT 기준 InnerLoop.
   *
   * 반대 방향은 OuterLoop.
   */
  return forwardDistance <= backwardDistance
    ? "InnerLoop"
    : "OuterLoop";
};