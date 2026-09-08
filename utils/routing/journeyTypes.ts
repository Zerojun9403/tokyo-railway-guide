import type { RailwayNodeId } from "./types";

export type JourneySegment = {
  lineId: string;

  fromNodeId: RailwayNodeId;
  toNodeId: RailwayNodeId;

  fromStationId: string;
  toStationId: string;

  fromStationNameKo: string;
  toStationNameKo: string;

  rideCount: number;
};

export type JourneyTransfer = {
  fromNodeId: RailwayNodeId;
  toNodeId: RailwayNodeId;

  stationNameKo: string;

  fromLineId: string;
  toLineId: string;
};

export type JourneyStructure = {
  segments: JourneySegment[];
  transfers: JourneyTransfer[];
};