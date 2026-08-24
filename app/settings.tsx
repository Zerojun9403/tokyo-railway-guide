import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router } from "expo-router";

export default function SettingsScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* ========================================
            Header
        ======================================== */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTextArea}>
            <Text style={styles.headerTitle}>설정</Text>

            <Text style={styles.headerDescription}>
              앱 정보와 저장 데이터를 관리합니다.
            </Text>
          </View>
        </View>

        {/* ========================================
            Language
        ======================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>언어</Text>

          <View style={styles.card}>
            <View style={styles.settingRow}>
              <View style={styles.settingIcon}>
                <Text style={styles.settingIconText}>가</Text>
              </View>

              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>표시 언어</Text>

                <Text style={styles.settingDescription}>
                  현재 한국어를 기본으로 사용합니다.
                </Text>
              </View>

              <View style={styles.valueBadge}>
                <Text style={styles.valueText}>한국어</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ========================================
            Saved data
        ======================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>저장 데이터</Text>

          <View style={styles.card}>
            <TouchableOpacity
              style={styles.settingRow}
              activeOpacity={0.7}
              onPress={() => router.push("/favorite-stations")}
            >
              <View style={styles.settingIcon}>
                <Text style={styles.settingIconText}>★</Text>
              </View>

              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>즐겨찾기 관리</Text>

                <Text style={styles.settingDescription}>
                  저장한 역을 확인하고 관리합니다.
                </Text>
              </View>

              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>

            <View style={styles.divider} />

            <TouchableOpacity
              style={styles.settingRow}
              activeOpacity={0.7}
              onPress={() => router.push("/recent-stations")}
            >
              <View style={styles.settingIcon}>
                <Text style={styles.settingIconText}>↻</Text>
              </View>

              <View style={styles.settingInfo}>
                <Text style={styles.settingTitle}>최근 본 역 관리</Text>

                <Text style={styles.settingDescription}>
                  최근 확인한 역 기록을 관리합니다.
                </Text>
              </View>

              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          </View>
        </View>

        {/* ========================================
            Data source
        ======================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>데이터 출처</Text>

          <View style={styles.card}>
            <View style={styles.sourceRow}>
              <Text style={styles.sourceName}>JR동일본</Text>

              <Text style={styles.sourceValue}>ODPT</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.sourceRow}>
              <Text style={styles.sourceName}>도에이 지하철</Text>

              <Text style={styles.sourceValue}>ODPT</Text>
            </View>

            <View style={styles.divider} />

            <View style={styles.sourceRow}>
              <Text style={styles.sourceName}>게이세이 전철</Text>

              <Text style={styles.sourceValue}>공식 시간표 데이터</Text>
            </View>
          </View>
        </View>

        {/* ========================================
            App info
        ======================================== */}

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>앱 정보</Text>

          <View style={styles.card}>
            <View style={styles.appInfoRow}>
              <View style={styles.appLogo}>
                <Text style={styles.appLogoText}>TR</Text>
              </View>

              <View style={styles.appInfoTextArea}>
                <Text style={styles.appName}>Tokyo Railway Guide</Text>

                <Text style={styles.appVersion}>Version 1.0.0</Text>
              </View>
            </View>

            <View style={styles.divider} />

            <View style={styles.infoRow}>
              <Text style={styles.infoLabel}>목적</Text>

              <Text style={styles.infoValue}>
                한국인 도쿄 여행객을 위한 철도 안내
              </Text>
            </View>
          </View>
        </View>

        {/* ========================================
            Notice
        ======================================== */}

        <View style={styles.noticeCard}>
          <Text style={styles.noticeTitle}>이용 안내</Text>

          <Text style={styles.noticeText}>
            표시되는 시간표와 운행정보는 실제 상황과 차이가 발생할 수 있습니다.
            열차 이용 전 각 철도사업자의 공식 안내도 함께 확인해 주세요.
          </Text>
        </View>

        {/* ========================================
            Footer
        ======================================== */}

        <View style={styles.footer}>
          <Text style={styles.footerTitle}>TOKYO RAILWAY GUIDE</Text>

          <Text style={styles.footerText}>Made for travelers in Tokyo</Text>
        </View>
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
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 70,
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
    backgroundColor: "#FFFFFF",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  backArrow: {
    marginTop: -3,
    fontSize: 31,
    lineHeight: 34,
    color: "#17191D",
  },

  headerTextArea: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 25,
    lineHeight: 31,
    fontWeight: "900",
    color: "#17191D",
  },

  headerDescription: {
    marginTop: 2,
    fontSize: 12,
    lineHeight: 17,
    color: "#8C96A5",
  },

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    marginBottom: 11,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
    color: "#6F7886",
  },

  card: {
    borderRadius: 22,
    backgroundColor: "#FFFFFF",
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
    backgroundColor: "#F1F3F6",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  settingIconText: {
    fontSize: 18,
    fontWeight: "900",
    color: "#596474",
  },

  settingInfo: {
    flex: 1,
  },

  settingTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "800",
    color: "#17191D",
  },

  settingDescription: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 16,
    color: "#929BA8",
  },

  valueBadge: {
    paddingHorizontal: 11,
    paddingVertical: 7,
    borderRadius: 11,
    backgroundColor: "#F1F3F6",
  },

  valueText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#657080",
  },

  chevron: {
    marginLeft: 10,
    fontSize: 29,
    lineHeight: 32,
    color: "#B0B7C2",
  },

  divider: {
    height: 1,
    backgroundColor: "#EEF0F3",
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
    color: "#30343A",
  },

  sourceValue: {
    fontSize: 11,
    fontWeight: "600",
    color: "#8C96A5",
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
    backgroundColor: "#17191D",
    alignItems: "center",
    justifyContent: "center",
    marginRight: 14,
  },

  appLogoText: {
    fontSize: 16,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  appInfoTextArea: {
    flex: 1,
  },

  appName: {
    fontSize: 16,
    lineHeight: 21,
    fontWeight: "900",
    color: "#17191D",
  },

  appVersion: {
    marginTop: 3,
    fontSize: 11,
    color: "#9AA4B3",
  },

  infoRow: {
    paddingHorizontal: 17,
    paddingVertical: 16,
  },

  infoLabel: {
    fontSize: 11,
    fontWeight: "700",
    color: "#9AA4B3",
  },

  infoValue: {
    marginTop: 5,
    fontSize: 13,
    lineHeight: 19,
    fontWeight: "700",
    color: "#454B54",
  },

  noticeCard: {
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 20,
    backgroundColor: "#FFF8E8",
  },

  noticeTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "900",
    color: "#8B6508",
  },

  noticeText: {
    marginTop: 7,
    fontSize: 11,
    lineHeight: 18,
    color: "#92752B",
  },

  footer: {
    marginTop: 35,
    alignItems: "center",
  },

  footerTitle: {
    fontSize: 11,
    fontWeight: "900",
    letterSpacing: 1.1,
    color: "#9AA4B3",
  },

  footerText: {
    marginTop: 4,
    fontSize: 10,
    color: "#B4BBC5",
  },
});
