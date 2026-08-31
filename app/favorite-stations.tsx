import { useCallback, useMemo } from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router, useFocusEffect } from "expo-router";

import { getStation } from "../data/railwayRegistry";

import { useAppTheme } from "../hooks/useAppTheme";
import { useFavoriteStations } from "../hooks/useFavoriteStations";

export default function FavoriteStationsScreen() {
  const { colors, isDark } = useAppTheme();

  /*
   * =======================================================
   * 즐겨찾기
   * =======================================================
   */

  const { favoriteStationIds, reload } = useFavoriteStations("");

  /*
   * =======================================================
   * 화면 진입 / 복귀 시 다시 불러오기
   * =======================================================
   */

  useFocusEffect(
    useCallback(() => {
      void reload();
    }, [reload]),
  );

  /*
   * =======================================================
   * Station[]
   * =======================================================
   */

  const favoriteStations = useMemo(() => {
    return favoriteStationIds
      .map((stationId) => getStation(stationId))
      .filter(
        (station): station is NonNullable<ReturnType<typeof getStation>> =>
          Boolean(station),
      );
  }, [favoriteStationIds]);

  /*
   * =======================================================
   * 역 상세 이동
   * =======================================================
   */

  const handlePressStation = (stationId: string) => {
    router.push({
      pathname: "/station/[stationId]",

      params: {
        stationId,
      },
    });
  };

  return (
    <SafeAreaView
      style={[
        styles.safeArea,
        {
          backgroundColor: colors.background,
        },
      ]}
    >
      <ScrollView
        style={[
          styles.screen,
          {
            backgroundColor: colors.background,
          },
        ]}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* =================================================
            Header
        ================================================= */}

        <View style={styles.header}>
          <TouchableOpacity
            style={[
              styles.backButton,
              {
                backgroundColor: colors.surface,
                borderColor: colors.border,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text
              style={[
                styles.backArrow,
                {
                  color: colors.text,
                },
              ]}
            >
              ‹
            </Text>
          </TouchableOpacity>

          <View style={styles.headerTextArea}>
            <Text
              style={[
                styles.headerTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              즐겨찾는 역
            </Text>

            <Text
              style={[
                styles.headerDescription,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              자주 이용하는 역을 관리합니다.
            </Text>
          </View>
        </View>

        {/* =================================================
            Count
        ================================================= */}

        <View style={styles.toolbar}>
          <Text
            style={[
              styles.resultCount,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            총 {favoriteStations.length}개
          </Text>
        </View>

        {/* =================================================
            Empty
        ================================================= */}

        {favoriteStations.length === 0 && (
          <View style={styles.emptyArea}>
            <View
              style={[
                styles.emptyIcon,
                {
                  backgroundColor: colors.surface,
                  borderColor: colors.border,
                },
              ]}
            >
              <Text style={styles.emptyIconText}>☆</Text>
            </View>

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
              역 상세 화면의 별을 눌러{"\n"}
              자주 이용하는 역을 저장해 보세요.
            </Text>

            <TouchableOpacity
              style={[
                styles.searchButton,
                {
                  backgroundColor: colors.text,
                },
              ]}
              activeOpacity={0.7}
              onPress={() => router.push("/search")}
            >
              <Text
                style={[
                  styles.searchButtonText,
                  {
                    color: colors.background,
                  },
                ]}
              >
                역 검색하기
              </Text>
            </TouchableOpacity>
          </View>
        )}

        {/* =================================================
            Favorite List
        ================================================= */}

        <View style={styles.stationList}>
          {favoriteStations.map((station) => (
            <FavoriteStationRow
              key={station.id}
              stationId={station.id}
              stationCode={station.code}
              stationNameKo={station.nameKo}
              stationNameJa={station.nameJa}
              lineNameKo={station.lineNameKo}
              color={station.color}
              isDark={isDark}
              onPress={() => handlePressStation(station.id)}
              onRemoved={() => {
                void reload();
              }}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

/*
 * =========================================================
 * Favorite Station Row
 * =========================================================
 *
 * Hook은 React 규칙상 map 안에서 직접 호출하면 안 된다.
 *
 * 그래서 각 역을 별도의 컴포넌트로 분리하고,
 * 이 컴포넌트 안에서 useFavoriteStations(stationId)를
 * 호출한다.
 * =========================================================
 */

type FavoriteStationRowProps = {
  stationId: string;

  stationCode: string;

  stationNameKo: string;

  stationNameJa: string;

  lineNameKo: string;

  color: string;

  isDark: boolean;

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
  isDark,
  onPress,
  onRemoved,
}: FavoriteStationRowProps) {
  const { colors } = useAppTheme();

  const { isFavorite, toggleFavorite } = useFavoriteStations(stationId);

  /*
   * =======================================================
   * 삭제
   * =======================================================
   */

  const handleRemove = async () => {
    /*
     * 이미 삭제된 상태라면
     * 다시 추가하지 않도록 방어
     */

    if (!isFavorite) {
      return;
    }

    await toggleFavorite();

    onRemoved();
  };

  return (
    <View
      style={[
        styles.stationCard,
        {
          backgroundColor: colors.surface,
          borderColor: colors.border,
        },
      ]}
    >
      {/* 역 상세 이동 영역 */}

      <TouchableOpacity
        style={styles.stationMain}
        activeOpacity={0.7}
        onPress={onPress}
      >
        <View
          style={[
            styles.stationBadge,
            {
              borderColor: color,
            },
          ]}
        >
          <Text
            style={[
              styles.stationBadgeText,
              {
                color,
              },
            ]}
          >
            {stationCode}
          </Text>
        </View>

        <View style={styles.stationInfo}>
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

          <Text
            style={[
              styles.stationLine,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            {lineNameKo}
          </Text>
        </View>
      </TouchableOpacity>

      {/* 즐겨찾기 삭제 */}

      <TouchableOpacity
        style={[
          styles.favoriteButton,
          {
            backgroundColor: isDark ? "#3A3218" : "#FFF8DE",
            borderColor: isDark ? "#5C4D17" : "#FBE9A3",
          },
        ]}
        activeOpacity={0.7}
        onPress={() => {
          void handleRemove();
        }}
        accessibilityRole="button"
        accessibilityLabel="즐겨찾기 해제"
      >
        <Text style={styles.favoriteIcon}>★</Text>
      </TouchableOpacity>
    </View>
  );
}

/*
 * =========================================================
 * Styles
 * =========================================================
 */

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 22,

    paddingTop: 22,

    paddingBottom: 120,
  },

  /*
   * =====================================================
   * Header
   * =====================================================
   */

  header: {
    flexDirection: "row",

    alignItems: "center",

    marginBottom: 28,
  },

  backButton: {
    width: 42,

    height: 42,

    borderRadius: 14,

    borderWidth: 1,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 13,
  },

  backArrow: {
    marginTop: -3,

    fontSize: 31,

    lineHeight: 34,
  },

  headerTextArea: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 24,

    lineHeight: 30,

    fontWeight: "900",
  },

  headerDescription: {
    marginTop: 2,

    fontSize: 12,

    lineHeight: 17,
  },

  /*
   * =====================================================
   * Toolbar
   * =====================================================
   */

  toolbar: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: 13,
  },

  resultCount: {
    fontSize: 12,

    fontWeight: "700",
  },

  /*
   * =====================================================
   * Station List
   * =====================================================
   */

  stationList: {
    gap: 10,
  },

  stationCard: {
    minHeight: 88,

    paddingHorizontal: 14,

    paddingVertical: 13,

    borderRadius: 20,

    borderWidth: 1,

    flexDirection: "row",

    alignItems: "center",
  },

  stationMain: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",
  },

  stationBadge: {
    minWidth: 50,

    height: 50,

    paddingHorizontal: 7,

    borderRadius: 16,

    borderWidth: 3,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 13,
  },

  stationBadgeText: {
    fontSize: 11,

    fontWeight: "900",
  },

  stationInfo: {
    flex: 1,

    minWidth: 0,
  },

  stationNameKo: {
    fontSize: 16,

    lineHeight: 21,

    fontWeight: "900",
  },

  stationNameJa: {
    marginTop: 1,

    fontSize: 10,

    lineHeight: 14,
  },

  stationLine: {
    marginTop: 5,

    fontSize: 11,

    lineHeight: 15,
  },

  /*
   * =====================================================
   * Favorite Button
   * =====================================================
   */

  favoriteButton: {
    width: 42,

    height: 42,

    marginLeft: 8,

    borderRadius: 14,

    borderWidth: 1,

    alignItems: "center",

    justifyContent: "center",
  },

  favoriteIcon: {
    fontSize: 20,

    lineHeight: 24,

    color: "#F5B800",
  },

  /*
   * =====================================================
   * Empty
   * =====================================================
   */

  emptyArea: {
    paddingTop: 80,

    alignItems: "center",
  },

  emptyIcon: {
    width: 70,

    height: 70,

    borderRadius: 23,

    borderWidth: 1,

    alignItems: "center",

    justifyContent: "center",
  },

  emptyIconText: {
    fontSize: 31,

    lineHeight: 35,

    color: "#F5B800",
  },

  emptyTitle: {
    marginTop: 19,

    fontSize: 18,

    lineHeight: 23,

    fontWeight: "900",
  },

  emptyDescription: {
    marginTop: 8,

    fontSize: 13,

    lineHeight: 20,

    textAlign: "center",
  },

  searchButton: {
    marginTop: 22,

    paddingHorizontal: 20,

    paddingVertical: 13,

    borderRadius: 14,
  },

  searchButtonText: {
    fontSize: 13,

    lineHeight: 18,

    fontWeight: "800",
  },
});
