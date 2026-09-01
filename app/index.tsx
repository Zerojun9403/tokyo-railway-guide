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
import { ChevronRight, Search, Settings, Star } from "lucide-react-native";

import { getStation } from "../data/railwayRegistry";
import { useAppTheme } from "../hooks/useAppTheme";
import { useFavoriteStations } from "../hooks/useFavoriteStations";
import { useRecentStations } from "../hooks/useRecentStations";

/*
 * =========================================================
 * 철도회사 카드
 * =========================================================
 */

type RailwayCompanyCard = {
  id: string;

  nameKo: string;
  nameJa: string;

  description: string;

  color: string;

  badge: string;
};

/*
 * =========================================================
 * 철도회사
 * =========================================================
 */

const RAILWAY_COMPANIES: RailwayCompanyCard[] = [
  {
    id: "jr-east",

    nameKo: "JR동일본",
    nameJa: "JR東日本",

    /*
     * 주오선도 생겼으므로
     * 기존 야마노테 전용 문구에서 변경
     */

    description: "야마노테선 · 주오선 등 도쿄 주요 JR 노선",

    color: "#80C41C",

    badge: "JR",
  },
  {
    id: "tokyo-metro",

    nameKo: "도쿄메트로",
    nameJa: "東京メトロ",

    description: "긴자선 등 도쿄 도심 주요 지하철",

    color: "#00A4E0",

    badge: "M",
  },

  {
    id: "toei",

    nameKo: "도에이 지하철",
    nameJa: "都営地下鉄",

    description: "오에도선 등 도쿄 도심 지하철",

    color: "#CE045B",

    badge: "E",
  },

  {
    id: "keisei",

    nameKo: "게이세이 전철",
    nameJa: "京成電鉄",

    description: "우에노 · 나리타공항을 잇는 철도",

    color: "#005AAA",

    badge: "KS",
  },

  {
    id: "keikyu",

    nameKo: "게이큐 전철",
    nameJa: "京浜急行電鉄",

    description: "시나가와 · 요코하마 · 하네다공항을 잇는 철도",

    color: "#00BFFF",

    badge: "KK",
  },
];

