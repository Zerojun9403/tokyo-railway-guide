import type { JourneySegment } from "./journeyTypes";
import { resolveBestTrain } from "./resolveBestTrain";
import type {
  TrainCandidate,
  TrainResolverResult,
} from "./trainResolverTypes";

/*
 * =========================================================
 * Journey Segment Resolver
 * =========================================================
 *
 * 기존 길찾기에서 만들어진 JourneySegment 하나와
 * 실제 열차 후보 TrainCandidate[]를 연결한다.
 *
 * 흐름:
 *
 * JourneySegment
 *      ↓
 * 해당 Segment와 일치하는 열차 후보 필터링
 *      ↓
 * resolveBestTrain()
 *      ↓
 * 가장 빨리 목적지에 도착하는 열차 선택
 */

/*
 * =========================================================
 * TrainCandidate가 JourneySegment와 일치하는지 확인
 * =========================================================
 *
 * 반드시 아래 조건이 모두 같아야 한다.
 *
 * 1. 노선
 * 2. 출발 Node
 * 3. 도착 Node
 * 4. 출발 Station ID
 * 5. 도착 Station ID
 *
 * 현재 Mock 단계에서는 엄격하게 비교한다.
 *
 * 나중에 실제 API를 연결할 때는
 * API의 station ID / railway ID 형식에 맞춰
 * Adapter 계층에서 변환하도록 한다.
 */
const matchesJourneySegment = (
  segment: JourneySegment,
  candidate: TrainCandidate,
): boolean => {
  if (candidate.lineId !== segment.lineId) {
    return false;
  }

  if (
    candidate.fromNodeId !== segment.fromNodeId
  ) {
    return false;
  }

  if (
    candidate.toNodeId !== segment.toNodeId
  ) {
    return false;
  }

  if (
    candidate.fromStationId !==
    segment.fromStationId
  ) {
    return false;
  }

  if (
    candidate.toStationId !==
    segment.toStationId
  ) {
    return false;
  }

  return true;
};

/*
 * =========================================================
 * JourneySegment에 해당하는 열차 후보 추출
 * =========================================================
 */
export const getTrainCandidatesForSegment = (
  segment: JourneySegment,
  candidates: TrainCandidate[],
): TrainCandidate[] => {
  return candidates.filter((candidate) =>
    matchesJourneySegment(
      segment,
      candidate,
    ),
  );
};

/*
 * =========================================================
 * JourneySegment Resolver
 * =========================================================
 *
 * currentTime:
 *
 * 이 Segment에서 실제로 열차를 탈 수 있는
 * 가장 이른 시각.
 *
 * 첫 번째 Segment라면:
 *
 * 현재 시각
 *
 * 환승 이후 Segment라면 나중에:
 *
 * 이전 열차 도착시간
 * + 환승시간
 *
 * 을 전달하게 된다.
 */
export const resolveJourneySegment = (
  segment: JourneySegment,
  candidates: TrainCandidate[],
  currentTime: string,
): TrainResolverResult => {
  /*
   * =====================================================
   * 현재 JourneySegment와 일치하는
   * 열차 후보만 추출
   * =====================================================
   */
  const segmentCandidates =
    getTrainCandidatesForSegment(
      segment,
      candidates,
    );

  console.log("🚃 [JourneySegment Match]", {
    lineId: segment.lineId,
    fromNodeId: segment.fromNodeId,
    toNodeId: segment.toNodeId,
    fromStationId: segment.fromStationId,
    toStationId: segment.toStationId,
    inputCandidateCount: candidates.length,
    matchedCandidateCount: segmentCandidates.length,
  });

  if (
    candidates.length > 0 &&
    segmentCandidates.length === 0
  ) {
    console.warn("🚃 [JourneySegment Match Failed]", {
      expected: {
        lineId: segment.lineId,
        fromNodeId: segment.fromNodeId,
        toNodeId: segment.toNodeId,
        fromStationId: segment.fromStationId,
        toStationId: segment.toStationId,
      },
      sampleCandidates: candidates.slice(0, 5).map((candidate) => ({
        lineId: candidate.lineId,
        fromNodeId: candidate.fromNodeId,
        toNodeId: candidate.toNodeId,
        fromStationId: candidate.fromStationId,
        toStationId: candidate.toStationId,
        trainNumber: candidate.trainNumber,
        departureTime: candidate.departureTime,
        arrivalTime: candidate.arrivalTime,
      })),
    });
  }

  /*
   * =====================================================
   * 일치하는 열차가 하나도 없는 경우
   * =====================================================
   */
  if (segmentCandidates.length === 0) {
    return {
      status: "not-found",
      train: null,
    };
  }

  /*
   * =====================================================
   * 기존 Best Train Resolver에 전달
   * =====================================================
   *
   * 여기서:
   *
   * - 운휴 열차 제외
   * - 목적지 통과 열차 제외
   * - 이미 출발한 열차 제외
   * - 가장 빠른 도착 열차 선택
   *
   * 이 이루어진다.
   */
  return resolveBestTrain(
    segmentCandidates,
    currentTime,
  );
};