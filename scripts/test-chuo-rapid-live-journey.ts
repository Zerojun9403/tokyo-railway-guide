import { getChuoRapidDirection } from "../utils/routing/getChuoRapidDirection";
import { resolveLiveJourney } from "../utils/routing/resolveLiveJourney";
import type { JourneyStructure } from "../utils/routing/journeyTypes";

const API_BASE_URL = "http://localhost:3000";

const journey: JourneyStructure = {
  segments: [
    {
      lineId: "chuo-rapid",
      fromNodeId: "chuo-rapid:JC01",
      toNodeId: "chuo-rapid:JC05",
      fromStationId: "JC01",
      toStationId: "JC05",
      fromStationNameKo: "도쿄",
      toStationNameKo: "신주쿠",
      rideCount: 4,
    },
  ],
  transfers: [],
};

const run = async () => {
  const directionId = getChuoRapidDirection("JC01", "JC05");

  console.log("=== CHUO RAPID LIVE JOURNEY TEST ===");
  console.log("Direction:", directionId);

  if (!directionId) {
    throw new Error("Failed to resolve Chuo Rapid direction.");
  }

  const result = await resolveLiveJourney({
    journey,
    currentTime: "04:30",
    apiBaseUrl: API_BASE_URL,
    directionId,
  });

  console.dir(result, { depth: null });

  if (result.status !== "resolved") {
    throw new Error("LIVE CHUO RAPID JOURNEY NOT RESOLVED");
  }

  const train = result.segments[0]?.train.candidate;

  if (!train) {
    throw new Error("Resolved train is missing.");
  }

  console.log("");
  console.log("PASS: LIVE CHUO RAPID JOURNEY");
  console.log(
    `도쿄 ${train.departureTime} -> 신주쿠 ${train.arrivalTime}`,
  );
  console.log(`Train: ${train.trainNumber ?? "-"}`);
};

void run();