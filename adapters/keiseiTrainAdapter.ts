import type { Train } from "../types/train";

import type { KeiseiTimetableDeparture } from "../services/keisei";

const TRAIN_TYPE_MAP: Record<string, string> = {
  普通: "보통",
  快速: "쾌속",
  特急: "특급",
  快速特急: "쾌속특급",
  通勤特急: "통근특급",
  アクセス特急: "액세스특급",
  スカイライナー: "스카이라이너",
  モーニングライナー: "모닝 라이너",
  イブニングライナー: "이브닝 라이너",
};

const DESTINATION_MAP: Record<string, string> = {
  成田空港: "나리타공항",
  京成成田: "게이세이나리타",
  京成高砂: "게이세이다카사고",
  京成津田沼: "게이세이쓰다누마",
  京成佐倉: "게이세이사쿠라",
  京成臼井: "게이세이우스이",
  千葉中央: "치바추오",
  ちはら台: "치하라다이",
  芝山千代田: "시바야마치요다",
  宗吾参道: "소고산도",
  印旛日本医大: "인바니혼이다이",
  印西牧の原: "인자이마키노하라",
  羽田空港: "하네다공항",
  西馬込: "니시마고메",
};

const normalizeText = (value: string) => {
  return value.replace(/\s+/g, "").trim();
};

const translateTrainType = (value: string) => {
  const normalized = normalizeText(value);

  return TRAIN_TYPE_MAP[normalized] ?? value;
};

const translateDestination = (value: string) => {
  const normalized = normalizeText(value);

  return DESTINATION_MAP[normalized] ?? value;
};

export const adaptKeiseiTimetableDeparture = (
  departure: KeiseiTimetableDeparture,
  index: number,
  directionId: string,
): Train => {
  return {
    id: `keisei-${directionId}-${departure.time}-${index}`,

    time: departure.time,

    minutesUntilDeparture: departure.minutesUntilDeparture ?? 0,

    trainType: translateTrainType(departure.trainType),

    destinationKo: translateDestination(departure.destination),

    destinationJa: departure.destination,

    directionId,

    status: departure.firstTrain ? "origin" : "normal",
  };
};

export const adaptKeiseiTimetableDepartures = (
  departures: KeiseiTimetableDeparture[],
  directionId: string,
): Train[] => {
  return departures.map((departure, index) =>
    adaptKeiseiTimetableDeparture(departure, index, directionId),
  );
};
