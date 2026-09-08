import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  ArrowDown,
  ChevronLeft,
  CircleAlert,
  Info,
  MapPin,
  TrainFront,
} from "lucide-react-native";
import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Direction = "tokyo" | "narita";
type DayType = "weekday" | "weekend";
type DepartureStation =
  | "narita-airport-terminal-1"
  | "narita-airport-terminal-2-3"
  | "oshiage";

type SkyAccessTimetableItem = {
  departureTime: string;
  trainType: string;
  destination: string;
  firstTrain: boolean;
};

type SkyAccessApiResponse = {
  supported: boolean;
  found: boolean;
  station: DepartureStation;
  stationName: string;
  direction: string;
  dayType: DayType;
  revisionDate?: string;
  updatedAt: string;
  timetable: SkyAccessTimetableItem[];
  count: number;
};

const API_BASE_URL =
  process.env.EXPO_PUBLIC_API_BASE_URL ??
  "https://tokyo-railway-api.vercel.app";

const DEPARTURE_STATIONS: Record<
  Direction,
  { id: DepartureStation; name: string; subtitle: string }[]
> = {
  tokyo: [
    {
      id: "narita-airport-terminal-1",
      name: "나리타공항역",
      subtitle: "제1터미널",
    },
    {
      id: "narita-airport-terminal-2-3",
      name: "공항 제2빌딩역",
      subtitle: "제2 · 제3터미널",
    },
  ],
  narita: [
    {
      id: "oshiage",
      name: "오시아게역",
      subtitle: "Oshiage",
    },
  ],
};

const getTokyoDayType = (): DayType => {
  const weekday = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    weekday: "short",
  }).format(new Date());

  return weekday === "Sat" || weekday === "Sun" ? "weekend" : "weekday";
};

const getTokyoMinutesNow = (): number => {
  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).formatToParts(new Date());

  const hour = Number(parts.find((part) => part.type === "hour")?.value ?? "0");
  const minute = Number(
    parts.find((part) => part.type === "minute")?.value ?? "0",
  );

  return hour * 60 + minute;
};

const getDepartureMinutes = (departureTime: string): number => {
  const [hour, minute] = departureTime.split(":").map(Number);
  return hour * 60 + minute;
};

type DirectionButtonProps = {
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
  textColor: string;
  secondaryTextColor: string;
  borderColor: string;
};

const DirectionButton = ({
  title,
  subtitle,
  selected,
  onPress,
  textColor,
  secondaryTextColor,
  borderColor,
}: DirectionButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.directionButton,
        {
          borderColor: selected ? "#F28C28" : borderColor,
        },
        selected && styles.directionButtonSelected,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.directionTitle,
          {
            color: selected ? "#F28C28" : textColor,
          },
        ]}
      >
        {title}
      </Text>

      <Text
        style={[
          styles.directionSubtitle,
          {
            color: secondaryTextColor,
          },
        ]}
      >
        {subtitle}
      </Text>
    </Pressable>
  );
};

const NaritaSkyAccessScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const [direction, setDirection] = useState<Direction>("tokyo");
  const [departureStation, setDepartureStation] =
    useState<DepartureStation>("narita-airport-terminal-2-3");
  const [timetable, setTimetable] = useState<SkyAccessTimetableItem[]>([]);
  const [dayType, setDayType] = useState<DayType>(getTokyoDayType());
  const [loading, setLoading] = useState(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const stationOptions = DEPARTURE_STATIONS[direction];

  const changeDirection = (nextDirection: Direction) => {
    setDirection(nextDirection);
    setDepartureStation(DEPARTURE_STATIONS[nextDirection][0].id);
  };

  const loadTimetable = useCallback(async () => {
    const nextDayType = getTokyoDayType();

    setDayType(nextDayType);
    setLoading(true);
    setErrorMessage(null);

    try {
      const url =
        `${API_BASE_URL}/api/sky-access` +
        `?station=${encodeURIComponent(departureStation)}` +
        `&dayType=${nextDayType}`;

      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`Sky Access API ${response.status}`);
      }

      const data = (await response.json()) as SkyAccessApiResponse;

      if (!data.supported) {
        throw new Error("Unsupported Sky Access station");
      }

      setTimetable(Array.isArray(data.timetable) ? data.timetable : []);
    } catch (error) {
      console.error("Sky Access timetable error:", error);
      setTimetable([]);
      setErrorMessage("시간표를 불러오지 못했습니다.");
    } finally {
      setLoading(false);
    }
  }, [departureStation]);

  useEffect(() => {
    void loadTimetable();
  }, [loadTimetable]);

  const upcomingDepartures = useMemo(() => {
    const nowMinutes = getTokyoMinutesNow();

    return timetable
      .filter((item) => getDepartureMinutes(item.departureTime) >= nowMinutes)
      .sort(
        (a, b) =>
          getDepartureMinutes(a.departureTime) -
          getDepartureMinutes(b.departureTime),
      )
      .slice(0, 3)
      .map((item) => ({
        ...item,
        minutesUntilDeparture:
          getDepartureMinutes(item.departureTime) - nowMinutes,
      }));
  }, [timetable]);

  const routeStations =
    direction === "tokyo"
      ? ["나리타공항", "공항 제2빌딩", "오시아게"]
      : ["오시아게", "공항 제2빌딩", "나리타공항"];

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          {
            paddingBottom: Math.max(insets.bottom, 12) + 110,
          },
        ]}
      >
        {/* Header */}
        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <ChevronLeft size={25} color={colors.text} strokeWidth={1.8} />
          </Pressable>

          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Sky Access 시간표
          </Text>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <View style={styles.introIcon}>
            <TrainFront size={23} color="#F28C28" strokeWidth={1.8} />
          </View>

          <View style={styles.introContent}>
            <Text style={[styles.pageTitle, { color: colors.text }]}>
              게이세이 Sky Access
            </Text>

            <Text
              style={[styles.pageDescription, { color: colors.textSecondary }]}
            >
              나리타공항과 오시아게 사이의 Access Express 출발 시간을
              확인하세요.
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Direction */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrainFront size={21} color={colors.text} strokeWidth={1.7} />

            <View style={styles.sectionHeaderText}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                어느 방향으로 가시나요?
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                이동할 방향을 먼저 선택하세요
              </Text>
            </View>
          </View>

          <View style={styles.directionSelector}>
            <DirectionButton
              title="도쿄 방면"
              subtitle="공항 → 오시아게"
              selected={direction === "tokyo"}
              onPress={() => changeDirection("tokyo")}
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />

            <DirectionButton
              title="나리타공항 방면"
              subtitle="오시아게 → 공항"
              selected={direction === "narita"}
              onPress={() => changeDirection("narita")}
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Departure station */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={21} color={colors.text} strokeWidth={1.7} />

            <View style={styles.sectionHeaderText}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                어디에서 출발하시나요?
              </Text>
              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                Sky Access를 탈 역을 선택하세요
              </Text>
            </View>
          </View>

          <View style={styles.stationSelector}>
            {stationOptions.map((station) => {
              const selected = departureStation === station.id;

              return (
                <Pressable
                  key={station.id}
                  onPress={() => setDepartureStation(station.id)}
                  style={({ pressed }) => [
                    styles.stationButton,
                    {
                      borderColor: selected ? "#F28C28" : colors.border,
                    },
                    selected && styles.stationButtonSelected,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.stationButtonTitle,
                      { color: selected ? "#F28C28" : colors.text },
                    ]}
                  >
                    {station.name}
                  </Text>
                  <Text
                    style={[
                      styles.stationButtonSubtitle,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {station.subtitle}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Next departures */}
        <View style={styles.section}>
          <View style={styles.timetableHeader}>
            <View style={styles.sectionHeader}>
              <TrainFront size={21} color={colors.text} strokeWidth={1.7} />

              <View style={styles.sectionHeaderText}>
                <Text style={[styles.sectionTitle, { color: colors.text }]}>
                  다음 출발
                </Text>
                <Text
                  style={[
                    styles.sectionSubtitle,
                    { color: colors.textSecondary },
                  ]}
                >
                  현재 시각 이후 출발하는 Sky Access ·{" "}
                  {dayType === "weekday" ? "평일" : "토·휴일"} 시간표
                </Text>
              </View>
            </View>

            <Pressable
              onPress={() => void loadTimetable()}
              disabled={loading}
              style={({ pressed }) => [
                styles.refreshButton,
                { borderColor: colors.border },
                pressed && styles.pressed,
              ]}
            >
              <Text style={[styles.refreshText, { color: colors.textSecondary }]}>
                새로고침
              </Text>
            </Pressable>
          </View>

          <View style={styles.departureList}>
            {loading ? (
              <View style={styles.stateBox}>
                <ActivityIndicator size="small" color="#F28C28" />
                <Text
                  style={[styles.stateText, { color: colors.textSecondary }]}
                >
                  Sky Access 시간표를 불러오는 중입니다
                </Text>
              </View>
            ) : errorMessage ? (
              <View style={styles.stateBox}>
                <CircleAlert
                  size={18}
                  color={colors.textSecondary}
                  strokeWidth={1.7}
                />
                <Text
                  style={[styles.stateText, { color: colors.textSecondary }]}
                >
                  {errorMessage}
                </Text>
              </View>
            ) : upcomingDepartures.length === 0 ? (
              <View style={styles.stateBox}>
                <CircleAlert
                  size={18}
                  color={colors.textSecondary}
                  strokeWidth={1.7}
                />
                <Text
                  style={[styles.stateText, { color: colors.textSecondary }]}
                >
                  오늘 출발하는 Sky Access 운행이 종료되었습니다
                </Text>
              </View>
            ) : (
              upcomingDepartures.map((departure, index) => (
                <View
                  key={`${departure.departureTime}-${departure.destination}-${index}`}
                  style={[
                    styles.departureRow,
                    {
                      borderBottomColor: colors.border,
                    },
                  ]}
                >
                  <View style={styles.departureTimeArea}>
                    <Text style={[styles.departureTime, { color: colors.text }]}>
                      {departure.departureTime}
                    </Text>
                    <Text
                      style={[
                        styles.departureMinutes,
                        { color: "#F28C28" },
                      ]}
                    >
                      {departure.minutesUntilDeparture === 0
                        ? "곧 출발"
                        : `${departure.minutesUntilDeparture}분 후`}
                    </Text>
                  </View>

                  <View style={styles.departureDestinationArea}>
                    <Text
                      style={[
                        styles.departureDestination,
                        { color: colors.text },
                      ]}
                    >
                      {departure.destination}
                    </Text>
                    <Text
                      style={[
                        styles.departureType,
                        { color: colors.textSecondary },
                      ]}
                    >
                      Access Express
                    </Text>
                  </View>
                </View>
              ))
            )}
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        {/* Route */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin size={21} color={colors.text} strokeWidth={1.7} />

            <View style={styles.sectionHeaderText}>
              <Text style={[styles.sectionTitle, { color: colors.text }]}>
                주요 이동 경로
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                Sky Access 주요 이동 구간
              </Text>
            </View>
          </View>

          <View style={styles.routeArea}>
            {routeStations.map((station, index) => {
              const isLast = index === routeStations.length - 1;

              return (
                <View key={station}>
                  <View style={styles.routeStation}>
                    <View style={styles.routeDot} />

                    <Text
                      style={[styles.routeStationName, { color: colors.text }]}
                    >
                      {station}
                    </Text>
                  </View>

                  {!isLast && (
                    <View style={styles.routeArrowRow}>
                      <ArrowDown
                        size={15}
                        color={colors.textSecondary}
                        strokeWidth={1.6}
                      />
                    </View>
                  )}
                </View>
              );
            })}
          </View>
        </View>

        {/* Important */}
        <View
          style={[
            styles.keyPoint,
            {
              borderTopColor: colors.border,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <Info size={18} color="#7FAF9B" strokeWidth={1.8} />

          <View style={styles.keyPointContent}>
            <Text style={[styles.keyPointTitle, { color: colors.text }]}>
              별도 라이너권 없이 이용할 수 있어요
            </Text>

            <Text
              style={[styles.keyPointText, { color: colors.textSecondary }]}
            >
              Sky Access를 이용할 때는 일반 운임 외에 필요한 별도 요금과 승차
              조건을 확인하세요.
            </Text>
          </View>
        </View>

        {/* Notice */}
        <View style={styles.notice}>
          <CircleAlert
            size={16}
            color={colors.textSecondary}
            strokeWidth={1.7}
          />

          <Text style={[styles.noticeText, { color: colors.textSecondary }]}>
            열차 운행과 시간표는 변경될 수 있습니다. 실제 탑승 시 역의 출발
            안내와 게이세이의 최신 운행 정보를 함께 확인하세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default NaritaSkyAccessScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 32,
  },

  backButton: {
    width: 40,
    height: 38,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.3,
  },

  intro: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  introIcon: {
    width: 46,
    paddingTop: 3,
  },

  introContent: {
    flex: 1,
  },

  pageTitle: {
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  pageDescription: {
    marginTop: 8,
    fontSize: 12.5,
    lineHeight: 19,
  },

  divider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    marginVertical: 30,
  },

  section: {
    width: "100%",
  },

  sectionHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  sectionHeaderText: {
    flex: 1,
    marginLeft: 25,
  },

  sectionTitle: {
    fontSize: 16,
    fontWeight: "700",
    letterSpacing: -0.2,
  },

  sectionSubtitle: {
    marginTop: 3,
    fontSize: 11.5,
    lineHeight: 17,
  },

  directionSelector: {
    flexDirection: "row",
    marginTop: 22,
    marginLeft: 46,
    gap: 10,
  },

  directionButton: {
    flex: 1,
    minHeight: 72,
    justifyContent: "center",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 12,
  },

  directionButtonSelected: {
    borderWidth: 1.5,
  },

  directionTitle: {
    fontSize: 13.5,
    fontWeight: "700",
  },

  directionSubtitle: {
    marginTop: 4,
    fontSize: 10.5,
    lineHeight: 15,
  },

  stationSelector: {
    flexDirection: "row",
    marginTop: 22,
    marginLeft: 46,
    gap: 10,
  },

  stationButton: {
    flex: 1,
    minHeight: 68,
    justifyContent: "center",
    paddingHorizontal: 14,
    borderWidth: 1,
    borderRadius: 12,
  },

  stationButtonSelected: {
    borderWidth: 1.5,
  },

  stationButtonTitle: {
    fontSize: 13,
    fontWeight: "700",
  },

  stationButtonSubtitle: {
    marginTop: 4,
    fontSize: 10.5,
    lineHeight: 15,
  },

  timetableHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  refreshButton: {
    marginLeft: 12,
    paddingHorizontal: 10,
    paddingVertical: 7,
    borderWidth: 1,
    borderRadius: 9,
  },

  refreshText: {
    fontSize: 10.5,
    fontWeight: "600",
  },

  departureList: {
    marginTop: 20,
    marginLeft: 46,
  },

  departureRow: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 72,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  departureTimeArea: {
    width: 100,
  },

  departureTime: {
    fontSize: 23,
    lineHeight: 29,
    fontWeight: "700",
    letterSpacing: 0.2,
  },

  departureMinutes: {
    marginTop: 2,
    fontSize: 10.5,
    fontWeight: "700",
  },

  departureDestinationArea: {
    flex: 1,
    paddingLeft: 10,
  },

  departureDestination: {
    fontSize: 13.5,
    fontWeight: "700",
  },

  departureType: {
    marginTop: 4,
    fontSize: 10.5,
  },

  stateBox: {
    minHeight: 90,
    alignItems: "center",
    justifyContent: "center",
    gap: 9,
  },

  stateText: {
    fontSize: 11.5,
    lineHeight: 18,
    textAlign: "center",
  },

  routeArea: {
    marginTop: 22,
    marginLeft: 46,
  },

  routeStation: {
    flexDirection: "row",
    alignItems: "center",
    minHeight: 28,
  },

  routeDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#F28C28",
  },

  routeStationName: {
    marginLeft: 15,
    fontSize: 13,
    fontWeight: "600",
  },

  routeArrowRow: {
    height: 24,
    justifyContent: "center",
    paddingLeft: 0,
  },

  keyPoint: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 30,
    paddingVertical: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  keyPointContent: {
    flex: 1,
    marginLeft: 28,
  },

  keyPointTitle: {
    fontSize: 13.5,
    fontWeight: "700",
  },

  keyPointText: {
    marginTop: 6,
    fontSize: 11.5,
    lineHeight: 18,
  },

  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginTop: 24,
  },

  noticeText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 17,
  },

  pressed: {
    opacity: 0.5,
  },
});
