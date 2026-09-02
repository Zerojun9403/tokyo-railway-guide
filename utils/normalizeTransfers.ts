import { railwayRegistry } from "../data/railwayRegistry";
import type { TransferLine } from "../types/station";

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