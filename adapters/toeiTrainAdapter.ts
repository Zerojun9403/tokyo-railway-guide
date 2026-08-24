import type { Train } from "../types/train";

import type { ToeiUpcomingTrain } from "../services/toei";

/*
 * =========================================================
 * Toei Train Adapter
 * =========================================================
 *
 * 도에이 서버 응답
 *
 * {
 *   departureTime,
 *   minutesUntilDeparture,
 *   trainNumber,
 *   trainType,
 *   destinationStations
 * }
 *
 *      ↓
 *
 * Tokyo Railway Guide 공통 Train
 *
 * =========================================================
 */

/*
 * =========================================================
 * 열차 종류 번역
 * =========================================================
 */

const TRAIN_TYPE_MAP: Record<string, string> = {
  Local: "보통",

  Express: "급행",

  Rapid: "쾌속",

  LimitedExpress: "특급",
};

/*
 * =========================================================
 * 오에도선 역 이름 번역
 * =========================================================
 *
 * 우선 현재 테스트하는 역부터 등록.
 *
 * E01~E38 전체 확장할 때
 * 이 Map도 같이 늘릴 수 있다.
 * =========================================================
 */

const OEDO_DESTINATION_MAP: Record<
  string,
  {
    ko: string;
    ja: string;
  }
> = {
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
    ko: "이이다바시",
    ja: "飯田橋",
  },
};

/*
 * =========================================================
 * 종별 번역
 * =========================================================
 */

const translateTrainType = (value: string | null): string | undefined => {
  if (!value) {
    return undefined;
  }

  return TRAIN_TYPE_MAP[value] ?? value;
};

/*
 * =========================================================
 * 행선지
 * =========================================================
 */

const getDestination = (destinationStations: string[]) => {
  /*
   * ODPT destinationStation은 배열
   *
   * 일반적으로 첫 번째 값을 사용
   */

  const stationId = destinationStations[0];

  if (!stationId) {
    return {
      destinationKo: undefined,

      destinationJa: undefined,
    };
  }

  const station = OEDO_DESTINATION_MAP[stationId];

  /*
   * 번역 데이터가 있으면
   * 한국어 / 일본어 사용
   */

  if (station) {
    return {
      destinationKo: station.ko,

      destinationJa: station.ja,
    };
  }

  /*
   * 아직 Map에 등록되지 않은 역이면
   * ODPT ID라도 표시
   */

  return {
    destinationKo: stationId,

    destinationJa: undefined,
  };
};

/*
 * =========================================================
 * 열차 하나 변환
 * =========================================================
 */

export const adaptToeiTrain = (
  train: ToeiUpcomingTrain,
  index: number,
  directionId: string,
): Train => {
  const { destinationKo, destinationJa } = getDestination(
    train.destinationStations,
  );

  return {
    /*
     * 열차번호 기반 ID
     */

    id: train.trainNumber
      ? `toei-${directionId}-${train.trainNumber}-${index}`
      : `toei-${directionId}-${train.departureTime}-${index}`,

    /*
     * 실제 출발시간
     */

    time: train.departureTime,

    /*
     * 서버에서 계산된 몇 분 후
     */

    minutesUntilDeparture: train.minutesUntilDeparture,

    /*
     * 보통 / 급행 등
     */

    trainType: translateTrainType(train.trainType),

    /*
     * 행선지
     */

    destinationKo,

    destinationJa,

    /*
     * 앱 방향 ID
     */

    directionId,

    /*
     * 일반 운행
     */

    status: "normal",
  };
};

/*
 * =========================================================
 * 배열 전체 변환
 * =========================================================
 */

export const adaptToeiTrains = (
  trains: ToeiUpcomingTrain[],
  directionId: string,
): Train[] => {
  return trains.map((train, index) =>
    adaptToeiTrain(train, index, directionId),
  );
};
