import { StyleSheet, Text, View } from "react-native";

type LineBadgeProps = {
  code: string;
  color: string;
  size?: number;
};

export const LineBadge = ({ code, color, size = 54 }: LineBadgeProps) => {
  return (
    <View
      style={[
        styles.badge,
        {
          width: size,
          height: size,
          borderRadius: size * 0.28,
          backgroundColor: color,
        },
      ]}
    >
      <Text
        style={[
          styles.code,
          {
            fontSize: size * 0.3,
          },
        ]}
      >
        {code}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    alignItems: "center",
    justifyContent: "center",
  },

  code: {
    color: "#FFFFFF",
    fontWeight: "800",
  },
});
