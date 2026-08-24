import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { router, useLocalSearchParams } from "expo-router";

const API_BASE_URL = "https://keisei-two.vercel.app";

type Direction = {
  code: string;
  name: string;
  japaneseName?: string;
};

type Departure = {
  time: string;
  hour?: number;
  minute?: number;
  trainType: string;
  destination: string;
  firstTrain?: boolean;
  minutesUntilDeparture: number;
};

type Station = {
  code: string;
  name: string;
  japaneseName: string;
};

type TimetableResponse = {
  success: boolean;
  station?: Station;
  availableDirections?: Direction[];
  direction?: Direction;
  upcomingDepartures?: Departure[];
  error?: string;
};

/*
 * 열차 종류 한국어
 */
const trainTypeKorean: Record<string, string> = {
  普通: "보통",
  快速: "쾌속",
  特急: "특급",
  快速特急: "쾌속특급",
  通勤特急: "통근특급",
  アクセス特急: "액세스특급",
  スカイライナー: "스카이라이너",
  モーニングライナー: "모닝라이너",
  イブニングライナー: "이브닝라이너",
};

/*
 * 주요 행선지 한국어
 */
const destinationKorean: Record<string, string> = {
  京成上野: "게이세이우에노",
  日暮里: "닛포리",
  青砥: "아오토",
  京成高砂: "게이세이다카사고",
  京成津田沼: "게이세이쓰다누마",
  千葉中央: "지바추오",
  ちはら台: "치하라다이",
  京成成田: "게이세이나리타",
  成田空港: "나리타공항",
  空港第2ビル: "공항 제2빌딩",
  空港第２ビル: "공항 제2빌딩",
  押上: "오시아게",
  西馬込: "니시마고메",
  羽田空港: "하네다공항",
};

/*
 * ============================================================
 * 화면 표시용 방면 이름
 *
 * API의 긴 방면명은 유지하되,
 * 화면에 표시할 때만 짧게 바꾼다.
 * ============================================================
 */
const getShortDirectionName = (stationId: string, directionName: string) => {
  /*
   * 게이세이우에노
   * 종점이므로 나리타 방향만 표시
   */
  if (stationId === "KS01") {
    return "나리타공항 방면";
  }

  /*
   * 나리타공항
   * 종점이므로 도쿄 방향만 표시
   */
  if (stationId === "KS42") {
    return "게이세이우에노 방면";
  }

  /*
   * 도쿄 방향 판별
   *
   * 오시아게 / 아사쿠사선 / 게이큐 / 하네다공항
   * 직통 열차도 모두 사용자가 이해하기 쉽게
   * "게이세이우에노 방면"으로 표시
   */
  if (
    directionName.includes("게이세이우에노") ||
    directionName.includes("京成上野") ||
    directionName.includes("오시아게") ||
    directionName.includes("押上") ||
    directionName.includes("니시마고메") ||
    directionName.includes("西馬込") ||
    directionName.includes("게이큐") ||
    directionName.includes("京急") ||
    directionName.includes("하네다공항") ||
    directionName.includes("羽田空港")
  ) {
    return "게이세이우에노 방면";
  }

  /*
   * 나머지는 나리타 방향
   *
   * 치하라다이 / 호쿠소선 / 스카이액세스선 등이
   * 포함되어 있어도 화면에는 나리타공항 방면으로 표시
   */
  return "나리타공항 방면";
};

