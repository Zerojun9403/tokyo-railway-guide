import type {
  JourneySegment,
  JourneyStructure,
} from "../utils/routing/journeyTypes";
import type {
  TrainCandidate,
} from "../utils/routing/trainResolverTypes";
import {
  resolveLastJourney,
} from "../utils/routing/resolveLastJourney";

type TestResult = {
  name: string;
  passed: boolean;
  detail: string;
};

const segment = (
  lineId: string,
  fromStationId: string,
  toStationId: string,
  fromStationNameKo: string,
  toStationNameKo: string,
): JourneySegment => ({
  lineId,
  fromNodeId: `${lineId}:${fromStationId}`,
  toNodeId: `${lineId}:${toStationId}`,
  fromStationId,
  toStationId,
  fromStationNameKo,
  toStationNameKo,
  rideCount: 1,
});

const journey = (
  segments: JourneySegment[],
): JourneyStructure => ({
  segments,
  transfers: [],
});

const train = (
  id: string,
  lineId: string,
  fromStationId: string,
  toStationId: string,
  departureTime: string,
  arrivalTime: string,
  options?: {
    status?: TrainCandidate["status"];
    stopsAtDestination?: boolean;
  },
): TrainCandidate => ({
  id,
  lineId,
  fromNodeId: `${lineId}:${fromStationId}`,
  toNodeId: `${lineId}:${toStationId}`,
  fromStationId,
  toStationId,
  departureTime,
  arrivalTime,
  trainType: "local",
  stopsAtDestination:
    options?.stopsAtDestination ?? true,
  status: options?.status ?? "normal",
});

const selectedIds = (
  result: ReturnType<typeof resolveLastJourney>,
): string[] => {
  if (result.status !== "resolved") {
    return [];
  }

  return result.segments.map(
    (item) => item.train.candidate.id,
  );
};

const results: TestResult[] = [];

const check = (
  name: string,
  passed: boolean,
  detail: string,
) => {
  results.push({
    name,
    passed,
    detail,
  });
};

/*
 * =========================================================
 * 1. Single Segment
 * =========================================================
 */
{
  const route = journey([
    segment(
      "single",
      "S01",
      "S02",
      "출발역",
      "숙소역",
    ),
  ]);

  const candidates = [
    train(
      "S-2300",
      "single",
      "S01",
      "S02",
      "23:00",
      "23:20",
    ),
    train(
      "S-2330",
      "single",
      "S01",
      "S02",
      "23:30",
      "23:50",
    ),
  ];

  const result =
    resolveLastJourney(route, candidates);

  const passed =
    result.status === "resolved" &&
    result.departureTime === "23:30" &&
    result.arrivalTime === "23:50" &&
    result.transferCount === 0 &&
    selectedIds(result).join(",") ===
      "S-2330";

  check(
    "Single Segment",
    passed,
    result.status === "resolved"
      ? `${result.departureTime} -> ${result.arrivalTime}`
      : `not-found segment ${result.failedSegmentIndex}`,
  );
}

/*
 * =========================================================
 * 2. Three Segment Reverse Resolution
 * =========================================================
 */
{
  const route = journey([
    segment(
      "line-a",
      "A01",
      "A02",
      "출발역",
      "환승역1",
    ),
    segment(
      "line-b",
      "B01",
      "B02",
      "환승역1",
      "환승역2",
    ),
    segment(
      "line-c",
      "C01",
      "C02",
      "환승역2",
      "숙소역",
    ),
  ]);

  const candidates = [
    train(
      "A-EARLY",
      "line-a",
      "A01",
      "A02",
      "22:50",
      "23:05",
    ),
    train(
      "A-LAST",
      "line-a",
      "A01",
      "A02",
      "23:10",
      "23:25",
    ),
    train(
      "B-EARLY",
      "line-b",
      "B01",
      "B02",
      "23:15",
      "23:30",
    ),
    train(
      "B-LAST",
      "line-b",
      "B01",
      "B02",
      "23:28",
      "23:40",
    ),
    train(
      "C-EARLY",
      "line-c",
      "C01",
      "C02",
      "23:35",
      "23:55",
    ),
    train(
      "C-LAST",
      "line-c",
      "C01",
      "C02",
      "23:45",
      "00:10",
    ),
  ];

  const result =
    resolveLastJourney(route, candidates, 3);

  const passed =
    result.status === "resolved" &&
    result.departureTime === "23:10" &&
    result.arrivalTime === "00:10" &&
    result.transferCount === 2 &&
    selectedIds(result).join(",") ===
      "A-LAST,B-LAST,C-LAST";

  check(
    "Three Segment",
    passed,
    result.status === "resolved"
      ? selectedIds(result).join(" -> ")
      : `not-found segment ${result.failedSegmentIndex}`,
  );
}

/*
 * =========================================================
 * 3. Transfer Failure
 * =========================================================
 *
 * 마지막 구간 막차는 23:52 출발.
 * 앞 구간은 환승 3분 때문에 23:49까지 도착해야 한다.
 * 하지만 유일한 앞 열차는 23:50 도착.
 */
{
  const route = journey([
    segment(
      "fail-a",
      "A01",
      "A02",
      "출발역",
      "환승역",
    ),
    segment(
      "fail-b",
      "B01",
      "B02",
      "환승역",
      "숙소역",
    ),
  ]);

  const candidates = [
    train(
      "A-TOO-LATE",
      "fail-a",
      "A01",
      "A02",
      "23:35",
      "23:50",
    ),
    train(
      "B-LAST",
      "fail-b",
      "B01",
      "B02",
      "23:52",
      "00:14",
    ),
  ];

  const result =
    resolveLastJourney(route, candidates, 3);

  const passed =
    result.status === "not-found" &&
    result.failedSegmentIndex === 0;

  check(
    "Transfer Failure",
    passed,
    result.status === "not-found"
      ? `correctly failed at segment ${result.failedSegmentIndex}`
      : "unexpectedly resolved",
  );
}

