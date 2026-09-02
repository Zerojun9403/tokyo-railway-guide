import { useColorScheme } from "react-native";

import { darkColors, lightColors } from "@/constants/theme";

export const useAppTheme = () => {
  const colorScheme = useColorScheme();

  const isDark = colorScheme === "dark";
  const colors = isDark ? darkColors : lightColors;

  return {
    colorScheme,
    isDark,
    colors,
  };
};
