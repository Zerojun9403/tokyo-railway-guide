import { getSegmentDirection } from "../utils/routing/getSegmentDirection";
import { fetchLiveCandidates } from "../utils/routing/liveCandidateRegistry";
import { getTokyuApiLineId } from "../utils/routing/tokyuTrainCandidateAdapter";
import { getKeikyuApiLineId } from "../utils/routing/keikyuTrainCandidateAdapter";
import { getSeibuApiLineId } from "../utils/routing/seibuTrainCandidateAdapter";
import type { JourneySegment } from "../utils/routing/journeyTypes";

const API_BASE_URL = "https://tokyo-railway-api.vercel.app";

type OperatorId =
  | "jr-east"
  | "tokyo-metro"
  | "toei"
  | "tokyu"
  | "keikyu"
  | "seibu";

type TestCase = {
  nameKo: string;
  lineId: string;
  operator: OperatorId;
  fromStationId: string;
  toStationId: string;
};

const TEST_CASES: TestCase[] = [
  {
    nameKo: "야마노테선",
    lineId: "yamanote",
    operator: "jr-east",
    fromStationId: "JY01",
    toStationId: "JY03",
  },
  {
    nameKo: "사이쿄선",
    lineId: "saikyo",
    operator: "jr-east",
    fromStationId: "JA11",
    toStationId: "JA12",
  },
  {
    nameKo: "주오선 쾌속",
    lineId: "chuo-rapid",
    operator: "jr-east",
    fromStationId: "JC04",
    toStationId: "JC05",
  },
  {
    nameKo: "주오·소부선 각역정차(API 별칭)",
    lineId: "chuo-sobu",
    operator: "jr-east",
    fromStationId: "JB10",
    toStationId: "JB19",
  },
  {
    nameKo: "주오·소부선 각역정차",
    lineId: "chuo-sobu-local",
    operator: "jr-east",
    fromStationId: "JB10",
    toStationId: "JB19",
  },
  {
    nameKo: "쇼난신주쿠라인",
    lineId: "shonan-shinjuku",
    operator: "jr-east",
    fromStationId: "JS20",
    toStationId: "JS19",
  },
  {
    nameKo: "도카이도선",
    lineId: "tokaido",
    operator: "jr-east",
    fromStationId: "JT01",
    toStationId: "JT02",
  },
  {
    nameKo: "게이힌도호쿠·네기시선",
    lineId: "keihin-tohoku",
    operator: "jr-east",
    fromStationId: "JK26",
    toStationId: "JK25",
  },
  {
    nameKo: "게이요선",
    lineId: "keiyo",
    operator: "jr-east",
    fromStationId: "JE01",
    toStationId: "JE02",
  },
  {
    nameKo: "요코스카선",
    lineId: "yokosuka",
    operator: "jr-east",
    fromStationId: "JO19",
    toStationId: "JO18",
  },
  {
    nameKo: "소부선",
    lineId: "sobu",
    operator: "jr-east",
    fromStationId: "JO28",
    toStationId: "JO30",
  },
  {
    nameKo: "소부쾌속선",
    lineId: "sobu-rapid",
    operator: "jr-east",
    fromStationId: "JO19",
    toStationId: "JO22",
  },

  {
    nameKo: "긴자선",
    lineId: "ginza",
    operator: "tokyo-metro",
    fromStationId: "G01",
    toStationId: "G03",
  },
  {
    nameKo: "마루노우치선",
    lineId: "marunouchi",
    operator: "tokyo-metro",
    fromStationId: "M01",
    toStationId: "M03",
  },
  {
    nameKo: "히비야선",
    lineId: "hibiya",
    operator: "tokyo-metro",
    fromStationId: "H01",
    toStationId: "H03",
  },
  {
    nameKo: "도자이선",
    lineId: "tozai",
    operator: "tokyo-metro",
    fromStationId: "T01",
    toStationId: "T03",
  },
  {
    nameKo: "치요다선",
    lineId: "chiyoda",
    operator: "tokyo-metro",
    fromStationId: "C01",
    toStationId: "C03",
  },
  {
    nameKo: "유라쿠초선",
    lineId: "yurakucho",
    operator: "tokyo-metro",
    fromStationId: "Y01",
    toStationId: "Y03",
  },
  {
    nameKo: "한조몬선",
    lineId: "hanzomon",
    operator: "tokyo-metro",
    fromStationId: "Z01",
    toStationId: "Z03",
  },
  {
    nameKo: "난보쿠선",
    lineId: "namboku",
    operator: "tokyo-metro",
    fromStationId: "N01",
    toStationId: "N03",
  },
  {
    nameKo: "후쿠토신선",
    lineId: "fukutoshin",
    operator: "tokyo-metro",
    fromStationId: "F01",
    toStationId: "F03",
  },

  {
    nameKo: "도에이 아사쿠사선",
    lineId: "asakusa",
    operator: "toei",
    fromStationId: "A01",
    toStationId: "A03",
  },
  {
    nameKo: "도에이 미타선",
    lineId: "mita",
    operator: "toei",
    fromStationId: "I01",
    toStationId: "I03",
  },
  {
    nameKo: "도에이 신주쿠선",
    lineId: "shinjuku",
    operator: "toei",
    fromStationId: "S01",
    toStationId: "S03",
  },
  {
    nameKo: "오에도선",
    lineId: "oedo",
    operator: "toei",
    fromStationId: "E01",
    toStationId: "E03",
  },

  {
    nameKo: "도큐 도요코선",
    lineId: "tokyu-toyoko",
    operator: "tokyu",
    fromStationId: "TY01",
    toStationId: "TY03",
  },
  {
    nameKo: "도큐 메구로선",
    lineId: "tokyu-meguro",
    operator: "tokyu",
    fromStationId: "MG01",
    toStationId: "MG03",
  },
  {
    nameKo: "도큐 덴엔토시선",
    lineId: "tokyu-den-en-toshi",
    operator: "tokyu",
    fromStationId: "DT01",
    toStationId: "DT03",
  },
  {
    nameKo: "도큐 오이마치선",
    lineId: "tokyu-oimachi",
    operator: "tokyu",
    fromStationId: "OM01",
    toStationId: "OM03",
  },
  {
    nameKo: "도큐 신요코하마선",
    lineId: "tokyu-shin-yokohama",
    operator: "tokyu",
    fromStationId: "SH01",
    toStationId: "SH02",
  },

  {
    nameKo: "게이큐 본선",
    lineId: "keikyu-main",
    operator: "keikyu",
    fromStationId: "KK01",
    toStationId: "KK03",
  },
  {
    nameKo: "게이큐 공항선",
    lineId: "keikyu-airport",
    operator: "keikyu",
    fromStationId: "KK11",
    toStationId: "KK13",
  },

  {
    nameKo: "세이부 이케부쿠로선",
    lineId: "seibu-ikebukuro",
    operator: "seibu",
    fromStationId: "SI01",
    toStationId: "SI02",
  },
  {
    nameKo: "세이부 신주쿠선",
    lineId: "seibu-shinjuku",
    operator: "seibu",
    fromStationId: "SS01",
    toStationId: "SS02",
  },
];

