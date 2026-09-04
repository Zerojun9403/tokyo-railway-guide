import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  Check,
  ChevronLeft,
  CreditCard,
  Info,
  Ticket,
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

const GateGuideScreen = () => {
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
            개찰구 이용 방법
          </Text>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.guideNumber}>01</Text>

          <Text style={[styles.pageTitle, { color: colors.text }]}>
            개찰구를 통과해볼까요?
          </Text>

          <Text
            style={[
              styles.pageDescription,
              { color: colors.textSecondary },
            ]}
          >
            일본의 개찰구는 IC카드를 터치하거나 종이 승차권을 넣어서
            통과합니다. 처음 이용해도 방법은 간단해요.
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* IC Card */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CreditCard
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
                IC카드로 이용할 때
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                Suica · PASMO · ICOCA 등
              </Text>
            </View>
          </View>

          <View style={styles.steps}>
            <Step
              number="1"
              title="IC카드 대응 개찰구를 확인하세요"
              description="IC카드를 사용할 수 있는 개찰구인지 표시를 확인합니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="2"
              title="카드를 터치하세요"
              description="개찰구의 IC카드 인식 부분에 카드를 가볍게 터치합니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="3"
              title="개찰구를 통과하세요"
              description="정상적으로 인식되면 개찰구가 열리고 그대로 통과할 수 있습니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="4"
              title="도착역에서 다시 터치하세요"
              description="목적지에 도착하면 나갈 때도 같은 방법으로 IC카드를 터치합니다."
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

        {/* Paper Ticket */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Ticket
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
                종이 승차권으로 이용할 때
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                자동발매기에서 구입한 일반 승차권
              </Text>
            </View>
          </View>

          <View style={styles.steps}>
            <Step
              number="1"
              title="승차권 대응 개찰구를 확인하세요"
              description="종이 승차권을 넣을 수 있는 개찰구로 이동합니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="2"
              title="승차권을 투입하세요"
              description="개찰구 앞쪽의 승차권 투입구에 승차권을 넣습니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="3"
              title="나오는 승차권을 꼭 챙기세요"
              description="입장할 때는 개찰구 반대편에서 승차권이 다시 나옵니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="4"
              title="도착역에서 다시 넣으세요"
              description="목적지 개찰구에서 승차권을 다시 넣고 개찰구 밖으로 나갑니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />
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
              IC카드는 터치, 승차권은 넣고 다시 받기
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
            개찰구가 열리지 않거나 오류음이 나면 반복해서 통과하려 하지 말고
            가까운 역무원에게 문의하세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default GateGuideScreen;

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