import {
  type RailwayGraph,
  type RailwayNodeId,
} from "./types";

export type RouteStep = {
  nodeId: RailwayNodeId;

  via: "start" | "ride" | "transfer";
};

export const findRoute = (
  graph: RailwayGraph,
  startNodeId: RailwayNodeId,
  destinationNodeId: RailwayNodeId,
): RouteStep[] | null => {
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

  const queue: RailwayNodeId[] = [startNodeId];

  const visited = new Set<RailwayNodeId>([
    startNodeId,
  ]);

  const previous = new Map<
    RailwayNodeId,
    {
      nodeId: RailwayNodeId;
      via: "ride" | "transfer";
    }
  >();

  let found = false;

  while (queue.length > 0) {
    const currentNodeId = queue.shift();

    if (!currentNodeId) {
      continue;
    }

    const edges =
      graph.edges.get(currentNodeId) ?? [];

    for (const edge of edges) {
      if (visited.has(edge.to)) {
        continue;
      }

      visited.add(edge.to);

      previous.set(edge.to, {
        nodeId: currentNodeId,
        via: edge.type,
      });

      if (edge.to === destinationNodeId) {
        found = true;
        break;
      }

      queue.push(edge.to);
    }

    if (found) {
      break;
    }
  }

  if (!found) {
    return null;
  }

  const route: RouteStep[] = [];

  let currentNodeId = destinationNodeId;

  while (currentNodeId !== startNodeId) {
    const previousStep = previous.get(
      currentNodeId,
    );

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