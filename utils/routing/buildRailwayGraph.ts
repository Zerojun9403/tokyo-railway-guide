import { railwayRegistry } from "../../data/railwayRegistry";
import { transferStationOverrides } from "../../data/routing/transferStationOverrides";
import { resolveStationTransfers } from "../normalizeTransfers";
import { isSameStationName } from "./normalizeStationName";
import { transferComplexes } from "../../data/routing/transferComplexes";

import {
  createRailwayNodeId,
  type RailwayEdge,
  type RailwayGraph,
  type RailwayNode,
  type RailwayNodeId,
} from "./types";

export const buildRailwayGraph = (): RailwayGraph => {
  const nodes = new Map<RailwayNodeId, RailwayNode>();
  const edges = new Map<RailwayNodeId, RailwayEdge[]>();

  const addEdge = (edge: RailwayEdge) => {
    const currentEdges = edges.get(edge.from) ?? [];

    const alreadyExists = currentEdges.some(
      (currentEdge) =>
        currentEdge.to === edge.to &&
        currentEdge.type === edge.type,
    );

    if (alreadyExists) {
      return;
    }

    currentEdges.push(edge);
    edges.set(edge.from, currentEdges);
  };

  /*
   * =====================================================
   * 1. 노선별 역 노드 + 승차(ride) edge 생성
   * =====================================================
   */

  Object.values(railwayRegistry).forEach((line) => {
    line.stations.forEach((station, index) => {
      const nodeId = createRailwayNodeId(
        line.id,
        station.id,
      );

      nodes.set(nodeId, {
        id: nodeId,
        lineId: line.id,
        stationId: station.id,
        station,
      });

      if (!edges.has(nodeId)) {
        edges.set(nodeId, []);
      }

      const nextStation =
        line.stations[index + 1];

      if (!nextStation) {
        return;
      }

      const nextNodeId = createRailwayNodeId(
        line.id,
        nextStation.id,
      );

      addEdge({
        from: nodeId,
        to: nextNodeId,
        type: "ride",
        lineId: line.id,
      });

      addEdge({
        from: nextNodeId,
        to: nodeId,
        type: "ride",
        lineId: line.id,
      });
    });
  });

  /*
   * =====================================================
   * 2. 환승(transfer) edge 생성
   * =====================================================
   */

  Object.values(railwayRegistry).forEach((line) => {
    line.stations.forEach((station) => {
      const fromNodeId = createRailwayNodeId(
        line.id,
        station.id,
      );

      const transfers =
        resolveStationTransfers(station);

      transfers.forEach((transfer) => {
        const targetLine =
          railwayRegistry[transfer.id];

        if (!targetLine) {
          return;
        }

        /*
         * 먼저 동일한 물리역인지 역명 정규화 후 비교한다.
         *
         * 예:
         * 市ケ谷 ↔ 市ヶ谷
         * 空港第２ビル ↔ 空港第2ビル
         */

        let targetStation =
          targetLine.stations.find(
            (candidate) =>
              isSameStationName(
                station.nameKo,
                station.nameJa,
                candidate.nameKo,
                candidate.nameJa,
              ),
          );

        /*
         * 이름이 다른 공식 환승역은
         * 명시적인 override를 사용한다.
         *
         * 예:
         * 히가시니혼바시 A15
         * ↔
         * 바쿠로요코야마 S09
         */

        if (!targetStation) {
          const override =
            transferStationOverrides[
              fromNodeId
            ]?.find(
              (item) =>
                item.targetLineId ===
                targetLine.id,
            );

          if (override) {
            targetStation =
              targetLine.stations.find(
                (candidate) =>
                  candidate.id ===
                  override.targetStationId,
              );
          }
        }

        if (!targetStation) {
          return;
        }

        const toNodeId = createRailwayNodeId(
          targetLine.id,
          targetStation.id,
        );

        addEdge({
          from: fromNodeId,
          to: toNodeId,
          type: "transfer",
        });
      });
    });
  });


  /*
   * =====================================================
   * 3. 이름이 다른 공식 환승 복합역 연결
   * =====================================================
   */

  transferComplexes.forEach((complex) => {
    complex.nodes.forEach((fromNodeId) => {
      if (!nodes.has(fromNodeId)) {
        return;
      }

      complex.nodes.forEach((toNodeId) => {
        if (
          fromNodeId === toNodeId ||
          !nodes.has(toNodeId)
        ) {
          return;
        }

        addEdge({
          from: fromNodeId,
          to: toNodeId,
          type: "transfer",
        });
      });
    });
  });


  return {
    nodes,
    edges,
  };
};