import { Ionicons } from "@expo/vector-icons";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

type StationTopActionsProps = {
  isFavorite: boolean;
  favoriteLoading?: boolean;

  onPressLine: () => void;
  onPressHome: () => void;
  onPressFavorite: () => void;
};

export const StationTopActions = ({
  isFavorite,
  favoriteLoading = false,
  onPressLine,
  onPressHome,
  onPressFavorite,
}: StationTopActionsProps) => {
  return (
    <View style={styles.container}>
      {/* 노선으로 돌아가기 */}
      <TouchableOpacity
        style={styles.actionButton}
        activeOpacity={0.7}
        onPress={onPressLine}
        accessibilityRole="button"
        accessibilityLabel="노선으로 돌아가기"
      >
        <Ionicons
          name="return-up-back-outline"
          size={24}
          color="#14171B"
        />
      </TouchableOpacity>

      {/* 홈 */}
      <TouchableOpacity
        style={styles.actionButton}
        activeOpacity={0.7}
        onPress={onPressHome}
        accessibilityRole="button"
        accessibilityLabel="홈으로 이동"
      >
        <Ionicons
          name="home-outline"
          size={23}
          color="#14171B"
        />
      </TouchableOpacity>

      {/* 즐겨찾기 */}
      <TouchableOpacity
        style={[
          styles.actionButton,
          isFavorite && styles.favoriteButtonActive,
        ]}
        activeOpacity={0.7}
        disabled={favoriteLoading}
        onPress={onPressFavorite}
        accessibilityRole="button"
        accessibilityLabel={
          isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"
        }
      >
        <Text
          style={[
            styles.favoriteIcon,
            isFavorite && styles.favoriteIconActive,
          ]}
        >
          {isFavorite ? "★" : "☆"}
        </Text>
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

    borderRadius: 15,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "#FFFFFF",
  },

  favoriteButtonActive: {
    backgroundColor: "#FFF8DE",
  },

  favoriteIcon: {
    marginTop: -2,

    fontSize: 25,
    lineHeight: 29,

    color: "#A3ABB6",
  },

  favoriteIconActive: {
    color: "#F5B800",
  },
});