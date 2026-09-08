import { getJrEastDirection } from "../utils/routing/getJrEastDirection";
import { resolveLiveJourney } from "../utils/routing/resolveLiveJourney";
import type { JourneyStructure } from "../utils/routing/journeyTypes";

const API_BASE_URL = "http://localhost:3000";

const journey: JourneyStructure = {
  segments: [
    {
      lineId: "chuo-sobu",
      fromNodeId: "chuo-sobu:JB10",
      toNodeId: "chuo-sobu:JB11",
      fromStationId: "JB10",
      toStationId: "JB11",
      fromStationNameKo: "신주쿠",
      toStationNameKo: "요요기",
      rideCount: 1,
    },
  ],
  transfers: [],
};

const run = async () => {
  const directionId = getJrEastDirection("chuo-sobu", "JB10", "JB11");

  console.log("=== CHUO SOBU LIVE JOURNEY TEST ===");
  console.log("Direction:", directionId);

  if (!directionId) {
    throw new Error("Failed to resolve Chuo Sobu direction.");
  }

  const result = await resolveLiveJourney({
    journey,
    currentTime: "04:25",
    apiBaseUrl: API_BASE_URL,
  });

  console.dir(result, { depth: null });

  if (result.status !== "resolved") {
    throw new Error("LIVE CHUO SOBU JOURNEY NOT RESOLVED");
  }

  const train = result.segments[0]?.train.candidate;

  if (!train) {
    throw new Error("Resolved train is missing.");
  }

  console.log("");
  console.log("PASS: LIVE CHUO SOBU JOURNEY");
  console.log(`신주쿠 ${train.departureTime} -> 요요기 ${train.arrivalTime}`);
  console.log(`Train: ${train.trainNumber ?? "-"}`);
};

void run();
