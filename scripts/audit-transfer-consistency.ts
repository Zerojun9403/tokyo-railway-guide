import { railwayRegistry } from "../data/railwayRegistry";
import type { Station } from "../types/station";

/*
 * =========================================================
 * Types
 * =========================================================
 */

type StationEntry = {
  station: Station;
  currentLineId: string;
};

type StationGroup = {
  key: string;
  nameKo: string;
  nameJa: string;
  stations: StationEntry[];
};

type AuditStatus =
  | "CONSISTENT"
  | "AUTO_MERGE_CANDIDATE"
  | "REVIEW_REQUIRED";

type AuditResult = {
  group: StationGroup;
  status: AuditStatus;
  unionLineIds: string[];
  reason?: string;
};

/*
 * =========================================================
 * Helpers
 * =========================================================
 */

const getStationKey = (station: Station): string => {
  return `${station.nameKo.trim()}::${station.nameJa.trim()}`;
};

const getTransferIds = (station: Station): string[] => {
  return [
    ...new Set(
      (station.transfers ?? []).map((transfer) => transfer.id),
    ),
  ].sort();
};

const getGroupLineIds = (group: StationGroup): string[] => {
  return [
    ...new Set(
      group.stations.map((entry) => entry.currentLineId),
    ),
  ].sort();
};

const getUnionLineIds = (group: StationGroup): string[] => {
  const currentLineIds = getGroupLineIds(group);

  const transferIds = group.stations.flatMap((entry) =>
    getTransferIds(entry.station),
  );

  return [
    ...new Set([
      ...currentLineIds,
      ...transferIds,
    ]),
  ].sort();
};

const getEffectiveTransferIds = (
  entry: StationEntry,
  group: StationGroup,
): string[] => {
  const siblingLineIds = getGroupLineIds(group).filter(
    (lineId) => lineId !== entry.currentLineId,
  );

  return [
    ...new Set([
      ...getTransferIds(entry.station),
      ...siblingLineIds,
    ]),
  ].sort();
};

const areStringArraysEqual = (
  left: string[],
  right: string[],
): boolean => {
  if (left.length !== right.length) {
    return false;
  }

  return left.every(
    (value, index) => value === right[index],
  );
};

const formatLine = (lineId: string): string => {
  const registryLine = railwayRegistry[lineId];

  if (!registryLine) {
    return lineId;
  }

  return `${lineId} (${registryLine.nameKo})`;
};

/*
 * =========================================================
 * Station Groups
 * =========================================================
 */

const stationGroups = new Map<string, StationGroup>();

let totalStations = 0;

Object.values(railwayRegistry).forEach((line) => {
  line.stations.forEach((station) => {
    totalStations += 1;

    const key = getStationKey(station);

    const entry: StationEntry = {
      station,
      currentLineId: line.id,
    };

    const existing = stationGroups.get(key);

    if (existing) {
      existing.stations.push(entry);
      return;
    }

    stationGroups.set(key, {
      key,
      nameKo: station.nameKo,
      nameJa: station.nameJa,
      stations: [entry],
    });
  });
});

/*
 * =========================================================
 * Multi-line Stations
 * =========================================================
 */

const multiLineStationGroups = [
  ...stationGroups.values(),
]
  .filter((group) => getGroupLineIds(group).length >= 2)
  .sort((a, b) =>
    a.nameKo.localeCompare(b.nameKo, "ko"),
  );

/*
 * =========================================================
 * Safety Classification
 * =========================================================
 *
 * AUTO_MERGE_CANDIDATE
 *
 * 같은 이름의 Station들이 서로의 노선을 환승정보로
 * 최소 한 번 이상 참조하고 있으면 실제 동일 환승역일
 * 가능성이 높다고 판단한다.
 *
 *
 * REVIEW_REQUIRED
 *
 * 같은 이름으로 여러 노선에 존재하지만,
 * 그룹 내부 노선끼리의 연결 증거가 전혀 없는 경우.
 *
 * 같은 역명이라고 해서 실제 동일한 환승역이라고
 * 단정할 수 없으므로 자동 병합 대상에서 제외한다.
 *
 *
 * CONSISTENT
 *
 * effective transfer set이 이미 모두 동일한 경우.
 * =========================================================
 */

