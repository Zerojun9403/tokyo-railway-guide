import type { JourneyStructure } from "../utils/routing/journeyTypes";

import { getSaikyoDirection } from "../utils/routing/getSaikyoDirection";

import { resolveLiveJourney } from "../utils/routing/resolveLiveJourney";

const API_BASE_URL = "http://localhost:3000";

const journey: JourneyStructure = {
  segments: [
    {
      lineId: "saikyo",
      fromNodeId: "saikyo:JA11",
      toNodeId: "saikyo:JA12",
      fromStationId: "JA11",
      toStationId: "JA12",
      fromStationNameKo: "신주쿠",
      toStationNameKo: "이케부쿠로",
      rideCount: 1,
    },
  ],
  transfers: [],
};

const directionId = getSaikyoDirection("JA11", "JA12");

if (!directionId) {
  throw new Error("Failed to resolve Saikyo direction.");
}

const run = async () => {
  console.log("=== SAIKYO LIVE JOURNEY TEST ===");

  console.log("Direction:");

  const result = await resolveLiveJourney({
    journey,
    currentTime: "05:50",
    apiBaseUrl: API_BASE_URL,
  });

  console.dir(result, {
    depth: null,
  });

  if (result.status !== "resolved") {
    throw new Error("Saikyo Live Journey was not resolved.");
  }

  const segment = result.segments[0];

  if (!segment) {
    throw new Error("Resolved segment is missing.");
  }

  console.log("");
  console.log("PASS: LIVE SAIKYO JOURNEY");

  console.log(
    `${segment.segment.fromStationNameKo} ${segment.train.departureTime} -> ${segment.segment.toStationNameKo} ${segment.train.arrivalTime}`,
  );

  console.log("Train:", segment.train.candidate.trainNumber);
};

void run();
