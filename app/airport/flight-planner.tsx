import { useRouter } from "expo-router";
import {
  ArrowLeft,
  ChevronRight,
  Clock3,
  House,
  MapPin,
  Plane,
} from "lucide-react-native";
import { useMemo, useState } from "react";

import { useAppTheme } from "@/hooks/useAppTheme";
import {
  Platform,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

type AirportId = "narita" | "haneda";

type AirportOption = {
  id: AirportId;
  code: "NRT" | "HND";
  nameKo: string;
  nameJa: string;
};

const AIRPORTS: AirportOption[] = [
  {
    id: "narita",
    code: "NRT",
    nameKo: "나리타 국제공항",
    nameJa: "成田国際空港",
  },
  {
    id: "haneda",
    code: "HND",
    nameKo: "하네다공항",
    nameJa: "羽田空港",
  },
];

const AIRPORT_ARRIVAL_BUFFER_MINUTES = 210;

const formatTime = (hour: number, minute: number) => {
  return `${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}`;
};

const subtractMinutes = (time: string, minutes: number) => {
  const [hour, minute] = time.split(":").map(Number);

  if (
    !Number.isInteger(hour) ||
    !Number.isInteger(minute) ||
    hour < 0 ||
    hour > 23 ||
    minute < 0 ||
    minute > 59
  ) {
    return "--:--";
  }

  const dayMinutes = 24 * 60;

  let totalMinutes = hour * 60 + minute - minutes;
  totalMinutes = ((totalMinutes % dayMinutes) + dayMinutes) % dayMinutes;

  return formatTime(
    Math.floor(totalMinutes / 60),
    totalMinutes % 60,
  );
};

const FlightPlannerScreen = () => {
  const router = useRouter();
  const { colors, isDark } = useAppTheme();

  const [selectedAirport, setSelectedAirport] =
    useState<AirportId>("narita");

  const [flightDepartureTime, setFlightDepartureTime] = useState("13:20");
  const [isEditingTime, setIsEditingTime] = useState(false);
  const [draftFlightTime, setDraftFlightTime] = useState("13:20");
  const [timeError, setTimeError] = useState("");

  const airport = useMemo(
    () =>
      AIRPORTS.find((item) => item.id === selectedAirport) ??
      AIRPORTS[0],
    [selectedAirport],
  );

  const recommendedAirportArrivalTime = useMemo(
    () =>
      subtractMinutes(
        flightDepartureTime,
        AIRPORT_ARRIVAL_BUFFER_MINUTES,
      ),
    [flightDepartureTime],
  );

  const openTimeEditor = () => {
    setDraftFlightTime(flightDepartureTime);
    setTimeError("");
    setIsEditingTime(true);
  };

  const saveFlightTime = () => {
    const match = draftFlightTime.trim().match(/^(\\d{1,2}):(\\d{2})$/);

    if (!match) {
      setTimeError("시간을 HH:MM 형식으로 입력해주세요.");
      return;
    }

    const hour = Number(match[1]);
    const minute = Number(match[2]);

    if (hour < 0 || hour > 23 || minute < 0 || minute > 59) {
      setTimeError("00:00부터 23:59 사이의 시간을 입력해주세요.");
      return;
    }

    const normalized = formatTime(hour, minute);
    setFlightDepartureTime(normalized);
    setDraftFlightTime(normalized);
    setTimeError("");
    setIsEditingTime(false);
  };

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/airport");
  };

  return (
    <SafeAreaView style={[styles.screen, { backgroundColor: colors.background }]}>
      <View style={[styles.header, { backgroundColor: colors.surface, borderBottomColor: colors.border }]}>
        <TouchableOpacity
          style={styles.backButton}
          activeOpacity={0.7}
          onPress={goBack}
        >
          <ArrowLeft size={22} color={colors.text} strokeWidth={1.8} />
        </TouchableOpacity>

        <View style={styles.headerTextArea}>
          <Text style={[styles.headerTitle, { color: colors.text }]}>공항 이동 플래너</Text>
          <Text style={[styles.headerSubtitle, { color: colors.textMuted }]}>
            귀국 항공편에 맞춰 이동 시간을 준비하세요
          </Text>
        </View>
      </View>

      <ScrollView
        style={styles.scrollView}
        contentContainerStyle={styles.content}
        showsVerticalScrollIndicator={false}
      >
        <View style={styles.hero}>
          <View style={styles.heroIcon}>
            <Plane size={24} color="#FFFFFF" strokeWidth={1.8} />
          </View>

          <Text style={styles.heroEyebrow}>AIRPORT JOURNEY</Text>

          <Text style={styles.heroTitle}>
            비행기 시간에 맞춰{"\n"}공항 가는 길을 준비해요
          </Text>

          <Text style={styles.heroDescription}>
            이용할 공항과 항공편 출발시간을 기준으로 공항 도착
            목표시간을 계산합니다.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>이용 공항</Text>

          <View style={styles.airportRow}>
            {AIRPORTS.map((item) => {
              const selected = item.id === selectedAirport;

              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.airportCard,
                    { backgroundColor: colors.surface, borderColor: colors.border },
                    selected && styles.airportCardSelected,
                  ]}
                  activeOpacity={0.75}
                  onPress={() => setSelectedAirport(item.id)}
                >
                  <View style={styles.airportCardTop}>
                    <View
                      style={[
                        styles.airportCodeBadge,
                        { backgroundColor: colors.surfaceSecondary },
                        selected && styles.airportCodeBadgeSelected,
                      ]}
                    >
                      <Text
                        style={[
                          styles.airportCode,
                          selected && styles.airportCodeSelected,
                        ]}
                      >
                        {item.code}
                      </Text>
                    </View>

                    {selected && (
                      <View style={styles.selectedDot} />
                    )}
                  </View>

                  <Text style={[styles.airportNameKo, { color: colors.text }]}>
                    {item.nameKo}
                  </Text>

                  <Text style={[styles.airportNameJa, { color: colors.textMuted }]}>
                    {item.nameJa}
                  </Text>
                </TouchableOpacity>
              );
            })}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>귀국 항공편</Text>

          <TouchableOpacity
            style={[
              styles.infoCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
            activeOpacity={0.75}
            onPress={openTimeEditor}
          >
            <View
              style={[
                styles.infoIcon,
                { backgroundColor: colors.surfaceSecondary },
              ]}
            >
              <Clock3 size={20} color={colors.textSecondary} strokeWidth={1.8} />
            </View>

            <View style={styles.infoTextArea}>
              <Text style={[styles.infoLabel, { color: colors.textMuted }]}>
                항공편 출발시간
              </Text>
              <Text style={[styles.flightTime, { color: colors.text }]}>
                {flightDepartureTime}
              </Text>
            </View>

            <ChevronRight
              size={20}
              color={colors.textMuted}
              strokeWidth={1.8}
            />
          </TouchableOpacity>

          {isEditingTime && (
            <View
              style={[
                styles.timeEditor,
                { backgroundColor: colors.surface, borderColor: colors.border },
              ]}
            >
              <Text
                style={[styles.timeEditorLabel, { color: colors.textSecondary }]}
              >
                항공편 출발시간
              </Text>

              {Platform.OS === "web" ? (
                <input
                  type="time"
                  value={draftFlightTime}
                  onChange={(event) => {
                    setDraftFlightTime(event.currentTarget.value);
                    setTimeError("");
                  }}
                  style={{
                    width: "100%",
                    height: 50,
                    padding: "0 14px",
                    borderRadius: 14,
                    border: `1px solid ${colors.border}`,
                    background: colors.surfaceSecondary,
                    color: colors.text,
                    fontSize: 20,
                    fontWeight: 700,
                    boxSizing: "border-box",
                    colorScheme: isDark ? "dark" : "light",
                  }}
                />
              ) : (
                <TextInput
                  style={[
                    styles.nativeTimeInput,
                    {
                      backgroundColor: colors.surfaceSecondary,
                      borderColor: colors.border,
                      color: colors.text,
                    },
                  ]}
                  value={draftFlightTime}
                  onChangeText={(value) => {
                    setDraftFlightTime(value);
                    setTimeError("");
                  }}
                  placeholder="13:20"
                  placeholderTextColor={colors.textMuted}
                  keyboardType="numbers-and-punctuation"
                  maxLength={5}
                  returnKeyType="done"
                  onSubmitEditing={saveFlightTime}
                />
              )}

              {!!timeError && (
                <Text style={styles.timeError}>{timeError}</Text>
              )}

              <View style={styles.timeEditorActions}>
                <TouchableOpacity
                  style={[
                    styles.timeCancelButton,
                    { backgroundColor: colors.surfaceSecondary },
                  ]}
                  onPress={() => {
                    setDraftFlightTime(flightDepartureTime);
                    setTimeError("");
                    setIsEditingTime(false);
                  }}
                >
                  <Text
                    style={[styles.timeCancelText, { color: colors.textSecondary }]}
                  >
                    취소
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  style={styles.timeSaveButton}
                  onPress={saveFlightTime}
                >
                  <Text style={styles.timeSaveText}>적용</Text>
                </TouchableOpacity>
              </View>
            </View>
          )}

          <Text style={[styles.helperText, { color: colors.textMuted }]}>
            항공편의 현지 출발시간을 선택해주세요.
          </Text>
        </View>

        <View
          style={[
            styles.recommendationCard,
            {
              backgroundColor: isDark ? "#17211D" : "#F5FAF8",
              borderColor: isDark ? "#294038" : "#DCE8E3",
            },
          ]}
        >
          <View style={styles.recommendationHeader}>
            <View style={styles.recommendationIcon}>
              <MapPin size={19} color="#7FAF9B" strokeWidth={2} />
            </View>

            <Text style={styles.recommendationEyebrow}>
              TOKYO RAILWAY GUIDE 추천
            </Text>
          </View>

          <Text style={[styles.recommendationLabel, { color: colors.textSecondary }]}>
            {airport.nameKo} 도착 목표
          </Text>

          <Text style={styles.recommendationTime}>
            {recommendedAirportArrivalTime}
          </Text>

          <Text style={styles.recommendationDescription}>
            항공편 출발 3시간 30분 전을 앱의 권장 공항 도착시간으로
            계산합니다.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={[styles.sectionLabel, { color: colors.textSecondary }]}>숙소에서 공항까지</Text>

          <View
            style={[
              styles.accommodationCard,
              { backgroundColor: colors.surface, borderColor: colors.border },
            ]}
          >
            <View style={styles.accommodationIcon}>
              <House size={20} color="#7FAF9B" strokeWidth={1.8} />
            </View>

            <View style={styles.accommodationTextArea}>
              <Text style={[styles.accommodationTitle, { color: colors.text }]}>
                내 숙소에서 출발
              </Text>

              <Text style={[styles.accommodationDescription, { color: colors.textMuted }]}>
                v3 Journey Engine과 연결하면 숙소에서 몇 시에
                출발해야 하는지 계산합니다.
              </Text>
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.primaryButton}
          activeOpacity={0.8}
          disabled
        >
          <Text style={styles.primaryButtonText}>
            숙소 → 공항 경로 계산
          </Text>
        </TouchableOpacity>

        <Text style={[styles.footerNote, { color: colors.textMuted }]}>
          공항 도착 목표시간은 Tokyo Railway Guide의 여행 계획용
          권장 기준입니다. 실제 탑승 수속 마감시간과 항공사 안내를
          반드시 함께 확인하세요.
        </Text>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FlightPlannerScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: "#F7F8FA",
  },

  header: {
    minHeight: 76,
    paddingHorizontal: 20,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },

  backButton: {
    width: 42,
    height: 42,
    borderRadius: 21,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 10,
  },

  headerTextArea: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#111827",
  },

  headerSubtitle: {
    marginTop: 3,
    fontSize: 12,
    color: "#94A3B8",
  },

  scrollView: {
    flex: 1,
  },

  content: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 44,
  },

  hero: {
    padding: 22,
    borderRadius: 24,
    backgroundColor: "#263238",
  },

  heroIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "rgba(255,255,255,0.12)",
    marginBottom: 18,
  },

  heroEyebrow: {
    fontSize: 11,
    fontWeight: "700",
    letterSpacing: 1.4,
    color: "#A7F3D0",
    marginBottom: 8,
  },

  heroTitle: {
    fontSize: 24,
    lineHeight: 33,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  heroDescription: {
    marginTop: 12,
    fontSize: 14,
    lineHeight: 21,
    color: "#CBD5E1",
  },

  section: {
    marginTop: 28,
  },

  sectionLabel: {
    marginBottom: 12,
    fontSize: 13,
    fontWeight: "700",
    color: "#64748B",
  },

  airportRow: {
    flexDirection: "row",
    gap: 12,
  },

  airportCard: {
    flex: 1,
    minHeight: 132,
    padding: 16,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },

  airportCardSelected: {
    borderColor: "#7FAF9B",
    borderWidth: 1.5,
  },

  airportCardTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 15,
  },

  airportCodeBadge: {
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 9,
    backgroundColor: "#F1F5F9",
  },

  airportCodeBadgeSelected: {
    backgroundColor: "#E7F1ED",
  },

  airportCode: {
    fontSize: 12,
    fontWeight: "800",
    color: "#64748B",
  },

  airportCodeSelected: {
    color: "#557D6C",
  },

  selectedDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: "#7FAF9B",
  },

  airportNameKo: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
  },

  airportNameJa: {
    marginTop: 5,
    fontSize: 12,
    color: "#94A3B8",
  },

  infoCard: {
    minHeight: 82,
    paddingHorizontal: 16,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },

  infoIcon: {
    width: 42,
    height: 42,
    borderRadius: 13,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#F1F5F9",
    marginRight: 13,
  },

  infoTextArea: {
    flex: 1,
  },

  infoLabel: {
    fontSize: 12,
    color: "#94A3B8",
  },

  flightTime: {
    marginTop: 3,
    fontSize: 22,
    fontWeight: "800",
    color: "#1F2937",
  },

  timeEditor: {
    marginTop: 10,
    padding: 16,
    borderRadius: 18,
    borderWidth: 1,
  },

  timeEditorLabel: {
    marginBottom: 10,
    fontSize: 12,
    fontWeight: "700",
  },

  nativeTimeInput: {
    height: 50,
    paddingHorizontal: 14,
    borderRadius: 14,
    borderWidth: 1,
    fontSize: 20,
    fontWeight: "700",
  },

  timeError: {
    marginTop: 8,
    fontSize: 11,
    color: "#EF4444",
  },

  timeEditorActions: {
    marginTop: 12,
    flexDirection: "row",
    justifyContent: "flex-end",
    gap: 8,
  },

  timeCancelButton: {
    minWidth: 72,
    height: 42,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
  },

  timeCancelText: {
    fontSize: 13,
    fontWeight: "700",
  },

  timeSaveButton: {
    minWidth: 72,
    height: 42,
    paddingHorizontal: 16,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 12,
    backgroundColor: "#7FAF9B",
  },

  timeSaveText: {
    fontSize: 13,
    fontWeight: "800",
    color: "#FFFFFF",
  },

  helperText: {
    marginTop: 8,
    marginLeft: 4,
    fontSize: 11,
    color: "#94A3B8",
  },

  recommendationCard: {
    marginTop: 28,
    padding: 22,
    borderRadius: 22,
    borderWidth: 1,
    borderColor: "#DCE8E3",
    backgroundColor: "#F5FAF8",
  },

  recommendationHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  recommendationIcon: {
    width: 34,
    height: 34,
    borderRadius: 11,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E5F0EB",
    marginRight: 10,
  },

  recommendationEyebrow: {
    fontSize: 11,
    fontWeight: "800",
    letterSpacing: 0.6,
    color: "#648675",
  },

  recommendationLabel: {
    marginTop: 20,
    fontSize: 14,
    color: "#64748B",
  },

  recommendationTime: {
    marginTop: 3,
    fontSize: 42,
    lineHeight: 50,
    fontWeight: "800",
    color: "#24352E",
  },

  recommendationDescription: {
    marginTop: 8,
    fontSize: 12,
    lineHeight: 19,
    color: "#789084",
  },

  accommodationCard: {
    padding: 17,
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 18,
    borderWidth: 1,
    borderColor: "#E5E7EB",
    backgroundColor: "#FFFFFF",
  },

  accommodationIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#EDF5F1",
    marginRight: 14,
  },

  accommodationTextArea: {
    flex: 1,
  },

  accommodationTitle: {
    fontSize: 15,
    fontWeight: "700",
    color: "#1F2937",
  },

  accommodationDescription: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
    color: "#94A3B8",
  },

  primaryButton: {
    height: 56,
    marginTop: 26,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#CBD5E1",
  },

  primaryButtonText: {
    fontSize: 15,
    fontWeight: "700",
    color: "#FFFFFF",
  },

  footerNote: {
    marginTop: 16,
    paddingHorizontal: 6,
    fontSize: 11,
    lineHeight: 17,
    textAlign: "center",
    color: "#94A3B8",
  },
});