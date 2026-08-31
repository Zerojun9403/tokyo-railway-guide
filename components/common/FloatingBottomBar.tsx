import { usePathname, useRouter } from "expo-router";
import { Home, Map, Search, Settings, Star } from "lucide-react-native";
import { Pressable, StyleSheet, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type TabItem = {
  id: "home" | "lines" | "search" | "favorites" | "settings";
  path: "/" | "/search" | "/favorite-stations" | "/settings";
  icon: typeof Home;
};

const tabs: TabItem[] = [
  {
    id: "home",
    path: "/",
    icon: Home,
  },
  {
    id: "lines",
    path: "/",
    icon: Map,
  },
  {
    id: "search",
    path: "/search",
    icon: Search,
  },
  {
    id: "favorites",
    path: "/favorite-stations",
    icon: Star,
  },
  {
    id: "settings",
    path: "/settings",
    icon: Settings,
  },
];

const FloatingBottomBar = () => {
  const router = useRouter();
  const pathname = usePathname();
  const insets = useSafeAreaInsets();

  const isActive = (tab: TabItem) => {
    if (tab.id === "home") {
      return pathname === "/";
    }

    if (tab.id === "lines") {
      return (
        pathname.startsWith("/company") ||
        pathname.startsWith("/line") ||
        pathname.startsWith("/railway")
      );
    }

    return pathname === tab.path;
  };

  const handlePress = (tab: TabItem) => {
    if (tab.id === "lines") {
      router.push("/");
      return;
    }

    router.push(tab.path);
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
      <View style={styles.bar}>
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
                active && styles.activeButton,
                pressed && styles.pressedButton,
              ]}
            >
              <Icon
                size={24}
                color={active ? "#111827" : "#FFFFFF"}
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

    backgroundColor: "rgba(20, 22, 26, 0.94)",
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

  activeButton: {
    backgroundColor: "#FFFFFF",
  },

  pressedButton: {
    opacity: 0.7,
  },
});
