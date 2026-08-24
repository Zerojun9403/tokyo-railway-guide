import { Pressable, StyleSheet, Text, View } from "react-native";

type DirectionItem = {
  id: string;

  label: string;

  description?: string;
};

type DirectionSelectorProps = {
  directions: DirectionItem[];

  selectedDirectionId: string;

  color: string;

  onChangeDirection: (directionId: string) => void;
};

export const DirectionSelector = ({
  directions,
  selectedDirectionId,
  color,
  onChangeDirection,
}: DirectionSelectorProps) => {
  return (
    <View style={styles.container}>
      <Text style={styles.sectionLabel}>운행방향</Text>

      <View style={styles.list}>
        {directions.map((direction) => {
          const isActive = direction.id === selectedDirectionId;

          return (
            <Pressable
              key={direction.id}
              style={({ pressed }) => [
                styles.card,

                isActive && {
                  borderColor: color,
                  borderWidth: 2,
                },

                pressed && styles.cardPressed,
              ]}
              onPress={() => onChangeDirection(direction.id)}
            >
              {/* 왼쪽 노선 아이콘 */}

              <View
                style={[
                  styles.badge,
                  {
                    backgroundColor: color,
                  },
                ]}
              >
                <Text style={styles.badgeText}>E</Text>
              </View>

              {/* 방향 정보 */}

              <View style={styles.directionInfo}>
                <Text
                  style={[
                    styles.directionLabel,

                    isActive && {
                      color,
                    },
                  ]}
                >
                  {direction.label}
                </Text>

                {direction.description ? (
                  <Text style={styles.description}>
                    {direction.description}
                  </Text>
                ) : null}
              </View>

              {/* 화살표 */}

              <Text
                style={[
                  styles.chevron,

                  isActive && {
                    color,
                  },
                ]}
              >
                ›
              </Text>
            </Pressable>
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",

    marginTop: 32,
    marginBottom: 28,
  },

  sectionLabel: {
    marginBottom: 12,

    fontSize: 15,
    lineHeight: 20,

    fontWeight: "700",

    color: "#9AA4B3",
  },

  list: {
    gap: 10,
  },

  card: {
    width: "100%",

    minHeight: 76,

    backgroundColor: "#FFFFFF",

    borderRadius: 20,

    borderWidth: 2,
    borderColor: "transparent",

    paddingHorizontal: 16,
    paddingVertical: 14,

    flexDirection: "row",
    alignItems: "center",
  },

  cardPressed: {
    opacity: 0.65,
  },

  badge: {
    width: 46,
    height: 46,

    borderRadius: 14,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 14,
  },

  badgeText: {
    color: "#FFFFFF",

    fontSize: 16,
    lineHeight: 20,

    fontWeight: "800",
  },

  directionInfo: {
    flex: 1,
  },

  directionLabel: {
    fontSize: 16,
    lineHeight: 21,

    fontWeight: "800",

    color: "#17191D",
  },

  description: {
    marginTop: 3,

    fontSize: 12,
    lineHeight: 16,

    color: "#8C96A5",
  },

  chevron: {
    marginLeft: 12,

    fontSize: 30,
    lineHeight: 32,

    color: "#A6AFBC",
  },
});
