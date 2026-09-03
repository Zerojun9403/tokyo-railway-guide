import type {
  RailwayGraph,
  RailwayNode,
  RailwayNodeId,
} from "./types";

import {
  findMinTransferRoute,
  type MinTransferRouteStep,
} from "./findMinTransferRoute";

type StationRouteCandidate = {
  route: MinTransferRouteStep[];

  transferCount: number;
  rideCount: number;
};

/*
 * =========================================================
 * Physical Station Identity
 * =========================================================
 *
 * normalizeTransfers.ts와 동일한 기준을 사용한다.
 *
 * 현재 프로젝트에서는:
 *
 *   nameKo + nameJa
 *
 * 가 같은 역을 동일한 물리역으로 취급한다.
 * =========================================================
 */

const getStationKey = (node: RailwayNode): string => {
  return [
    node.station.nameKo.trim(),
    node.station.nameJa.trim(),
  ].join("::");
};

/*
 * =========================================================
 * Find Physical Station Nodes
 * =========================================================
 *
 * 하나의 역 이름에 속하는 모든 노선 노드를 반환한다.
 *
 * 예:
 *
 * 아사쿠사
 * - ginza:G19
 * - asakusa:A18
 * =========================================================
 */

export const findPhysicalStationNodes = (
  graph: RailwayGraph,
  stationNameKo: string,
): RailwayNode[] => {
  const normalizedName = stationNameKo.trim();

  const matchedNodes = Array.from(
    graph.nodes.values(),
  ).filter(
    (node) =>
      node.station.nameKo.trim() === normalizedName,
  );

  if (matchedNodes.length === 0) {
    return [];
  }

  /*
   * 같은 한국어 이름이 우연히 존재할 가능성에 대비해
   * 첫 번째 결과의 물리역 key를 기준으로 묶는다.
   */

  const stationKey = getStationKey(matchedNodes[0]);

  return matchedNodes.filter(
    (node) => getStationKey(node) === stationKey,
  );
};

/*
 * =========================================================
 * Route Cost
 * =========================================================
 */

const getRouteCost = (
  route: MinTransferRouteStep[],
): {
  transferCount: number;
  rideCount: number;
} => {
  let transferCount = 0;
  let rideCount = 0;

  route.forEach((step) => {
    if (step.via === "transfer") {
      transferCount += 1;
    }

    if (step.via === "ride") {
      rideCount += 1;
    }
  });

  return {
    transferCount,
    rideCount,
  };
};

const isBetterCandidate = (
  candidate: StationRouteCandidate,
  current?: StationRouteCandidate,
): boolean => {
  if (!current) {
    return true;
  }

  if (
    candidate.transferCount !==
    current.transferCount
  ) {
    return (
      candidate.transferCount <
      current.transferCount
    );
  }

  return candidate.rideCount < current.rideCount;
};

/*
 * =========================================================
 * Find Station Route
 * =========================================================
 *
 * 특정 lineId + stationId가 아니라
 * 물리적인 출발역/도착역 전체를 후보로 사용한다.
 * =========================================================
 */

export const findStationRoute = (
  graph: RailwayGraph,
  startStationNameKo: string,
  destinationStationNameKo: string,
): MinTransferRouteStep[] | null => {
  const startNodes = findPhysicalStationNodes(
    graph,
    startStationNameKo,
  );

  const destinationNodes = findPhysicalStationNodes(
    graph,
    destinationStationNameKo,
  );

  if (
    startNodes.length === 0 ||
    destinationNodes.length === 0
  ) {
    return null;
  }

  let bestCandidate:
    | StationRouteCandidate
    | undefined;

  startNodes.forEach((startNode) => {
    destinationNodes.forEach(
      (destinationNode) => {
        const route = findMinTransferRoute(
          graph,
          startNode.id as RailwayNodeId,
          destinationNode.id as RailwayNodeId,
        );

        if (!route) {
          return;
        }

        const cost = getRouteCost(route);

        const candidate: StationRouteCandidate = {
          route,
          transferCount: cost.transferCount,
          rideCount: cost.rideCount,
        };

        if (
          isBetterCandidate(
            candidate,
            bestCandidate,
          )
        ) {
          bestCandidate = candidate;
        }
      },
    );
  });

  return bestCandidate?.route ?? null;
};