const getApiLineId = (test: TestCase): string => {
  if (test.lineId === "chuo-sobu-local") return "chuo-sobu";
  if (test.operator === "tokyu")
    return getTokyuApiLineId(test.lineId) ?? test.lineId;
  if (test.operator === "keikyu")
    return getKeikyuApiLineId(test.lineId) ?? test.lineId;
  if (test.operator === "seibu")
    return getSeibuApiLineId(test.lineId) ?? test.lineId;
  return test.lineId;
};

const extractTimetable = (
  data: unknown,
): { entries: unknown[]; shape: string } => {
  if (Array.isArray(data)) return { entries: data, shape: "배열" };

  if (data && typeof data === "object") {
    const value = data as { timetable?: unknown[]; trains?: unknown[] };

    if (Array.isArray(value.timetable)) {
      return { entries: value.timetable, shape: "timetable 객체" };
    }

    if (Array.isArray(value.trains)) {
      return { entries: value.trains, shape: "trains 객체" };
    }
  }

  return { entries: [], shape: "알 수 없음" };
};

const fetchDirect = async (
  test: TestCase,
  stationId: string,
  directionId: string,
) => {
  const params = new URLSearchParams({
    operator: test.operator,
    lineId: getApiLineId(test),
    stationId,
    directionId,
  });

  const url = `${API_BASE_URL}/api/timetable?${params.toString()}`;
  const response = await fetch(url, { signal: AbortSignal.timeout(15000) });
  const body = await response.text();

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} | ${url} | ${body.slice(0, 250)}`);
  }

  return extractTimetable(JSON.parse(body));
};

type Result = {
  test: TestCase;
  ok: boolean;
  status: string;
  directionId?: string;
  apiLineId: string;
  originCount?: number;
  destinationCount?: number;
  originShape?: string;
  destinationShape?: string;
  candidateCount?: number;
  sample?: {
    departureTime?: string;
    arrivalTime?: string;
    trainType?: string;
    destinationKo?: string;
  };
  reason?: string;
};

const runOne = async (test: TestCase): Promise<Result> => {
  const apiLineId = getApiLineId(test);

  const directionId = getSegmentDirection(
    test.lineId,
    test.fromStationId,
    test.toStationId,
  );

  if (!directionId) {
    return {
      test,
      ok: false,
      status: "방향 판정 실패",
      apiLineId,
      reason: "getSegmentDirection()이 방향을 반환하지 않았습니다.",
    };
  }

  try {
    const [origin, destination] = await Promise.all([
      fetchDirect(test, test.fromStationId, directionId),
      fetchDirect(test, test.toStationId, directionId),
    ]);

    if (origin.entries.length === 0) {
      return {
        test,
        ok: false,
        status: "출발역 시간표 없음",
        directionId,
        apiLineId,
        originCount: 0,
        destinationCount: destination.entries.length,
        originShape: origin.shape,
        destinationShape: destination.shape,
      };
    }

    if (destination.entries.length === 0) {
      return {
        test,
        ok: false,
        status: "도착역 시간표 없음",
        directionId,
        apiLineId,
        originCount: origin.entries.length,
        destinationCount: 0,
        originShape: origin.shape,
        destinationShape: destination.shape,
      };
    }

    const segment: JourneySegment = {
      lineId: test.lineId,
      fromNodeId: `${test.lineId}:${test.fromStationId}`,
      toNodeId: `${test.lineId}:${test.toStationId}`,
      fromStationId: test.fromStationId,
      toStationId: test.toStationId,
      fromStationNameKo: test.fromStationId,
      toStationNameKo: test.toStationId,
      rideCount: 1,
    };

    const candidates = await fetchLiveCandidates({
      segment,
      apiBaseUrl: API_BASE_URL,
      directionId,
    });

    if (candidates.length === 0) {
      return {
        test,
        ok: false,
        status: "열차 매칭 실패",
        directionId,
        apiLineId,
        originCount: origin.entries.length,
        destinationCount: destination.entries.length,
        originShape: origin.shape,
        destinationShape: destination.shape,
        candidateCount: 0,
        reason: "출발역과 도착역 시간표는 있지만 CULLINAN 후보가 0개입니다.",
      };
    }

    const sample = candidates[0];

    return {
      test,
      ok: true,
      status: "정상",
      directionId,
      apiLineId,
      originCount: origin.entries.length,
      destinationCount: destination.entries.length,
      originShape: origin.shape,
      destinationShape: destination.shape,
      candidateCount: candidates.length,
      sample: {
        departureTime: sample.departureTime,
        arrivalTime: sample.arrivalTime,
        trainType: sample.trainType,
        destinationKo: sample.destinationKo,
      },
    };
  } catch (error) {
    return {
      test,
      ok: false,
      status: "실행 오류",
      directionId,
      apiLineId,
      reason: error instanceof Error ? error.message : String(error),
    };
  }
};

const printResult = (result: Result) => {
  const icon = result.ok ? "✅" : "❌";

  console.log("");
  console.log(`${icon} ${result.test.nameKo} [${result.test.lineId}]`);
  console.log(`   상태: ${result.status}`);
  console.log(`   운영사: ${result.test.operator}`);
  console.log(`   API 노선 ID: ${result.apiLineId}`);
  console.log(
    `   시험 구간: ${result.test.fromStationId} → ${result.test.toStationId}`,
  );

  if (result.directionId) console.log(`   방향: ${result.directionId}`);
  if (result.originCount !== undefined)
    console.log(`   출발역 시간표: ${result.originCount}개`);
  if (result.destinationCount !== undefined)
    console.log(`   도착역 시간표: ${result.destinationCount}개`);

  if (result.originShape || result.destinationShape) {
    console.log(
      `   API 응답 형식: ${result.originShape ?? "-"} / ${result.destinationShape ?? "-"}`,
    );
  }

  if (result.candidateCount !== undefined) {
    console.log(`   CULLINAN 후보: ${result.candidateCount}개`);
  }

  if (result.sample) {
    console.log(
      `   후보 예시: ${result.sample.departureTime ?? "?"} → ${result.sample.arrivalTime ?? "?"}` +
        ` / ${result.sample.trainType ?? "?"}` +
        `${result.sample.destinationKo ? ` / ${result.sample.destinationKo}` : ""}`,
    );
  }

  if (result.reason) console.log(`   원인: ${result.reason}`);
};

const main = async () => {
  console.log("");
  console.log("CULLINAN FINAL ENGINE CHECK");
  console.log("=".repeat(76));
  console.log("34개 Live Candidate 엔진을 최종 확인합니다.");
  console.log(
    "API 시간표 + 방향 판정 + 실제 fetchLiveCandidates 결과를 검사합니다.",
  );
  console.log("=".repeat(76));

  const results: Result[] = [];

  // 외부 API에 과도한 동시 요청을 보내지 않도록 3개씩 실행
  for (let i = 0; i < TEST_CASES.length; i += 3) {
    const batch = TEST_CASES.slice(i, i + 3);
    const batchResults = await Promise.all(batch.map(runOne));
    results.push(...batchResults);
    batchResults.forEach(printResult);
  }

  const passed = results.filter((item) => item.ok);
  const failed = results.filter((item) => !item.ok);

  console.log("");
  console.log("=".repeat(76));
  console.log("CULLINAN FINAL RESULT");
  console.log("=".repeat(76));
  console.log(`전체: ${results.length}`);
  console.log(`정상: ${passed.length}`);
  console.log(`실패: ${failed.length}`);

  if (failed.length === 0) {
    console.log("");
    console.log("🎉 34 / 34 정상");
    console.log("CULLINAN Live Candidate 엔진 기본 검증 통과");
  } else {
    console.log("");
    console.log("실패한 항목:");
    for (const item of failed) {
      console.log(
        `- ${item.test.nameKo} [${item.test.lineId}] : ${item.status}` +
          `${item.reason ? ` | ${item.reason}` : ""}`,
      );
    }
  }

  console.log("=".repeat(76));

  if (failed.length > 0) {
    process.exitCode = 1;
  }
};

main().catch((error) => {
  console.error("최종 진단기 실행 자체가 실패했습니다.");
  console.error(error);
  process.exitCode = 1;
});
