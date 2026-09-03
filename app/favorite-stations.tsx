import { useCallback, useMemo } from "react";

import { router, useFocusEffect } from "expo-router";
import { ChevronLeft, ChevronRight, Search, Star } from "lucide-react-native";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { getStation } from "../data/railwayRegistry";
import { useAppTheme } from "../hooks/useAppTheme";
import { useFavoriteStations } from "../hooks/useFavoriteStations";

export default function FavoriteStationsScreen() {
  const { colors } = useAppTheme();
  const insets = useSafeAreaInsets();

  const { favoriteStationIds, reload } = useFavoriteStations("");

  useFocusEffect(
    useCallback(() => {
      void reload();
    }, [reload]),
  );

  const favoriteStations = useMemo(() => {
    return favoriteStationIds
      .map((stationId) => getStation(stationId))
      .filter(
        (station): station is NonNullable<ReturnType<typeof getStation>> =>
          Boolean(station),
      );
  }, [favoriteStationIds]);

  const handlePressStation = (stationId: string) => {
    router.push({
      pathname: "/station/[stationId]",
      params: {
        stationId,
      },
    });
  };

  return (
    <View
      style={[
        styles.screen,
        {
          backgroundColor: colors.background,
          paddingTop: insets.top,
        },
      ]}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          {
            paddingBottom: Math.max(insets.bottom, 12) + 110,
          },
        ]}
      >
        {/* Header */}

        <View style={styles.header}>
          <Pressable
            onPress={() => router.back()}
            style={({ pressed }) => [
              styles.backButton,
              pressed && styles.pressed,
            ]}
          >
            <ChevronLeft size={25} color={colors.text} strokeWidth={1.8} />
          </Pressable>

          <Text
            style={[
              styles.pageTitle,
              {
                color: colors.text,
              },
            ]}
          >
            즐겨찾는 역
          </Text>
        </View>

        {/* 설명 */}

        <View style={styles.intro}>
          <Text
            style={[
              styles.introText,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            자주 이용하는 역을 빠르게 확인할 수 있습니다.
          </Text>

          <Text
            style={[
              styles.countText,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {favoriteStations.length}개
          </Text>
        </View>

        {/* Empty */}

        {favoriteStations.length === 0 && (
          <View style={styles.emptyArea}>
            <Star size={32} color={colors.textSecondary} strokeWidth={1.6} />

            <Text
              style={[
                styles.emptyTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              즐겨찾는 역이 없습니다
            </Text>

            <Text
              style={[
                styles.emptyDescription,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              역 상세 화면에서 별을 눌러{"\n"}
              자주 이용하는 역을 저장해 보세요.
            </Text>

            <Pressable
              onPress={() => router.push("/search")}
              style={({ pressed }) => [
                styles.searchButton,
                {
                  borderColor: colors.border,
                },
                pressed && styles.pressed,
              ]}
            >
              <Search size={17} color={colors.text} strokeWidth={1.8} />

              <Text
                style={[
                  styles.searchButtonText,
                  {
                    color: colors.text,
                  },
                ]}
              >
                역 검색
              </Text>
            </Pressable>
          </View>
        )}

        {/* Favorite List */}

        {favoriteStations.length > 0 && (
          <View style={styles.stationList}>
            {favoriteStations.map((station, index) => (
              <FavoriteStationRow
                key={station.id}
                stationId={station.id}
                stationCode={station.code}
                stationNameKo={station.nameKo}
                stationNameJa={station.nameJa}
                lineNameKo={station.lineNameKo}
                color={station.color}
                showDivider={index < favoriteStations.length - 1}
                onPress={() => handlePressStation(station.id)}
                onRemoved={() => {
                  void reload();
                }}
              />
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}

type FavoriteStationRowProps = {
  stationId: string;
  stationCode: string;
  stationNameKo: string;
  stationNameJa: string;
  lineNameKo: string;
  color: string;
  showDivider: boolean;
  onPress: () => void;
  onRemoved: () => void;
};

function FavoriteStationRow({
  stationId,
  stationCode,
  stationNameKo,
  stationNameJa,
  lineNameKo,
  color,
  showDivider,
  onPress,
  onRemoved,
}: FavoriteStationRowProps) {
  const { colors } = useAppTheme();

  const { isFavorite, toggleFavorite } = useFavoriteStations(stationId);

  const handleRemove = async () => {
    if (!isFavorite) {
      return;
    }

    await toggleFavorite();
    onRemoved();
  };

  return (
    <View style={styles.stationRow}>
      <Pressable
        onPress={onPress}
        style={({ pressed }) => [styles.stationMain, pressed && styles.pressed]}
      >
        {/* 역 코드 */}

        <View
          style={[
            styles.stationCode,
            {
              borderColor: color,
            },
          ]}
        >
          <Text
            style={[
              styles.stationCodeText,
              {
                color,
              },
            ]}
          >
            {stationCode}
          </Text>
        </View>

        {/* 역 정보 */}

        <View
          style={[
            styles.stationContent,
            showDivider && {
              borderBottomWidth: StyleSheet.hairlineWidth,
              borderBottomColor: colors.border,
            },
          ]}
        >
          <View style={styles.stationInfo}>
            <View style={styles.stationNameRow}>
              <Text
                style={[
                  styles.stationNameKo,
                  {
                    color: colors.text,
                  },
                ]}
                numberOfLines={1}
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
                numberOfLines={1}
              >
                {stationNameJa}
              </Text>
            </View>

            <Text
              style={[
                styles.stationLine,
                {
                  color: colors.textSecondary,
                },
              ]}
              numberOfLines={1}
            >
              {lineNameKo}
            </Text>
          </View>

          <Pressable
            onPress={(event) => {
              event.stopPropagation();
              void handleRemove();
            }}
            hitSlop={12}
            style={({ pressed }) => [
              styles.favoriteButton,
              pressed && styles.pressed,
            ]}
            accessibilityRole="button"
            accessibilityLabel="즐겨찾기 해제"
          >
            <Star size={19} color="#F5B800" fill="#F5B800" strokeWidth={1.7} />
          </Pressable>

          <ChevronRight
            size={17}
            color={colors.textSecondary}
            strokeWidth={1.8}
          />
        </View>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  /* Header */

  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 30,
  },

  backButton: {
    width: 38,
    height: 38,
    alignItems: "flex-start",
    justifyContent: "center",
    marginRight: 6,
  },

  pageTitle: {
    fontSize: 26,
    fontWeight: "700",
    letterSpacing: -0.5,
  },

  /* Intro */

  intro: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 24,
  },

  introText: {
    flex: 1,
    fontSize: 12.5,
    lineHeight: 18,
  },

  countText: {
    marginLeft: 16,
    fontSize: 12,
    fontWeight: "500",
  },

  /* Station List */

  stationList: {
    width: "100%",
  },

  stationRow: {
    width: "100%",
  },

  stationMain: {
    minHeight: 76,
    flexDirection: "row",
    alignItems: "stretch",
  },

  stationCode: {
    width: 38,
    height: 38,
    marginTop: 19,
    marginRight: 12,

    borderRadius: 12,
    borderWidth: 2,

    alignItems: "center",
    justifyContent: "center",
  },

  stationCodeText: {
    fontSize: 9.5,
    fontWeight: "700",
  },

  stationContent: {
    flex: 1,
    minHeight: 76,

    flexDirection: "row",
    alignItems: "center",
  },

  stationInfo: {
    flex: 1,
    minWidth: 0,
  },

  stationNameRow: {
    flexDirection: "row",
    alignItems: "baseline",
  },

  stationNameKo: {
    maxWidth: "60%",
    fontSize: 15,
    fontWeight: "600",
    letterSpacing: -0.2,
  },

  stationNameJa: {
    flexShrink: 1,
    marginLeft: 7,
    fontSize: 10.5,
  },

  stationLine: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 17,
  },

  favoriteButton: {
    width: 38,
    height: 38,

    alignItems: "center",
    justifyContent: "center",

    marginRight: 2,
  },

  /* Empty */

  emptyArea: {
    paddingTop: 90,
    alignItems: "center",
  },

  emptyTitle: {
    marginTop: 18,
    fontSize: 16,
    fontWeight: "600",
  },

  emptyDescription: {
    marginTop: 8,
    fontSize: 12.5,
    lineHeight: 19,
    textAlign: "center",
  },

  searchButton: {
    marginTop: 24,
    height: 42,

    paddingHorizontal: 16,

    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",

    borderWidth: 1,
    borderRadius: 14,

    gap: 7,
  },

  searchButtonText: {
    fontSize: 13,
    fontWeight: "600",
  },

  pressed: {
    opacity: 0.5,
  },
});
