import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  Bus,
  Check,
  ChevronLeft,
  CircleAlert,
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
      </View>
    </View>
  );
};

const HanedaAirportGuideScreen = () => {
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
            하네다공항
          </Text>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.airportCode}>HND</Text>

          <Text style={[styles.pageTitle, { color: colors.text }]}>
            하네다공항 가는 방법
          </Text>

          <Text
            style={[
              styles.pageDescription,
              { color: colors.textSecondary },
            ]}
          >
            하네다공항은 도쿄 도심과 가까워 게이큐선과 도쿄 모노레일을
            이용하면 편리하게 이동할 수 있습니다. 목적지에 따라 적합한
            교통수단을 선택하세요.
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
                시나가와와 하마마쓰초 중 어디가 편한지 확인하세요
              </Text>
            </View>
          </View>

          <View style={styles.accessList}>
            <AccessItem
              icon={
                <TrainFront
                  size={18}
                  color="#A78BFA"
                  strokeWidth={1.8}
                />
              }
              title="게이큐선"
              subtitle="Keikyu Line"
              destination="시나가와 · 아사쿠사 방면"
              description={
                "시나가와 방면으로 이동하기 편리합니다. 일부 열차는 도에이 아사쿠사선으로 직통 운행하므로 아사쿠사 등으로 이동할 때도 유용합니다."
              }
              textColor={colors.text}
              secondaryTextColor={colors.textSecondary}
              borderColor={colors.border}
            />

            <AccessItem
              icon={
                <TrainFront
                  size={18}
                  color="#A78BFA"
                  strokeWidth={1.8}
                />
              }
              title="도쿄 모노레일"
              subtitle="Tokyo Monorail"
              destination="하마마쓰초 · JR 환승"
              description={
                "하마마쓰초역까지 이동한 뒤 JR 야마노테선과 게이힌토호쿠선 등으로 환승하기 편리합니다."
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
                공항버스로 이동하기
              </Text>

              <Text
                style={[
                  styles.sectionSubtitle,
                  { color: colors.textSecondary },
                ]}
              >
                짐이 많거나 환승을 줄이고 싶을 때
              </Text>
            </View>
          </View>

          <View style={styles.busArea}>
            <Text
              style={[
                styles.busTitle,
                { color: colors.text },
              ]}
            >
              공항 리무진버스
            </Text>

            <Text
              style={[
                styles.busSubtitle,
                { color: colors.textSecondary },
              ]}
            >
              Airport Limousine Bus
            </Text>

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
                  이용하기 좋은 경우
                </Text>

                <Text
                  style={[
                    styles.busInfoValue,
                    { color: colors.text },
                  ]}
                >
                  주요 호텔 · 도심 지역으로 환승 없이 이동
                </Text>
              </View>
            </View>

            <Text
              style={[
                styles.busDescription,
                { color: colors.textSecondary },
              ]}
            >
              철도역에서 숙소까지 이동이 불편하거나 큰 짐이 있다면
              공항버스도 비교해보세요. 목적지에 따라 주요 호텔이나
              터미널까지 직접 이동할 수 있는 노선이 있습니다.
            </Text>

            <Text
              style={[
                styles.busNotice,
                { color: colors.textSecondary },
              ]}
            >
              운행 노선과 요금은 목적지에 따라 다르며 도로 상황에 따라
              소요시간이 달라질 수 있습니다.
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
                도쿄에서 이동할 지역을 기준으로 선택하세요
              </Text>
            </View>
          </View>

          <View style={styles.recommendList}>
            <View style={styles.recommendRow}>
              <Text style={styles.recommendNumber}>01</Text>

              <View style={styles.recommendContent}>
                <Text
                  style={[
                    styles.recommendTitle,
                    { color: colors.text },
                  ]}
                >
                  시나가와
                </Text>

                <Text
                  style={[
                    styles.recommendText,
                    { color: colors.textSecondary },
                  ]}
                >
                  게이큐선을 먼저 확인
                </Text>
              </View>
            </View>

            <View style={styles.recommendRow}>
              <Text style={styles.recommendNumber}>02</Text>

              <View style={styles.recommendContent}>
                <Text
                  style={[
                    styles.recommendTitle,
                    { color: colors.text },
                  ]}
                >
                  아사쿠사
                </Text>

                <Text
                  style={[
                    styles.recommendText,
                    { color: colors.textSecondary },
                  ]}
                >
                  게이큐 · 도에이 아사쿠사선 직통 열차 확인
                </Text>
              </View>
            </View>

            <View style={styles.recommendRow}>
              <Text style={styles.recommendNumber}>03</Text>

              <View style={styles.recommendContent}>
                <Text
                  style={[
                    styles.recommendTitle,
                    { color: colors.text },
                  ]}
                >
                  도쿄 · 우에노 방면
                </Text>

                <Text
                  style={[
                    styles.recommendText,
                    { color: colors.textSecondary },
                  ]}
                >
                  모노레일 → 하마마쓰초에서 JR 환승을 비교
                </Text>
              </View>
            </View>

            <View style={styles.recommendRow}>
              <Text style={styles.recommendNumber}>04</Text>

              <View style={styles.recommendContent}>
                <Text
                  style={[
                    styles.recommendTitle,
                    { color: colors.text },
                  ]}
                >
                  신주쿠 · 시부야 방면
                </Text>

                <Text
                  style={[
                    styles.recommendText,
                    { color: colors.textSecondary },
                  ]}
                >
                  게이큐 또는 모노레일과 JR 환승 경로를 비교
                </Text>
              </View>
            </View>

            <View style={styles.recommendRow}>
              <Text style={styles.recommendNumber}>05</Text>

              <View style={styles.recommendContent}>
                <Text
                  style={[
                    styles.recommendTitle,
                    { color: colors.text },
                  ]}
                >
                  짐이 많을 때
                </Text>

                <Text
                  style={[
                    styles.recommendText,
                    { color: colors.textSecondary },
                  ]}
                >
                  숙소 근처까지 가는 공항버스가 있는지 확인
                </Text>
              </View>
            </View>
          </View>
        </View>

        {/* Terminal Warning */}
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
              이용 터미널을 꼭 확인하세요
            </Text>

            <Text
              style={[
                styles.warningText,
                { color: colors.textSecondary },
              ]}
            >
              하네다공항은 제1·제2·제3터미널로 나뉩니다. 이용 항공사의
              터미널을 확인한 뒤 하차역을 선택하세요.
            </Text>
          </View>
        </View>

        {/* Through Service */}
        <View style={styles.tip}>
          <Info
            size={16}
            color="#7FAF9B"
            strokeWidth={1.8}
          />

          <View style={styles.tipContent}>
            <Text
              style={[
                styles.tipTitle,
                { color: colors.text },
              ]}
            >
              게이큐선은 직통운전을 확인하세요
            </Text>

            <Text
              style={[
                styles.tipText,
                { color: colors.textSecondary },
              ]}
            >
              일부 열차는 도에이 아사쿠사선 등으로 계속 운행합니다.
              모든 열차의 행선지가 같지는 않으므로 탑승 전에 열차 종류와
              행선지를 확인하세요.
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
            운행 시간·요금·정차역은 변경될 수 있습니다. 실제 이용 전
            각 교통기관의 최신 운행 정보를 확인하세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default HanedaAirportGuideScreen;

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

  busArea: {
    marginTop: 22,
    marginLeft: 46,
  },

  busTitle: {
    fontSize: 14,
    fontWeight: "700",
  },

  busSubtitle: {
    marginTop: 3,
    fontSize: 10.5,
  },

  innerDivider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 18,
  },

  busInfoRow: {
    flexDirection: "row",
    alignItems: "flex-start",
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
    lineHeight: 18,
    fontWeight: "600",
  },

  busDescription: {
    marginTop: 17,
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

  tip: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginTop: 26,
  },

  tipContent: {
    flex: 1,
    marginLeft: 14,
  },

  tipTitle: {
    fontSize: 13,
    fontWeight: "700",
  },

  tipText: {
    marginTop: 5,
    fontSize: 11.5,
    lineHeight: 18,
  },

  footer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginTop: 26,
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