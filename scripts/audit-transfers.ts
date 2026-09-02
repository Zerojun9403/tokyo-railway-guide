import { railwayRegistry } from "../data/railwayRegistry";

type AuditIssueType =
  | "ID_ALIAS_CANDIDATE"
  | "REVIEW_REQUIRED"
  | "EXTERNAL_LINE"
  | "SELF_TRANSFER"
  | "DUPLICATE_TRANSFER"
  | "CODE_MISMATCH"
  | "NAME_KO_MISMATCH"
  | "NAME_JA_MISMATCH"
  | "COLOR_MISMATCH";

type AuditIssue = {
  type: AuditIssueType;

  stationId: string;
  stationCode: string;
  stationNameKo: string;
  stationNameJa: string;

  currentLineId: string;
  currentLineNameKo: string;

  transferId: string;

  message: string;
};

const issues: AuditIssue[] = [];

let checkedStations = 0;
let checkedTransfers = 0;

/*
 * =========================================================
 * 확정된 노선 ID Alias
 * =========================================================
 *
 * Registry에 실제 노선이 존재하고,
 * 기존 transfer 데이터의 ID만 다른 것이 명확한 경우.
 *
 * Audit 전용이다.
 * 실제 데이터를 자동으로 수정하지 않는다.
 * =========================================================
 */

const knownLineAliases: Record<string, string> = {
  "tokyu-denentoshi": "tokyu-den-en-toshi",
  "jr-narita": "narita",
  "yokosuka-sobu-rapid": "yokosuka-sobu",
  "keikyu": "keikyu-main",
  "sobu-rapid": "yokosuka-sobu",
  "yokosuka": "yokosuka-sobu",
};
/*
 * =========================================================
 * 수동 확인이 필요한 노선 ID
 * =========================================================
 *
 * Registry 노선과 관련될 가능성이 있지만
 * 하나의 Registry ID로 자동 변환하기에는 의미가 모호한 경우.
 * =========================================================
 */

const reviewRequiredLineIds = new Set<string>([
  "sobu",
]);

/*
 * =========================================================
 * 노선 ID 정규화
 * =========================================================
 */

const normalizeLineId = (value: string) => {
  return value.toLowerCase().replace(/[^a-z0-9]/g, "");
};

/*
 * =========================================================
 * 문자열 형태가 같은 Registry ID 후보 검색
 * =========================================================
 */

const findNormalizedRegistryCandidate = (
  transferId: string,
): string | undefined => {
  const normalizedTransferId = normalizeLineId(transferId);

  return Object.keys(railwayRegistry).find(
    (registryId) =>
      normalizeLineId(registryId) === normalizedTransferId,
  );
};

/*
 * =========================================================
 * 확정 Alias 후보 검색
 * =========================================================
 */

const findKnownAliasCandidate = (
  transferId: string,
): string | undefined => {
  const knownAlias = knownLineAliases[transferId];

  if (knownAlias && railwayRegistry[knownAlias]) {
    return knownAlias;
  }

  const normalizedCandidate =
    findNormalizedRegistryCandidate(transferId);

  if (normalizedCandidate) {
    return normalizedCandidate;
  }

  return undefined;
};

const addIssue = (issue: AuditIssue) => {
  issues.push(issue);
};

/*
 * =========================================================
 * Audit
 * =========================================================
 */

