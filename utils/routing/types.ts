import type { Station } from "../../types/station";

export type RailwayNodeId = `${string}:${string}`;

export type RailwayNode = {
  id: RailwayNodeId;

  lineId: string;
  stationId: string;

  station: Station;
};

export type RailwayEdgeType = "ride" | "transfer";

export type RailwayEdge = {
  from: RailwayNodeId;
  to: RailwayNodeId;

  type: RailwayEdgeType;

  lineId?: string;

  minutes?: number;
};

export type RailwayGraph = {
  nodes: Map<RailwayNodeId, RailwayNode>;
  edges: Map<RailwayNodeId, RailwayEdge[]>;
};

export const createRailwayNodeId = (
  lineId: string,
  stationId: string,
): RailwayNodeId => {
  return `${lineId}:${stationId}`;
};