import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  Check,
  ChevronLeft,
  CircleDot,
  Info,
  MapPin,
  Signpost,
} from "lucide-react-native";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type StepProps = {
  number: string;
  title: string;
  description: string;
  textColor: string;
  secondaryTextColor: string;
};

const Step = ({
  number,
  title,
  description,
  textColor,
  secondaryTextColor,
}: StepProps) => {
  return (
    <View style={styles.step}>
      <View style={styles.stepNumberArea}>
        <Text style={styles.stepNumber}>{number}</Text>
      </View>

      <View style={styles.stepContent}>
        <Text style={[styles.stepTitle, { color: textColor }]}>
          {title}
        </Text>

        <Text
          style={[
            styles.stepDescription,
            { color: secondaryTextColor },
          ]}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};

const PlatformGuideScreen = () => {
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

          <Text style={[styles.headerTitle, { color: colors.text }]}>
            승강장 찾는 방법
          </Text>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.guideNumber}>02</Text>

          <Text style={[styles.pageTitle, { color: colors.text }]}>
            어떤 승강장으로 가야 할까요?
          </Text>

          <Text
            style={[
              styles.pageDescription,
              { color: colors.textSecondary },
            ]}
          >
            일본어 역명을 모두 읽지 못해도 괜찮아요. 노선기호와 역번호,
            방면 표시를 확인하면 원하는 승강장을 훨씬 쉽게 찾을 수 있습니다.
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Basic steps */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Signpost
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
                안내 표지판을 확인하세요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                노선 · 역번호 · 방면 순서로 확인
              </Text>
            </View>
          </View>

          <View style={styles.steps}>
            <Step
              number="1"
              title="이용할 노선을 찾으세요"
              description="역 안의 안내 표지판에서 이용하려는 노선의 이름과 노선색을 확인합니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="2"
              title="노선기호를 확인하세요"
              description="JY, G, M처럼 노선을 나타내는 영문 기호를 확인하면 복잡한 역에서도 노선을 구분하기 쉽습니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="3"
              title="역번호를 확인하세요"
              description="노선기호 뒤의 숫자를 함께 확인하세요. 예를 들어 JY17처럼 표시됩니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="4"
              title="어느 방면인지 확인하세요"
              description="승강장 번호만 보지 말고 목적지 방향의 주요 역과 행선지 안내를 함께 확인합니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="5"
              title="승강장 번호를 따라 이동하세요"
              description="방향을 확인했다면 안내 표지판의 승강장 번호를 따라 이동합니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />
          </View>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Station numbering */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CircleDot
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
                역번호를 활용하세요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                일본어를 몰라도 역을 구분할 수 있어요
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.stationExample,
              {
                borderTopColor: colors.border,
                borderBottomColor: colors.border,
              },
            ]}
          >
            <View style={styles.stationCode}>
              <Text style={styles.stationCodeLine}>JY</Text>
              <Text style={styles.stationCodeNumber}>17</Text>
            </View>

            <View style={styles.stationExampleText}>
              <Text
                style={[
                  styles.stationName,
                  { color: colors.text },
                ]}
              >
                신주쿠
              </Text>

              <Text
                style={[
                  styles.stationDescription,
                  { color: colors.textSecondary },
                ]}
              >
                JY = 야마노테선{"\n"}
                17 = 해당 노선의 역번호
              </Text>
            </View>
          </View>

          <View style={styles.tipRow}>
            <MapPin
              size={17}
              color={colors.textSecondary}
              strokeWidth={1.7}
            />

            <Text
              style={[
                styles.tipText,
                { color: colors.textSecondary },
              ]}
            >
              목적지 역의 이름과 함께 역번호를 기억해두면 표지판을 찾기가
              훨씬 쉬워집니다.
            </Text>
          </View>
        </View>

        {/* Key Point */}
        <View
          style={[
            styles.keyPoint,
            {
              borderTopColor: colors.border,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <View style={styles.keyPointIcon}>
            <Check
              size={19}
              color="#7FAF9B"
              strokeWidth={2}
            />
          </View>

          <View style={styles.keyPointContent}>
            <Text
              style={[
                styles.keyPointLabel,
                { color: colors.textSecondary },
              ]}
            >
              이것만 기억하세요
            </Text>

            <Text
              style={[
                styles.keyPointText,
                { color: colors.text },
              ]}
            >
              노선 확인 → 방면 확인 → 승강장 번호 확인
            </Text>
          </View>
        </View>

        {/* Notice */}
        <View style={styles.notice}>
          <Info
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
            같은 노선이라도 진행 방향에 따라 승강장이 다릅니다. 승강장
            번호만 보고 이동하지 말고 방면 안내도 함께 확인하세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default PlatformGuideScreen;

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
    paddingLeft: 46,
  },

  guideNumber: {
    color: "#A78BFA",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
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

  steps: {
    marginTop: 23,
    paddingLeft: 46,
  },

  step: {
    flexDirection: "row",
    alignItems: "flex-start",
    minHeight: 70,
  },

  stepNumberArea: {
    width: 34,
    paddingTop: 1,
  },

  stepNumber: {
    color: "#A78BFA",
    fontSize: 12.5,
    fontWeight: "700",
  },

  stepContent: {
    flex: 1,
    paddingRight: 4,
  },

  stepTitle: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
    letterSpacing: -0.2,
  },

  stepDescription: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
  },

  stationExample: {
    marginTop: 24,
    marginLeft: 46,
    paddingVertical: 20,
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  stationCode: {
    width: 52,
    height: 52,
    borderWidth: 2,
    borderColor: "#9ACD32",
    borderRadius: 26,
    alignItems: "center",
    justifyContent: "center",
  },

  stationCodeLine: {
    color: "#27324A",
    fontSize: 11,
    lineHeight: 13,
    fontWeight: "700",
  },

  stationCodeNumber: {
    color: "#27324A",
    fontSize: 15,
    lineHeight: 17,
    fontWeight: "800",
  },

  stationExampleText: {
    flex: 1,
    marginLeft: 18,
  },

  stationName: {
    fontSize: 14,
    fontWeight: "700",
  },

  stationDescription: {
    marginTop: 4,
    fontSize: 11.5,
    lineHeight: 17,
  },

  tipRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginTop: 18,
    marginLeft: 46,
  },

  tipText: {
    flex: 1,
    fontSize: 11.5,
    lineHeight: 18,
  },

  keyPoint: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
    paddingVertical: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  keyPointIcon: {
    width: 46,
  },

  keyPointContent: {
    flex: 1,
  },

  keyPointLabel: {
    fontSize: 11.5,
    fontWeight: "600",
  },

  keyPointText: {
    marginTop: 5,
    fontSize: 14.5,
    lineHeight: 20,
    fontWeight: "700",
    letterSpacing: -0.2,
  },

  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginTop: 24,
  },

  noticeText: {
    flex: 1,
    fontSize: 11.5,
    lineHeight: 18,
  },

  pressed: {
    opacity: 0.5,
  },
});