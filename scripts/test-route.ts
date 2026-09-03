import { buildRailwayGraph } from "../utils/routing/buildRailwayGraph";
import type { RailwayNodeId } from "../utils/routing/types";

const graph = buildRailwayGraph();

const nodeId: RailwayNodeId = "asakusa:A15";

const node = graph.nodes.get(nodeId);
const edges = graph.edges.get(nodeId) ?? [];

console.log("=== Transfer Edge Test ===");
console.log(`Station: ${node?.station.nameKo} (${nodeId})`);
console.log("");

edges.forEach((edge) => {
  const targetNode = graph.nodes.get(edge.to);

  if (!targetNode) {
    return;
  }

  console.log(
    `[${edge.type.toUpperCase()}] ` +
      `${targetNode.station.nameKo} (${edge.to})`,
  );
});