export default function HomeScreen() {
  const { colors } = useAppTheme();

  /*
   * =======================================================
   * 즐겨찾기
   * =======================================================
   */

  const {
    favoriteStationIds,

    reload: reloadFavorites,
  } = useFavoriteStations("");

  /*
   * =======================================================
   * 최근 본 역
   * =======================================================
   */

  const {
    recentStationIds,

    reload: reloadRecent,
  } = useRecentStations();

  /*
   * =======================================================
   * 화면 복귀
   * =======================================================
   */

  useFocusEffect(
    useCallback(() => {
      void reloadFavorites();

      void reloadRecent();
    }, [reloadFavorites, reloadRecent]),
  );

  /*
   * =======================================================
   * 즐겨찾기 Station[]
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
   * 최근 본 Station[]
   * =======================================================
   */

  const recentStations = useMemo(() => {
    return recentStationIds
      .map((stationId) => getStation(stationId))
      .filter(
        (station): station is NonNullable<ReturnType<typeof getStation>> =>
          Boolean(station),
      );
  }, [recentStationIds]);

  /*
   * =======================================================
   * 역 상세
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
   * 철도회사
   * =======================================================
   *
   * 기존:
   *
   * JR동일본
   * → /line/yamanote
   *
   *
   * 변경:
   *
   * JR동일본
   * → /company/jr-east
   * → 노선 선택
   * =======================================================
   */

  const handlePressCompany = (company: RailwayCompanyCard) => {
    router.push({
      pathname: "/company/[companyId]",

      params: {
        companyId: company.id,
      },
    });
  };

  /*
   * =======================================================
   * 설정
   * =======================================================
   */

  const handlePressSettings = () => {
    router.push("/settings");
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
            Hero
        ================================================= */}

        <View style={styles.hero}>
          <View style={styles.heroTop}>
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

            <TouchableOpacity
              style={[
                styles.settingsButton,
                {
                  backgroundColor: colors.surface,
                },
              ]}
              activeOpacity={0.7}
              onPress={handlePressSettings}
            >
              <Settings
                size={21}
                color={colors.textSecondary}
                strokeWidth={2}
              />
            </TouchableOpacity>
          </View>

          <Text
            style={[
              styles.title,
              {
                color: colors.text,
              },
            ]}
          >
            도쿄의 철도를
            {"\n"}
            하나의 출발점에서.
          </Text>

          <Text
            style={[
              styles.description,
              {
                color: colors.textSecondary,
              },
            ]}
          >
            역을 검색하거나 철도회사를 선택해서 다음 열차를 확인해 보세요.
          </Text>
        </View>

        {/* =================================================
            검색
        ================================================= */}

        <TouchableOpacity
          style={[
            styles.searchButton,
            {
              backgroundColor: colors.surface,
            },
          ]}
          activeOpacity={0.72}
          onPress={() => router.push("/search")}
        >
          <View
            style={[
              styles.searchIconArea,
              {
                backgroundColor: colors.surfaceSecondary,
              },
            ]}
          >
            <Search
              size={24}
              color={colors.textSecondary}
              strokeWidth={2}
            />
          </View>

          <View style={styles.searchTextArea}>
            <Text
              style={[
                styles.searchPlaceholder,
                {
                  color: colors.text,
                },
              ]}
            >
              역 이름 또는 역번호 검색
            </Text>

            <Text
              style={[
                styles.searchExample,
                {
                  color: colors.textMuted,
                },
              ]}
            >
              신주쿠 · 新宿 · JY17 · JC05
            </Text>
          </View>

          <ChevronRight
            style={styles.trailingIcon}
            size={24}
            color={colors.textMuted}
            strokeWidth={2}
          />
        </TouchableOpacity>

        {/* =================================================
            즐겨찾기
        ================================================= */}

        {favoriteStations.length > 0 && (
          <View style={styles.stationSection}>
            <View style={styles.sectionHeaderRow}>
              <View>
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  즐겨찾는 역
                </Text>

                <Text
                  style={[
                    styles.sectionDescription,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  자주 이용하는 역을 바로 확인하세요.
                </Text>
              </View>

              <View style={styles.sectionCount}>
                <Star
                  size={14}
                  color="#D49B00"
                  fill="#D49B00"
                  strokeWidth={2}
                />
                <Text style={styles.sectionCountText}>
                  {favoriteStations.length}
                </Text>
              </View>
            </View>

            <View style={styles.favoriteList}>
              {favoriteStations.map((station) => (
                <TouchableOpacity
                  key={station.id}
                  style={[
                    styles.favoriteCard,
                    {
                      backgroundColor: colors.surface,
                    },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => handlePressStation(station.id)}
                >
                  <View
                    style={[
                      styles.favoriteBadge,
                      {
                        borderColor: station.color,
                      },
                    ]}
                  >
                    <Text
                      style={[
                        styles.favoriteBadgeText,
                        {
                          color: station.color,
                        },
                      ]}
                    >
                      {station.code}
                    </Text>
                  </View>

                  <View style={styles.favoriteInfo}>
                    <Text
                      style={[
                        styles.favoriteNameKo,
                        {
                          color: colors.text,
                        },
                      ]}
                    >
                      {station.nameKo}
                    </Text>

                    <Text
                      style={[
                        styles.favoriteNameJa,
                        {
                          color: colors.textMuted,
                        },
                      ]}
                    >
                      {station.nameJa}
                    </Text>

                    <Text
                      style={[
                        styles.favoriteLine,
                        {
                          color: colors.textSecondary,
                        },
                      ]}
                    >
                      {station.lineNameKo}
                    </Text>
                  </View>

                  <Star
                    style={styles.trailingIcon}
                    size={20}
                    color="#F5B800"
                    fill="#F5B800"
                    strokeWidth={2}
                  />
                </TouchableOpacity>
              ))}
            </View>
          </View>
        )}

        {/* =================================================
            최근 본 역
        ================================================= */}

        {recentStations.length > 0 && (
          <View style={styles.stationSection}>
            <View style={styles.sectionHeaderRow}>
              <View>
                <Text
                  style={[
                    styles.sectionTitle,
                    {
                      color: colors.text,
                    },
                  ]}
                >
                  최근 본 역
                </Text>

                <Text
                  style={[
                    styles.sectionDescription,
                    {
                      color: colors.textMuted,
                    },
                  ]}
                >
                  최근 확인한 역으로 바로 이동하세요.
                </Text>
              </View>
            </View>

            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.recentList}
            >
              {recentStations.map((station) => (
                <TouchableOpacity
                  key={station.id}
                  style={[
                    styles.recentCard,
                    {
                      backgroundColor: colors.surface,
                    },
                  ]}
                  activeOpacity={0.7}
                  onPress={() => handlePressStation(station.id)}
                >
                  <View
                    style={[
                      styles.recentCodeBadge,
                      {
                        backgroundColor: station.color,
                      },
                    ]}
                  >
                    <Text style={styles.recentCodeText}>{station.code}</Text>
                  </View>

                  <Text
                    style={[
                      styles.recentNameKo,
                      {
                        color: colors.text,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {station.nameKo}
                  </Text>

                  <Text
                    style={[
                      styles.recentNameJa,
                      {
                        color: colors.textMuted,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {station.nameJa}
                  </Text>

                  <Text
                    style={[
                      styles.recentLine,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                    numberOfLines={1}
                  >
                    {station.lineNameKo}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        )}

        {/* =================================================
            철도회사
        ================================================= */}

        <View style={styles.companySection}>
          <View style={styles.sectionHeaderRow}>
            <View>
              <Text
                style={[
                  styles.sectionTitle,
                  {
                    color: colors.text,
                  },
                ]}
              >
                철도회사
              </Text>

              <Text
                style={[
                  styles.sectionDescription,
                  {
                    color: colors.textMuted,
                  },
                ]}
              >
                이용할 철도회사를 선택하세요.
              </Text>
            </View>
          </View>

          <View style={styles.companyList}>
            {RAILWAY_COMPANIES.map((company) => (
              <TouchableOpacity
                key={company.id}
                style={[
                  styles.companyCard,
                  {
                    backgroundColor: colors.surface,
                  },
                ]}
                activeOpacity={0.7}
                onPress={() => handlePressCompany(company)}
              >
                <View
                  style={[
                    styles.companyBadge,
                    {
                      backgroundColor: company.color,
                    },
                  ]}
                >
                  <Text style={styles.companyBadgeText}>{company.badge}</Text>
                </View>

                <View style={styles.companyInfo}>
                  <Text
                    style={[
                      styles.companyNameKo,
                      {
                        color: colors.text,
                      },
                    ]}
                  >
                    {company.nameKo}
                  </Text>

                  <Text
                    style={[
                      styles.companyNameJa,
                      {
                        color: colors.textMuted,
                      },
                    ]}
                  >
                    {company.nameJa}
                  </Text>

                  <Text
                    style={[
                      styles.companyDescription,
                      {
                        color: colors.textSecondary,
                      },
                    ]}
                  >
                    {company.description}
                  </Text>
                </View>

                <ChevronRight
                  style={styles.trailingIcon}
                  size={24}
                  color={colors.textMuted}
                  strokeWidth={2}
                />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* =================================================
            Footer
        ================================================= */}

        <View style={styles.footer}>
          <Text
            style={[
              styles.footerText,
              {
                color: colors.textMuted,
              },
            ]}
          >
            Tokyo Railway Guide
          </Text>

          <Text
            style={[
              styles.footerSubText,
              {
                color: colors.textMuted,
              },
            ]}
          >
            For travelers in Tokyo
          </Text>
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

    paddingTop: 30,

    paddingBottom: 120,
  },

  hero: {
    marginBottom: 24,
  },

  heroTop: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  eyebrow: {
    flex: 1,

    fontSize: 12,

    lineHeight: 16,

    fontWeight: "800",

    letterSpacing: 1.4,
  },

  settingsButton: {
    width: 44,

    height: 44,

    borderRadius: 15,

    alignItems: "center",

    justifyContent: "center",
  },


  title: {
    marginTop: 9,

    fontSize: 34,

    lineHeight: 43,

    fontWeight: "900",

    letterSpacing: -1.2,
  },

  description: {
    marginTop: 14,

    maxWidth: 300,

    fontSize: 15,

    lineHeight: 23,

    fontWeight: "500",
  },

  searchButton: {
    minHeight: 78,

    paddingHorizontal: 16,

    paddingVertical: 14,

    borderRadius: 21,

    flexDirection: "row",

    alignItems: "center",
  },

  searchIconArea: {
    width: 48,

    height: 48,

    borderRadius: 16,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 13,
  },


  searchTextArea: {
    flex: 1,
  },

  searchPlaceholder: {
    fontSize: 15,

    lineHeight: 20,

    fontWeight: "800",
  },

  searchExample: {
    marginTop: 4,

    fontSize: 11,

    lineHeight: 15,
  },


  trailingIcon: {
    marginLeft: 10,
  },

  stationSection: {
    marginTop: 31,
  },

  companySection: {
    marginTop: 35,
  },

  sectionHeaderRow: {
    flexDirection: "row",

    alignItems: "flex-end",

    justifyContent: "space-between",

    marginBottom: 14,
  },

  sectionTitle: {
    fontSize: 21,

    lineHeight: 27,

    fontWeight: "900",
  },

  sectionDescription: {
    marginTop: 4,

    fontSize: 12,

    lineHeight: 17,
  },

  sectionCount: {
    flexDirection: "row",
    alignItems: "center",
    gap: 4,
  },

  sectionCountText: {
    fontSize: 12,
    lineHeight: 17,
    fontWeight: "800",
    color: "#D49B00",
  },

  favoriteList: {
    gap: 10,
  },

  favoriteCard: {
    minHeight: 88,

    paddingHorizontal: 15,

    paddingVertical: 14,

    borderRadius: 20,

    flexDirection: "row",

    alignItems: "center",
  },

  favoriteBadge: {
    minWidth: 51,

    height: 51,

    paddingHorizontal: 6,

    borderRadius: 17,

    borderWidth: 3,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 13,
  },

  favoriteBadgeText: {
    fontSize: 12,

    lineHeight: 16,

    fontWeight: "900",
  },

  favoriteInfo: {
    flex: 1,

    minWidth: 0,
  },

  favoriteNameKo: {
    fontSize: 16,

    lineHeight: 21,

    fontWeight: "900",
  },

  favoriteNameJa: {
    marginTop: 1,

    fontSize: 10,

    lineHeight: 14,
  },

  favoriteLine: {
    marginTop: 5,

    fontSize: 11,

    lineHeight: 15,
  },


  recentList: {
    gap: 10,

    paddingRight: 5,
  },

  recentCard: {
    width: 145,

    minHeight: 125,

    paddingHorizontal: 14,

    paddingVertical: 14,

    borderRadius: 20,
  },

  recentCodeBadge: {
    alignSelf: "flex-start",

    minWidth: 41,

    height: 27,

    paddingHorizontal: 8,

    borderRadius: 9,

    alignItems: "center",

    justifyContent: "center",
  },

  recentCodeText: {
    fontSize: 10,

    lineHeight: 13,

    fontWeight: "900",

    color: "#FFFFFF",
  },

  recentNameKo: {
    marginTop: 12,

    fontSize: 15,

    lineHeight: 20,

    fontWeight: "900",
  },

  recentNameJa: {
    marginTop: 1,

    fontSize: 10,

    lineHeight: 14,
  },

  recentLine: {
    marginTop: 8,

    fontSize: 10,

    lineHeight: 14,

    fontWeight: "600",
  },

  companyList: {
    gap: 12,
  },

  companyCard: {
    minHeight: 100,

    paddingHorizontal: 16,

    paddingVertical: 16,

    borderRadius: 22,

    flexDirection: "row",

    alignItems: "center",
  },

  companyBadge: {
    width: 58,

    height: 58,

    borderRadius: 18,

    alignItems: "center",

    justifyContent: "center",

    marginRight: 15,
  },

  companyBadgeText: {
    fontSize: 17,

    lineHeight: 22,

    fontWeight: "900",

    color: "#FFFFFF",
  },

  companyInfo: {
    flex: 1,
  },

  companyNameKo: {
    fontSize: 17,

    lineHeight: 22,

    fontWeight: "900",
  },

  companyNameJa: {
    marginTop: 1,

    fontSize: 11,

    lineHeight: 15,
  },

  companyDescription: {
    marginTop: 6,

    fontSize: 12,

    lineHeight: 17,
  },

  footer: {
    marginTop: 40,

    alignItems: "center",
  },

  footerText: {
    fontSize: 12,

    lineHeight: 17,

    fontWeight: "800",
  },

  footerSubText: {
    marginTop: 2,

    fontSize: 10,

    lineHeight: 14,
  },
});
