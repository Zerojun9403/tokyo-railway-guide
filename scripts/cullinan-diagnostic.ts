import { getSegmentDirection } from "../utils/routing/getSegmentDirection";
import { getTokyuApiLineId } from "../utils/routing/tokyuTrainCandidateAdapter";
import { getKeikyuApiLineId } from "../utils/routing/keikyuTrainCandidateAdapter";
import { getSeibuApiLineId } from "../utils/routing/seibuTrainCandidateAdapter";

const API_BASE_URL = "https://tokyo-railway-api.vercel.app";

type OperatorId = "tokyu" | "keikyu" | "seibu";

type TestCase = {
  nameKo: string;
  lineId: string;
  operator: OperatorId;
  fromStationId: string;
  toStationId: string;
};

const TEST_CASES: TestCase[] = [
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

const getApiLineId = (test: TestCase): string | null => {
  if (test.operator === "tokyu") return getTokyuApiLineId(test.lineId);
  if (test.operator === "keikyu") return getKeikyuApiLineId(test.lineId);
  return getSeibuApiLineId(test.lineId);
};

const extractEntries = (data: unknown): Record<string, unknown>[] => {
  if (Array.isArray(data)) return data as Record<string, unknown>[];

  if (data && typeof data === "object") {
    const obj = data as {
      timetable?: unknown[];
      trains?: unknown[];
    };

    if (Array.isArray(obj.timetable)) {
      return obj.timetable as Record<string, unknown>[];
    }

    if (Array.isArray(obj.trains)) {
      return obj.trains as Record<string, unknown>[];
    }
  }

  return [];
};

const fetchEntries = async (
  test: TestCase,
  stationId: string,
  directionId: string,
): Promise<Record<string, unknown>[]> => {
  const apiLineId = getApiLineId(test);

  if (!apiLineId) {
    throw new Error("API 노선 ID 변환 실패");
  }

  const params = new URLSearchParams({
    operator: test.operator,
    lineId: apiLineId,
    stationId,
    directionId,
  });

  const url = `${API_BASE_URL}/api/timetable?${params.toString()}`;
  const response = await fetch(url, {
    signal: AbortSignal.timeout(15000),
  });

  const text = await response.text();

  if (!response.ok) {
    throw new Error(`HTTP ${response.status} | ${text.slice(0, 300)}`);
  }

  return extractEntries(JSON.parse(text));
};

const value = (entry: Record<string, unknown>, key: string): string =>
  entry[key] == null ? "" : String(entry[key]);

const COMMON_KEYS = [
  "trainNumber",
  "trainId",
  "id",
  "departureTime",
  "arrivalTime",
  "time",
  "destination",
  "destinationId",
  "destinationStationId",
  "directionId",
  "trainType",
  "lineId",
];

const showEntry = (
  title: string,
  entry: Record<string, unknown> | undefined,
) => {
  console.log(`\n   ${title}`);

  if (!entry) {
    console.log("      (없음)");
    return;
  }

  const keys = Object.keys(entry);
  console.log(`      실제 필드: ${keys.join(", ")}`);

  for (const key of keys) {
    const raw = entry[key];

    if (
      typeof raw === "string" ||
      typeof raw === "number" ||
      typeof raw === "boolean" ||
      raw == null
    ) {
      console.log(`      ${key}: ${String(raw)}`);
    } else {
      console.log(`      ${key}: ${JSON.stringify(raw)}`);
    }
  }
};

const findCommonValues = (
  origin: Record<string, unknown>[],
  destination: Record<string, unknown>[],
) => {
  const originKeys = new Set(origin.flatMap(Object.keys));
  const destinationKeys = new Set(destination.flatMap(Object.keys));

  const sharedKeys = [...originKeys].filter((key) => destinationKeys.has(key));

  const useful: {
    key: string;
    matches: number;
    examples: string[];
  }[] = [];

  for (const key of sharedKeys) {
    const destinationValues = new Set(
      destination.map((entry) => value(entry, key)).filter(Boolean),
    );

    const common = origin
      .map((entry) => value(entry, key))
      .filter((v) => v && destinationValues.has(v));

    const unique = [...new Set(common)];

    if (unique.length > 0) {
      useful.push({
        key,
        matches: unique.length,
        examples: unique.slice(0, 5),
      });
    }
  }

  return useful.sort((a, b) => {
    const aPreferred = COMMON_KEYS.includes(a.key) ? 1 : 0;
    const bPreferred = COMMON_KEYS.includes(b.key) ? 1 : 0;

    if (aPreferred !== bPreferred) return bPreferred - aPreferred;
    return b.matches - a.matches;
  });
};

const diagnose = async (test: TestCase) => {
  console.log("\n" + "=".repeat(78));
  console.log(`${test.nameKo} [${test.lineId}]`);
  console.log("=".repeat(78));

  const directionId = getSegmentDirection(
    test.lineId,
    test.fromStationId,
    test.toStationId,
  );

  if (!directionId) {
    console.log("❌ 방향 판정 실패");
    return;
  }

  const apiLineId = getApiLineId(test);

  console.log(`운영사: ${test.operator}`);
  console.log(`API 노선 ID: ${apiLineId}`);
  console.log(`시험 구간: ${test.fromStationId} → ${test.toStationId}`);
  console.log(`방향: ${directionId}`);

  try {
    const [origin, destination] = await Promise.all([
      fetchEntries(test, test.fromStationId, directionId),
      fetchEntries(test, test.toStationId, directionId),
    ]);

    console.log(`출발역 원본 시간표: ${origin.length}개`);
    console.log(`도착역 원본 시간표: ${destination.length}개`);

    showEntry("출발역 첫 번째 원본 데이터", origin[0]);
    showEntry("도착역 첫 번째 원본 데이터", destination[0]);

    const common = findCommonValues(origin, destination);

    console.log("\n   양쪽 시간표에서 실제로 같은 값이 존재하는 필드");

    if (common.length === 0) {
      console.log("      공통값을 가진 필드가 없습니다.");
    } else {
      for (const item of common.slice(0, 12)) {
        console.log(
          `      ${item.key}: 공통값 ${item.matches}개 | 예: ${item.examples.join(", ")}`,
        );
      }
    }

    const trainNumberMatch = common.find((item) => item.key === "trainNumber");

    if (trainNumberMatch) {
      console.log(`\n   ★ trainNumber 공통값: ${trainNumberMatch.matches}개`);
      console.log(
        "   → 같은 열차를 trainNumber로 연결할 수 있는 데이터입니다.",
      );
    } else {
      console.log("\n   ★ trainNumber 공통값: 0개");
      console.log(
        "   → 현재 어댑터가 trainNumber만 비교한다면 후보가 0개가 될 수 있습니다.",
      );
    }

    const originTrainNumbers = origin
      .map((entry) => value(entry, "trainNumber"))
      .filter(Boolean)
      .slice(0, 10);

    const destinationTrainNumbers = destination
      .map((entry) => value(entry, "trainNumber"))
      .filter(Boolean)
      .slice(0, 10);

    console.log("\n   출발역 trainNumber 앞 10개:");
    console.log(
      `      ${originTrainNumbers.length ? originTrainNumbers.join(", ") : "(필드 없음)"}`,
    );

    console.log("   도착역 trainNumber 앞 10개:");
    console.log(
      `      ${destinationTrainNumbers.length ? destinationTrainNumbers.join(", ") : "(필드 없음)"}`,
    );
  } catch (error) {
    console.log(
      `❌ 요청 실패: ${error instanceof Error ? error.message : String(error)}`,
    );
  }
};

const main = async () => {
  console.log("");
  console.log("CULLINAN 3차 열차 매칭 진단");
  console.log(
    "도큐 5개 + 게이큐 2개 + 세이부 2개의 원본 시간표 구조를 비교합니다.",
  );

  for (const test of TEST_CASES) {
    await diagnose(test);
  }

  console.log("\n" + "=".repeat(78));
  console.log("3차 진단 완료");
  console.log(
    "위 결과에서 각 노선의 첫 번째 원본 데이터와 공통 필드를 확인하면 됩니다.",
  );
  console.log("=".repeat(78));
};

main().catch((error) => {
  console.error("3차 진단기 실행 실패");
  console.error(error);
  process.exitCode = 1;
});
