import { useEffect, useState } from "react";
import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "../../hooks/useAppTheme";

const formatTime = (date: Date) => {
  const hours = date.getHours().toString().padStart(2, "0");

  const minutes = date.getMinutes().toString().padStart(2, "0");

  const seconds = date.getSeconds().toString().padStart(2, "0");

  return `${hours}:${minutes}:${seconds}`;
};

export const LiveClock = () => {
  const [currentTime, setCurrentTime] = useState(new Date());

  const { colors } = useAppTheme();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <View style={styles.container}>
      <View style={styles.dot} />

      <Text
        style={[
          styles.text,
          {
            color: colors.text,
          },
        ]}
      >
        LIVE {formatTime(currentTime)}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
  },

  dot: {
    width: 8,
    height: 8,

    borderRadius: 4,

    backgroundColor: "#16A34A",

    marginRight: 6,
  },

  text: {
    fontSize: 12,

    fontWeight: "600",
  },
});
