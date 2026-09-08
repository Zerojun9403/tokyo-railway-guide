import type { TrainCandidate } from "./trainResolverTypes";

/*
 * =========================================================
 * v3 Train Resolver Mock Data
 * =========================================================
 *
 * 실제 API를 연결하기 전에
 * 열차 선택 알고리즘을 검증하기 위한 Mock 데이터.
 *
 * 테스트 조건:
 *
 * 현재 시각: 21:08
 *
 * Local
 * 21:10 출발
 * 21:34 도착
 *
 * Express
 * 21:13 출발
 * 21:29 도착
 *
 * 두 열차 모두 목적지에 정차한다면
 * 먼저 출발하는 Local이 아니라
 * 더 빨리 도착하는 Express를 선택해야 한다.
 */

export const TRAIN_RESOLVER_MOCK_CURRENT_TIME =
  "21:08";

/*
 * =========================================================
 * Case 1
 *
 * 급행도 목적지에 정차하는 경우
 *
 * 기대 결과:
 * 21:13 Express 선택
 * =========================================================
 */
export const trainResolverMockCandidates: TrainCandidate[] =
  [
    {
      id: "mock-local-2110",

      lineId: "mock-line",

      fromNodeId: "mock-line:ST01",
      fromStationId: "ST01",

      toNodeId: "mock-line:ST05",
      toStationId: "ST05",

      departureTime: "21:10",
      arrivalTime: "21:34",

      trainType: "local",
      trainTypeKo: "각역정차",
      trainTypeJa: "各駅停車",

      trainNumber: "LOCAL-001",

      destinationKo: "테스트 종착역",
      destinationJa: "テスト終着駅",

      stopsAtDestination: true,

      status: "normal",
    },

    {
      id: "mock-express-2113",

      lineId: "mock-line",

      fromNodeId: "mock-line:ST01",
      fromStationId: "ST01",

      toNodeId: "mock-line:ST05",
      toStationId: "ST05",

      departureTime: "21:13",
      arrivalTime: "21:29",

      trainType: "express",
      trainTypeKo: "급행",
      trainTypeJa: "急行",

      trainNumber: "EXPRESS-001",

      destinationKo: "테스트 종착역",
      destinationJa: "テスト終着駅",

      stopsAtDestination: true,

      status: "normal",
    },
  ];

/*
 * =========================================================
 * Case 2
 *
 * 급행이 목적지를 통과하는 경우
 *
 * 기대 결과:
 * Express는 후보에서 제외
 * 21:10 Local 선택
 * =========================================================
 */
export const trainResolverMockExpressPassesDestination: TrainCandidate[] =
  [
    {
      id: "mock-local-2110",

      lineId: "mock-line",

      fromNodeId: "mock-line:ST01",
      fromStationId: "ST01",

      toNodeId: "mock-line:ST05",
      toStationId: "ST05",

      departureTime: "21:10",
      arrivalTime: "21:34",

      trainType: "local",
      trainTypeKo: "각역정차",
      trainTypeJa: "各駅停車",

      trainNumber: "LOCAL-001",

      destinationKo: "테스트 종착역",
      destinationJa: "テスト終着駅",

      stopsAtDestination: true,

      status: "normal",
    },

    {
      id: "mock-express-2113",

      lineId: "mock-line",

      fromNodeId: "mock-line:ST01",
      fromStationId: "ST01",

      toNodeId: "mock-line:ST05",
      toStationId: "ST05",

      departureTime: "21:13",
      arrivalTime: "21:29",

      trainType: "express",
      trainTypeKo: "급행",
      trainTypeJa: "急行",

      trainNumber: "EXPRESS-001",

      destinationKo: "테스트 종착역",
      destinationJa: "テスト終着駅",

      /*
       * 급행은 더 빨리 도착하지만
       * 목적지에 정차하지 않는다.
       */
      stopsAtDestination: false,

      status: "normal",
    },
  ];

/*
 * =========================================================
 * Case 3
 *
 * 급행이 운휴된 경우
 *
 * 기대 결과:
 * cancelled Express는 후보에서 제외
 * 21:10 Local 선택
 * =========================================================
 */
export const trainResolverMockExpressCancelled: TrainCandidate[] =
  [
    {
      id: "mock-local-2110",

      lineId: "mock-line",

      fromNodeId: "mock-line:ST01",
      fromStationId: "ST01",

      toNodeId: "mock-line:ST05",
      toStationId: "ST05",

      departureTime: "21:10",
      arrivalTime: "21:34",

      trainType: "local",
      trainTypeKo: "각역정차",
      trainTypeJa: "各駅停車",

      trainNumber: "LOCAL-001",

      destinationKo: "테스트 종착역",
      destinationJa: "テスト終着駅",

      stopsAtDestination: true,

      status: "normal",
    },

    {
      id: "mock-express-2113",

      lineId: "mock-line",

      fromNodeId: "mock-line:ST01",
      fromStationId: "ST01",

      toNodeId: "mock-line:ST05",
      toStationId: "ST05",

      departureTime: "21:13",
      arrivalTime: "21:29",

      trainType: "express",
      trainTypeKo: "급행",
      trainTypeJa: "急行",

      trainNumber: "EXPRESS-001",

      destinationKo: "테스트 종착역",
      destinationJa: "テスト終着駅",

      stopsAtDestination: true,

      status: "cancelled",
    },
  ];