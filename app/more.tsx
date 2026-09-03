import { useAppTheme } from "@/hooks/useAppTheme";
import { useRouter } from "expo-router";
import {
  ChevronRight,
  CircleHelp,
  CreditCard,
  Info,
  Plane,
  Settings,
  Star,
  Ticket,
} from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type MenuItemProps = {
  icon: typeof Plane;
  title: string;
  description?: string;
  onPress?: () => void;
  disabled?: boolean;
  showDivider?: boolean;
};

const MoreScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const MenuItem = ({
    icon: Icon,
    title,
    description,
    onPress,
    disabled = false,
    showDivider = false,
  }: MenuItemProps) => {
    return (
      <Pressable
        disabled={disabled}
        onPress={onPress}
        style={({ pressed }) => [
          styles.menuItem,
          pressed && !disabled && styles.pressed,
        ]}
      >
        <View style={styles.iconArea}>
          <Icon size={22} color={colors.text} strokeWidth={1.8} />
        </View>

        <View
          style={[
            styles.menuContent,
            showDivider && {
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <View style={styles.menuText}>
            <Text
              style={[
                styles.menuTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              {title}
            </Text>

            {description && (
              <Text
                style={[
                  styles.menuDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                {description}
              </Text>
            )}
          </View>

          {!disabled && (
            <ChevronRight
              size={18}
              color={colors.textSecondary}
              strokeWidth={1.8}
            />
          )}
        </View>
      </Pressable>
    );
  };

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.content,
          {
            paddingBottom: Math.max(insets.bottom, 12) + 110,
          },
        ]}
      >
        <Text
          style={[
            styles.pageTitle,
            {
              color: colors.text,
            },
          ]}
        >
          더보기
        </Text>

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
            icon={Plane}
            title="공항까지 가는 길"
            description="나리타 · 하네다 공항 교통 안내"
            disabled
          />

          <MenuItem
            icon={Ticket}
            title="여행자 패스"
            description="도쿄 교통패스 안내"
            disabled
          />

          <MenuItem
            icon={CreditCard}
            title="IC카드 이용 가이드"
            description="Suica · PASMO 이용 방법"
            disabled
          />

          <MenuItem
            icon={CircleHelp}
            title="일본 철도 이용 가이드"
            description="개찰구 · 환승 · 열차 이용 방법"
            disabled
          />
        </View>

        <View
          style={[
            styles.sectionDivider,
            {
              backgroundColor: colors.border,
            },
          ]}
        />

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
            icon={Star}
            title="즐겨찾는 역"
            description="저장한 역을 빠르게 확인"
            onPress={() => router.push("/favorite-stations")}
          />
        </View>

        <View
          style={[
            styles.sectionDivider,
            {
              backgroundColor: colors.border,
            },
          ]}
        />

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
            icon={Settings}
            title="설정"
            description="테마 및 앱 설정"
            onPress={() => router.push("/settings")}
          />

          <MenuItem
            icon={Info}
            title="앱 정보"
            description="Tokyo Railway Guide"
            disabled
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default MoreScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

  content: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 26,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: -0.5,
    marginBottom: 36,
  },

  section: {
    marginBottom: 8,
  },

  sectionTitle: {
    fontSize: 13,
    fontWeight: "600",
    marginBottom: 10,
  },

  menuItem: {
    minHeight: 66,
    flexDirection: "row",
    alignItems: "stretch",
  },

  iconArea: {
    width: 46,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  menuContent: {
    flex: 1,
    minHeight: 66,
    flexDirection: "row",
    alignItems: "center",
  },

  menuText: {
    flex: 1,
    justifyContent: "center",
  },

  menuTitle: {
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: -0.2,
  },

  menuDescription: {
    fontSize: 12.5,
    fontWeight: "400",
    lineHeight: 18,
    marginTop: 3,
  },

  sectionDivider: {
    height: StyleSheet.hairlineWidth,
    marginVertical: 22,
  },

  pressed: {
    opacity: 0.5,
  },
});
