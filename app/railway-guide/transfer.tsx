import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  Check,
  ChevronLeft,
  CircleAlert,
  Info,
  Repeat2,
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

type TransferTypeProps = {
  number: string;
  title: string;
  description: string;
  textColor: string;
  secondaryTextColor: string;
  borderColor: string;
};

const TransferType = ({
  number,
  title,
  description,
  textColor,
  secondaryTextColor,
  borderColor,
}: TransferTypeProps) => {
  return (
    <View
      style={[
        styles.transferType,
        {
          borderBottomColor: borderColor,
        },
      ]}
    >
      <View style={styles.transferNumberArea}>
        <Text style={styles.transferNumber}>{number}</Text>
      </View>

      <View style={styles.transferContent}>
        <Text style={[styles.transferTitle, { color: textColor }]}>
          {title}
        </Text>

        <Text
          style={[
            styles.transferDescription,
            { color: secondaryTextColor },
          ]}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};

const TransferGuideScreen = () => {
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
            환승하는 방법
          </Text>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.guideNumber}>05</Text>

          <Text style={[styles.pageTitle, { color: colors.text }]}>
            환승할 때 어디로 가야 할까요?
          </Text>

          <Text
            style={[
              styles.pageDescription,
              { color: colors.textSecondary },
            ]}
          >
            일본 철도에서는 역과 노선에 따라 환승 방법이 다를 수 있습니다.
            먼저 환승 안내 표지판을 확인하는 것이 가장 중요합니다.
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Transfer types */}
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
                환승 방법은 크게 세 가지예요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                역의 안내 표지판에 따라 이동하세요
              </Text>
            </View>
          </View>

          <View style={styles.transferList}>
            <TransferType
              number="1"
              title="개찰구 안에서 환승"
              description={
                "개찰구 밖으로 나가지 않고 역 내부에서 다른 승강장으로 이동합니다.\n환승할 노선의 안내 표지판을 따라가세요."
              }
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />

            <TransferType
              number="2"
              title="환승 개찰구를 이용"
              description={
                "노선 사이에 전용 환승 개찰구가 있는 경우가 있습니다.\n일반 출구와 구분해서 환승 안내를 확인하세요."
              }
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />

            <TransferType
              number="3"
              title="개찰구 밖으로 나가서 환승"
              description={
                "일부 환승은 한 번 개찰구 밖으로 나온 뒤 다른 노선의 개찰구로 이동해야 합니다.\n역 밖이나 연결 통로를 이동하는 경우도 있습니다."
              }
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

        {/* Signs */}
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
                환승 표지판부터 찾으세요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                노선 이름 · 노선색 · 노선기호 확인
              </Text>
            </View>
          </View>

          <View style={styles.steps}>
            <View style={styles.step}>
              <Text style={styles.stepNumber}>1</Text>

              <View style={styles.stepContent}>
                <Text
                  style={[
                    styles.stepTitle,
                    { color: colors.text },
                  ]}
                >
                  내린 뒤 바로 출구로 가지 마세요
                </Text>

                <Text
                  style={[
                    styles.stepDescription,
                    { color: colors.textSecondary },
                  ]}
                >
                  먼저 환승하려는 노선의 안내 표지판을 찾습니다.
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <Text style={styles.stepNumber}>2</Text>

              <View style={styles.stepContent}>
                <Text
                  style={[
                    styles.stepTitle,
                    { color: colors.text },
                  ]}
                >
                  노선기호와 색상을 확인하세요
                </Text>

                <Text
                  style={[
                    styles.stepDescription,
                    { color: colors.textSecondary },
                  ]}
                >
                  같은 역에 여러 노선이 있다면 노선 이름뿐 아니라 영문
                  기호와 노선색도 함께 확인하세요.
                </Text>
              </View>
            </View>

            <View style={styles.step}>
              <Text style={styles.stepNumber}>3</Text>

              <View style={styles.stepContent}>
                <Text
                  style={[
                    styles.stepTitle,
                    { color: colors.text },
                  ]}
                >
                  다음 열차의 방면도 확인하세요
                </Text>

                <Text
                  style={[
                    styles.stepDescription,
                    { color: colors.textSecondary },
                  ]}
                >
                  환승 승강장에 도착하면 목적지 방향으로 가는 열차인지 다시
                  확인하고 탑승합니다.
                </Text>
              </View>
            </View>
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
                개찰구 밖 환승은 특히 주의하세요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                환승 조건은 역과 철도회사에 따라 달라요
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
              개찰구 밖으로 나가야 하는 환승에서는 지정된 개찰구나 환승
              경로, 제한 시간이 적용되는 경우가 있습니다.
            </Text>

            <Text
              style={[
                styles.explanationText,
                styles.explanationSpacing,
                { color: colors.textSecondary },
              ]}
            >
              임의의 출구로 나가기보다 역 안의 환승 안내를 먼저 확인하고
              표시된 경로를 따라 이동하세요.
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
              내리자마자 출구로 가지 말고 환승 표지판부터 확인
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
            같은 역 이름이라도 노선에 따라 승강장이 멀리 떨어져 있을 수
            있습니다. 환승 시간이 짧다면 이동 시간을 충분히 고려하세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TransferGuideScreen;

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

  transferList: {
    marginTop: 20,
    paddingLeft: 46,
  },

  transferType: {
    minHeight: 98,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  transferNumberArea: {
    width: 34,
  },

  transferNumber: {
    color: "#A78BFA",
    fontSize: 12.5,
    fontWeight: "700",
  },

  transferContent: {
    flex: 1,
  },

  transferTitle: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
    letterSpacing: -0.2,
  },

  transferDescription: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
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