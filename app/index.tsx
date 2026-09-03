import { useEffect, useMemo, useState } from "react";

import {
  Modal,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowDownUp,
  Check,
  ChevronRight,
  Clock3,
  Map,
  MapPin,
  Minus,
  Navigation,
  Plus,
  Search,
  X,
} from "lucide-react-native";

import { useAppTheme } from "../hooks/useAppTheme";

type SelectedStation = {
  stationId: string;
  lineId?: string;
  nameKo?: string;
  nameJa?: string;
};

type DepartureTimeMode = "now" | "scheduled";

const padTime = (value: number) => {
  return value.toString().padStart(2, "0");
};

const HomeScreen = () => {
  const { colors } = useAppTheme();

  const params = useLocalSearchParams<{
    mode?: string;
    stationId?: string;
    lineId?: string;
    nameKo?: string;
    nameJa?: string;

    departureStationId?: string;
    departureLineId?: string;
    departureNameKo?: string;
    departureNameJa?: string;

    arrivalStationId?: string;
    arrivalLineId?: string;
    arrivalNameKo?: string;
    arrivalNameJa?: string;
  }>();

  const [departure, setDeparture] =
    useState<SelectedStation | null>(null);

  const [arrival, setArrival] =
    useState<SelectedStation | null>(null);

  const [departureTimeMode, setDepartureTimeMode] =
    useState<DepartureTimeMode>("now");

  const [scheduledHour, setScheduledHour] =
    useState(() => new Date().getHours());

  const [scheduledMinute, setScheduledMinute] =
    useState(() => new Date().getMinutes());

  const [isTimeModalVisible, setIsTimeModalVisible] =
    useState(false);

  useEffect(() => {
    if (params.departureStationId) {
      setDeparture({
        stationId: params.departureStationId,
        lineId: params.departureLineId,
        nameKo: params.departureNameKo,
        nameJa: params.departureNameJa,
      });
    }

    if (params.arrivalStationId) {
      setArrival({
        stationId: params.arrivalStationId,
        lineId: params.arrivalLineId,
        nameKo: params.arrivalNameKo,
        nameJa: params.arrivalNameJa,
      });
    }

    if (
      params.mode === "departure" &&
      params.stationId
    ) {
      setDeparture({
        stationId: params.stationId,
        lineId: params.lineId,
        nameKo: params.nameKo,
        nameJa: params.nameJa,
      });
    }

    if (
      params.mode === "arrival" &&
      params.stationId
    ) {
      setArrival({
        stationId: params.stationId,
        lineId: params.lineId,
        nameKo: params.nameKo,
        nameJa: params.nameJa,
      });
    }
  }, [
    params.mode,
    params.stationId,
    params.lineId,
    params.nameKo,
    params.nameJa,
    params.departureStationId,
    params.departureLineId,
    params.departureNameKo,
    params.departureNameJa,
    params.arrivalStationId,
    params.arrivalLineId,
    params.arrivalNameKo,
    params.arrivalNameJa,
  ]);

  const handleSelectDeparture = () => {
    router.push({
      pathname: "/search",

      params: {
        mode: "departure",

        arrivalStationId:
          arrival?.stationId ?? "",

        arrivalLineId:
          arrival?.lineId ?? "",

        arrivalNameKo:
          arrival?.nameKo ?? "",

        arrivalNameJa:
          arrival?.nameJa ?? "",
      },
    });
  };

  const handleSelectArrival = () => {
    router.push({
      pathname: "/search",

      params: {
        mode: "arrival",

        departureStationId:
          departure?.stationId ?? "",

        departureLineId:
          departure?.lineId ?? "",

        departureNameKo:
          departure?.nameKo ?? "",

        departureNameJa:
          departure?.nameJa ?? "",
      },
    });
  };

  const handleSwapStations = () => {
    const previousDeparture = departure;

    setDeparture(arrival);
    setArrival(previousDeparture);
  };

  const canSearch =
    !!departure?.nameKo &&
    !!arrival?.nameKo;

  const scheduledTimeLabel = useMemo(() => {
    return `${padTime(scheduledHour)}:${padTime(
      scheduledMinute,
    )}`;
  }, [scheduledHour, scheduledMinute]);

  const departureTimeLabel =
    departureTimeMode === "now"
      ? "지금 출발"
      : `${scheduledTimeLabel} 출발`;

  const changeHour = (amount: number) => {
    setScheduledHour((current) => {
      return (current + amount + 24) % 24;
    });
  };

  const changeMinute = (amount: number) => {
    setScheduledMinute((current) => {
      const totalMinutes =
        scheduledHour * 60 + current + amount;

      const normalizedTotalMinutes =
        (totalMinutes + 24 * 60) % (24 * 60);

      const nextHour = Math.floor(
        normalizedTotalMinutes / 60,
      );

      const nextMinute =
        normalizedTotalMinutes % 60;

      setScheduledHour(nextHour);

      return nextMinute;
    });
  };

  const handleSelectNow = () => {
    setDepartureTimeMode("now");
    setIsTimeModalVisible(false);
  };

  const handleOpenScheduledTime = () => {
    const now = new Date();

    if (departureTimeMode === "now") {
      setScheduledHour(now.getHours());
      setScheduledMinute(now.getMinutes());
    }

    setDepartureTimeMode("scheduled");
  };

  const handleConfirmScheduledTime = () => {
    setDepartureTimeMode("scheduled");
    setIsTimeModalVisible(false);
  };

  const getDepartureDate = () => {
    const now = new Date();

    if (departureTimeMode === "now") {
      return now;
    }

    const selected = new Date(now);

    selected.setHours(
      scheduledHour,
      scheduledMinute,
      0,
      0,
    );

    /*
     * 현재 시각보다 지정 시간이 많이 이전이면
     * 다음 날 출발로 처리한다.
     *
     * 예:
     * 현재 23:50
     * 지정 00:10
     * → 다음 날 00:10
     */
    if (
      selected.getTime() <
      now.getTime() - 60 * 60 * 1000
    ) {
      selected.setDate(selected.getDate() + 1);
    }

    return selected;
  };

  const handleSearchRoute = () => {
    if (
      !departure?.nameKo ||
      !arrival?.nameKo
    ) {
      return;
    }

    const departureDate = getDepartureDate();

    router.push({
      pathname: "/route-result" as any,

      params: {
        departureNameKo:
          departure.nameKo,

        departureNameJa:
          departure.nameJa ?? "",

        arrivalNameKo:
          arrival.nameKo,

        arrivalNameJa:
          arrival.nameJa ?? "",

        departureTime:
          departureDate.toISOString(),

        departureTimeMode,
      },
    });
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
        {/* Hero */}

        <View style={styles.hero}>
          <Text
            style={[
              styles.eyebrow,
              {
                color: colors.textMuted,
              },
            ]}
          >
            TOKYO RAILWAY GUIDE
          </Text>

          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            어디로 갈까요?
          </Text>

          <Text
            style={[
              styles.description,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            출발역과 도착역을 선택하면 환승 경로를 안내해 드려요.
          </Text>
        </View>

        {/* Route Search */}

        <View
          style={[
            styles.routeCard,
            {
              backgroundColor: colors.surface,
            },
          ]}
        >
          {/* 출발 */}

          <TouchableOpacity
            style={styles.stationRow}
            activeOpacity={0.7}
            onPress={handleSelectDeparture}
          >
            <View
              style={[
                styles.stationIcon,
                {
                  backgroundColor:
                    colors.surfaceSecondary,
                },
              ]}
            >
              <Navigation
                size={20}
                color={colors.textSecondary}
                strokeWidth={2}
              />
            </View>

            <View style={styles.stationTextArea}>
              <Text
                style={[
                  styles.stationLabel,
                  {
                    color: colors.textMuted,
                  },
                ]}
              >
                출발
              </Text>

              <Text
                style={[
                  styles.stationPlaceholder,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {departure?.nameKo ??
                  "출발역을 선택하세요"}
              </Text>

              {!!departure?.nameJa && (
                <Text
                  style={[
                    styles.selectedStationJa,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  {departure.nameJa}
                </Text>
              )}
            </View>

            <ChevronRight
              size={22}
              color={colors.textMuted}
              strokeWidth={2}
            />
          </TouchableOpacity>

          {/* Swap */}

          <View style={styles.middleRow}>
            <View
              style={[
                styles.divider,
                {
                  backgroundColor:
                    colors.surfaceSecondary,
                },
              ]}
            />

            <TouchableOpacity
              style={[
                styles.swapButton,
                {
                  backgroundColor:
                    colors.surfaceSecondary,
                },
              ]}
              activeOpacity={0.7}
              onPress={handleSwapStations}
            >
              <ArrowDownUp
                size={18}
                color={colors.textSecondary}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>

          {/* 도착 */}

          <TouchableOpacity
            style={styles.stationRow}
            activeOpacity={0.7}
            onPress={handleSelectArrival}
          >
            <View
              style={[
                styles.stationIcon,
                {
                  backgroundColor:
                    colors.surfaceSecondary,
                },
              ]}
            >
              <MapPin
                size={20}
                color={colors.textSecondary}
                strokeWidth={2}
              />
            </View>

            <View style={styles.stationTextArea}>
              <Text
                style={[
                  styles.stationLabel,
                  {
                    color: colors.textMuted,
                  },
                ]}
              >
                도착
              </Text>

              <Text
                style={[
                  styles.stationPlaceholder,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {arrival?.nameKo ??
                  "도착역을 선택하세요"}
              </Text>

              {!!arrival?.nameJa && (
                <Text
                  style={[
                    styles.selectedStationJa,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  {arrival.nameJa}
                </Text>
              )}
            </View>

            <ChevronRight
              size={22}
              color={colors.textMuted}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>

        {/* 출발 시간 */}

        <TouchableOpacity
          style={[
            styles.departureTimeCard,
            {
              backgroundColor: colors.surface,
            },
          ]}
          activeOpacity={0.72}
          onPress={() =>
            setIsTimeModalVisible(true)
          }
        >
          <View
            style={[
              styles.departureTimeIcon,
              {
                backgroundColor:
                  colors.surfaceSecondary,
              },
            ]}
          >
            <Clock3
              size={20}
              color={colors.textSecondary}
              strokeWidth={2}
            />
          </View>

          <View style={styles.departureTimeTextArea}>
            <Text
              style={[
                styles.departureTimeLabel,
                {
                  color: colors.textMuted,
                },
              ]}
            >
              출발 시간
            </Text>

            <Text
              style={[
                styles.departureTimeValue,
                {
                  color: colors.text,
                },
              ]}
            >
              {departureTimeLabel}
            </Text>
          </View>

          <ChevronRight
            size={22}
            color={colors.textMuted}
            strokeWidth={2}
          />
        </TouchableOpacity>

        {/* 경로 검색 */}

        <TouchableOpacity
          style={[
            styles.routeSearchButton,
            !canSearch &&
              styles.routeSearchButtonDisabled,
          ]}
          activeOpacity={canSearch ? 0.8 : 1}
          disabled={!canSearch}
          onPress={handleSearchRoute}
        >
          <Search
            size={20}
            color="#FFFFFF"
            strokeWidth={2.4}
          />

          <Text style={styles.routeSearchButtonText}>
            경로 검색
          </Text>
        </TouchableOpacity>

        {/* Map */}

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text,
              },
            ]}
          >
            철도 노선 보기
          </Text>

          <Text
            style={[
              styles.sectionDescription,
              {
                color: colors.textMuted,
              },
            ]}
          >
            기존 철도회사와 노선 화면도 그대로 이용할 수 있어요.
          </Text>

          <TouchableOpacity
            style={[
              styles.mapCard,
              {
                backgroundColor: colors.surface,
              },
            ]}
            activeOpacity={0.72}
            onPress={() =>
              router.push("/map" as any)
            }
          >
            <View
              style={[
                styles.mapIconArea,
                {
                  backgroundColor:
                    colors.surfaceSecondary,
                },
              ]}
            >
              <Map
                size={26}
                color={colors.text}
                strokeWidth={2}
              />
            </View>

            <View style={styles.mapTextArea}>
              <Text
                style={[
                  styles.mapTitle,
                  {
                    color: colors.text,
                  },
                ]}
              >
                철도 지도
              </Text>

              <Text
                style={[
                  styles.mapDescription,
                  {
                    color: colors.textMuted,
                  },
                ]}
              >
                철도회사와 노선을 선택해서 확인하세요.
              </Text>
            </View>

            <ChevronRight
              size={23}
              color={colors.textMuted}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>

      {/* 출발 시간 선택 Modal */}

      <Modal
        visible={isTimeModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() =>
          setIsTimeModalVisible(false)
        }
      >
        <View style={styles.modalBackdrop}>
          <View
            style={[
              styles.timeModal,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.modalHeader}>
              <View>
                <Text
                  style={[
                    styles.modalEyebrow,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  DEPARTURE TIME
                </Text>

                <Text
                  style={[
                    styles.modalTitle,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  출발 시간
                </Text>
              </View>

              <TouchableOpacity
                style={[
                  styles.closeButton,
                  {
                    backgroundColor:
                      colors.surfaceSecondary,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() =>
                  setIsTimeModalVisible(false)
                }
              >
                <X
                  size={19}
                  color={colors.text}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            </View>

            {/* 지금 출발 */}

            <TouchableOpacity
              style={[
                styles.timeOption,
                {
                  borderColor:
                    departureTimeMode === "now"
                      ? "#1677FF"
                      : colors.border,

                  backgroundColor:
                    departureTimeMode === "now"
                      ? "#1677FF12"
                      : colors.surface,
                },
              ]}
              activeOpacity={0.7}
              onPress={handleSelectNow}
            >
              <View>
                <Text
                  style={[
                    styles.timeOptionTitle,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  지금 출발
                </Text>

                <Text
                  style={[
                    styles.timeOptionDescription,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  현재 시간을 기준으로 검색합니다.
                </Text>
              </View>

              {departureTimeMode === "now" && (
                <Check
                  size={20}
                  color="#1677FF"
                  strokeWidth={2.5}
                />
              )}
            </TouchableOpacity>

            {/* 시간 지정 */}

            <TouchableOpacity
              style={[
                styles.timeOption,
                {
                  borderColor:
                    departureTimeMode === "scheduled"
                      ? "#1677FF"
                      : colors.border,

                  backgroundColor:
                    departureTimeMode === "scheduled"
                      ? "#1677FF12"
                      : colors.surface,
                },
              ]}
              activeOpacity={0.7}
              onPress={handleOpenScheduledTime}
            >
              <View>
                <Text
                  style={[
                    styles.timeOptionTitle,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  출발시간 지정
                </Text>

                <Text
                  style={[
                    styles.timeOptionDescription,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  원하는 출발 시간을 선택합니다.
                </Text>
              </View>

              {departureTimeMode === "scheduled" && (
                <Check
                  size={20}
                  color="#1677FF"
                  strokeWidth={2.5}
                />
              )}
            </TouchableOpacity>

            {departureTimeMode === "scheduled" && (
              <>
                <View
                  style={[
                    styles.timePicker,
                    {
                      backgroundColor:
                        colors.surfaceSecondary,
                    },
                  ]}
                >
                  {/* 시 */}

                  <View style={styles.timeColumn}>
                    <TouchableOpacity
                      style={[
                        styles.timeAdjustButton,
                        {
                          backgroundColor:
                            colors.surface,
                        },
                      ]}
                      activeOpacity={0.7}
                      onPress={() => changeHour(1)}
                    >
                      <Plus
                        size={18}
                        color={colors.text}
                        strokeWidth={2}
                      />
                    </TouchableOpacity>

                    <Text
                      style={[
                        styles.timeNumber,
                        {
                          color: colors.text,
                        },
                      ]}
                    >
                      {padTime(scheduledHour)}
                    </Text>

                    <TouchableOpacity
                      style={[
                        styles.timeAdjustButton,
                        {
                          backgroundColor:
                            colors.surface,
                        },
                      ]}
                      activeOpacity={0.7}
                      onPress={() => changeHour(-1)}
                    >
                      <Minus
                        size={18}
                        color={colors.text}
                        strokeWidth={2}
                      />
                    </TouchableOpacity>
                  </View>

                  <Text
                    style={[
                      styles.timeColon,
                      {
                        color: colors.text,
                      },
                    ]}
                  >
                    :
                  </Text>

                  {/* 분 */}

                  <View style={styles.timeColumn}>
                    <TouchableOpacity
                      style={[
                        styles.timeAdjustButton,
                        {
                          backgroundColor:
                            colors.surface,
                        },
                      ]}
                      activeOpacity={0.7}
                      onPress={() => changeMinute(5)}
                    >
                      <Plus
                        size={18}
                        color={colors.text}
                        strokeWidth={2}
                      />
                    </TouchableOpacity>

                    <Text
                      style={[
                        styles.timeNumber,
                        {
                          color: colors.text,
                        },
                      ]}
                    >
                      {padTime(scheduledMinute)}
                    </Text>

                    <TouchableOpacity
                      style={[
                        styles.timeAdjustButton,
                        {
                          backgroundColor:
                            colors.surface,
                        },
                      ]}
                      activeOpacity={0.7}
                      onPress={() => changeMinute(-5)}
                    >
                      <Minus
                        size={18}
                        color={colors.text}
                        strokeWidth={2}
                      />
                    </TouchableOpacity>
                  </View>
                </View>

                <TouchableOpacity
                  style={styles.confirmTimeButton}
                  activeOpacity={0.8}
                  onPress={handleConfirmScheduledTime}
                >
                  <Text
                    style={styles.confirmTimeButtonText}
                  >
                    {scheduledTimeLabel} 출발
                  </Text>
                </TouchableOpacity>
              </>
            )}
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },

  hero: {
    marginBottom: 28,
  },

  eyebrow: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  title: {
    marginTop: 8,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "900",
  },

  description: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
  },

  routeCard: {
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  stationRow: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
  },

  stationIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  stationTextArea: {
    flex: 1,
    marginLeft: 14,
  },

  stationLabel: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
  },

  stationPlaceholder: {
    marginTop: 3,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "800",
  },

  selectedStationJa: {
    marginTop: 1,
    fontSize: 11,
    lineHeight: 15,
  },

  middleRow: {
    height: 1,
    marginLeft: 58,
    position: "relative",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  divider: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
  },

  swapButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },

  departureTimeCard: {
    minHeight: 68,
    marginTop: 12,
    borderRadius: 18,
    paddingHorizontal: 14,
    paddingVertical: 11,
    flexDirection: "row",
    alignItems: "center",
  },

  departureTimeIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
  },

  departureTimeTextArea: {
    flex: 1,
    marginLeft: 12,
  },

  departureTimeLabel: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "700",
  },

  departureTimeValue: {
    marginTop: 2,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
  },

  routeSearchButton: {
    height: 56,
    marginTop: 12,
    borderRadius: 18,
    backgroundColor: "#1677FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  routeSearchButtonDisabled: {
    opacity: 0.4,
  },

  routeSearchButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "900",
  },

  section: {
    marginTop: 38,
  },

  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
  },

  sectionDescription: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
  },

  mapCard: {
    minHeight: 88,
    marginTop: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  mapIconArea: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  mapTextArea: {
    flex: 1,
    marginLeft: 14,
  },

  mapTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "900",
  },

  mapDescription: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 16,
  },

  modalBackdrop: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.45)",
    justifyContent: "flex-end",
  },

  timeModal: {
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    borderWidth: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 28,
  },

  modalHeader: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 18,
  },

  modalEyebrow: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "800",
    letterSpacing: 1,
  },

  modalTitle: {
    marginTop: 2,
    fontSize: 22,
    lineHeight: 28,
    fontWeight: "900",
  },

  closeButton: {
    width: 38,
    height: 38,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
  },

  timeOption: {
    minHeight: 68,
    borderWidth: 1,
    borderRadius: 17,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginBottom: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  timeOptionTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
  },

  timeOptionDescription: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 16,
  },

  timePicker: {
    marginTop: 6,
    borderRadius: 20,
    paddingVertical: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
  },

  timeColumn: {
    alignItems: "center",
  },

  timeAdjustButton: {
    width: 38,
    height: 32,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },

  timeNumber: {
    minWidth: 66,
    marginVertical: 10,
    textAlign: "center",
    fontSize: 32,
    lineHeight: 38,
    fontWeight: "900",
  },

  timeColon: {
    marginHorizontal: 4,
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "900",
  },

  confirmTimeButton: {
    height: 54,
    marginTop: 14,
    borderRadius: 17,
    backgroundColor: "#1677FF",
    alignItems: "center",
    justifyContent: "center",
  },

  confirmTimeButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "900",
  },
});