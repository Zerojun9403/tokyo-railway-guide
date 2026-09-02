import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ActivityIndicator,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { StationTopActions } from "../../components/station/StationTopActions";

import { router, useLocalSearchParams } from "expo-router";

import { DirectionSelector } from "../../components/station/DirectionSelector";
import { DirectionTabs } from "../../components/station/DirectionTabs";
import { NextStationCard } from "../../components/station/NextStationCard";
import { StationHeader } from "../../components/station/StationHeader";
import { TrainCard } from "../../components/station/TrainCard";
import { TransferBottomSheet } from "../../components/station/TransferBottomSheet";

import {
  getStationByLine,
  getStationsByLine,
  getTrains,
} from "../../data/railwayRegistry";

import { useKeikyuTrains } from "../../hooks/useKeikyuTrains";
import { useKeiseiTrains } from "../../hooks/useKeiseiTrains";
import { useSeibuTrains } from "../../hooks/useSeibuTrains";
import { useTokyuTrains } from "../../hooks/useTokyuTrains";

import {
  useJrEastTrains,
  type JrEastRailway,
} from "../../hooks/useJrEastTrains";

import { useToeiTrains } from "../../hooks/useToeiTrains";

import { useTokyoMetroTrains } from "../../hooks/useTokyoMetroTrains";

import { useFavoriteStations } from "../../hooks/useFavoriteStations";

import { useAppTheme } from "../../hooks/useAppTheme";
import { useRecentStations } from "../../hooks/useRecentStations";

/*
 * =========================================================
 * 일본 현재 요일
 * =========================================================
 */

const getJapanDay = () => {
  const formatter = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    weekday: "short",
  });

  const weekday = formatter.format(new Date());

  switch (weekday) {
    case "Sun":
      return 0;

    case "Mon":
      return 1;

    case "Tue":
      return 2;

    case "Wed":
      return 3;

    case "Thu":
      return 4;

    case "Fri":
      return 5;

    case "Sat":
      return 6;

    default:
      return 1;
  }
};

/*
 * =========================================================
 * 평일 / 토·휴일
 * =========================================================
 */

const getServiceDayLabel = () => {
  const day = getJapanDay();

  if (day === 0 || day === 6) {
    return "토·휴일운행";
  }

  return "평일운행";
};

/*
 * =========================================================
 * 일본 현재 시간 표시
 * =========================================================
 */

const formatJapanTime = (date: Date) => {
  return new Intl.DateTimeFormat("ko-KR", {
    timeZone: "Asia/Tokyo",

    hour: "2-digit",

    minute: "2-digit",

    hour12: false,
  }).format(date);
};

/*
 * =========================================================
 * 출발까지 남은 초
 * =========================================================
 */

const calculateSecondsUntilDeparture = (
  departureTime: string,

  currentDate: Date,
) => {
  const [hourString, minuteString] = departureTime.split(":");

  const departureHour = Number(hourString);

  const departureMinute = Number(minuteString);

  if (Number.isNaN(departureHour) || Number.isNaN(departureMinute)) {
    return null;
  }

  const japanParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",

    hour: "2-digit",

    minute: "2-digit",

    second: "2-digit",

    hour12: false,
  }).formatToParts(currentDate);

  const getPart = (type: string) =>
    Number(japanParts.find((part) => part.type === type)?.value ?? "0");

  const currentHour = getPart("hour") % 24;

  const currentMinute = getPart("minute");

  const currentSecond = getPart("second");

  const currentSeconds =
    currentHour * 3600 + currentMinute * 60 + currentSecond;

  let departureSeconds = departureHour * 3600 + departureMinute * 60;

  /*
   * 자정 직후 열차 대응
   */

  if (currentSeconds >= 23 * 3600 && departureSeconds < 3 * 3600) {
    departureSeconds += 24 * 3600;
  }

  return departureSeconds - currentSeconds;
};

/*
 * =========================================================
 * JR lineId → API Railway
 * =========================================================
 */

const resolveJrRailway = (lineId?: string): JrEastRailway => {
  switch (lineId) {
    case "chuo-rapid":
      return "ChuoRapid";

    case "chuo-sobu-local":
      return "ChuoSobuLocal";

    case "keihin-tohoku":
      return "KeihinTohokuNegishi";

    case "saikyo":
      return "SaikyoKawagoe";

    case "yokosuka-sobu":
       return "YokosukaSobu";

    case "narita":
      return "NaritaAirport";

    case "yamanote":
    default:
      return "Yamanote";
  }
};

