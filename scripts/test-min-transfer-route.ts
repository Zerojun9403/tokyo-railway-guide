import { buildRailwayGraph } from "../utils/routing/buildRailwayGraph";
import { findMinTransferRoute } from "../utils/routing/findMinTransferRoute";
import type { RailwayNodeId } from "../utils/routing/types";

const graph = buildRailwayGraph();

const startNodeId: RailwayNodeId = "yamanote:JY17";
const destinationNodeId: RailwayNodeId = "ginza:G19";

const route = findMinTransferRoute(
  graph,
  startNodeId,
  destinationNodeId,
);

console.log("=== Min Transfer Route Test ===");
console.log(`From: ${startNodeId}`);
console.log(`To:   ${destinationNodeId}`);
console.log("");

if (!route) {
  console.log("Route not found.");
  process.exit(0);
}

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

console.log(`Steps: ${route.length}`);
console.log(`Transfers: ${transferCount}`);
console.log(`Ride Edges: ${rideCount}`);
console.log("");

route.forEach((step, index) => {
  const node = graph.nodes.get(step.nodeId);

  if (!node) {
    return;
  }

  if (step.via === "start") {
    console.log(
      `${index + 1}. [START] ${node.station.nameKo} (${step.nodeId})`,
    );

    return;
  }

  console.log(
    `${index + 1}. [${step.via.toUpperCase()}] ` +
      `${node.station.nameKo} (${node.lineId} / ${node.stationId})`,
  );
});