const classifyGroup = (
  group: StationGroup,
): AuditResult => {
  const groupLineIds = getGroupLineIds(group);

  const effectiveSets = group.stations.map((entry) =>
    getEffectiveTransferIds(entry, group),
  );

  const referenceSet = effectiveSets[0] ?? [];

  const isConsistent = effectiveSets.every((set) =>
    areStringArraysEqual(referenceSet, set),
  );

  if (isConsistent) {
    return {
      group,
      status: "CONSISTENT",
      unionLineIds: getUnionLineIds(group),
    };
  }

  /*
   * 같은 역 그룹 내부 노선을 transfer가 실제로
   * 참조하고 있는지 확인한다.
   */

  let internalReferenceCount = 0;

  group.stations.forEach((entry) => {
    const transferIds = getTransferIds(entry.station);

    transferIds.forEach((transferId) => {
      if (
        transferId !== entry.currentLineId &&
        groupLineIds.includes(transferId)
      ) {
        internalReferenceCount += 1;
      }
    });
  });

  if (internalReferenceCount === 0) {
    return {
      group,
      status: "REVIEW_REQUIRED",
      unionLineIds: getUnionLineIds(group),
      reason:
        "Same station name, but no internal transfer references were found.",
    };
  }

  return {
    group,
    status: "AUTO_MERGE_CANDIDATE",
    unionLineIds: getUnionLineIds(group),
  };
};

/*
 * =========================================================
 * Audit
 * =========================================================
 */

const results = multiLineStationGroups.map(
  classifyGroup,
);

const consistentResults = results.filter(
  (result) => result.status === "CONSISTENT",
);

const autoMergeResults = results.filter(
  (result) =>
    result.status === "AUTO_MERGE_CANDIDATE",
);

const reviewResults = results.filter(
  (result) =>
    result.status === "REVIEW_REQUIRED",
);

/*
 * =========================================================
 * Header
 * =========================================================
 */

console.log("");
console.log("========================================");
console.log(" Transfer Consistency Audit");
console.log("========================================");
console.log("");

console.log(
  `Stations checked         : ${totalStations}`,
);

console.log(
  `Unique station names     : ${stationGroups.size}`,
);

console.log(
  `Multi-line station names : ${multiLineStationGroups.length}`,
);

console.log("");

/*
 * =========================================================
 * Classification Summary
 * =========================================================
 */

console.log("========================================");
console.log(" Classification");
console.log("========================================");
console.log("");

console.log(
  `CONSISTENT               : ${consistentResults.length}`,
);

console.log(
  `AUTO MERGE CANDIDATE     : ${autoMergeResults.length}`,
);

console.log(
  `REVIEW REQUIRED          : ${reviewResults.length}`,
);

console.log("----------------------------------------");

console.log(
  `TOTAL MULTI-LINE STATIONS: ${results.length}`,
);

console.log("");

/*
 * =========================================================
 * Review Required
 * =========================================================
 */

console.log("========================================");
console.log(" Review Required");
console.log("========================================");
console.log("");

if (reviewResults.length === 0) {
  console.log("None");
  console.log("");
} else {
  reviewResults.forEach((result, index) => {
    const { group } = result;

    console.log(
      `[${index + 1}/${reviewResults.length}] ` +
        `${group.nameKo} / ${group.nameJa}`,
    );

    console.log(
      `  Lines: ${getGroupLineIds(group).join(", ")}`,
    );

    console.log(
      `  Reason: ${result.reason}`,
    );

    group.stations.forEach((entry) => {
      console.log(
        `  - ${entry.station.code} | ${entry.currentLineId}`,
      );

      const transfers = getTransferIds(
        entry.station,
      );

      if (transfers.length === 0) {
        console.log("      transfers: (none)");
      } else {
        console.log(
          `      transfers: ${transfers.join(", ")}`,
        );
      }
    });

    console.log("");
  });
}

/*
 * =========================================================
 * Auto Merge Candidates
 * =========================================================
 */

console.log("========================================");
console.log(" Auto Merge Candidates");
console.log("========================================");
console.log("");

if (autoMergeResults.length === 0) {
  console.log("None");
  console.log("");
} else {
  autoMergeResults.forEach((result) => {
    const { group } = result;

    console.log(
      `${group.nameKo} / ${group.nameJa}`,
    );

    console.log(
      `  Station lines: ${getGroupLineIds(group).join(", ")}`,
    );

    console.log("  Resolved union:");

    result.unionLineIds.forEach((lineId) => {
      console.log(
        `    - ${formatLine(lineId)}`,
      );
    });

    console.log("");
  });
}

/*
 * =========================================================
 * Final Summary
 * =========================================================
 */

console.log("========================================");
console.log(" Final Summary");
console.log("========================================");
console.log("");

console.log(
  `Safe candidates : ${autoMergeResults.length}`,
);

console.log(
  `Need review     : ${reviewResults.length}`,
);

console.log(
  `Already aligned : ${consistentResults.length}`,
);

console.log("");

/*
 * =========================================================
 * Exit Code
 * =========================================================
 *
 * 아직 진단 단계이므로 REVIEW_REQUIRED가 존재하더라도
 * CI 실패로 처리하지 않는다.
 * =========================================================
 */

process.exitCode = 0;