/*
 * =========================================================
 * Station Screen
 * =========================================================
 */

export default function StationScreen() {
  const { colors, isDark } = useAppTheme();
  /*
   * =======================================================
   * URL
   * =======================================================
   */

  const { stationId, lineId } = useLocalSearchParams<{
    stationId: string;
    lineId?: string;
  }>();

  /*
   * =======================================================
   * Station
   * =======================================================
   */

  const station = useMemo(() => {
    return getStationByLine(stationId, lineId);
  }, [stationId, lineId]);

  /*
   * =======================================================
   * 선택 방향
   * =======================================================
   */

  const [selectedDirectionId, setSelectedDirectionId] = useState(
    station?.directions[0]?.id ?? "",
  );

  /*
   * 역 변경 시 첫 방향으로 초기화
   */

  useEffect(() => {
    setSelectedDirectionId(station?.directions[0]?.id ?? "");
  }, [station?.id, station?.lineId]);

  /*
   * =======================================================
   * 환승 BottomSheet
   * =======================================================
   */

  const [transferVisible, setTransferVisible] = useState(false);

  /*
   * =======================================================
   * Pull to Refresh
   * =======================================================
   */

  const [refreshing, setRefreshing] = useState(false);

  /*
   * =======================================================
   * 마지막 갱신 시간
   * =======================================================
   */

  const [lastUpdatedAt, setLastUpdatedAt] = useState(new Date());

  /*
   * =======================================================
   * 현재 시간
   * =======================================================
   */

  const [currentTime, setCurrentTime] = useState(new Date());

  /*
   * 10초마다 현재 시간 갱신
   *
   * 시간이 지나면
   * 이미 출발한 열차가 자동으로 제거된다.
   */

  useEffect(() => {
    const updateCurrentTime = () => {
      setCurrentTime(new Date());
    };

    updateCurrentTime();

    const timer = setInterval(updateCurrentTime, 10_000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  /*
   * =======================================================
   * 현재 방향 데이터
   * =======================================================
   */

  const selectedDirection = useMemo(() => {
    if (!station) {
      return undefined;
    }

    return (
      station.directions.find(
        (direction) => direction.id === selectedDirectionId,
      ) ?? station.directions[0]
    );
  }, [station, selectedDirectionId]);

  /*
   * =======================================================
   * 노선 판별
   * =======================================================
   */

  const isKeisei = station?.operatorId === "keisei";

  const isKeikyu = station?.operatorId === "keikyu";
  

  const isSeibu = station?.operatorId === "seibu";

  const isTokyu = station?.operatorId === "tokyu";

  const isJrEast = station?.operatorId === "jr-east";

  const isToei = station?.operatorId === "toei";

  /*
   * Tokyo Metro
   *
   * ginza.ts에서:
   *
   * operatorId: "tokyo-metro"
   *
   * 로 설정했으므로
   * 이 값으로 판별한다.
   */

  const isTokyoMetro = station?.operatorId === "tokyo-metro";

  /*
   * =======================================================
   * JR API Railway
   * =======================================================
   */

  const jrRailway = resolveJrRailway(station?.lineId);

  /*
   * =======================================================
   * 즐겨찾기
   * =======================================================
   */

  const {
    isFavorite,

    toggleFavorite,

    loading: favoriteLoading,
  } = useFavoriteStations(station?.id ?? "");

  /*
   * =======================================================
   * 최근 본 역
   * =======================================================
   */

  useRecentStations(station?.id);

  /*
   * =======================================================
   * 게이세이 실제 시간표
   * =======================================================
   */

  const {
    trains: keiseiTrains,

    loading: keiseiLoading,

    error: keiseiError,

    reload: reloadKeisei,
  } = useKeiseiTrains(
    isKeisei ? (station?.id ?? "") : "",

    isKeisei ? selectedDirection?.id : undefined,
  );

  /*
   * =======================================================
   * 게이큐 실제 시간표
   * =======================================================
   */

  const {
    trains: keikyuTrains,

    loading: keikyuLoading,

    error: keikyuError,
  } = useKeikyuTrains({
    lineId: isKeikyu ? station?.lineId : undefined,

    stationId: isKeikyu ? station?.id : undefined,

    directionId: isKeikyu ? selectedDirection?.id : undefined,

    enabled: isKeikyu,
  });




  /*
   * =======================================================
   * 도큐 실제 시간표
   * =======================================================
   */

  const {
    trains: tokyuTrains,

    loading: tokyuLoading,

    error: tokyuError,
  } = useTokyuTrains({
    lineId: isTokyu ? station?.lineId : undefined,

    stationId: isTokyu ? station?.id : undefined,

    directionId: isTokyu ? selectedDirection?.id : undefined,

    enabled: isTokyu,
  });


   /*
   * =======================================================
   * 세이부 실제 시간표
   * =======================================================
   */

  const {
    trains: seibuTrains,

    loading: seibuLoading,

    error: seibuError,
  } = useSeibuTrains({
    lineId: isSeibu ? station?.lineId : undefined,

    stationId: isSeibu ? station?.id : undefined,

    directionId: isSeibu ? selectedDirection?.id : undefined,

    enabled: isSeibu,
  });

  /*
   * =======================================================
   * JR 동일본 실제 시간표
   * =======================================================
   */

  const {
    trains: jrTrains,

    loading: jrLoading,

    error: jrError,

    reload: reloadJr,
  } = useJrEastTrains(
    jrRailway,

    isJrEast ? (station?.id ?? "") : "",

    isJrEast ? (selectedDirection?.id ?? "") : "",
  );

  /*
   * =======================================================
   * 도에이 실제 시간표
   *
   * A 아사쿠사선
   * I 미타선
   * S 신주쿠선
   * E 오에도선
   * =======================================================
   */

  const {
    trains: toeiTrains,

    loading: toeiLoading,

    error: toeiError,

    reload: reloadToei,
  } = useToeiTrains(
    isToei ? (station?.lineId ?? "") : "",

    isToei ? (station?.id ?? "") : "",

    isToei ? (selectedDirection?.id ?? "") : "",
  );

  /*
   * =======================================================
   * 도쿄메트로 실제 시간표
   * =======================================================
   *
   * 현재:
   *
   * G 긴자선
   *
   * stationId:
   *
   * G01
   * G02
   * ...
   * G19
   *
   * directionId:
   *
   * asakusa
   * shibuya
   *
   * =======================================================
   */

  const {
    trains: tokyoMetroTrains,

    loading: tokyoMetroLoading,

    error: tokyoMetroError,

    reload: reloadTokyoMetro,
  } = useTokyoMetroTrains(
    isTokyoMetro ? (station?.lineId ?? "") : "",

    isTokyoMetro ? (station?.id ?? "") : "",

    isTokyoMetro ? (selectedDirection?.id ?? "") : "",
  );

  /*
   * =======================================================
   * Pull to Refresh
   * =======================================================
   */

  const handleRefresh = useCallback(async () => {
    if (refreshing) {
      return;
    }

    try {
      setRefreshing(true);

      /*
       * 철도회사별 실제 API 재호출
       */

      if (isKeisei) {
        await reloadKeisei();
      } else if (isJrEast) {
        await reloadJr();
      } else if (isToei) {
        await reloadToei();
      } else if (isTokyoMetro) {
        await reloadTokyoMetro();
      }

      const now = new Date();

      setLastUpdatedAt(now);

      setCurrentTime(now);
    } catch (refreshError) {
      console.error("열차 정보 새로고침 오류:", refreshError);
    } finally {
      setRefreshing(false);
    }
  }, [
    refreshing,

    isKeisei,

    isJrEast,

    isToei,

    isTokyoMetro,

    reloadKeisei,

    reloadJr,

    reloadToei,

    reloadTokyoMetro,
  ]);

  /*
   * =======================================================
   * 마지막 갱신 표시
   * =======================================================
   */

  const lastUpdatedLabel = useMemo(() => {
    return formatJapanTime(lastUpdatedAt);
  }, [lastUpdatedAt]);

  /*
   * =======================================================
   * 역 없음
   * =======================================================
   */

  if (!station || !selectedDirection) {
    return (
      <SafeAreaView
        style={[styles.safeArea, { backgroundColor: colors.background }]}
      >
        <View style={styles.notFoundContainer}>
          <Text style={[styles.notFoundTitle, { color: colors.text }]}>
            역을 찾을 수 없습니다.
          </Text>

          <Text
            style={[styles.notFoundDescription, { color: colors.textMuted }]}
          >
            stationId: {String(stationId)}
          </Text>

          <Text style={styles.backHome} onPress={() => router.back()}>
            이전 화면으로
          </Text>
        </View>
      </SafeAreaView>
    );
  }

  /*
   * =======================================================
   * 다음역
   * =======================================================
   */

  const nextStations = selectedDirection.nextStations;

  /*
   * =======================================================
   * Registry fallback
   * =======================================================
   */

  const registryTrains = getTrains(
    station.lineId,

    selectedDirection.id,
  );

  /*
   * =======================================================
   * 실제 표시할 열차
   * =======================================================
   */

  let trains = registryTrains;

  /*
   * 게이세이
   */

  if (isKeisei) {
    trains = keiseiTrains;
  }

  /*
   * 게이큐
   */

  if (isKeikyu) {
    trains = keikyuTrains;
  }


  /*
   * 도큐
   */

  if (isTokyu) {
    trains = tokyuTrains;
  }


  /*
   * 세이부
   */

  if (isSeibu) {
    trains = seibuTrains;
  }

  /*
   * JR
   */

  if (isJrEast) {
    trains = jrTrains;
  }

  /*
   * 도에이
   */

  if (isToei) {
    trains = toeiTrains;
  }

  /*
   * Tokyo Metro
   */

  if (isTokyoMetro) {
    trains = tokyoMetroTrains;
  }

  /*
   * =======================================================
   * 실시간 남은 시간 계산
   * =======================================================
   */

  const displayTrains = trains
    .map((train) => {
      const seconds = calculateSecondsUntilDeparture(
        train.time,

        currentTime,
      );

      /*
       * 시간을 파싱하지 못한 경우
       */

      if (seconds === null) {
        return {
          ...train,

          secondsUntilDeparture: null as number | null,
        };
      }

      /*
       * 분 단위 표시
       */

      const minutes = seconds <= 0 ? 0 : Math.ceil(seconds / 60);

      return {
        ...train,

        minutesUntilDeparture: minutes,

        secondsUntilDeparture: seconds,
      };
    })

    /*
     * 출발 후 30초가 지나면 제거
     */

    .filter((train) => {
      if (train.secondsUntilDeparture === null) {
        return true;
      }

      return train.secondsUntilDeparture >= -30;
    })

    /*
     * 가까운 열차
     */

    .sort((a, b) => a.minutesUntilDeparture - b.minutesUntilDeparture)

    /*
     * 최대 3대
     */

    .slice(0, 3);

  /*
   * =======================================================
   * Loading
   * =======================================================
   */

  const loading =
    (isKeisei && keiseiLoading) ||
    (isKeikyu && keikyuLoading) ||
    (isSeibu && seibuLoading) ||
    (isJrEast && jrLoading) ||
    (isTokyu && tokyuLoading) ||
    (isToei && toeiLoading) ||
    (isTokyoMetro && tokyoMetroLoading);

  /*
   * =======================================================
   * Error
   * =======================================================
   */

  const error = isKeisei
    ? keiseiError
    : isKeikyu
      ? keikyuError
      : isSeibu
        ? seibuError
        : isJrEast
         ? jrError
         : isTokyu
          ? tokyuError
          : isToei
            ? toeiError
            : isTokyoMetro
              ? tokyoMetroError
            : null;

  /*
   * =======================================================
   * 방향 설명
   * =======================================================
   */

  const directionDescription =
    selectedDirection.description ?? selectedDirection.label;

  /*
   * =======================================================
   * 방향 UI
   * =======================================================
   */

  const isMultiDirection =
    station.type === "multi-direction" || station.type === "special";

  /*
   * =======================================================
   * 평일 / 토휴일
   * =======================================================
   */

  const serviceDayLabel = getServiceDayLabel();

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: colors.background }]}
    >
      <ScrollView
        style={[styles.screen, { backgroundColor: colors.background }]}
        contentContainerStyle={styles.container}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={() => {
              void handleRefresh();
            }}
            tintColor={isDark ? colors.text : station.color}
            colors={[station.color]}
            progressBackgroundColor={colors.surface}
          />
        }
      >
        {/* =================================================
            상단
        ================================================= */}

        <View style={styles.topArea}>
          <TouchableOpacity
            style={styles.backArea}
            activeOpacity={0.7}
            onPress={() => router.back()}
          >
            <Text style={[styles.backArrow, { color: colors.text }]}>‹</Text>
          </TouchableOpacity>

          <StationTopActions
            isFavorite={isFavorite}
            favoriteLoading={favoriteLoading}
            onPressLine={() => {
              router.push(`/line/${station.lineId}`);
            }}
            onPressFavorite={() => {
              void toggleFavorite();
            }}
          />
        </View>
        {/* =================================================
            역 Header
        ================================================= */}

        <StationHeader
          lineCode={station.lineCode}
          stationCode={station.code}
          stationNameKo={station.nameKo}
          stationNameJa={station.nameJa}
          color={station.color}
          hasTransfer={(station.transfers?.length ?? 0) > 0}
          onPressTransfer={() => setTransferVisible(true)}
        />

        {/* =================================================
            운행상태
        ================================================= */}

        <View style={styles.operationStatus}>
          <View style={styles.operationDot} />

          <Text style={[styles.operationText, { color: colors.text }]}>
            정상운행
          </Text>
        </View>

        {/* =================================================
            방향 선택
        ================================================= */}

        {isMultiDirection ? (
          <DirectionSelector
            directions={station.directions.map((direction) => ({
              id: direction.id,

              label: direction.shortLabel ?? direction.label,

              description: direction.description,
            }))}
            selectedDirectionId={selectedDirection.id}
            color={station.color}
            onChangeDirection={setSelectedDirectionId}
          />
        ) : (
          <DirectionTabs
            directions={station.directions.map((direction) => ({
              id: direction.id,

              label: direction.shortLabel ?? direction.label,
            }))}
            selectedDirectionId={selectedDirection.id}
            color={station.color}
            onChangeDirection={setSelectedDirectionId}
          />
        )}

        {/* =================================================
            다음역
        ================================================= */}

        <Text style={[styles.sectionLabel, { color: colors.textMuted }]}>
          다음역
        </Text>

        <View style={styles.nextStationList}>
          {nextStations.map((nextStation) => (
            <NextStationCard
              key={nextStation.id}
              lineCode={nextStation.lineCode}
              lineNameKo={nextStation.lineNameKo}
              stationCode={nextStation.code}
              stationNameKo={nextStation.nameKo}
              stationNameJa={nextStation.nameJa}
              color={nextStation.color}
              showLineName={nextStations.length > 1}
              onPress={() => {
                router.push({
                  pathname: "/station/[stationId]",
                  params: {
                    stationId: nextStation.id,
                    lineId: nextStation.lineId,
                  },
                });
              }}
            />
          ))}
        </View>

        {/* =================================================
            다음 도착
        ================================================= */}

        <View style={styles.nextSection}>
          <View style={styles.nextTitleArea}>
            <Text style={[styles.nextSectionTitle, { color: colors.text }]}>
              다음 도착
            </Text>

            <Text
              style={[
                styles.directionText,

                {
                  color: station.color,
                },
              ]}
            >
              {directionDescription}
            </Text>
          </View>

          <View style={styles.updateInfo}>
            <View style={styles.weekdayArea}>
              <View
                style={[
                  styles.weekdayDot,

                  {
                    backgroundColor: station.color,
                  },
                ]}
              />

              <Text
                style={[styles.weekdayText, { color: colors.textSecondary }]}
              >
                {serviceDayLabel}
              </Text>
            </View>

            <Text style={[styles.updatedText, { color: colors.textMuted }]}>
              {lastUpdatedLabel} 기준
            </Text>
          </View>
        </View>

        <Text style={[styles.refreshHint, { color: colors.textMuted }]}>
          화면을 아래로 당기면 최신 시간표로 갱신됩니다.
        </Text>

        {/* =================================================
            Loading
        ================================================= */}

        {loading && !refreshing && (
          <View
            style={[styles.loadingArea, { backgroundColor: colors.surface }]}
          >
            <ActivityIndicator size="small" color={station.color} />

            <Text style={[styles.loadingText, { color: colors.textSecondary }]}>
              열차 정보를 불러오는 중입니다.
            </Text>
          </View>
        )}

        {/* =================================================
            Error
        ================================================= */}

        {!loading && error && (
          <View style={[styles.errorArea, { backgroundColor: colors.surface }]}>
            <Text style={styles.errorTitle}>
              열차 정보를 불러오지 못했습니다.
            </Text>

            <Text
              style={[styles.errorDescription, { color: colors.textMuted }]}
            >
              {error}
            </Text>

            <Text
              style={[styles.errorRefreshHint, { color: colors.textSecondary }]}
            >
              화면을 아래로 당겨 다시 시도해 주세요.
            </Text>
          </View>
        )}

        {/* =================================================
            열차
        ================================================= */}

        {!loading && !error && (
          <View style={styles.trainList}>
            {displayTrains.map((train) => (
              <TrainCard
                key={train.id}
                time={train.time}
                minutes={train.minutesUntilDeparture}
                color={station.color}
                trainType={train.trainType}
                destinationKo={train.destinationKo}
                destinationJa={train.destinationJa}
                isOrigin={train.status === "origin"}
              />
            ))}
          </View>
        )}

        {/* =================================================
            열차 없음
        ================================================= */}

        {!loading && !error && displayTrains.length === 0 && (
          <View
            style={[styles.emptyTrain, { backgroundColor: colors.surface }]}
          >
            <Text style={[styles.emptyTrainTitle, { color: colors.text }]}>
              표시할 열차가 없습니다.
            </Text>

            <Text
              style={[
                styles.emptyTrainDescription,
                { color: colors.textMuted },
              ]}
            >
              현재 방향의 다음 열차가 없습니다.
            </Text>
          </View>
        )}

        <View style={styles.bottomSpace} />
      </ScrollView>

      {/* ===================================================
          환승 Bottom Sheet
      =================================================== */}

      <TransferBottomSheet
        visible={transferVisible}
        transfers={station.transfers ?? []}
        onClose={() => setTransferVisible(false)}
        onPressTransfer={(transfer) => {
          /*
           * 선택한 환승 노선의 전체 역
           */
          const targetStations = getStationsByLine(transfer.id);
          console.log("=== 환승 DEBUG ===");
          console.log("transfer.id:", transfer.id);
          console.log("현재역:", station.id, station.nameJa);
          console.log(
            "대상역:",
            targetStations.map((item) => ({
              id: item.id,
              nameJa: item.nameJa,
            })),
          );

          /*
           * 현재 역과 같은 역명을 가진
           * 환승 대상 역 찾기
           */
          const targetStation = targetStations.find(
            (item) => item.nameJa === station.nameJa,
          );

          /*
           * 환승역을 찾지 못한 경우
           */
          if (!targetStation) {
            console.warn("환승역을 찾을 수 없습니다.", {
              currentStation: station.nameJa,

              transferLine: transfer.id,
            });

            setTransferVisible(false);

            return;
          }

          /*
           * Bottom Sheet 닫기
           */
          setTransferVisible(false);

          /*
           * 환승 노선의 같은 역으로 이동
           */
          router.push({
            pathname: "/station/[stationId]",
            params: {
              stationId: targetStation.id,
              lineId: transfer.id,
            },
          });
        }}
      />
    </SafeAreaView>
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
    paddingHorizontal: 24,

    paddingTop: 24,

    paddingBottom: 110,
  },

  topArea: {
    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",

    marginBottom: 34,
  },

  backArea: {
    flexDirection: "row",

    alignItems: "center",
  },

  backArrow: {
    marginRight: 5,

    fontSize: 34,

    lineHeight: 34,

    color: "#17191D",
  },

  backText: {
    fontSize: 16,

    fontWeight: "500",

    color: "#7D8796",
  },

  favoriteButton: {
    width: 44,

    height: 44,

    borderRadius: 15,

    backgroundColor: "#FFFFFF",

    alignItems: "center",

    justifyContent: "center",
  },

  favoriteButtonActive: {
    backgroundColor: "#FFF8DE",
  },

  favoriteIcon: {
    marginTop: -2,

    fontSize: 25,

    lineHeight: 29,

    color: "#A3ABB6",
  },

  favoriteIconActive: {
    color: "#F5B800",
  },

  operationStatus: {
    marginTop: 24,

    flexDirection: "row",

    alignItems: "center",
  },

  operationDot: {
    width: 9,

    height: 9,

    borderRadius: 5,

    backgroundColor: "#16A34A",

    marginRight: 8,
  },

  operationText: {
    fontSize: 14,

    lineHeight: 18,

    fontWeight: "700",

    color: "#17191D",
  },

  sectionLabel: {
    marginBottom: 10,

    fontSize: 15,

    lineHeight: 20,

    fontWeight: "700",

    color: "#9AA4B3",
  },

  nextStationList: {
    gap: 10,
  },

  nextSection: {
    marginTop: 28,

    flexDirection: "row",

    alignItems: "center",

    justifyContent: "space-between",
  },

  nextTitleArea: {
    flex: 1,

    flexDirection: "row",

    alignItems: "center",

    minWidth: 0,
  },

  nextSectionTitle: {
    fontSize: 22,

    lineHeight: 28,

    fontWeight: "800",

    color: "#15171A",
  },

  directionText: {
    flex: 1,

    marginLeft: 8,

    fontSize: 13,

    lineHeight: 18,

    fontWeight: "700",
  },

  updateInfo: {
    marginLeft: 10,

    alignItems: "flex-end",
  },

  weekdayArea: {
    flexDirection: "row",

    alignItems: "center",
  },

  weekdayDot: {
    width: 9,

    height: 9,

    borderRadius: 5,

    marginRight: 5,
  },

  weekdayText: {
    fontSize: 12,

    lineHeight: 16,

    fontWeight: "700",

    color: "#20242A",
  },

  updatedText: {
    marginTop: 3,

    fontSize: 9,

    lineHeight: 12,

    fontWeight: "500",

    color: "#9AA4B3",
  },

  refreshHint: {
    marginTop: 8,

    fontSize: 10,

    lineHeight: 14,

    color: "#A5ADB8",
  },

  loadingArea: {
    marginTop: 16,

    minHeight: 120,

    borderRadius: 20,

    backgroundColor: "#FFFFFF",

    alignItems: "center",

    justifyContent: "center",
  },

  loadingText: {
    marginTop: 12,

    fontSize: 13,

    lineHeight: 18,

    color: "#7D8796",

    textAlign: "center",
  },

  errorArea: {
    marginTop: 16,

    paddingVertical: 24,

    paddingHorizontal: 18,

    borderRadius: 20,

    backgroundColor: "#FFFFFF",

    alignItems: "center",
  },

  errorTitle: {
    fontSize: 15,

    fontWeight: "800",

    color: "#C62828",

    textAlign: "center",
  },

  errorDescription: {
    marginTop: 8,

    fontSize: 12,

    lineHeight: 17,

    color: "#8C96A5",

    textAlign: "center",
  },

  errorRefreshHint: {
    marginTop: 10,

    fontSize: 11,

    lineHeight: 16,

    fontWeight: "600",

    color: "#747E8C",

    textAlign: "center",
  },

  trainList: {
    marginTop: 16,

    gap: 14,
  },

  emptyTrain: {
    marginTop: 16,

    paddingVertical: 30,

    paddingHorizontal: 20,

    borderRadius: 20,

    backgroundColor: "#FFFFFF",

    alignItems: "center",
  },

  emptyTrainTitle: {
    fontSize: 15,

    fontWeight: "700",

    color: "#30343A",
  },

  emptyTrainDescription: {
    marginTop: 6,

    fontSize: 12,

    lineHeight: 17,

    color: "#9AA4B3",

    textAlign: "center",
  },

  bottomSpace: {
    height: 90,
  },

  notFoundContainer: {
    flex: 1,

    alignItems: "center",

    justifyContent: "center",

    paddingHorizontal: 24,
  },

  notFoundTitle: {
    fontSize: 22,

    fontWeight: "800",

    color: "#17191D",
  },

  notFoundDescription: {
    marginTop: 8,

    fontSize: 14,

    color: "#8C96A5",
  },

  backHome: {
    marginTop: 24,

    fontSize: 15,

    fontWeight: "700",

    color: "#80C41C",
  },
});
