import { useMemo, useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import { router, useLocalSearchParams  } from "expo-router";

import { searchStations } from "../data/railwayRegistry";
import { useAppTheme } from "../hooks/useAppTheme";

/*
 * =========================================================
 * 철도회사 이름
 * =========================================================
 */

const OPERATOR_NAMES: Record<string, string> = {
  "jr-east": "JR동일본",
  keisei: "게이세이 전철",
  toei: "도에이 지하철",
};

/*
 * =========================================================
 * 검색 화면
 * =========================================================
 */

export default function SearchScreen() {
  const { colors } = useAppTheme();
 const params = useLocalSearchParams<{
  mode?: "departure" | "arrival";

  departureStationId?: string;
  departureLineId?: string;
  departureNameKo?: string;
  departureNameJa?: string;

  arrivalStationId?: string;
  arrivalLineId?: string;
  arrivalNameKo?: string;
  arrivalNameJa?: string;
}>();


  const mode = params.mode;
  const isRouteSelection =
    mode === "departure" || mode === "arrival";



  /*
   * =======================================================
   * 검색어
   * =======================================================
   */

  const [query, setQuery] = useState("");

  /*
   * =======================================================
   * 검색 결과
   * =======================================================
   */

  const results = useMemo(() => {
    return searchStations(query);
  }, [query]);

  /*
   * =======================================================
   * 검색 여부
   * =======================================================
   */

  const hasQuery = query.trim().length > 0;

  /*
   * =======================================================
   * 역 상세 이동
   * =======================================================
   */
const handlePressStation = (
  stationId: string,
  lineId: string,
  nameKo: string,
  nameJa: string,
) => {
  if (mode === "departure") {
    router.replace({
      pathname: "/",
      params: {
        mode: "departure",

        stationId,
        lineId,
        nameKo,
        nameJa,

        arrivalStationId: params.arrivalStationId ?? "",
        arrivalLineId: params.arrivalLineId ?? "",
        arrivalNameKo: params.arrivalNameKo ?? "",
        arrivalNameJa: params.arrivalNameJa ?? "",
      },
    });

    return;
  }

  if (mode === "arrival") {
    router.replace({
      pathname: "/",
      params: {
        mode: "arrival",

        stationId,
        lineId,
        nameKo,
        nameJa,

        departureStationId: params.departureStationId ?? "",
        departureLineId: params.departureLineId ?? "",
        departureNameKo: params.departureNameKo ?? "",
        departureNameJa: params.departureNameJa ?? "",
      },
    });

    return;
  }

  router.push({
    pathname: "/station/[stationId]",

    params: {
      stationId,
      lineId,
    },
  });
};

  /*
   * =======================================================
   * 검색어 삭제
   * =======================================================
   */

  const handleClear = () => {
    setQuery("");
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <View
        style={[
          styles.screen,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        {/* =================================================
            Header
        ================================================= */}

        <View style={styles.header}>
          <TouchableOpacity
            style={[
              styles.backButton,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text
              style={[
                styles.backArrow,
                {
                  color: colors.text,
                },
              ]}
            >
              ‹
            </Text>
          </TouchableOpacity>

          <View style={styles.headerTextArea}>
            <Text
              style={[
                styles.headerTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              {mode === "departure"
                ? "출발역 선택"
                : mode === "arrival"
                  ? "도착역 선택"
                  : "역 검색"}
            </Text>

            <Text
              style={[
                styles.headerDescription,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              {mode === "departure"
                  ? "출발할 역을 검색해서 선택하세요."
                  : mode === "arrival"
                    ? "도착할 역을 검색해서 선택하세요."
                    : "원하는 역을 바로 찾아보세요."}
            </Text>
          </View>
        </View>

        {/* =================================================
            Search
        ================================================= */}

        <View style={styles.searchArea}>
          <View
            style={[
              styles.searchBox,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.searchIconArea}>
              <Text
                style={[
                  styles.searchIcon,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                ⌕
              </Text>
            </View>

            <TextInput
              style={[
                styles.searchInput,
                {
                  color: colors.text,
                },
              ]}
              value={query}
              onChangeText={setQuery}
              placeholder="역 이름 또는 역번호"
              placeholderTextColor={colors.textMuted}
              autoCapitalize="characters"
              autoCorrect={false}
              returnKeyType="search"
              clearButtonMode="never"
              selectionColor={colors.text}
            />

            {hasQuery && (
              <TouchableOpacity
                style={[
                  styles.clearButton,
                  {
                    backgroundColor: colors.surfaceSecondary,
                  },
                ]}
                activeOpacity={0.7}
                onPress={handleClear}
              >
                <Text
                  style={[
                    styles.clearButtonText,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  ×
                </Text>
              </TouchableOpacity>
            )}
          </View>

          <Text
            style={[
              styles.searchHint,
              {
                color: colors.textMuted,
              },
            ]}
          >
            예: 신주쿠 · 新宿 · JY17 · E27
          </Text>
        </View>

        {/* =================================================
            Content
        ================================================= */}

        <ScrollView
          style={styles.resultScroll}
          contentContainerStyle={styles.resultContainer}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          {/* ===============================================
              검색 전
          =============================================== */}

          {!hasQuery && (
            <View style={styles.emptyArea}>
              <View
                style={[
                  styles.emptyIcon,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.emptyIconText,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  駅
                </Text>
              </View>

              <Text
                style={[
                  styles.emptyTitle,
                  {
                    color: colors.text,
                  },
                ]}
              >
                역을 검색해 보세요
              </Text>

              <Text
                style={[
                  styles.emptyDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                한국어 역명, 일본어 역명이나{"\n"}
                JY17 같은 역번호로 검색할 수 있습니다.
              </Text>

              {/* ===========================================
                  검색 예시
              =========================================== */}

              <View style={styles.exampleArea}>
                <Text
                  style={[
                    styles.exampleTitle,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  검색 예시
                </Text>

                <View style={styles.exampleList}>
                  {["신주쿠", "新宿", "JY17", "E27"].map((example) => (
                    <TouchableOpacity
                      key={example}
                      style={[
                        styles.exampleChip,
                        {
                          backgroundColor: colors.surface,
                          borderColor: colors.border,
                        },
                      ]}
                      activeOpacity={0.7}
                      onPress={() => setQuery(example)}
                    >
                      <Text
                        style={[
                          styles.exampleChipText,
                          {
                            color: colors.textSecondary,
                          },
                        ]}
                      >
                        {example}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
            </View>
          )}

          {/* ===============================================
              검색 결과 있음
          =============================================== */}

          {hasQuery && results.length > 0 && (
            <>
              <View style={styles.resultHeader}>
                <Text
                  style={[
                    styles.resultTitle,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  검색 결과
                </Text>

                <Text
                  style={[
                    styles.resultCount,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  {results.length}개
                </Text>
              </View>

              <View style={styles.resultList}>
                {results.map((result) => {
                  const { station } = result;

                  const operatorName =
                    OPERATOR_NAMES[result.operatorId] ?? result.operatorId;

                  return (
                    <TouchableOpacity
                      key={`${result.lineId}-${station.id}`}
                      style={[
                        styles.stationCard,
                        {
                          backgroundColor: colors.surface,
                          borderColor: colors.border,
                        },
                      ]}
                      activeOpacity={0.7}
                      onPress={() =>
                        handlePressStation(
                          station.id,
                          result.lineId,
                          station.nameKo,
                          station.nameJa,
                        )
                      }
                    >
                      {/* ===============================
                          역번호
                      =============================== */}

                      <View
                        style={[
                          styles.stationBadge,
                          {
                            borderColor: result.color,
                          },
                        ]}
                      >
                        <Text
                          style={[
                            styles.stationBadgeText,
                            {
                              color: result.color,
                            },
                          ]}
                        >
                          {station.code}
                        </Text>
                      </View>

                      {/* ===============================
                          역 정보
                      =============================== */}

                      <View style={styles.stationInfo}>
                        <Text
                          style={[
                            styles.stationNameKo,
                            {
                              color: colors.text,
                            },
                          ]}
                        >
                          {station.nameKo}
                        </Text>

                        <Text
                          style={[
                            styles.stationNameJa,
                            {
                              color: colors.textSecondary,
                            },
                          ]}
                        >
                          {station.nameJa}
                        </Text>

                        <View style={styles.lineInfo}>
                          <View
                            style={[
                              styles.lineDot,
                              {
                                backgroundColor: result.color,
                              },
                            ]}
                          />

                          <Text
                            style={[
                              styles.lineName,
                              {
                                color: colors.textSecondary,
                              },
                            ]}
                          >
                            {result.lineNameKo}
                          </Text>

                          <Text
                            style={[
                              styles.operatorName,
                              {
                                color: colors.textMuted,
                              },
                            ]}
                          >
                            {operatorName}
                          </Text>
                        </View>
                      </View>

                      {/* ===============================
                          Arrow
                      =============================== */}

                      <Text
                        style={[
                          styles.stationArrow,
                          {
                            color: colors.textMuted,
                          },
                        ]}
                      >
                        ›
                      </Text>
                    </TouchableOpacity>
                  );
                })}
              </View>
            </>
          )}

          {/* ===============================================
              검색 결과 없음
          =============================================== */}

          {hasQuery && results.length === 0 && (
            <View style={styles.noResultArea}>
              <View
                style={[
                  styles.noResultIcon,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.noResultIconText,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  ?
                </Text>
              </View>

              <Text
                style={[
                  styles.noResultTitle,
                  {
                    color: colors.text,
                  },
                ]}
              >
                검색 결과가 없습니다
              </Text>

              <Text
                style={[
                  styles.noResultDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                "{query}"에 해당하는 역을{"\n"}
                찾을 수 없습니다.
              </Text>

              <TouchableOpacity
                style={[
                  styles.resetButton,
                  {
                    backgroundColor: colors.text,
                  },
                ]}
                activeOpacity={0.7}
                onPress={handleClear}
              >
                <Text
                  style={[
                    styles.resetButtonText,
                    {
                      color: colors.background,
                    },
                  ]}
                >
                  다시 검색
                </Text>
              </TouchableOpacity>
            </View>
          )}

          <View style={styles.bottomSpace} />
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

/*
 * =========================================================
 * Styles
 * =========================================================
 */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  screen: {
    flex: 1,
  },

  /*
   * =====================================================
   * Header
   * =====================================================
   */

  header: {
    paddingHorizontal: 22,

    paddingTop: 22,

    flexDirection: "row",

    alignItems: "center",
  },

  backButton: {
    width: 42,

    height: 42,

    borderRadius: 14,

    borderWidth: 1,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 13,
  },

  backArrow: {
    marginTop: -3,

    fontSize: 31,

    lineHeight: 34,
  },

  headerTextArea: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 24,

    lineHeight: 30,

    fontWeight: "900",
  },

  headerDescription: {
    marginTop: 2,

    fontSize: 12,

    lineHeight: 17,
  },

  /*
   * =====================================================
   * Search
   * =====================================================
   */

  searchArea: {
    paddingHorizontal: 22,

    marginTop: 25,
  },

  searchBox: {
    height: 58,

    borderRadius: 18,

    borderWidth: 1,

    flexDirection: "row",

    alignItems: "center",

    paddingHorizontal: 15,
  },

  searchIconArea: {
    width: 31,

    alignItems: "flex-start",

    justifyContent: "center",
  },

  searchIcon: {
    fontSize: 26,

    lineHeight: 28,
  },

  searchInput: {
    flex: 1,

    height: "100%",

    paddingVertical: 0,

    fontSize: 16,

    lineHeight: 21,

    fontWeight: "600",
  },

  clearButton: {
    width: 30,

    height: 30,

    borderRadius: 15,

    alignItems: "center",

    justifyContent: "center",

    marginLeft: 8,
  },

  clearButtonText: {
    marginTop: -2,

    fontSize: 21,

    lineHeight: 24,
  },

  searchHint: {
    marginTop: 9,

    marginLeft: 4,

    fontSize: 11,

    lineHeight: 15,
  },

  /*
   * =====================================================
   * Results
   * =====================================================
   */

  resultScroll: {
    flex: 1,

    marginTop: 19,
  },

  resultContainer: {
    paddingHorizontal: 22,

    paddingBottom: 110,
  },

  resultHeader: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: 12,
  },

  resultTitle: {
    fontSize: 17,

    lineHeight: 22,

    fontWeight: "900",
  },

  resultCount: {
    fontSize: 12,

    lineHeight: 16,

    fontWeight: "700",
  },

  resultList: {
    gap: 10,
  },

  /*
   * =====================================================
   * Station Card
   * =====================================================
   */

  stationCard: {
    minHeight: 94,

    paddingHorizontal: 15,

    paddingVertical: 14,

    borderRadius: 20,

    borderWidth: 1,

    flexDirection: "row",

    alignItems: "center",
  },

  stationBadge: {
    minWidth: 53,

    height: 53,

    paddingHorizontal: 7,

    borderRadius: 17,

    borderWidth: 3,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 14,
  },

  stationBadgeText: {
    fontSize: 13,

    lineHeight: 17,

    fontWeight: "900",
  },

  stationInfo: {
    flex: 1,

    minWidth: 0,
  },

  stationNameKo: {
    fontSize: 17,

    lineHeight: 21,

    fontWeight: "900",
  },

  stationNameJa: {
    marginTop: 1,

    fontSize: 11,

    lineHeight: 15,
  },

  lineInfo: {
    marginTop: 7,

    flexDirection: "row",

    alignItems: "center",
  },

  lineDot: {
    width: 7,

    height: 7,

    borderRadius: 4,

    marginRight: 6,
  },

  lineName: {
    fontSize: 11,

    lineHeight: 15,

    fontWeight: "700",
  },

  operatorName: {
    marginLeft: 7,

    fontSize: 10,

    lineHeight: 14,
  },

  stationArrow: {
    marginLeft: 10,

    fontSize: 30,

    lineHeight: 32,
  },

  /*
   * =====================================================
   * Empty
   * =====================================================
   */

  emptyArea: {
    paddingTop: 60,

    alignItems: "center",
  },

  emptyIcon: {
    width: 72,

    height: 72,

    borderRadius: 24,

    borderWidth: 1,

    alignItems: "center",

    justifyContent: "center",
  },

  emptyIconText: {
    fontSize: 25,

    fontWeight: "900",
  },

  emptyTitle: {
    marginTop: 20,

    fontSize: 19,

    lineHeight: 25,

    fontWeight: "900",
  },

  emptyDescription: {
    marginTop: 8,

    fontSize: 13,

    lineHeight: 20,

    textAlign: "center",
  },

  /*
   * =====================================================
   * Examples
   * =====================================================
   */

  exampleArea: {
    marginTop: 31,

    alignItems: "center",
  },

  exampleTitle: {
    fontSize: 11,

    lineHeight: 15,

    fontWeight: "700",
  },

  exampleList: {
    marginTop: 11,

    flexDirection: "row",

    flexWrap: "wrap",

    justifyContent: "center",

    gap: 8,
  },

  exampleChip: {
    paddingHorizontal: 14,

    paddingVertical: 9,

    borderRadius: 14,

    borderWidth: 1,
  },

  exampleChipText: {
    fontSize: 12,

    lineHeight: 16,

    fontWeight: "700",
  },

  /*
   * =====================================================
   * No Results
   * =====================================================
   */

  noResultArea: {
    paddingTop: 70,

    alignItems: "center",
  },

  noResultIcon: {
    width: 68,

    height: 68,

    borderRadius: 22,

    borderWidth: 1,

    alignItems: "center",

    justifyContent: "center",
  },

  noResultIconText: {
    fontSize: 24,

    lineHeight: 30,

    fontWeight: "900",
  },

  noResultTitle: {
    marginTop: 18,

    fontSize: 18,

    lineHeight: 23,

    fontWeight: "900",
  },

  noResultDescription: {
    marginTop: 7,

    fontSize: 13,

    lineHeight: 20,

    textAlign: "center",
  },

  resetButton: {
    marginTop: 20,

    paddingHorizontal: 19,

    paddingVertical: 11,

    borderRadius: 14,
  },

  resetButtonText: {
    fontSize: 12,

    lineHeight: 16,

    fontWeight: "800",
  },

  bottomSpace: {
    height: 60,
  },
});
