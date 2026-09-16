import FloatingBottomBar from "@/components/common/FloatingBottomBar";
import GlobalPhantomAssistant from "@/components/phantom/GlobalPhantomAssistant";
import { PhantomProvider } from "@/contexts/PhantomContext";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

const RootLayout = () => {
  const { isDark, colors } = useAppTheme();

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
        <GlobalPhantomAssistant />
      </View>
    </PhantomProvider>
  );
};

export default RootLayout;