import type { RailwayNodeId } from "./types";

/*
 * =========================================================
 * 실제 열차 후보
 * =========================================================
 *
 * JourneySegment 하나를 이동할 수 있는
 * 실제 열차 한 대를 표현한다.
 *
 * 현재는 실제 API에 연결하지 않고
 * Mock 데이터로 Resolver 알고리즘을 검증한다.
 */
export type TrainCandidate = {
  id: string;

  lineId: string;

  /*
   * 열차가 출발하는 역
   */
  fromNodeId: RailwayNodeId;
  fromStationId: string;

  /*
   * 우리가 이동하려는 목적지
   */
  toNodeId: RailwayNodeId;
  toStationId: string;

  /*
   * 열차 출발 / 도착 시각
   *
   * 초기 Resolver에서는
   * "HH:mm" 형식을 사용한다.
   *
   * 예:
   * "21:10"
   * "21:34"
   */
  departureTime: string;
  arrivalTime: string;

  /*
   * 열차 종류
   *
   * 예:
   * local
   * rapid
   * express
   * semi-express
   */
  trainType: string;

  trainTypeKo?: string;
  trainTypeJa?: string;

  /*
   * 열차 번호가 존재하는 경우 사용.
   */
  trainNumber?: string;

  /*
   * 실제 열차의 행선지.
   */
  destinationKo?: string;
  destinationJa?: string;

  /*
   * 이 열차가 우리가 가려는 목적지에
   * 실제로 정차하는지 여부.
   *
   * v3에서 매우 중요한 값이다.
   *
   * 급행이 더 빨라도 목적지를 통과한다면
   * Resolver 후보에서 제외해야 한다.
   */
  stopsAtDestination: boolean;

  /*
   * 열차 운행 상태.
   *
   * cancelled 열차는 선택할 수 없다.
   */
  status:
    | "normal"
    | "delayed"
    | "cancelled"
    | "unknown";
};

/*
 * =========================================================
 * 열차 선택 결과
 * =========================================================
 *
 * JourneySegment에 대해 Resolver가
 * 최종적으로 선택한 열차 정보를 담는다.
 */
export type ResolvedTrain = {
  candidate: TrainCandidate;

  departureTime: string;
  arrivalTime: string;

  /*
   * Resolver가 비교할 수 있도록
   * 출발 시각과 도착 시각을
   * 분 단위 숫자로 변환한 값.
   *
   * 예:
   * 21:13 → 1273
   */
  departureMinutes: number;
  arrivalMinutes: number;
};

/*
 * =========================================================
 * Resolver 결과
 * =========================================================
 */
export type TrainResolverResult =
  | {
      status: "resolved";
      train: ResolvedTrain;
    }
  | {
      status: "not-found";
      train: null;
    };