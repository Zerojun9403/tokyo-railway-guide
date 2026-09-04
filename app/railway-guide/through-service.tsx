import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  Check,
  ChevronLeft,
  CircleAlert,
  Info,
  Link2,
  TrainFront,
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
      <Text style={styles.stepNumber}>{number}</Text>

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

const ThroughServiceGuideScreen = () => {
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
            직통운전이란?
          </Text>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.guideNumber}>06</Text>

          <Text style={[styles.pageTitle, { color: colors.text }]}>
            노선이 바뀌는데 왜 안 내려도 될까요?
          </Text>

          <Text
            style={[
              styles.pageDescription,
              { color: colors.textSecondary },
            ]}
          >
            일본에서는 한 철도회사의 열차가 다른 회사의 노선까지 그대로
            운행하는 경우가 있습니다. 이것을 직통운전이라고 합니다.
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Concept */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Link2
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
                열차가 다른 노선으로 계속 운행해요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                환승하지 않고 그대로 이동할 수 있습니다
              </Text>
            </View>
          </View>

          <View style={styles.steps}>
            <Step
              number="1"
              title="한 노선에서 열차를 탑니다"
              description="출발할 때는 현재 역의 철도회사와 노선에서 열차에 탑승합니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="2"
              title="경계역에서 노선이 바뀔 수 있어요"
              description="열차가 경계역에 도착한 뒤 다른 철도회사의 노선으로 이어서 운행할 수 있습니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="3"
              title="내릴 필요가 없는 경우가 있어요"
              description="같은 열차가 계속 운행한다면 환승을 위해 열차에서 내릴 필요가 없습니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="4"
              title="행선지는 계속 확인하세요"
              description="모든 열차가 같은 구간까지 직통운전하는 것은 아니므로 탑승 전 행선지를 확인해야 합니다."
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

        {/* Example */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <TrainFront
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
                이런 경우가 대표적이에요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                게이큐 · 도에이 아사쿠사선 · 게이세이
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.routeExample,
              {
                borderTopColor: colors.border,
                borderBottomColor: colors.border,
              },
            ]}
          >
            <View style={styles.routeItem}>
              <View
                style={[
                  styles.routeDot,
                  { backgroundColor: "#00A7E3" },
                ]}
              />

              <View style={styles.routeTextArea}>
                <Text
                  style={[
                    styles.routeName,
                    { color: colors.text },
                  ]}
                >
                  게이큐선
                </Text>

                <Text
                  style={[
                    styles.routeCompany,
                    { color: colors.textSecondary },
                  ]}
                >
                  Keikyu
                </Text>
              </View>
            </View>

            <View style={styles.connection}>
              <View
                style={[
                  styles.connectionLine,
                  { backgroundColor: colors.border },
                ]}
              />

              <Text
                style={[
                  styles.connectionText,
                  { color: colors.textSecondary },
                ]}
              >
                직통
              </Text>
            </View>

            <View style={styles.routeItem}>
              <View
                style={[
                  styles.routeDot,
                  { backgroundColor: "#E85298" },
                ]}
              />

              <View style={styles.routeTextArea}>
                <Text
                  style={[
                    styles.routeName,
                    { color: colors.text },
                  ]}
                >
                  도에이 아사쿠사선
                </Text>

                <Text
                  style={[
                    styles.routeCompany,
                    { color: colors.textSecondary },
                  ]}
                >
                  Toei Subway
                </Text>
              </View>
            </View>

            <View style={styles.connection}>
              <View
                style={[
                  styles.connectionLine,
                  { backgroundColor: colors.border },
                ]}
              />

              <Text
                style={[
                  styles.connectionText,
                  { color: colors.textSecondary },
                ]}
              >
                직통
              </Text>
            </View>

            <View style={styles.routeItem}>
              <View
                style={[
                  styles.routeDot,
                  { backgroundColor: "#005AAA" },
                ]}
              />

              <View style={styles.routeTextArea}>
                <Text
                  style={[
                    styles.routeName,
                    { color: colors.text },
                  ]}
                >
                  게이세이선
                </Text>

                <Text
                  style={[
                    styles.routeCompany,
                    { color: colors.textSecondary },
                  ]}
                >
                  Keisei
                </Text>
              </View>
            </View>
          </View>

          <Text
            style={[
              styles.exampleDescription,
              { color: colors.textSecondary },
            ]}
          >
            열차에 따라 게이큐선에서 도에이 아사쿠사선을 거쳐 게이세이선
            방면까지 이어서 운행하는 경우가 있습니다.
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Warning */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <CircleAlert
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
                모든 열차가 직통하는 건 아니에요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                같은 승강장의 열차라도 운행 구간이 다를 수 있어요
              </Text>
            </View>
          </View>

          <View style={styles.explanation}>
            <Text
              style={[
                styles.explanationText,
                { color: colors.textSecondary },
              ]}
            >
              같은 노선에서도 어떤 열차는 중간역까지만 운행하고, 다른 열차는
              다른 회사의 노선까지 직통운전할 수 있습니다.
            </Text>

            <Text
              style={[
                styles.explanationText,
                styles.explanationSpacing,
                { color: colors.textSecondary },
              ]}
            >
              따라서 '이 노선은 직통운전을 한다'는 정보만 보고 탑승하지 말고,
              실제로 타려는 열차의 행선지를 확인하세요.
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
              노선이 바뀌어도 같은 열차라면 내리지 않아도 돼요
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
            직통운전 구간과 행선지는 시간대와 열차에 따라 달라질 수 있습니다.
            역 전광판과 열차의 행선지 표시를 함께 확인하세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ThroughServiceGuideScreen;

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
    minHeight: 76,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  stepNumber: {
    width: 34,
    color: "#A78BFA",
    fontSize: 12.5,
    fontWeight: "700",
  },

  stepContent: {
    flex: 1,
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

  routeExample: {
    marginTop: 24,
    marginLeft: 46,
    paddingVertical: 18,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  routeItem: {
    minHeight: 50,
    flexDirection: "row",
    alignItems: "center",
  },

  routeDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
  },

  routeTextArea: {
    marginLeft: 16,
  },

  routeName: {
    fontSize: 14,
    fontWeight: "700",
  },

  routeCompany: {
    marginTop: 2,
    fontSize: 10.5,
  },

  connection: {
    height: 32,
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 4,
  },

  connectionLine: {
    width: 2,
    height: 32,
  },

  connectionText: {
    marginLeft: 20,
    fontSize: 10.5,
    fontWeight: "600",
  },

  exampleDescription: {
    marginTop: 14,
    marginLeft: 46,
    fontSize: 11.5,
    lineHeight: 18,
  },

  explanation: {
    marginTop: 22,
    paddingLeft: 46,
  },

  explanationText: {
    fontSize: 12.5,
    lineHeight: 20,
  },

  explanationSpacing: {
    marginTop: 12,
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