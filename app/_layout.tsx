import FloatingBottomBar from "@/components/common/FloatingBottomBar";
import GlobalPhantomAssistant from "@/components/phantom/GlobalPhantomAssistant";
import { PhantomProvider } from "@/contexts/PhantomContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Stack, usePathname } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

const RootLayout = () => {
  const { isDark, colors } = useAppTheme();
  const pathname = usePathname();

  const isRouteResultScreen = pathname === "/route-result";

  return (
    <PhantomProvider>
      <View
        style={{
          flex: 1,
          backgroundColor: colors.background,
        }}
      >
        <StatusBar style={isDark ? "light" : "dark"} />

        <Stack
          screenOptions={{
            headerShown: false,
            contentStyle: {
              backgroundColor: colors.background,
            },
          }}
        />

        <FloatingBottomBar />

        {!isRouteResultScreen && (
          <GlobalPhantomAssistant />
        )}
      </View>
    </PhantomProvider>
  );
};

export default RootLayout;