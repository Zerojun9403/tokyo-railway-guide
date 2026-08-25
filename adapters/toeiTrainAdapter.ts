import type { Train } from "../types/train";
import type { ToeiUpcomingTrain } from "../services/toei";

/*
 * =========================================================
 * Tokyo Railway Guide
 * Toei Train Adapter
 * =========================================================
 *
 * Toei API response
 *      ↓
 * Common Train type
 *
 * Supports:
 * A Asakusa Line
 * E Oedo Line
 *
 * Mita / Shinjuku can be added to the same destination map
 * structure later.
 * =========================================================
 */

/*
 * =========================================================
 * Train type translation
 * =========================================================
 */

const TRAIN_TYPE_MAP: Record<string, string> = {
  Local: "보통",
  Express: "급행",
  Rapid: "쾌속",
  LimitedExpress: "특급",

  AirportLimitedExpress: "에어포트 쾌특",
  AirportExpress: "에어포트 급행",

  AccessExpress: "액세스 특급",
  RapidLimitedExpress: "쾌특",
  CommuterLimitedExpress: "통근특급",
};

/*
 * =========================================================
 * Destination type
 * =========================================================
 */

type DestinationName = {
  ko: string;
  ja: string;
};

/*
 * =========================================================
 * Oedo Line destinations
 * =========================================================
 */

const OEDO_DESTINATION_MAP: Record<string, DestinationName> = {
  ShinjukuNishiguchi: {
    ko: "신주쿠니시구치",
    ja: "新宿西口",
  },

  Tochomae: {
    ko: "도초마에",
    ja: "都庁前",
  },

  Shinjuku: {
    ko: "신주쿠",
    ja: "新宿",
  },

  Hikarigaoka: {
    ko: "히카리가오카",
    ja: "光が丘",
  },

  Nerima: {
    ko: "네리마",
    ja: "練馬",
  },

  Roppongi: {
    ko: "롯폰기",
    ja: "六本木",
  },

  Daimon: {
    ko: "다이몬",
    ja: "大門",
  },

  Ryogoku: {
    ko: "료고쿠",
    ja: "両国",
  },

  Iidabashi: {
    ko: "이다바시",
    ja: "飯田橋",
  },
};

/*
 * =========================================================
 * Asakusa Line destinations
 * =========================================================
 *
 * First map the 20 stations inside the Asakusa Line.
 *
 * Through-service destinations on Keikyu / Keisei /
 * Hokuso / Shibayama Railway can be added after checking
 * the actual API destinationStation values.
 * =========================================================
 */

const ASAKUSA_DESTINATION_MAP: Record<string, DestinationName> = {
  NishiMagome: {
    ko: "니시마고메",
    ja: "西馬込",
  },

  Magome: {
    ko: "마고메",
    ja: "馬込",
  },

  Nakanobu: {
    ko: "나카노부",
    ja: "中延",
  },

  Togoshi: {
    ko: "도고시",
    ja: "戸越",
  },

  Gotanda: {
    ko: "고탄다",
    ja: "五反田",
  },

  Takanawadai: {
    ko: "다카나와다이",
    ja: "高輪台",
  },

  Sengakuji: {
    ko: "센가쿠지",
    ja: "泉岳寺",
  },

  Mita: {
    ko: "미타",
    ja: "三田",
  },

  Daimon: {
    ko: "다이몬",
    ja: "大門",
  },

  Shimbashi: {
    ko: "신바시",
    ja: "新橋",
  },

  HigashiGinza: {
    ko: "히가시긴자",
    ja: "東銀座",
  },

  Takaracho: {
    ko: "다카라초",
    ja: "宝町",
  },

  Nihombashi: {
    ko: "니혼바시",
    ja: "日本橋",
  },

  Ningyocho: {
    ko: "닌교초",
    ja: "人形町",
  },

  HigashiNihombashi: {
    ko: "히가시니혼바시",
    ja: "東日本橋",
  },

  Asakusabashi: {
    ko: "아사쿠사바시",
    ja: "浅草橋",
  },

  Kuramae: {
    ko: "구라마에",
    ja: "蔵前",
  },

  Asakusa: {
    ko: "아사쿠사",
    ja: "浅草",
  },

  HonjoAzumabashi: {
    ko: "혼조아즈마바시",
    ja: "本所吾妻橋",
  },

  Oshiage: {
    ko: "오시아게",
    ja: "押上",
  },
};

/*
 * =========================================================
 * Common destination map
 * =========================================================
 */

const TOEI_DESTINATION_MAP: Record<string, DestinationName> = {
  ...OEDO_DESTINATION_MAP,
  ...ASAKUSA_DESTINATION_MAP,
};

/*
 * =========================================================
 * Train type
 * =========================================================
 */

const translateTrainType = (
  value: string | null,
): string | undefined => {
  if (!value) {
    return undefined;
  }

  return TRAIN_TYPE_MAP[value] ?? value;
};

/*
 * =========================================================
 * Normalize ODPT destination ID
 * =========================================================
 *
 * The current backend normally returns values such as:
 *
 * Roppongi
 * Oshiage
 * NishiMagome
 *
 * If a future backend returns a full ODPT identifier such as
 * odpt.Station:Toei.Asakusa.Oshiage,
 * using the last segment still allows the map to work.
 * =========================================================
 */

const normalizeDestinationId = (
  value: string,
): string => {
  const colonPart =
    value.split(":").pop() ?? value;

  const dotParts =
    colonPart.split(".");

  return (
    dotParts[dotParts.length - 1] ??
    colonPart
  );
};

/*
 * =========================================================
 * Destination translation
 * =========================================================
 */

const getDestination = (
  destinationStations: string[],
) => {
  const rawStationId =
    destinationStations[0];

  if (!rawStationId) {
    return {
      destinationKo: undefined,
      destinationJa: undefined,
    };
  }

  const stationId =
    normalizeDestinationId(
      rawStationId,
    );

  const station =
    TOEI_DESTINATION_MAP[
      stationId
    ];

  if (station) {
    return {
      destinationKo: station.ko,
      destinationJa: station.ja,
    };
  }

  /*
   * Unknown through-service destination:
   *
   * Do not discard the API value.
   * Show the raw destination so it can be checked later.
   */

  return {
    destinationKo: stationId,
    destinationJa: undefined,
  };
};

/*
 * =========================================================
 * One Toei train → common Train
 * =========================================================
 */

export const adaptToeiTrain = (
  train: ToeiUpcomingTrain,
  index: number,
  directionId: string,
): Train => {
  const {
    destinationKo,
    destinationJa,
  } = getDestination(
    train.destinationStations,
  );

  return {
    id: train.trainNumber
      ? `toei-${directionId}-${train.trainNumber}-${index}`
      : `toei-${directionId}-${train.departureTime}-${index}`,

    time: train.departureTime,

    minutesUntilDeparture:
      train.minutesUntilDeparture,

    trainType: translateTrainType(
      train.trainType,
    ),

    destinationKo,

    destinationJa,

    trainNumber:
      train.trainNumber ??
      undefined,

    directionId,

    status: "normal",
  };
};

/*
 * =========================================================
 * Toei train array → common Train[]
 * =========================================================
 */

export const adaptToeiTrains = (
  trains: ToeiUpcomingTrain[],
  directionId: string,
): Train[] => {
  return trains.map(
    (train, index) =>
      adaptToeiTrain(
        train,
        index,
        directionId,
      ),
  );
};