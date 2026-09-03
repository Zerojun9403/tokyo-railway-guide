import type {
  RailwayGraph,
  RailwayNodeId,
} from "./types";

export type MinTransferRouteStep = {
  nodeId: RailwayNodeId;

  via: "start" | "ride" | "transfer";
};

type RouteCost = {
  transferCount: number;
  rideCount: number;
};

type PreviousStep = {
  nodeId: RailwayNodeId;
  via: "ride" | "transfer";
};

const isBetterCost = (
  candidate: RouteCost,
  current?: RouteCost,
): boolean => {
  if (!current) {
    return true;
  }

  // 1순위: 환승 횟수
  if (candidate.transferCount !== current.transferCount) {
    return candidate.transferCount < current.transferCount;
  }

  // 2순위: 같은 환승 횟수라면 승차 이동 횟수
  return candidate.rideCount < current.rideCount;
};

export const findMinTransferRoute = (
  graph: RailwayGraph,
  startNodeId: RailwayNodeId,
  destinationNodeId: RailwayNodeId,
): MinTransferRouteStep[] | null => {
  if (!graph.nodes.has(startNodeId)) {
    return null;
  }

  if (!graph.nodes.has(destinationNodeId)) {
    return null;
  }

  if (startNodeId === destinationNodeId) {
    return [
      {
        nodeId: startNodeId,
        via: "start",
      },
    ];
  }

  const costs = new Map<RailwayNodeId, RouteCost>();

  const previous = new Map<
    RailwayNodeId,
    PreviousStep
  >();

  const queue: RailwayNodeId[] = [startNodeId];

  costs.set(startNodeId, {
    transferCount: 0,
    rideCount: 0,
  });

  while (queue.length > 0) {
    /*
     * 현재까지 가장 좋은 비용을 가진 노드를 선택한다.
     */
    queue.sort((a, b) => {
      const costA = costs.get(a);
      const costB = costs.get(b);

      if (!costA || !costB) {
        return 0;
      }

      if (
        costA.transferCount !==
        costB.transferCount
      ) {
        return (
          costA.transferCount -
          costB.transferCount
        );
      }

      return costA.rideCount - costB.rideCount;
    });

    const currentNodeId = queue.shift();

    if (!currentNodeId) {
      continue;
    }

    if (currentNodeId === destinationNodeId) {
      break;
    }

    const currentCost = costs.get(currentNodeId);

    if (!currentCost) {
      continue;
    }

    const edges =
      graph.edges.get(currentNodeId) ?? [];

    edges.forEach((edge) => {
      const nextCost: RouteCost = {
        transferCount:
          currentCost.transferCount +
          (edge.type === "transfer" ? 1 : 0),

        rideCount:
          currentCost.rideCount +
          (edge.type === "ride" ? 1 : 0),
      };

      const existingCost = costs.get(edge.to);

      if (!isBetterCost(nextCost, existingCost)) {
        return;
      }

      costs.set(edge.to, nextCost);

      previous.set(edge.to, {
        nodeId: currentNodeId,
        via: edge.type,
      });

      if (!queue.includes(edge.to)) {
        queue.push(edge.to);
      }
    });
  }

  if (!costs.has(destinationNodeId)) {
    return null;
  }

  /*
   * =========================================================
   * 경로 복원
   * =========================================================
   */

  const route: MinTransferRouteStep[] = [];

  let currentNodeId = destinationNodeId;

  while (currentNodeId !== startNodeId) {
    const previousStep =
      previous.get(currentNodeId);

    if (!previousStep) {
      return null;
    }

    route.push({
      nodeId: currentNodeId,
      via: previousStep.via,
    });

    currentNodeId = previousStep.nodeId;
  }

  route.push({
    nodeId: startNodeId,
    via: "start",
  });

  route.reverse();

  return route;
};