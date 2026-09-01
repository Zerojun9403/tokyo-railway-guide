import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";

import { useAppTheme } from "../../hooks/useAppTheme";

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
      {
        id: "tozai",
        code: "T",
        nameKo: "도자이선",
        nameJa: "東西線",
        color: "#009BBF",
        description: "나카노 · 다카다노바바 · 오테마치 · 니시후나바시",
      },
      {
        id: "chiyoda",
        code: "C",
        nameKo: "치요다선",
        nameJa: "千代田線",
        color: "#00BB85",
        description:
          "요요기우에하라 · 오모테산도 · 오테마치 · 기타센주 · 기타아야세",
      },

      {
        id: "yurakucho",
        code: "Y",
        nameKo: "유라쿠초선",
        nameJa: "有楽町線",
        color: "#C1A470",
        description: "와코시 · 이케부쿠로 · 유라쿠초 · 도요스 · 신키바",
      },
      {
        id: "hanzomon",
        code: "Z",
        nameKo: "한조몬선",
        nameJa: "半蔵門線",
        color: "#8F76D6",
        description: "시부야 · 오모테산도 · 오테마치 · 긴시초 · 오시아게",
      },
      {
        id: "namboku",
        code: "N",
        nameKo: "난보쿠선",
        nameJa: "南北線",
        color: "#00AC9B",
        description:
          "메구로 · 아자부주반 · 나가타초 · 고마고메 · 아카바네이와부치",
      },
      {
        id: "fukutoshin",
        code: "F",
        nameKo: "후쿠토신선",
        nameJa: "副都心線",
        color: "#9C5E31",
        description: "와코시 · 이케부쿠로 · 신주쿠산초메 · 시부야",
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
   * 게이큐 전철
   * =======================================================
   */

  keikyu: {
    id: "keikyu",

    nameKo: "게이큐 전철",
    nameJa: "京浜急行電鉄",

    description:
      "도쿄 도심과 요코하마 · 요코스카 · 하네다공항을 연결하는 주요 사철",

    color: "#00BFFF",

    badge: "KK",

    lines: [
      {
        id: "keikyu-main",

        nameKo: "게이큐 본선",
        nameJa: "京急本線",

        code: "KK",

        color: "#00BFFF",

        description: "시나가와 · 게이큐카마타 · 요코하마 · 요코스카 · 우라가",
      },

      {
        id: "keikyu-airport",

        nameKo: "게이큐 공항선",
        nameJa: "京急空港線",

        code: "KK",

        color: "#00BFFF",

        description: "게이큐카마타 · 덴쿠바시 · 하네다공항",
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

      {
        id: "asakusa",
        code: "A",
        nameKo: "도에이 아사쿠사선",
        nameJa: "都営浅草線",
        color: "#E85298",
        description: "니시마고메 · 센가쿠지 · 신바시 · 아사쿠사 · 오시아게",
      },

      {
        id: "mita",
        code: "I",
        nameKo: "도에이 미타선",
        nameJa: "都営三田線",
        color: "#0079C2",
        description:
          "메구로 · 미타 · 히비야 · 오테마치 · 스가모 · 니시타카시마다이라",
      },
      {
        id: "shinjuku",
        code: "S",
        nameKo: "도에이 신주쿠선",
        nameJa: "都営新宿線",
        color: "#6CBB5A",
        description:
          "신주쿠 · 이치가야 · 진보초 · 모리시타 · 오지마 · 모토야와타",
      },
    ],
  },

  /*
   * =======================================================
   * 세이부 철도
   * =======================================================
   */

  seibu: {
  id: "seibu",
  nameKo: "세이부 철도",
  nameJa: "西武鉄道",
  description: "이케부쿠로와 도쿄 서북부 · 사이타마 방면을 연결하는 주요 사철",
  color: "#EF7A00",
  badge: "SI",
  lines: [
    {
      id: "seibu-ikebukuro",
      nameKo: "세이부 이케부쿠로선",
      nameJa: "西武池袋線",
      code: "SI",
      color: "#EF7A00",
      description: "이케부쿠로 · 네리마 · 토코로자와 · 한노 · 아가노",
    },
    {
      id: "seibu-shinjuku",
      nameKo: "세이부 신주쿠선",
      nameJa: "西武新宿線",
      code: "SS",
      color: "#00A6BF",
      description: "세이부신주쿠 · 다카다노바바 · 도코로자와 · 혼카와고에",
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
  const { colors } = useAppTheme();

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
      <SafeAreaView
        style={[
          styles.safeArea,
          {
            backgroundColor: colors.background,
          },
        ]}
      >
        <View style={styles.notFoundContainer}>
          <Text
            style={[
              styles.notFoundTitle,
              {
                color: colors.text,
              },
            ]}
          >
            철도회사를 찾을 수 없습니다.
          </Text>

          <Text
            style={[
              styles.notFoundDescription,
              {
                color: colors.textMuted,
              },
            ]}
          >
            companyId: {String(companyId)}
          </Text>

          <TouchableOpacity
            style={[
              styles.notFoundButton,
              {
                backgroundColor: colors.surface,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text
              style={[
                styles.notFoundButtonText,
                {
                  color: colors.text,
                },
              ]}
            >
              이전 화면으로
            </Text>
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
        {/* =================================================
            뒤로가기
        ================================================= */}

        <TouchableOpacity
          style={styles.backArea}
          activeOpacity={0.7}
          onPress={() => router.back()}
        >
          <Text style={[styles.backArrow, { color: colors.text }]}>‹</Text>

          <Text style={[styles.backText, { color: colors.textSecondary }]}>
            철도회사
          </Text>
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
            <Text style={[styles.companyNameKo, { color: colors.text }]}>
              {company.nameKo}
            </Text>

            <Text style={[styles.companyNameJa, { color: colors.textMuted }]}>
              {company.nameJa}
            </Text>
          </View>
        </View>

        <Text
          style={[styles.companyDescription, { color: colors.textSecondary }]}
        >
          {company.description}
        </Text>

        {/* =================================================
            노선 선택
        ================================================= */}

        <View style={styles.sectionHeader}>
          <Text style={[styles.sectionTitle, { color: colors.text }]}>
            노선 선택
          </Text>

          <Text
            style={[styles.sectionDescription, { color: colors.textMuted }]}
          >
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
              style={[styles.lineCard, { backgroundColor: colors.surface }]}
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
                <Text style={[styles.lineNameKo, { color: colors.text }]}>
                  {line.nameKo}
                </Text>

                <Text style={[styles.lineNameJa, { color: colors.textMuted }]}>
                  {line.nameJa}
                </Text>

                <Text
                  style={[
                    styles.lineDescription,
                    { color: colors.textSecondary },
                  ]}
                >
                  {line.description}
                </Text>
              </View>

              <Text style={[styles.chevron, { color: colors.textMuted }]}>
                ›
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* =================================================
            Footer
        ================================================= */}

        <View style={styles.footer}>
          <Text style={[styles.footerText, { color: colors.textMuted }]}>
            {company.nameKo}
          </Text>

          <Text style={[styles.footerSubText, { color: colors.textMuted }]}>
            Tokyo Railway Guide
          </Text>
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

    paddingBottom: 120,
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
