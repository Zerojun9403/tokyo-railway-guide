import { Star } from "lucide-react-native";
import { StyleSheet, TouchableOpacity, View } from "react-native";

import { useAppTheme } from "../../hooks/useAppTheme";

type StationTopActionsProps = {
  isFavorite: boolean;
  favoriteLoading?: boolean;
  onPressFavorite: () => void;
};

export const StationTopActions = ({
  isFavorite,
  favoriteLoading = false,
  onPressFavorite,
}: StationTopActionsProps) => {
  const { colors, isDark } = useAppTheme();

  return (
    <View style={styles.container}>
      {/* 즐겨찾기 */}
      <TouchableOpacity
        style={[
          styles.actionButton,
          {
            backgroundColor: isFavorite
              ? isDark
                ? "#3A3218"
                : "#FFF8DE"
              : colors.surface,
            borderColor: isFavorite ? "#F5B800" : colors.border,
          },
        ]}
        activeOpacity={0.7}
        disabled={favoriteLoading}
        onPress={onPressFavorite}
        accessibilityRole="button"
        accessibilityLabel={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
      >
        <Star
          size={23}
          color={isFavorite ? "#F5B800" : colors.textSecondary}
          fill={isFavorite ? "#F5B800" : "transparent"}
          strokeWidth={2.2}
        />
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
  },

  actionButton: {
    width: 44,
    height: 44,
    borderRadius: 14,
    borderWidth: 1,
    alignItems: "center",
    justifyContent: "center",
  },
});