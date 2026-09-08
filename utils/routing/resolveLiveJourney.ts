import type { JourneyStructure } from "./journeyTypes";

import type { TrainCandidate } from "./trainResolverTypes";

import type { JourneyResolverResult } from "./resolveJourney";

import { resolveJourney } from "./resolveJourney";

import { fetchLiveCandidates } from "./liveCandidateRegistry";

import { getSegmentDirection } from "./getSegmentDirection";

/*
 * =========================================================
 * Live Journey Resolver
 * =========================================================
 *
 * 실제 Railway API에서 각 Journey Segment의 열차 후보를
 * 가져온 뒤 기존 resolveJourney()에 전달한다.
 *
 * 각 Segment는 자신의 lineId / 출발역 / 도착역을 기준으로
 * directionId를 개별 계산한다.
 *
 * 기존 resolveJourney()는 수정하지 않는다.
 */

type ResolveLiveJourneyParams = {
  journey: JourneyStructure;
  currentTime: string;
  apiBaseUrl: string;
};

export const resolveLiveJourney = async ({
  journey,
  currentTime,
  apiBaseUrl,
}: ResolveLiveJourneyParams): Promise<JourneyResolverResult> => {
  /*
   * Segment가 없으면 기존 Resolver에 맡긴다.
   */
  if (journey.segments.length === 0) {
    return resolveJourney(journey, [], currentTime);
  }

  const candidates: TrainCandidate[] = [];

  /*
   * =======================================================
   * 각 Journey Segment의 방향 계산 + 실제 열차 후보 수집
   * =======================================================
   */
  for (const segment of journey.segments) {
    const directionId = getSegmentDirection(
      segment.lineId,
      segment.fromStationId,
      segment.toStationId,
    );

    /*
     * 현재 방향을 계산할 수 없는 Segment는
     * Live 후보를 만들지 않고 기존 Journey Resolver의
     * fallback 처리에 맡긴다.
     */
    if (!directionId) {
      continue;
    }

    const segmentCandidates = await fetchLiveCandidates({
      segment,
      apiBaseUrl,
      directionId,
    });

    candidates.push(...segmentCandidates);
  }

  /*
   * 실제 API에서 만든 TrainCandidate를
   * 이미 검증된 기존 Journey Resolver에 전달한다.
   */
  return resolveJourney(journey, candidates, currentTime);
};
