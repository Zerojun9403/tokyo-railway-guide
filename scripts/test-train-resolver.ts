import type {
  JourneySegment,
  JourneyStructure,
} from "../utils/routing/journeyTypes";
import { resolveBestTrain } from "../utils/routing/resolveBestTrain";
import { resolveJourney } from "../utils/routing/resolveJourney";
import { resolveJourneySegment } from "../utils/routing/resolveJourneySegment";
import {
  TRAIN_RESOLVER_MOCK_CURRENT_TIME,
  trainResolverMockCandidates,
  trainResolverMockExpressCancelled,
  trainResolverMockExpressPassesDestination,
} from "../utils/routing/trainResolverMock";
import type {
  TrainCandidate,
  TrainResolverResult,
} from "../utils/routing/trainResolverTypes";

/*
 * =========================================================
 * Train Resolver Test
 * =========================================================
 *
 * 검증 범위:
 *
 * 1. 최적 열차 선택
 * 2. 목적지 통과 열차 제외
 * 3. 운휴 열차 제외
 * 4. JourneySegment와 열차 후보 연결
 * 5. 일치하지 않는 노선 제외
 * 6. 2구간 환승 연결
 * 7. 환승시간 때문에 놓친 열차 제외
 */

/*
 * =========================================================
 * Mock JourneySegment - 단일 구간
 * =========================================================
 */
const mockJourneySegment: JourneySegment = {
  lineId: "mock-line",

  fromNodeId: "mock-line:ST01",
  toNodeId: "mock-line:ST05",

  fromStationId: "ST01",
  toStationId: "ST05",

  fromStationNameKo: "테스트 출발역",
  toStationNameKo: "테스트 도착역",

  rideCount: 4,
};

/*
 * =========================================================
 * 다른 노선의 가짜 열차
 * =========================================================
 */
const wrongLineCandidate: TrainCandidate = {
  id: "wrong-line-super-express",

  lineId: "wrong-line",

  fromNodeId: "wrong-line:ST01",
  fromStationId: "ST01",

  toNodeId: "wrong-line:ST05",
  toStationId: "ST05",

  departureTime: "21:09",
  arrivalTime: "21:20",

  trainType: "express",
  trainTypeKo: "가짜 급행",
  trainTypeJa: "偽急行",

  trainNumber: "WRONG-001",

  destinationKo: "가짜 목적지",
  destinationJa: "偽目的地",

  stopsAtDestination: true,

  status: "normal",
};

/*
 * =========================================================
 * 결과 출력
 * =========================================================
 */
const printResolvedTrain = (
  result: TrainResolverResult,
): void => {
  if (result.status === "not-found") {
    console.log("선택된 열차: 없음");
    return;
  }

  console.log(
    `선택된 열차: ${result.train.candidate.id}`,
  );

  console.log(
    `열차 종류: ${
      result.train.candidate.trainTypeKo ??
      result.train.candidate.trainType
    }`,
  );

  console.log(
    `출발: ${result.train.departureTime}`,
  );

  console.log(
    `도착: ${result.train.arrivalTime}`,
  );
};

/*
 * =========================================================
 * 테스트 카운트
 * =========================================================
 */
let passedCount = 0;
let totalCount = 0;

/*
 * =========================================================
 * Case 1
 *
 * 늦게 출발하지만 더 빨리 도착하는 급행 선택
 * =========================================================
 */
totalCount += 1;

console.log("");
console.log(
  "==================================================",
);
console.log(
  "Case 1 - 늦게 출발하지만 더 빨리 도착하는 급행 선택",
);
console.log(
  "==================================================",
);

const case1Result = resolveBestTrain(
  trainResolverMockCandidates,
  TRAIN_RESOLVER_MOCK_CURRENT_TIME,
);

printResolvedTrain(case1Result);

if (
  case1Result.status === "resolved" &&
  case1Result.train.candidate.id ===
    "mock-express-2113" &&
  case1Result.train.departureTime === "21:13" &&
  case1Result.train.arrivalTime === "21:29"
) {
  passedCount += 1;
  console.log("✅ PASS");
} else {
  console.log("❌ FAIL");
}

/*
 * =========================================================
 * Case 2
 *
 * 급행이 목적지를 통과하면 Local 선택
 * =========================================================
 */
totalCount += 1;

console.log("");
console.log(
  "==================================================",
);
console.log(
  "Case 2 - 급행이 목적지를 통과하면 각역정차 선택",
);
console.log(
  "==================================================",
);

const case2Result = resolveBestTrain(
  trainResolverMockExpressPassesDestination,
  TRAIN_RESOLVER_MOCK_CURRENT_TIME,
);

printResolvedTrain(case2Result);

if (
  case2Result.status === "resolved" &&
  case2Result.train.candidate.id ===
    "mock-local-2110"
) {
  passedCount += 1;
  console.log("✅ PASS");
} else {
  console.log("❌ FAIL");
}

/*
 * =========================================================
 * Case 3
 *
 * 급행이 운휴면 Local 선택
 * =========================================================
 */
totalCount += 1;

