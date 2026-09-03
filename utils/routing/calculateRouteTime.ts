import type { MinTransferRouteStep } from "./findMinTransferRoute";

export const MINUTES_PER_RIDE = 2;
export const MINUTES_PER_TRANSFER = 3;

export type RouteTimeResult = {
  rideMinutes: number;
  transferMinutes: number;
  totalMinutes: number;
  departureTime: Date;
  arrivalTime: Date;
};

export const calculateRouteTime = (
  route: MinTransferRouteStep[],
  departureTime: Date,
): RouteTimeResult => {
  const rideCount = route.filter(
    (step) => step.via === "ride",
  ).length;

  const transferCount = route.filter(
    (step) => step.via === "transfer",
  ).length;

  const rideMinutes = rideCount * MINUTES_PER_RIDE;
  const transferMinutes =
    transferCount * MINUTES_PER_TRANSFER;

  const totalMinutes = rideMinutes + transferMinutes;

  const arrivalTime = new Date(
    departureTime.getTime() + totalMinutes * 60 * 1000,
  );

  return {
    rideMinutes,
    transferMinutes,
    totalMinutes,
    departureTime,
    arrivalTime,
  };
};