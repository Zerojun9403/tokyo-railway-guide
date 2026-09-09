import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import { ArrowLeft, Check, Clock3, Sparkles } from "lucide-react-native";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type VersionItem = {
  version: string;
  codename: string;
  description: string;
  status: "released" | "current" | "upcoming";
};

const VERSIONS: VersionItem[] = [
  {
    version: "1.0",
    codename: "GHOST",
    description: "Tokyo Railway Guide의 시작",
    status: "released",
  },
  {
    version: "2.0",
    codename: "WRAITH",
    description: "철도회사 · 노선 확장과 기반 구축",
    status: "released",
  },
  {
    version: "3.0",
    codename: "CULLINAN",
    description: "Realtime Journey Engine",
    status: "current",
  },
  {
    version: "4.0",
    codename: "SPECTRE",
    description: "App Experience · Airport Journey",
    status: "upcoming",
  },
  {
    version: "4.5",
    codename: "PHANTOM AI",
    description: "AI & Smart Journey",
    status: "upcoming",
  },
  {
    version: "5.0",
    codename: "PLATINO",
    description: "iOS Native · Live Activities · Release",
    status: "upcoming",
  },
];

const AboutScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const goBack = () => {
    if (router.canGoBack()) {
      router.back();
      return;
    }

    router.replace("/more");
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
            paddingBottom: Math.max(insets.bottom, 12) + 48,
          },
        ]}
      >
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
            onPress={goBack}
          >
            <ArrowLeft size={20} color={colors.text} strokeWidth={1.8} />
          </TouchableOpacity>

          <View style={styles.headerTextArea}>
            <Text style={[styles.pageTitle, { color: colors.text }]}>
              앱 정보
            </Text>
            <Text style={[styles.pageSubtitle, { color: colors.textSecondary }]}>
              Tokyo Railway Guide
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.currentCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text style={[styles.brandEyebrow, { color: colors.textSecondary }]}>
            TOKYO RAILWAY GUIDE
          </Text>

          <Text style={[styles.brandSlogan, { color: colors.text }]}>
            One Step Closer to Tokyo.
          </Text>
          <Text style={[styles.brandSloganKo, { color: colors.textSecondary }]}>
            도쿄 여행의 모든 순간을, 한 걸음 더 편리하게.
          </Text>

          <View
            style={[
              styles.brandDivider,
              { backgroundColor: colors.border },
            ]}
          />

          <View style={styles.currentVersionRow}>
            <View>
              <Text style={[styles.currentVersion, { color: colors.text }]}>
                Version 3.0
              </Text>
              <Text style={styles.currentCodename}>CULLINAN</Text>
            </View>

            <View style={styles.currentBadge}>
              <Check size={12} color="#FFFFFF" strokeWidth={2.4} />
              <Text style={styles.currentBadgeText}>CURRENT</Text>
            </View>
          </View>

          <Text
            style={[
              styles.currentDescription,
              { color: colors.textSecondary },
            ]}
          >
            실제 열차 데이터를 이용해 여행자가 지금 어떤 열차를 타야 하는지
            안내하는 Journey Engine 버전입니다.
          </Text>
        </View>

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            VERSION HISTORY
          </Text>
          <Text style={[styles.sectionDescription, { color: colors.textMuted }]}>
            Tokyo Railway Guide의 개발 기록
          </Text>
        </View>

        <View
          style={[
            styles.timeline,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          {VERSIONS.map((item, index) => {
            const upcoming = item.status === "upcoming";
            const current = item.status === "current";
            const last = index === VERSIONS.length - 1;

            return (
              <View
                key={`${item.version}-${item.codename}`}
                style={[
                  styles.versionRow,
                  !last && {
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: colors.border,
                  },
                  upcoming && styles.upcoming,
                ]}
              >
                <View style={styles.versionMarkerArea}>
                  <View
                    style={[
                      styles.versionDot,
                      {
                        backgroundColor: current
                          ? "#A78BFA"
                          : upcoming
                            ? colors.textMuted
                            : "#7FAF9B",
                      },
                    ]}
                  />
                </View>

                <View style={styles.versionContent}>
                  <View style={styles.versionTitleRow}>
                    <Text
                      style={[
                        styles.versionNumber,
                        { color: colors.textSecondary },
                      ]}
                    >
                      {item.version}
                    </Text>
                    <Text
                      style={[
                        styles.versionCodename,
                        { color: colors.text },
                      ]}
                    >
                      {item.codename}
                    </Text>

                    {current && (
                      <View style={styles.smallCurrentBadge}>
                        <Text style={styles.smallCurrentBadgeText}>CURRENT</Text>
                      </View>
                    )}

                    {upcoming && (
                      <View
                        style={[
                          styles.upcomingBadge,
                          { backgroundColor: colors.surfaceSecondary },
                        ]}
                      >
                        <Clock3
                          size={10}
                          color={colors.textMuted}
                          strokeWidth={1.8}
                        />
                        <Text
                          style={[
                            styles.upcomingBadgeText,
                            { color: colors.textMuted },
                          ]}
                        >
                          UPCOMING
                        </Text>
                      </View>
                    )}
                  </View>

                  <Text
                    style={[
                      styles.versionDescription,
                      { color: colors.textSecondary },
                    ]}
                  >
                    {item.description}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>

        <View style={styles.futureNote}>
          <Sparkles size={15} color={colors.textMuted} strokeWidth={1.7} />
          <Text style={[styles.futureNoteText, { color: colors.textMuted }]}>
            흐리게 표시된 버전은 앞으로 개발될 예정입니다.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AboutScreen;

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
    marginBottom: 28,
  },

  backButton: {
    width: 42,
    height: 42,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 14,
    borderWidth: 1,
    marginRight: 14,
  },

  headerTextArea: {
    flex: 1,
  },

  pageTitle: {
    fontSize: 24,
    lineHeight: 31,
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  pageSubtitle: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 17,
  },

  currentCard: {
    padding: 22,
    borderRadius: 22,
    borderWidth: 1,
  },

  brandEyebrow: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
    letterSpacing: 1.1,
  },

  brandSlogan: {
    marginTop: 15,
    fontSize: 20,
    lineHeight: 27,
    fontWeight: "700",
    letterSpacing: -0.35,
  },

  brandSloganKo: {
    marginTop: 5,
    fontSize: 11.5,
    lineHeight: 18,
  },

  brandDivider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    marginTop: 19,
    marginBottom: 2,
  },

  currentVersionRow: {
    marginTop: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 12,
  },

  currentVersion: {
    fontSize: 22,
    lineHeight: 29,
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  currentCodename: {
    marginTop: 2,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "800",
    letterSpacing: 1.2,
    color: "#A78BFA",
  },

  currentBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
    paddingHorizontal: 10,
    height: 27,
    borderRadius: 999,
    backgroundColor: "#7FAF9B",
  },

  currentBadgeText: {
    fontSize: 9.5,
    lineHeight: 13,
    fontWeight: "800",
    color: "#FFFFFF",
    letterSpacing: 0.5,
  },

  currentDescription: {
    marginTop: 16,
    fontSize: 12.5,
    lineHeight: 20,
  },

  sectionHeader: {
    marginTop: 34,
    marginBottom: 12,
  },

  sectionTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "700",
    letterSpacing: 0.4,
  },

  sectionDescription: {
    marginTop: 3,
    fontSize: 11.5,
    lineHeight: 17,
  },

  timeline: {
    borderRadius: 20,
    borderWidth: 1,
    overflow: "hidden",
  },

  versionRow: {
    minHeight: 82,
    flexDirection: "row",
    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  upcoming: {
    opacity: 0.38,
  },

  versionMarkerArea: {
    width: 24,
    paddingTop: 6,
  },

  versionDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },

  versionContent: {
    flex: 1,
  },

  versionTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
    gap: 7,
  },

  versionNumber: {
    minWidth: 27,
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "700",
  },

  versionCodename: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "800",
    letterSpacing: 0.6,
  },

  versionDescription: {
    marginTop: 6,
    fontSize: 11.5,
    lineHeight: 17,
  },

  smallCurrentBadge: {
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 999,
    backgroundColor: "rgba(167, 139, 250, 0.16)",
  },

  smallCurrentBadgeText: {
    fontSize: 8.5,
    lineHeight: 11,
    fontWeight: "800",
    color: "#A78BFA",
    letterSpacing: 0.4,
  },

  upcomingBadge: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 999,
  },

  upcomingBadgeText: {
    fontSize: 8,
    lineHeight: 11,
    fontWeight: "700",
    letterSpacing: 0.35,
  },

  futureNote: {
    marginTop: 14,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    paddingHorizontal: 4,
  },

  futureNoteText: {
    flex: 1,
    fontSize: 10.5,
    lineHeight: 16,
  },
});
