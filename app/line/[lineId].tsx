import { useMemo } from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { getLine } from "../../data/railwayRegistry";

export default function LineScreen() {
  /*
   * ========================================
   * URL lineId
   * ========================================
   *
   * /line/yamanote
   * /line/keisei-main
   * /line/oedo
   */

  const { lineId } = useLocalSearchParams<{
    lineId: string;
  }>();

  /*
   * ========================================
   * Registry에서 노선 검색
   * ========================================
   */

  const line = useMemo(() => {
    return getLine(lineId);
  }, [lineId]);

  /*
   * ========================================
   * 없는 노선
   * ========================================
   */

  if (!line) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundTitle}>노선을 찾을 수 없습니다.</Text>

          <Text style={styles.notFoundDescription}>
            lineId: {String(lineId)}
          </Text>

          <TouchableOpacity
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <Text style={styles.backButtonText}>이전 화면으로</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* =================================
            뒤로가기
        ================================= */}

        <TouchableOpacity
          style={styles.backArea}
          onPress={() => router.back()}
          activeOpacity={0.7}
        >
          <Text style={styles.backArrow}>‹</Text>

          <Text style={styles.backText}>노선 선택</Text>
        </TouchableOpacity>

        {/* =================================
            노선 헤더
        ================================= */}

        <View style={styles.header}>
          <View
            style={[
              styles.lineBadge,

              {
                backgroundColor: line.color,
              },
            ]}
          >
            <Text style={styles.lineBadgeText}>{line.lineCode}</Text>
          </View>

          <View style={styles.headerTextArea}>
            <Text style={styles.lineNameKo}>{line.nameKo}</Text>

            <Text style={styles.lineNameJa}>{line.nameJa}</Text>
          </View>
        </View>

        {/* =================================
            역 개수
        ================================= */}

        <View style={styles.summaryArea}>
          <Text style={styles.summaryText}>총 {line.stations.length}개 역</Text>
        </View>

        {/* =================================
            세로형 노선도
        ================================= */}

        <View style={styles.routeContainer}>
          {line.stations.map((station, index) => {
            const isFirst = index === 0;

            const isLast = index === line.stations.length - 1;

            const hasTransfer = (station.transfers?.length ?? 0) > 0;

            return (
              <TouchableOpacity
                key={station.id}
                style={styles.stationRow}
                activeOpacity={0.65}
                onPress={() =>
                  router.push({
                    pathname: "/station/[stationId]",

                    params: {
                      stationId: station.id,
                      lineId: line.id,
                    },
                  })
                }
              >
                {/* =========================
                      세로 노선
                  ========================= */}

                <View style={styles.routeArea}>
                  {!isFirst && (
                    <View
                      style={[
                        styles.lineTop,

                        {
                          backgroundColor: line.color,
                        },
                      ]}
                    />
                  )}

                  <View
                    style={[
                      styles.stationCircle,

                      {
                        borderColor: line.color,
                      },
                    ]}
                  >
                    <View
                      style={[
                        styles.stationCircleInner,

                        {
                          backgroundColor: line.color,
                        },
                      ]}
                    />
                  </View>

                  {!isLast && (
                    <View
                      style={[
                        styles.lineBottom,

                        {
                          backgroundColor: line.color,
                        },
                      ]}
                    />
                  )}
                </View>

                {/* =========================
                      역 정보
                  ========================= */}

                <View style={styles.stationContent}>
                  <View style={styles.stationMainRow}>
                    <View style={styles.stationTextArea}>
                      <Text
                        style={[
                          styles.stationCode,

                          {
                            color: line.color,
                          },
                        ]}
                      >
                        {station.code}
                      </Text>

                      <Text style={styles.stationNameKo}>{station.nameKo}</Text>

                      <Text style={styles.stationNameJa}>{station.nameJa}</Text>
                    </View>

                    <Text style={styles.chevron}>›</Text>
                  </View>

                  {/* =========================
                        환승
                    ========================= */}

                  {hasTransfer && (
                    <View style={styles.transferArea}>
                      <Text style={styles.transferLabel}>환승</Text>

                      <View style={styles.transferList}>
                        {station.transfers?.map((transfer) => (
                          <View
                            key={transfer.id}
                            style={[
                              styles.transferBadge,

                              {
                                backgroundColor: transfer.color,
                              },
                            ]}
                          >
                            <Text style={styles.transferBadgeText}>
                              {transfer.code}
                            </Text>
                          </View>
                        ))}
                      </View>
                    </View>
                  )}
                </View>
              </TouchableOpacity>
            );
          })}
        </View>

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

  screen: {
    flex: 1,

    backgroundColor: "#F5F6F8",
  },

  container: {
    paddingHorizontal: 24,

    paddingTop: 22,

    paddingBottom: 50,
  },

  /*
   * ========================================
   * 뒤로가기
   * ========================================
   */

  backArea: {
    flexDirection: "row",

    alignItems: "center",

    alignSelf: "flex-start",

    marginBottom: 32,
  },

  backArrow: {
    marginRight: 5,

    fontSize: 34,

    lineHeight: 34,

    color: "#17191D",
  },

  backText: {
    fontSize: 15,

    lineHeight: 20,

    fontWeight: "600",

    color: "#7D8796",
  },

  /*
   * ========================================
   * 노선 헤더
   * ========================================
   */

  header: {
    flexDirection: "row",

    alignItems: "center",
  },

  lineBadge: {
    width: 56,

    height: 56,

    borderRadius: 18,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 15,
  },

  lineBadgeText: {
    fontSize: 17,

    lineHeight: 22,

    fontWeight: "900",

    color: "#FFFFFF",
  },

  headerTextArea: {
    flex: 1,
  },

  lineNameKo: {
    fontSize: 26,

    lineHeight: 32,

    fontWeight: "900",

    color: "#17191D",
  },

  lineNameJa: {
    marginTop: 3,

    fontSize: 13,

    lineHeight: 18,

    color: "#8C96A5",
  },

  /*
   * ========================================
   * 역 개수
   * ========================================
   */

  summaryArea: {
    marginTop: 22,

    marginBottom: 18,
  },

  summaryText: {
    fontSize: 13,

    lineHeight: 18,

    fontWeight: "700",

    color: "#8C96A5",
  },

  /*
   * ========================================
   * 노선도
   * ========================================
   */

  routeContainer: {
    width: "100%",

    borderRadius: 24,

    backgroundColor: "#FFFFFF",

    paddingHorizontal: 18,

    paddingVertical: 10,
  },

  stationRow: {
    minHeight: 92,

    flexDirection: "row",
  },

  /*
   * ========================================
   * 노선 선
   * ========================================
   */

  routeArea: {
    width: 42,

    alignItems: "center",

    position: "relative",
  },

  lineTop: {
    position: "absolute",

    top: 0,

    width: 4,

    height: 34,
  },

  lineBottom: {
    position: "absolute",

    top: 50,

    bottom: 0,

    width: 4,
  },

  stationCircle: {
    position: "absolute",

    top: 31,

    width: 22,

    height: 22,

    borderRadius: 11,

    borderWidth: 3,

    backgroundColor: "#FFFFFF",

    alignItems: "center",

    justifyContent: "center",

    zIndex: 2,
  },

  stationCircleInner: {
    width: 8,

    height: 8,

    borderRadius: 4,
  },

  /*
   * ========================================
   * 역 정보
   * ========================================
   */

  stationContent: {
    flex: 1,

    paddingVertical: 16,

    paddingLeft: 8,

    borderBottomWidth: 1,

    borderBottomColor: "#EEF0F3",
  },

  stationMainRow: {
    flexDirection: "row",

    alignItems: "center",
  },

  stationTextArea: {
    flex: 1,
  },

  stationCode: {
    fontSize: 11,

    lineHeight: 15,

    fontWeight: "900",
  },

  stationNameKo: {
    marginTop: 1,

    fontSize: 17,

    lineHeight: 22,

    fontWeight: "800",

    color: "#17191D",
  },

  stationNameJa: {
    marginTop: 2,

    fontSize: 11,

    lineHeight: 15,

    color: "#8C96A5",
  },

  chevron: {
    marginLeft: 12,

    fontSize: 30,

    lineHeight: 32,

    color: "#B0B7C2",
  },

  /*
   * ========================================
   * 환승
   * ========================================
   */

  transferArea: {
    marginTop: 8,

    flexDirection: "row",

    alignItems: "center",
  },

  transferLabel: {
    marginRight: 7,

    fontSize: 10,

    lineHeight: 14,

    fontWeight: "700",

    color: "#9AA4B3",
  },

  transferList: {
    flexDirection: "row",

    alignItems: "center",

    gap: 5,
  },

  transferBadge: {
    minWidth: 25,

    height: 25,

    paddingHorizontal: 6,

    borderRadius: 8,

    alignItems: "center",

    justifyContent: "center",
  },

  transferBadgeText: {
    fontSize: 9,

    lineHeight: 12,

    fontWeight: "900",

    color: "#FFFFFF",
  },

  /*
   * ========================================
   * 없는 노선
   * ========================================
   */

  notFoundContainer: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 24,
  },

  notFoundTitle: {
    fontSize: 22,

    lineHeight: 28,

    fontWeight: "800",

    color: "#17191D",
  },

  notFoundDescription: {
    marginTop: 8,

    fontSize: 14,

    color: "#8C96A5",
  },

  backButton: {
    marginTop: 24,

    paddingHorizontal: 18,

    paddingVertical: 12,

    borderRadius: 12,

    backgroundColor: "#17191D",
  },

  backButtonText: {
    fontSize: 14,

    fontWeight: "700",

    color: "#FFFFFF",
  },

  bottomSpace: {
    height: 60,
  },
});
