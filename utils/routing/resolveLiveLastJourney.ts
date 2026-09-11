import type { JourneyStructure } from "./journeyTypes";
import type { TrainCandidate } from "./trainResolverTypes";
import {
  resolveLastJourney,
  type LastJourneyResolverResult,
} from "./resolveLastJourney";
import { fetchLiveCandidates } from "./liveCandidateRegistry";
import { getSegmentDirection } from "./getSegmentDirection";

/*
 * =========================================================
 * CULLINAN Live Last Journey Resolver
 * =========================================================
 *
 * 실제 Railway API에서 각 Journey Segment의 열차 후보를
 * 가져온 뒤 기존 resolveLastJourney()에 전달한다.
 *
 * 기존 resolveLastJourney()는 수정하지 않는다.
 */

type ResolveLiveLastJourneyParams = {
  journey: JourneyStructure;
  apiBaseUrl: string;
  transferMinutes?: number;
};

export const resolveLiveLastJourney = async ({
  journey,
  apiBaseUrl,
  transferMinutes,
}: ResolveLiveLastJourneyParams): Promise<LastJourneyResolverResult> => {
  if (journey.segments.length === 0) {
    return resolveLastJourney(journey, [], transferMinutes);
  }

  const candidates: TrainCandidate[] = [];

  for (const [segmentIndex, segment] of journey.segments.entries()) {
    const directionId = getSegmentDirection(
      segment.lineId,
      segment.fromStationId,
      segment.toStationId,
    );

    console.log("🌙 [LiveLastJourney Segment]", {
      segmentIndex,
      lineId: segment.lineId,
      fromStationId: segment.fromStationId,
      toStationId: segment.toStationId,
      directionId,
    });

    if (!directionId) {
      console.warn("🌙 [LiveLastJourney Direction Not Found]", {
        segmentIndex,
        lineId: segment.lineId,
        fromStationId: segment.fromStationId,
        toStationId: segment.toStationId,
      });
      continue;
    }

    try {
      const segmentCandidates = await fetchLiveCandidates({
        segment,
        apiBaseUrl,
        directionId,
      });

      console.log("🌙 [LiveLastJourney Candidates]", {
        segmentIndex,
        lineId: segment.lineId,
        directionId,
        candidateCount: segmentCandidates.length,
        lastCandidates: segmentCandidates.slice(-5).map((candidate) => ({
          trainNumber: candidate.trainNumber,
          departureTime: candidate.departureTime,
          arrivalTime: candidate.arrivalTime,
          destinationKo: candidate.destinationKo,
          stopsAtDestination: candidate.stopsAtDestination,
        })),
      });

      candidates.push(...segmentCandidates);
    } catch (error) {
      console.error("🌙 [LiveLastJourney Candidate Fetch Error]", {
        segmentIndex,
        lineId: segment.lineId,
        directionId,
        error,
      });
      throw error;
    }
  }

  console.log("🌙 [LiveLastJourney Candidate Summary]", {
    segmentCount: journey.segments.length,
    totalCandidateCount: candidates.length,
    candidatesByLine: journey.segments.map((segment, segmentIndex) => ({
      segmentIndex,
      lineId: segment.lineId,
      candidateCount: candidates.filter(
        (candidate) => candidate.lineId === segment.lineId,
      ).length,
    })),
  });

  return resolveLastJourney(journey, candidates, transferMinutes);
};
