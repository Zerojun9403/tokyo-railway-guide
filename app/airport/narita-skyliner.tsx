import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  ArrowDown,
  ChevronLeft,
  CircleAlert,
  Clock3,
  Info,
  MapPin,
  TrainFront,
} from "lucide-react-native";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type Direction = "tokyo" | "narita";

type DepartureStation =
  | "narita-airport"
  | "airport-terminal2"
  | "keisei-ueno"
  | "nippori";

type StationOption = {
  id: DepartureStation;
  name: string;
  subtitle: string;
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

type StationButtonProps = {
  title: string;
  subtitle: string;
  selected: boolean;
  onPress: () => void;
  textColor: string;
  secondaryTextColor: string;
  borderColor: string;
};

const TOKYO_DEPARTURE_STATIONS: StationOption[] = [
  {
    id: "narita-airport",
    name: "나리타공항역",
    subtitle: "제1터미널",
  },
  {
    id: "airport-terminal2",
    name: "공항 제2빌딩역",
    subtitle: "제2 · 제3터미널",
  },
];

const NARITA_DEPARTURE_STATIONS: StationOption[] = [
  {
    id: "keisei-ueno",
    name: "게이세이우에노역",
    subtitle: "Keisei Ueno",
  },
  {
    id: "nippori",
    name: "닛포리역",
    subtitle: "JR 야마노테선 등 환승",
  },
];

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
          borderColor: selected ? "#A78BFA" : borderColor,
        },
        selected && styles.directionButtonSelected,
        pressed && styles.pressed,
      ]}
    >
      <Text
        style={[
          styles.directionTitle,
          {
            color: selected ? "#A78BFA" : textColor,
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

const StationButton = ({
  title,
  subtitle,
  selected,
  onPress,
  textColor,
  secondaryTextColor,
  borderColor,
}: StationButtonProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.stationButton,
        {
          borderColor: selected ? "#A78BFA" : borderColor,
        },
        selected && styles.stationButtonSelected,
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.stationButtonContent}>
        <View
          style={[
            styles.stationRadio,
            {
              borderColor: selected ? "#A78BFA" : borderColor,
            },
          ]}
        >
          {selected && <View style={styles.stationRadioInner} />}
        </View>

        <View style={styles.stationButtonText}>
          <Text
            style={[
              styles.stationButtonTitle,
              {
                color: selected ? "#A78BFA" : textColor,
              },
            ]}
          >
            {title}
          </Text>

          <Text
            style={[
              styles.stationButtonSubtitle,
              {
                color: secondaryTextColor,
              },
            ]}
          >
            {subtitle}
          </Text>
        </View>
      </View>
    </Pressable>
  );
};

const NaritaSkylinerScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const [direction, setDirection] = useState<Direction>("tokyo");

  const [departureStation, setDepartureStation] =
    useState<DepartureStation>("airport-terminal2");

  const departureStations =
    direction === "tokyo"
      ? TOKYO_DEPARTURE_STATIONS
      : NARITA_DEPARTURE_STATIONS;

  const changeDirection = (nextDirection: Direction) => {
    setDirection(nextDirection);

    if (nextDirection === "tokyo") {
      setDepartureStation("airport-terminal2");
    } else {
      setDepartureStation("nippori");
    }
  };

  const routeStations =
    direction === "tokyo"
      ? [
          "나리타공항",
          "공항 제2빌딩",
          "닛포리",
          "게이세이우에노",
        ]
      : [
          "게이세이우에노",
          "닛포리",
          "공항 제2빌딩",
          "나리타공항",
        ];

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
            <ChevronLeft
              size={25}
              color={colors.text}
              strokeWidth={1.8}
            />
          </Pressable>

          <Text style={[styles.headerTitle, { color: colors.text }]}>
            Skyliner 시간표
          </Text>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <View style={styles.introIcon}>
            <TrainFront
              size={23}
              color="#A78BFA"
              strokeWidth={1.8}
            />
          </View>

          <View style={styles.introContent}>
            <Text style={[styles.pageTitle, { color: colors.text }]}>
              게이세이 스카이라이너
            </Text>

            <Text
              style={[
                styles.pageDescription,
                { color: colors.textSecondary },
              ]}
            >
              나리타공항과 닛포리 · 게이세이우에노 사이의 Skyliner
              출발 시간을 확인하세요.
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Direction */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrainFront
              size={21}
              color={colors.text}
              strokeWidth={1.7}
            />

            <View style={styles.sectionHeaderText}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text },
                ]}
              >
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
              subtitle="공항 → 닛포리 · 우에노"
              selected={direction === "tokyo"}
              onPress={() => changeDirection("tokyo")}
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />

            <DirectionButton
              title="나리타공항 방면"
              subtitle="우에노 · 닛포리 → 공항"
              selected={direction === "narita"}
              onPress={() => changeDirection("narita")}
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />
          </View>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Route */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin
              size={21}
              color={colors.text}
              strokeWidth={1.7}
            />

            <View style={styles.sectionHeaderText}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text },
                ]}
              >
                주요 이동 경로
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                Skyliner 주요 정차역
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
                      style={[
                        styles.routeStationName,
                        { color: colors.text },
                      ]}
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

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Departure Station */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin
              size={21}
              color={colors.text}
              strokeWidth={1.7}
            />

            <View style={styles.sectionHeaderText}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text },
                ]}
              >
                출발역
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                시간표를 확인할 역을 선택하세요
              </Text>
            </View>
          </View>

          <View style={styles.stationSelector}>
            {departureStations.map((station) => (
              <StationButton
                key={station.id}
                title={station.name}
                subtitle={station.subtitle}
                selected={departureStation === station.id}
                onPress={() => setDepartureStation(station.id)}
                textColor={colors.text}
                secondaryTextColor={colors.textSecondary}
                borderColor={colors.border}
              />
            ))}
          </View>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Timetable */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock3
              size={21}
              color={colors.text}
              strokeWidth={1.7}
            />

            <View style={styles.sectionHeaderText}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text },
                ]}
              >
                다음 출발
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                현재 시각 이후 출발하는 Skyliner
              </Text>
            </View>
          </View>

          {/*
            =====================================================
            TODO: 게이세이 시간표 데이터 연결
            =====================================================

            direction === "tokyo"

            departureStation:
            - narita-airport
            - airport-terminal2

            나리타공항
              ↓
            공항 제2빌딩
              ↓
            닛포리
              ↓
            게이세이우에노


            direction === "narita"

            departureStation:
            - keisei-ueno
            - nippori

            게이세이우에노
              ↓
            닛포리
              ↓
            공항 제2빌딩
              ↓
            나리타공항


            실제 데이터 연결 시:

            1. 선택된 출발역 StationTimetable 조회
            2. Skyliner 열차만 필터링
            3. 현재 시각 이후 열차만 필터링
            4. 출발시각 기준 정렬
            5. 다음 열차부터 표시
            6. 가능하면 각 주요 역 도착시각 표시

            가짜 시간표는 넣지 않음.
          */}

          <View style={styles.emptyState}>
            <TrainFront
              size={25}
              color={colors.textSecondary}
              strokeWidth={1.5}
            />

            <Text
              style={[
                styles.emptyTitle,
                { color: colors.text },
              ]}
            >
              시간표 데이터 연결 예정
            </Text>

            <Text
              style={[
                styles.emptyDescription,
                { color: colors.textSecondary },
              ]}
            >
              게이세이 시간표 데이터를 연결하면 선택한 역에서 현재 시각
              이후 출발하는 Skyliner를 바로 확인할 수 있습니다.
            </Text>
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
          <Info
            size={18}
            color="#7FAF9B"
            strokeWidth={1.8}
          />

          <View style={styles.keyPointContent}>
            <Text
              style={[
                styles.keyPointTitle,
                { color: colors.text },
              ]}
            >
              Skyliner는 별도 요금이 필요한 열차예요
            </Text>

            <Text
              style={[
                styles.keyPointText,
                { color: colors.textSecondary },
              ]}
            >
              Skyliner를 이용할 때는 일반 운임 외에 필요한 별도 요금과
              승차 조건을 확인하세요.
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

          <Text
            style={[
              styles.noticeText,
              { color: colors.textSecondary },
            ]}
          >
            열차 운행과 시간표는 변경될 수 있습니다. 실제 탑승 시 역의
            출발 안내와 게이세이의 최신 운행 정보를 함께 확인하세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default NaritaSkylinerScreen;

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
    backgroundColor: "#A78BFA",
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

  stationSelector: {
    marginTop: 22,
    marginLeft: 46,
    gap: 10,
  },

  stationButton: {
    minHeight: 66,
    justifyContent: "center",
    paddingHorizontal: 16,
    borderWidth: 1,
    borderRadius: 12,
  },

  stationButtonSelected: {
    borderWidth: 1.5,
  },

  stationButtonContent: {
    flexDirection: "row",
    alignItems: "center",
  },

  stationRadio: {
    width: 17,
    height: 17,
    borderRadius: 9,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },

  stationRadioInner: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#A78BFA",
  },

  stationButtonText: {
    flex: 1,
    marginLeft: 13,
  },

  stationButtonTitle: {
    fontSize: 13.5,
    fontWeight: "700",
  },

  stationButtonSubtitle: {
    marginTop: 3,
    fontSize: 10.5,
  },

  emptyState: {
    alignItems: "center",
    marginTop: 28,
    marginLeft: 46,
    paddingVertical: 38,
  },

  emptyTitle: {
    marginTop: 13,
    fontSize: 13.5,
    fontWeight: "600",
  },

  emptyDescription: {
    maxWidth: 360,
    marginTop: 7,
    fontSize: 11.5,
    lineHeight: 18,
    textAlign: "center",
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