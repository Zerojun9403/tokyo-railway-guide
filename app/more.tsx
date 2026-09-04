import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  CircleHelp,
  CreditCard,
  Info,
  Plane,
  Settings,
  Star,
  Ticket,
} from "lucide-react-native";
import {
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MenuItemProps = {
  icon: React.ReactNode;
  title: string;
  description: string;
  onPress?: () => void;
  disabled?: boolean;
  textColor: string;
  secondaryTextColor: string;
  borderColor: string;
};

const MenuItem = ({
  icon,
  title,
  description,
  onPress,
  disabled = false,
  textColor,
  secondaryTextColor,
  borderColor,
}: MenuItemProps) => {
  return (
    <Pressable
      disabled={disabled}
      onPress={onPress}
      style={({ pressed }) => [
        styles.menuItem,
        {
          borderBottomColor: borderColor,
        },
        pressed && !disabled && styles.pressed,
      ]}
    >
      <View style={styles.iconArea}>{icon}</View>

      <View style={styles.menuContent}>
        <Text
          style={[
            styles.menuTitle,
            {
              color: disabled ? secondaryTextColor : textColor,
            },
          ]}
        >
          {title}
        </Text>

        <Text
          style={[
            styles.menuDescription,
            {
              color: secondaryTextColor,
            },
          ]}
        >
          {description}
        </Text>
      </View>
    </Pressable>
  );
};

const MoreScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const iconColor = colors.textSecondary;

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
          <Text style={[styles.pageTitle, { color: colors.text }]}>
            더보기
          </Text>

          <Text
            style={[
              styles.pageDescription,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            도쿄 여행에 필요한 교통 정보와 앱 설정을 확인할 수 있습니다.
          </Text>
        </View>

        {/* 여행 */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            여행
          </Text>

          <MenuItem
            icon={
              <Plane
                size={20}
                color={iconColor}
                strokeWidth={1.7}
              />
            }
            title="공항까지 가는 길"
            description="나리타 · 하네다 공항 교통 안내"
            disabled
            textColor={colors.text}
            secondaryTextColor={colors.textSecondary}
            borderColor={colors.border}
          />

          <MenuItem
            icon={
              <Ticket
                size={20}
                color={iconColor}
                strokeWidth={1.7}
              />
            }
            title="여행자 패스"
            description="도쿄 교통패스 안내"
            onPress={() => router.push("/travel-passes")}
            textColor={colors.text}
            secondaryTextColor={colors.textSecondary}
            borderColor={colors.border}
          />

          <MenuItem
            icon={
              <CreditCard
                size={20}
                color={iconColor}
                strokeWidth={1.7}
              />
            }
            title="IC카드 이용 가이드"
            description="Suica · PASMO · 전국 상호이용 IC카드"
            onPress={() => router.push("/ic-card-guide")}
            textColor={colors.text}
            secondaryTextColor={colors.textSecondary}
            borderColor={colors.border}
          />

          <MenuItem
            icon={
              <CircleHelp
                size={20}
                color={iconColor}
                strokeWidth={1.7}
              />
            }
            title="일본 철도 이용 가이드"
            description="개찰구 · 환승 · 열차 이용 방법"
            onPress={() => router.push("/railway-guide")}
            textColor={colors.text}
            secondaryTextColor={colors.textSecondary}
            borderColor={colors.border}
          />
        </View>

        {/* 내 정보 */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            내 정보
          </Text>

          <MenuItem
            icon={
              <Star
                size={20}
                color={iconColor}
                strokeWidth={1.7}
              />
            }
            title="즐겨찾는 역"
            description="저장한 역을 빠르게 확인"
            onPress={() => router.push("/favorite-stations")}
            textColor={colors.text}
            secondaryTextColor={colors.textSecondary}
            borderColor={colors.border}
          />
        </View>

        {/* 앱 */}
        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            앱
          </Text>

          <MenuItem
            icon={
              <Settings
                size={20}
                color={iconColor}
                strokeWidth={1.7}
              />
            }
            title="설정"
            description="앱 설정 및 데이터 정보"
            onPress={() => router.push("/settings")}
            textColor={colors.text}
            secondaryTextColor={colors.textSecondary}
            borderColor={colors.border}
          />

          <MenuItem
            icon={
              <Info
                size={20}
                color={iconColor}
                strokeWidth={1.7}
              />
            }
            title="앱 정보"
            description="버전 및 서비스 정보"
            disabled
            textColor={colors.text}
            secondaryTextColor={colors.textSecondary}
            borderColor={colors.border}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 32,
  },

  header: {
    marginBottom: 38,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  pageDescription: {
    marginTop: 7,
    fontSize: 12.5,
    lineHeight: 19,
  },

  section: {
    marginBottom: 34,
  },

  sectionTitle: {
    marginBottom: 8,
    fontSize: 13,
    fontWeight: "600",
  },

  menuItem: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  iconArea: {
    width: 46,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  menuContent: {
    flex: 1,
    justifyContent: "center",
    paddingVertical: 12,
  },

  menuTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
    letterSpacing: -0.2,
  },

  menuDescription: {
    marginTop: 3,
    fontSize: 12.5,
    lineHeight: 17,
  },

  pressed: {
    opacity: 0.5,
  },
});