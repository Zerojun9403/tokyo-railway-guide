import { useCallback, useMemo } from "react";

import {
  Alert,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router, useFocusEffect } from "expo-router";

import { getStation } from "../data/railwayRegistry";

import { useRecentStations } from "../hooks/useRecentStations";

export default function RecentStationsScreen() {
  const { recentStationIds, removeRecent, clearRecent, reload } =
    useRecentStations();

  useFocusEffect(
    useCallback(() => {
      void reload();
    }, [reload]),
  );

  const recentStations = useMemo(() => {
    return recentStationIds
      .map((stationId) => getStation(stationId))
      .filter(
        (station): station is NonNullable<ReturnType<typeof getStation>> =>
          Boolean(station),
      );
  }, [recentStationIds]);

  const handlePressStation = (stationId: string) => {
    router.push({
      pathname: "/station/[stationId]",

      params: {
        stationId,
      },
    });
  };

  const handleRemove = (stationId: string, stationName: string) => {
    Alert.alert(
      "최근 본 역 삭제",
      `${stationName} 역을 최근 본 역에서 삭제할까요?`,
      [
        {
          text: "취소",
          style: "cancel",
        },

        {
          text: "삭제",
          style: "destructive",

          onPress: () => {
            void removeRecent(stationId);
          },
        },
      ],
    );
  };

  const handleClearAll = () => {
    if (recentStations.length === 0) {
      return;
    }

    Alert.alert("최근 본 역 전체 삭제", "최근 본 역 기록을 모두 삭제할까요?", [
      {
        text: "취소",
        style: "cancel",
      },

      {
        text: "전체 삭제",
        style: "destructive",

        onPress: () => {
          void clearRecent();
        },
      },
    ]);
  };

  return (
    <SafeAreaView style={styles.safeArea}>
      <ScrollView
        style={styles.screen}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
      >
        {/* Header */}

        <View style={styles.header}>
          <TouchableOpacity
            style={styles.backButton}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text style={styles.backArrow}>‹</Text>
          </TouchableOpacity>

          <View style={styles.headerTextArea}>
            <Text style={styles.headerTitle}>최근 본 역</Text>

            <Text style={styles.headerDescription}>
              최근 확인한 역 기록을 관리합니다.
            </Text>
          </View>
        </View>

        {/* Toolbar */}

        <View style={styles.toolbar}>
          <Text style={styles.resultCount}>총 {recentStations.length}개</Text>

          {recentStations.length > 0 && (
            <TouchableOpacity activeOpacity={0.7} onPress={handleClearAll}>
              <Text style={styles.clearAllText}>전체 삭제</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Empty */}

        {recentStations.length === 0 && (
          <View style={styles.emptyArea}>
            <View style={styles.emptyIcon}>
              <Text style={styles.emptyIconText}>↻</Text>
            </View>

            <Text style={styles.emptyTitle}>최근 본 역이 없습니다</Text>

            <Text style={styles.emptyDescription}>
              역 상세 페이지를 확인하면{"\n"}
              최근 본 역에 자동으로 저장됩니다.
            </Text>
          </View>
        )}

        {/* List */}

        <View style={styles.stationList}>
          {recentStations.map((station) => (
            <View key={station.id} style={styles.stationCard}>
              <TouchableOpacity
                style={styles.stationMain}
                activeOpacity={0.7}
                onPress={() => handlePressStation(station.id)}
              >
                <View
                  style={[
                    styles.stationBadge,

                    {
                      backgroundColor: station.color,
                    },
                  ]}
                >
                  <Text style={styles.stationBadgeText}>{station.code}</Text>
                </View>

                <View style={styles.stationInfo}>
                  <Text style={styles.stationNameKo}>{station.nameKo}</Text>

                  <Text style={styles.stationNameJa}>{station.nameJa}</Text>

                  <Text style={styles.stationLine}>{station.lineNameKo}</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.deleteButton}
                activeOpacity={0.7}
                onPress={() => handleRemove(station.id, station.nameKo)}
              >
                <Text style={styles.deleteButtonText}>삭제</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

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

  clearAllText: {
    fontSize: 12,
    fontWeight: "800",
    color: "#DC2626",
  },

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
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
  },

  stationBadgeText: {
    fontSize: 11,
    fontWeight: "900",
    color: "#FFFFFF",
  },

  stationInfo: {
    flex: 1,
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

  deleteButton: {
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 11,
    backgroundColor: "#FEF2F2",
  },

  deleteButtonText: {
    fontSize: 11,
    fontWeight: "800",
    color: "#DC2626",
  },

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
    fontSize: 26,
    fontWeight: "900",
    color: "#8C96A5",
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
});
