import type {
  JourneySegment,
} from "./journeyTypes";

import type {
  TrainCandidate,
} from "./trainResolverTypes";

import {
  fetchJrEastTrainCandidates,
} from "./fetchJrEastTrainCandidates";

/*
 * =========================================================
 * Live Candidate Registry
 * =========================================================
 *
 * JourneySegment를 보고 어떤 Live Candidate Provider를
 * 사용할지 결정한다.
 *
 * resolveLiveJourney()는 철도회사별 구현을 알 필요 없이
 * 이 Registry를 통해 TrainCandidate[]만 전달받는다.
 *
 * 현재 지원:
 * - JR East Yamanote
 *
 * 이후:
 * - JR East 다른 노선
 * - Tokyo Metro
 * - Toei
 * - Keisei
 * - Keikyu
 * - Tokyu
 * - Seibu
 * 순서로 확장한다.
 */

type FetchLiveCandidatesParams = {
  segment: JourneySegment;
  apiBaseUrl: string;
  directionId: string;
};

export const fetchLiveCandidates = async ({
  segment,
  apiBaseUrl,
  directionId,
}: FetchLiveCandidatesParams): Promise<
  TrainCandidate[]
> => {
  /*
   * =======================================================
   * JR East
   * =======================================================
   */

   if (
  segment.lineId === "yamanote" ||
  segment.lineId === "saikyo" ||
  segment.lineId === "chuo-rapid" ||
  segment.lineId === "chuo-sobu" ||
  segment.lineId === "shonan-shinjuku" ||
  segment.lineId === "tokaido" ||
  segment.lineId === "keihin-tohoku" ||
  segment.lineId === "keiyo" ||
  segment.lineId === "yokosuka" ||
  segment.lineId === "sobu" ||
  segment.lineId === "sobu-rapid" ||
  segment.lineId === "narita" ||
  segment.lineId === "narita-airport"
) 
    
    {
    return fetchJrEastTrainCandidates({
      apiBaseUrl,
      lineId: segment.lineId,
      directionId,

      fromNodeId:
        segment.fromNodeId,

      fromStationId:
        segment.fromStationId,

      toNodeId:
        segment.toNodeId,

      toStationId:
        segment.toStationId,
    });
  }

  /*
   * 아직 Live Provider가 연결되지 않은 노선은
   * 후보 없음으로 처리한다.
   */
  return [];
};