/*
 * =========================================================
 * 4. Cancelled Train
 * =========================================================
 */
{
  const route = journey([
    segment(
      "cancel",
      "C01",
      "C02",
      "출발역",
      "숙소역",
    ),
  ]);

  const candidates = [
    train(
      "NORMAL-2320",
      "cancel",
      "C01",
      "C02",
      "23:20",
      "23:40",
    ),
    train(
      "CANCELLED-2340",
      "cancel",
      "C01",
      "C02",
      "23:40",
      "00:00",
      {
        status: "cancelled",
      },
    ),
  ];

  const result =
    resolveLastJourney(route, candidates);

  const passed =
    result.status === "resolved" &&
    selectedIds(result)[0] ===
      "NORMAL-2320";

  check(
    "Cancelled Train",
    passed,
    result.status === "resolved"
      ? `selected ${selectedIds(result)[0]}`
      : "not-found",
  );
}

/*
 * =========================================================
 * 5. Non-stop Train
 * =========================================================
 */
{
  const route = journey([
    segment(
      "express",
      "E01",
      "E02",
      "출발역",
      "숙소역",
    ),
  ]);

  const candidates = [
    train(
      "LOCAL-2310",
      "express",
      "E01",
      "E02",
      "23:10",
      "23:35",
    ),
    train(
      "EXPRESS-2340",
      "express",
      "E01",
      "E02",
      "23:40",
      "23:55",
      {
        stopsAtDestination: false,
      },
    ),
  ];

  const result =
    resolveLastJourney(route, candidates);

  const passed =
    result.status === "resolved" &&
    selectedIds(result)[0] ===
      "LOCAL-2310";

  check(
    "Non-stop Train",
    passed,
    result.status === "resolved"
      ? `selected ${selectedIds(result)[0]}`
      : "not-found",
  );
}

/*
 * =========================================================
 * 6. Midnight Multi Segment
 * =========================================================
 *
 * 23:41 -> 23:55
 * 환승 3분
 * 00:03 -> 00:21
 */
{
  const route = journey([
    segment(
      "mid-a",
      "M01",
      "M02",
      "출발역",
      "환승역",
    ),
    segment(
      "mid-b",
      "M03",
      "M04",
      "환승역",
      "숙소역",
    ),
  ]);

  const candidates = [
    train(
      "MID-A",
      "mid-a",
      "M01",
      "M02",
      "23:41",
      "23:55",
    ),
    train(
      "MID-B",
      "mid-b",
      "M03",
      "M04",
      "00:03",
      "00:21",
    ),
  ];

  const result =
    resolveLastJourney(route, candidates, 3);

  const passed =
    result.status === "resolved" &&
    result.departureTime === "23:41" &&
    result.arrivalTime === "00:21" &&
    selectedIds(result).join(",") ===
      "MID-A,MID-B";

  check(
    "Midnight Journey",
    passed,
    result.status === "resolved"
      ? `${result.departureTime} -> ${result.arrivalTime}`
      : `not-found segment ${result.failedSegmentIndex}`,
  );
}

/*
 * =========================================================
 * 7. Missing Segment
 * =========================================================
 *
 * 마지막 Segment 후보 자체가 없으므로
 * failedSegmentIndex === 1 이어야 한다.
 */
{
  const route = journey([
    segment(
      "missing-a",
      "A01",
      "A02",
      "출발역",
      "환승역",
    ),
    segment(
      "missing-b",
      "B01",
      "B02",
      "환승역",
      "숙소역",
    ),
  ]);

  const candidates = [
    train(
      "ONLY-A",
      "missing-a",
      "A01",
      "A02",
      "23:00",
      "23:20",
    ),
  ];

  const result =
    resolveLastJourney(route, candidates);

  const passed =
    result.status === "not-found" &&
    result.failedSegmentIndex === 1;

  check(
    "Missing Segment",
    passed,
    result.status === "not-found"
      ? `correctly failed at segment ${result.failedSegmentIndex}`
      : "unexpectedly resolved",
  );
}

console.log("");
console.log(
  "==============================================",
);
console.log(
  " CULLINAN LAST JOURNEY FINAL CHECK",
);
console.log(
  "==============================================",
);

results.forEach((result, index) => {
  const number =
    String(index + 1).padStart(2, "0");

  console.log(
    `${number}. ${result.name.padEnd(20)} ${
      result.passed ? "PASS ✅" : "FAIL ❌"
    }`,
  );

  console.log(
    `    ${result.detail}`,
  );
});

const passedCount =
  results.filter(
    (result) => result.passed,
  ).length;

console.log(
  "----------------------------------------------",
);
console.log(
  `${passedCount} / ${results.length} PASS`,
);

if (passedCount === results.length) {
  console.log(
    "🎉 CULLINAN Last Journey 기본 로직 검증 통과",
  );
} else {
  console.error(
    "❌ CULLINAN Last Journey 검증 실패",
  );
  process.exitCode = 1;
}
