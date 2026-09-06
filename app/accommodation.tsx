import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useFocusEffect, useLocalSearchParams, useRouter } from "expo-router";
import {
  Building2,
  ChevronLeft,
  LocateFixed,
  MapPin,
  Save,
} from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { useAppTheme } from "@/hooks/useAppTheme";
import stationCoordinates from "../data/stationCoordinates.json";
import { getAllStations } from "../data/railwayRegistry";

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

type NearestStationCoordinate = StationCoordinate & {
  distance: number;
};

const toRadians = (degree: number) => (degree * Math.PI) / 180;

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
    Math.sin(latitudeDifference / 2) ** 2 +
    Math.cos(firstLatitude) *
      Math.cos(secondLatitude) *
      Math.sin(longitudeDifference / 2) ** 2;

  return earthRadius * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const findNearestStationCoordinate = (
  latitude: number,
  longitude: number,
): NearestStationCoordinate | null => {
  const stations = stationCoordinates as StationCoordinate[];
  let nearest: NearestStationCoordinate | null = null;

  for (const station of stations) {
    const distance = calculateDistance(
      latitude,
      longitude,
      station.latitude,
      station.longitude,
    );

    if (!nearest || distance < nearest.distance) {
      nearest = {
        ...station,
        distance,
      };
    }
  }

  return nearest;
};

const ACCOMMODATION_STORAGE_KEY = "tokyo-railway-guide:accommodation";

type AccommodationData = {
  name: string;
  stationId: string;
  lineId: string;
  stationNameKo: string;
  stationNameJa: string;
};

