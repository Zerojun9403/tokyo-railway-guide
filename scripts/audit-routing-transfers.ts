import { railwayRegistry } from "../data/railwayRegistry";
import { resolveStationTransfers } from "../utils/normalizeTransfers";
import { buildRailwayGraph } from "../utils/routing/buildRailwayGraph";
import { createRailwayNodeId } from "../utils/routing/types";

const graph = buildRailwayGraph();

let totalTransfers = 0;
let connectedTransfers = 0;
let missingTransfers = 0;

console.log("=== Routing Transfer Audit ===");
console.log("");

Object.values(railwayRegistry).forEach((line) => {
  line.stations.forEach((station) => {
    const fromNodeId = createRailwayNodeId(
      line.id,
      station.id,
    );

    const transfers = resolveStationTransfers(station);

    transfers.forEach((transfer) => {
      const targetLine = railwayRegistry[transfer.id];

      if (!targetLine) {
        return;
      }

      totalTransfers += 1;

      const currentEdges =
        graph.edges.get(fromNodeId) ?? [];

      const connected = currentEdges.some(
        (edge) =>
          edge.type === "transfer" &&
          edge.to.startsWith(
            `${targetLine.id}:`,
          ),
      );

      if (connected) {
        connectedTransfers += 1;

        return;
      }

      missingTransfers += 1;

      console.log(
        `❌ ${line.id}:${station.id} ` +
          `${station.nameKo} -> ${targetLine.id}`,
      );
    });
  });
});

console.log("");
console.log("=== Summary ===");
console.log(`Transfers: ${totalTransfers}`);
console.log(`Connected: ${connectedTransfers}`);
console.log(`Missing: ${missingTransfers}`);