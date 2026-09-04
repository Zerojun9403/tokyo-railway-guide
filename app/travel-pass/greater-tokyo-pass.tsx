import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  Bus,
  CalendarDays,
  ChevronLeft,
  CircleAlert,
  Info,
  Smartphone,
  TrainFront,
  UserRoundCheck,
} from "lucide-react-native";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const GreaterTokyoPassScreen = () => {
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
            여행자 패스
          </Text>
        </View>

        {/* Title */}
        <View style={styles.titleArea}>
          <Text style={[styles.title, { color: colors.text }]}>
            Greater Tokyo Pass
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            도쿄와 수도권의 주요 사철과 도에이 버스를 5일 동안 자유롭게
            이용할 수 있는 외국인 여행객 전용 패스
          </Text>
        </View>

        {/* Price */}
        <View
          style={[
            styles.priceArea,
            {
              borderTopColor: colors.border,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <View style={styles.priceItem}>
            <Text
              style={[
                styles.priceLabel,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              성인
            </Text>

            <Text style={[styles.priceValue, { color: colors.text }]}>
              ¥6,500
            </Text>
          </View>

          <View
            style={[
              styles.priceDivider,
              {
                backgroundColor: colors.border,
              },
            ]}
          />

          <View style={styles.priceItem}>
            <Text
              style={[
                styles.priceLabel,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              어린이
            </Text>

            <Text style={[styles.priceValue, { color: colors.text }]}>
              ¥3,250
            </Text>
          </View>
        </View>

        {/* Information */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            이용 안내
          </Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <TrainFront
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                수도권 주요 사철
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                간토 지역 13개 철도·노면전차 사업자의 대상 노선을 자유롭게
                이용할 수 있습니다.
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Bus
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                도에이 버스
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                패스 이용 범위에 포함된 도에이 버스를 이용할 수 있습니다.
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <CalendarDays
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                유효기간
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                첫 이용일부터 연속 5일간 이용할 수 있습니다.
              </Text>

              <Text style={styles.importantText}>
                1일 기준 03:00 ~ 다음 날 02:59
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Smartphone
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                디지털 패스
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                승하차할 때 스마트폰의 Greater Tokyo Pass 이용 화면을
                역무원이나 승무원에게 제시합니다.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.sectionDivider,
            {
              backgroundColor: colors.border,
            },
          ]}
        />

        {/* Eligibility */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            이용 대상
          </Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <UserRoundCheck
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                일본을 방문한 외국인 여행객
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                방일 외국인 여행객 전용 패스이며 이용 시 유효한 여권이
                필요합니다.
              </Text>

              <Text style={styles.importantText}>
                일본 거주 외국인 및 일본인은 이용할 수 없습니다.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.sectionDivider,
            {
              backgroundColor: colors.border,
            },
          ]}
        />

        {/* Important */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            꼭 확인하세요
          </Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <CircleAlert
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                JR은 이용할 수 없습니다
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                JR 노선과 도쿄 모노레일 등 패스 대상이 아닌 노선은 별도
                운임이 필요합니다.
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <CircleAlert
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                자동개찰기 이용 불가
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                철도 이용 시 자동개찰기에 들어가지 말고 역무원에게 디지털
                패스 화면을 보여주세요.
              </Text>
            </View>
          </View>
        </View>

        <View
          style={[
            styles.sectionDivider,
            {
              backgroundColor: colors.border,
            },
          ]}
        />

        {/* Note */}
        <View style={styles.notice}>
          <Info
            size={17}
            color={colors.textSecondary}
            strokeWidth={1.7}
          />

          <Text
            style={[
              styles.noticeText,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            유료 특급열차나 지정석을 이용하는 경우에는 별도의 특급권 또는
            지정석권이 필요할 수 있습니다.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default GreaterTokyoPassScreen;

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
    marginBottom: 30,
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

  titleArea: {
    marginBottom: 30,
  },

  title: {
    fontSize: 27,
    lineHeight: 34,
    fontWeight: "700",
    letterSpacing: -0.7,
  },

  subtitle: {
    marginTop: 8,
    maxWidth: 560,
    fontSize: 13,
    lineHeight: 20,
  },

  priceArea: {
    flexDirection: "row",
    alignItems: "center",
    borderTopWidth: StyleSheet.hairlineWidth,
    borderBottomWidth: StyleSheet.hairlineWidth,
    marginBottom: 34,
    paddingVertical: 18,
  },

  priceItem: {
    flex: 1,
    alignItems: "center",
  },

  priceDivider: {
    width: StyleSheet.hairlineWidth,
    height: 38,
  },

  priceLabel: {
    fontSize: 11.5,
    fontWeight: "500",
  },

  priceValue: {
    marginTop: 5,
    fontSize: 19,
    fontWeight: "700",
    letterSpacing: -0.3,
  },

  section: {
    width: "100%",
  },

  sectionTitle: {
    marginBottom: 18,
    fontSize: 13,
    fontWeight: "600",
  },

  infoRow: {
    minHeight: 74,
    flexDirection: "row",
    alignItems: "flex-start",
  },

  infoIcon: {
    width: 42,
    paddingTop: 2,
  },

  infoContent: {
    flex: 1,
  },

  infoTitle: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: -0.2,
  },

  infoDescription: {
    marginTop: 4,
    fontSize: 12.5,
    lineHeight: 19,
  },

  importantText: {
    marginTop: 5,
    color: "#A78BFA",
    fontSize: 11.5,
    lineHeight: 17,
    fontWeight: "600",
  },

  sectionDivider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    marginVertical: 28,
  },

  notice: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  noticeText: {
    flex: 1,
    fontSize: 11.5,
    lineHeight: 18,
  },

  pressed: {
    opacity: 0.55,
  },
});