console.log("");
console.log(
  "==================================================",
);
console.log(
  "Case 3 - 급행이 운휴면 각역정차 선택",
);
console.log(
  "==================================================",
);

const case3Result = resolveBestTrain(
  trainResolverMockExpressCancelled,
  TRAIN_RESOLVER_MOCK_CURRENT_TIME,
);

printResolvedTrain(case3Result);

if (
  case3Result.status === "resolved" &&
  case3Result.train.candidate.id ===
    "mock-local-2110"
) {
  passedCount += 1;
  console.log("✅ PASS");
} else {
  console.log("❌ FAIL");
}

/*
 * =========================================================
 * Case 4
 *
 * JourneySegment와 일치하는 열차만 선택
 * =========================================================
 */
totalCount += 1;

console.log("");
console.log(
  "==================================================",
);
console.log(
  "Case 4 - JourneySegment와 일치하는 열차만 선택",
);
console.log(
  "==================================================",
);

const case4Result = resolveJourneySegment(
  mockJourneySegment,
  [
    wrongLineCandidate,
    ...trainResolverMockCandidates,
  ],
  TRAIN_RESOLVER_MOCK_CURRENT_TIME,
);

printResolvedTrain(case4Result);

if (
  case4Result.status === "resolved" &&
  case4Result.train.candidate.id ===
    "mock-express-2113"
) {
  passedCount += 1;

  console.log(
    "✅ PASS - 다른 노선 열차가 정상적으로 제외됨",
  );
} else {
  console.log("❌ FAIL");
}

/*
 * =========================================================
 * Case 5
 *
 * Segment와 일치하는 열차가 없는 경우
 * =========================================================
 */
totalCount += 1;

console.log("");
console.log(
  "==================================================",
);
console.log(
  "Case 5 - Segment와 일치하는 열차가 없으면 not-found",
);
console.log(
  "==================================================",
);

const case5Result = resolveJourneySegment(
  mockJourneySegment,
  [wrongLineCandidate],
  TRAIN_RESOLVER_MOCK_CURRENT_TIME,
);

printResolvedTrain(case5Result);

if (case5Result.status === "not-found") {
  passedCount += 1;

  console.log(
    "✅ PASS - 일치하지 않는 열차가 선택되지 않음",
  );
} else {
  console.log("❌ FAIL");
}

/*
 * =========================================================
 * 2구간 환승 테스트용 Journey
 * =========================================================
 *
 * ST01
 *   ↓ mock-line-1
 * ST05
 *   ↓ 환승
 * ST05
 *   ↓ mock-line-2
 * ST09
 *
 * 첫 번째 열차:
 *
 * 21:13 출발
 * 21:29 환승역 도착
 *
 * 환승시간:
 *
 * 3분
 *
 * 따라서 두 번째 열차는
 * 21:32 이후 출발해야 한다.
 */
const transferJourney: JourneyStructure = {
  segments: [
    {
      lineId: "mock-line-1",

      fromNodeId: "mock-line-1:ST01",
      toNodeId: "mock-line-1:ST05",

      fromStationId: "ST01",
      toStationId: "ST05",

      fromStationNameKo: "테스트 출발역",
      toStationNameKo: "테스트 환승역",

      rideCount: 4,
    },

    {
      lineId: "mock-line-2",

      fromNodeId: "mock-line-2:ST05",
      toNodeId: "mock-line-2:ST09",

      fromStationId: "ST05",
      toStationId: "ST09",

      fromStationNameKo: "테스트 환승역",
      toStationNameKo: "테스트 최종역",

      rideCount: 4,
    },
  ],

  transfers: [
    {
      fromNodeId: "mock-line-1:ST05",
      toNodeId: "mock-line-2:ST05",

      stationNameKo: "테스트 환승역",

      fromLineId: "mock-line-1",
      toLineId: "mock-line-2",
    },
  ],
};

/*
 * =========================================================
 * 첫 번째 Segment 열차
 * =========================================================
 *
 * Local:
 * 21:10 → 21:34
 *
 * Express:
 * 21:13 → 21:29
 *
 * Resolver는 Express를 선택해야 한다.
 */
const firstSegmentCandidates: TrainCandidate[] =
  [
    {
      id: "transfer-first-local",

      lineId: "mock-line-1",

      fromNodeId: "mock-line-1:ST01",
      fromStationId: "ST01",

      toNodeId: "mock-line-1:ST05",
      toStationId: "ST05",

      departureTime: "21:10",
      arrivalTime: "21:34",

      trainType: "local",
      trainTypeKo: "각역정차",

      stopsAtDestination: true,
      status: "normal",
    },

    {
      id: "transfer-first-express",

      lineId: "mock-line-1",

      fromNodeId: "mock-line-1:ST01",
      fromStationId: "ST01",

      toNodeId: "mock-line-1:ST05",
      toStationId: "ST05",

      departureTime: "21:13",
      arrivalTime: "21:29",

      trainType: "express",
      trainTypeKo: "급행",

      stopsAtDestination: true,
      status: "normal",
    },
  ];

