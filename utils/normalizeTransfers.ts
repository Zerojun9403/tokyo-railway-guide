import { railwayRegistry } from "../data/railwayRegistry";
import type {
  Station,
  TransferLine,
} from "../types/station";

/*
 * =========================================================
 * Transfer Metadata Normalization
 * =========================================================
 *
 * Registry에서 관리하는 노선은 Registry의 메타데이터를
 * 최종 기준으로 사용한다.
 *
 * Registry에 없는 외부 노선은 기존 transfer 데이터를
 * 그대로 유지한다.
 * =========================================================
 */

export const normalizeTransfers = (
  transfers: TransferLine[] = [],
): TransferLine[] => {
  return transfers.map((transfer) => {
    const registryLine = railwayRegistry[transfer.id];

    if (!registryLine) {
      return transfer;
    }

    return {
      ...transfer,
      code: registryLine.lineCode,
      nameKo: registryLine.nameKo,
      nameJa: registryLine.nameJa,
      color: registryLine.color,
    };
  });
};

/*
 * =========================================================
 * Station Identity
 * =========================================================
 *
 * 현재 Station 타입에는 물리적인 동일역을 나타내는
 * 별도의 stationGroupId가 없다.
 *
 * Audit 결과를 바탕으로 현재는
 *
 *   nameKo + nameJa
 *
 * 가 모두 같은 Station을 동일역 그룹으로 취급한다.
 * =========================================================
 */

const getStationKey = (station: Station): string => {
  return `${station.nameKo.trim()}::${station.nameJa.trim()}`;
};

/*
 * =========================================================
 * Registry Station Index
 * =========================================================
 *
 * 매번 모든 Registry를 순회하지 않도록
 * 모듈 로딩 시 동일역 그룹 인덱스를 한 번 생성한다.
 * =========================================================
 */

type StationRegistryEntry = {
  station: Station;
  lineId: string;
};

const stationGroupIndex = new Map<
  string,
  StationRegistryEntry[]
>();

Object.values(railwayRegistry).forEach((line) => {
  line.stations.forEach((station) => {
    const key = getStationKey(station);

    const entry: StationRegistryEntry = {
      station,
      lineId: line.id,
    };

    const existing = stationGroupIndex.get(key);

    if (existing) {
      existing.push(entry);
      return;
    }

    stationGroupIndex.set(key, [entry]);
  });
});

/*
 * =========================================================
 * Registry Line -> TransferLine
 * =========================================================
 */

const createTransferFromRegistry = (
  lineId: string,
): TransferLine | null => {
  const registryLine = railwayRegistry[lineId];

  if (!registryLine) {
    return null;
  }

  return {
    id: registryLine.id,
    code: registryLine.lineCode,
    nameKo: registryLine.nameKo,
    nameJa: registryLine.nameJa,
    color: registryLine.color,
  };
};

/*
 * =========================================================
 * Resolve Station Transfers
 * =========================================================
 *
 * 같은 물리적 역으로 판단되는 모든 Station을 찾아서:
 *
 * 1. 동일역을 구성하는 모든 Registry 노선
 * 2. 각 Station에 직접 기록된 transfers
 *
 * 를 하나의 환승 후보 집합으로 합친다.
 *
 * 이후:
 *
 * - 현재 보고 있는 노선은 제외
 * - 동일 transfer ID는 하나만 유지
 * - Registry 노선은 Registry metadata로 정규화
 * - Registry 밖 외부 노선은 기존 metadata 유지
 *
 * 결과적으로 같은 역을 어느 노선에서 열더라도
 * 동일한 환승 네트워크를 기반으로 안내할 수 있다.
 * =========================================================
 */

export const resolveStationTransfers = (
  station: Station,
): TransferLine[] => {
  const key = getStationKey(station);

  const stationGroup =
    stationGroupIndex.get(key) ?? [];

  /*
   * 단일 노선 역이라도 기존 normalizeTransfers 동작은
   * 그대로 유지한다.
   */

  if (stationGroup.length <= 1) {
    return normalizeTransfers(station.transfers);
  }

  const transferMap = new Map<
    string,
    TransferLine
  >();

  /*
   * -------------------------------------------------------
   * 1. 동일역 그룹을 구성하는 노선 추가
   * -------------------------------------------------------
   */

  stationGroup.forEach((entry) => {
    if (entry.lineId === station.lineId) {
      return;
    }

    const transfer =
      createTransferFromRegistry(entry.lineId);

    if (!transfer) {
      return;
    }

    transferMap.set(transfer.id, transfer);
  });

  /*
   * -------------------------------------------------------
   * 2. 동일역 그룹의 기존 transfer 정보 전체 병합
   * -------------------------------------------------------
   *
   * Registry에 없는 외부 노선 정보도 여기에서 보존된다.
   */

  stationGroup.forEach((entry) => {
    const transfers =
      entry.station.transfers ?? [];

    transfers.forEach((transfer) => {
      /*
       * 현재 보고 있는 노선 자신은 환승 목록에서 제외.
       */

      if (transfer.id === station.lineId) {
        return;
      }

      /*
       * Registry에 존재하는 노선은 Registry metadata를
       * 우선 사용한다.
       */

      const registryTransfer =
        createTransferFromRegistry(transfer.id);

      if (registryTransfer) {
        transferMap.set(
          registryTransfer.id,
          registryTransfer,
        );

        return;
      }

      /*
       * Registry 밖 외부 노선은 기존 metadata 보존.
       *
       * 동일 ID가 여러 Station에 존재하면 첫 번째 값을
       * 유지한다.
       */

      if (!transferMap.has(transfer.id)) {
        transferMap.set(
          transfer.id,
          transfer,
        );
      }
    });
  });

  /*
   * -------------------------------------------------------
   * 3. 최종 정규화
   * -------------------------------------------------------
   */

  return normalizeTransfers(
    [...transferMap.values()],
  );
};