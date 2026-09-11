import { useEffect, useMemo, useState } from "react";

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
import { buildJourneySegments } from "../utils/routing/buildJourneySegments";
import { buildRailwayGraph } from "../utils/routing/buildRailwayGraph";
import { calculateRouteTime } from "../utils/routing/calculateRouteTime";
import { findStationRoute } from "../utils/routing/findStationRoute";
import { resolveLiveJourney } from "../utils/routing/resolveLiveJourney";
import { resolveLiveLastJourney } from "../utils/routing/resolveLiveLastJourney";
import type { JourneyResolverResult } from "../utils/routing/resolveJourney";
import type { LastJourneyResolverResult } from "../utils/routing/resolveLastJourney";

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
    journeyMode?: string;
  }>();

  const graph = useMemo(() => {
    return buildRailwayGraph();
  }, []);

  const route = useMemo(() => {
    if (!params.departureNameKo || !params.arrivalNameKo) {
      return null;
    }

    return findStationRoute(
      graph,
      params.departureNameKo,
      params.arrivalNameKo,
    );
  }, [graph, params.departureNameKo, params.arrivalNameKo]);

  const transferCount = useMemo(() => {
    if (!route) {
      return 0;
    }

    return route.filter((step) => step.via === "transfer").length;
  }, [route]);

  const rideCount = useMemo(() => {
    if (!route) {
      return 0;
    }

    return route.filter((step) => step.via === "ride").length;
  }, [route]);

  const departureDate = useMemo(() => {
    if (!params.departureTime) {
      return new Date();
    }

    const parsedDate = new Date(params.departureTime);

    if (Number.isNaN(parsedDate.getTime())) {
      return new Date();
    }

    return parsedDate;
  }, [params.departureTime]);

  const journeyStructure = useMemo(() => {
    if (!route) {
      return null;
    }

    const structure = buildJourneySegments(graph, route);

    console.log("🚃 [v3 JourneyStructure]", JSON.stringify(structure, null, 2));

    return structure;
  }, [graph, route]);

  const [liveJourney, setLiveJourney] = useState<JourneyResolverResult | null>(
    null,
  );

  const [phantomText, setPhantomText] = useState<string | null>(null);
  const [isLoadingPhantom, setIsLoadingPhantom] = useState(false);

  useEffect(() => {
    if (!journeyStructure) {
      setLiveJourney(null);
      return;
    }

    const run = async () => {
      try {
        const currentTime = departureDate.toTimeString().slice(0, 5);

        const result = await resolveLiveJourney({
          journey: journeyStructure,
          currentTime,
          apiBaseUrl: "https://tokyo-railway-api.vercel.app",
        });

        console.log("💎 [CULLINAN LiveJourney]", result);

        setLiveJourney(result);
      } catch (error) {
        console.error("💎 [CULLINAN LiveJourney Error]", error);

        setLiveJourney(null);
      }
    };

    void run();
  }, [journeyStructure, departureDate]);

  const [lastJourney, setLastJourney] =
    useState<LastJourneyResolverResult | null>(null);
  const [isLoadingLastJourney, setIsLoadingLastJourney] = useState(false);

  useEffect(() => {
    if (
      params.journeyMode !== "accommodation" ||
      !journeyStructure
    ) {
      setLastJourney(null);
      setIsLoadingLastJourney(false);
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        setIsLoadingLastJourney(true);

        const result = await resolveLiveLastJourney({
          journey: journeyStructure,
          apiBaseUrl: "https://tokyo-railway-api.vercel.app",
        });

        if (cancelled) {
          return;
        }

        console.log("🌙 [CULLINAN LastJourney]", result);
        setLastJourney(result);
      } catch (error) {
        if (cancelled) {
          return;
        }

        console.error("🌙 [CULLINAN LastJourney Error]", error);
        setLastJourney(null);
      } finally {
        if (!cancelled) {
          setIsLoadingLastJourney(false);
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [journeyStructure, params.journeyMode]);

  const routeTime = useMemo(() => {
    if (!route) {
      return null;
    }

    return calculateRouteTime(route, departureDate);
  }, [route, departureDate]);

  const estimatedMinutes = routeTime?.totalMinutes ?? 0;

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

  const resolvedLiveJourney =
    liveJourney?.status === "resolved" ? liveJourney : null;

  const liveTrain = resolvedLiveJourney?.segments[0]?.train.candidate ?? null;


  useEffect(() => {
    if (!resolvedLiveJourney) {
      setPhantomText(null);
      setIsLoadingPhantom(false);
      return;
    }

    let cancelled = false;

    const run = async () => {
      try {
        setIsLoadingPhantom(true);
        setPhantomText(null);

        const segments = resolvedLiveJourney.segments.map((resolvedSegment) => {
          const { segment, train } = resolvedSegment;
          const candidate = train.candidate;

          const fromNode = graph.nodes.get(segment.fromNodeId);
          const toNode = graph.nodes.get(segment.toNodeId);
          const line = getLine(segment.lineId);

          return {
            fromStation: fromNode?.station.nameKo ?? segment.fromStationId,
            toStation: toNode?.station.nameKo ?? segment.toStationId,
            lineName: line?.nameKo ?? segment.lineId,
            trainNumber: candidate.trainNumber,
            trainType: candidate.trainTypeKo ?? candidate.trainType,
            departureTime: train.departureTime,
            arrivalTime: train.arrivalTime,
          };
        });

        const response = await fetch(
          "https://tokyo-railway-api.vercel.app/api/phantom",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({
              journey: {
                departureStation: params.departureNameKo ?? "-",
                arrivalStation: params.arrivalNameKo ?? "-",
                departureTime: resolvedLiveJourney.departureTime,
                arrivalTime: resolvedLiveJourney.arrivalTime,
                transferCount: resolvedLiveJourney.transferCount,
                segments,
              },
            }),
          },
        );

        const data = (await response.json()) as {
          ok?: boolean;
          text?: string;
          error?: string;
        };

        if (!response.ok || !data.ok || !data.text) {
          throw new Error(data.error ?? "PHANTOM 응답을 가져오지 못했습니다.");
        }

        if (!cancelled) {
          setPhantomText(data.text);
        }
      } catch (error) {
        console.error("👻 [PHANTOM Error]", error);

        if (!cancelled) {
          setPhantomText(null);
        }
      } finally {
        if (!cancelled) {
          setIsLoadingPhantom(false);
        }
      }
    };

    void run();

    return () => {
      cancelled = true;
    };
  }, [
    graph,
    params.arrivalNameKo,
    params.departureNameKo,
    resolvedLiveJourney,
  ]);

  const displayDepartureTime =
    resolvedLiveJourney?.departureTime ?? departureTimeLabel;

  const displayArrivalTime =
    resolvedLiveJourney?.arrivalTime ?? estimatedArrivalTime;

  const displayMinutes = useMemo(() => {
    if (!resolvedLiveJourney) {
      return estimatedMinutes;
    }

    const [departureHour, departureMinute] = resolvedLiveJourney.departureTime
      .split(":")
      .map(Number);

    const [arrivalHour, arrivalMinute] = resolvedLiveJourney.arrivalTime
      .split(":")
      .map(Number);

    const departureTotal = departureHour * 60 + departureMinute;
    const arrivalTotal = arrivalHour * 60 + arrivalMinute;

    let durationMinutes = arrivalTotal - departureTotal;

    if (durationMinutes < 0) {
      durationMinutes += 24 * 60;
    }

    return durationMinutes;
  }, [resolvedLiveJourney, estimatedMinutes]);

  const resolvedLastJourney =
    lastJourney?.status === "resolved" ? lastJourney : null;

  const getLine = (lineId: string) => {
    return Object.values(railwayRegistry).find((line) => line.id === lineId);
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
            <ArrowLeft size={20} color={colors.text} strokeWidth={2} />
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

            <View style={[styles.summaryStation, styles.summaryStationRight]}>
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
                    약 {displayMinutes}분
                  </Text>
                </View>

                <View
                  style={[styles.timeSummaryItem, styles.timeSummaryItemRight]}
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
                    {displayArrivalTime}
                  </Text>
                </View>
              </View>
              {liveTrain && (
                <Text
                  style={[
                    styles.metaText,
                    {
                      color: colors.textSecondary,
                      marginTop: 12,
                    },
                  ]}
                >
                  실제 열차 {liveTrain.trainNumber ?? "-"} ·{" "}
                  {liveTrain.trainTypeKo ?? liveTrain.trainType}
                  {liveTrain.trainTypeJa ? ` · ${liveTrain.trainTypeJa}` : ""}
                </Text>
              )}
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
                    출발 {displayDepartureTime}
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

        {params.journeyMode === "accommodation" && route && (
          <View
            style={[
              styles.lastJourneyCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.lastJourneyHeader}>
              <Clock3 size={18} color="#A78BFA" strokeWidth={2.2} />

              <Text
                style={[
                  styles.lastJourneyEyebrow,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                숙소 막차 안내
              </Text>
            </View>

            {isLoadingLastJourney ? (
              <Text
                style={[
                  styles.lastJourneyDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                숙소까지 돌아갈 수 있는 마지막 열차를 확인하고 있어요.
              </Text>
            ) : resolvedLastJourney ? (
              <>
                <Text
                  style={[
                    styles.lastJourneyTitle,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  {resolvedLastJourney.departureTime}까지 출발하세요
                </Text>

                <Text
                  style={[
                    styles.lastJourneyDescription,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  {resolvedLastJourney.departureTime} 출발 ·{" "}
                  {resolvedLastJourney.arrivalTime} 도착 · 환승{" "}
                  {resolvedLastJourney.transferCount}회
                </Text>
              </>
            ) : (
              <>
                <Text
                  style={[
                    styles.lastJourneyTitle,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  막차를 확정할 수 없어요
                </Text>

                <Text
                  style={[
                    styles.lastJourneyDescription,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  현재 제공되는 실제 시간표만으로 숙소까지의 마지막 열차를
                  확정하지 못했습니다.
                </Text>
              </>
            )}
          </View>
        )}

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
              {resolvedLiveJourney
                ? "실제 시간표를 기준으로 안내합니다."
                : "예상 시간은 정거장당 평균 2분, 환승 1회당 평균 3분을 기준으로 계산합니다."}
            </Text>

            {(isLoadingPhantom || phantomText) && (
              <View
                style={[
                  styles.phantomCard,
                  {
                    backgroundColor: colors.surface,
                    borderColor: colors.border,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.phantomEyebrow,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  PHANTOM AI 👻
                </Text>

                <Text
                  style={[
                    styles.phantomTitle,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  여행 안내
                </Text>

                <Text
                  style={[
                    styles.phantomDescription,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  {isLoadingPhantom
                    ? "CULLINAN의 실제 열차 결과를 바탕으로 안내를 만들고 있어요."
                    : phantomText}
                </Text>
              </View>
            )}

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
                              borderColor: line?.color ?? colors.textMuted,
                              backgroundColor:
                                isStart || isTransfer
                                  ? (line?.color ?? colors.text)
                                  : colors.background,
                            },
                          ]}
                        />

                        {index < route.length - 1 && (
                          <View
                            style={[
                              styles.timelineLine,
                              {
                                backgroundColor: line?.color ?? colors.border,
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
                                  borderColor: line?.color ?? colors.border,
                                },
                              ]}
                            >
                              <Text
                                style={[
                                  styles.stationCodeText,
                                  {
                                    color: line?.color ?? colors.text,
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
                              color={line?.color ?? colors.textSecondary}
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
                              color={line?.color ?? colors.textSecondary}
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

  phantomCard: {
    marginTop: 16,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 17,
  },

  phantomEyebrow: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "800",
    letterSpacing: 0.8,
  },

  phantomTitle: {
    marginTop: 4,
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
  },

  phantomDescription: {
    marginTop: 9,
    width: "100%",
    flexShrink: 1,
    fontSize: 12,
    lineHeight: 20,
    fontWeight: "600",
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

  lastJourneyCard: {
    marginTop: 14,
    borderRadius: 20,
    borderWidth: 1,
    paddingHorizontal: 18,
    paddingVertical: 17,
  },

  lastJourneyHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  lastJourneyEyebrow: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "800",
  },

  lastJourneyTitle: {
    marginTop: 12,
    fontSize: 21,
    lineHeight: 28,
    fontWeight: "900",
  },

  lastJourneyDescription: {
    marginTop: 6,
    fontSize: 11,
    lineHeight: 17,
    fontWeight: "600",
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
