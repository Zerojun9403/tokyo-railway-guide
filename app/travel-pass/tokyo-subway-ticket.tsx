import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  Clock3,
  Info,
  Map,
  Smartphone,
} from "lucide-react-native";
import { useState } from "react";
import {
  Image,
  ImageSourcePropType,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TicketDuration = "24" | "48" | "72";

type TicketInfo = {
  duration: TicketDuration;
  label: string;
  adultPrice: string;
  childPrice: string;
  validity: string;
  image: ImageSourcePropType;
};

const tickets: TicketInfo[] = [
  {
    duration: "24",
    label: "24시간",
    adultPrice: "¥1,000",
    childPrice: "¥500",
    validity: "첫 이용 시점부터 24시간",
    image: require("../../assets/images/tokyo-subway-ticket-24.png"),
  },
  {
    duration: "48",
    label: "48시간",
    adultPrice: "¥1,500",
    childPrice: "¥750",
    validity: "첫 이용 시점부터 48시간",
    image: require("../../assets/images/tokyo-subway-ticket-48.png"),
  },
  {
    duration: "72",
    label: "72시간",
    adultPrice: "¥2,000",
    childPrice: "¥1,000",
    validity: "첫 이용 시점부터 72시간",
    image: require("../../assets/images/tokyo-subway-ticket-72.png"),
  },
];

const TokyoSubwayTicketScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const [selectedDuration, setSelectedDuration] =
    useState<TicketDuration>("24");

  const selectedTicket =
    tickets.find((ticket) => ticket.duration === selectedDuration) ??
    tickets[0];

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
            Tokyo Subway Ticket
          </Text>

          <Text
            style={[
              styles.subtitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            도쿄메트로와 도에이 지하철을 자유롭게 이용할 수 있는 여행자용
            교통패스
          </Text>
        </View>

        {/* Duration Selector */}
        <View style={styles.selectorSection}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            이용 시간 선택
          </Text>

          <View
            style={[
              styles.selector,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
          >
            {tickets.map((ticket) => {
              const isSelected =
                selectedDuration === ticket.duration;

              return (
                <Pressable
                  key={ticket.duration}
                  onPress={() =>
                    setSelectedDuration(ticket.duration)
                  }
                  style={({ pressed }) => [
                    styles.selectorButton,
                    isSelected && styles.selectorButtonSelected,
                    pressed && styles.pressed,
                  ]}
                >
                  <Text
                    style={[
                      styles.selectorText,
                      {
                        color: isSelected
                          ? "#FFFFFF"
                          : colors.textSecondary,
                      },
                    ]}
                  >
                    {ticket.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* Selected Ticket */}
        <View
          style={[
            styles.ticketCard,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <View style={styles.ticketImageArea}>
            <Image
              source={selectedTicket.image}
              style={styles.ticketImage}
              resizeMode="contain"
            />
          </View>

          <View
            style={[
              styles.cardDivider,
              {
                backgroundColor: colors.border,
              },
            ]}
          />

          <View style={styles.ticketCardContent}>
            <View style={styles.ticketCardHeader}>
              <View>
                <Text
                  style={[
                    styles.ticketDuration,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  {selectedTicket.label}권
                </Text>

                <Text
                  style={[
                    styles.ticketValidity,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  {selectedTicket.validity}
                </Text>
              </View>
            </View>

            <View style={styles.priceArea}>
              <View style={styles.priceRow}>
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

                <Text
                  style={[
                    styles.adultPrice,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  {selectedTicket.adultPrice}
                </Text>
              </View>

              <View style={styles.priceRow}>
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

                <Text
                  style={[
                    styles.childPrice,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  {selectedTicket.childPrice}
                </Text>
              </View>
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
              <Map
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.infoContent}>
              <Text
                style={[
                  styles.infoTitle,
                  {
                    color: colors.text,
                  },
                ]}
              >
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
              <Clock3
                size={19}
                color={colors.text}
                strokeWidth={1.7}
              />
            </View>

            <View style={styles.infoContent}>
              <Text
                style={[
                  styles.infoTitle,
                  {
                    color: colors.text,
                  },
                ]}
              >
                유효시간
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                {selectedTicket.validity}
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
              <Text
                style={[
                  styles.infoTitle,
                  {
                    color: colors.text,
                  },
                ]}
              >
                QR 티켓 이용
              </Text>

              <Text
                style={[
                  styles.infoDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                스마트폰에서 QR 티켓을 표시해 이용할 수 있습니다.
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
        <View style={styles.noteSection}>
          <Info
            size={17}
            color={colors.textSecondary}
            strokeWidth={1.7}
          />

          <Text
            style={[
              styles.noteText,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            구매 방법과 이용 조건은 티켓 종류에 따라 다를 수 있습니다.
            구매 전 공식 안내를 확인해 주세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default TokyoSubwayTicketScreen;

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

  /* Header */

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

  /* Title */

  titleArea: {
    marginBottom: 30,
  },

  title: {
    fontSize: 27,
    fontWeight: "700",
    letterSpacing: -0.7,
  },

  subtitle: {
    marginTop: 8,
    maxWidth: 560,
    fontSize: 13,
    lineHeight: 20,
  },

  /* Selector */

  selectorSection: {
    marginBottom: 20,
  },

  sectionTitle: {
    marginBottom: 14,
    fontSize: 13,
    fontWeight: "600",
  },

  selector: {
    width: "100%",
    height: 48,
    flexDirection: "row",
    alignItems: "center",
    padding: 4,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 12,
  },

  selectorButton: {
    flex: 1,
    height: 38,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 9,
  },

  selectorButtonSelected: {
    backgroundColor: "#A78BFA",
  },

  selectorText: {
    fontSize: 13,
    fontWeight: "600",
  },

  /* Ticket Card */

  ticketCard: {
    width: "100%",
    overflow: "hidden",
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
  },

  ticketImageArea: {
    width: "100%",
    height: 210,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 22,
    paddingVertical: 18,
  },

  ticketImage: {
    width: "100%",
    height: "100%",
  },

  cardDivider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
  },

  ticketCardContent: {
    paddingHorizontal: 20,
    paddingTop: 18,
    paddingBottom: 20,
  },

  ticketCardHeader: {
    flexDirection: "row",
    alignItems: "flex-start",
    justifyContent: "space-between",
  },

  ticketDuration: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.3,
  },

  ticketValidity: {
    marginTop: 5,
    fontSize: 11.5,
    lineHeight: 17,
  },

  priceArea: {
    marginTop: 18,
  },

  priceRow: {
    minHeight: 34,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  priceLabel: {
    fontSize: 12.5,
    fontWeight: "500",
  },

  adultPrice: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.3,
  },

  childPrice: {
    fontSize: 14,
    fontWeight: "600",
  },

  /* Information */

  section: {
    width: "100%",
  },

  sectionDivider: {
    width: "100%",
    height: StyleSheet.hairlineWidth,
    marginVertical: 30,
  },

  infoRow: {
    minHeight: 70,
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

  /* Note */

  noteSection: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
  },

  noteText: {
    flex: 1,
    fontSize: 11.5,
    lineHeight: 18,
  },

  pressed: {
    opacity: 0.55,
  },
});