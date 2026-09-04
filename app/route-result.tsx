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
import {
  ArrowLeft,
  ArrowRight,
  CircleDot,
  Clock3,
  Repeat2,
} from "lucide-react-native";

import { railwayRegistry } from "../data/railwayRegistry";
import { useAppTheme } from "../hooks/useAppTheme";
import { buildRailwayGraph } from "../utils/routing/buildRailwayGraph";
import { calculateRouteTime } from "../utils/routing/calculateRouteTime";
import { findStationRoute } from "../utils/routing/findStationRoute";

const formatTime = (date: Date) => {
  return date.toLocaleTimeString("ko-KR", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
};

const RouteResultScreen = () => {
  const { colors } = useAppTheme();

  const params = useLocalSearchParams<{
    departureNameKo?: string;
    departureNameJa?: string;
    arrivalNameKo?: string;
    arrivalNameJa?: string;
    departureTime?: string;
    departureTimeMode?: string;
  }>();

  const graph = useMemo(() => {
    return buildRailwayGraph();
  }, []);

  const route = useMemo(() => {
    if (
      !params.departureNameKo ||
      !params.arrivalNameKo
    ) {
      return null;
    }

    return findStationRoute(
      graph,
      params.departureNameKo,
      params.arrivalNameKo,
    );
  }, [
    graph,
    params.departureNameKo,
    params.arrivalNameKo,
  ]);

  const transferCount = useMemo(() => {
    if (!route) {
      return 0;
    }

    return route.filter(
      (step) => step.via === "transfer",
    ).length;
  }, [route]);

  const rideCount = useMemo(() => {
    if (!route) {
      return 0;
    }

    return route.filter(
      (step) => step.via === "ride",
    ).length;
  }, [route]);

  const departureDate = useMemo(() => {
    if (!params.departureTime) {
      return new Date();
    }

    const parsedDate = new Date(
      params.departureTime,
    );

    if (Number.isNaN(parsedDate.getTime())) {
      return new Date();
    }

    return parsedDate;
  }, [params.departureTime]);

  const routeTime = useMemo(() => {
    if (!route) {
      return null;
    }

    return calculateRouteTime(
      route,
      departureDate,
    );
  }, [route, departureDate]);

  const estimatedMinutes =
    routeTime?.totalMinutes ?? 0;

  const departureTimeLabel = useMemo(() => {
    if (!routeTime) {
      return "-";
    }

    return formatTime(routeTime.departureTime);
  }, [routeTime]);

  const estimatedArrivalTime = useMemo(() => {
    if (!routeTime) {
      return "-";
    }

    return formatTime(routeTime.arrivalTime);
  }, [routeTime]);

  const getLine = (lineId: string) => {
    return Object.values(railwayRegistry).find(
      (line) => line.id === lineId,
    );
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
      <ScrollView
        style={[
          styles.screen,
          {
            backgroundColor: colors.background,
          },
        ]}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

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
            <ArrowLeft
              size={20}
              color={colors.text}
              strokeWidth={2}
            />
          </TouchableOpacity>

          <View style={styles.headerTextArea}>
            <Text
              style={[
                styles.eyebrow,
                {
                  color: colors.textMuted,
                },
              ]}
            >
              ROUTE GUIDE
            </Text>

            <Text
              style={[
                styles.headerTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              경로 안내
            </Text>
          </View>
        </View>

        {/* 출발 → 도착 */}

        <View
          style={[
            styles.summaryCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.summaryRouteRow}>
            <View style={styles.summaryStation}>
              <Text
                style={[
                  styles.summaryLabel,
                  {
                    color: colors.textMuted,
                  },
                ]}
              >
                출발
              </Text>

              <Text
                style={[
                  styles.summaryName,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {params.departureNameKo ?? "-"}
              </Text>

              {!!params.departureNameJa && (
                <Text
                  style={[
                    styles.summaryNameJa,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  {params.departureNameJa}
                </Text>
              )}
            </View>

            <View
              style={[
                styles.summaryArrow,
                {
                  backgroundColor: colors.surfaceSecondary,
                },
              ]}
            >
              <ArrowRight
                size={18}
                color={colors.textSecondary}
                strokeWidth={2}
              />
            </View>

            <View
              style={[
                styles.summaryStation,
                styles.summaryStationRight,
              ]}
            >
              <Text
                style={[
                  styles.summaryLabel,
                  {
                    color: colors.textMuted,
                  },
                ]}
              >
                도착
              </Text>

              <Text
                style={[
                  styles.summaryName,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {params.arrivalNameKo ?? "-"}
              </Text>

              {!!params.arrivalNameJa && (
                <Text
                  style={[
                    styles.summaryNameJa,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  {params.arrivalNameJa}
                </Text>
              )}
            </View>
          </View>

          {route && (
            <>
              <View
                style={[
                  styles.summaryDivider,
                  {
                    backgroundColor: colors.border,
                  },
                ]}
              />

              <View style={styles.timeSummaryRow}>
                <View style={styles.timeSummaryItem}>
                  <Text
                    style={[
                      styles.timeSummaryLabel,
                      {
                        color: colors.textMuted,
                      },
                    ]}
                  >
                    예상 소요시간
                  </Text>

                  <Text
                    style={[
                      styles.timeSummaryValue,
                      {
                        color: colors.text,
                      },
                    ]}
                  >
                    약 {estimatedMinutes}분
                  </Text>
                </View>

                <View
                  style={[
                    styles.timeSummaryItem,
                    styles.timeSummaryItemRight,
                  ]}
                >
                  <Text
                    style={[
                      styles.timeSummaryLabel,
                      {
                        color: colors.textMuted,
                      },
                    ]}
                  >
                    예상 도착
                  </Text>

                  <Text
                    style={[
                      styles.timeSummaryValue,
                      {
                        color: colors.text,
                      },
                    ]}
                  >
                    {estimatedArrivalTime}
                  </Text>
                </View>
              </View>

              <View style={styles.metaRow}>
                <View style={styles.metaItem}>
                  <Clock3
                    size={14}
                    color={colors.textSecondary}
                    strokeWidth={2}
                  />
                  <Text
                    style={[
                      styles.metaText,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    출발 {departureTimeLabel}
                  </Text>
                </View>

                <View
                  style={[
                    styles.metaDivider,
                    {
                      backgroundColor: colors.border,
                    },
                  ]}
                />

                <View style={styles.metaItem}>
                  <Repeat2
                    size={14}
                    color={colors.textSecondary}
                    strokeWidth={2}
                  />
                  <Text
                    style={[
                      styles.metaText,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    환승 {transferCount}회
                  </Text>
                </View>

                <View
                  style={[
                    styles.metaDivider,
                    {
                      backgroundColor: colors.border,
                    },
                  ]}
                />

                <Text
                  style={[
                    styles.metaText,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  {rideCount}정거장
                </Text>
              </View>
            </>
          )}
        </View>

        {/* 결과 없음 */}

        {!route && (
          <View
            style={[
              styles.noRouteCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <Text
              style={[
                styles.noRouteTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              경로를 찾을 수 없습니다
            </Text>

            <Text
              style={[
                styles.noRouteDescription,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              현재 등록된 철도 노선과 환승 정보를 기준으로{"\n"}
              연결 가능한 경로가 없습니다.
            </Text>
          </View>
        )}

        {/* 경로 있음 */}

        {route && (
          <>
            <Text
              style={[
                styles.routeNotice,
                {
                  color: colors.textMuted,
                },
              ]}
            >
              예상 시간은 정거장당 평균 2분, 환승 1회당 평균 3분을
              기준으로 계산합니다.
            </Text>

            {/* 상세 경로 */}

            <View style={styles.routeSection}>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: colors.text,
                  },
                ]}
              >
                상세 경로
              </Text>

              <View style={styles.stepList}>
                {route.map((step, index) => {
                  const node = graph.nodes.get(step.nodeId);

                  if (!node) {
                    return null;
                  }

                  const line = getLine(node.lineId);
                  const isStart = step.via === "start";
                  const isTransfer = step.via === "transfer";

                  return (
                    <View
                      key={`${step.nodeId}-${index}`}
                      style={styles.stepRow}
                    >
                      <View style={styles.timeline}>
                        <View
                          style={[
                            styles.timelineDot,
                            {
                              borderColor:
                                line?.color ?? colors.textMuted,
                              backgroundColor:
                                isStart || isTransfer
                                  ? line?.color ?? colors.text
                                  : colors.background,
                            },
                          ]}
                        />

                        {index < route.length - 1 && (
                          <View
                            style={[
                              styles.timelineLine,
                              {
                                backgroundColor:
                                  line?.color ?? colors.border,
                              },
                            ]}
                          />
                        )}
                      </View>

                      <View
                        style={[
                          styles.stepContent,
                          {
                            borderBottomColor: colors.border,
                          },
                        ]}
                      >
                        <View style={styles.stepTop}>
                          <View style={styles.stationArea}>
                            <Text
                              style={[
                                styles.stationName,
                                {
                                  color: colors.text,
                                },
                              ]}
                            >
                              {node.station.nameKo}
                            </Text>

                            <Text
                              style={[
                                styles.stationNameJa,
                                {
                                  color: colors.textSecondary,
                                },
                              ]}
                            >
                              {node.station.nameJa}
                            </Text>
                          </View>

                          {!!node.station.code && (
                            <View
                              style={[
                                styles.stationCode,
                                {
                                  borderColor:
                                    line?.color ?? colors.border,
                                },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.stationCodeText,
                                  {
                                    color:
                                      line?.color ?? colors.text,
                                  },
                                ]}
                              >
                                {node.station.code}
                              </Text>
                            </View>
                          )}
                        </View>

                        <View style={styles.lineRow}>
                          <View
                            style={[
                              styles.lineDot,
                              {
                                backgroundColor:
                                  line?.color ?? colors.textMuted,
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
                            {line?.nameKo ?? node.lineId}
                          </Text>
                        </View>

                        {isStart && (
                          <View style={styles.actionRow}>
                            <CircleDot
                              size={14}
                              color={
                                line?.color ??
                                colors.textSecondary
                              }
                              strokeWidth={2}
                            />

                            <Text
                              style={[
                                styles.actionText,
                                {
                                  color: colors.textSecondary,
                                },
                              ]}
                            >
                              출발
                            </Text>
                          </View>
                        )}

                        {isTransfer && (
                          <View style={styles.actionRow}>
                            <Repeat2
                              size={15}
                              color={
                                line?.color ??
                                colors.textSecondary
                              }
                              strokeWidth={2}
                            />

                            <Text
                              style={[
                                styles.transferText,
                                {
                                  color: colors.text,
                                },
                              ]}
                            >
                              이 노선으로 환승
                            </Text>
                          </View>
                        )}
                      </View>
                    </View>
                  );
                })}
              </View>
            </View>
          </>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>
    </SafeAreaView>
  );
};

export default RouteResultScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 22,
  },

  header: {
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

  headerTextArea: {
    flex: 1,
  },

  eyebrow: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "800",
    letterSpacing: 1,
  },

  headerTitle: {
    marginTop: 1,
    fontSize: 24,
    lineHeight: 30,
    fontWeight: "900",
  },

  summaryCard: {
    marginTop: 25,
    borderRadius: 22,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 18,
  },

  summaryRouteRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  summaryStation: {
    flex: 1,
  },

  summaryStationRight: {
    alignItems: "flex-end",
  },

  summaryLabel: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "700",
  },

  summaryName: {
    marginTop: 3,
    fontSize: 18,
    lineHeight: 23,
    fontWeight: "900",
  },

  summaryNameJa: {
    marginTop: 1,
    fontSize: 10,
    lineHeight: 14,
  },

  summaryArrow: {
    width: 38,
    height: 38,
    borderRadius: 19,
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 12,
  },

  summaryDivider: {
    height: StyleSheet.hairlineWidth,
    marginTop: 18,
    marginBottom: 16,
  },

  timeSummaryRow: {
    flexDirection: "row",
    alignItems: "flex-end",
  },

  timeSummaryItem: {
    flex: 1,
  },

  timeSummaryItemRight: {
    alignItems: "flex-end",
  },

  timeSummaryLabel: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "700",
  },

  timeSummaryValue: {
    marginTop: 3,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
  },

  metaRow: {
    marginTop: 17,
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 8,
  },

  metaItem: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  metaDivider: {
    width: 1,
    height: 12,
  },

  metaText: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
  },

  routeNotice: {
    marginTop: 11,
    marginHorizontal: 3,
    fontSize: 10,
    lineHeight: 15,
  },

  routeSection: {
    marginTop: 34,
  },

  sectionTitle: {
    fontSize: 19,
    lineHeight: 25,
    fontWeight: "900",
  },

  stepList: {
    marginTop: 14,
  },

  stepRow: {
    flexDirection: "row",
  },

  timeline: {
    width: 30,
    alignItems: "center",
  },

  timelineDot: {
    width: 14,
    height: 14,
    borderRadius: 7,
    borderWidth: 3,
    marginTop: 17,
    zIndex: 2,
  },

  timelineLine: {
    position: "absolute",
    top: 29,
    bottom: -18,
    width: 3,
  },

  stepContent: {
    flex: 1,
    minHeight: 92,
    marginLeft: 7,
    paddingTop: 12,
    paddingBottom: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  stepTop: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  stationArea: {
    flex: 1,
  },

  stationName: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
  },

  stationNameJa: {
    marginTop: 1,
    fontSize: 10,
    lineHeight: 14,
  },

  stationCode: {
    minWidth: 42,
    height: 28,
    paddingHorizontal: 7,
    borderRadius: 9,
    borderWidth: 2,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 10,
  },

  stationCodeText: {
    fontSize: 10,
    lineHeight: 13,
    fontWeight: "900",
  },

  lineRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
  },

  lineDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    marginRight: 7,
  },

  lineName: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
  },

  actionRow: {
    marginTop: 8,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  actionText: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
  },

  transferText: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "900",
  },

  noRouteCard: {
    marginTop: 20,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingVertical: 28,
    alignItems: "center",
  },

  noRouteTitle: {
    fontSize: 17,
    lineHeight: 22,
    fontWeight: "900",
  },

  noRouteDescription: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 19,
    textAlign: "center",
  },

  bottomSpace: {
    height: 70,
  },
});