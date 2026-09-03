import { railwayRegistry } from "../data/railwayRegistry";
import { resolveStationTransfers } from "../utils/normalizeTransfers";
import { buildRailwayGraph } from "../utils/routing/buildRailwayGraph";
import { normalizeStationNameJa } from "../utils/routing/normalizeStationName";
import { createRailwayNodeId } from "../utils/routing/types";

const graph = buildRailwayGraph();

let missingCount = 0;
let sameJaCount = 0;
let differentJaCount = 0;

console.log("=== Missing Transfer SAME-JA Audit ===");
console.log("");

Object.values(railwayRegistry).forEach((line) => {
  line.stations.forEach((station) => {
    const fromNodeId = createRailwayNodeId(
      line.id,
      station.id,
    );

    const transfers =
      resolveStationTransfers(station);

    transfers.forEach((transfer) => {
      const targetLine =
        railwayRegistry[transfer.id];

      if (!targetLine) {
        return;
      }

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
        return;
      }

      missingCount += 1;

      /*
       * 한국어 이름은 다르지만
       * 일본어 공식 역명이 같은 역을 찾는다.
       */
      const sameJaStation =
        targetLine.stations.find(
          (candidate) =>
            normalizeStationNameJa(
              candidate.nameJa,
            ) ===
            normalizeStationNameJa(
              station.nameJa,
            ),
        );

      if (sameJaStation) {
        sameJaCount += 1;

        console.log(
          `[SAME-JA] ${fromNodeId}`,
        );

        console.log(
          `  ${station.nameKo} (${station.nameJa})`,
        );

        console.log(
          `  ↓`,
        );

        console.log(
          `  ${targetLine.id}:${sameJaStation.id}`,
        );

        console.log(
          `  ${sameJaStation.nameKo} (${sameJaStation.nameJa})`,
        );

        console.log("");

        return;
      }

      differentJaCount += 1;
    });
  });
});

console.log("=== Summary ===");

console.log(
  `Missing Relations: ${missingCount}`,
);

console.log(
  `SAME-JA: ${sameJaCount}`,
);

console.log(
  `DIFFERENT-JA: ${differentJaCount}`,
);