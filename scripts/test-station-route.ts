import { buildRailwayGraph } from "../utils/routing/buildRailwayGraph";
import {
  findPhysicalStationNodes,
  findStationRoute,
} from "../utils/routing/findStationRoute";

const graph = buildRailwayGraph();

const startStation = "신주쿠";
const destinationStation = "아사쿠사";

const startNodes = findPhysicalStationNodes(
  graph,
  startStation,
);

const destinationNodes = findPhysicalStationNodes(
  graph,
  destinationStation,
);

console.log("=== Physical Station Route Test ===");
console.log("");

console.log(`Start: ${startStation}`);
startNodes.forEach((node) => {
  console.log(`  - ${node.id}`);
});

console.log("");

console.log(`Destination: ${destinationStation}`);
destinationNodes.forEach((node) => {
  console.log(`  - ${node.id}`);
});

console.log("");

const route = findStationRoute(
  graph,
  startStation,
  destinationStation,
);

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

console.log("=== Best Route ===");
console.log(`Transfers: ${transferCount}`);
console.log(`Ride Edges: ${rideCount}`);
console.log("");

route.forEach((step, index) => {
  const node = graph.nodes.get(step.nodeId);

  if (!node) {
    return;
  }

  console.log(
    `${index + 1}. [${step.via.toUpperCase()}] ` +
      `${node.station.nameKo} (${node.lineId} / ${node.stationId})`,
  );
});