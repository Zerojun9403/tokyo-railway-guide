import stationCoordinates from "../../data/stationCoordinates.json";
import { getAllStations } from "../../data/railwayRegistry";

export type StationCoordinate = {
  operatorId: string;
  odptOperatorId: string;
  odptStationId: string | null;
  railwayId: string | null;
  stationCode: string | null;
  nameJa: string | null;
  nameEn: string | null;
  latitude: number;
  longitude: number;
};

export type NearestStationCoordinate = StationCoordinate & {
  distance: number;
};

export type NearestGuideStation = {
  station: ReturnType<typeof getAllStations>[number];
  distance: number;
};

const toRadians = (degree: number) => {
  return (degree * Math.PI) / 180;
};

export const calculateDistance = (
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number,
) => {
  const earthRadius = 6371000;

  const latitudeDifference = toRadians(latitude2 - latitude1);
  const longitudeDifference = toRadians(longitude2 - longitude1);

  const firstLatitude = toRadians(latitude1);
  const secondLatitude = toRadians(latitude2);

  const a =
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(firstLatitude) *
      Math.cos(secondLatitude) *
      Math.sin(longitudeDifference / 2) ** 2;

  return (
    earthRadius *
    2 *
    Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
  );
};

export const findNearestStationCoordinate = (
  latitude: number,
  longitude: number,
): NearestStationCoordinate | null => {
  const stations = stationCoordinates as StationCoordinate[];

  let nearest: NearestStationCoordinate | null = null;

  for (const station of stations) {
    const distance = calculateDistance(
      latitude,
      longitude,
      station.latitude,
      station.longitude,
    );

    if (!nearest || distance < nearest.distance) {
      nearest = {
        ...station,
        distance,
      };
    }
  }

  return nearest;
};

export const findNearestGuideStation = (
  latitude: number,
  longitude: number,
): NearestGuideStation | null => {
  const guideStations = getAllStations();
  const coordinates = stationCoordinates as StationCoordinate[];

  let nearest: NearestGuideStation | null = null;

  for (const station of guideStations) {
    const coordinate = coordinates.find(
      (item) => item.nameJa === station.nameJa,
    );

    if (!coordinate) {
      continue;
    }

    const distance = calculateDistance(
      latitude,
      longitude,
      coordinate.latitude,
      coordinate.longitude,
    );

    if (!nearest || distance < nearest.distance) {
      nearest = {
        station,
        distance,
      };
    }
  }

  return nearest;
};