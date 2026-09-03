import { buildRailwayGraph } from "../utils/routing/buildRailwayGraph";
import { findStationRoute } from "../utils/routing/findStationRoute";

const graph = buildRailwayGraph();

const testCases = [
  {
    from: "시부야",
    to: "아사쿠사",
  },
  {
    from: "신주쿠",
    to: "하네다공항 제1·제2터미널",
  },
  {
    from: "이케부쿠로",
    to: "나리타공항",
  },
  {
    from: "우에노",
    to: "시부야",
  },
  {
    from: "신주쿠",
    to: "롯폰기",
  },
  {
    from: "신주쿠",
    to: "아사쿠사",
  },
    {
    from: "아사쿠사",
    to: "신주쿠",
  },

];

console.log("=== Routing Cases Test ===");
console.log("");

testCases.forEach(({ from, to }, index) => {
  const route = findStationRoute(
    graph,
    from,
    to,
  );

  console.log(
    `[${index + 1}] ${from} -> ${to}`,
  );

  if (!route) {
    console.log("  ❌ Route not found");
    console.log("");

    return;
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

  const startNode = graph.nodes.get(
    route[0].nodeId,
  );

  const destinationNode = graph.nodes.get(
    route[route.length - 1].nodeId,
  );

  console.log(
    `  ✅ Transfers: ${transferCount} / Ride Edges: ${rideCount}`,
  );

  console.log(
    `  Start Node: ${startNode?.id}`,
  );

  console.log(
    `  Destination Node: ${destinationNode?.id}`,
  );

  /*
   * 환승 지점만 간단하게 출력
   */

  const transfers = route.filter(
    (step) => step.via === "transfer",
  );

  if (transfers.length > 0) {
    console.log("  Transfers:");

    transfers.forEach((step) => {
      const node = graph.nodes.get(
        step.nodeId,
      );

      if (!node) {
        return;
      }

      console.log(
        `    -> ${node.station.nameKo} (${node.lineId} / ${node.stationId})`,
      );
    });
  }

  console.log("");
});