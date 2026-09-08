import { getJrEastDirection } from "./getJrEastDirection";
import { getTokyoMetroDirection } from "./getTokyoMetroDirection";
import { getToeiDirection } from "./getToeiDirection";
import { getTokyuDirection } from "./getTokyuDirection";
import { getKeikyuDirection } from "./getKeikyuDirection";
import { getSeibuDirection } from "./getSeibuDirection";

const JR_EAST_LINES = new Set([
  "yamanote",
  "saikyo",
  "chuo-rapid",
  "chuo-sobu",
  "shonan-shinjuku",
  "tokaido",
  "keihin-tohoku",
  "keiyo",
  "yokosuka",
  "sobu",
  "sobu-rapid",
]);

const TOKYO_METRO_LINES = new Set([
  "ginza",
  "marunouchi",
  "hibiya",
  "tozai",
  "chiyoda",
  "yurakucho",
  "hanzomon",
  "namboku",
  "fukutoshin",
]);

const TOEI_LINES = new Set([
  "asakusa",
  "mita",
  "shinjuku",
  "oedo",
]);

const TOKYU_LINES = new Set([
  "tokyu-toyoko",
  "tokyu-meguro",
  "tokyu-den-en-toshi",
  "tokyu-oimachi",
  "tokyu-shin-yokohama",
]);

const KEIKYU_LINES = new Set([
  "keikyu-main",
  "keikyu-airport",
]);

const SEIBU_LINES = new Set([
  "seibu-ikebukuro",
  "seibu-shinjuku",
]);

export const getSegmentDirection = (
  lineId: string,
  fromStationId: string,
  toStationId: string,
): string | null => {
  if (JR_EAST_LINES.has(lineId)) {
    return getJrEastDirection(
      lineId,
      fromStationId,
      toStationId,
    );
  }

  if (TOKYO_METRO_LINES.has(lineId)) {
    return getTokyoMetroDirection(
      lineId,
      fromStationId,
      toStationId,
    );
  }

  if (TOEI_LINES.has(lineId)) {
    return getToeiDirection(
      lineId,
      fromStationId,
      toStationId,
    );
  }

  if (TOKYU_LINES.has(lineId)) {
    return getTokyuDirection(
      lineId,
      fromStationId,
      toStationId,
    );
  }

  if (KEIKYU_LINES.has(lineId)) {
    return getKeikyuDirection(
      lineId,
      fromStationId,
      toStationId,
    );
  }

  if (SEIBU_LINES.has(lineId)) {
    return getSeibuDirection(
      lineId,
      fromStationId,
      toStationId,
    );
  }

  return null;
};
