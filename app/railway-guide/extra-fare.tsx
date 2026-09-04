import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  Check,
  ChevronLeft,
  CircleAlert,
  Info,
  Ticket,
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

type FareTypeProps = {
  number: string;
  title: string;
  description: string;
  textColor: string;
  secondaryTextColor: string;
  borderColor: string;
};

const FareType = ({
  number,
  title,
  description,
  textColor,
  secondaryTextColor,
  borderColor,
}: FareTypeProps) => {
  return (
    <View
      style={[
        styles.fareType,
        {
          borderBottomColor: borderColor,
        },
      ]}
    >
      <Text style={styles.fareNumber}>{number}</Text>

      <View style={styles.fareContent}>
        <Text style={[styles.fareTitle, { color: textColor }]}>
          {title}
        </Text>

        <Text
          style={[
            styles.fareDescription,
            { color: secondaryTextColor },
          ]}
        >
          {description}
        </Text>
      </View>
    </View>
  );
};

const ExtraFareGuideScreen = () => {
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
            추가 요금이 필요한 열차
          </Text>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.guideNumber}>07</Text>

          <Text style={[styles.pageTitle, { color: colors.text }]}>
            IC카드만 찍고 타도 될까요?
          </Text>

          <Text
            style={[
              styles.pageDescription,
              { color: colors.textSecondary },
            ]}
          >
            일부 열차는 기본 운임 외에 특급권이나 지정석권 등 별도의
            티켓이 필요합니다. 탑승 전에 이용 조건을 확인하세요.
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Basic concept */}
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
                요금은 이렇게 생각하면 쉬워요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                기본 운임과 추가 요금을 구분하세요
              </Text>
            </View>
          </View>

          <View style={styles.fareList}>
            <FareType
              number="1"
              title="기본 운임"
              description={
                "출발역에서 도착역까지 이동하기 위한 기본 요금입니다.\nIC카드나 일반 승차권으로 지불합니다."
              }
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />

            <FareType
              number="2"
              title="특급권"
              description={
                "별도 요금이 필요한 특급열차를 이용할 때 구매하는 티켓입니다.\n기본 운임과 별도로 필요한 경우가 있습니다."
              }
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />

            <FareType
              number="3"
              title="지정석권 · 좌석 이용권"
              description={
                "지정된 좌석이나 유료 좌석 서비스를 이용하기 위해 추가로 필요한 경우가 있습니다."
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
                열차마다 이용 방법이 달라요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                열차 이름만으로 판단하지 마세요
              </Text>
            </View>
          </View>

          <View
            style={[
              styles.example,
              {
                borderTopColor: colors.border,
                borderBottomColor: colors.border,
              },
            ]}
          >
            <View style={styles.exampleRow}>
              <View style={styles.exampleStatus}>
                <Check
                  size={17}
                  color="#7FAF9B"
                  strokeWidth={2}
                />
              </View>

              <View style={styles.exampleContent}>
                <Text
                  style={[
                    styles.exampleTitle,
                    { color: colors.text },
                  ]}
                >
                  기본 운임만으로 이용하는 열차
                </Text>

                <Text
                  style={[
                    styles.exampleText,
                    { color: colors.textSecondary },
                  ]}
                >
                  IC카드 또는 일반 승차권으로 이용할 수 있습니다.
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.innerDivider,
                { backgroundColor: colors.border },
              ]}
            />

            <View style={styles.exampleRow}>
              <View style={styles.exampleStatus}>
                <Ticket
                  size={17}
                  color="#A78BFA"
                  strokeWidth={1.8}
                />
              </View>

              <View style={styles.exampleContent}>
                <Text
                  style={[
                    styles.exampleTitle,
                    { color: colors.text },
                  ]}
                >
                  별도 티켓이 필요한 열차
                </Text>

                <Text
                  style={[
                    styles.exampleText,
                    { color: colors.textSecondary },
                  ]}
                >
                  기본 운임 외에 특급권이나 좌석 이용권 등이 추가로
                  필요할 수 있습니다.
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
                '특급'이라고 모두 추가 요금은 아니에요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                철도회사와 열차에 따라 이용 조건이 달라요
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
              일본에서는 '특급'이라는 명칭을 사용하는 열차라도 일반
              승차권이나 IC카드만으로 이용할 수 있는 경우가 있습니다.
            </Text>

            <Text
              style={[
                styles.explanationText,
                styles.explanationSpacing,
                { color: colors.textSecondary },
              ]}
            >
              반대로 별도의 특급권이나 좌석권이 필요한 열차도 있으므로
              '특급 = 무조건 추가 요금'으로 생각하지 않는 것이 중요합니다.
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
              특급을 탈 때는 별도 티켓이 필요한지 먼저 확인
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
            추가 요금과 티켓 종류는 철도회사와 열차에 따라 다릅니다.
            역의 안내 표시나 해당 열차의 이용 조건을 확인한 뒤 탑승하세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ExtraFareGuideScreen;

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

  fareList: {
    marginTop: 20,
    paddingLeft: 46,
  },

  fareType: {
    minHeight: 94,
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  fareNumber: {
    width: 34,
    color: "#A78BFA",
    fontSize: 12.5,
    fontWeight: "700",
  },

  fareContent: {
    flex: 1,
  },

  fareTitle: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "600",
    letterSpacing: -0.2,
  },

  fareDescription: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
  },

  example: {
    marginTop: 24,
    marginLeft: 46,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  exampleRow: {
    minHeight: 88,
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 15,
  },

  exampleStatus: {
    width: 34,
    alignSelf: "flex-start",
    paddingTop: 2,
  },

  exampleContent: {
    flex: 1,
  },

  exampleTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  exampleText: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
  },

  innerDivider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 34,
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