Object.values(railwayRegistry).forEach((line) => {
  line.stations.forEach((station) => {
    checkedStations += 1;

    const transfers = station.transfers ?? [];

    const seenTransferIds = new Set<string>();

    transfers.forEach((transfer) => {
      checkedTransfers += 1;

      /*
       * =====================================================
       * 1. Registry에 존재하지 않는 노선
       * =====================================================
       */

      const targetLine = railwayRegistry[transfer.id];

      if (!targetLine) {
        const aliasCandidate = findKnownAliasCandidate(
          transfer.id,
        );

        /*
         * ---------------------------------------------------
         * 확정 가능한 Alias
         * ---------------------------------------------------
         */

        if (aliasCandidate) {
          addIssue({
            type: "ID_ALIAS_CANDIDATE",

            stationId: station.id,
            stationCode: station.code,
            stationNameKo: station.nameKo,
            stationNameJa: station.nameJa,

            currentLineId: line.id,
            currentLineNameKo: line.nameKo,

            transferId: transfer.id,

            message:
              `Registry ID 별칭 후보입니다. ` +
              `transfer="${transfer.id}", ` +
              `candidate="${aliasCandidate}"`,
          });

          return;
        }

        /*
         * ---------------------------------------------------
         * 사람이 확인해야 하는 ID
         * ---------------------------------------------------
         */

        if (reviewRequiredLineIds.has(transfer.id)) {
          addIssue({
            type: "REVIEW_REQUIRED",

            stationId: station.id,
            stationCode: station.code,
            stationNameKo: station.nameKo,
            stationNameJa: station.nameJa,

            currentLineId: line.id,
            currentLineNameKo: line.nameKo,

            transferId: transfer.id,

            message:
              `"${transfer.id}"는 현재 Registry 노선과 ` +
              `관련될 가능성이 있으므로 수동 확인이 필요합니다.`,
          });

          return;
        }

        /*
         * ---------------------------------------------------
         * Registry에 대응되는 노선이 없음
         * ---------------------------------------------------
         */

        addIssue({
          type: "EXTERNAL_LINE",

          stationId: station.id,
          stationCode: station.code,
          stationNameKo: station.nameKo,
          stationNameJa: station.nameJa,

          currentLineId: line.id,
          currentLineNameKo: line.nameKo,

          transferId: transfer.id,

          message:
            `Registry에 "${transfer.id}" 노선이 없으며 ` +
            `확인된 Alias도 없습니다.`,
        });

        return;
      }

      /*
       * =====================================================
       * 2. 자기 자신의 노선을 환승으로 등록
       * =====================================================
       */

      if (transfer.id === line.id) {
        addIssue({
          type: "SELF_TRANSFER",

          stationId: station.id,
          stationCode: station.code,
          stationNameKo: station.nameKo,
          stationNameJa: station.nameJa,

          currentLineId: line.id,
          currentLineNameKo: line.nameKo,

          transferId: transfer.id,

          message:
            `현재 노선 "${line.id}"이 ` +
            `자기 자신의 환승 노선으로 등록되어 있습니다.`,
        });
      }

      /*
       * =====================================================
       * 3. 동일 환승 노선 중복
       * =====================================================
       */

      if (seenTransferIds.has(transfer.id)) {
        addIssue({
          type: "DUPLICATE_TRANSFER",

          stationId: station.id,
          stationCode: station.code,
          stationNameKo: station.nameKo,
          stationNameJa: station.nameJa,

          currentLineId: line.id,
          currentLineNameKo: line.nameKo,

          transferId: transfer.id,

          message:
            `"${transfer.id}" 환승 노선이 ` +
            `중복 등록되어 있습니다.`,
        });
      }

      seenTransferIds.add(transfer.id);

      /*
       * =====================================================
       * 4. 노선 코드 불일치
       * =====================================================
       */

      if (transfer.code !== targetLine.lineCode) {
        addIssue({
          type: "CODE_MISMATCH",

          stationId: station.id,
          stationCode: station.code,
          stationNameKo: station.nameKo,
          stationNameJa: station.nameJa,

          currentLineId: line.id,
          currentLineNameKo: line.nameKo,

          transferId: transfer.id,

          message:
            `노선 코드가 다릅니다. ` +
            `transfer="${transfer.code}", ` +
            `registry="${targetLine.lineCode}"`,
        });
      }

      /*
       * =====================================================
       * 5. 한국어 노선명 불일치
       * =====================================================
       */

      if (transfer.nameKo !== targetLine.nameKo) {
        addIssue({
          type: "NAME_KO_MISMATCH",

          stationId: station.id,
          stationCode: station.code,
          stationNameKo: station.nameKo,
          stationNameJa: station.nameJa,

          currentLineId: line.id,
          currentLineNameKo: line.nameKo,

          transferId: transfer.id,

          message:
            `한국어 노선명이 다릅니다. ` +
            `transfer="${transfer.nameKo}", ` +
            `registry="${targetLine.nameKo}"`,
        });
      }

      /*
       * =====================================================
       * 6. 일본어 노선명 불일치
       * =====================================================
       */

      if (transfer.nameJa !== targetLine.nameJa) {
        addIssue({
          type: "NAME_JA_MISMATCH",

          stationId: station.id,
          stationCode: station.code,
          stationNameKo: station.nameKo,
          stationNameJa: station.nameJa,

          currentLineId: line.id,
          currentLineNameKo: line.nameKo,

          transferId: transfer.id,

          message:
            `일본어 노선명이 다릅니다. ` +
            `transfer="${transfer.nameJa}", ` +
            `registry="${targetLine.nameJa}"`,
        });
      }

      /*
       * =====================================================
       * 7. 노선 색상 불일치
       * =====================================================
       */

      if (
        transfer.color.toLowerCase() !==
        targetLine.color.toLowerCase()
      ) {
        addIssue({
          type: "COLOR_MISMATCH",

          stationId: station.id,
          stationCode: station.code,
          stationNameKo: station.nameKo,
          stationNameJa: station.nameJa,

          currentLineId: line.id,
          currentLineNameKo: line.nameKo,

          transferId: transfer.id,

          message:
            `노선 색상이 다릅니다. ` +
            `transfer="${transfer.color}", ` +
            `registry="${targetLine.color}"`,
        });
      }
    });
  });
});

