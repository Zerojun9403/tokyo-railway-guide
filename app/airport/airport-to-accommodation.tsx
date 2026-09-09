import AsyncStorage from "@react-native-async-storage/async-storage";
import { Href, useFocusEffect, useRouter } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  House,
  MapPin,
  PlaneLanding,
  Route,
} from "lucide-react-native";
import { useCallback, useState } from "react";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppTheme } from "@/hooks/useAppTheme";

const ACCOMMODATION_STORAGE_KEY = "tokyo-railway-guide:accommodation";

type AirportCode = "NRT" | "HND";

type AccommodationData = {
  name: string;
  stationId: string;
  lineId: string;
  stationNameKo: string;
  stationNameJa: string;
};

const AIRPORTS: {
  code: AirportCode;
  title: string;
  japaneseName: string;
  description: string;
  stationId: string;
  lineId: string;
}[] = [
  {
    code: "NRT",
    title: "나리타 국제공항",
    japaneseName: "成田国際空港",
    description: "나리타 익스프레스 · 스카이라이너 · 게이세이선",
    stationId: "KS42",
    lineId: "keisei-main",
  },
  {
    code: "HND",
    title: "하네다공항",
    japaneseName: "羽田空港",
    description: "게이큐선 · 도쿄 모노레일",
    stationId: "KK17",
    lineId: "keikyu-airport",
  },
];

