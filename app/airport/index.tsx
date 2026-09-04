import { useAppTheme } from "@/hooks/useAppTheme";
import { Href, useRouter } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  Info,
  Plane,
} from "lucide-react-native";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type AirportItemProps = {
  code: string;
  title: string;
  japaneseName: string;
  description: string;
  route: Href;
  textColor: string;
  secondaryTextColor: string;
  borderColor: string;
};

const AirportItem = ({
  code,
  title,
  japaneseName,
  description,
  route,
  textColor,
  secondaryTextColor,
  borderColor,
}: AirportItemProps) => {
  const router = useRouter();

  return (
    <Pressable
      onPress={() => router.push(route)}
      style={({ pressed }) => [
        styles.airportItem,
        {
          borderBottomColor: borderColor,
        },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.codeArea}>
        <Text style={styles.airportCode}>{code}</Text>
      </View>

      <View style={styles.airportContent}>
        <Text
          style={[
            styles.airportTitle,
            {
              color: textColor,
            },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.japaneseName,
            {
              color: secondaryTextColor,
            },
          ]}
        >
          {japaneseName}
        </Text>

        <Text
          style={[
            styles.airportDescription,
            {
              color: secondaryTextColor,
            },
          ]}
        >
          {description}
        </Text>
      </View>

      <ChevronRight
        size={19}
        color={secondaryTextColor}
        strokeWidth={1.7}
      />
    </Pressable>
  );
};

const AirportGuideScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

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

          <Text
            style={[
              styles.headerTitle,
              {
                color: colors.text,
              },
            ]}
          >
            공항까지 가는 길
          </Text>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <View style={styles.introIcon}>
            <Plane
              size={23}
              color="#A78BFA"
              strokeWidth={1.7}
            />
          </View>

          <View style={styles.introContent}>
            <Text
              style={[
                styles.pageTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              어느 공항으로 가시나요?
            </Text>

            <Text
              style={[
                styles.pageDescription,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              나리타공항과 하네다공항은 이용할 수 있는 철도와 이동 방법이
              다릅니다. 이용할 공항을 선택하세요.
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

        {/* Airport List */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            도쿄 주요 공항
          </Text>

          <View style={styles.airportList}>
            <AirportItem
              code="NRT"
              title="나리타 국제공항"
              japaneseName="成田国際空港"
              description="나리타 익스프레스 · 스카이라이너 · 게이세이선"
              route="/airport/narita"
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />

            <AirportItem
              code="HND"
              title="하네다공항"
              japaneseName="羽田空港"
              description="게이큐선 · 도쿄 모노레일"
              route="/airport/haneda"
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />
          </View>
        </View>

        {/* Quick Guide */}
        <View
          style={[
            styles.quickGuide,
            {
              borderTopColor: colors.border,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <View style={styles.quickGuideHeader}>
            <Info
              size={18}
              color="#7FAF9B"
              strokeWidth={1.8}
            />

            <Text
              style={[
                styles.quickGuideTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              어떤 교통수단을 골라야 할까요?
            </Text>
          </View>

          <Text
            style={[
              styles.quickGuideDescription,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            가장 빠른 열차가 항상 가장 편리한 것은 아닙니다. 숙소와 가까운
            역, 환승 횟수, 짐의 양 등을 함께 확인하면 더 편하게 이동할 수
            있습니다.
          </Text>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Text
            style={[
              styles.footerText,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            운행 정보와 이용 조건은 변경될 수 있습니다. 실제 이용 전 해당
            교통기관의 최신 안내를 함께 확인하세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default AirportGuideScreen;

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

  sectionTitle: {
    marginBottom: 8,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },

  airportList: {
    width: "100%",
  },

  airportItem: {
    minHeight: 102,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  codeArea: {
    width: 62,
    alignSelf: "stretch",
    justifyContent: "center",
  },

  airportCode: {
    color: "#A78BFA",
    fontSize: 13,
    fontWeight: "700",
    letterSpacing: 0.5,
  },

  airportContent: {
    flex: 1,
    paddingVertical: 17,
    paddingRight: 12,
  },

  airportTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "700",
    letterSpacing: -0.2,
  },

  japaneseName: {
    marginTop: 2,
    fontSize: 11,
    lineHeight: 16,
  },

  airportDescription: {
    marginTop: 6,
    fontSize: 12,
    lineHeight: 18,
  },

  quickGuide: {
    marginTop: 32,
    paddingVertical: 22,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  quickGuideHeader: {
    flexDirection: "row",
    alignItems: "center",
  },

  quickGuideTitle: {
    marginLeft: 14,
    fontSize: 14,
    fontWeight: "700",
    letterSpacing: -0.2,
  },

  quickGuideDescription: {
    marginTop: 12,
    marginLeft: 32,
    fontSize: 12,
    lineHeight: 19,
  },

  footer: {
    paddingTop: 24,
    paddingLeft: 46,
  },

  footerText: {
    fontSize: 11,
    lineHeight: 17,
  },

  pressed: {
    opacity: 0.5,
  },
});