const AccommodationScreen = () => {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { colors } = useAppTheme();

  const params = useLocalSearchParams<{
    stationId?: string;
    lineId?: string;
    nameKo?: string;
    nameJa?: string;
  }>();

  const [accommodationName, setAccommodationName] = useState("");
  const [stationId, setStationId] = useState("");
  const [lineId, setLineId] = useState("");
  const [stationNameKo, setStationNameKo] = useState("");
  const [stationNameJa, setStationNameJa] = useState("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [isLocating, setIsLocating] = useState(false);
  const [locationMessage, setLocationMessage] = useState<string | null>(null);

  useFocusEffect(
    useCallback(() => {
      let active = true;

      const loadAccommodation = async () => {
        try {
          const saved = await AsyncStorage.getItem(ACCOMMODATION_STORAGE_KEY);

          if (saved && active) {
            const parsed = JSON.parse(saved) as AccommodationData;

            setAccommodationName(parsed.name ?? "");
            setStationId(parsed.stationId ?? "");
            setLineId(parsed.lineId ?? "");
            setStationNameKo(parsed.stationNameKo ?? "");
            setStationNameJa(parsed.stationNameJa ?? "");
          }

          if (active && params.stationId && params.nameKo) {
            setStationId(params.stationId);
            setLineId(params.lineId ?? "");
            setStationNameKo(params.nameKo);
            setStationNameJa(params.nameJa ?? "");
          }
        } catch (error) {
          console.error("Accommodation load error:", error);
        } finally {
          if (active) {
            setIsLoaded(true);
          }
        }
      };

      loadAccommodation();

      return () => {
        active = false;
      };
    }, [params.stationId, params.lineId, params.nameKo, params.nameJa]),
  );

  const handleFindNearestStation = async () => {
    try {
      setIsLocating(true);
      setLocationMessage(null);

      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status !== "granted") {
        setLocationMessage("위치 권한을 허용해 주세요.");
        return;
      }

      const location = await Location.getCurrentPositionAsync({
        accuracy: Location.Accuracy.High,
      });

      const nearest = findNearestStationCoordinate(
        location.coords.latitude,
        location.coords.longitude,
      );

      if (!nearest?.nameJa) {
        setLocationMessage("가까운 역을 찾지 못했어요.");
        return;
      }

      const guideStations = getAllStations().filter(
        (station) => station.nameJa === nearest.nameJa,
      );

      if (guideStations.length === 0) {
        setLocationMessage(
          `${nearest.nameJa}역은 현재 GUIDE 노선에서 검색할 수 없어요.`,
        );
        return;
      }

      const representativeStation = guideStations[0];

      setStationId(representativeStation.id);
      setLineId(representativeStation.lineId);
      setStationNameKo(representativeStation.nameKo);
      setStationNameJa(representativeStation.nameJa);

      const distanceLabel =
        nearest.distance < 1000
          ? `${Math.round(nearest.distance)}m`
          : `${(nearest.distance / 1000).toFixed(1)}km`;

      setLocationMessage(
        `현재 위치에서 가장 가까운 역: ${representativeStation.nameKo} · ${distanceLabel}`,
      );
    } catch (error) {
      console.error("Accommodation location error:", error);
      setLocationMessage("현재 위치를 가져오지 못했어요.");
    } finally {
      setIsLocating(false);
    }
  };

  const handleSelectStation = () => {
    router.push({
      pathname: "/search",
      params: {
        mode: "accommodation",
      },
    });
  };

  const handleSave = async () => {
    if (!stationId || !stationNameKo) {
      Alert.alert(
        "숙소역을 선택해 주세요",
        "숙소에서 가장 가까운 역이 필요합니다.",
      );
      return;
    }

    try {
      setIsSaving(true);

      const data: AccommodationData = {
        name: accommodationName.trim(),
        stationId,
        lineId,
        stationNameKo,
        stationNameJa,
      };

      await AsyncStorage.setItem(
        ACCOMMODATION_STORAGE_KEY,
        JSON.stringify(data),
      );

      Alert.alert("저장했어요", "숙소 정보는 이 기기에만 저장됩니다.");
    } catch (error) {
      console.error("Accommodation save error:", error);
      Alert.alert("저장하지 못했어요", "잠시 후 다시 시도해 주세요.");
    } finally {
      setIsSaving(false);
    }
  };

  const canSave = isLoaded && !!stationId && !!stationNameKo && !isSaving;

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
        keyboardShouldPersistTaps="handled"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[
          styles.container,
          {
            paddingBottom: Math.max(insets.bottom, 12) + 40,
          },
        ]}
      >
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

          <View style={styles.headerTextArea}>
            <Text style={[styles.pageTitle, { color: colors.text }]}>
              내 숙소
            </Text>

            <Text
              style={[
                styles.pageDescription,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              숙소 정보를 기기에만 저장해 두고 경로 안내에 사용할 수 있어요.
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text
            style={[
              styles.sectionTitle,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            숙소
          </Text>

          <View
            style={[
              styles.inputRow,
              {
                borderBottomColor: colors.border,
              },
            ]}
          >
            <View style={styles.iconArea}>
              <Building2 size={21} color={colors.text} strokeWidth={1.7} />
            </View>

            <View style={styles.inputContent}>
              <Text style={[styles.itemTitle, { color: colors.text }]}>
                숙소 이름
              </Text>

              <TextInput
                value={accommodationName}
                onChangeText={setAccommodationName}
                placeholder="선택사항"
                placeholderTextColor={colors.textMuted}
                autoCorrect={false}
                returnKeyType="done"
                style={[
                  styles.nameInput,
                  {
                    color: colors.text,
                  },
                ]}
              />
            </View>
          </View>

          <Pressable
            disabled={isLocating}
            onPress={handleFindNearestStation}
            style={({ pressed }) => [
              styles.locationRow,
              {
                borderBottomColor: colors.border,
              },
              pressed && !isLocating && styles.pressed,
            ]}
          >
            <View style={styles.iconArea}>
              <LocateFixed size={21} color="#A78BFA" strokeWidth={1.7} />
            </View>

            <View style={styles.stationContent}>
              <Text style={[styles.itemTitle, { color: colors.text }]}>
                현재 위치에서 가까운 역 찾기
              </Text>

              <Text
                style={[
                  styles.itemDescription,
                  {
                    color: colors.textSecondary,
                  },
                ]}
              >
                {isLocating
                  ? "GPS로 현재 위치를 확인하고 있어요..."
                  : (locationMessage ??
                    "숙소에 있을 때 누르면 가까운 역을 자동으로 찾습니다.")}
              </Text>
            </View>
          </Pressable>

          <Pressable
            onPress={handleSelectStation}
            style={({ pressed }) => [
              styles.stationRow,
              {
                borderBottomColor: colors.border,
              },
              pressed && styles.pressed,
            ]}
          >
            <View style={styles.iconArea}>
              <MapPin size={21} color={colors.text} strokeWidth={1.7} />
            </View>

            <View style={styles.stationContent}>
              <Text style={[styles.itemTitle, { color: colors.text }]}>
                가까운 역
              </Text>

              {stationNameKo ? (
                <>
                  <Text
                    style={[
                      styles.stationName,
                      {
                        color: colors.text,
                      },
                    ]}
                  >
                    {stationNameKo}
                  </Text>

                  {!!stationNameJa && (
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
                  )}
                </>
              ) : (
                <Text
                  style={[
                    styles.itemDescription,
                    {
                      color: colors.textSecondary,
                    },
                  ]}
                >
                  숙소에서 가장 가까운 역을 선택하세요.
                </Text>
              )}
            </View>

            <Text
              style={[
                styles.selectText,
                {
                  color: colors.textSecondary,
                },
              ]}
            >
              {stationNameKo ? "변경" : "선택"}
            </Text>
          </Pressable>
        </View>

        <View
          style={[
            styles.privacyNotice,
            {
              backgroundColor: colors.surface,
              borderColor: colors.border,
            },
          ]}
        >
          <Text
            style={[
              styles.privacyTitle,
              {
                color: colors.text,
              },
            ]}
          >
            기기에만 저장됩니다
          </Text>

          <Text
            style={[
              styles.privacyDescription,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            숙소 이름과 숙소역은 서버나 계정에 저장하지 않습니다.
          </Text>
        </View>

        <Pressable
          disabled={!canSave}
          onPress={handleSave}
          style={({ pressed }) => [
            styles.saveButton,
            {
              backgroundColor: canSave ? colors.text : colors.surfaceSecondary,
            },
            pressed && canSave && styles.pressed,
          ]}
        >
          <Save
            size={19}
            color={canSave ? colors.background : colors.textMuted}
            strokeWidth={1.8}
          />

          <Text
            style={[
              styles.saveButtonText,
              {
                color: canSave ? colors.background : colors.textMuted,
              },
            ]}
          >
            {isSaving ? "저장 중..." : "숙소 저장"}
          </Text>
        </Pressable>
      </ScrollView>
    </View>
  );
};

export default AccommodationScreen;

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

  header: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 38,
  },

  backButton: {
    width: 36,
    height: 36,
    alignItems: "flex-start",
    justifyContent: "center",
    marginRight: 8,
  },

  headerTextArea: {
    flex: 1,
    paddingTop: 1,
  },

  pageTitle: {
    fontSize: 26,
    lineHeight: 34,
    fontWeight: "700",
    letterSpacing: -0.6,
  },

  pageDescription: {
    marginTop: 5,
    fontSize: 12.5,
    lineHeight: 18,
  },

  section: {
    marginBottom: 28,
  },

  sectionTitle: {
    marginBottom: 8,
    fontSize: 13,
    lineHeight: 18,
    fontWeight: "600",
  },

  inputRow: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  locationRow: {
    minHeight: 78,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  stationRow: {
    minHeight: 86,
    flexDirection: "row",
    alignItems: "center",
    borderBottomWidth: StyleSheet.hairlineWidth,
  },

  iconArea: {
    width: 46,
    alignItems: "flex-start",
    justifyContent: "center",
  },

  inputContent: {
    flex: 1,
    paddingVertical: 11,
  },

  stationContent: {
    flex: 1,
    paddingVertical: 11,
    paddingRight: 12,
  },

  itemTitle: {
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
    letterSpacing: -0.2,
  },

  itemDescription: {
    marginTop: 4,
    fontSize: 12.5,
    lineHeight: 17,
  },

  nameInput: {
    width: "100%",
    marginTop: 3,
    paddingVertical: 3,
    paddingHorizontal: 0,
    fontSize: 13.5,
    lineHeight: 19,
  },

  stationName: {
    marginTop: 5,
    fontSize: 15,
    lineHeight: 20,
    fontWeight: "600",
  },

  stationNameJa: {
    marginTop: 1,
    fontSize: 11.5,
    lineHeight: 16,
  },

  selectText: {
    fontSize: 12.5,
    lineHeight: 17,
    fontWeight: "600",
  },

  privacyNotice: {
    borderWidth: StyleSheet.hairlineWidth,
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 15,
    marginBottom: 22,
  },

  privacyTitle: {
    fontSize: 13.5,
    lineHeight: 19,
    fontWeight: "600",
  },

  privacyDescription: {
    marginTop: 4,
    fontSize: 12,
    lineHeight: 17,
  },

  saveButton: {
    minHeight: 54,
    borderRadius: 16,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
  },

  saveButtonText: {
    fontSize: 14,
    lineHeight: 19,
    fontWeight: "700",
  },

  pressed: {
    opacity: 0.5,
  },
});