/*
 * =========================================================
 * 두 번째 Segment 열차
 * =========================================================
 *
 * 첫 열차가 21:29 도착
 * 환승 3분
 *
 * 탑승 가능 시각 = 21:32
 *
 * 21:30 열차:
 * 더 빨리 도착하지만 이미 놓친 열차 → 제외
 *
 * 21:31 열차:
 * 역시 환승시간 부족 → 제외
 *
 * 21:32 열차:
 * 탑승 가능 → 후보
 *
 * 21:35 급행:
 * 늦게 출발하지만 더 빨리 도착 → 최종 선택
 */
const secondSegmentCandidates: TrainCandidate[] =
  [
    {
      id: "transfer-second-too-early-2130",

      lineId: "mock-line-2",

      fromNodeId: "mock-line-2:ST05",
      fromStationId: "ST05",

      toNodeId: "mock-line-2:ST09",
      toStationId: "ST09",

      departureTime: "21:30",
      arrivalTime: "21:43",

      trainType: "rapid",
      trainTypeKo: "쾌속",

      stopsAtDestination: true,
      status: "normal",
    },

    {
      id: "transfer-second-too-early-2131",

      lineId: "mock-line-2",

      fromNodeId: "mock-line-2:ST05",
      fromStationId: "ST05",

      toNodeId: "mock-line-2:ST09",
      toStationId: "ST09",

      departureTime: "21:31",
      arrivalTime: "21:45",

      trainType: "local",
      trainTypeKo: "각역정차",

      stopsAtDestination: true,
      status: "normal",
    },

    {
      id: "transfer-second-local-2132",

      lineId: "mock-line-2",

      fromNodeId: "mock-line-2:ST05",
      fromStationId: "ST05",

      toNodeId: "mock-line-2:ST09",
      toStationId: "ST09",

      departureTime: "21:32",
      arrivalTime: "21:50",

      trainType: "local",
      trainTypeKo: "각역정차",

      stopsAtDestination: true,
      status: "normal",
    },

    {
      id: "transfer-second-express-2135",

      lineId: "mock-line-2",

      fromNodeId: "mock-line-2:ST05",
      fromStationId: "ST05",

      toNodeId: "mock-line-2:ST09",
      toStationId: "ST09",

      departureTime: "21:35",
      arrivalTime: "21:46",

      trainType: "express",
      trainTypeKo: "급행",

      stopsAtDestination: true,
      status: "normal",
    },
  ];

const transferCandidates: TrainCandidate[] = [
  ...firstSegmentCandidates,
  ...secondSegmentCandidates,
];

/*
 * =========================================================
 * Case 6
 *
 * 실제 2구간 환승
 * =========================================================
 */
totalCount += 1;

console.log("");
console.log(
  "==================================================",
);
console.log(
  "Case 6 - 2구간 환승 + 환승시간 적용",
);
console.log(
  "==================================================",
);

const case6Result = resolveJourney(
  transferJourney,
  transferCandidates,
  "21:08",
  3,
);

if (case6Result.status === "resolved") {
  console.log(
    `전체 출발: ${case6Result.departureTime}`,
  );

  console.log(
    `전체 도착: ${case6Result.arrivalTime}`,
  );

  console.log(
    `환승 횟수: ${case6Result.transferCount}`,
  );

  console.log("");

  for (
    let index = 0;
    index < case6Result.segments.length;
    index += 1
  ) {
    const resolvedSegment =
      case6Result.segments[index];

    console.log(
      `Segment ${index + 1}`,
    );

    console.log(
      `탑승 가능 시각: ${resolvedSegment.availableFromTime}`,
    );

    console.log(
      `선택 열차: ${resolvedSegment.train.candidate.id}`,
    );

    console.log(
      `출발: ${resolvedSegment.train.departureTime}`,
    );

    console.log(
      `도착: ${resolvedSegment.train.arrivalTime}`,
    );

    console.log("");
  }

  const firstTrain =
    case6Result.segments[0]?.train
      .candidate.id;

  const secondSegment =
    case6Result.segments[1];

  const secondTrain =
    secondSegment?.train.candidate.id;

  const passed =
    firstTrain ===
      "transfer-first-express" &&
    secondSegment?.availableFromTime ===
      "21:32" &&
    secondTrain ===
      "transfer-second-express-2135" &&
    case6Result.departureTime === "21:13" &&
    case6Result.arrivalTime === "21:46" &&
    case6Result.transferCount === 1;

  if (passed) {
    passedCount += 1;

    console.log(
      "✅ PASS - 환승시간을 적용해 전체 여정 선택 성공",
    );
  } else {
    console.log("❌ FAIL");
  }
} else {
  console.log(
    `❌ FAIL - Segment ${
      case6Result.failedSegmentIndex + 1
    }에서 열차를 찾지 못함`,
  );
}

/*
 * =========================================================
 * 최종 결과
 * =========================================================
 */
console.log("");
console.log(
  "==================================================",
);

console.log(
  `Train Resolver Test: ${passedCount}/${totalCount} PASS`,
);

console.log(
  "==================================================",
);

if (passedCount !== totalCount) {
  throw new Error(
    "Train Resolver 테스트에 실패했습니다.",
  );
}

console.log(
  "🎉 모든 Train Resolver 테스트 통과",
);