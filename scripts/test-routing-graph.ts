import { buildRailwayGraph } from "../utils/routing/buildRailwayGraph";

const graph = buildRailwayGraph();

const nodeCount = graph.nodes.size;

const allEdges = Array.from(graph.edges.values()).flat();

const rideEdgeCount = allEdges.filter(
  (edge) => edge.type === "ride",
).length;

const transferEdgeCount = allEdges.filter(
  (edge) => edge.type === "transfer",
).length;

console.log("=== Railway Graph Test ===");
console.log(`Nodes: ${nodeCount}`);
console.log(`Ride Edges: ${rideEdgeCount}`);
console.log(`Transfer Edges: ${transferEdgeCount}`);

const testNodeId = "ginza:G01";

const testNode = graph.nodes.get(testNodeId);
const testEdges = graph.edges.get(testNodeId) ?? [];

console.log("");
console.log(`Test Node: ${testNodeId}`);
console.log(`Station: ${testNode?.station.nameKo}`);
console.log("Connections:");

testEdges.forEach((edge) => {
  const destination = graph.nodes.get(edge.to);

  console.log(
    `  [${edge.type}] ${testNode?.station.nameKo} -> ` +
      `${destination?.station.nameKo} ` +
      `(${edge.to})`,
  );
});