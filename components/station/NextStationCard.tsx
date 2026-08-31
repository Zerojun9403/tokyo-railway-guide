import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { LineBadge } from "../common/LineBadge";

import { useAppTheme } from "../../hooks/useAppTheme";

type NextStationCardProps = {
  lineCode: string;
  lineNameKo?: string;

  stationCode: string;
  stationNameKo: string;
  stationNameJa: string;

  color: string;

  showLineName?: boolean;

  onPress?: () => void;
};

export const NextStationCard = ({
  lineCode,
  lineNameKo,
  stationCode,
  stationNameKo,
  stationNameJa,
  color,
  showLineName = false,
  onPress,
}: NextStationCardProps) => {
  const { colors } = useAppTheme();

  return (
    <TouchableOpacity
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
      activeOpacity={0.75}
      onPress={onPress}
      disabled={!onPress}
    >
      {/* 분기역처럼 노선명이 필요한 경우에만 표시 */}
      {showLineName && lineNameKo ? (
        <Text
          style={[
            styles.lineName,
            {
              color: colors.textSecondary,
            },
          ]}
        >
          {lineNameKo}
        </Text>
      ) : null}

      <View style={styles.stationRow}>
        <LineBadge code={lineCode} color={color} size={48} />

        <View style={styles.stationInfo}>
          <Text
            style={[
              styles.stationCode,
              {
                color,
              },
            ]}
          >
            {stationCode}
          </Text>

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
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",

    borderRadius: 20,

    borderWidth: 1,

    paddingHorizontal: 18,
    paddingVertical: 16,
  },

  lineName: {
    marginBottom: 10,

    fontSize: 12,
    lineHeight: 16,

    fontWeight: "700",
  },

  stationRow: {
    flexDirection: "row",
    alignItems: "center",
  },

  stationInfo: {
    flex: 1,

    marginLeft: 13,
  },

  stationCode: {
    fontSize: 12,
    lineHeight: 15,

    fontWeight: "800",
  },

  stationNameKo: {
    marginTop: 1,

    fontSize: 18,
    lineHeight: 23,

    fontWeight: "800",
  },

  stationNameJa: {
    marginTop: 2,

    fontSize: 12,
    lineHeight: 16,
  },
});
