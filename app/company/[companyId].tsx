import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

/*
 * =========================================================
 * 노선 타입
 * =========================================================
 */

type RailwayLine = {
  id: string;

  nameKo: string;
  nameJa: string;

  code: string;

  color: string;

  description: string;
};

/*
 * =========================================================
 * 철도회사 타입
 * =========================================================
 */

type RailwayCompany = {
  id: string;

  nameKo: string;
  nameJa: string;

  description: string;

  color: string;

  badge: string;

  lines: RailwayLine[];
};

/*
 * =========================================================
 * 철도회사 / 노선 데이터
 * =========================================================
 */

const RAILWAY_COMPANIES: Record<string, RailwayCompany> = {
  /*
   * =======================================================
   * JR 동일본
   * =======================================================
   */

  "jr-east": {
    id: "jr-east",

    nameKo: "JR동일본",
    nameJa: "JR東日本",

    description: "도쿄와 수도권을 연결하는 JR동일본 주요 노선",

    color: "#80C41C",

    badge: "JR",

    lines: [
      /*
       * JY 야마노테선
       */

      {
        id: "yamanote",

        nameKo: "야마노테선",
        nameJa: "山手線",

        code: "JY",

        color: "#80C41C",

        description: "도쿄 도심을 순환하는 대표 노선",
      },

      /*
       * JC 주오선 쾌속
       */

      {
        id: "chuo-rapid",

        nameKo: "주오선 쾌속",
        nameJa: "中央線快速",

        code: "JC",

        color: "#F15A22",

        description: "도쿄 · 신주쿠 · 다치카와 · 다카오",
      },

      /*
       * JB 주오·소부선 각역정차
       */

      {
        id: "chuo-sobu-local",

        nameKo: "주오·소부선 각역정차",
        nameJa: "中央・総武線各駅停車",

        code: "JB",

        color: "#FFD400",

        description: "미타카 · 신주쿠 · 아키하바라 · 지바",
      },

      /*
       * JK 게이힌도호쿠·네기시선
       */

      {
        id: "keihin-tohoku",

        nameKo: "게이힌도호쿠·네기시선",
        nameJa: "京浜東北・根岸線",

        code: "JK",

        color: "#00A7DB",

        description: "오미야 · 우에노 · 도쿄 · 요코하마 · 오후나",
      },
    ],
  },

  /*
   * =======================================================
   * 도쿄메트로
   * =======================================================
   */

  "tokyo-metro": {
    id: "tokyo-metro",

    nameKo: "도쿄메트로",
    nameJa: "東京メトロ",

    description: "도쿄 도심을 연결하는 주요 지하철 노선",

    color: "#00A4E0",

    badge: "M",

    lines: [
      /*
       * G 긴자선
       */

      {
        id: "ginza",

        nameKo: "긴자선",
        nameJa: "銀座線",

        code: "G",

        color: "#F39700",

        description: "시부야 · 긴자 · 우에노 · 아사쿠사",
      },

      {
        id: "marunouchi",

        nameKo: "마루노우치선",
        nameJa: "丸ノ内線",

        code: "M",

        color: "#F62E36",

        description: "오기쿠보 · 신주쿠 · 도쿄 · 이케부쿠로",
      },
      {
        id: "hibiya",
        code: "H",
        nameKo: "히비야선",
        nameJa: "日比谷線",
        color: "#B5B5AC",
        description: "나카메구로 · 긴자 · 우에노 · 기타센주",
      },

      /*
       * 다음에 추가
       *
       * M 마루노우치선
       * H 히비야선
       * T 도자이선
       * C 지요다선
       * Y 유라쿠초선
       * Z 한조몬선
       * N 난보쿠선
       * F 후쿠토신선
       */
    ],
  },

  /*
   * =======================================================
   * 게이세이
   * =======================================================
   */

  keisei: {
    id: "keisei",

    nameKo: "게이세이 전철",
    nameJa: "京成電鉄",

    description: "도쿄와 나리타공항을 연결하는 주요 사철",

    color: "#005AAA",

    badge: "KS",

    lines: [
      {
        id: "keisei-main",

        nameKo: "게이세이 본선",
        nameJa: "京成本線",

        code: "KS",

        color: "#005AAA",

        description: "게이세이우에노 · 닛포리 · 나리타공항",
      },
    ],
  },

  /*
   * =======================================================
   * 도에이
   * =======================================================
   */

  toei: {
    id: "toei",

    nameKo: "도에이 지하철",
    nameJa: "都営地下鉄",

    description: "도쿄도가 운영하는 지하철",

    color: "#CE045B",

    badge: "E",

    lines: [
      {
        id: "oedo",

        nameKo: "오에도선",
        nameJa: "大江戸線",

        code: "E",

        color: "#CE045B",

        description: "신주쿠 · 롯폰기 · 다이몬 · 료고쿠",
      },
    ],
  },
};

