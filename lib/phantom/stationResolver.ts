import { getAllStations } from "../../data/railwayRegistry";
import type { Station } from "../../types/station";

export type PhantomStationMatch = {
  nameKo: string;
  nameJa: string;

  stations: Station[];

  representativeStation: Station;
};

const normalizeStationName = (value: string): string => {
  return value
    .trim()
    .toLowerCase()
    .replace(/\s+/g, "")
    .replace(/역$/u, "");
};

export const resolvePhantomStation = (
  stationName: string,
): PhantomStationMatch | null => {
  const normalizedQuery = normalizeStationName(stationName);

  if (!normalizedQuery) {
    return null;
  }

  const matchedStations = getAllStations().filter((station) => {
    const normalizedKo = normalizeStationName(station.nameKo);
    const normalizedJa = normalizeStationName(station.nameJa);

    return (
      normalizedKo === normalizedQuery ||
      normalizedJa === normalizedQuery
    );
  });

  if (matchedStations.length === 0) {
    return null;
  }

  const representativeStation = matchedStations[0];

  return {
    nameKo: representativeStation.nameKo,
    nameJa: representativeStation.nameJa,
    stations: matchedStations,
    representativeStation,
  };
};