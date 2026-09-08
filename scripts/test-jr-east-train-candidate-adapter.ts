import { buildJrEastTrainCandidates } from "../utils/routing/jrEastTrainCandidateAdapter";
import type { JrEastTimetableEntry } from "../utils/routing/jrEastTrainCandidateAdapter";
import type { RailwayNodeId } from "../utils/routing/types";
import { resolveBestTrain } from "../utils/routing/resolveBestTrain";

const originTimetable: JrEastTimetableEntry[] = [
  {
    id: "shinjuku-403G",
    lineId: "yamanote",
    stationId: "JY17",
    directionId: "OuterLoop",
    departureTime: "04:44",
    trainType: "local",
    trainTypeKo: "각역정차",
    trainTypeJa: "各駅停車",
    trainNumber: "403G",
    destinationKo: "오사키",
    destinationJa: "大崎",
  },
  {
    id: "shinjuku-401G",
    lineId: "yamanote",
    stationId: "JY17",
    directionId: "OuterLoop",
    departureTime: "05:03",
    trainType: "local",
    trainTypeKo: "각역정차",
    trainTypeJa: "各駅停車",
    trainNumber: "401G",
    destinationKo: "오사키",
    destinationJa: "大崎",
  },

  /*
   * 목적지역 시간표에 존재하지 않는 열차.
   * Candidate에서 제외되는지 확인한다.
   */
  {
    id: "shinjuku-999G",
    lineId: "yamanote",
    stationId: "JY17",
    directionId: "OuterLoop",
    departureTime: "05:10",
    trainType: "local",
    trainNumber: "999G",
  },
];

const destinationTimetable: JrEastTimetableEntry[] = [
  {
    id: "ikebukuro-403G",
    lineId: "yamanote",
    stationId: "JY13",
    directionId: "OuterLoop",
    departureTime: "04:53",
    trainType: "local",
    trainNumber: "403G",
  },
  {
    id: "ikebukuro-401G",
    lineId: "yamanote",
    stationId: "JY13",
    directionId: "OuterLoop",
    departureTime: "05:11",
    trainType: "local",
    trainNumber: "401G",
  },
];

const candidates = buildJrEastTrainCandidates({
  lineId: "yamanote",

  /*
   * RailwayNodeId의 실제 내부 형식은
   * Adapter 로직 테스트와 관계없으므로
   * 테스트용 값으로 사용한다.
   */
  fromNodeId: "jr-east:yamanote:JY17" as RailwayNodeId,
  fromStationId: "JY17",

  toNodeId: "jr-east:yamanote:JY13" as RailwayNodeId,
  toStationId: "JY13",

  originTimetable,
  destinationTimetable,
});

console.log("=========================================");
console.log("JR East TrainCandidate Adapter Test");
console.log("=========================================");

console.log(candidates);

if (candidates.length !== 2) {
  throw new Error(
    `FAIL: expected 2 candidates, received ${candidates.length}`,
  );
}

const train403G = candidates.find(
  (candidate) => candidate.trainNumber === "403G",
);

if (!train403G) {
  throw new Error("FAIL: 403G candidate not found");
}

if (train403G.departureTime !== "04:44") {
  throw new Error(
    `FAIL: 403G departure expected 04:44, received ${train403G.departureTime}`,
  );
}

if (train403G.arrivalTime !== "04:53") {
  throw new Error(
    `FAIL: 403G arrival expected 04:53, received ${train403G.arrivalTime}`,
  );
}

if (!train403G.stopsAtDestination) {
  throw new Error(
    "FAIL: 403G should stop at destination",
  );
}

const train401G = candidates.find(
  (candidate) => candidate.trainNumber === "401G",
);

if (!train401G) {
  throw new Error("FAIL: 401G candidate not found");
}

if (train401G.departureTime !== "05:03") {
  throw new Error(
    `FAIL: 401G departure expected 05:03, received ${train401G.departureTime}`,
  );
}

if (train401G.arrivalTime !== "05:11") {
  throw new Error(
    `FAIL: 401G arrival expected 05:11, received ${train401G.arrivalTime}`,
  );
}

/*
 * 999G는 목적지역 시간표에 없으므로
 * Candidate가 되면 안 된다.
 */
const train999G = candidates.find(
  (candidate) => candidate.trainNumber === "999G",
);

if (train999G) {
  throw new Error(
    "FAIL: 999G should not become a candidate",
  );
}

console.log("");
console.log("PASS: trainNumber join");
console.log("PASS: 403G Shinjuku 04:44 -> Ikebukuro 04:53");
console.log("PASS: 401G Shinjuku 05:03 -> Ikebukuro 05:11");
console.log("PASS: train not stopping at destination excluded");
console.log("");
console.log("ALL TESTS PASSED");
/*
 * =========================================================
 * JR East Adapter → Best Train Resolver 통합 테스트
 * =========================================================
 *
 * 현재 시각 04:40
 *
 * 403G 04:44 → 04:53
 * 401G 05:03 → 05:11
 *
 * 가장 빨리 목적지에 도착하는
 * 403G가 선택되어야 한다.
 */

const resolverResult = resolveBestTrain(
  candidates,
  "04:40",
);

if (resolverResult.status !== "resolved") {
  throw new Error(
    "FAIL: Resolver could not find a JR East train",
  );
}

if (
  resolverResult.train.candidate.trainNumber !==
  "403G"
) {
  throw new Error(
    `FAIL: expected 403G, received ${resolverResult.train.candidate.trainNumber}`,
  );
}

if (
  resolverResult.train.departureTime !== "04:44"
) {
  throw new Error(
    `FAIL: expected departure 04:44, received ${resolverResult.train.departureTime}`,
  );
}

if (
  resolverResult.train.arrivalTime !== "04:53"
) {
  throw new Error(
    `FAIL: expected arrival 04:53, received ${resolverResult.train.arrivalTime}`,
  );
}

console.log("");
console.log("PASS: JR East Adapter -> resolveBestTrain");
console.log("PASS: selected train 403G");
console.log("PASS: departure 04:44");
console.log("PASS: destination station time 04:53");
console.log("");
console.log("JR EAST RESOLVER INTEGRATION PASSED");