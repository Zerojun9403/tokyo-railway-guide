import { useAppTheme } from "@/hooks/useAppTheme";
import { Href, router } from "expo-router";
import { ChevronLeft, ChevronRight, Ticket } from "lucide-react-native";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TravelPassItem = {
  id: string;
  name: string;
  operator: string;
  validity: string;
  route: Href;
};

const travelPasses: TravelPassItem[] = [
  {
    id: "tokyo-subway-ticket",
    name: "Tokyo Subway Ticket",
    operator: "도쿄메트로 · 도에이 지하철",
    validity: "24 / 48 / 72시간",
    route: "/travel-pass/tokyo-subway-ticket",
  },
  {
    id: "tokyo-metro-24-hour-ticket",
    name: "Tokyo Metro 24-hour Ticket",
    operator: "도쿄메트로",
    validity: "24시간",
    route: "/travel-pass/tokyo-metro-24-hour-ticket",
  },
  {
    id: "tokyo-metro-toei-one-day-pass",
    name: "도쿄메트로·도에이 공통 1일 승차권",
    operator: "도쿄메트로 · 도에이 지하철",
    validity: "1일",
    route: "/travel-pass/tokyo-metro-toei-one-day-pass",
  },
  {
    id: "tokyo-combination-ticket",
    name: "도쿄 프리 승차권",
    operator: "JR동일본 · 도쿄메트로 · 도에이",
    validity: "1일",
    route: "/travel-pass/tokyo-combination-ticket",
  },
  {
    id: "greater-tokyo-pass",
    name: "Greater Tokyo Pass",
    operator: "수도권 주요 사철",
    validity: "5일",
    route: "/travel-pass/greater-tokyo-pass",
  },
  {
    id: "jr-tokyo-wide-pass",
    name: "JR TOKYO Wide Pass",
    operator: "JR동일본 · 수도권 근교",
    validity: "3일",
    route: "/travel-pass/jr-tokyo-wide-pass",
  },
];

const TravelPassesScreen = () => {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

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

          <Text style={[styles.pageTitle, { color: colors.text }]}>
            여행자 패스
          </Text>
        </View>

        <View style={styles.intro}>
          <View style={styles.introIconArea}>
            <Ticket size={20} color={colors.text} strokeWidth={1.7} />
          </View>

          <View style={styles.introContent}>
            <Text style={[styles.introTitle, { color: colors.text }]}>
              도쿄 교통패스
            </Text>

            <Text
              style={[
                styles.introDescription,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              여행 일정과 이용 노선에 맞는 패스를 확인해 보세요.
            </Text>
          </View>
        </View>

        <View style={styles.passList}>
          {travelPasses.map((travelPass, index) => {
            const isLast = index === travelPasses.length - 1;

            return (
              <Pressable
                key={travelPass.id}
                onPress={() => router.push(travelPass.route)}
                style={({ pressed }) => [
                  styles.passRow,
                  !isLast && {
                    borderBottomWidth: StyleSheet.hairlineWidth,
                    borderBottomColor: colors.border,
                  },
                  pressed && styles.pressed,
                ]}
              >
                <View style={styles.passContent}>
                  <Text style={[styles.passName, { color: colors.text }]}>
                    {travelPass.name}
                  </Text>

                  <Text
                    style={[
                      styles.passOperator,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    {travelPass.operator}
                  </Text>
                </View>

                <View style={styles.passRight}>
                  <Text
                    style={[
                      styles.passValidity,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    {travelPass.validity}
                  </Text>

                  <ChevronRight
                    size={17}
                    color={colors.textSecondary}
                    strokeWidth={1.8}
                  />
                </View>
              </Pressable>
            );
          })}
        </View>

        <Text
          style={[
            styles.guideText,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          패스를 선택하면 이용 가능한 노선과 요금, 구매 및 이용 방법을 확인할
          수 있습니다.
        </Text>
      </ScrollView>
    </View>
  );
};

export default TravelPassesScreen;

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
    marginBottom: 34,
  },

  backButton: {
    width: 38,
    height: 38,
    alignItems: "flex-start",
    justifyContent: "center",
    marginRight: 6,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  intro: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 6,
  },

  introIconArea: {
    width: 46,
    paddingTop: 2,
  },

  introContent: {
    flex: 1,
  },

  introTitle: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: -0.2,
  },

  introDescription: {
    marginTop: 4,
    fontSize: 12.5,
    lineHeight: 18,
  },

  passList: {
    marginLeft: 46,
  },

  passRow: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
  },

  passContent: {
    flex: 1,
    minWidth: 0,
    paddingVertical: 14,
    paddingRight: 12,
  },

  passName: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
    letterSpacing: -0.2,
  },

  passOperator: {
    marginTop: 5,
    fontSize: 11.5,
    lineHeight: 16,
  },

  passRight: {
    flexDirection: "row",
    alignItems: "center",
    marginLeft: 8,
  },

  passValidity: {
    marginRight: 7,
    fontSize: 11,
    lineHeight: 16,
  },

  guideText: {
    marginTop: 22,
    marginLeft: 46,
    paddingRight: 18,
    fontSize: 11.5,
    lineHeight: 18,
  },

  pressed: {
    opacity: 0.5,
  },
});