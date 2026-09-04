import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  Check,
  ChevronLeft,
  CircleAlert,
  CreditCard,
  Info,
  Nfc,
  Smartphone,
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

const ContactlessGuideScreen = () => {
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
            신용카드로 전철 타기
          </Text>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <View style={styles.introIcon}>
            <Nfc
              size={25}
              color="#A78BFA"
              strokeWidth={1.8}
            />
          </View>

          <View style={styles.introContent}>
            <Text style={[styles.pageTitle, { color: colors.text }]}>
              카드 한 장으로 바로 승차
            </Text>

            <Text
              style={[
                styles.pageDescription,
                { color: colors.textSecondary },
              ]}
            >
              일부 철도에서는 별도의 교통카드를 구입하지 않아도
              컨택리스 결제를 지원하는 카드나 스마트폰을 개찰구에
              터치해 이용할 수 있습니다.
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* What is Open Loop */}
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
                오픈루프 승차란?
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                교통카드 대신 결제 카드를 사용하는 방식
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
              오픈루프는 대응하는 신용카드·체크카드 또는 모바일 결제
              수단을 개찰구에 직접 터치하여 승차하는 방식입니다.
            </Text>

            <Text
              style={[
                styles.explanationText,
                styles.explanationSpacing,
                { color: colors.textSecondary },
              ]}
            >
              Suica나 PASMO 같은 교통계 IC카드를 별도로 구입하고
              충전하지 않아도 이용할 수 있다는 점이 특징입니다.
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* How to use */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Nfc
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
                이용 방법
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                승차와 하차 모두 같은 결제 수단을 사용하세요
              </Text>
            </View>
          </View>

          <View style={styles.steps}>
            <Step
              number="1"
              title="대응 개찰구를 확인하세요"
              description="컨택리스 결제를 지원하는 개찰구인지 표시를 확인합니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="2"
              title="카드 또는 스마트폰을 터치하세요"
              description="승차할 때 사용할 결제 수단을 리더기에 터치합니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="3"
              title="열차를 이용하세요"
              description="개찰구가 정상적으로 열리면 평소처럼 열차를 이용합니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
            />

            <Step
              number="4"
              title="내릴 때 같은 결제 수단을 터치하세요"
              description="하차역에서도 승차할 때 사용한 것과 동일한 카드 또는 기기를 사용합니다."
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

        {/* Card / Mobile */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Smartphone
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
                카드와 스마트폰으로 이용
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                컨택리스 결제를 지원하는 결제 수단이 필요해요
              </Text>
            </View>
          </View>

          <View style={styles.paymentList}>
            <View style={styles.paymentRow}>
              <CreditCard
                size={18}
                color="#A78BFA"
                strokeWidth={1.8}
              />

              <View style={styles.paymentContent}>
                <Text
                  style={[
                    styles.paymentTitle,
                    { color: colors.text },
                  ]}
                >
                  컨택리스 카드
                </Text>

                <Text
                  style={[
                    styles.paymentDescription,
                    { color: colors.textSecondary },
                  ]}
                >
                  비접촉 결제를 지원하는 신용카드·체크카드를 사용할 수
                  있습니다.
                </Text>
              </View>
            </View>

            <View
              style={[
                styles.innerDivider,
                { backgroundColor: colors.border },
              ]}
            />

            <View style={styles.paymentRow}>
              <Smartphone
                size={18}
                color="#A78BFA"
                strokeWidth={1.8}
              />

              <View style={styles.paymentContent}>
                <Text
                  style={[
                    styles.paymentTitle,
                    { color: colors.text },
                  ]}
                >
                  스마트폰 · 스마트워치
                </Text>

                <Text
                  style={[
                    styles.paymentDescription,
                    { color: colors.textSecondary },
                  ]}
                >
                  지원되는 모바일 지갑과 결제 카드가 등록된 기기를 사용할
                  수 있는 경우도 있습니다.
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

        {/* IC vs Contactless */}
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
                Suica · PASMO와는 달라요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                비슷하게 터치하지만 서로 다른 결제 방식입니다
              </Text>
            </View>
          </View>

          <View style={styles.compareArea}>
            <View style={styles.compareRow}>
              <Text
                style={[
                  styles.compareLabel,
                  { color: colors.text },
                ]}
              >
                IC카드
              </Text>

              <Text
                style={[
                  styles.compareText,
                  { color: colors.textSecondary },
                ]}
              >
                Suica · PASMO 등에 미리 충전한 잔액으로 이용
              </Text>
            </View>

            <View
              style={[
                styles.innerDivider,
                { backgroundColor: colors.border },
              ]}
            />

            <View style={styles.compareRow}>
              <Text
                style={[
                  styles.compareLabel,
                  { color: colors.text },
                ]}
              >
                오픈루프
              </Text>

              <Text
                style={[
                  styles.compareText,
                  { color: colors.textSecondary },
                ]}
              >
                대응하는 결제 카드나 모바일 결제를 직접 이용
              </Text>
            </View>
          </View>
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
                모든 노선에서 사용할 수 있는 건 아니에요
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                이용 가능한 철도회사 · 노선 · 역을 확인하세요
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
              컨택리스 승차를 지원하는 범위는 철도회사와 노선, 역에 따라
              다를 수 있습니다.
            </Text>

            <Text
              style={[
                styles.explanationText,
                styles.explanationSpacing,
                { color: colors.textSecondary },
              ]}
            >
              같은 지역의 철도라도 모든 개찰구에서 이용할 수 있다고
              생각하지 말고, 탑승 전에 대응 여부를 확인하세요.
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
              대응 개찰구 확인 → 같은 카드로 승차 · 하차
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
            지원 카드 브랜드와 이용 가능 구간은 철도회사에 따라 다를 수
            있습니다. 실제 이용 전 해당 철도회사의 최신 안내를
            확인하세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default ContactlessGuideScreen;

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
    paddingTop: 2,
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

  paymentList: {
    marginTop: 22,
    marginLeft: 46,
  },

  paymentRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 16,
  },

  paymentContent: {
    flex: 1,
    marginLeft: 16,
  },

  paymentTitle: {
    fontSize: 14,
    fontWeight: "600",
  },

  paymentDescription: {
    marginTop: 5,
    fontSize: 12,
    lineHeight: 18,
  },

  innerDivider: {
    height: StyleSheet.hairlineWidth,
    marginLeft: 34,
  },

  compareArea: {
    marginTop: 22,
    marginLeft: 46,
  },

  compareRow: {
    paddingVertical: 15,
  },

  compareLabel: {
    fontSize: 13.5,
    fontWeight: "700",
  },

  compareText: {
    marginTop: 5,
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