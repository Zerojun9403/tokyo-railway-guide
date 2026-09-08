import type { JourneyStructure } from "../utils/routing/journeyTypes";
import type { RailwayNodeId } from "../utils/routing/types";
import { resolveLiveJourney } from "../utils/routing/resolveLiveJourney";

const run = async () => {
  console.log("=== JR EAST LIVE JOURNEY TEST ===");

  const journey: JourneyStructure = {
    segments: [
      {
        lineId: "yamanote",

        fromNodeId: "jr-east:yamanote:JY17" as RailwayNodeId,

        toNodeId: "jr-east:yamanote:JY13" as RailwayNodeId,

        fromStationId: "JY17",
        toStationId: "JY13",

        fromStationNameKo: "신주쿠",
        toStationNameKo: "이케부쿠로",

        rideCount: 4,
      },
    ],

    transfers: [],
  };

  const result = await resolveLiveJourney({
    journey,

    // 실제 현재 시간이 아니라
    // 결과 검증을 위한 고정 시각
    currentTime: "04:40",

    apiBaseUrl: "http://localhost:3000",
  });

  console.dir(result, {
    depth: null,
  });

  if (result.status !== "resolved") {
    throw new Error("LIVE JOURNEY TEST FAILED: journey not resolved");
  }

  const firstSegment = result.segments[0];

  if (!firstSegment) {
    throw new Error("LIVE JOURNEY TEST FAILED: segment missing");
  }

  if (firstSegment.train.candidate.trainNumber !== "403G") {
    throw new Error(
      `Expected 403G but got ${firstSegment.train.candidate.trainNumber}`,
    );
  }

  if (result.departureTime !== "04:44" || result.arrivalTime !== "04:53") {
    throw new Error(
      `Unexpected journey time: ${result.departureTime} -> ${result.arrivalTime}`,
    );
  }

  console.log("");
  console.log("PASS: LIVE JR EAST JOURNEY");
  console.log(
    `신주쿠 ${result.departureTime} -> 이케부쿠로 ${result.arrivalTime}`,
  );
  console.log(`Train: ${firstSegment.train.candidate.trainNumber}`);
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});