export default function KeiseiStationScreen() {
  const params = useLocalSearchParams();

  const rawStationId = params.stationId;

  const stationId =
    typeof rawStationId === "string"
      ? rawStationId.toUpperCase()
      : Array.isArray(rawStationId)
        ? (rawStationId[0]?.toUpperCase() ?? "")
        : "";

  const [station, setStation] = useState<Station | null>(null);

  const [directions, setDirections] = useState<Direction[]>([]);

  const [selectedDirection, setSelectedDirection] = useState<string | null>(
    null,
  );

  const [departures, setDepartures] = useState<Departure[]>([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /*
   * 시간표 API
   */
  const loadTimetable = async (direction?: string) => {
    if (!stationId) {
      setError("역 코드가 없습니다.");
      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      let url =
        `${API_BASE_URL}/api/keisei/timetable` +
        `?station=${encodeURIComponent(stationId)}`;

      if (direction) {
        url += `&direction=${encodeURIComponent(direction)}`;
      }

      console.log("=================================");
      console.log("🚃 게이세이 시간표 요청");
      console.log(url);
      console.log("=================================");

      const response = await fetch(url);

      console.log("HTTP STATUS:", response.status);

      if (!response.ok) {
        throw new Error(`API 요청 실패: ${response.status}`);
      }

      const data = (await response.json()) as TimetableResponse;

      console.log("게이세이 응답:", data);

      if (!data.success) {
        throw new Error(data.error ?? "시간표를 가져오지 못했습니다.");
      }

      if (data.station) {
        setStation(data.station);
      }

      if (data.availableDirections) {
        setDirections(data.availableDirections);
      }

      if (data.direction) {
        setSelectedDirection(data.direction.code);
      }

      setDepartures(data.upcomingDepartures ?? []);
    } catch (err) {
      console.error("게이세이 API 오류:", err);

      if (err instanceof Error) {
        setError(err.message);
      } else {
        setError("시간표를 불러오지 못했습니다.");
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!stationId) {
      return;
    }

    loadTimetable();
  }, [stationId]);

  /*
   * 방면 변경
   */
  const changeDirection = (direction: string) => {
    if (direction === selectedDirection) {
      return;
    }

    setSelectedDirection(direction);

    loadTimetable(direction);
  };

  /*
   * 열차 종류 한국어
   */
  const getTrainType = (value: string) => {
    return trainTypeKorean[value] ?? value;
  };

  /*
   * 행선지 한국어
   */
  const getDestination = (value: string) => {
    return destinationKorean[value] ?? value;
  };

  /*
   * 열차 색상
   */
  const getTrainColor = (type: string) => {
    if (type.includes("スカイライナー")) {
      return "#0077BE";
    }

    if (type.includes("アクセス")) {
      return "#F97316";
    }

    if (type.includes("特急")) {
      return "#E53935";
    }

    if (type.includes("快速")) {
      return "#00A86B";
    }

    return "#17191C";
  };

  /*
   * 현재 선택된 방면
   */
  const selectedDirectionData = directions.find(
    (item) => item.code === selectedDirection,
  );

  /*
   * 중요:
   * 여기서 API의 긴 이름을 짧은 이름으로 변환
   */
  const selectedDirectionName = getShortDirectionName(
    stationId,
    selectedDirectionData?.name ?? "",
  );

  /*
   * 최초 로딩
   */
  if (loading && !station) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <ActivityIndicator size="large" color="#0077BE" />

          <Text style={styles.loadingText}>
            게이세이 시간표를 불러오는 중...
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  /*
   * 최초 API 오류
   */
  if (error && !station) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.center}>
          <Text style={styles.errorTitle}>시간표를 불러오지 못했습니다</Text>

          <Text style={styles.errorText}>{error}</Text>

          <Pressable style={styles.retryButton} onPress={() => loadTimetable()}>
            <Text style={styles.retryText}>다시 시도</Text>
          </Pressable>

          <Pressable
            style={styles.backErrorButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backErrorText}>게이세이 본선으로 돌아가기</Text>
          </Pressable>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        {/* 뒤로가기 */}

        <Pressable style={styles.backButton} onPress={() => router.back()}>
          <Text style={styles.backArrow}>‹</Text>

          <Text style={styles.backText}>게이세이 본선</Text>
        </Pressable>

        {/* 역 정보 */}

        <View style={styles.stationHeader}>
          <View style={styles.stationIcon}>
            <Text style={styles.stationIconText}>KS</Text>
          </View>

          <View style={styles.stationInfo}>
            <Text style={styles.stationCode}>{station?.code ?? stationId}</Text>

            <Text style={styles.stationName}>{station?.name ?? stationId}</Text>

            <Text style={styles.stationJapanese}>
              {station?.japaneseName ?? ""}
            </Text>
          </View>
        </View>

        {/* =====================================================
            방면 탭
            API의 긴 direction.name을 직접 출력하지 않는다.
        ===================================================== */}

        {directions.length > 0 && (
          <View style={styles.tabs}>
            {directions.map((direction) => {
              const active = selectedDirection === direction.code;

              const displayName = getShortDirectionName(
                stationId,
                direction.name,
              );

              return (
                <Pressable
                  key={direction.code}
                  style={styles.tab}
                  onPress={() => changeDirection(direction.code)}
                >
                  <Text
                    numberOfLines={1}
                    adjustsFontSizeToFit
                    minimumFontScale={0.75}
                    style={[styles.tabText, active && styles.tabTextActive]}
                  >
                    {displayName}
                  </Text>

                  <View
                    style={[styles.tabLine, active && styles.tabLineActive]}
                  />
                </Pressable>
              );
            })}
          </View>
        )}

        {/* =====================================================
            가는방면
        ===================================================== */}

        {directions.length > 0 && (
          <>
            <Text style={styles.smallLabel}>가는방면</Text>

            <View style={styles.directionCard}>
              <Text style={styles.directionTitle}>{selectedDirectionName}</Text>

              <Text style={styles.chevron}>›</Text>
            </View>
          </>
        )}

        {/* 다음 출발 */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>다음 출발</Text>

          {loading && <ActivityIndicator size="small" color="#0077BE" />}
        </View>

        {/* 오류 */}

        {error !== "" && (
          <View style={styles.errorCard}>
            <Text style={styles.errorCardText}>{error}</Text>

            <Pressable
              onPress={() => loadTimetable(selectedDirection ?? undefined)}
            >
              <Text style={styles.errorRetry}>다시 불러오기</Text>
            </Pressable>
          </View>
        )}

        {/* 열차 없음 */}

        {!loading && !error && departures.length === 0 && (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>현재 표시할 열차가 없습니다</Text>

            <Text style={styles.emptyText}>
              현재 시간 이후의 열차가 조회되지 않았습니다.
            </Text>
          </View>
        )}

        {/* 실제 열차 */}

        {departures.map((departure, index) => {
          const trainColor = getTrainColor(departure.trainType);

          return (
            <View key={`${departure.time}-${index}`} style={styles.trainCard}>
              <View style={styles.trainTop}>
                <View>
                  <View style={styles.trainTypeRow}>
                    <Text
                      style={[
                        styles.trainType,
                        {
                          color: trainColor,
                        },
                      ]}
                    >
                      {getTrainType(departure.trainType)}
                    </Text>

                    {departure.firstTrain && (
                      <View style={styles.firstBadge}>
                        <Text style={styles.firstBadgeText}>이 역 출발</Text>
                      </View>
                    )}
                  </View>

                  <Text style={styles.time}>{departure.time}</Text>
                </View>

                <Text style={styles.minutes}>
                  {departure.minutesUntilDeparture <= 0
                    ? "곧 출발"
                    : `${departure.minutesUntilDeparture}분 후`}
                </Text>
              </View>

              {/* 실제 행선지는 정확한 데이터 유지 */}

              <Text style={styles.destination}>
                {getDestination(departure.destination)}
              </Text>

              <Text style={styles.destinationJapanese}>
                {departure.destination}
              </Text>
            </View>
          );
        })}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },

  container: {
    flex: 1,
    backgroundColor: "#F5F6F8",
  },

  content: {
    paddingHorizontal: 24,
    paddingTop: 38,
  },

  center: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 30,
  },

  loadingText: {
    marginTop: 18,
    fontSize: 15,
    color: "#8994A5",
  },

  /*
   * 뒤로가기
   */

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 42,
  },

  backArrow: {
    fontSize: 38,
    lineHeight: 34,
    color: "#17191C",
    marginRight: 4,
  },

  backText: {
    fontSize: 17,
    fontWeight: "500",
    color: "#7C8798",
  },

  /*
   * 역 헤더
   */

  stationHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 42,
  },

  stationIcon: {
    width: 64,
    height: 64,
    borderWidth: 4,
    borderColor: "#0077BE",
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 18,
  },

  stationIconText: {
    fontSize: 22,
    fontWeight: "900",
    color: "#0077BE",
  },

  stationInfo: {
    flex: 1,
  },

  stationCode: {
    fontSize: 15,
    fontWeight: "800",
    color: "#0077BE",
  },

  stationName: {
    marginTop: 2,
    fontSize: 25,
    fontWeight: "800",
    color: "#111318",
    letterSpacing: -0.7,
  },

  stationJapanese: {
    marginTop: 3,
    fontSize: 13,
    color: "#8994A5",
  },

  /*
   * 방면 탭
   */

  tabs: {
    flexDirection: "row",
    marginBottom: 24,
  },

  tab: {
    flex: 1,
    minHeight: 50,
    justifyContent: "flex-end",
    paddingHorizontal: 5,
  },

  tabText: {
    textAlign: "center",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
    color: "#A6AFBD",
  },

  tabTextActive: {
    color: "#0077BE",
  },

  tabLine: {
    height: 3,
    marginTop: 10,
    backgroundColor: "transparent",
  },

  tabLineActive: {
    backgroundColor: "#0077BE",
  },

  /*
   * 가는방면
   */

  smallLabel: {
    fontSize: 14,
    color: "#9AA5B5",
    marginBottom: 12,
  },

  directionCard: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    marginBottom: 34,
  },

  directionTitle: {
    flex: 1,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#17191C",
    letterSpacing: -0.3,
  },

  chevron: {
    marginLeft: 10,
    fontSize: 35,
    color: "#A6B0BF",
  },

  /*
   * 다음 출발
   */

  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 16,
  },

  sectionTitle: {
    fontSize: 27,
    fontWeight: "800",
    color: "#111318",
    letterSpacing: -0.7,
  },

  /*
   * 열차 카드
   */

  trainCard: {
    minHeight: 164,
    backgroundColor: "#FFFFFF",
    borderRadius: 22,
    padding: 20,
    marginBottom: 14,
  },

  trainTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  trainTypeRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  trainType: {
    fontSize: 14,
    fontWeight: "800",
  },

  firstBadge: {
    marginLeft: 8,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 7,
    backgroundColor: "#E8F5EE",
  },

  firstBadgeText: {
    fontSize: 10,
    fontWeight: "800",
    color: "#00A86B",
  },

  time: {
    marginTop: 8,
    fontSize: 39,
    lineHeight: 44,
    fontWeight: "900",
    color: "#050608",
    letterSpacing: -1.3,
  },

  minutes: {
    marginTop: 4,
    fontSize: 17,
    fontWeight: "800",
    color: "#0077BE",
  },

  destination: {
    marginTop: 13,
    fontSize: 17,
    fontWeight: "800",
    color: "#17191C",
  },

  destinationJapanese: {
    marginTop: 4,
    fontSize: 12,
    color: "#8994A5",
  },

  /*
   * 오류
   */

  errorTitle: {
    fontSize: 22,
    fontWeight: "800",
    color: "#17191C",
    textAlign: "center",
  },

  errorText: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 22,
    color: "#8994A5",
    textAlign: "center",
  },

  retryButton: {
    marginTop: 25,
    backgroundColor: "#0077BE",
    paddingHorizontal: 28,
    paddingVertical: 15,
    borderRadius: 16,
  },

  retryText: {
    color: "#FFFFFF",
    fontWeight: "800",
  },

  backErrorButton: {
    marginTop: 20,
  },

  backErrorText: {
    color: "#8994A5",
  },

  errorCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
  },

  errorCardText: {
    fontSize: 14,
    lineHeight: 21,
    color: "#7C8798",
  },

  errorRetry: {
    marginTop: 10,
    fontSize: 14,
    fontWeight: "800",
    color: "#0077BE",
  },

  /*
   * 열차 없음
   */

  emptyCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 20,
    padding: 24,
  },

  emptyTitle: {
    fontSize: 17,
    fontWeight: "700",
    color: "#17191C",
  },

  emptyText: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
    color: "#8994A5",
  },

  bottomSpace: {
    height: 70,
  },
});
