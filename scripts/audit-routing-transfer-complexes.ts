import { railwayRegistry } from "../data/railwayRegistry";
import { resolveStationTransfers } from "../utils/normalizeTransfers";
import { buildRailwayGraph } from "../utils/routing/buildRailwayGraph";
import { createRailwayNodeId } from "../utils/routing/types";

type MissingRelation = {
  fromNodeId: string;
  fromLineId: string;
  fromStationId: string;
  fromStationNameKo: string;
  fromStationNameJa: string;

  targetLineId: string;

  possibleTargets: {
    nodeId: string;
    stationId: string;
    stationNameKo: string;
    stationNameJa: string;
  }[];
};

type SourceGroup = {
  stationNameKo: string;
  stationNameJa: string;

  sourceNodes: Set<string>;
  sourceLines: Set<string>;
  targetLines: Set<string>;

  relations: MissingRelation[];
};

const graph = buildRailwayGraph();

const missingRelations: MissingRelation[] = [];

/*
 * =========================================================
 * 1. 현재 그래프에서 실제로 연결되지 않은
 *    transfer relation 수집
 * =========================================================
 */

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
       * target line에 있는 역들을 출력해서
       * 사람이 실제 대응 역을 찾기 쉽게 한다.
       *
       * 여기서는 자동 연결하지 않는다.
       */

      const possibleTargets =
        targetLine.stations.map(
          (candidate) => ({
            nodeId: createRailwayNodeId(
              targetLine.id,
              candidate.id,
            ),

            stationId: candidate.id,

            stationNameKo:
              candidate.nameKo,

            stationNameJa:
              candidate.nameJa,
          }),
        );

      missingRelations.push({
        fromNodeId,

        fromLineId: line.id,
        fromStationId: station.id,

        fromStationNameKo:
          station.nameKo,

        fromStationNameJa:
          station.nameJa,

        targetLineId:
          targetLine.id,

        possibleTargets,
      });
    });
  });
});

/*
 * =========================================================
 * 2. 출발역 이름 기준으로 묶기
 *
 * 같은 물리역의 여러 노선에서 발생한 Missing을
 * 하나의 그룹으로 모은다.
 *
 * 아직 이름이 서로 다른 역끼리는 자동 병합하지 않는다.
 * =========================================================
 */

const groups = new Map<
  string,
  SourceGroup
>();

missingRelations.forEach((relation) => {
  const key = [
    relation.fromStationNameKo.trim(),
    relation.fromStationNameJa.trim(),
  ].join("::");

  let group = groups.get(key);

  if (!group) {
    group = {
      stationNameKo:
        relation.fromStationNameKo,

      stationNameJa:
        relation.fromStationNameJa,

      sourceNodes: new Set<string>(),
      sourceLines: new Set<string>(),
      targetLines: new Set<string>(),

      relations: [],
    };

    groups.set(key, group);
  }

  group.sourceNodes.add(
    relation.fromNodeId,
  );

  group.sourceLines.add(
    relation.fromLineId,
  );

  group.targetLines.add(
    relation.targetLineId,
  );

  group.relations.push(relation);
});

/*
 * =========================================================
 * 3. 같은 target line을 공유하는 다른 이름의
 *    source group을 찾아 "관련 후보"로 표시
 *
 * 주의:
 * 이건 환승 확정이 아니다.
 * 사람이 검토하기 위한 후보 출력일 뿐이다.
 * =========================================================
 */

const groupEntries =
  Array.from(groups.entries());

const getRelatedGroups = (
  currentKey: string,
  currentGroup: SourceGroup,
): SourceGroup[] => {
  const related: SourceGroup[] = [];

  groupEntries.forEach(
    ([candidateKey, candidate]) => {
      if (candidateKey === currentKey) {
        return;
      }

      const currentTargets =
        currentGroup.targetLines;

      const candidateSources =
        candidate.sourceLines;

      const candidateTargets =
        candidate.targetLines;

      const currentSources =
        currentGroup.sourceLines;

      const pointsToCandidate =
        Array.from(currentTargets).some(
          (lineId) =>
            candidateSources.has(lineId),
        );

      const candidatePointsBack =
        Array.from(candidateTargets).some(
          (lineId) =>
            currentSources.has(lineId),
        );

      if (
        pointsToCandidate ||
        candidatePointsBack
      ) {
        related.push(candidate);
      }
    },
  );

  return related;
};

/*
 * =========================================================
 * 4. 출력
 * =========================================================
 */

console.log(
  "=== Routing Transfer Complex Candidates ===",
);

console.log("");

groupEntries
  .sort(([, a], [, b]) =>
    a.stationNameKo.localeCompare(
      b.stationNameKo,
      "ko",
    ),
  )
  .forEach(
    ([key, group], index) => {
      console.log(
        `[${index + 1}] ${group.stationNameKo}`,
      );

      console.log(
        `    JA: ${group.stationNameJa}`,
      );

      console.log(
        `    Source Nodes:`,
      );

      Array.from(group.sourceNodes)
        .sort()
        .forEach((nodeId) => {
          console.log(
            `      - ${nodeId}`,
          );
        });

      console.log(
        `    Missing Target Lines:`,
      );

      Array.from(group.targetLines)
        .sort()
        .forEach((lineId) => {
          console.log(
            `      -> ${lineId}`,
          );
        });

      const relatedGroups =
        getRelatedGroups(
          key,
          group,
        );

      if (relatedGroups.length > 0) {
        console.log(
          `    Related Name Candidates:`,
        );

        relatedGroups
          .sort((a, b) =>
            a.stationNameKo.localeCompare(
              b.stationNameKo,
              "ko",
            ),
          )
          .forEach((candidate) => {
            console.log(
              `      ? ${candidate.stationNameKo}` +
                ` (${candidate.stationNameJa})`,
            );

            Array.from(
              candidate.sourceNodes,
            )
              .sort()
              .forEach((nodeId) => {
                console.log(
                  `          ${nodeId}`,
                );
              });
          });
      }

      console.log("");
    },
  );

/*
 * =========================================================
 * 5. Summary
 * =========================================================
 */

console.log("=== Summary ===");

console.log(
  `Missing Relations: ${missingRelations.length}`,
);

console.log(
  `Unique Source Names: ${groups.size}`,
);

const groupsWithCandidates =
  groupEntries.filter(
    ([key, group]) =>
      getRelatedGroups(
        key,
        group,
      ).length > 0,
  ).length;

console.log(
  `Groups With Related Candidates: ${groupsWithCandidates}`,
);