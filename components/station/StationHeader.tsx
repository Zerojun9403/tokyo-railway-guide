import { Pressable, StyleSheet, Text, View } from "react-native";

import { LineBadge } from "../common/LineBadge";
import { LiveClock } from "../common/LiveClock";

import { useAppTheme } from "../../hooks/useAppTheme";

type StationHeaderProps = {
  lineCode: string;
  stationCode: string;

  stationNameKo: string;
  stationNameJa: string;

  color: string;

  hasTransfer?: boolean;

  onPressTransfer?: () => void;
};

export const StationHeader = ({
  lineCode,
  stationCode,
  stationNameKo,
  stationNameJa,
  color,
  hasTransfer = false,
  onPressTransfer,
}: StationHeaderProps) => {
  const { colors } = useAppTheme();

  return (
    <View style={styles.container}>
      {/* 왼쪽: 역 정보 */}
      <View style={styles.stationArea}>
        <LineBadge code={lineCode} color={color} size={54} />

        <View style={styles.stationTextArea}>
          <Text style={[styles.stationCode, { color }]}>{stationCode}</Text>

          <Text
            style={[
              styles.stationNameKo,
              {
                color: colors.text,
              },
            ]}
          >
            {stationNameKo}
          </Text>

          <Text
            style={[
              styles.stationNameJa,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {stationNameJa}
          </Text>
        </View>
      </View>

      {/* 오른쪽: LIVE + 환승 */}
      <View style={styles.rightArea}>
        <LiveClock />

        {hasTransfer && (
          <Pressable
            style={({ pressed }) => [
              styles.transferButton,
              pressed && styles.transferButtonPressed,
            ]}
            onPress={onPressTransfer}
          >
            <Text
              style={[
                styles.transferIcon,
                {
                  color: colors.text,
                },
              ]}
            >
              ⇄
            </Text>

            <Text
              style={[
                styles.transferText,
                {
                  color: colors.text,
                },
              ]}
            >
              환승노선
            </Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },

  stationArea: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    minWidth: 0,
  },

  stationTextArea: {
    flex: 1,
    marginLeft: 12,
  },

  stationCode: {
    fontSize: 13,
    lineHeight: 16,
    fontWeight: "800",
  },

  stationNameKo: {
    marginTop: 1,

    fontSize: 22,
    lineHeight: 27,

    fontWeight: "800",
  },

  stationNameJa: {
    marginTop: 1,

    fontSize: 13,
    lineHeight: 17,

    fontWeight: "400",
  },

  rightArea: {
    marginLeft: 12,

    alignItems: "flex-end",
    justifyContent: "center",
  },

  transferButton: {
    marginTop: 10,

    flexDirection: "row",
    alignItems: "center",

    paddingVertical: 4,
  },

  transferButtonPressed: {
    opacity: 0.5,
  },

  transferIcon: {
    marginRight: 5,

    fontSize: 18,
    lineHeight: 20,
  },

  transferText: {
    fontSize: 13,
    lineHeight: 18,

    fontWeight: "700",
  },
});
