import { useAppTheme } from "@/hooks/useAppTheme";
import { Href, useRouter } from "expo-router";
import {
  ChevronLeft,
  ChevronRight,
  CircleAlert,
  Clock3,
  DoorOpen,
  MapPin,
  Repeat2,
  Signpost,
  TrainFront,
  Undo2,
} from "lucide-react-native";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type GuideItem = {
  number: string;
  title: string;
  description: string;
  route: Href;
  icon: React.ReactNode;
};

type GuideItemProps = GuideItem & {
  textColor: string;
  secondaryTextColor: string;
  borderColor: string;
  onPress: () => void;
};

const GuideListItem = ({
  number,
  title,
  description,
  icon,
  textColor,
  secondaryTextColor,
  borderColor,
  onPress,
}: GuideItemProps) => {
  return (
    <Pressable
      onPress={onPress}
      style={({ pressed }) => [
        styles.guideItem,
        {
          borderBottomColor: borderColor,
        },
        pressed && styles.pressed,
      ]}
    >
      <View style={styles.numberArea}>
        <Text style={styles.guideNumber}>{number}</Text>
      </View>

      <View style={styles.iconArea}>
        {icon}
      </View>

      <View style={styles.guideContent}>
        <Text
          style={[
            styles.guideTitle,
            {
              color: textColor,
            },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.guideDescription,
            {
              color: secondaryTextColor,
            },
          ]}
        >
          {description}
        </Text>
      </View>

      <ChevronRight
        size={18}
        color={secondaryTextColor}
        strokeWidth={1.7}
      />
    </Pressable>
  );
};

const RailwayGuideScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const guides: GuideItem[] = [
    {
      number: "01",
      title: "개찰구 이용 방법",
      description: "IC카드와 승차권으로 개찰구 통과하기",
      route: "/railway-guide/gate",
      icon: (
        <DoorOpen
          size={20}
          color={colors.text}
          strokeWidth={1.7}
        />
      ),
    },
    {
      number: "02",
      title: "승강장 찾는 방법",
      description: "노선 · 방향 · 승강장 번호 확인하기",
      route: "/railway-guide/platform",
      icon: (
        <MapPin
          size={20}
          color={colors.text}
          strokeWidth={1.7}
        />
      ),
    },
    {
      number: "03",
      title: "열차 종류 확인하기",
      description: "보통 · 급행 · 특급 등 열차 종류 이해하기",
      route: "/railway-guide/train-type",
      icon: (
        <TrainFront
          size={20}
          color={colors.text}
          strokeWidth={1.7}
        />
      ),
    },
    {
      number: "04",
      title: "행선지 확인하기",
      description: "전광판에서 시간 · 종류 · 행선지 확인하기",
      route: "/railway-guide/destination",
      icon: (
        <Signpost
          size={20}
          color={colors.text}
          strokeWidth={1.7}
        />
      ),
    },
    {
      number: "05",
      title: "환승하는 방법",
      description: "환승 표지판과 개찰구를 따라 이동하기",
      route: "/railway-guide/transfer",
      icon: (
        <Repeat2
          size={20}
          color={colors.text}
          strokeWidth={1.7}
        />
      ),
    },
    {
      number: "06",
      title: "직통운전이란?",
      description: "노선이 바뀌어도 같은 열차로 이동하는 경우",
      route: "/railway-guide/through-service",
      icon: (
        <TrainFront
          size={20}
          color={colors.text}
          strokeWidth={1.7}
        />
      ),
    },
    {
      number: "07",
      title: "추가 요금이 필요한 열차",
      description: "특급권 · 지정석 등 별도 요금 확인하기",
      route: "/railway-guide/extra-fare",
      icon: (
        <CircleAlert
          size={20}
          color={colors.text}
          strokeWidth={1.7}
        />
      ),
    },
    {
      number: "08",
      title: "막차 이용 시 주의",
      description: "목적지까지 갈 수 있는 마지막 열차 확인하기",
      route: "/railway-guide/last-train",
      icon: (
        <Clock3
          size={20}
          color={colors.text}
          strokeWidth={1.7}
        />
      ),
    },
    {
      number: "09",
      title: "잘못 탔을 때",
      description: "반대 방향이나 다른 열차를 탔을 때 대처하기",
      route: "/railway-guide/wrong-train",
      icon: (
        <Undo2
          size={20}
          color={colors.text}
          strokeWidth={1.7}
        />
      ),
    },
  ];

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

          <Text
            style={[
              styles.headerTitle,
              {
                color: colors.text,
              },
            ]}
          >
            일본 철도 이용 가이드
          </Text>
        </View>

        {/* Intro */}
        <View style={styles.intro}>
          <Text style={styles.introLabel}>
            RAILWAY GUIDE
          </Text>

          <Text
            style={[
              styles.pageTitle,
              {
                color: colors.text,
              },
            ]}
          >
            일본 전철, 이것만 알면 쉬워요
          </Text>

          <Text
            style={[
              styles.pageDescription,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            개찰구를 통과하는 방법부터 열차 종류, 환승, 막차까지
            일본 철도를 이용할 때 필요한 내용을 순서대로 확인해보세요.
          </Text>
        </View>

        <View
          style={[
            styles.divider,
            {
              backgroundColor: colors.border,
            },
          ]}
        />

        {/* Guide List */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            이용 가이드
          </Text>

          <View style={styles.guideList}>
            {guides.map((guide) => (
              <GuideListItem
                key={guide.number}
                {...guide}
                textColor={colors.text}
                secondaryTextColor={colors.textSecondary}
                borderColor={colors.border}
                onPress={() => router.push(guide.route)}
              />
            ))}
          </View>
        </View>

        {/* Footer */}
        <View
          style={[
            styles.footer,
            {
              borderTopColor: colors.border,
            },
          ]}
        >
          <CircleAlert
            size={16}
            color={colors.textSecondary}
            strokeWidth={1.7}
          />

          <Text
            style={[
              styles.footerText,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            실제 이용 방법은 철도회사와 역 구조에 따라 다를 수 있습니다.
            역의 안내 표지판과 직원 안내를 함께 확인하세요.
          </Text>
        </View>
      </ScrollView>
    </View>
  );
};

export default RailwayGuideScreen;

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

  introLabel: {
    color: "#A78BFA",
    fontSize: 12,
    fontWeight: "700",
    letterSpacing: 0.7,
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
    maxWidth: 520,
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

  sectionTitle: {
    marginBottom: 8,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },

  guideList: {
    width: "100%",
  },

  guideItem: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  numberArea: {
    width: 38,
    justifyContent: "center",
  },

  guideNumber: {
    color: "#A78BFA",
    fontSize: 11.5,
    fontWeight: "700",
  },

  iconArea: {
    width: 40,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  guideContent: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 13,
    paddingRight: 12,
  },

  guideTitle: {
    fontSize: 14.5,
    lineHeight: 20,
    fontWeight: "600",
    letterSpacing: -0.2,
  },

  guideDescription: {
    marginTop: 3,
    fontSize: 11.5,
    lineHeight: 17,
  },

  footer: {
    flexDirection: "row",
    alignItems: "flex-start",
    gap: 12,
    marginTop: 30,
    paddingTop: 20,
    borderTopWidth: StyleSheet.hairlineWidth,
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