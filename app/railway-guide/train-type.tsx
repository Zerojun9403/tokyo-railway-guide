import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  Check,
  ChevronLeft,
  CircleAlert,
  Info,
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

type TrainTypeProps = {
  nameKo: string;
  nameJa: string;
  nameEn: string;
  description: string;
  textColor: string;
  secondaryTextColor: string;
  borderColor: string;
};

const TrainType = ({
  nameKo,
  nameJa,
  nameEn,
  description,
  textColor,
  secondaryTextColor,
  borderColor,
}: TrainTypeProps) => {
  return (
    <View
      style={[
        styles.trainType,
        {
          borderBottomColor: borderColor,
        },
      ]}
    >
      <View style={styles.trainNameArea}>
        <Text style={[styles.trainNameKo, { color: textColor }]}>
          {nameKo}
        </Text>

        <Text
          style={[
            styles.trainNameSub,
            { color: secondaryTextColor },
          ]}
        >
          {nameJa} · {nameEn}
        </Text>
      </View>

      <Text
        style={[
          styles.trainDescription,
          { color: secondaryTextColor },
        ]}
      >
        {description}
      </Text>
    </View>
  );
};

const TrainTypeGuideScreen = () => {
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
            열차 종류 확인하기
          </Text>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.guideNumber}>03</Text>

          <Text style={[styles.pageTitle, { color: colors.text }]}>
            같은 노선인데 왜 열차가 다를까요?
          </Text>

          <Text
            style={[
              styles.pageDescription,
              { color: colors.textSecondary },
            ]}
          >
            일본 철도에서는 같은 노선과 승강장에서도 정차하는 역이 다른
            열차가 운행될 수 있습니다. 탑승 전에 열차 종류를 확인하세요.
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Train types */}
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
                자주 볼 수 있는 열차 종류
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                이름보다 정차역 차이를 이해하는 게 중요해요
              </Text>
            </View>
          </View>

          <View style={styles.trainList}>
            <TrainType
              nameKo="각역정차"
              nameJa="各駅停車"
              nameEn="Local"
              description="기본적으로 운행 구간의 각 역에 정차하는 열차입니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />

            <TrainType
              nameKo="쾌속"
              nameJa="快速"
              nameEn="Rapid"
              description="일부 역을 통과해 각역정차보다 빠르게 이동하는 열차입니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />

            <TrainType
              nameKo="급행"
              nameJa="急行"
              nameEn="Express"
              description="주요 역을 중심으로 정차하며 일부 역은 통과합니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />

            <TrainType
              nameKo="특급"
              nameJa="特急"
              nameEn="Limited Express"
              description="정차역이 더 적은 열차에 사용되는 명칭입니다. \n노선과 열차에 따라 이용 조건이 다릅니다."
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
                이름만 보고 판단하면 안 돼요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                철도회사와 노선마다 열차 종류가 다릅니다
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
              모든 노선이 각역정차 → 쾌속 → 급행 → 특급 순서로 운행하는
              것은 아닙니다. 준급, 통근급행, 쾌속급행 등 다른 종류의 열차가
              운행되는 노선도 있습니다.
            </Text>

            <Text
              style={[
                styles.explanationText,
                styles.explanationSpacing,
                { color: colors.textSecondary },
              ]}
            >
              같은 이름의 열차라도 철도회사에 따라 정차역과 이용 방법이
              다를 수 있으므로 목적지 역에 정차하는지 확인하는 것이 가장
              중요합니다.
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
              빠른 열차보다 내 역에 서는 열차인지 먼저 확인
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
            '특급'이라는 이름만으로 추가 요금 여부를 판단할 수 없습니다.
            별도 특급권이나 지정석권이 필요한 열차는 07번 가이드에서
            확인하세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TrainTypeGuideScreen;

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

  trainList: {
    marginTop: 20,
    paddingLeft: 46,
  },

  trainType: {
    minHeight: 84,
    justifyContent: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
    paddingVertical: 13,
  },

  trainNameArea: {
    flexDirection: "row",
    alignItems: "baseline",
    flexWrap: "wrap",
  },

  trainNameKo: {
    fontSize: 14.5,
    fontWeight: "700",
  },

  trainNameSub: {
    marginLeft: 9,
    fontSize: 11,
  },

  trainDescription: {
    marginTop: 5,
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