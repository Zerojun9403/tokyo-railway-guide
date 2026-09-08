import { getJrEastDirection } from "../utils/routing/getJrEastDirection";
import { resolveLiveJourney } from "../utils/routing/resolveLiveJourney";
import type { JourneyStructure } from "../utils/routing/journeyTypes";

const API_BASE_URL = "http://localhost:3000";

type TestCase = {
  name: string;
  lineId: string;
  fromStationId: string;
  toStationId: string;
  fromStationNameKo: string;
  toStationNameKo: string;
  directionId: string;
  currentTime: string;
};

const tests: TestCase[] = [
  {
    name: "Shonan-Shinjuku",
    lineId: "shonan-shinjuku",
    fromStationId: "JS20",
    toStationId: "JS19",
    fromStationNameKo: "신주쿠",
    toStationNameKo: "시부야",
    directionId: "Southbound",
    currentTime: "05:50",
  },
  {
    name: "Tokaido",
    lineId: "tokaido",
    fromStationId: "JT01",
    toStationId: "JT02",
    fromStationNameKo: "도쿄",
    toStationNameKo: "신바시",
    directionId: "Outbound",
    currentTime: "05:15",
  },
  {
    name: "Keihin-Tohoku",
    lineId: "keihin-tohoku",
    fromStationId: "JK26",
    toStationId: "JK25",
    fromStationNameKo: "도쿄",
    toStationNameKo: "유라쿠초",
    directionId: "Southbound",
    currentTime: "04:35",
  },
  {
    name: "Keiyo",
    lineId: "keiyo",
    fromStationId: "JE01",
    toStationId: "JE02",
    fromStationNameKo: "도쿄",
    toStationNameKo: "핫초보리",
    directionId: "Outbound",
    currentTime: "04:50",
  },
  {
    name: "Yokosuka",
    lineId: "yokosuka",
    fromStationId: "JO19",
    toStationId: "JO18",
    fromStationNameKo: "도쿄",
    toStationNameKo: "신바시",
    directionId: "Outbound",
    currentTime: "05:20",
  },
  {
    name: "Sobu",
    lineId: "sobu",
    fromStationId: "JO28",
    toStationId: "JO30",
    fromStationNameKo: "지바",
    toStationNameKo: "쓰가",
    directionId: "Outbound",
    currentTime: "04:45",
  },
  {
    name: "Sobu Rapid",
    lineId: "sobu-rapid",
    fromStationId: "JO19",
    toStationId: "JO22",
    fromStationNameKo: "도쿄",
    toStationNameKo: "긴시초",
    directionId: "Outbound",
    currentTime: "05:00",
  },
];

const runTest = async (test: TestCase) => {
  const detectedDirection = getJrEastDirection(
    test.lineId,
    test.fromStationId,
    test.toStationId,
  );

  if (detectedDirection !== test.directionId) {
    throw new Error(
      `Direction mismatch: expected ${test.directionId}, got ${detectedDirection}`,
    );
  }

  const journey: JourneyStructure = {
    segments: [
      {
        lineId: test.lineId,
        fromNodeId: `${test.lineId}:${test.fromStationId}`,
        toNodeId: `${test.lineId}:${test.toStationId}`,
        fromStationId: test.fromStationId,
        toStationId: test.toStationId,
        fromStationNameKo: test.fromStationNameKo,
        toStationNameKo: test.toStationNameKo,
        rideCount: 1,
      },
    ],
    transfers: [],
  };

  const result = await resolveLiveJourney({
    journey,
    currentTime: test.currentTime,
    apiBaseUrl: API_BASE_URL,
    directionId: detectedDirection,
  });

  if (result.status !== "resolved") {
    throw new Error(`Journey was not resolved.`);
  }

  const train = result.segments[0]?.train.candidate;

  if (!train) {
    throw new Error("Resolved train is missing.");
  }

  return {
    direction: detectedDirection,
    trainNumber: train.trainNumber ?? "-",
    departureTime: train.departureTime,
    arrivalTime: train.arrivalTime,
    trainType: train.trainType,
  };
};

const run = async () => {
  console.log("=== JR EAST ALL LIVE JOURNEY TEST ===");
  console.log("");

  let passed = 0;

  for (let index = 0; index < tests.length; index += 1) {
    const test = tests[index];

    try {
      const result = await runTest(test);

      console.log(`[${index + 1}/${tests.length}] ${test.name}`);
      console.log(`PASS  ${test.fromStationNameKo} → ${test.toStationNameKo}`);
      console.log(
        `      ${result.trainNumber}  ${result.departureTime} → ${result.arrivalTime}  ${result.trainType}`,
      );
      console.log("");

      passed += 1;
    } catch (error) {
      console.log(`[${index + 1}/${tests.length}] ${test.name}`);
      console.log("FAIL");

      if (error instanceof Error) {
        console.log(`      ${error.message}`);
      } else {
        console.log(`      ${String(error)}`);
      }

      console.log("");
    }
  }

  console.log("================================");
  console.log(`JR EAST LIVE JOURNEY: ${passed}/${tests.length} PASS`);
  console.log("================================");

  if (passed !== tests.length) {
    process.exitCode = 1;
  }
};

void run();
