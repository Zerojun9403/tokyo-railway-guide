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

import { useFavoriteStations } from "../hooks/useFavoriteStations";

export default function FavoriteStationsScreen() {
  /*
   * =======================================================
   * 즐겨찾기
   * =======================================================
   */

  const { favoriteStationIds, toggleFavorite, reload } =
    useFavoriteStations("");

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

  /*
   * =======================================================
   * 즐겨찾기 삭제
   * =======================================================
   *
   * 현재 useFavoriteStations는 전달받은 stationId를
   * toggle하는 구조이므로,
   *
   * 관리 화면에서는 역마다 Hook을 호출할 수 없다.
   *
   * 따라서 아래 FavoriteStationRow에서
   * 역별 Hook을 사용한다.
   * =======================================================
   */

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* =================================================
            Header
        ================================================= */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTextArea}>
            <Text style={styles.headerTitle}>즐겨찾는 역</Text>

            <Text style={styles.headerDescription}>
              자주 이용하는 역을 관리합니다.
            </Text>
          </View>
        </View>

        {/* =================================================
            Count
        ================================================= */}

        <View style={styles.toolbar}>
          <Text style={styles.resultCount}>총 {favoriteStations.length}개</Text>
        </View>

        {/* =================================================
            Empty
        ================================================= */}

        {favoriteStations.length === 0 && (
          <View style={styles.emptyArea}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>☆</Text>
            </View>

            <Text style={styles.emptyTitle}>즐겨찾는 역이 없습니다</Text>

            <Text style={styles.emptyDescription}>
              역 상세 화면의 별을 눌러{"\n"}
              자주 이용하는 역을 저장해 보세요.
            </Text>

            <TouchableOpacity
              style={styles.searchButton}
              activeOpacity={0.7}
              onPress={() => router.push("/search")}
            >
              <Text style={styles.searchButtonText}>역 검색하기</Text>
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
  onPress,
  onRemoved,
}: FavoriteStationRowProps) {
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
    <View style={styles.stationCard}>
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
          <Text style={styles.stationNameKo}>{stationNameKo}</Text>

          <Text style={styles.stationNameJa}>{stationNameJa}</Text>

          <Text style={styles.stationLine}>{lineNameKo}</Text>
        </View>
      </TouchableOpacity>

      {/* 즐겨찾기 삭제 */}

      <TouchableOpacity
        style={styles.favoriteButton}
        activeOpacity={0.7}
        onPress={() => {
          void handleRemove();
        }}
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

    backgroundColor: "#F5F6F8",
  },

  screen: {
    flex: 1,

    backgroundColor: "#F5F6F8",
  },

  container: {
    paddingHorizontal: 22,

    paddingTop: 22,

    paddingBottom: 70,
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

    backgroundColor: "#FFFFFF",

    alignItems: "center",

    justifyContent: "center",

    marginRight: 13,
  },

  backArrow: {
    marginTop: -3,

    fontSize: 31,

    lineHeight: 34,

    color: "#17191D",
  },

  headerTextArea: {
    flex: 1,
  },

  headerTitle: {
    fontSize: 24,

    lineHeight: 30,

    fontWeight: "900",

    color: "#17191D",
  },

  headerDescription: {
    marginTop: 2,

    fontSize: 12,

    lineHeight: 17,

    color: "#8C96A5",
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

    color: "#8C96A5",
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

    backgroundColor: "#FFFFFF",

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

    color: "#17191D",
  },

  stationNameJa: {
    marginTop: 1,

    fontSize: 10,

    lineHeight: 14,

    color: "#9AA4B3",
  },

  stationLine: {
    marginTop: 5,

    fontSize: 11,

    lineHeight: 15,

    color: "#747E8C",
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

    backgroundColor: "#FFF8DE",

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

    backgroundColor: "#FFFFFF",

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

    color: "#17191D",
  },

  emptyDescription: {
    marginTop: 8,

    fontSize: 13,

    lineHeight: 20,

    color: "#8C96A5",

    textAlign: "center",
  },

  searchButton: {
    marginTop: 22,

    paddingHorizontal: 20,

    paddingVertical: 13,

    borderRadius: 14,

    backgroundColor: "#17191D",
  },

  searchButtonText: {
    fontSize: 13,

    lineHeight: 18,

    fontWeight: "800",

    color: "#FFFFFF",
  },
});
