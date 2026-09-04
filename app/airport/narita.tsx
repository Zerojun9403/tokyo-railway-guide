import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  Bus,
  Check,
  ChevronLeft,
  CircleAlert,
  Clock3,
  Info,
  MapPin,
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

type AccessItemProps = {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  destination: string;
  description: string;
  textColor: string;
  secondaryTextColor: string;
  borderColor: string;
  actionLabel?: string;
  onPress?: () => void;
};

const AccessItem = ({
  icon,
  title,
  subtitle,
  destination,
  description,
  textColor,
  secondaryTextColor,
  borderColor,
  actionLabel,
  onPress,
}: AccessItemProps) => {
  return (
    <View
      style={[
        styles.accessItem,
        {
          borderBottomColor: borderColor,
        },
      ]}
    >
      <View style={styles.accessIcon}>{icon}</View>

      <View style={styles.accessContent}>
        <Text style={[styles.accessTitle, { color: textColor }]}>
          {title}
        </Text>

        <Text
          style={[
            styles.accessSubtitle,
            { color: secondaryTextColor },
          ]}
        >
          {subtitle}
        </Text>

        <View style={styles.destinationRow}>
          <MapPin
            size={13}
            color="#7FAF9B"
            strokeWidth={1.8}
          />

          <Text style={styles.destinationText}>
            {destination}
          </Text>
        </View>

        <Text
          style={[
            styles.accessDescription,
            { color: secondaryTextColor },
          ]}
        >
          {description}
        </Text>

        {actionLabel && onPress && (
          <Pressable
            onPress={onPress}
            style={({ pressed }) => [
              styles.accessAction,
              pressed && styles.pressed,
            ]}
          >
            <Text style={styles.accessActionText}>
              {actionLabel}
            </Text>

            <Text style={styles.accessActionArrow}>
              →
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const NaritaAirportGuideScreen = () => {
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
            나리타 국제공항
          </Text>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.airportCode}>NRT</Text>

          <Text style={[styles.pageTitle, { color: colors.text }]}>
            나리타공항 가는 방법
          </Text>

          <Text
            style={[
              styles.pageDescription,
              { color: colors.textSecondary },
            ]}
          >
            목적지와 예산에 따라 JR 나리타 익스프레스, 게이세이
            스카이라이너, 액세스 특급, 공항버스를 선택할 수 있습니다.
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Rail */}
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
                철도로 이동하기
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                목적지와 환승 횟수를 보고 선택하세요
              </Text>
            </View>
          </View>

          <View style={styles.accessList}>
            {/* N'EX */}
            <AccessItem
              icon={
                <TrainFront
                  size={18}
                  color="#A78BFA"
                  strokeWidth={1.8}
                />
              }
              title="나리타 익스프레스"
              subtitle="Narita Express · N'EX"
              destination="도쿄 · 시부야 · 신주쿠 방면"
              description="JR을 이용해 도쿄 도심 서쪽까지 이동하기 편리합니다. 큰 짐을 가지고 환승을 줄이고 싶을 때 유용합니다."
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />

            {/* Skyliner */}
            <AccessItem
              icon={
                <TrainFront
                  size={18}
                  color="#A78BFA"
                  strokeWidth={1.8}
                />
              }
              title="게이세이 스카이라이너"
              subtitle="Keisei Skyliner"
              destination="닛포리 · 우에노 방면"
              description="게이세이의 공항 특급입니다. 닛포리나 우에노 방면으로 빠르게 이동하고 싶을 때 유용합니다."
              actionLabel="Skyliner 시간표 보기"
              onPress={() =>
                router.push("/airport/narita-skyliner")
              }
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />

            {/* Access Express */}
            <AccessItem
              icon={
                <TrainFront
                  size={18}
                  color="#A78BFA"
                  strokeWidth={1.8}
                />
              }
              title="액세스 특급"
              subtitle="Access Express"
              destination="아사쿠사 · 도심 방면"
              description="별도의 Skyliner 특급권 없이 이용할 수 있는 열차입니다. 열차에 따라 도에이 아사쿠사선 등으로 직통 운행합니다."
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

        {/* Bus */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Bus
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
                저렴하게 도쿄역으로
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                AIRPORT BUS TYO-NRT
              </Text>
            </View>
          </View>

          <View style={styles.busArea}>
            <View style={styles.busTitleRow}>
              <View>
                <Text
                  style={[
                    styles.busTitle,
                    { color: colors.text },
                  ]}
                >
                  AIRPORT BUS TYO-NRT
                </Text>

                <Text
                  style={[
                    styles.busOldName,
                    { color: colors.textSecondary },
                  ]}
                >
                  구 1000엔 버스로 알려진 공항버스
                </Text>
              </View>

              <Text style={styles.busPrice}>
                ¥1,500
              </Text>
            </View>

            <View
              style={[
                styles.innerDivider,
                { backgroundColor: colors.border },
              ]}
            />

            <View style={styles.busInfoRow}>
              <MapPin
                size={15}
                color="#7FAF9B"
                strokeWidth={1.8}
              />

              <View style={styles.busInfoContent}>
                <Text
                  style={[
                    styles.busInfoLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  주요 구간
                </Text>

                <Text
                  style={[
                    styles.busInfoValue,
                    { color: colors.text },
                  ]}
                >
                  도쿄역 ↔ 나리타공항
                </Text>
              </View>
            </View>

            <View style={styles.busInfoRow}>
              <Clock3
                size={15}
                color="#7FAF9B"
                strokeWidth={1.8}
              />

              <View style={styles.busInfoContent}>
                <Text
                  style={[
                    styles.busInfoLabel,
                    { color: colors.textSecondary },
                  ]}
                >
                  예정 소요시간
                </Text>

                <Text
                  style={[
                    styles.busInfoValue,
                    { color: colors.text },
                  ]}
                >
                  약 62~70분
                </Text>
              </View>
            </View>

            <Text
              style={[
                styles.busDescription,
                { color: colors.textSecondary },
              ]}
            >
              예전에 '1000엔 버스'로 많이 알려졌지만 현재 일반편 성인
              편도 요금은 1,500엔입니다. 도쿄역과 나리타공항을 환승 없이
              이동할 수 있어 짐이 많을 때도 편리합니다.
            </Text>

            <Text
              style={[
                styles.busNotice,
                { color: colors.textSecondary },
              ]}
            >
              조조·심야편은 성인 3,000엔이며 도로 상황에 따라 소요시간이
              달라질 수 있습니다.
            </Text>
          </View>
        </View>

        <View
          style={[
            styles.divider,
            { backgroundColor: colors.border },
          ]}
        />

        {/* Recommendations */}
        <View style={styles.section}>
          <View style={styles.sectionHeader}>
            <Check
              size={21}
              color="#7FAF9B"
              strokeWidth={1.9}
            />

            <View style={styles.sectionHeaderText}>
              <Text
                style={[
                  styles.sectionTitle,
                  { color: colors.text },
                ]}
              >
                어디로 갈 때 좋을까요?
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                숙소 위치를 기준으로 고르면 쉬워요
              </Text>
            </View>
          </View>

          <View style={styles.recommendList}>
            <View style={styles.recommendRow}>
              <Text style={styles.recommendNumber}>
                01
              </Text>

              <View style={styles.recommendContent}>
                <Text
                  style={[
                    styles.recommendTitle,
                    { color: colors.text },
                  ]}
                >
                  신주쿠 · 시부야
                </Text>

                <Text
                  style={[
                    styles.recommendText,
                    { color: colors.textSecondary },
                  ]}
                >
                  N'EX를 먼저 확인
                </Text>
              </View>
            </View>

            <View style={styles.recommendRow}>
              <Text style={styles.recommendNumber}>
                02
              </Text>

              <View style={styles.recommendContent}>
                <Text
                  style={[
                    styles.recommendTitle,
                    { color: colors.text },
                  ]}
                >
                  우에노 · 닛포리
                </Text>

                <Text
                  style={[
                    styles.recommendText,
                    { color: colors.textSecondary },
                  ]}
                >
                  Skyliner를 먼저 확인
                </Text>
              </View>
            </View>

            <View style={styles.recommendRow}>
              <Text style={styles.recommendNumber}>
                03
              </Text>

              <View style={styles.recommendContent}>
                <Text
                  style={[
                    styles.recommendTitle,
                    { color: colors.text },
                  ]}
                >
                  아사쿠사 방면
                </Text>

                <Text
                  style={[
                    styles.recommendText,
                    { color: colors.textSecondary },
                  ]}
                >
                  Access Express 직통 여부 확인
                </Text>
              </View>
            </View>

            <View style={styles.recommendRow}>
              <Text style={styles.recommendNumber}>
                04
              </Text>

              <View style={styles.recommendContent}>
                <Text
                  style={[
                    styles.recommendTitle,
                    { color: colors.text },
                  ]}
                >
                  도쿄역 · 비용 절약
                </Text>

                <Text
                  style={[
                    styles.recommendText,
                    { color: colors.textSecondary },
                  ]}
                >
                  AIRPORT BUS TYO-NRT도 비교
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Warning */}
        <View
          style={[
            styles.warning,
            {
              borderTopColor: colors.border,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <CircleAlert
            size={18}
            color={colors.textSecondary}
            strokeWidth={1.7}
          />

          <View style={styles.warningContent}>
            <Text
              style={[
                styles.warningTitle,
                { color: colors.text },
              ]}
            >
              터미널을 꼭 확인하세요
            </Text>

            <Text
              style={[
                styles.warningText,
                { color: colors.textSecondary },
              ]}
            >
              이용 항공사의 출발 터미널을 확인한 뒤 열차역과 버스
              하차 위치를 선택하세요. 제3터미널은 철도역에서 이동 시간이
              추가로 필요할 수 있습니다.
            </Text>
          </View>
        </View>

        {/* Footer */}
        <View style={styles.footer}>
          <Info
            size={15}
            color={colors.textSecondary}
            strokeWidth={1.7}
          />

          <Text
            style={[
              styles.footerText,
              { color: colors.textSecondary },
            ]}
          >
            요금·시간표·정차역은 변경될 수 있습니다. 실제 이용 전 각
            교통기관의 최신 운행 정보를 확인하세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default NaritaAirportGuideScreen;

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

  airportCode: {
    color: "#A78BFA",
    fontSize: 13,
    fontWeight: "700",
    marginBottom: 8,
    letterSpacing: 0.5,
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

  accessList: {
    marginTop: 20,
    paddingLeft: 46,
  },

  accessItem: {
    flexDirection: "row",
    alignItems: "flex-start",
    paddingVertical: 18,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  accessIcon: {
    width: 34,
    paddingTop: 1,
  },

  accessContent: {
    flex: 1,
  },

  accessTitle: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
  },

  accessSubtitle: {
    marginTop: 2,
    fontSize: 10.5,
    lineHeight: 15,
  },

  destinationRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 6,
    marginTop: 9,
  },

  destinationText: {
    flex: 1,
    color: "#7FAF9B",
    fontSize: 11.5,
    lineHeight: 17,
    fontWeight: "600",
  },

  accessDescription: {
    marginTop: 7,
    fontSize: 12,
    lineHeight: 18,
  },

  accessAction: {
    flexDirection: "row",
    alignItems: "center",
    alignSelf: "flex-start",
    marginTop: 13,
    paddingVertical: 4,
  },

  accessActionText: {
    color: "#A78BFA",
    fontSize: 12,
    fontWeight: "700",
  },

  accessActionArrow: {
    marginLeft: 7,
    color: "#A78BFA",
    fontSize: 14,
    fontWeight: "600",
  },

  busArea: {
    marginTop: 22,
    marginLeft: 46,
  },

  busTitleRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
    gap: 12,
  },

  busTitle: {
    fontSize: 14,
    fontWeight: "700",
  },

  busOldName: {
    marginTop: 3,
    fontSize: 10.5,
  },

  busPrice: {
    color: "#A78BFA",
    fontSize: 17,
    fontWeight: "700",
  },

  innerDivider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 18,
  },

  busInfoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 14,
  },

  busInfoContent: {
    flex: 1,
    marginLeft: 12,
  },

  busInfoLabel: {
    fontSize: 10.5,
  },

  busInfoValue: {
    marginTop: 2,
    fontSize: 12.5,
    fontWeight: "600",
  },

  busDescription: {
    marginTop: 7,
    fontSize: 12,
    lineHeight: 19,
  },

  busNotice: {
    marginTop: 10,
    fontSize: 10.5,
    lineHeight: 17,
  },

  recommendList: {
    marginTop: 22,
    paddingLeft: 46,
  },

  recommendRow: {
    minHeight: 62,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  recommendNumber: {
    width: 34,
    color: "#A78BFA",
    fontSize: 11.5,
    fontWeight: "700",
  },

  recommendContent: {
    flex: 1,
  },

  recommendTitle: {
    fontSize: 13.5,
    fontWeight: "600",
  },

  recommendText: {
    marginTop: 4,
    fontSize: 11.5,
    lineHeight: 17,
  },

  warning: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 30,
    paddingVertical: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  warningContent: {
    flex: 1,
    marginLeft: 28,
  },

  warningTitle: {
    fontSize: 13.5,
    fontWeight: "700",
  },

  warningText: {
    marginTop: 6,
    fontSize: 11.5,
    lineHeight: 18,
  },

  footer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginTop: 24,
  },

  footerText: {
    flex: 1,
    fontSize: 11,
    lineHeight: 17,
  },

  pressed: {
    opacity: 0.5,
  },
});