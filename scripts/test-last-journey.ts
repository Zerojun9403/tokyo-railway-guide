import type {
  JourneyStructure,
} from "../utils/routing/journeyTypes";
import type {
  TrainCandidate,
} from "../utils/routing/trainResolverTypes";
import { resolveLastJourney } from "../utils/routing/resolveLastJourney";

const journey: JourneyStructure = {
  segments: [
    {
      lineId: "test-line-a",
      fromNodeId: "test-line-a:A01",
      toNodeId: "test-line-a:A02",
      fromStationId: "A01",
      toStationId: "A02",
      fromStationNameKo: "출발역",
      toStationNameKo: "환승역",
      rideCount: 1,
    },
    {
      lineId: "test-line-b",
      fromNodeId: "test-line-b:B01",
      toNodeId: "test-line-b:B02",
      fromStationId: "B01",
      toStationId: "B02",
      fromStationNameKo: "환승역",
      toStationNameKo: "숙소역",
      rideCount: 1,
    },
  ],
  transfers: [],
};

const candidates: TrainCandidate[] = [
  {
    id: "A-2320",
    lineId: "test-line-a",
    fromNodeId: "test-line-a:A01",
    toNodeId: "test-line-a:A02",
    fromStationId: "A01",
    toStationId: "A02",
    departureTime: "23:20",
    arrivalTime: "23:40",
    trainType: "local",
    stopsAtDestination: true,
    status: "normal",
  },
  {
    id: "A-2331",
    lineId: "test-line-a",
    fromNodeId: "test-line-a:A01",
    toNodeId: "test-line-a:A02",
    fromStationId: "A01",
    toStationId: "A02",
    departureTime: "23:31",
    arrivalTime: "23:46",
    trainType: "local",
    stopsAtDestination: true,
    status: "normal",
  },
  {
    id: "B-2349",
    lineId: "test-line-b",
    fromNodeId: "test-line-b:B01",
    toNodeId: "test-line-b:B02",
    fromStationId: "B01",
    toStationId: "B02",
    departureTime: "23:49",
    arrivalTime: "00:05",
    trainType: "local",
    stopsAtDestination: true,
    status: "normal",
  },
  {
    id: "B-2352",
    lineId: "test-line-b",
    fromNodeId: "test-line-b:B01",
    toNodeId: "test-line-b:B02",
    fromStationId: "B01",
    toStationId: "B02",
    departureTime: "23:52",
    arrivalTime: "00:14",
    trainType: "local",
    stopsAtDestination: true,
    status: "normal",
  },
];

const result =
  resolveLastJourney(
    journey,
    candidates,
    3,
  );

console.log("");
console.log("====================================");
console.log(" CULLINAN LAST JOURNEY TEST");
console.log("====================================");
console.dir(result, { depth: null });

if (result.status !== "resolved") {
  console.error("");
  console.error(
    `❌ 실패: Segment ${result.failedSegmentIndex}에서 막차를 찾지 못했습니다.`,
  );
  process.exitCode = 1;
} else {
  const firstTrain =
    result.segments[0]?.train.candidate.id;

  const lastTrain =
    result.segments[
      result.segments.length - 1
    ]?.train.candidate.id;

  const passed =
    result.departureTime === "23:31" &&
    result.arrivalTime === "00:14" &&
    result.transferCount === 1 &&
    firstTrain === "A-2331" &&
    lastTrain === "B-2352";

  console.log("");
  console.log("------------------------------------");
  console.log(
    `최종 출발: ${result.departureTime}`,
  );
  console.log(
    `최종 도착: ${result.arrivalTime}`,
  );
  console.log(
    `환승 횟수: ${result.transferCount}`,
  );
  console.log(
    `선택 열차: ${firstTrain} -> ${lastTrain}`,
  );
  console.log("------------------------------------");

  if (passed) {
    console.log(
      "🎉 PASS: CULLINAN Last Journey 역산 성공",
    );
  } else {
    console.error(
      "❌ FAIL: 예상한 막차 조합과 다릅니다.",
    );
    process.exitCode = 1;
  }
}
