import type { Train } from "../types/train";

import type { TokyoMetroUpcomingTrain } from "../services/tokyoMetro";

/*
 * =========================================================
 * Tokyo Railway Guide
 * Tokyo Metro Train Adapter
 * =========================================================
 *
 * Tokyo Metro API
 *        ↓
 * TokyoMetroUpcomingTrain[]
 *        ↓
 * 공통 Train[]
 *        ↓
 * TrainCard
 *
 * =========================================================
 */

/*
 * =========================================================
 * 역 이름 타입
 * =========================================================
 */

type DestinationName = {
  ko: string;
  ja: string;
};

/*
 * =========================================================
 * Tokyo Metro 역 이름
 * =========================================================
 *
 * key는 전부 소문자 + 특수문자 제거 형태로 관리한다.
 *
 * 예:
 *
 * Ikebukuro
 * ikebukuro
 * TokyoMetro.Marunouchi.Ikebukuro
 *
 * 모두 최종적으로:
 *
 * ikebukuro
 *
 * 로 변환된다.
 * =========================================================
 */

const TOKYO_METRO_DESTINATIONS: Record<string, DestinationName> = {
  /*
   * =======================================================
   * 긴자선
   * =======================================================
   */

  shibuya: {
    ko: "시부야",
    ja: "渋谷",
  },

  omotesando: {
    ko: "오모테산도",
    ja: "表参道",
  },

  gaiemmae: {
    ko: "가이엔마에",
    ja: "外苑前",
  },

  aoyamaitchome: {
    ko: "아오야마잇초메",
    ja: "青山一丁目",
  },

  akasakamitsuke: {
    ko: "아카사카미쓰케",
    ja: "赤坂見附",
  },

  tameikesanno: {
    ko: "다메이케산노",
    ja: "溜池山王",
  },

  toranomon: {
    ko: "도라노몬",
    ja: "虎ノ門",
  },

  shimbashi: {
    ko: "신바시",
    ja: "新橋",
  },

  ginza: {
    ko: "긴자",
    ja: "銀座",
  },

  kyobashi: {
    ko: "교바시",
    ja: "京橋",
  },

  nihombashi: {
    ko: "니혼바시",
    ja: "日本橋",
  },

  mitsukoshimae: {
    ko: "미쓰코시마에",
    ja: "三越前",
  },

  kanda: {
    ko: "간다",
    ja: "神田",
  },

  suehirocho: {
    ko: "스에히로초",
    ja: "末広町",
  },

  uenohirokoji: {
    ko: "우에노히로코지",
    ja: "上野広小路",
  },

  ueno: {
    ko: "우에노",
    ja: "上野",
  },

  inaricho: {
    ko: "이나리초",
    ja: "稲荷町",
  },

  tawaramachi: {
    ko: "다와라마치",
    ja: "田原町",
  },

  asakusa: {
    ko: "아사쿠사",
    ja: "浅草",
  },

  /*
   * =======================================================
   * 마루노우치선 본선
   * =======================================================
   */

  ogikubo: {
    ko: "오기쿠보",
    ja: "荻窪",
  },

  minamiasagaya: {
    ko: "미나미아사가야",
    ja: "南阿佐ケ谷",
  },

  shinkoenji: {
    ko: "신코엔지",
    ja: "新高円寺",
  },

  higashikoenji: {
    ko: "히가시코엔지",
    ja: "東高円寺",
  },

  shinnakano: {
    ko: "신나카노",
    ja: "新中野",
  },

  nakanosakaue: {
    ko: "나카노사카우에",
    ja: "中野坂上",
  },

  nishishinjuku: {
    ko: "니시신주쿠",
    ja: "西新宿",
  },

  shinjuku: {
    ko: "신주쿠",
    ja: "新宿",
  },

  shinjukusanchome: {
    ko: "신주쿠산초메",
    ja: "新宿三丁目",
  },

  shinjukugyoemmae: {
    ko: "신주쿠교엔마에",
    ja: "新宿御苑前",
  },

  yotsuyasanchome: {
    ko: "요쓰야산초메",
    ja: "四谷三丁目",
  },

  yotsuya: {
    ko: "요쓰야",
    ja: "四ツ谷",
  },

  kokkaigijidomae: {
    ko: "국회의사당앞",
    ja: "国会議事堂前",
  },

  kasumigaseki: {
    ko: "가스미가세키",
    ja: "霞ケ関",
  },

  tokyo: {
    ko: "도쿄",
    ja: "東京",
  },

  otemachi: {
    ko: "오테마치",
    ja: "大手町",
  },

  awajicho: {
    ko: "아와지초",
    ja: "淡路町",
  },

  ochanomizu: {
    ko: "오차노미즈",
    ja: "御茶ノ水",
  },

  hongosanchome: {
    ko: "혼고산초메",
    ja: "本郷三丁目",
  },

  korakuen: {
    ko: "고라쿠엔",
    ja: "後楽園",
  },

  myogadani: {
    ko: "묘가다니",
    ja: "茗荷谷",
  },

  shinotsuka: {
    ko: "신오쓰카",
    ja: "新大塚",
  },

  ikebukuro: {
    ko: "이케부쿠로",
    ja: "池袋",
  },

  /*
   * =======================================================
   * 마루노우치선 호난초 지선
   * =======================================================
   */

  honancho: {
    ko: "호난초",
    ja: "方南町",
  },

  nakanofujimicho: {
    ko: "나카노후지미초",
    ja: "中野富士見町",
  },

  nakanoshimbashi: {
    ko: "나카노신바시",
    ja: "中野新橋",
  },
};

