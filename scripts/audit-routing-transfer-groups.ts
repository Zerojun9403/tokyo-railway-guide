import { railwayRegistry } from "../data/railwayRegistry";
import { resolveStationTransfers } from "../utils/normalizeTransfers";
import { buildRailwayGraph } from "../utils/routing/buildRailwayGraph";
import { createRailwayNodeId } from "../utils/routing/types";

type MissingTransferType =
  | "SAME-KO"
  | "DIFFERENT-NAME";

type MissingTransfer = {
  fromLineId: string;
  fromStationId: string;
  fromStationNameKo: string;
  fromStationNameJa: string;

  targetLineId: string;

  type: MissingTransferType;

  targetStationId?: string;
  targetStationNameKo?: string;
  targetStationNameJa?: string;
};

const graph = buildRailwayGraph();

const missingTransfers: MissingTransfer[] = [];

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

      /*
       * =====================================================
       * 한국어 역명만 같은 역이 target line에 있는지 확인
       *
       * 기존 buildRailwayGraph는
       * nameKo + nameJa 둘 다 같아야 연결한다.
       *
       * 따라서 여기서는:
       *
       * SAME-KO
       * = 한국어 이름은 같은데 기존 연결 실패
       *
       * DIFFERENT-NAME
       * = target line에 같은 한국어 이름 자체가 없음
       * =====================================================
       */

      const sameKoStation =
        targetLine.stations.find(
          (candidate) =>
            candidate.nameKo.trim() ===
            station.nameKo.trim(),
        );

      if (sameKoStation) {
        missingTransfers.push({
          fromLineId: line.id,
          fromStationId: station.id,
          fromStationNameKo:
            station.nameKo,
          fromStationNameJa:
            station.nameJa,

          targetLineId: targetLine.id,

          type: "SAME-KO",

          targetStationId:
            sameKoStation.id,

          targetStationNameKo:
            sameKoStation.nameKo,

          targetStationNameJa:
            sameKoStation.nameJa,
        });

        return;
      }

      missingTransfers.push({
        fromLineId: line.id,
        fromStationId: station.id,
        fromStationNameKo:
          station.nameKo,
        fromStationNameJa:
          station.nameJa,

        targetLineId: targetLine.id,

        type: "DIFFERENT-NAME",
      });
    });
  });
});

/*
 * =========================================================
 * 같은 출발 노드별로 묶기
 * =========================================================
 */

const groups = new Map<
  string,
  MissingTransfer[]
>();

missingTransfers.forEach((item) => {
  const key =
    `${item.fromLineId}:${item.fromStationId}`;

  const current = groups.get(key) ?? [];

  current.push(item);

  groups.set(key, current);
});

/*
 * =========================================================
 * 출력
 * =========================================================
 */

console.log(
  "=== Routing Missing Transfer Groups ===",
);

console.log("");

Array.from(groups.entries())
  .sort(([a], [b]) =>
    a.localeCompare(b),
  )
  .forEach(([nodeId, items], index) => {
    const first = items[0];

    console.log(
      `[${index + 1}] ${nodeId} ${first.fromStationNameKo}`,
    );

    console.log(
      `    JA: ${first.fromStationNameJa}`,
    );

    items.forEach((item) => {
      console.log(
        `    -> ${item.targetLineId}`,
      );

      console.log(
        `       [${item.type}]`,
      );

      if (
        item.type === "SAME-KO" &&
        item.targetStationId
      ) {
        console.log(
          `       target: ` +
            `${item.targetLineId}:${item.targetStationId} ` +
            `${item.targetStationNameKo}`,
        );

        console.log(
          `       target JA: ` +
            `${item.targetStationNameJa}`,
        );
      }
    });

    console.log("");
  });

/*
 * =========================================================
 * Summary
 * =========================================================
 */

const sameKoCount =
  missingTransfers.filter(
    (item) => item.type === "SAME-KO",
  ).length;

const differentNameCount =
  missingTransfers.filter(
    (item) =>
      item.type === "DIFFERENT-NAME",
  ).length;

console.log("=== Summary ===");

console.log(
  `Missing Relations: ${missingTransfers.length}`,
);

console.log(
  `Source Station Groups: ${groups.size}`,
);

console.log(
  `SAME-KO: ${sameKoCount}`,
);

console.log(
  `DIFFERENT-NAME: ${differentNameCount}`,
);