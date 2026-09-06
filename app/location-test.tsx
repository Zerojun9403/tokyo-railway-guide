import stationCoordinates from "@/data/stationCoordinates.json";
import { useAppTheme } from "@/hooks/useAppTheme";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import {
  ChevronLeft,
  LocateFixed,
  MapPin,
  Navigation,
  TrainFront,
} from "lucide-react-native";
import { useState } from "react";
import {
  ActivityIndicator,
  Pressable,
  StyleSheet,
  Text,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

type StationCoordinate = {
  operatorId: string;
  odptOperatorId: string;
  odptStationId: string | null;
  railwayId: string | null;
  stationCode: string | null;
  nameJa: string | null;
  nameEn: string | null;
  latitude: number;
  longitude: number;
};

type NearestStation = StationCoordinate & {
  distance: number;
};

type LocationMode = "real" | "mock";

const OPERATOR_NAMES: Record<string, string> = {
  "jr-east": "JR 동일본",
  keikyu: "게이큐",
  keisei: "게이세이",
  seibu: "세이부",
  "tokyo-metro": "도쿄메트로",
  tokyu: "도큐",
};

const SHIBUYA_MOCK_LOCATION = {
  latitude: 35.65815,
  longitude: 139.70175,
};

const toRadians = (degree: number) => {
  return (degree * Math.PI) / 180;
};

const calculateDistance = (
  latitude1: number,
  longitude1: number,
  latitude2: number,
  longitude2: number,
) => {
  const earthRadius = 6371000;

  const latitudeDifference = toRadians(latitude2 - latitude1);
  const longitudeDifference = toRadians(longitude2 - longitude1);

  const firstLatitude = toRadians(latitude1);
  const secondLatitude = toRadians(latitude2);

  const a =
    Math.sin(latitudeDifference / 2) * Math.sin(latitudeDifference / 2) +
    Math.cos(firstLatitude) *
      Math.cos(secondLatitude) *
      Math.sin(longitudeDifference / 2) *
      Math.sin(longitudeDifference / 2);

  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return earthRadius * c;
};

const findNearestStation = (
  latitude: number,
  longitude: number,
): NearestStation | null => {
  const stations = stationCoordinates as StationCoordinate[];

  let nearestStation: NearestStation | null = null;

  for (const station of stations) {
    const distance = calculateDistance(
      latitude,
      longitude,
      station.latitude,
      station.longitude,
    );

    if (nearestStation === null || distance < nearestStation.distance) {
      nearestStation = {
        ...station,
        distance,
      };
    }
  }

  return nearestStation;
};

const formatDistance = (distance: number) => {
  if (distance < 1000) {
    return `${Math.round(distance)}m`;
  }

  return `${(distance / 1000).toFixed(1)}km`;
};

const getRailwayName = (railwayId: string | null) => {
  if (!railwayId) {
    return null;
  }

  const parts = railwayId.split(".");

  return parts[parts.length - 1] ?? railwayId;
};

const LocationTestScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const [loading, setLoading] = useState(false);

  const [latitude, setLatitude] = useState<number | null>(null);

  const [longitude, setLongitude] = useState<number | null>(null);

  const [nearestStation, setNearestStation] = useState<NearestStation | null>(
    null,
  );

  const [locationMode, setLocationMode] = useState<LocationMode | null>(null);

  const [error, setError] = useState<string | null>(null);

  const applyLocation = (
    currentLatitude: number,
    currentLongitude: number,
    mode: LocationMode,
  ) => {
    setLatitude(currentLatitude);
    setLongitude(currentLongitude);
    setLocationMode(mode);

    const nearest = findNearestStation(currentLatitude, currentLongitude);

    setNearestStation(nearest);
  };

  const getCurrentLocation = async () => {
    try {
      setLoading(true);
      setError(null);
      setNearestStation(null);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setError("위치 권한이 허용되지 않았어요.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      applyLocation(
        location.coords.latitude,
        location.coords.longitude,
        "real",
      );
    } catch (err) {
      console.error("Location error:", err);

      setError("현재 위치를 가져오지 못했어요.");
    } finally {
      setLoading(false);
    }
  };

  const useShibuyaMockLocation = () => {
    setError(null);

    applyLocation(
      SHIBUYA_MOCK_LOCATION.latitude,
      SHIBUYA_MOCK_LOCATION.longitude,
      "mock",
    );
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
      <View style={styles.container}>
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
              styles.headerTitle,
              {
                color: colors.text,
              },
            ]}
          >
            GPS 테스트
          </Text>
        </View>

        <View style={styles.content}>
          <LocateFixed size={34} color="#A78BFA" strokeWidth={1.7} />

          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            현재 위치 확인
          </Text>

          <Text
            style={[
              styles.description,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            실제 GPS 또는 테스트 위치를 사용해{"\n"}
            가장 가까운 철도역을 확인합니다.
          </Text>

          <Pressable
            onPress={getCurrentLocation}
            disabled={loading}
            style={({ pressed }) => [
              styles.locationButton,
              pressed && styles.pressed,
            ]}
          >
            {loading ? (
              <ActivityIndicator color="#FFFFFF" />
            ) : (
              <Text style={styles.locationButtonText}>현재 위치 가져오기</Text>
            )}
          </Pressable>

          <Pressable
            onPress={useShibuyaMockLocation}
            disabled={loading}
            style={({ pressed }) => [
              styles.mockButton,
              {
                borderColor: colors.border,
              },
              pressed && styles.pressed,
            ]}
          >
            <Navigation size={17} color="#A78BFA" strokeWidth={1.8} />

            <Text
              style={[
                styles.mockButtonText,
                {
                  color: colors.text,
                },
              ]}
            >
              시부야 Mock GPS
            </Text>
          </Pressable>

          {(latitude !== null || error) && (
            <View style={styles.results}>
              <View
                style={[
                  styles.result,
                  {
                    borderColor: colors.border,
                  },
                ]}
              >
                {error ? (
                  <Text style={styles.errorText}>{error}</Text>
                ) : (
                  <>
                    <View style={styles.resultTitleRow}>
                      <MapPin size={17} color="#A78BFA" strokeWidth={1.8} />

                      <Text
                        style={[
                          styles.resultLabel,
                          {
                            color: colors.textSecondary,
                          },
                        ]}
                      >
                        {locationMode === "mock"
                          ? "Mock GPS 좌표"
                          : "현재 GPS 좌표"}
                      </Text>

                      {locationMode === "mock" && (
                        <View style={styles.mockBadge}>
                          <Text style={styles.mockBadgeText}>TEST</Text>
                        </View>
                      )}
                    </View>

                    <Text
                      style={[
                        styles.coordinate,
                        {
                          color: colors.text,
                        },
                      ]}
                    >
                      위도 {latitude?.toFixed(6)}
                    </Text>

                    <Text
                      style={[
                        styles.coordinate,
                        {
                          color: colors.text,
                        },
                      ]}
                    >
                      경도 {longitude?.toFixed(6)}
                    </Text>
                  </>
                )}
              </View>

              {!error && nearestStation && (
                <View
                  style={[
                    styles.stationResult,
                    {
                      borderColor: colors.border,
                    },
                  ]}
                >
                  <View style={styles.resultTitleRow}>
                    <TrainFront size={18} color="#A78BFA" strokeWidth={1.8} />

                    <Text
                      style={[
                        styles.resultLabel,
                        {
                          color: colors.textSecondary,
                        },
                      ]}
                    >
                      가장 가까운 역
                    </Text>
                  </View>

                  <View style={styles.stationNameContainer}>
                    <Text
                      style={[
                        styles.stationName,
                        {
                          color: colors.text,
                        },
                      ]}
                    >
                      {nearestStation.nameJa ??
                        nearestStation.nameEn ??
                        "역 이름 없음"}
                    </Text>

                    {nearestStation.stationCode && (
                      <View style={styles.stationCodeBadge}>
                        <Text style={styles.stationCodeText}>
                          {nearestStation.stationCode}
                        </Text>
                      </View>
                    )}
                  </View>

                  <Text
                    style={[
                      styles.stationMeta,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    {OPERATOR_NAMES[nearestStation.operatorId] ??
                      nearestStation.operatorId}

                    {getRailwayName(nearestStation.railwayId)
                      ? ` · ${getRailwayName(nearestStation.railwayId)}`
                      : ""}
                  </Text>

                  <View style={styles.distanceContainer}>
                    <Text
                      style={[
                        styles.distanceLabel,
                        {
                          color: colors.textSecondary,
                        },
                      ]}
                    >
                      현재 위치에서
                    </Text>

                    <Text style={styles.distance}>
                      {formatDistance(nearestStation.distance)}
                    </Text>
                  </View>
                </View>
              )}
            </View>
          )}
        </View>
      </View>
    </View>
  );
};

export default LocationTestScreen;

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },

  container: {
    flex: 1,
    width: "100%",
    maxWidth: 720,
    alignSelf: "center",
    paddingHorizontal: 24,
    paddingTop: 24,
  },

  header: {
    flexDirection: "row",
    alignItems: "center",
  },

  backButton: {
    width: 40,
    height: 38,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  headerTitle: {
    fontSize: 18,
    fontWeight: "700",
    letterSpacing: -0.3,
  },

  content: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingBottom: 50,
  },

  title: {
    marginTop: 18,
    fontSize: 22,
    fontWeight: "700",
    letterSpacing: -0.4,
  },

  description: {
    marginTop: 8,
    fontSize: 13,
    lineHeight: 20,
    textAlign: "center",
  },

  locationButton: {
    minWidth: 190,
    height: 50,
    marginTop: 28,
    paddingHorizontal: 22,
    borderRadius: 14,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A78BFA",
  },

  locationButtonText: {
    color: "#FFFFFF",
    fontSize: 14,
    fontWeight: "700",
  },

  mockButton: {
    minWidth: 190,
    height: 46,
    marginTop: 10,
    paddingHorizontal: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  mockButtonText: {
    fontSize: 13,
    fontWeight: "700",
  },

  results: {
    width: "100%",
    gap: 12,
    marginTop: 24,
  },

  result: {
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
  },

  stationResult: {
    width: "100%",
    paddingVertical: 18,
    paddingHorizontal: 18,
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 14,
  },

  resultTitleRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 7,
    marginBottom: 12,
  },

  resultLabel: {
    fontSize: 11.5,
    fontWeight: "600",
  },

  mockBadge: {
    marginLeft: "auto",
    paddingHorizontal: 7,
    paddingVertical: 3,
    borderRadius: 6,
    backgroundColor: "rgba(167, 139, 250, 0.15)",
  },

  mockBadgeText: {
    color: "#A78BFA",
    fontSize: 9,
    fontWeight: "800",
    letterSpacing: 0.5,
  },

  coordinate: {
    marginTop: 4,
    fontSize: 15,
    fontWeight: "600",
  },

  stationNameContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 9,
  },

  stationName: {
    fontSize: 21,
    fontWeight: "700",
    letterSpacing: -0.3,
  },

  stationCodeBadge: {
    minWidth: 38,
    height: 25,
    paddingHorizontal: 7,
    borderRadius: 7,
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#A78BFA",
  },

  stationCodeText: {
    color: "#FFFFFF",
    fontSize: 11,
    fontWeight: "800",
  },

  stationMeta: {
    marginTop: 7,
    fontSize: 12.5,
    lineHeight: 18,
  },

  distanceContainer: {
    flexDirection: "row",
    alignItems: "baseline",
    gap: 6,
    marginTop: 16,
  },

  distanceLabel: {
    fontSize: 12,
  },

  distance: {
    color: "#A78BFA",
    fontSize: 17,
    fontWeight: "800",
  },

  errorText: {
    color: "#E05A5A",
    fontSize: 13,
    lineHeight: 20,
  },

  pressed: {
    opacity: 0.55,
  },
});