/*
 * =========================================================
 * 결과 집계
 * =========================================================
 */

const issueCounts = issues.reduce<Record<AuditIssueType, number>>(
  (counts, issue) => {
    counts[issue.type] += 1;
    return counts;
  },
  {
    ID_ALIAS_CANDIDATE: 0,
    REVIEW_REQUIRED: 0,
    EXTERNAL_LINE: 0,
    SELF_TRANSFER: 0,
    DUPLICATE_TRANSFER: 0,
    CODE_MISMATCH: 0,
    NAME_KO_MISMATCH: 0,
    NAME_JA_MISMATCH: 0,
    COLOR_MISMATCH: 0,
  },
);

/*
 * =========================================================
 * 문제 중요도 분류
 * =========================================================
 *
 * ACTION REQUIRED
 * 실제 데이터 수정 또는 사람의 판단이 필요한 문제.
 *
 * AUTO NORMALIZED
 * 원본 transfer 메타데이터와 Registry가 다르지만,
 * 앱에서는 normalizeTransfers()를 통해 Registry 값으로 보정됨.
 *
 * REFERENCE
 * Registry에서 관리하지 않는 외부 노선.
 * 오류라고 단정하지 않고 참고 정보로만 표시.
 * =========================================================
 */

const actionRequiredTypes = new Set<AuditIssueType>([
  "ID_ALIAS_CANDIDATE",
  "REVIEW_REQUIRED",
  "SELF_TRANSFER",
  "DUPLICATE_TRANSFER",
  "CODE_MISMATCH",
]);

const autoNormalizedTypes = new Set<AuditIssueType>([
  "NAME_KO_MISMATCH",
  "NAME_JA_MISMATCH",
  "COLOR_MISMATCH",
]);

const referenceTypes = new Set<AuditIssueType>([
  "EXTERNAL_LINE",
]);

const actionRequiredCount = issues.filter((issue) =>
  actionRequiredTypes.has(issue.type),
).length;

const autoNormalizedCount = issues.filter((issue) =>
  autoNormalizedTypes.has(issue.type),
).length;

const referenceCount = issues.filter((issue) =>
  referenceTypes.has(issue.type),
).length;

const getUniqueTransferIdsByType = (
  type: AuditIssueType,
): string[] => {
  return [
    ...new Set(
      issues
        .filter((issue) => issue.type === type)
        .map((issue) => issue.transferId),
    ),
  ].sort();
};

const problematicTransferIds = [
  ...new Set(issues.map((issue) => issue.transferId)),
].sort();

/*
 * =========================================================
 * Header
 * =========================================================
 */

console.log("");
console.log("========================================");
console.log(" Tokyo Railway Guide - Transfer Audit");
console.log("========================================");
console.log("");

console.log(`Stations checked : ${checkedStations}`);
console.log(`Transfers checked: ${checkedTransfers}`);
console.log(`Raw findings     : ${issues.length}`);
console.log("");

/*
 * =========================================================
 * 중요도별 요약
 * =========================================================
 */

console.log("========================================");
console.log(" Audit Status");
console.log("========================================");
console.log("");

console.log(
  `ACTION REQUIRED    : ${actionRequiredCount}`,
);

console.log(
  `AUTO NORMALIZED    : ${autoNormalizedCount}`,
);

console.log(
  `REFERENCE          : ${referenceCount}`,
);

console.log("----------------------------------------");
console.log(
  `RAW FINDINGS       : ${issues.length}`,
);
console.log("");

/*
 * =========================================================
 * 세부 유형별 요약
 * =========================================================
 */

console.log("========================================");
console.log(" Finding Details");
console.log("========================================");
console.log("");

(Object.entries(issueCounts) as [AuditIssueType, number][]).forEach(
  ([type, count]) => {
    if (count > 0) {
      console.log(`${type.padEnd(20)}: ${count}`);
    }
  },
);

