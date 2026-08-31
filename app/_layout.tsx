import { Stack } from "expo-router";
import { View } from "react-native";

import FloatingBottomBar from "@/components/common/FloatingBottomBar";

const RootLayout = () => {
  return (
    <View style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      />

      <FloatingBottomBar />
    </View>
  );
};

export default RootLayout;
