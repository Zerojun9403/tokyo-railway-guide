import type {
  JourneyStructure,
} from "./journeyTypes";

import type {
  TrainCandidate,
} from "./trainResolverTypes";

import type {
  JourneyResolverResult,
} from "./resolveJourney";

import {
  resolveJourney,
} from "./resolveJourney";

import {
  fetchLiveCandidates,
} from "./liveCandidateRegistry";

/*
 * =========================================================
 * Live Journey Resolver
 * =========================================================
 *
 * 실제 Railway API에서 열차 후보를 가져온 뒤
 * 기존 resolveJourney()에 전달한다.
 *
 * 기존 Resolver는 수정하지 않는다.
 *
 * 현재 v3.5 첫 단계:
 * - JR East
 * - Yamanote
 * - 단일 Segment
 *
 * 이후:
 * - 방향 자동 판별
 * - 여러 Segment
 * - 다른 철도회사 Provider
 * 순서로 확장한다.
 */

type ResolveLiveJourneyParams = {
  journey: JourneyStructure;
  currentTime: string;
  apiBaseUrl: string;

  /*
   * 현재 JourneySegment에는 directionId가 없기 때문에
   * 첫 단계에서는 외부에서 전달한다.
   *
   * 추후 Journey 구조에 방향 정보가 들어가면 제거 가능.
   */
  directionId: string;
};

export const resolveLiveJourney = async ({
  journey,
  currentTime,
  apiBaseUrl,
  directionId,
}: ResolveLiveJourneyParams): Promise<JourneyResolverResult> => {
  /*
   * Segment가 없으면 기존 Resolver에 맡긴다.
   */
  if (journey.segments.length === 0) {
    return resolveJourney(
      journey,
      [],
      currentTime,
    );
  }

  const candidates: TrainCandidate[] = [];

  /*
   * =======================================================
   * 각 Journey Segment의 실제 열차 후보 수집
   * =======================================================
   */
for (const segment of journey.segments) {
  const segmentCandidates =
    await fetchLiveCandidates({
      segment,
      apiBaseUrl,
      directionId,
    });

  candidates.push(
    ...segmentCandidates,
  );
}

  /*
   * 실제 API에서 만든 TrainCandidate를
   * 이미 검증된 기존 Journey Resolver에 전달한다.
   */
  return resolveJourney(
    journey,
    candidates,
    currentTime,
  );
};