export default function AirportToAccommodationScreen() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const [selectedAirport, setSelectedAirport] = useState<AirportCode>("NRT");
  const [accommodation, setAccommodation] = useState<AccommodationData | null>(
    null,
  );

  const loadAccommodation = useCallback(async () => {
    try {
      const saved = await AsyncStorage.getItem(ACCOMMODATION_STORAGE_KEY);

      if (!saved) {
        setAccommodation(null);
        return;
      }

      const parsed = JSON.parse(saved) as AccommodationData;

      if (!parsed.stationId || !parsed.stationNameKo) {
        setAccommodation(null);
        return;
      }

      setAccommodation(parsed);
    } catch (error) {
      console.error("Load accommodation error:", error);
      setAccommodation(null);
    }
  }, []);

  useFocusEffect(
    useCallback(() => {
      void loadAccommodation();
    }, [loadAccommodation]),
  );

  const handleBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/airport" as Href);
  };

  const handleAccommodation = () => {
    router.push("/accommodation" as Href);
  };

  const handleJourneySearch = () => {
    if (!accommodation?.stationId) return;

    const airport = AIRPORTS.find((item) => item.code === selectedAirport);
    if (!airport) return;

    router.push({
      pathname: "/",
      params: {
        departureStationId: airport.stationId,
        departureLineId: airport.lineId,
        arrivalStationId: accommodation.stationId,
        arrivalLineId: accommodation.lineId,
      },
    } as Href);
  };

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
            paddingBottom: Math.max(insets.bottom, 12) + 80,
          },
        ]}
      >
        <View style={styles.header}>
          <Pressable
            onPress={handleBack}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <ChevronLeft size={25} color={colors.text} strokeWidth={1.8} />
          </Pressable>

          <Text style={[styles.headerTitle, { color: colors.text }]}>
            공항에서 숙소로
          </Text>
        </View>

        <View style={styles.hero}>
          <View
            style={[
              styles.heroIcon,
              {
                backgroundColor: colors.surfaceSecondary,
              },
            ]}
          >
            <PlaneLanding size={24} color="#A78BFA" strokeWidth={1.8} />
          </View>

          <View style={styles.heroContent}>
            <Text style={[styles.eyebrow, { color: colors.textMuted }]}>
              AIRPORT JOURNEY
            </Text>

            <Text style={[styles.pageTitle, { color: colors.text }]}>
              도쿄에 도착하셨나요?
            </Text>

            <Text
              style={[
                styles.pageDescription,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              도착 공항과 저장한 숙소를 기준으로 이동 Journey를 준비합니다.
            </Text>
          </View>
        </View>

        <View style={[styles.divider, { backgroundColor: colors.border }]} />

        <View style={styles.section}>
          <Text style={[styles.sectionEyebrow, { color: colors.textMuted }]}>
            STEP 1
          </Text>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            도착 공항 선택
          </Text>

          <View style={styles.airportOptions}>
            {AIRPORTS.map((airport) => {
              const selected = selectedAirport === airport.code;

              return (
                <Pressable
                  key={airport.code}
                  onPress={() => setSelectedAirport(airport.code)}
                  style={({ pressed }) => [
                    styles.airportCard,
                    {
                      backgroundColor: selected
                        ? "#A78BFA12"
                        : colors.surface,
                      borderColor: selected ? "#A78BFA" : colors.border,
                    },
                    pressed && styles.pressed,
                  ]}
                >
                  <View style={styles.airportCodeArea}>
                    <Text
                      style={[
                        styles.airportCode,
                        {
                          color: selected ? "#A78BFA" : colors.textSecondary,
                        },
                      ]}
                    >
                      {airport.code}
                    </Text>
                  </View>

                  <View style={styles.airportContent}>
                    <Text
                      style={[
                        styles.airportTitle,
                        {
                          color: colors.text,
                        },
                      ]}
                    >
                      {airport.title}
                    </Text>

                    <Text
                      style={[
                        styles.airportJapaneseName,
                        {
                          color: colors.textMuted,
                        },
                      ]}
                    >
                      {airport.japaneseName}
                    </Text>

                    <Text
                      style={[
                        styles.airportDescription,
                        {
                          color: colors.textSecondary,
                        },
                      ]}
                    >
                      {airport.description}
                    </Text>
                  </View>

                  <View
                    style={[
                      styles.selectionDot,
                      {
                        borderColor: selected ? "#A78BFA" : colors.border,
                      },
                    ]}
                  >
                    {selected && <View style={styles.selectionDotInner} />}
                  </View>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionEyebrow, { color: colors.textMuted }]}>
            STEP 2
          </Text>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            숙소 확인
          </Text>

          <Pressable
            onPress={handleAccommodation}
            style={({ pressed }) => [
              styles.accommodationCard,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
              pressed && styles.pressed,
            ]}
          >
            <View
              style={[
                styles.accommodationIcon,
                {
                  backgroundColor: colors.surfaceSecondary,
                },
              ]}
            >
              <House size={21} color="#7FAF9B" strokeWidth={1.8} />
            </View>

            <View style={styles.accommodationContent}>
              <Text
                style={[
                  styles.accommodationLabel,
                  {
                    color: colors.textMuted,
                  },
                ]}
              >
                저장된 숙소
              </Text>

              <Text
                style={[
                  styles.accommodationTitle,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {accommodation?.name || "숙소를 먼저 등록해 주세요"}
              </Text>

              <View style={styles.stationRow}>
                <MapPin
                  size={13}
                  color={colors.textSecondary}
                  strokeWidth={1.8}
                />
                <Text
                  style={[
                    styles.stationText,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  {accommodation?.stationNameKo
                    ? `${accommodation.stationNameKo}역`
                    : "숙소와 가까운 역을 저장하면 Journey에 사용합니다."}
                </Text>
              </View>
            </View>

            <ChevronRight
              size={20}
              color={colors.textSecondary}
              strokeWidth={1.8}
            />
          </Pressable>
        </View>

        <View
          style={[
            styles.summaryCard,
            {
              backgroundColor: colors.surfaceSecondary,
            },
          ]}
        >
          <View style={styles.summaryHeader}>
            <Route size={18} color="#A78BFA" strokeWidth={1.8} />
            <Text style={[styles.summaryTitle, { color: colors.text }]}>
              Journey 준비
            </Text>
          </View>

          <Text
            style={[
              styles.summaryRoute,
              {
                color: colors.text,
              },
            ]}
          >
            {selectedAirport} 공항 →{" "}
            {accommodation?.stationNameKo
              ? `${accommodation.stationNameKo}역`
              : "저장된 숙소"}
          </Text>

          <Text
            style={[
              styles.summaryDescription,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            다음 단계에서 CULLINAN이 실제 이용 가능한 철도 Journey를 계산하도록
            연결합니다.
          </Text>
        </View>

        <Pressable
          onPress={handleJourneySearch}
          disabled={!accommodation?.stationId}
          style={({ pressed }) => [
            styles.journeyButton,
            !accommodation?.stationId && styles.journeyButtonDisabled,
            pressed && accommodation?.stationId && styles.pressed,
          ]}
        >
          <Text style={styles.journeyButtonText}>Journey 검색</Text>
        </Pressable>
      </ScrollView>
    </View>
  );
}

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
    marginBottom: 30,
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

  hero: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  heroIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  heroContent: {
    flex: 1,
  },

  eyebrow: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "700",
    letterSpacing: 0.9,
  },

  pageTitle: {
    marginTop: 4,
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
    marginBottom: 30,
  },

  sectionEyebrow: {
    marginBottom: 4,
    fontSize: 9.5,
    lineHeight: 14,
    fontWeight: "700",
    letterSpacing: 0.8,
  },

  sectionTitle: {
    marginBottom: 14,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "700",
  },

  airportOptions: {
    gap: 10,
  },

  airportCard: {
    minHeight: 104,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  airportCodeArea: {
    width: 50,
  },

  airportCode: {
    fontSize: 13,
    fontWeight: "800",
    letterSpacing: 0.6,
  },

  airportContent: {
    flex: 1,
    paddingRight: 12,
  },

  airportTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
  },

  airportJapaneseName: {
    marginTop: 2,
    fontSize: 10.5,
    lineHeight: 15,
  },

  airportDescription: {
    marginTop: 5,
    fontSize: 11.5,
    lineHeight: 17,
  },

  selectionDot: {
    width: 20,
    height: 20,
    borderRadius: 10,
    borderWidth: 1.5,
    alignItems: "center",
    justifyContent: "center",
  },

  selectionDotInner: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: "#A78BFA",
  },

  accommodationCard: {
    minHeight: 92,
    paddingHorizontal: 14,
    paddingVertical: 14,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  accommodationIcon: {
    width: 46,
    height: 46,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  accommodationContent: {
    flex: 1,
    marginLeft: 13,
    paddingRight: 8,
  },

  accommodationLabel: {
    fontSize: 10,
    lineHeight: 14,
    fontWeight: "600",
  },

  accommodationTitle: {
    marginTop: 2,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
  },

  stationRow: {
    marginTop: 5,
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },

  stationText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 16,
  },

  summaryCard: {
    borderRadius: 18,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  summaryHeader: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  summaryTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
  },

  summaryRoute: {
    marginTop: 12,
    fontSize: 17,
    lineHeight: 23,
    fontWeight: "800",
  },

  summaryDescription: {
    marginTop: 7,
    fontSize: 11.5,
    lineHeight: 17,
  },

  journeyButton: {
    height: 54,
    marginTop: 14,
    borderRadius: 17,
    backgroundColor: "#A78BFA",
    alignItems: "center",
    justifyContent: "center",
  },

  journeyButtonDisabled: {
    opacity: 0.38,
  },

  journeyButtonText: {
    color: "#FFFFFF",
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },

  comingSoon: {
    marginTop: 9,
    textAlign: "center",
    fontSize: 10.5,
    lineHeight: 15,
  },

  pressed: {
    opacity: 0.55,
  },
});
