import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

import { useAppTheme } from "../hooks/useAppTheme";

export default function SettingsScreen() {
  const { colors, isDark } = useAppTheme();

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
        {/* ========================================
            Header
        ======================================== */}

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
            <Text
              style={[
                styles.backArrow,
                {
                  color: colors.text,
                },
              ]}
            >
              ‹
            </Text>
          </TouchableOpacity>

          <View style={styles.headerTextArea}>
            <Text
              style={[
                styles.headerTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              설정
            </Text>

            <Text
              style={[
                styles.headerDescription,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              앱 정보와 저장 데이터를 관리합니다.
            </Text>
          </View>
        </View>

        {/* ========================================
            Language
        ======================================== */}

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            언어
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.settingRow}>
              <View
                style={[
                  styles.settingIcon,
                  {
                    backgroundColor: colors.surfaceSecondary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.settingIconText,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  가
                </Text>
              </View>

              <View style={styles.settingInfo}>
                <Text
                  style={[
                    styles.settingTitle,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  표시 언어
                </Text>

                <Text
                  style={[
                    styles.settingDescription,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  현재 한국어를 기본으로 사용합니다.
                </Text>
              </View>

              <View
                style={[
                  styles.valueBadge,
                  {
                    backgroundColor: colors.surfaceSecondary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.valueText,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  한국어
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* ========================================
            Saved data
        ======================================== */}

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            저장 데이터
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.settingRow}
              activeOpacity={0.7}
              onPress={() => router.push("/favorite-stations")}
            >
              <View
                style={[
                  styles.settingIcon,
                  {
                    backgroundColor: colors.surfaceSecondary,
                  },
                ]}
              >
                <Text style={styles.favoriteSettingIcon}>★</Text>
              </View>

              <View style={styles.settingInfo}>
                <Text
                  style={[
                    styles.settingTitle,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  즐겨찾기 관리
                </Text>

                <Text
                  style={[
                    styles.settingDescription,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  저장한 역을 확인하고 관리합니다.
                </Text>
              </View>

              <Text
                style={[
                  styles.chevron,
                  {
                    color: colors.textMuted,
                  },
                ]}
              >
                ›
              </Text>
            </TouchableOpacity>

            <View
              style={[
                styles.divider,
                {
                  backgroundColor: colors.border,
                },
              ]}
            />

            <TouchableOpacity
              style={styles.settingRow}
              activeOpacity={0.7}
              onPress={() => router.push("/recent-stations")}
            >
              <View
                style={[
                  styles.settingIcon,
                  {
                    backgroundColor: colors.surfaceSecondary,
                  },
                ]}
              >
                <Text
                  style={[
                    styles.settingIconText,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  ↻
                </Text>
              </View>

              <View style={styles.settingInfo}>
                <Text
                  style={[
                    styles.settingTitle,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  최근 본 역 관리
                </Text>

                <Text
                  style={[
                    styles.settingDescription,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  최근 확인한 역 기록을 관리합니다.
                </Text>
              </View>

              <Text
                style={[
                  styles.chevron,
                  {
                    color: colors.textMuted,
                  },
                ]}
              >
                ›
              </Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ========================================
            Data source
        ======================================== */}

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            데이터 출처
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.sourceRow}>
              <Text
                style={[
                  styles.sourceName,
                  {
                    color: colors.text,
                  },
                ]}
              >
                JR동일본
              </Text>

              <Text
                style={[
                  styles.sourceValue,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                ODPT
              </Text>
            </View>

            <View
              style={[
                styles.divider,
                {
                  backgroundColor: colors.border,
                },
              ]}
            />

            <View style={styles.sourceRow}>
              <Text
                style={[
                  styles.sourceName,
                  {
                    color: colors.text,
                  },
                ]}
              >
                도에이 지하철
              </Text>

              <Text
                style={[
                  styles.sourceValue,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                ODPT
              </Text>
            </View>

            <View
              style={[
                styles.divider,
                {
                  backgroundColor: colors.border,
                },
              ]}
            />

            <View style={styles.sourceRow}>
              <Text
                style={[
                  styles.sourceName,
                  {
                    color: colors.text,
                  },
                ]}
              >
                게이세이 전철
              </Text>

              <Text
                style={[
                  styles.sourceValue,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                공식 시간표 데이터
              </Text>
            </View>
          </View>
        </View>

        {/* ========================================
            App info
        ======================================== */}

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            앱 정보
          </Text>

          <View
            style={[
              styles.card,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            <View style={styles.appInfoRow}>
              <View
                style={[
                  styles.appLogo,
                  {
                    backgroundColor: isDark ? "#F5F6F8" : "#17191D",
                  },
                ]}
              >
                <Text
                  style={[
                    styles.appLogoText,
                    {
                      color: isDark ? "#111827" : "#FFFFFF",
                    },
                  ]}
                >
                  TR
                </Text>
              </View>

              <View style={styles.appInfoTextArea}>
                <Text
                  style={[
                    styles.appName,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  Tokyo Railway Guide
                </Text>

                <Text
                  style={[
                    styles.appVersion,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  Version 1.0.0
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.divider,
                {
                  backgroundColor: colors.border,
                },
              ]}
            />

            <View style={styles.infoRow}>
              <Text
                style={[
                  styles.infoLabel,
                  {
                    color: colors.textMuted,
                  },
                ]}
              >
                목적
              </Text>

              <Text
                style={[
                  styles.infoValue,
                  {
                    color: colors.text,
                  },
                ]}
              >
                한국인 도쿄 여행객을 위한 철도 안내
              </Text>
            </View>
          </View>
        </View>

        {/* ========================================
            Notice
        ======================================== */}

        <View
          style={[
            styles.noticeCard,
            {
              backgroundColor: isDark ? "#2B271B" : "#FFF8E8",
              borderColor: isDark ? "#494027" : "#F4E5BD",
            },
          ]}
        >
          <Text
            style={[
              styles.noticeTitle,
              {
                color: isDark ? "#E8C86A" : "#8B6508",
              },
            ]}
          >
            이용 안내
          </Text>

          <Text
            style={[
              styles.noticeText,
              {
                color: isDark ? "#CDBB83" : "#92752B",
              },
            ]}
          >
            표시되는 시간표와 운행정보는 실제 상황과 차이가 발생할 수 있습니다.
            열차 이용 전 각 철도사업자의 공식 안내도 함께 확인해 주세요.
          </Text>
        </View>

        {/* ========================================
            Footer
        ======================================== */}

        <View style={styles.footer}>
          <Text
            style={[
              styles.footerTitle,
              {
                color: colors.textMuted,
              },
            ]}
          >
            TOKYO RAILWAY GUIDE
          </Text>

          <Text
            style={[
              styles.footerText,
              {
                color: colors.textMuted,
              },
            ]}
          >
            Made for travelers in Tokyo
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 120,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
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

  backArrow: {
    marginTop: -3,
    fontSize: 31,
    lineHeight: 34,
  },

  headerTextArea: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "900",
  },

  headerDescription: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 17,
  },

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    marginBottom: 11,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },

  card: {
    borderRadius: 22,
    borderWidth: 1,
    overflow: "hidden",
  },

  settingRow: {
    minHeight: 82,
    paddingHorizontal: 16,
    paddingVertical: 14,
    flexDirection: "row",
    alignItems: "center",
  },

  settingIcon: {
    width: 46,
    height: 46,
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  settingIconText: {
    fontSize: 18,
    fontWeight: "900",
  },

  favoriteSettingIcon: {
    fontSize: 18,
    lineHeight: 22,
    color: "#F5B800",
  },

  settingInfo: {
    flex: 1,
  },

  settingTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
  },

  settingDescription: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 16,
  },

  valueBadge: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 11,
  },

  valueText: {
    fontSize: 11,
    fontWeight: "800",
  },

  chevron: {
    marginLeft: 10,
    fontSize: 29,
    lineHeight: 32,
  },

  divider: {
    height: 1,
    marginLeft: 75,
  },

  sourceRow: {
    minHeight: 61,
    paddingHorizontal: 17,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  sourceName: {
    fontSize: 13,
    fontWeight: "700",
  },

  sourceValue: {
    fontSize: 11,
    fontWeight: "600",
  },

  appInfoRow: {
    paddingHorizontal: 17,
    paddingVertical: 18,
    flexDirection: "row",
    alignItems: "center",
  },

  appLogo: {
    width: 54,
    height: 54,
    borderRadius: 17,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  appLogoText: {
    fontSize: 16,
    fontWeight: "900",
  },

  appInfoTextArea: {
    flex: 1,
  },

  appName: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
  },

  appVersion: {
    marginTop: 3,
    fontSize: 11,
  },

  infoRow: {
    paddingHorizontal: 17,
    paddingVertical: 16,
  },

  infoLabel: {
    fontSize: 11,
    fontWeight: "700",
  },

  infoValue: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "700",
  },

  noticeCard: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 20,
    borderWidth: 1,
  },

  noticeTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
  },

  noticeText: {
    marginTop: 7,
    fontSize: 11,
    lineHeight: 18,
  },

  footer: {
    marginTop: 35,
    alignItems: "center",
  },

  footerTitle: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.1,
  },

  footerText: {
    marginTop: 4,
    fontSize: 10,
  },
});
