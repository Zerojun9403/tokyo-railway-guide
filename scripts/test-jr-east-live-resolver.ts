import { fetchJrEastTrainCandidates } from "../utils/routing/fetchJrEastTrainCandidates";
import { resolveBestTrain } from "../utils/routing/resolveBestTrain";
import type { RailwayNodeId } from "../utils/routing/types";

const run = async () => {
  console.log("=== JR EAST LIVE RESOLVER TEST ===");

  const candidates = await fetchJrEastTrainCandidates({
    apiBaseUrl: "http://localhost:3000",
    lineId: "yamanote",
    directionId: "OuterLoop",

    fromNodeId: "jr-east:yamanote:JY17" as RailwayNodeId,
    fromStationId: "JY17",

    toNodeId: "jr-east:yamanote:JY13" as RailwayNodeId,
    toStationId: "JY13",
  });

  console.log(`Candidates: ${candidates.length}`);

  console.log(
    candidates.slice(0, 5).map((candidate) => ({
      trainNumber: candidate.trainNumber,
      departureTime: candidate.departureTime,
      arrivalTime: candidate.arrivalTime,
    })),
  );

  const result = resolveBestTrain(
    candidates,
    "04:40",
  );

  console.log("Resolver result:");
  console.log(result);

  if (
    result.status === "resolved" &&
    result.train.candidate.trainNumber === "403G" &&
    result.train.departureTime === "04:44" &&
    result.train.arrivalTime === "04:53"
  ) {
    console.log("");
    console.log("PASS: LIVE JR EAST RESOLVER");
    console.log(
      "403G Shinjuku 04:44 -> Ikebukuro 04:53",
    );
    return;
  }

  throw new Error("LIVE JR EAST RESOLVER TEST FAILED");
};

run().catch((error) => {
  console.error(error);
  process.exit(1);
});