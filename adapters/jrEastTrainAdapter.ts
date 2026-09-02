import type { Train } from "../types/train";

import type { JrNextTrain } from "../services/jrEast";

/*
 * =========================================================
 * JR East Train Adapter
 * =========================================================
 *
 * tokyo-railway-api 응답
 *
 * {
 *   id,
 *   departureTime,
 *   trainType,
 *   trainTypeKo,
 *   trainTypeJa,
 *   destinationStation,
 *   destinationKo,
 *   destinationJa
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
 * 출발까지 남은 시간 계산
 * =========================================================
 *
 * API의 departureTime은 HH:mm 형식.
 * 일본 현지 시각 기준으로 다음 출발까지의 분을 계산한다.
 *
 * 자정 이후 시간표도 처리할 수 있도록
 * 이미 지난 시각이면 다음 날로 계산한다.
 * =========================================================
 */

const getMinutesUntilDeparture = (departureTime: string): number => {
  const [hoursText, minutesText] = departureTime.split(":");

  const hours = Number(hoursText);
  const minutes = Number(minutesText);

  if (!Number.isFinite(hours) || !Number.isFinite(minutes)) {
    return 0;
  }

  const now = new Date();

  const tokyoParts = new Intl.DateTimeFormat("en-US", {
    timeZone: "Asia/Tokyo",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(now);

  const tokyoHour = Number(
    tokyoParts.find((part) => part.type === "hour")?.value ?? "0",
  );

  const tokyoMinute = Number(
    tokyoParts.find((part) => part.type === "minute")?.value ?? "0",
  );

  const nowMinutes = tokyoHour * 60 + tokyoMinute;
  let departureMinutes = hours * 60 + minutes;

  if (departureMinutes < nowMinutes) {
    departureMinutes += 24 * 60;
  }

  return departureMinutes - nowMinutes;
};

/*
 * =========================================================
 * 단일 열차 변환
 * =========================================================
 */

export const adaptJrEastTrain = (
  train: JrNextTrain,
  index: number,
  directionId: string,
): Train => {
  return {
    /*
     * 백엔드에서 생성한 고유 ID 사용
     */

    id: train.id || `jr-${directionId}-${train.departureTime}-${index}`,

    /*
     * 실제 출발 시각
     */

    time: train.departureTime,

    /*
     * 일본 현재 시각 기준 출발까지 남은 시간
     */

    minutesUntilDeparture: getMinutesUntilDeparture(train.departureTime),

    /*
     * 열차 종별
     *
     * 공통 Train 타입은 문자열 하나를 사용하므로
     * 한국어 번역을 우선 사용한다.
     */

    trainType: train.trainTypeKo ?? train.trainType,

    /*
     * 목적지 번역
     */

    destinationKo:
      train.destinationKo ??
      train.destinationStation,

    destinationJa:
      train.destinationJa ??
      train.destinationStation,

    /*
     * 앱에서 사용 중인 방향 ID 유지
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

export const adaptJrEastTrains = (
  trains: JrNextTrain[],
  directionId: string,
): Train[] => {
  return trains.map((train, index) =>
    adaptJrEastTrain(train, index, directionId),
  );
};