import { useEffect, useState } from "react";

import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import { router, useLocalSearchParams } from "expo-router";
import {
  ArrowDownUp,
  ChevronRight,
  Map,
  MapPin,
  Navigation,
  Search,
} from "lucide-react-native";

import { useAppTheme } from "../hooks/useAppTheme";

type SelectedStation = {
  stationId: string;
  lineId?: string;
  nameKo?: string;
  nameJa?: string;
};

const HomeScreen = () => {
  const { colors } = useAppTheme();

  const params = useLocalSearchParams<{
    mode?: string;
    stationId?: string;
    lineId?: string;
    nameKo?: string;
    nameJa?: string;

    departureStationId?: string;
    departureLineId?: string;
    departureNameKo?: string;
    departureNameJa?: string;

    arrivalStationId?: string;
    arrivalLineId?: string;
    arrivalNameKo?: string;
    arrivalNameJa?: string;
  }>();

  const [departure, setDeparture] =
    useState<SelectedStation | null>(null);

  const [arrival, setArrival] =
    useState<SelectedStation | null>(null);

  useEffect(() => {
    if (params.departureStationId) {
      setDeparture({
        stationId: params.departureStationId,
        lineId: params.departureLineId,
        nameKo: params.departureNameKo,
        nameJa: params.departureNameJa,
      });
    }

    if (params.arrivalStationId) {
      setArrival({
        stationId: params.arrivalStationId,
        lineId: params.arrivalLineId,
        nameKo: params.arrivalNameKo,
        nameJa: params.arrivalNameJa,
      });
    }

    if (
      params.mode === "departure" &&
      params.stationId
    ) {
      setDeparture({
        stationId: params.stationId,
        lineId: params.lineId,
        nameKo: params.nameKo,
        nameJa: params.nameJa,
      });
    }

    if (
      params.mode === "arrival" &&
      params.stationId
    ) {
      setArrival({
        stationId: params.stationId,
        lineId: params.lineId,
        nameKo: params.nameKo,
        nameJa: params.nameJa,
      });
    }
  }, [
    params.mode,
    params.stationId,
    params.lineId,
    params.nameKo,
    params.nameJa,
    params.departureStationId,
    params.departureLineId,
    params.departureNameKo,
    params.departureNameJa,
    params.arrivalStationId,
    params.arrivalLineId,
    params.arrivalNameKo,
    params.arrivalNameJa,
  ]);

  const handleSelectDeparture = () => {
    router.push({
      pathname: "/search",

      params: {
        mode: "departure",

        arrivalStationId:
          arrival?.stationId ?? "",

        arrivalLineId:
          arrival?.lineId ?? "",

        arrivalNameKo:
          arrival?.nameKo ?? "",

        arrivalNameJa:
          arrival?.nameJa ?? "",
      },
    });
  };

  const handleSelectArrival = () => {
    router.push({
      pathname: "/search",

      params: {
        mode: "arrival",

        departureStationId:
          departure?.stationId ?? "",

        departureLineId:
          departure?.lineId ?? "",

        departureNameKo:
          departure?.nameKo ?? "",

        departureNameJa:
          departure?.nameJa ?? "",
      },
    });
  };

  const handleSwapStations = () => {
    const previousDeparture = departure;

    setDeparture(arrival);
    setArrival(previousDeparture);
  };

  const canSearch =
    !!departure?.nameKo &&
    !!arrival?.nameKo;

  const handleSearchRoute = () => {
    if (
      !departure?.nameKo ||
      !arrival?.nameKo
    ) {
      return;
    }

    router.push({
      pathname: "/route-result" as any,

      params: {
        departureNameKo:
          departure.nameKo,

        departureNameJa:
          departure.nameJa ?? "",

        arrivalNameKo:
          arrival.nameKo,

        arrivalNameJa:
          arrival.nameJa ?? "",
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
        {/* Hero */}

        <View style={styles.hero}>
          <Text
            style={[
              styles.eyebrow,
              {
                color: colors.textMuted,
              },
            ]}
          >
            TOKYO RAILWAY GUIDE
          </Text>

          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            어디로 갈까요?
          </Text>

          <Text
            style={[
              styles.description,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            출발역과 도착역을 선택하면 환승 경로를 안내해 드려요.
          </Text>
        </View>

        {/* Route Search */}

        <View
          style={[
            styles.routeCard,
            {
              backgroundColor: colors.surface,
            },
          ]}
        >
          {/* 출발 */}

          <TouchableOpacity
            style={styles.stationRow}
            activeOpacity={0.7}
            onPress={handleSelectDeparture}
          >
            <View
              style={[
                styles.stationIcon,
                {
                  backgroundColor:
                    colors.surfaceSecondary,
                },
              ]}
            >
              <Navigation
                size={20}
                color={colors.textSecondary}
                strokeWidth={2}
              />
            </View>

            <View style={styles.stationTextArea}>
              <Text
                style={[
                  styles.stationLabel,
                  {
                    color: colors.textMuted,
                  },
                ]}
              >
                출발
              </Text>

              <Text
                style={[
                  styles.stationPlaceholder,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {departure?.nameKo ??
                  "출발역을 선택하세요"}
              </Text>

              {!!departure?.nameJa && (
                <Text
                  style={[
                    styles.selectedStationJa,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  {departure.nameJa}
                </Text>
              )}
            </View>

            <ChevronRight
              size={22}
              color={colors.textMuted}
              strokeWidth={2}
            />
          </TouchableOpacity>

          {/* Swap */}

          <View style={styles.middleRow}>
            <View
              style={[
                styles.divider,
                {
                  backgroundColor:
                    colors.surfaceSecondary,
                },
              ]}
            />

            <TouchableOpacity
              style={[
                styles.swapButton,
                {
                  backgroundColor:
                    colors.surfaceSecondary,
                },
              ]}
              activeOpacity={0.7}
              onPress={handleSwapStations}
            >
              <ArrowDownUp
                size={18}
                color={colors.textSecondary}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>

          {/* 도착 */}

          <TouchableOpacity
            style={styles.stationRow}
            activeOpacity={0.7}
            onPress={handleSelectArrival}
          >
            <View
              style={[
                styles.stationIcon,
                {
                  backgroundColor:
                    colors.surfaceSecondary,
                },
              ]}
            >
              <MapPin
                size={20}
                color={colors.textSecondary}
                strokeWidth={2}
              />
            </View>

            <View style={styles.stationTextArea}>
              <Text
                style={[
                  styles.stationLabel,
                  {
                    color: colors.textMuted,
                  },
                ]}
              >
                도착
              </Text>

              <Text
                style={[
                  styles.stationPlaceholder,
                  {
                    color: colors.text,
                  },
                ]}
              >
                {arrival?.nameKo ??
                  "도착역을 선택하세요"}
              </Text>

              {!!arrival?.nameJa && (
                <Text
                  style={[
                    styles.selectedStationJa,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  {arrival.nameJa}
                </Text>
              )}
            </View>

            <ChevronRight
              size={22}
              color={colors.textMuted}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>

        {/* 경로 검색 */}

        <TouchableOpacity
          style={[
            styles.routeSearchButton,
            !canSearch &&
              styles.routeSearchButtonDisabled,
          ]}
          activeOpacity={canSearch ? 0.8 : 1}
          disabled={!canSearch}
          onPress={handleSearchRoute}
        >
          <Search
            size={20}
            color="#FFFFFF"
            strokeWidth={2.4}
          />

          <Text style={styles.routeSearchButtonText}>
            경로 검색
          </Text>
        </TouchableOpacity>

        {/* Map */}

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.text,
              },
            ]}
          >
            철도 노선 보기
          </Text>

          <Text
            style={[
              styles.sectionDescription,
              {
                color: colors.textMuted,
              },
            ]}
          >
            기존 철도회사와 노선 화면도 그대로 이용할 수 있어요.
          </Text>

          <TouchableOpacity
            style={[
              styles.mapCard,
              {
                backgroundColor: colors.surface,
              },
            ]}
            activeOpacity={0.72}
            onPress={() =>
              router.push("/map" as any)
            }
          >
            <View
              style={[
                styles.mapIconArea,
                {
                  backgroundColor:
                    colors.surfaceSecondary,
                },
              ]}
            >
              <Map
                size={26}
                color={colors.text}
                strokeWidth={2}
              />
            </View>

            <View style={styles.mapTextArea}>
              <Text
                style={[
                  styles.mapTitle,
                  {
                    color: colors.text,
                  },
                ]}
              >
                철도 지도
              </Text>

              <Text
                style={[
                  styles.mapDescription,
                  {
                    color: colors.textMuted,
                  },
                ]}
              >
                철도회사와 노선을 선택해서 확인하세요.
              </Text>
            </View>

            <ChevronRight
              size={23}
              color={colors.textMuted}
              strokeWidth={2}
            />
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },

  screen: {
    flex: 1,
  },

  container: {
    paddingHorizontal: 20,
    paddingTop: 24,
    paddingBottom: 40,
  },

  hero: {
    marginBottom: 28,
  },

  eyebrow: {
    fontSize: 11,
    lineHeight: 16,
    fontWeight: "800",
    letterSpacing: 1.2,
  },

  title: {
    marginTop: 8,
    fontSize: 32,
    lineHeight: 40,
    fontWeight: "900",
  },

  description: {
    marginTop: 8,
    fontSize: 14,
    lineHeight: 21,
  },

  routeCard: {
    borderRadius: 24,
    paddingHorizontal: 16,
    paddingVertical: 8,
  },

  stationRow: {
    minHeight: 82,
    flexDirection: "row",
    alignItems: "center",
  },

  stationIcon: {
    width: 44,
    height: 44,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
  },

  stationTextArea: {
    flex: 1,
    marginLeft: 14,
  },

  stationLabel: {
    fontSize: 11,
    lineHeight: 15,
    fontWeight: "700",
  },

  stationPlaceholder: {
    marginTop: 3,
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "800",
  },

  selectedStationJa: {
    marginTop: 1,
    fontSize: 11,
    lineHeight: 15,
  },

  middleRow: {
    height: 1,
    marginLeft: 58,
    position: "relative",
    justifyContent: "center",
    alignItems: "flex-end",
  },

  divider: {
    position: "absolute",
    left: 0,
    right: 0,
    height: 1,
  },

  swapButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    alignItems: "center",
    justifyContent: "center",
    marginRight: 4,
  },

  routeSearchButton: {
    height: 56,
    marginTop: 16,
    borderRadius: 18,
    backgroundColor: "#1677FF",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  routeSearchButtonDisabled: {
    opacity: 0.4,
  },

  routeSearchButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "900",
  },

  section: {
    marginTop: 38,
  },

  sectionTitle: {
    fontSize: 18,
    lineHeight: 24,
    fontWeight: "900",
  },

  sectionDescription: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 18,
  },

  mapCard: {
    minHeight: 88,
    marginTop: 14,
    paddingHorizontal: 16,
    paddingVertical: 14,
    borderRadius: 20,
    flexDirection: "row",
    alignItems: "center",
  },

  mapIconArea: {
    width: 52,
    height: 52,
    borderRadius: 16,
    alignItems: "center",
    justifyContent: "center",
  },

  mapTextArea: {
    flex: 1,
    marginLeft: 14,
  },

  mapTitle: {
    fontSize: 16,
    lineHeight: 22,
    fontWeight: "900",
  },

  mapDescription: {
    marginTop: 3,
    fontSize: 11,
    lineHeight: 16,
  },
});