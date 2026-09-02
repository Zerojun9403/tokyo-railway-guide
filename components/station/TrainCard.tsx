import { StyleSheet, Text, View } from "react-native";

import { useAppTheme } from "../../hooks/useAppTheme";

import { Plane } from "lucide-react-native";

import { isAirportName } from "../../utils/airport";

type TrainCardProps = {
  time: string;

  minutes: number;

  color: string;

  trainType?: string;

  destinationKo?: string;

  destinationJa?: string;

  isOrigin?: boolean;
};

export const TrainCard = ({
  time,
  minutes,
  color,
  trainType,
  destinationKo,
  destinationJa,
  isOrigin = false,
}: TrainCardProps) => {
  const { colors, isDark } = useAppTheme();

  /*
   * =========================================================
   * 출발까지 남은 시간
   * =========================================================
   *
   * 3 → 3분 후
   * 2 → 2분 후
   * 1 → 1분 후
   * 0 → 곧 출발
   *
   * 이미 출발한 열차(minutes < 0)는
   * station/[stationId].tsx에서 제거한다.
   * =========================================================
   */

  const minutesText = minutes === 0 ? "곧 출발" : `${minutes}분 후`;

  return (
    <View
      style={[
        styles.card,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      {/* =====================================================
          상단 - 열차 종류 / 시발역
      ===================================================== */}

      {(trainType || isOrigin) && (
        <View style={styles.topRow}>
          <View style={styles.trainInfoRow}>
            {trainType ? (
              <Text
                style={[
                  styles.trainType,
                  {
                    color,
                  },
                ]}
              >
                {trainType}
              </Text>
            ) : null}

            {isOrigin ? (
              <View
                style={[
                  styles.originBadge,
                  {
                    backgroundColor: isDark ? "#173526" : "#E8F5EE",
                  },
                ]}
              >
                <Text style={styles.originText}>이 역 출발</Text>
              </View>
            ) : null}
          </View>
        </View>
      )}

      {/* =====================================================
          출발 시간
      ===================================================== */}

      <View style={styles.timeRow}>
        <Text
          style={[
            styles.time,
            {
              color: colors.text,
            },
          ]}
        >
          {time}
        </Text>

        <Text
          style={[
            styles.minutes,
            {
              color,
            },
          ]}
        >
          {minutesText}
        </Text>
      </View>

{/* =====================================================
    행선지
===================================================== */}

{destinationKo ? (
  <View style={styles.destinationArea}>
    <View style={styles.destinationKoRow}>
      <Text
        style={[
          styles.destinationKo,
          {
            color: colors.text,
          },
        ]}
      >
        {destinationKo}
      </Text>

      {isAirportName(destinationKo, destinationJa) && (
        <Plane
          size={16}
          color={colors.textSecondary}
          strokeWidth={2.2}
        />
      )}
    </View>

    {destinationJa ? (
      <Text
        style={[
          styles.destinationJa,
          {
            color: colors.textSecondary,
          },
        ]}
      >
        {destinationJa}
      </Text>
    ) : null}
  </View>
) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    width: "100%",

    minHeight: 132,

    borderRadius: 22,

    borderWidth: 1,

    paddingHorizontal: 18,
    paddingVertical: 18,
  },

  /*
   * =========================================================
   * 상단
   * =========================================================
   */

  topRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: 5,
  },

  trainInfoRow: {
    flexDirection: "row",

    alignItems: "center",
  },

  trainType: {
    fontSize: 13,

    lineHeight: 17,

    fontWeight: "800",
  },

  /*
   * =========================================================
   * 이 역 출발 Badge
   * =========================================================
   */

  originBadge: {
    marginLeft: 8,

    paddingHorizontal: 8,

    paddingVertical: 4,

    borderRadius: 7,
  },

  originText: {
    fontSize: 10,

    lineHeight: 13,

    fontWeight: "800",

    color: "#16A34A",
  },

  /*
   * =========================================================
   * 시간
   * =========================================================
   */

  timeRow: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  time: {
    fontSize: 38,

    lineHeight: 44,

    fontWeight: "900",

    letterSpacing: -1,
  },

  /*
   * =========================================================
   * 몇 분 후
   * =========================================================
   */

  minutes: {
    fontSize: 17,

    lineHeight: 22,

    fontWeight: "800",
  },

  /*
   * =========================================================
   * 행선지
   * =========================================================
   */

  destinationArea: {
    marginTop: 10,
  },

  destinationKo: {
    fontSize: 16,

    lineHeight: 21,

    fontWeight: "800",
  },

  destinationJa: {
    marginTop: 2,

    fontSize: 12,

    lineHeight: 16,
  },

  /*
   * =========================================================
   * 공항전용
   * =========================================================
   */

  destinationKoRow: {
  flexDirection: "row",
  alignItems: "center",
  gap: 6,
},
});
