import { useAppTheme } from "@/hooks/useAppTheme";
import { useGlobalSearchParams, usePathname, useRouter } from "expo-router";
import { Map, MoreHorizontal, Search } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabItem = {
  id: "search" | "lines" | "more";
  path: "/" | "/map" | "/more";
  icon: typeof Search;
};

const tabs: TabItem[] = [
  {
    id: "search",
    path: "/",
    icon: Search,
  },
  {
    id: "lines",
    path: "/map",
    icon: Map,
  },
  {
    id: "more",
    path: "/more",
    icon: MoreHorizontal,
  },
];

const FloatingBottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();

  const { lineId } = useGlobalSearchParams<{
    lineId?: string;
  }>();

  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const isActive = (tab: TabItem) => {
    /*
     * 검색
     */
    if (tab.id === "search") {
      return pathname === "/" || pathname === "/route-result";
    }

    /*
     * 노선
     */
    if (tab.id === "lines") {
      return (
        pathname === "/map" ||
        pathname.startsWith("/company") ||
        pathname.startsWith("/line/") ||
        pathname.startsWith("/railway/") ||
        pathname.startsWith("/station")
      );
    }

    /*
     * 더보기
     *
     * 더보기에서 진입하는 하위 페이지에서도
     * 더보기 탭을 활성 상태로 유지
     */
    if (tab.id === "more") {
      return (
        pathname === "/more" ||
        pathname.startsWith("/airport") ||
        pathname.startsWith("/travel-passes") ||
        pathname.startsWith("/travel-pass/") ||
        pathname.startsWith("/ic-card-guide") ||
        pathname.startsWith("/contactless-guide") ||
        pathname.startsWith("/railway-guide") ||
        pathname.startsWith("/favorite-stations") ||
        pathname.startsWith("/settings")
      );
    }

    return false;
  };

  const handlePress = (tab: TabItem) => {
    /*
     * 검색
     */
    if (tab.id === "search") {
      router.push("/");
      return;
    }

    /*
     * 노선
     */
    if (tab.id === "lines") {
      /*
       * 역 상세 페이지에서는
       * 현재 역이 속한 노선의 노선도로 이동
       */
      if (pathname.startsWith("/station") && lineId) {
        router.push(`/line/${lineId}`);
        return;
      }

      /*
       * 그 외 화면에서는
       * 노선 화면으로 이동
       */
      router.push("/map");
      return;
    }

    /*
     * 더보기
     */
    if (tab.id === "more") {
      router.push("/more");
      return;
    }
  };

  return (
    <View
      pointerEvents="box-none"
      style={[
        styles.wrapper,
        {
          bottom: Math.max(insets.bottom, 12),
        },
      ]}
    >
      <View
        style={[
          styles.bar,
          {
            backgroundColor: colors.bottomBar,
          },
        ]}
      >
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const active = isActive(tab);

          return (
            <Pressable
              key={tab.id}
              accessibilityRole="button"
              onPress={() => handlePress(tab)}
              style={({ pressed }) => [
                styles.button,
                active && {
                  backgroundColor: colors.bottomBarActive,
                },
                pressed && styles.pressedButton,
              ]}
            >
              <Icon
                size={24}
                color={
                  active
                    ? colors.bottomBarActiveIcon
                    : colors.bottomBarIcon
                }
                strokeWidth={2}
              />
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

export default FloatingBottomBar;

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    left: 18,
    right: 18,
    alignItems: "center",
    zIndex: 100,
    elevation: 20,
  },

  bar: {
    width: "100%",
    maxWidth: 430,
    minHeight: 68,
    paddingHorizontal: 8,
    paddingVertical: 8,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",

    borderRadius: 24,

    shadowColor: "#000000",
    shadowOffset: {
      width: 0,
      height: 8,
    },
    shadowOpacity: 0.2,
    shadowRadius: 16,
  },

  button: {
    flex: 1,
    height: 52,
    marginHorizontal: 2,

    alignItems: "center",
    justifyContent: "center",

    borderRadius: 17,
  },

  pressedButton: {
    opacity: 0.7,
  },
});