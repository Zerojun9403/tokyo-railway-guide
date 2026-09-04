import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  Check,
  ChevronLeft,
  CircleAlert,
  Clock3,
  Info,
  Repeat2,
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

const LastTrainGuideScreen = () => {
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
            막차 이용 시 주의
          </Text>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.guideNumber}>08</Text>

          <Text style={[styles.pageTitle, { color: colors.text }]}>
            막차 시간만 보면 충분할까요?
          </Text>

          <Text
            style={[
              styles.pageDescription,
              { color: colors.textSecondary },
            ]}
          >
            환승이 필요한 경로에서는 첫 번째 열차의 막차보다 마지막까지
            환승할 수 있는 열차인지 확인하는 것이 중요합니다.
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Steps */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Clock3
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
                늦은 시간에는 이것부터 확인하세요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                출발시간보다 전체 경로가 중요해요
              </Text>
            </View>
          </View>

          <View style={styles.steps}>
            <Step
              number="1"
              title="목적지까지 전체 경로를 확인하세요"
              description="어떤 역에서 어떤 노선으로 환승해야 하는지 먼저 확인합니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="2"
              title="각 환승 구간의 막차를 확인하세요"
              description="첫 번째 열차를 탈 수 있어도 다음 노선의 운행이 이미 끝났을 수 있습니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="3"
              title="마지막 환승 가능 시간을 확인하세요"
              description="환승역에 도착했을 때 다음 열차가 남아 있는지 확인합니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="4"
              title="조금 여유 있게 이동하세요"
              description="막차 직전에는 이동이나 환승에 예상보다 시간이 걸릴 수 있으므로 여유를 두는 것이 좋습니다."
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

        {/* Transfer example */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Repeat2
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
                환승이 있다면 더 주의하세요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                첫 열차를 타는 것만으로는 충분하지 않아요
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.timeline,
              {
                borderTopColor: colors.border,
                borderBottomColor: colors.border,
              },
            ]}
          >
            <View style={styles.timelineRow}>
              <View style={styles.timelineTimeArea}>
                <Text
                  style={[
                    styles.timelineLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  출발
                </Text>

                <Text
                  style={[
                    styles.timelineTime,
                    { color: colors.text },
                  ]}
                >
                  23:40
                </Text>
              </View>

              <View style={styles.timelineContent}>
                <Text
                  style={[
                    styles.timelineTitle,
                    { color: colors.text },
                  ]}
                >
                  A역에서 열차 탑승
                </Text>

                <Text
                  style={[
                    styles.timelineDescription,
                    { color: colors.textSecondary },
                  ]}
                >
                  첫 번째 열차는 아직 운행 중
                </Text>
              </View>
            </View>

            <View style={styles.timelineConnector}>
              <View
                style={[
                  styles.timelineLine,
                  { backgroundColor: colors.border },
                ]}
              />
            </View>

            <View style={styles.timelineRow}>
              <View style={styles.timelineTimeArea}>
                <Text
                  style={[
                    styles.timelineLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  환승
                </Text>

                <Text
                  style={[
                    styles.timelineTime,
                    { color: colors.text },
                  ]}
                >
                  00:05
                </Text>
              </View>

              <View style={styles.timelineContent}>
                <Text
                  style={[
                    styles.timelineTitle,
                    { color: colors.text },
                  ]}
                >
                  B역에서 다른 노선으로 환승
                </Text>

                <Text
                  style={[
                    styles.timelineDescription,
                    { color: colors.textSecondary },
                  ]}
                >
                  다음 노선의 막차가 남아 있는지 확인
                </Text>
              </View>
            </View>

            <View style={styles.timelineConnector}>
              <View
                style={[
                  styles.timelineLine,
                  { backgroundColor: colors.border },
                ]}
              />
            </View>

            <View style={styles.timelineRow}>
              <View style={styles.timelineTimeArea}>
                <Text
                  style={[
                    styles.timelineLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  도착
                </Text>

                <Text
                  style={[
                    styles.timelineTime,
                    { color: colors.text },
                  ]}
                >
                  00:30
                </Text>
              </View>

              <View style={styles.timelineContent}>
                <Text
                  style={[
                    styles.timelineTitle,
                    { color: colors.text },
                  ]}
                >
                  C역 도착
                </Text>

                <Text
                  style={[
                    styles.timelineDescription,
                    { color: colors.textSecondary },
                  ]}
                >
                  목적지까지 이동 가능한 경로인지 확인
                </Text>
              </View>
            </View>
          </View>

          <Text
            style={[
              styles.exampleNote,
              { color: colors.textSecondary },
            ]}
          >
            위 시간은 막차 확인 방법을 설명하기 위한 예시입니다.
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
                평일과 주말 시간이 다를 수 있어요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                날짜에 맞는 시간표를 확인하세요
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
              평일과 토요일·휴일에는 시간표가 다를 수 있으며 막차 시간도
              달라질 수 있습니다.
            </Text>

            <Text
              style={[
                styles.explanationText,
                styles.explanationSpacing,
                { color: colors.textSecondary },
              ]}
            >
              임시 시간표나 운행 변경이 적용되는 경우도 있으므로 늦은
              시간에는 당일 운행 정보를 함께 확인하세요.
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
              막차는 출발역이 아니라 목적지까지 확인
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
            지연이나 운행 변경으로 예정된 환승이 어려워질 수 있습니다.
            늦은 시간에는 가능한 한 막차보다 여유 있는 열차를 이용하세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default LastTrainGuideScreen;

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

  timeline: {
    marginTop: 24,
    marginLeft: 46,
    paddingVertical: 18,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  timelineRow: {
    flexDirection: "row",
    alignItems: "flex-start",
  },

  timelineTimeArea: {
    width: 78,
  },

  timelineLabel: {
    fontSize: 10.5,
    fontWeight: "600",
  },

  timelineTime: {
    marginTop: 3,
    fontSize: 14,
    fontWeight: "700",
  },

  timelineContent: {
    flex: 1,
  },

  timelineTitle: {
    fontSize: 13,
    fontWeight: "600",
  },

  timelineDescription: {
    marginTop: 4,
    fontSize: 11.5,
    lineHeight: 17,
  },

  timelineConnector: {
    height: 28,
    marginLeft: 3,
  },

  timelineLine: {
    width: 2,
    height: 28,
  },

  exampleNote: {
    marginTop: 12,
    marginLeft: 46,
    fontSize: 10.5,
    lineHeight: 16,
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