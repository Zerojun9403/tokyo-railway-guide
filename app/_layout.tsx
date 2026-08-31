import FloatingBottomBar from "@/components/common/FloatingBottomBar";
import { useAppTheme } from "@/hooks/useAppTheme";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { View } from "react-native";

const RootLayout = () => {
  const { isDark, colors } = useAppTheme();

  return (
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
    </View>
  );
};

export default RootLayout;
