import { railwayRegistry } from "../data/railwayRegistry";

type AuditIssueType =
  | "UNKNOWN_LINE"
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

const addIssue = (issue: AuditIssue) => {
  issues.push(issue);
};

Object.values(railwayRegistry).forEach((line) => {
  line.stations.forEach((station) => {
    checkedStations += 1;

    const transfers = station.transfers ?? [];

    const seenTransferIds = new Set<string>();

    transfers.forEach((transfer) => {
      checkedTransfers += 1;

      /*
       * =========================================================
       * 1. 존재하지 않는 노선
       * =========================================================
       */

      const targetLine = railwayRegistry[transfer.id];

      if (!targetLine) {
        addIssue({
          type: "UNKNOWN_LINE",

          stationId: station.id,
          stationCode: station.code,
          stationNameKo: station.nameKo,
          stationNameJa: station.nameJa,

          currentLineId: line.id,
          currentLineNameKo: line.nameKo,

          transferId: transfer.id,

          message: `Registry에 "${transfer.id}" 노선이 없습니다.`,
        });

        return;
      }

      /*
       * =========================================================
       * 2. 자기 자신의 노선을 환승으로 등록
       * =========================================================
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

          message: `현재 노선 "${line.id}"이 자기 자신의 환승 노선으로 등록되어 있습니다.`,
        });
      }

      /*
       * =========================================================
       * 3. 동일 환승 노선 중복
       * =========================================================
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

          message: `"${transfer.id}" 환승 노선이 중복 등록되어 있습니다.`,
        });
      }

      seenTransferIds.add(transfer.id);

      /*
       * =========================================================
       * 4. 노선 코드 불일치
       * =========================================================
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
            `transfer="${transfer.code}", registry="${targetLine.lineCode}"`,
        });
      }

      /*
       * =========================================================
       * 5. 한국어 노선명 불일치
       * =========================================================
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
            `transfer="${transfer.nameKo}", registry="${targetLine.nameKo}"`,
        });
      }

      /*
       * =========================================================
       * 6. 일본어 노선명 불일치
       * =========================================================
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
            `transfer="${transfer.nameJa}", registry="${targetLine.nameJa}"`,
        });
      }

      /*
       * =========================================================
       * 7. 노선 색상 불일치
       * =========================================================
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
            `transfer="${transfer.color}", registry="${targetLine.color}"`,
        });
      }
    });
  });
});

/*
 * =========================================================
 * 결과 출력
 * =========================================================
 */

console.log("");
console.log("========================================");
console.log(" Tokyo Railway Guide - Transfer Audit");
console.log("========================================");
console.log("");

console.log(`Stations checked : ${checkedStations}`);
console.log(`Transfers checked: ${checkedTransfers}`);
console.log(`Issues found     : ${issues.length}`);
console.log("");

if (issues.length === 0) {
  console.log("✓ 환승 데이터에서 구조적인 오류를 찾지 못했습니다.");
  console.log("");
  process.exit(0);
}

issues.forEach((issue, index) => {
  console.log(
    `[${index + 1}] ${issue.stationNameKo} / ${issue.stationNameJa}`,
  );

  console.log(
    `    Station : ${issue.stationCode} (${issue.stationId})`,
  );

  console.log(
    `    Line    : ${issue.currentLineNameKo} (${issue.currentLineId})`,
  );

  console.log(`    Transfer: ${issue.transferId}`);
  console.log(`    Type    : ${issue.type}`);
  console.log(`    Problem : ${issue.message}`);
  console.log("");
});

console.log("========================================");
console.log(`Total issues: ${issues.length}`);
console.log("========================================");
console.log("");

process.exitCode = 1;