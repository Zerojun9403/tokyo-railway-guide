import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  CalendarDays,
  ChevronLeft,
  Info,
  Map,
  Ticket,
  ThumbsUp,
} from "lucide-react-native";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

const TokyoMetroToeiOneDayPassScreen = () => {
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
            도쿄메트로·도에이{"\n"}공통 1일 승차권
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            도쿄메트로와 도에이 지하철 전 노선을 하루 동안 자유롭게 이용할 수
            있는 공통 승차권
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
              ¥1,100
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
              ¥550
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
              <Map size={19} color={colors.text} strokeWidth={1.7} />
            </View>

            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                이용 가능 노선
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                도쿄메트로 전 노선 · 도에이 지하철 전 노선
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
                지정한 사용일 하루 동안 이용할 수 있습니다.
              </Text>

              <Text style={styles.importantText}>
                24시간권이 아닌 날짜 기준 1일권
              </Text>
            </View>
          </View>

          <View style={styles.infoRow}>
            <View style={styles.infoIcon}>
              <Ticket size={19} color={colors.text} strokeWidth={1.7} />
            </View>

            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                이용 방식
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                유효한 사용일 동안 도쿄메트로와 도에이 지하철을 횟수 제한 없이
                이용할 수 있습니다.
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
              <ThumbsUp
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.infoContent}>
              <Text style={[styles.infoTitle, { color: colors.text }]}>
                메트로와 도에이를 함께 이용하는 일정
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                하루 동안 도쿄메트로와 도에이 지하철을 번갈아 여러 번 이용하는
                일정에 적합합니다.
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

        {/* Notice */}
        <View style={styles.notice}>
          <Info
            size={17}
            color={colors.textSecondary}
            strokeWidth={1.7}
          />

          <View style={styles.noticeContent}>
            <Text style={[styles.noticeTitle, { color: colors.text }]}>
              이용 전 확인
            </Text>

            <Text
              style={[
                styles.noticeText,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              JR 및 다른 사철 노선에서는 이용할 수 없습니다. 이용 가능 구간을
              벗어나는 경우 별도 운임이 필요합니다.
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default TokyoMetroToeiOneDayPassScreen;

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
    lineHeight: 35,
    fontWeight: "700",
    letterSpacing: -0.7,
  },

  subtitle: {
    marginTop: 9,
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
    minHeight: 72,
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

  noticeContent: {
    flex: 1,
  },

  noticeTitle: {
    marginBottom: 5,
    fontSize: 13,
    fontWeight: "600",
  },

  noticeText: {
    fontSize: 11.5,
    lineHeight: 18,
  },

  pressed: {
    opacity: 0.55,
  },
});