import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  CalendarDays,
  ChevronLeft,
  CircleAlert,
  Info,
  Map,
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

const JrTokyoWidePassScreen = () => {
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
            JR TOKYO Wide Pass
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            도쿄를 중심으로 간토와 주변 지역까지 JR동일본의 열차를 3일간
            폭넓게 이용할 수 있는 철도 패스
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
              ¥16,000
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
              ¥8,000
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
                지정한 이용 시작일부터 연속 3일 동안 이용할 수 있습니다.
              </Text>
            </View>
          </View>

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
                신칸센 · 특급열차
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                패스 이용 범위 내 JR동일본의 대상 신칸센과 특급열차를 이용할
                수 있습니다.
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ticket size={19} color={colors.text} strokeWidth={1.7} />
            </View>

            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                지정석 이용
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                이용 가능한 열차의 보통차 지정석을 예약해 이용할 수 있습니다.
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Map size={19} color={colors.text} strokeWidth={1.7} />
            </View>

            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                넓은 이용 범위
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                도쿄 도심뿐 아니라 닛코, 가루이자와, 가와구치코 등 수도권
                근교 여행에 활용할 수 있습니다.
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

        {/* Recommended */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            이런 여행에 추천
          </Text>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Map size={19} color={colors.text} strokeWidth={1.7} />
            </View>

            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                도쿄 근교까지 여행하는 일정
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                도쿄 시내 이동만 하기보다는 3일 동안 신칸센이나 특급열차를
                이용해 여러 근교 지역을 방문하는 일정에 잘 맞습니다.
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
                모든 신칸센이 대상은 아닙니다
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                패스에 지정된 이용 가능 구간과 열차에서만 사용할 수 있습니다.
                도카이도 신칸센 등 대상 외 노선은 이용할 수 없습니다.
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
                이용 가능 구간 확인
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                일부 타사 철도는 지정된 구간에서만 이용할 수 있으므로 장거리
                이동 전 패스의 이용 가능 범위를 확인하는 것이 좋습니다.
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
            도쿄 시내에서만 이동하는 여행이라면 다른 1일권이나 지하철 패스가
            더 적합할 수 있습니다. JR TOKYO Wide Pass는 근교 장거리 이동이
            포함된 일정에서 활용도가 높은 패스입니다.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default JrTokyoWidePassScreen;

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