/*
 * =========================================================
 * Company Screen
 * =========================================================
 */

export default function CompanyScreen() {
  /*
   * =======================================================
   * URL
   * =======================================================
   */

  const { companyId } = useLocalSearchParams<{
    companyId: string;
  }>();

  /*
   * =======================================================
   * 회사 찾기
   * =======================================================
   */

  const company = RAILWAY_COMPANIES[companyId];

  /*
   * =======================================================
   * 없는 회사
   * =======================================================
   */

  if (!company) {
    return (
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.notFoundContainer}>
          <Text style={styles.notFoundTitle}>철도회사를 찾을 수 없습니다.</Text>

          <Text style={styles.notFoundDescription}>
            companyId: {String(companyId)}
          </Text>

          <TouchableOpacity
            style={styles.notFoundButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text style={styles.notFoundButtonText}>이전 화면으로</Text>
          </TouchableOpacity>
        </View>
      </SafeAreaView>
    );
  }

  /*
   * =======================================================
   * 노선 이동
   * =======================================================
   */

  const handlePressLine = (lineId: string) => {
    router.push({
      pathname: "/line/[lineId]",

      params: {
        lineId,
      },
    });
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* =================================================
            뒤로가기
        ================================================= */}

        <TouchableOpacity
          style={styles.backArea}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Text style={styles.backArrow}>‹</Text>

          <Text style={styles.backText}>철도회사</Text>
        </TouchableOpacity>

        {/* =================================================
            회사 Header
        ================================================= */}

        <View style={styles.header}>
          <View
            style={[
              styles.companyBadge,

              {
                backgroundColor: company.color,
              },
            ]}
          >
            <Text style={styles.companyBadgeText}>{company.badge}</Text>
          </View>

          <View style={styles.headerTextArea}>
            <Text style={styles.companyNameKo}>{company.nameKo}</Text>

            <Text style={styles.companyNameJa}>{company.nameJa}</Text>
          </View>
        </View>

        <Text style={styles.companyDescription}>{company.description}</Text>

        {/* =================================================
            노선 선택
        ================================================= */}

        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>노선 선택</Text>

          <Text style={styles.sectionDescription}>
            이용할 노선을 선택하세요.
          </Text>
        </View>

        {/* =================================================
            노선 카드
        ================================================= */}

        <View style={styles.lineList}>
          {company.lines.map((line) => (
            <TouchableOpacity
              key={line.id}
              style={styles.lineCard}
              activeOpacity={0.7}
              onPress={() => handlePressLine(line.id)}
            >
              <View
                style={[
                  styles.lineBadge,

                  {
                    backgroundColor: line.color,
                  },
                ]}
              >
                <Text style={styles.lineBadgeText}>{line.code}</Text>
              </View>

              <View style={styles.lineInfo}>
                <Text style={styles.lineNameKo}>{line.nameKo}</Text>

                <Text style={styles.lineNameJa}>{line.nameJa}</Text>

                <Text style={styles.lineDescription}>{line.description}</Text>
              </View>

              <Text style={styles.chevron}>›</Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* =================================================
            Footer
        ================================================= */}

        <View style={styles.footer}>
          <Text style={styles.footerText}>{company.nameKo}</Text>

          <Text style={styles.footerSubText}>Tokyo Railway Guide</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/*
 * =========================================================
 * Styles
 * =========================================================
 */

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
    paddingHorizontal: 24,

    paddingTop: 22,

    paddingBottom: 70,
  },

  backArea: {
    flexDirection: "row",

    alignItems: "center",

    alignSelf: "flex-start",

    marginBottom: 32,
  },

  backArrow: {
    marginRight: 5,

    fontSize: 34,

    lineHeight: 34,

    color: "#17191D",
  },

  backText: {
    fontSize: 15,

    lineHeight: 20,

    fontWeight: "600",

    color: "#7D8796",
  },

  header: {
    flexDirection: "row",

    alignItems: "center",
  },

  companyBadge: {
    width: 64,

    height: 64,

    borderRadius: 20,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 16,
  },

  companyBadgeText: {
    fontSize: 18,

    lineHeight: 23,

    fontWeight: "900",

    color: "#FFFFFF",
  },

  headerTextArea: {
    flex: 1,
  },

  companyNameKo: {
    fontSize: 28,

    lineHeight: 34,

    fontWeight: "900",

    color: "#17191D",
  },

  companyNameJa: {
    marginTop: 2,

    fontSize: 13,

    lineHeight: 18,

    color: "#8C96A5",
  },

  companyDescription: {
    marginTop: 18,

    fontSize: 14,

    lineHeight: 21,

    color: "#7D8796",
  },

  sectionHeader: {
    marginTop: 37,

    marginBottom: 15,
  },

  sectionTitle: {
    fontSize: 21,

    lineHeight: 27,

    fontWeight: "900",

    color: "#17191D",
  },

  sectionDescription: {
    marginTop: 4,

    fontSize: 12,

    lineHeight: 17,

    color: "#9AA4B3",
  },

  lineList: {
    gap: 12,
  },

  lineCard: {
    minHeight: 104,

    paddingHorizontal: 16,

    paddingVertical: 16,

    borderRadius: 22,

    backgroundColor: "#FFFFFF",

    flexDirection: "row",

    alignItems: "center",
  },

  lineBadge: {
    width: 58,

    height: 58,

    borderRadius: 18,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 15,
  },

  lineBadgeText: {
    fontSize: 16,

    lineHeight: 21,

    fontWeight: "900",

    color: "#FFFFFF",
  },

  lineInfo: {
    flex: 1,

    minWidth: 0,
  },

  lineNameKo: {
    fontSize: 17,

    lineHeight: 22,

    fontWeight: "900",

    color: "#17191D",
  },

  lineNameJa: {
    marginTop: 1,

    fontSize: 11,

    lineHeight: 15,

    color: "#9AA4B3",
  },

  lineDescription: {
    marginTop: 6,

    fontSize: 11,

    lineHeight: 16,

    color: "#717B88",
  },

  chevron: {
    marginLeft: 10,

    fontSize: 30,

    lineHeight: 32,

    color: "#B0B7C2",
  },

  footer: {
    marginTop: 42,

    alignItems: "center",
  },

  footerText: {
    fontSize: 12,

    lineHeight: 17,

    fontWeight: "800",

    color: "#9AA4B3",
  },

  footerSubText: {
    marginTop: 3,

    fontSize: 10,

    lineHeight: 14,

    color: "#B7BDC6",
  },

  notFoundContainer: {
    flex: 1,

    paddingHorizontal: 24,

    alignItems: "center",

    justifyContent: "center",
  },

  notFoundTitle: {
    fontSize: 21,

    lineHeight: 27,

    fontWeight: "900",

    color: "#17191D",

    textAlign: "center",
  },

  notFoundDescription: {
    marginTop: 8,

    fontSize: 13,

    lineHeight: 18,

    color: "#8C96A5",
  },

  notFoundButton: {
    marginTop: 24,

    paddingHorizontal: 18,

    paddingVertical: 12,

    borderRadius: 13,

    backgroundColor: "#17191D",
  },

  notFoundButtonText: {
    fontSize: 13,

    fontWeight: "800",

    color: "#FFFFFF",
  },
});
