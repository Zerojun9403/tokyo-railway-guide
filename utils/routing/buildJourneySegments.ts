import type { MinTransferRouteStep } from "./findMinTransferRoute";
import type {
  JourneySegment,
  JourneyStructure,
  JourneyTransfer,
} from "./journeyTypes";
import type {
  RailwayGraph,
  RailwayNode,
} from "./types";

type SegmentBuilder = {
  startNode: RailwayNode;
  endNode: RailwayNode;
  rideCount: number;
};

const createJourneySegment = (
  builder: SegmentBuilder,
): JourneySegment | null => {
  const {
    startNode,
    endNode,
    rideCount,
  } = builder;

  /*
   * 실제 ride가 없는 경우에는
   * 열차를 타는 Segment가 아니다.
   */
  if (rideCount === 0) {
    return null;
  }

  /*
   * 하나의 승차 Segment 안에서는
   * 같은 노선을 유지해야 한다.
   */
  if (startNode.lineId !== endNode.lineId) {
    return null;
  }

  return {
    lineId: startNode.lineId,

    fromNodeId: startNode.id,
    toNodeId: endNode.id,

    fromStationId: startNode.stationId,
    toStationId: endNode.stationId,

    fromStationNameKo: startNode.station.nameKo,
    toStationNameKo: endNode.station.nameKo,

    rideCount,
  };
};

export const buildJourneySegments = (
  graph: RailwayGraph,
  route: MinTransferRouteStep[],
): JourneyStructure => {
  const segments: JourneySegment[] = [];
  const transfers: JourneyTransfer[] = [];

  if (route.length === 0) {
    return {
      segments,
      transfers,
    };
  }

  const firstStep = route[0];
  const firstNode = graph.nodes.get(firstStep.nodeId);

  if (!firstNode) {
    return {
      segments,
      transfers,
    };
  }

  let currentSegment: SegmentBuilder = {
    startNode: firstNode,
    endNode: firstNode,
    rideCount: 0,
  };

  for (
    let index = 1;
    index < route.length;
    index += 1
  ) {
    const step = route[index];
    const node = graph.nodes.get(step.nodeId);

    if (!node) {
      return {
        segments: [],
        transfers: [],
      };
    }

    /*
     * =========================================================
     * 같은 노선에서 한 역 이동
     * =========================================================
     */
    if (step.via === "ride") {
      /*
       * ride edge는 같은 노선 안에서만
       * 발생해야 한다.
       */
      if (
        node.lineId !==
        currentSegment.startNode.lineId
      ) {
        return {
          segments: [],
          transfers: [],
        };
      }

      currentSegment.endNode = node;
      currentSegment.rideCount += 1;

      continue;
    }

    /*
     * =========================================================
     * 환승
     * =========================================================
     *
     * transfer step의 node는
     * 환승 후 새 노선의 물리역 노드다.
     */
    if (step.via === "transfer") {
      const completedSegment =
        createJourneySegment(currentSegment);

      if (completedSegment) {
        segments.push(completedSegment);
      }

      const previousStep = route[index - 1];

      const previousNode = graph.nodes.get(
        previousStep.nodeId,
      );

      if (!previousNode) {
        return {
          segments: [],
          transfers: [],
        };
      }

      const transfer: JourneyTransfer = {
        fromNodeId: previousNode.id,
        toNodeId: node.id,

        stationNameKo:
          previousNode.station.nameKo,

        fromLineId: previousNode.lineId,
        toLineId: node.lineId,
      };

      transfers.push(transfer);

      /*
       * 환승한 노드에서 새로운 승차 Segment 시작.
       *
       * 아직 열차를 타고 이동한 것은 아니므로
       * rideCount는 0.
       */
      currentSegment = {
        startNode: node,
        endNode: node,
        rideCount: 0,
      };
    }
  }

  /*
   * 마지막 승차 Segment 저장
   */
  const finalSegment =
    createJourneySegment(currentSegment);

  if (finalSegment) {
    segments.push(finalSegment);
  }

  return {
    segments,
    transfers,
  };
};