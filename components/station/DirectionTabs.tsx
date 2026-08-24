import { Pressable, StyleSheet, Text, View } from "react-native";

type DirectionItem = {
  id: string;
  label: string;
};

type DirectionTabsProps = {
  directions: DirectionItem[];

  selectedDirectionId: string;

  color: string;

  onChangeDirection: (directionId: string) => void;
};

export const DirectionTabs = ({
  directions,
  selectedDirectionId,
  color,
  onChangeDirection,
}: DirectionTabsProps) => {
  return (
    <View style={styles.container}>
      {directions.map((direction) => {
        const isActive = direction.id === selectedDirectionId;

        return (
          <Pressable
            key={direction.id}
            style={styles.tab}
            onPress={() => onChangeDirection(direction.id)}
          >
            <Text
              numberOfLines={2}
              style={[
                styles.label,
                isActive && {
                  color,
                },
              ]}
            >
              {direction.label}
            </Text>

            <View
              style={[
                styles.indicator,
                isActive && {
                  backgroundColor: color,
                },
              ]}
            />
          </Pressable>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    flexDirection: "row",

    marginTop: 34,
    marginBottom: 28,
  },

  tab: {
    flex: 1,

    alignItems: "center",

    paddingHorizontal: 4,
  },

  label: {
    minHeight: 24,

    fontSize: 17,
    lineHeight: 22,

    fontWeight: "700",

    textAlign: "center",

    color: "#A3ACB9",
  },

  indicator: {
    width: "78%",
    height: 2,

    marginTop: 8,

    borderRadius: 999,

    backgroundColor: "transparent",
  },
});
