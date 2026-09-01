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
import { ArrowLeft, History } from "lucide-react-native";

import { getStation } from "../data/railwayRegistry";
import { useAppTheme } from "../hooks/useAppTheme";
import { useRecentStations } from "../hooks/useRecentStations";

export default function RecentStationsScreen() {
  const { colors, isDark } = useAppTheme();

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
        {/* Header */}

        <View style={styles.header}>
          <TouchableOpacity
            style={[
              styles.backButton,
              {
                backgroundColor: colors.surface,
              },
            ]}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <ArrowLeft
              size={22}
              color={colors.text}
              strokeWidth={2}
            />
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
              최근 본 역
            </Text>

            <Text
              style={[
                styles.headerDescription,
                {
                  color: colors.textMuted,
                },
              ]}
            >
              최근 확인한 역 기록을 관리합니다.
            </Text>
          </View>
        </View>

        {/* Toolbar */}

        <View style={styles.toolbar}>
          <Text
            style={[
              styles.resultCount,
              {
                color: colors.textMuted,
              },
            ]}
          >
            총 {recentStations.length}개
          </Text>

          {recentStations.length > 0 && (
            <TouchableOpacity activeOpacity={0.7} onPress={handleClearAll}>
              <Text style={styles.clearAllText}>전체 삭제</Text>
            </TouchableOpacity>
          )}
        </View>

        {/* Empty */}

        {recentStations.length === 0 && (
          <View style={styles.emptyArea}>
            <View
              style={[
                styles.emptyIcon,
                {
                  backgroundColor: colors.surface,
                },
              ]}
            >
              <History
                size={28}
                color={colors.textMuted}
                strokeWidth={2}
              />
            </View>

            <Text
              style={[
                styles.emptyTitle,
                {
                  color: colors.text,
                },
              ]}
            >
              최근 본 역이 없습니다
            </Text>

            <Text
              style={[
                styles.emptyDescription,
                {
                  color: colors.textMuted,
                },
              ]}
            >
              역 상세 페이지를 확인하면{"\n"}
              최근 본 역에 자동으로 저장됩니다.
            </Text>
          </View>
        )}

        {/* List */}

        <View style={styles.stationList}>
          {recentStations.map((station) => (
            <View
              key={station.id}
              style={[
                styles.stationCard,
                {
                  backgroundColor: colors.surface,
                },
              ]}
            >
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
                  <Text
                    style={[
                      styles.stationNameKo,
                      {
                        color: colors.text,
                      },
                    ]}
                  >
                    {station.nameKo}
                  </Text>

                  <Text
                    style={[
                      styles.stationNameJa,
                      {
                        color: colors.textMuted,
                      },
                    ]}
                  >
                    {station.nameJa}
                  </Text>

                  <Text
                    style={[
                      styles.stationLine,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    {station.lineNameKo}
                  </Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.deleteButton,
                  {
                    backgroundColor: isDark ? "#3A1F22" : "#FEF2F2",
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => handleRemove(station.id, station.nameKo)}
              >
                <Text
                  style={[
                    styles.deleteButtonText,
                    {
                      color: isDark ? "#FF7B7B" : "#DC2626",
                    },
                  ]}
                >
                  삭제
                </Text>
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
  },

  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 22,
    paddingTop: 22,
    paddingBottom: 120,
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
    alignItems: "center",
    justifyContent: "center",
    marginRight: 13,
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

  deleteButton: {
    marginLeft: 10,
    paddingHorizontal: 12,
    paddingVertical: 9,
    borderRadius: 11,
  },

  deleteButtonText: {
    fontSize: 11,
    fontWeight: "800",
  },

  emptyArea: {
    paddingTop: 80,
    alignItems: "center",
  },

  emptyIcon: {
    width: 70,
    height: 70,
    borderRadius: 23,
    alignItems: "center",
    justifyContent: "center",
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
});