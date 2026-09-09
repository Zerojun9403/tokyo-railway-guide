import type { JourneySegment } from "./journeyTypes";

import type { TrainCandidate } from "./trainResolverTypes";

import { fetchJrEastTrainCandidates } from "./fetchJrEastTrainCandidates";

import { fetchTokyoMetroTrainCandidates } from "./fetchTokyoMetroTrainCandidates";

import { fetchToeiTrainCandidates } from "./fetchToeiTrainCandidates";

import { fetchTokyuTrainCandidates } from "./fetchTokyuTrainCandidates";

import { fetchKeikyuTrainCandidates } from "./fetchKeikyuTrainCandidates";

import { fetchSeibuTrainCandidates } from "./fetchSeibuTrainCandidates";

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
 */

type FetchLiveCandidatesParams = {
  segment: JourneySegment;
  apiBaseUrl: string;
  directionId: string;
};

const JR_EAST_LIVE_LINES = new Set([
  "yamanote",
  "saikyo",
  "chuo-rapid",
  "chuo-sobu",
  "chuo-sobu-local",
  "shonan-shinjuku",
  "tokaido",
  "keihin-tohoku",
  "keiyo",
  "yokosuka",
  "sobu",
  "sobu-rapid",
]);

const TOKYO_METRO_LIVE_LINES = new Set([
  "ginza",
  "marunouchi",
  "hibiya",
  "tozai",
  "chiyoda",
  "yurakucho",
  "hanzomon",
  "namboku",
  "fukutoshin",
]);

const TOEI_LIVE_LINES = new Set(["asakusa", "mita", "shinjuku", "oedo"]);

const TOKYU_LIVE_LINES = new Set([
  "tokyu-toyoko",
  "tokyu-meguro",
  "tokyu-den-en-toshi",
  "tokyu-oimachi",
  "tokyu-shin-yokohama",
]);

const KEIKYU_LIVE_LINES = new Set(["keikyu-main", "keikyu-airport"]);

const SEIBU_LIVE_LINES = new Set(["seibu-ikebukuro", "seibu-shinjuku"]);

export const fetchLiveCandidates = async ({
  segment,
  apiBaseUrl,
  directionId,
}: FetchLiveCandidatesParams): Promise<TrainCandidate[]> => {
  /*
   * =======================================================
   * JR East
   * =======================================================
   */

  if (JR_EAST_LIVE_LINES.has(segment.lineId)) {
    return fetchJrEastTrainCandidates({
      apiBaseUrl,
      lineId: segment.lineId,
      directionId,

      fromNodeId: segment.fromNodeId,

      fromStationId: segment.fromStationId,

      toNodeId: segment.toNodeId,

      toStationId: segment.toStationId,
    });
  }

  /*
   * =======================================================
   * Tokyo Metro
   * =======================================================
   */

  if (TOKYO_METRO_LIVE_LINES.has(segment.lineId)) {
    return fetchTokyoMetroTrainCandidates({
      apiBaseUrl,
      lineId: segment.lineId,
      directionId,

      fromNodeId: segment.fromNodeId,

      fromStationId: segment.fromStationId,

      toNodeId: segment.toNodeId,

      toStationId: segment.toStationId,
    });
  }

  /*
   * =======================================================
   * Toei
   * =======================================================
   */

  if (TOEI_LIVE_LINES.has(segment.lineId)) {
    return fetchToeiTrainCandidates({
      apiBaseUrl,
      lineId: segment.lineId,
      directionId,

      fromNodeId: segment.fromNodeId,

      fromStationId: segment.fromStationId,

      toNodeId: segment.toNodeId,

      toStationId: segment.toStationId,
    });
  }

  /*
   * =======================================================
   * Tokyu
   * =======================================================
   */

  if (TOKYU_LIVE_LINES.has(segment.lineId)) {
    return fetchTokyuTrainCandidates({
      apiBaseUrl,
      lineId: segment.lineId,
      directionId,

      fromNodeId: segment.fromNodeId,

      fromStationId: segment.fromStationId,

      toNodeId: segment.toNodeId,

      toStationId: segment.toStationId,
    });
  }

  /*
   * =======================================================
   * Keikyu
   * =======================================================
   */

  if (KEIKYU_LIVE_LINES.has(segment.lineId)) {
    return fetchKeikyuTrainCandidates({
      apiBaseUrl,
      lineId: segment.lineId,
      directionId,

      fromNodeId: segment.fromNodeId,

      fromStationId: segment.fromStationId,

      toNodeId: segment.toNodeId,

      toStationId: segment.toStationId,
    });
  }

  /*
   * =======================================================
   * Seibu
   * =======================================================
   */

  if (SEIBU_LIVE_LINES.has(segment.lineId)) {
    return fetchSeibuTrainCandidates({
      apiBaseUrl,
      lineId: segment.lineId,
      directionId,

      fromNodeId: segment.fromNodeId,

      fromStationId: segment.fromStationId,

      toNodeId: segment.toNodeId,

      toStationId: segment.toStationId,
    });
  }

  /*
   * 아직 Live Provider가 연결되지 않은 노선은
   * 후보 없음으로 처리한다.
   */

  return [];
};