/*
 * =========================================================
 * 열차 종별
 * =========================================================
 */

const TOKYO_METRO_TRAIN_TYPE_KO: Record<string, string> = {
  local: "보통",

  express: "급행",

  semiexpress: "준급",

  rapid: "쾌속",

  rapidexpress: "쾌속급행",

  commuterexpress: "통근급행",

  commuterrapid: "통근쾌속",

  limitedexpress: "특급",
};

/*
 * =========================================================
 * ODPT 문자열에서 마지막 값 추출
 * =========================================================
 *
 * 예:
 *
 * odpt.Station:TokyoMetro.Marunouchi.Ikebukuro
 *
 * ↓
 *
 * Ikebukuro
 * =========================================================
 */

const getShortName = (value: string): string => {
  const afterColon = value.split(":").at(-1) ?? value;

  return afterColon.split(".").at(-1) ?? afterColon;
};

/*
 * =========================================================
 * 역 ID 정규화
 * =========================================================
 *
 * 대소문자뿐 아니라
 * 공백 / 하이픈 / 점 등도 제거한다.
 *
 * Ikebukuro
 * IKEBUKURO
 * ikebukuro
 *
 * ↓
 *
 * ikebukuro
 * =========================================================
 */

const normalizeStationKey = (value: string): string => {
  return getShortName(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
};

/*
 * =========================================================
 * 전체 문자열에서도 역 찾기
 * =========================================================
 *
 * API 형식이 예상과 조금 달라도
 * 알려진 역명이 문자열에 포함되어 있으면 잡는다.
 * =========================================================
 */

const findDestinationKey = (rawValue: string): string | undefined => {
  /*
   * 1차:
   * 마지막 ID 직접 비교
   */

  const normalized = normalizeStationKey(rawValue);

  if (TOKYO_METRO_DESTINATIONS[normalized]) {
    return normalized;
  }

  /*
   * 2차:
   * 전체 문자열 비교
   */

  const fullNormalized = rawValue
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  /*
   * 긴 이름부터 먼저 검사
   *
   * 예:
   * shinjuku보다
   * shinjukusanchome을 먼저 잡기 위함
   */

  const knownKeys = Object.keys(TOKYO_METRO_DESTINATIONS).sort(
    (a, b) => b.length - a.length,
  );

  return knownKeys.find((key) => fullNormalized.includes(key));
};

/*
 * =========================================================
 * 행선지 변환
 * =========================================================
 */

const getDestination = (destinationStations: (string | null)[]) => {
  /*
   * 첫 번째 정상 행선지
   */

  const rawDestination = destinationStations.find(
    (station): station is string =>
      typeof station === "string" && station.trim().length > 0,
  );

  if (!rawDestination) {
    return {
      nameKo: undefined,

      nameJa: undefined,
    };
  }

  /*
   * ===============================================
   * 행선지 ID 검색
   * ===============================================
   */

  const destinationKey = findDestinationKey(rawDestination);

  /*
   * 매핑 성공
   */

  if (destinationKey) {
    const destination = TOKYO_METRO_DESTINATIONS[destinationKey];

    return {
      nameKo: destination.ko,

      nameJa: destination.ja,
    };
  }

  /*
   * ===============================================
   * 아직 등록하지 않은 역
   * ===============================================
   *
   * 개발 중 확인하기 위해 console에 표시
   * ===============================================
   */

  console.warn("등록되지 않은 Tokyo Metro 행선지:", rawDestination);

  const fallback = getShortName(rawDestination);

  return {
    nameKo: fallback,

    nameJa: fallback,
  };
};

/*
 * =========================================================
 * 열차 종별 변환
 * =========================================================
 */

const getTrainTypeKo = (trainType: string | null): string => {
  if (!trainType) {
    return "보통";
  }

  const normalized = normalizeStationKey(trainType);

  return TOKYO_METRO_TRAIN_TYPE_KO[normalized] ?? getShortName(trainType);
};

/*
 * =========================================================
 * 단일 열차 변환
 * =========================================================
 */

export const adaptTokyoMetroTrain = (
  train: TokyoMetroUpcomingTrain,

  directionId: string,
): Train | null => {
  /*
   * 출발시간 없음
   */

  if (!train.departureTime) {
    return null;
  }

  /*
   * 이미 출발한 열차
   */

  if (train.minutesUntilDeparture === null || train.minutesUntilDeparture < 0) {
    return null;
  }

  /*
   * 행선지
   */

  const destination = getDestination(train.destinationStations ?? []);

  /*
   * =======================================================
   * 공통 Train
   * =======================================================
   */

  return {
    id:
      train.train ??
      train.trainNumber ??
      ["tokyo-metro", directionId, train.departureTime].join("-"),

    time: train.departureTime,

    minutesUntilDeparture: train.minutesUntilDeparture,

    trainType: getTrainTypeKo(train.trainType),

    destinationKo: destination.nameKo,

    destinationJa: destination.nameJa,

    status: "upcoming",
  };
};

/*
 * =========================================================
 * 여러 열차 변환
 * =========================================================
 */

export const adaptTokyoMetroTrains = (
  trains: TokyoMetroUpcomingTrain[],

  directionId: string,
): Train[] => {
  return trains
    .map((train) =>
      adaptTokyoMetroTrain(
        train,

        directionId,
      ),
    )

    .filter((train): train is Train => train !== null)

    .sort((a, b) => a.minutesUntilDeparture - b.minutesUntilDeparture);
};
