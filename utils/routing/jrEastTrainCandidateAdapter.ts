
import type { RailwayNodeId } from "./types";
import type { TrainCandidate } from "./trainResolverTypes";

/*
 * =========================================================
 * JR East 시간표 데이터
 * =========================================================
 *
 * 🟨 API /api/timetable 에서 GUIDE가 받는 데 필요한
 * 최소한의 데이터만 정의한다.
 *
 * 실제 RailwayTimetable에는 더 많은 필드가 있어도 된다.
 */
export type JrEastTimetableEntry = {
  id: string;

  lineId: string;
  stationId: string;
  directionId: string;

  departureTime: string;

  trainType?: string;
  trainTypeKo?: string;
  trainTypeJa?: string;

  trainNumber?: string;

  destinationStation?: string;
  destinationKo?: string;
  destinationJa?: string;
};

/*
 * =========================================================
 * Adapter 입력값
 * =========================================================
 */
export type BuildJrEastTrainCandidatesParams = {
  lineId: string;

  fromNodeId: RailwayNodeId;
  fromStationId: string;

  toNodeId: RailwayNodeId;
  toStationId: string;

  originTimetable: JrEastTimetableEntry[];
  destinationTimetable: JrEastTimetableEntry[];
};

/*
 * =========================================================
 * JR East TrainCandidate Adapter
 * =========================================================
 *
 * 출발역과 목적지역의 StationTimetable을
 * trainNumber 기준으로 연결한다.
 *
 * 예:
 *
 * Shinjuku
 * 403G 04:44
 *
 *       ↓ trainNumber
 *
 * Ikebukuro
 * 403G 04:53
 *
 *       ↓
 *
 * TrainCandidate
 *
 * departureTime: 04:44
 * arrivalTime:   04:53
 *
 * 주의:
 *
 * 현재 destination timetable의 departureTime을
 * 목적지역의 station time으로 사용한다.
 *
 * ODPT StationTimetable의 departureTime은
 * 엄밀한 의미의 arrivalTime이 아니므로,
 * 향후 실제 arrival 데이터가 확보되면 교체할 수 있다.
 */
export const buildJrEastTrainCandidates = ({
  lineId,
  fromNodeId,
  fromStationId,
  toNodeId,
  toStationId,
  originTimetable,
  destinationTimetable,
}: BuildJrEastTrainCandidatesParams): TrainCandidate[] => {
  const candidates: TrainCandidate[] = [];

  for (const origin of originTimetable) {
    /*
     * trainNumber가 없는 열차는
     * 동일 열차 여부를 안전하게 판단할 수 없다.
     */
    if (!origin.trainNumber) {
      continue;
    }

    /*
     * 다른 노선 데이터가 섞여 있다면 제외한다.
     */
    if (origin.lineId !== lineId) {
      continue;
    }

    /*
     * 목적지역 시간표에서
     * 동일 trainNumber를 찾는다.
     */
    const destination = destinationTimetable.find(
      (item) =>
        item.lineId === lineId &&
        item.trainNumber === origin.trainNumber,
    );

    /*
     * 목적지역 시간표에 같은 열차가 없다.
     *
     * 즉 현재 데이터 기준으로는
     * 이 열차가 목적지역에 정차한다고 확인할 수 없다.
     */
    if (!destination) {
      continue;
    }

    const candidate: TrainCandidate = {
      id: `jr-east:${lineId}:${origin.trainNumber}:${fromStationId}:${toStationId}`,

      lineId,

      fromNodeId,
      fromStationId,

      toNodeId,
      toStationId,

      departureTime: origin.departureTime,

      /*
       * 현재는 목적지역 StationTimetable의
       * departureTime을 station-time estimate로 사용한다.
       */
      arrivalTime: destination.departureTime,

      trainType: origin.trainType ?? "unknown",

      trainTypeKo: origin.trainTypeKo,
      trainTypeJa: origin.trainTypeJa,

      trainNumber: origin.trainNumber,

      destinationKo: origin.destinationKo,
      destinationJa: origin.destinationJa,

      /*
       * 동일 trainNumber가 목적지역 시간표에도 존재하므로
       * 현재 데이터 기준으로 목적지역 정차가 확인된 상태다.
       */
      stopsAtDestination: true,

      /*
       * StationTimetable만으로는 취소/지연 여부를
       * 판단하지 않는다.
       *
       * 향후 odpt:Train / TrainInformation을 결합하면서
       * 실제 상태를 넣는다.
       */
      status: "unknown",
    };

    candidates.push(candidate);
  }

  return candidates;
};