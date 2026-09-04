import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  Check,
  ChevronLeft,
  Clock3,
  Info,
  MapPin,
  Signpost,
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

const DestinationGuideScreen = () => {
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
            행선지 확인하기
          </Text>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.guideNumber}>04</Text>

          <Text style={[styles.pageTitle, { color: colors.text }]}>
            같은 승강장이라고 바로 타지 마세요
          </Text>

          <Text
            style={[
              styles.pageDescription,
              { color: colors.textSecondary },
            ]}
          >
            같은 노선과 승강장에서도 열차마다 행선지가 다를 수 있습니다.
            탑승하기 전에 전광판의 행선지를 확인하세요.
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* What to check */}
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
                전광판에서 확인하세요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                출발시간 · 열차종별 · 행선지
              </Text>
            </View>
          </View>

          <View style={styles.steps}>
            <Step
              number="1"
              title="출발시간을 확인하세요"
              description="내가 타려는 열차가 몇 시에 출발하는지 먼저 확인합니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="2"
              title="열차 종류를 확인하세요"
              description="각역정차, 급행, 특급 등 열차 종류에 따라 정차역이 달라질 수 있습니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="3"
              title="행선지를 확인하세요"
              description="열차가 최종적으로 어느 역까지 운행하는지 확인합니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="4"
              title="내 목적지에 정차하는지 확인하세요"
              description="행선지가 맞더라도 급행이나 특급이 목적지 역을 통과하지 않는지 확인합니다."
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

        {/* Departure board example */}
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
                이렇게 확인하면 돼요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                전광판을 간단하게 읽어볼까요?
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.board,
              {
                borderTopColor: colors.border,
                borderBottomColor: colors.border,
              },
            ]}
          >
            <View style={styles.boardHeader}>
              <Text
                style={[
                  styles.boardHeaderTime,
                  { color: colors.textSecondary },
                ]}
              >
                시간
              </Text>

              <Text
                style={[
                  styles.boardHeaderType,
                  { color: colors.textSecondary },
                ]}
              >
                종류
              </Text>

              <Text
                style={[
                  styles.boardHeaderDestination,
                  { color: colors.textSecondary },
                ]}
              >
                행선지
              </Text>
            </View>

            <View style={styles.boardRow}>
              <View style={styles.timeArea}>
                <Clock3
                  size={14}
                  color={colors.textSecondary}
                  strokeWidth={1.7}
                />

                <Text
                  style={[
                    styles.boardTime,
                    { color: colors.text },
                  ]}
                >
                  13:20
                </Text>
              </View>

              <Text style={styles.localText}>각역정차</Text>

              <View style={styles.destinationArea}>
                <MapPin
                  size={14}
                  color={colors.textSecondary}
                  strokeWidth={1.7}
                />

                <Text
                  style={[
                    styles.destinationText,
                    { color: colors.text },
                  ]}
                >
                  A역
                </Text>
              </View>
            </View>

            <View style={styles.boardRow}>
              <View style={styles.timeArea}>
                <Clock3
                  size={14}
                  color={colors.textSecondary}
                  strokeWidth={1.7}
                />

                <Text
                  style={[
                    styles.boardTime,
                    { color: colors.text },
                  ]}
                >
                  13:25
                </Text>
              </View>

              <Text style={styles.expressText}>급행</Text>

              <View style={styles.destinationArea}>
                <MapPin
                  size={14}
                  color={colors.textSecondary}
                  strokeWidth={1.7}
                />

                <Text
                  style={[
                    styles.destinationText,
                    { color: colors.text },
                  ]}
                >
                  B역
                </Text>
              </View>
            </View>
          </View>

          <Text
            style={[
              styles.boardDescription,
              { color: colors.textSecondary },
            ]}
          >
            같은 승강장에서 출발하더라도 열차 종류와 행선지가 다를 수
            있습니다.
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Destination concept */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <MapPin
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
                행선지는 최종 목적지를 뜻해요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                내가 내릴 역과 이름이 달라도 괜찮아요
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
              전광판의 행선지는 내가 내릴 역이 아니라 그 열차가 최종적으로
              운행하는 역을 표시합니다.
            </Text>

            <Text
              style={[
                styles.explanationText,
                styles.explanationSpacing,
                { color: colors.textSecondary },
              ]}
            >
              따라서 행선지가 내 목적지와 다르더라도 운행 도중 내 목적지에
              정차한다면 이용할 수 있습니다.
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
              시간 → 열차종별 → 행선지 → 정차역 확인
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
            직통운전을 하는 열차는 다른 철도회사 노선까지 계속 운행할 수
            있습니다. 직통운전은 06번 가이드에서 자세히 설명합니다.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default DestinationGuideScreen;

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

  board: {
    marginTop: 24,
    marginLeft: 46,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  boardHeader: {
    minHeight: 38,
    flexDirection: "row",
    alignItems: "center",
  },

  boardHeaderTime: {
    width: 90,
    fontSize: 10.5,
    fontWeight: "600",
  },

  boardHeaderType: {
    width: 80,
    fontSize: 10.5,
    fontWeight: "600",
  },

  boardHeaderDestination: {
    flex: 1,
    fontSize: 10.5,
    fontWeight: "600",
  },

  boardRow: {
    minHeight: 55,
    flexDirection: "row",
    alignItems: "center",
  },

  timeArea: {
    width: 90,
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
  },

  boardTime: {
    fontSize: 13,
    fontWeight: "600",
  },

  localText: {
    width: 80,
    color: "#7FAF9B",
    fontSize: 11.5,
    fontWeight: "700",
  },

  expressText: {
    width: 80,
    color: "#A78BFA",
    fontSize: 11.5,
    fontWeight: "700",
  },

  destinationArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
  },

  destinationText: {
    fontSize: 12.5,
    fontWeight: "600",
  },

  boardDescription: {
    marginTop: 13,
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