console.log("----------------------------------------");
console.log(`TOTAL               : ${issues.length}`);
console.log("");

/*
 * =========================================================
 * 실제 조치가 필요한 문제가 없는 경우 안내
 * =========================================================
 */

if (actionRequiredCount === 0) {
  console.log("========================================");
  console.log(" Action Required");
  console.log("========================================");
  console.log("");
  console.log("None");
  console.log("");
}

/*
 * =========================================================
 * 확정 Alias 후보 + 발생 위치
 * =========================================================
 */

const aliasTransferIds = getUniqueTransferIdsByType(
  "ID_ALIAS_CANDIDATE",
);

console.log("========================================");
console.log(" ID Alias Candidates");
console.log("========================================");
console.log("");

if (aliasTransferIds.length === 0) {
  console.log("None");
} else {
  aliasTransferIds.forEach((transferId) => {
    const candidate = findKnownAliasCandidate(transferId);

    const relatedIssues = issues.filter(
      (issue) =>
        issue.type === "ID_ALIAS_CANDIDATE" &&
        issue.transferId === transferId,
    );

    console.log(
      `${transferId} -> ${candidate ?? "UNKNOWN"} ` +
        `(${relatedIssues.length} occurrences)`,
    );

    relatedIssues.forEach((issue) => {
      console.log(
        `  - ${issue.stationNameKo} / ${issue.stationNameJa}` +
          ` | ${issue.stationCode}` +
          ` | currentLine=${issue.currentLineId}`,
      );
    });

    console.log("");
  });
}

console.log("");

/*
 * =========================================================
 * 수동 확인 필요 + 발생 위치
 * =========================================================
 */

const reviewTransferIds = getUniqueTransferIdsByType(
  "REVIEW_REQUIRED",
);

console.log("========================================");
console.log(" Review Required");
console.log("========================================");
console.log("");

if (reviewTransferIds.length === 0) {
  console.log("None");
} else {
  reviewTransferIds.forEach((transferId) => {
    const relatedIssues = issues.filter(
      (issue) =>
        issue.type === "REVIEW_REQUIRED" &&
        issue.transferId === transferId,
    );

    console.log(
      `${transferId} (${relatedIssues.length} occurrences)`,
    );

    relatedIssues.forEach((issue) => {
      console.log(
        `  - ${issue.stationNameKo} / ${issue.stationNameJa}` +
          ` | ${issue.stationCode}` +
          ` | currentLine=${issue.currentLineId}`,
      );
    });

    console.log("");
  });
}

console.log("");

/*
 * =========================================================
 * 외부 노선
 * =========================================================
 */

const externalTransferIds = getUniqueTransferIdsByType(
  "EXTERNAL_LINE",
);

console.log("========================================");
console.log(" External Line Candidates");
console.log("========================================");
console.log("");

if (externalTransferIds.length === 0) {
  console.log("None");
} else {
  externalTransferIds.forEach((transferId) => {
    const count = issues.filter(
      (issue) =>
        issue.type === "EXTERNAL_LINE" &&
        issue.transferId === transferId,
    ).length;

    console.log(
      `${transferId.padEnd(25)} | ${count
        .toString()
        .padStart(3)} occurrences`,
    );
  });
}

console.log("");

/*
 * =========================================================
 * 모든 발견된 transfer ID
 * =========================================================
 */

console.log("========================================");
console.log(" Unique Transfer IDs With Findings");
console.log("========================================");
console.log("");

problematicTransferIds.forEach((transferId) => {
  const relatedIssues = issues.filter(
    (issue) => issue.transferId === transferId,
  );

  const types = [
    ...new Set(relatedIssues.map((issue) => issue.type)),
  ];

  console.log(
    `${transferId.padEnd(25)} | ${relatedIssues.length
      .toString()
      .padStart(3)} findings | ${types.join(", ")}`,
  );
});

console.log("");
console.log("----------------------------------------");
console.log(
  `Unique transfer IDs with findings: ${problematicTransferIds.length}`,
);
console.log("----------------------------------------");
console.log("");

/*
 * =========================================================
 * Exit Code
 * =========================================================
 *
 * 실제 조치가 필요한 문제가 있을 때만 실패 코드(1)를 반환한다.
 *
 * AUTO NORMALIZED / REFERENCE만 존재하는 경우에는
 * Audit 자체는 성공으로 처리한다.
 * =========================================================
 */

process.exitCode = actionRequiredCount > 0 ? 1 : 0;