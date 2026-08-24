import { router } from "expo-router";
import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

export default function KeiseiScreen() {
  return (
    <SafeAreaView style={styles.safeArea}>
      <StatusBar barStyle="dark-content" />

      <ScrollView
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* 뒤로가기 */}
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>‹</Text>
          <Text style={styles.backText}>철도회사</Text>
        </TouchableOpacity>

        {/* 회사 정보 */}
        <View style={styles.header}>
          <Text style={styles.japaneseTitle}>京成電鉄</Text>
          <Text style={styles.koreanTitle}>게이세이 전철</Text>
          <Text style={styles.englishTitle}>KEISEI ELECTRIC RAILWAY</Text>
        </View>

        {/* 운행정보 */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>운행정보</Text>
          <Text style={styles.sectionEnglish}>SERVICE STATUS</Text>

          <View style={styles.statusCard}>
            <View style={styles.statusTop}>
              <View style={styles.statusLabel}>
                <View style={styles.normalIcon} />
                <Text style={styles.statusTitle}>정상운행 중</Text>
              </View>
            </View>

            <Text style={styles.statusDescription}>
              현재 정상적으로 운행하고 있습니다.
            </Text>

            <View style={styles.updatedRow}>
              <Text style={styles.updatedText}>
                마지막 업데이트&nbsp;&nbsp;14:25
              </Text>
            </View>
          </View>
        </View>

        {/* 노선 선택 */}
        <View style={styles.lineSection}>
          <Text style={styles.lineSectionTitle}>노선을 선택하세요</Text>

          <Text style={styles.lineDescription}>
            이용할 게이세이 노선을 선택해 주세요.
          </Text>

          <TouchableOpacity
            activeOpacity={0.7}
            style={styles.lineCard}
            onPress={() => router.push("/keisei/main")}
          >
            <View style={styles.lineLeft}>
              <View style={styles.lineBadge}>
                <Text style={styles.lineBadgeText}>KS</Text>
              </View>

              <View>
                <Text style={styles.lineName}>게이세이 본선</Text>

                <Text style={styles.lineJapanese}>京成本線</Text>
              </View>
            </View>

            <Text style={styles.chevron}>›</Text>
          </TouchableOpacity>
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

  container: {
    paddingHorizontal: 24,
    paddingTop: 36,
    paddingBottom: 50,
  },

  backButton: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginBottom: 44,
  },

  backArrow: {
    fontSize: 30,
    lineHeight: 30,
    fontWeight: "400",
    color: "#171A1F",
    marginRight: 4,
  },

  backText: {
    fontSize: 14,
    fontWeight: "500",
    color: "#747D8C",
  },

  header: {
    marginBottom: 38,
  },

  japaneseTitle: {
    fontSize: 20,
    lineHeight: 26,
    fontWeight: "700",
    color: "#171A1F",
    marginBottom: 7,
  },

  koreanTitle: {
    fontSize: 30,
    lineHeight: 38,
    fontWeight: "800",
    letterSpacing: -0.8,
    color: "#080A0D",
  },

  englishTitle: {
    marginTop: 5,
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "600",
    letterSpacing: 1,
    color: "#9AA4B3",
  },

  section: {
    marginBottom: 26,
  },

  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#171A1F",
  },

  sectionEnglish: {
    marginTop: 3,
    marginBottom: 13,
    fontSize: 9,
    lineHeight: 13,
    fontWeight: "500",
    letterSpacing: 0.5,
    color: "#9AA4B3",
  },

  statusCard: {
    minHeight: 125,
    paddingHorizontal: 18,
    paddingVertical: 17,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",
  },

  statusTop: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  statusLabel: {
    flexDirection: "row",
    alignItems: "center",
  },

  normalIcon: {
    width: 13,
    height: 13,
    borderRadius: 7,
    borderWidth: 3,
    borderColor: "#19A65A",
    marginRight: 12,
  },

  statusTitle: {
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
    color: "#171A1F",
  },

  statusDescription: {
    marginTop: 18,
    fontSize: 12,
    lineHeight: 18,
    fontWeight: "400",
    color: "#333840",
  },

  updatedRow: {
    flexDirection: "row",
    justifyContent: "flex-end",
    marginTop: 13,
  },

  updatedText: {
    fontSize: 10,
    lineHeight: 14,
    color: "#333840",
  },

  lineSection: {
    width: "100%",
  },

  lineSectionTitle: {
    fontSize: 23,
    lineHeight: 30,
    fontWeight: "800",
    letterSpacing: -0.5,
    color: "#171A1F",
  },

  lineDescription: {
    marginTop: 8,
    marginBottom: 19,
    fontSize: 14,
    lineHeight: 20,
    color: "#747D8C",
  },

  lineCard: {
    minHeight: 112,
    paddingHorizontal: 18,
    paddingVertical: 18,
    borderRadius: 20,
    backgroundColor: "#FFFFFF",

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  lineLeft: {
    flexDirection: "row",
    alignItems: "center",
  },

  lineBadge: {
    width: 54,
    height: 54,
    borderWidth: 3,
    borderColor: "#006CB8",
    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 17,
  },

  lineBadgeText: {
    fontSize: 16,
    fontWeight: "800",
    color: "#006CB8",
  },

  lineName: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "700",
    color: "#171A1F",
  },

  lineJapanese: {
    marginTop: 3,
    fontSize: 12,
    lineHeight: 16,
    color: "#747D8C",
  },

  chevron: {
    fontSize: 30,
    lineHeight: 32,
    fontWeight: "300",
    color: "#A4ADBA",
  },
});
