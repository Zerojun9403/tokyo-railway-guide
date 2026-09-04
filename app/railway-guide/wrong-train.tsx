import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  Check,
  ChevronLeft,
  CircleAlert,
  HelpCircle,
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

type SituationProps = {
  number: string;
  title: string;
  description: string;
  action: string;
  textColor: string;
  secondaryTextColor: string;
  borderColor: string;
};

const Situation = ({
  number,
  title,
  description,
  action,
  textColor,
  secondaryTextColor,
  borderColor,
}: SituationProps) => {
  return (
    <View
      style={[
        styles.situation,
        {
          borderBottomColor: borderColor,
        },
      ]}
    >
      <Text style={styles.situationNumber}>{number}</Text>

      <View style={styles.situationContent}>
        <Text style={[styles.situationTitle, { color: textColor }]}>
          {title}
        </Text>

        <Text
          style={[
            styles.situationDescription,
            { color: secondaryTextColor },
          ]}
        >
          {description}
        </Text>

        <View style={styles.actionRow}>
          <Repeat2
            size={14}
            color="#7FAF9B"
            strokeWidth={1.8}
          />

          <Text style={styles.actionText}>{action}</Text>
        </View>
      </View>
    </View>
  );
};

const WrongTrainGuideScreen = () => {
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
            잘못 탔을 때
          </Text>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.guideNumber}>09</Text>

          <Text style={[styles.pageTitle, { color: colors.text }]}>
            잘못 탔다고 당황하지 마세요
          </Text>

          <Text
            style={[
              styles.pageDescription,
              { color: colors.textSecondary },
            ]}
          >
            반대 방향이나 다른 열차를 탔다면 먼저 현재 위치를 확인하세요.
            대부분 다음 역에서 경로를 다시 확인할 수 있습니다.
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Situations */}
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
                상황별로 이렇게 대처하세요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                먼저 현재 역과 진행 방향을 확인하세요
              </Text>
            </View>
          </View>

          <View style={styles.situationList}>
            <Situation
              number="1"
              title="반대 방향 열차를 탔어요"
              description={
                "목적지와 반대 방향으로 이동하고 있다는 것을 알았다면 다음 역에서 내리세요."
              }
              action="반대 방향 승강장을 확인하고 다시 탑승"
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />

            <Situation
              number="2"
              title="급행이 목적지 역을 지나쳤어요"
              description={
                "급행이나 특급이 목적지에 정차하지 않아 역을 지나쳤다면 다음 정차역에서 내리세요."
              }
              action="정차역에서 반대 방향 열차의 정차 여부 확인"
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />

            <Situation
              number="3"
              title="다른 노선 열차를 탔어요"
              description={
                "생각했던 노선과 다른 열차를 탔다면 현재 위치와 다음 정차역을 먼저 확인하세요."
              }
              action="다음 역에서 내려 올바른 경로를 다시 확인"
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />

            <Situation
              number="4"
              title="개찰구를 잘못 나왔어요"
              description={
                "환승 중 잘못된 개찰구나 출구로 나왔다면 임의로 다시 통과하려 하지 마세요."
              }
              action="가까운 역무원에게 상황을 설명"
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />
          </View>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Station staff */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <HelpCircle
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
                모르겠다면 역무원에게 물어보세요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                목적지 역 이름을 보여주는 것만으로도 도움이 돼요
              </Text>
            </View>
          </View>

          <View style={styles.phraseArea}>
            <Text
              style={[
                styles.phraseLabel,
                { color: colors.textSecondary },
              ]}
            >
              이렇게 물어볼 수 있어요
            </Text>

            <Text
              style={[
                styles.phraseJapanese,
                { color: colors.text },
              ]}
            >
              ○○駅に行きたいです。
            </Text>

            <Text
              style={[
                styles.phraseReading,
                { color: colors.textSecondary },
              ]}
            >
              ○○에키니 이키타이데스
            </Text>

            <Text
              style={[
                styles.phraseMeaning,
                { color: colors.textSecondary },
              ]}
            >
              “○○역에 가고 싶습니다.”
            </Text>

            <View
              style={[
                styles.phraseDivider,
                { backgroundColor: colors.border },
              ]}
            />

            <Text
              style={[
                styles.phraseJapanese,
                { color: colors.text },
              ]}
            >
              この電車で合っていますか？
            </Text>

            <Text
              style={[
                styles.phraseReading,
                { color: colors.textSecondary },
              ]}
            >
              코노 덴샤데 앗테이마스카?
            </Text>

            <Text
              style={[
                styles.phraseMeaning,
                { color: colors.textSecondary },
              ]}
            >
              “이 열차가 맞나요?”
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Important */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Info
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
                개찰구는 함부로 나가지 마세요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                잘못 나온 경우에는 역무원에게 먼저 문의하세요
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
              방향을 잘못 탔다면 무조건 개찰구 밖으로 나갈 필요는 없습니다.
              역 구조에 따라 개찰구 안에서 반대 방향 승강장으로 이동할 수
              있습니다.
            </Text>

            <Text
              style={[
                styles.explanationText,
                styles.explanationSpacing,
                { color: colors.textSecondary },
              ]}
            >
              요금이나 환승 처리가 필요한 상황인지 확실하지 않다면
              개찰구 근처의 역무원에게 문의하는 것이 가장 안전합니다.
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
              다음 역에서 내리기 → 현재 위치 확인 → 경로 다시 확인
            </Text>
          </View>
        </View>

        {/* Final */}
        <View style={styles.finalMessage}>
          <Text
            style={[
              styles.finalTitle,
              { color: colors.text },
            ]}
          >
            잘못 타도 괜찮아요
          </Text>

          <Text
            style={[
              styles.finalDescription,
              { color: colors.textSecondary },
            ]}
          >
            복잡한 역에서는 누구나 방향을 헷갈릴 수 있습니다. 현재 위치와
            목적지를 다시 확인하고 천천히 경로를 찾아가세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default WrongTrainGuideScreen;

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

  situationList: {
    marginTop: 20,
    paddingLeft: 46,
  },

  situation: {
    minHeight: 112,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  situationNumber: {
    width: 34,
    color: "#A78BFA",
    fontSize: 12.5,
    fontWeight: "700",
  },

  situationContent: {
    flex: 1,
  },

  situationTitle: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
    letterSpacing: -0.2,
  },

  situationDescription: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
  },

  actionRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginTop: 9,
  },

  actionText: {
    flex: 1,
    color: "#7FAF9B",
    fontSize: 11.5,
    lineHeight: 17,
    fontWeight: "600",
  },

  phraseArea: {
    marginTop: 24,
    marginLeft: 46,
  },

  phraseLabel: {
    marginBottom: 13,
    fontSize: 10.5,
    fontWeight: "600",
  },

  phraseJapanese: {
    fontSize: 15,
    lineHeight: 21,
    fontWeight: "700",
  },

  phraseReading: {
    marginTop: 4,
    fontSize: 11.5,
    lineHeight: 17,
  },

  phraseMeaning: {
    marginTop: 2,
    fontSize: 11.5,
    lineHeight: 17,
  },

  phraseDivider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 18,
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

  finalMessage: {
    paddingTop: 28,
    paddingLeft: 46,
  },

  finalTitle: {
    fontSize: 15,
    fontWeight: "700",
  },

  finalDescription: {
    marginTop: 7,
    fontSize: 12,
    lineHeight: 19,
  },

  pressed: {
    opacity: 0.5,
  },
});