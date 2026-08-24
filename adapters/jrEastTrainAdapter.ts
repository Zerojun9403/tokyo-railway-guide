import type { Train } from "../types/train";

import type { JrNextTrain } from "../services/jrEast";

/*
 * =========================================================
 * JR East Train Adapter
 * =========================================================
 *
 * tokyo-metro-sigma API 응답
 *
 * {
 *   trainNumber,
 *   departureTime,
 *   minutesUntilDeparture
 * }
 *
 *      ↓
 *
 * Tokyo Railway Guide 공통 Train
 *
 * =========================================================
 */

export const adaptJrEastTrain = (
  train: JrNextTrain,
  index: number,
  directionId: string,
): Train => {
  return {
    /*
     * 서버에서 trainNumber가 있으면
     * 그 값을 기반으로 ID 생성
     */

    id: train.trainNumber
      ? `jr-${directionId}-${train.trainNumber}-${index}`
      : `jr-${directionId}-${train.departureTime}-${index}`,

    /*
     * 실제 출발 시각
     */

    time: train.departureTime,

    /*
     * 서버에서 이미 일본 현재시각 기준으로
     * 계산된 값
     */

    minutesUntilDeparture: train.minutesUntilDeparture,

    /*
     * 야마노테는 기본적으로
     * 별도 열차종별 표시가 필요 없으므로
     * trainType은 비워둔다.
     */

    trainType: undefined,

    /*
     * 현재 야마노테 API에서는
     * 목적지를 별도로 표시하지 않으므로
     * undefined
     */

    destinationKo: undefined,

    destinationJa: undefined,

    /*
     * inner / outer
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
