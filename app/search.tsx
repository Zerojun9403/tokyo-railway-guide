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

import { router } from "expo-router";

import { searchStations } from "../data/railwayRegistry";

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

  const handlePressStation = (stationId: string, lineId: string) => {
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
    <SafeAreaView style={styles.safeArea}>
      <View style={styles.screen}>
        {/* =================================================
            Header
        ================================================= */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTextArea}>
            <Text style={styles.headerTitle}>역 검색</Text>

            <Text style={styles.headerDescription}>
              원하는 역을 바로 찾아보세요.
            </Text>
          </View>
        </View>

        {/* =================================================
            Search
        ================================================= */}

        <View style={styles.searchArea}>
          <View style={styles.searchBox}>
            <View style={styles.searchIconArea}>
              <Text style={styles.searchIcon}>⌕</Text>
            </View>

            <TextInput
              style={styles.searchInput}
              value={query}
              onChangeText={setQuery}
              placeholder="역 이름 또는 역번호"
              placeholderTextColor="#A6AFBC"
              autoCapitalize="characters"
              autoCorrect={false}
              returnKeyType="search"
              clearButtonMode="never"
            />

            {hasQuery && (
              <TouchableOpacity
                style={styles.clearButton}
                activeOpacity={0.7}
                onPress={handleClear}
              >
                <Text style={styles.clearButtonText}>×</Text>
              </TouchableOpacity>
            )}
          </View>

          <Text style={styles.searchHint}>예: 신주쿠 · 新宿 · JY17 · E27</Text>
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
              <View style={styles.emptyIcon}>
                <Text style={styles.emptyIconText}>駅</Text>
              </View>

              <Text style={styles.emptyTitle}>역을 검색해 보세요</Text>

              <Text style={styles.emptyDescription}>
                한국어 역명, 일본어 역명이나{"\n"}
                JY17 같은 역번호로 검색할 수 있습니다.
              </Text>

              {/* ===========================================
                  검색 예시
              =========================================== */}

              <View style={styles.exampleArea}>
                <Text style={styles.exampleTitle}>검색 예시</Text>

                <View style={styles.exampleList}>
                  {["신주쿠", "新宿", "JY17", "E27"].map((example) => (
                    <TouchableOpacity
                      key={example}
                      style={styles.exampleChip}
                      activeOpacity={0.7}
                      onPress={() => setQuery(example)}
                    >
                      <Text style={styles.exampleChipText}>{example}</Text>
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
                <Text style={styles.resultTitle}>검색 결과</Text>

                <Text style={styles.resultCount}>{results.length}개</Text>
              </View>

              <View style={styles.resultList}>
                {results.map((result) => {
                  const { station } = result;

                  const operatorName =
                    OPERATOR_NAMES[result.operatorId] ?? result.operatorId;

                  return (
                    <TouchableOpacity
                      key={`${result.lineId}-${station.id}`}
                      style={styles.stationCard}
                      activeOpacity={0.7}
                      onPress={() =>
                        handlePressStation(station.id, result.lineId)
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
                        <Text style={styles.stationNameKo}>
                          {station.nameKo}
                        </Text>

                        <Text style={styles.stationNameJa}>
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

                          <Text style={styles.lineName}>
                            {result.lineNameKo}
                          </Text>

                          <Text style={styles.operatorName}>
                            {operatorName}
                          </Text>
                        </View>
                      </View>

                      {/* ===============================
                              Arrow
                          =============================== */}

                      <Text style={styles.stationArrow}>›</Text>
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
              <View style={styles.noResultIcon}>
                <Text style={styles.noResultIconText}>?</Text>
              </View>

              <Text style={styles.noResultTitle}>검색 결과가 없습니다</Text>

              <Text style={styles.noResultDescription}>
                "{query}"에 해당하는 역을{"\n"}
                찾을 수 없습니다.
              </Text>

              <TouchableOpacity
                style={styles.resetButton}
                activeOpacity={0.7}
                onPress={handleClear}
              >
                <Text style={styles.resetButtonText}>다시 검색</Text>
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

    backgroundColor: "#F5F6F8",
  },

  screen: {
    flex: 1,

    backgroundColor: "#F5F6F8",
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

    backgroundColor: "#FFFFFF",

    alignItems: "center",

    justifyContent: "center",

    marginRight: 13,
  },

  backArrow: {
    marginTop: -3,

    fontSize: 31,

    lineHeight: 34,

    color: "#17191D",
  },

  headerTextArea: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 24,

    lineHeight: 30,

    fontWeight: "900",

    color: "#17191D",
  },

  headerDescription: {
    marginTop: 2,

    fontSize: 12,

    lineHeight: 17,

    color: "#8C96A5",
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

    backgroundColor: "#FFFFFF",

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

    color: "#687384",
  },

  searchInput: {
    flex: 1,

    height: "100%",

    paddingVertical: 0,

    fontSize: 16,

    lineHeight: 21,

    fontWeight: "600",

    color: "#17191D",
  },

  clearButton: {
    width: 30,

    height: 30,

    borderRadius: 15,

    backgroundColor: "#EEF0F3",

    alignItems: "center",

    justifyContent: "center",

    marginLeft: 8,
  },

  clearButtonText: {
    marginTop: -2,

    fontSize: 21,

    lineHeight: 24,

    color: "#747E8C",
  },

  searchHint: {
    marginTop: 9,

    marginLeft: 4,

    fontSize: 11,

    lineHeight: 15,

    color: "#9AA4B3",
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

    paddingBottom: 50,
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

    color: "#17191D",
  },

  resultCount: {
    fontSize: 12,

    lineHeight: 16,

    fontWeight: "700",

    color: "#8C96A5",
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

    backgroundColor: "#FFFFFF",

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

    color: "#17191D",
  },

  stationNameJa: {
    marginTop: 1,

    fontSize: 11,

    lineHeight: 15,

    color: "#929BA8",
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

    color: "#626C79",
  },

  operatorName: {
    marginLeft: 7,

    fontSize: 10,

    lineHeight: 14,

    color: "#A1A9B4",
  },

  stationArrow: {
    marginLeft: 10,

    fontSize: 30,

    lineHeight: 32,

    color: "#B0B7C2",
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

    backgroundColor: "#FFFFFF",

    alignItems: "center",

    justifyContent: "center",
  },

  emptyIconText: {
    fontSize: 25,

    fontWeight: "900",

    color: "#687384",
  },

  emptyTitle: {
    marginTop: 20,

    fontSize: 19,

    lineHeight: 25,

    fontWeight: "900",

    color: "#17191D",
  },

  emptyDescription: {
    marginTop: 8,

    fontSize: 13,

    lineHeight: 20,

    color: "#8C96A5",

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

    color: "#9AA4B3",
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

    backgroundColor: "#FFFFFF",
  },

  exampleChipText: {
    fontSize: 12,

    lineHeight: 16,

    fontWeight: "700",

    color: "#596371",
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

    backgroundColor: "#FFFFFF",

    alignItems: "center",

    justifyContent: "center",
  },

  noResultIconText: {
    fontSize: 24,

    lineHeight: 30,

    fontWeight: "900",

    color: "#9AA4B3",
  },

  noResultTitle: {
    marginTop: 18,

    fontSize: 18,

    lineHeight: 23,

    fontWeight: "900",

    color: "#17191D",
  },

  noResultDescription: {
    marginTop: 7,

    fontSize: 13,

    lineHeight: 20,

    color: "#8C96A5",

    textAlign: "center",
  },

  resetButton: {
    marginTop: 20,

    paddingHorizontal: 19,

    paddingVertical: 11,

    borderRadius: 14,

    backgroundColor: "#17191D",
  },

  resetButtonText: {
    fontSize: 12,

    lineHeight: 16,

    fontWeight: "800",

    color: "#FFFFFF",
  },

  bottomSpace: {
    height: 60,
  },
});
