import type { Station } from "../types/station";
import type { Train } from "../types/train";

import {
  YAMANOTE_COLOR,
  yamanoteStations,
  yamanoteTrains,
} from "./lines/yamanote";

import {
  CHUO_RAPID_COLOR,
  chuoRapidStations,
  chuoRapidTrains,
} from "./lines/chuo-rapid";

import {
  CHUO_SOBU_LOCAL_COLOR,
  chuoSobuLocalStations,
  chuoSobuLocalTrains,
} from "./lines/chuo-sobu-local";

import {
  KEIHIN_TOHOKU_COLOR,
  keihinTohokuStations,
  keihinTohokuTrains,
} from "./lines/keihin-tohoku";

import { GINZA_COLOR, ginzaStations, ginzaTrains } from "./lines/ginza";
import {
  MARUNOUCHI_COLOR,
  marunouchiStations,
  marunouchiTrains,
} from "./lines/marunouchi";

import { HIBIYA_COLOR, hibiyaStations, hibiyaTrains } from "./lines/hibiya";
import {
  CHIYODA_COLOR,
  chiyodaStations,
  chiyodaTrains,
} from "./lines/chiyoda";

import {
  TOZAI_COLOR,
  tozaiStations,
  tozaiTrains,
} from "./lines/tozai";


import {
  YURAKUCHO_COLOR,
  yurakuchoStations,
  yurakuchoTrains,
} from "./lines/yurakucho";

import {
  HANZOMON_COLOR,
  hanzomonStations,
  hanzomonTrains,
} from "./lines/hanzomon";


import {
  NAMBOKU_COLOR,
  nambokuStations,
  nambokuTrains,
} from "./lines/namboku";

import {
  KEISEI_COLOR,
  keiseiMainStations,
  keiseiMainTrains,
} from "./lines/keisei-main";

import { OEDO_COLOR, oedoStations, oedoTrains } from "./lines/oedo";

import {
  ASAKUSA_COLOR,
  asakusaStations,
  asakusaTrains,
} from "./lines/asakusa";

import {
  MITA_COLOR,
  mitaStations,
  mitaTrains,
} from "./lines/mita";

import {
  SHINJUKU_COLOR,
  shinjukuStations,
  shinjukuTrains,
} from "./lines/shinjuku";

/*
 * =========================================================
 * 노선 Registry 타입
 * =========================================================
 */

export type RailwayLineRegistryItem = {
  id: string;

  operatorId: string;

  nameKo: string;
  nameJa: string;

  lineCode: string;

  color: string;

  stations: Station[];

  trains: Record<string, Train[]>;
};

/*
 * =========================================================
 * 역 검색 결과 타입
 * =========================================================
 */

export type StationSearchResult = {
  station: Station;

  lineId: string;

  lineNameKo: string;
  lineNameJa: string;

  lineCode: string;

  operatorId: string;

  color: string;
};

/*
 * =========================================================
 * Railway Registry
 * =========================================================
 */

export const railwayRegistry: Record<string, RailwayLineRegistryItem> = {
  /*
   * =======================================================
   * JR 동일본 - 야마노테선
   * =======================================================
   */

  yamanote: {
    id: "yamanote",

    operatorId: "jr-east",

    nameKo: "야마노테선",
    nameJa: "山手線",

    lineCode: "JY",

    color: YAMANOTE_COLOR,

    stations: yamanoteStations,

    trains: yamanoteTrains,
  },

  /*
   * =======================================================
   * JR 동일본 - 주오선 쾌속
   * =======================================================
   */

  "chuo-rapid": {
    id: "chuo-rapid",

    operatorId: "jr-east",

    nameKo: "주오선 쾌속",
    nameJa: "中央線快速",

    lineCode: "JC",

    color: CHUO_RAPID_COLOR,

    stations: chuoRapidStations,

    trains: chuoRapidTrains,
  },

  /*
   * =======================================================
   * JR 동일본 - 주오·소부선 각역정차
   * =======================================================
   */

  "chuo-sobu-local": {
    id: "chuo-sobu-local",

    operatorId: "jr-east",

    nameKo: "주오·소부선 각역정차",
    nameJa: "中央・総武線各駅停車",

    lineCode: "JB",

    color: CHUO_SOBU_LOCAL_COLOR,

    stations: chuoSobuLocalStations,

    trains: chuoSobuLocalTrains,
  },

  /*
   * =======================================================
   * JR 동일본 - 게이힌도호쿠·네기시선
   * =======================================================
   */

  "keihin-tohoku": {
    id: "keihin-tohoku",

    operatorId: "jr-east",

    nameKo: "게이힌도호쿠·네기시선",
    nameJa: "京浜東北・根岸線",

    lineCode: "JK",

    color: KEIHIN_TOHOKU_COLOR,

    stations: keihinTohokuStations,

    trains: keihinTohokuTrains,
  },

  /*
   * =======================================================
   * 도쿄메트로 
   * =======================================================
   */

  ginza: {
    id: "ginza",

    operatorId: "tokyo-metro",

    nameKo: "긴자선",
    nameJa: "銀座線",

    lineCode: "G",

    color: GINZA_COLOR,

    stations: ginzaStations,

    trains: ginzaTrains,
  },
  
  marunouchi: {
    id: "marunouchi",

    operatorId: "tokyo-metro",

    nameKo: "마루노우치선",
    nameJa: "丸ノ内線",

    lineCode: "M",

    color: MARUNOUCHI_COLOR,

    stations: marunouchiStations,

    trains: marunouchiTrains,
  },

  hibiya: {
    id: "hibiya",
    operatorId: "tokyo-metro",
    nameKo: "히비야선",
    nameJa: "日比谷線",
    lineCode: "H",
    color: HIBIYA_COLOR,
    stations: hibiyaStations,
    trains: hibiyaTrains,
  },

tozai: {
  id: "tozai",

  operatorId: "tokyo-metro",

  nameKo: "도자이선",

  nameJa: "東西線",

  lineCode: "T",

  color: TOZAI_COLOR,

  stations: tozaiStations,

  trains: tozaiTrains,
},

chiyoda: {
  id: "chiyoda",

  operatorId: "tokyo-metro",

  nameKo: "치요다선",

  nameJa: "千代田線",

  lineCode: "C",

  color: CHIYODA_COLOR,

  stations: chiyodaStations,

  trains: chiyodaTrains,
},

yurakucho: {
  id: "yurakucho",

  operatorId: "tokyo-metro",

  nameKo: "유라쿠초선",

  nameJa: "有楽町線",

  lineCode: "Y",

  color: YURAKUCHO_COLOR,

  stations: yurakuchoStations,

  trains: yurakuchoTrains,
},

hanzomon: {
  id: "hanzomon",

  operatorId: "tokyo-metro",

  nameKo: "한조몬선",

  nameJa: "半蔵門線",

  lineCode: "Z",

  color: HANZOMON_COLOR,

  stations: hanzomonStations,

  trains: hanzomonTrains,
},

namboku: {
  id: "namboku",

  operatorId: "tokyo-metro",

  nameKo: "난보쿠선",

  nameJa: "南北線",

  lineCode: "N",

  color: NAMBOKU_COLOR,

  stations: nambokuStations,

  trains: nambokuTrains,
},
  /*
   * =======================================================
   * 게이세이 전철 - 게이세이 본선
   * =======================================================
   */

  "keisei-main": {
    id: "keisei-main",

    operatorId: "keisei",

    nameKo: "게이세이 본선",
    nameJa: "京成本線",

    lineCode: "KS",

    color: KEISEI_COLOR,

    stations: keiseiMainStations,

    trains: keiseiMainTrains,
  },

  /*
   * =======================================================
   * 도에이 지하철 - 오에도선
   * =======================================================
   */
  asakusa: {
    id: "asakusa",

    operatorId: "toei",

    nameKo: "도에이 아사쿠사선",

    nameJa: "都営浅草線",

    lineCode: "A",

    color: ASAKUSA_COLOR,

    stations: asakusaStations,

    trains: asakusaTrains,
  },

/*
 * =======================================================
 * 도에이 지하철 - 미타선
 * =======================================================
 */

mita: {
  id: "mita",

  operatorId: "toei",

  nameKo: "도에이 미타선",

  nameJa: "都営三田線",

  lineCode: "I",

  color: MITA_COLOR,

  stations: mitaStations,

  trains: mitaTrains,
},


/*
 * =======================================================
 * 도에이 지하철 - 신주쿠선
 * =======================================================
 */

shinjuku: {
  id: "shinjuku",

  operatorId: "toei",

  nameKo: "도에이 신주쿠선",

  nameJa: "都営新宿線",

  lineCode: "S",

  color: SHINJUKU_COLOR,

  stations: shinjukuStations,

  trains: shinjukuTrains,
},




  oedo: {
    id: "oedo",

    operatorId: "toei",

    nameKo: "오에도선",
    nameJa: "大江戸線",

    lineCode: "E",

    color: OEDO_COLOR,

    stations: oedoStations,

    trains: oedoTrains,
  },
};

/*
 * =========================================================
 * 모든 역
 * =========================================================
 *
 * Registry에 등록된 모든 노선의 역을
 * 하나의 배열로 합친다.
 *
 * 따라서 새로운 노선을 Registry에 등록하면
 * 검색 기능에도 자동으로 포함된다.
 * =========================================================
 */

const allStations: Station[] = Object.values(railwayRegistry).flatMap(
  (line) => line.stations,
);

/*
 * =========================================================
 * 모든 역 반환
 * =========================================================
 */

export const getAllStations = (): Station[] => {
  return allStations;
};

/*
 * =========================================================
 * stationId로 역 찾기
 * =========================================================
 *
 * 예:
 *
 * getStation("JY17")
 * getStation("JC05")
 * getStation("JB10")
 * getStation("JK26")
 * getStation("G01")
 * getStation("KS01")
 * getStation("E28")
 * =========================================================
 */

export const getStation = (stationId: string): Station | undefined => {
  return allStations.find((station) => station.id === stationId);
};

/*
 * =========================================================
 * lineId로 노선 찾기
 * =========================================================
 */

export const getLine = (
  lineId: string,
): RailwayLineRegistryItem | undefined => {
  return railwayRegistry[lineId];
};

/*
 * =========================================================
 * 특정 노선의 역 목록
 * =========================================================
 */

export const getStationsByLine = (lineId: string): Station[] => {
  return railwayRegistry[lineId]?.stations ?? [];
};

/*
 * =========================================================
 * 노선 + 방향으로 열차 찾기
 * =========================================================
 *
 * 실제 API가 연결된 노선에서는
 * Hook 데이터가 우선이다.
 *
 * Registry trains는 fallback 용도.
 * =========================================================
 */

export const getTrains = (lineId: string, directionId: string): Train[] => {
  const line = railwayRegistry[lineId];

  if (!line) {
    return [];
  }

  return line.trains[directionId] ?? [];
};

/*
 * =========================================================
 * 검색어 정규화
 * =========================================================
 */

const normalizeSearchText = (value: string) => {
  return value.trim().toLowerCase().replace(/\s+/g, "");
};

/*
 * =========================================================
 * 역 검색
 * =========================================================
 *
 * 지원:
 *
 * 한국어
 * 일본어
 * 역번호
 * 노선명
 *
 * 예:
 *
 * 신주쿠
 * 新宿
 *
 * JY17
 * JC05
 * JB10
 * JK26
 *
 * G01
 * 긴자
 * 銀座
 * 긴자선
 * =========================================================
 */

export const searchStations = (query: string): StationSearchResult[] => {
  const normalizedQuery = normalizeSearchText(query);

  /*
   * 검색어가 없으면 결과 없음
   */

  if (!normalizedQuery) {
    return [];
  }

  const results: StationSearchResult[] = [];

  /*
   * =======================================================
   * Registry 전체 노선 검색
   * =======================================================
   */

  Object.values(railwayRegistry).forEach((line) => {
    line.stations.forEach((station) => {
      /*
       * 검색 가능한 문자열
       */

      const stationCode = normalizeSearchText(station.code);

      const stationId = normalizeSearchText(station.id);

      const stationNameKo = normalizeSearchText(station.nameKo);

      const stationNameJa = normalizeSearchText(station.nameJa);

      const lineNameKo = normalizeSearchText(line.nameKo);

      const lineNameJa = normalizeSearchText(line.nameJa);

      const lineCode = normalizeSearchText(line.lineCode);

      /*
       * 검색어 포함 여부
       */

      const matched =
        stationCode.includes(normalizedQuery) ||
        stationId.includes(normalizedQuery) ||
        stationNameKo.includes(normalizedQuery) ||
        stationNameJa.includes(normalizedQuery) ||
        lineNameKo.includes(normalizedQuery) ||
        lineNameJa.includes(normalizedQuery) ||
        lineCode.includes(normalizedQuery);

      if (!matched) {
        return;
      }

      results.push({
        station,

        lineId: line.id,

        lineNameKo: line.nameKo,

        lineNameJa: line.nameJa,

        lineCode: line.lineCode,

        operatorId: line.operatorId,

        color: line.color,
      });
    });
  });

  /*
   * =======================================================
   * 검색 결과 정렬
   * =======================================================
   *
   * 우선순위
   *
   * 1. 역번호 정확 일치
   * 2. 한국어 역명 정확 일치
   * 3. 일본어 역명 정확 일치
   * 4. 역번호순
   * =========================================================
   */

  return results.sort((a, b) => {
    const aCode = normalizeSearchText(a.station.code);

    const bCode = normalizeSearchText(b.station.code);

    const aKo = normalizeSearchText(a.station.nameKo);

    const bKo = normalizeSearchText(b.station.nameKo);

    const aJa = normalizeSearchText(a.station.nameJa);

    const bJa = normalizeSearchText(b.station.nameJa);

    /*
     * 역번호 정확 일치
     */

    const aCodeExact = aCode === normalizedQuery;

    const bCodeExact = bCode === normalizedQuery;

    if (aCodeExact && !bCodeExact) {
      return -1;
    }

    if (!aCodeExact && bCodeExact) {
      return 1;
    }

    /*
     * 한국어 역명 정확 일치
     */

    const aKoExact = aKo === normalizedQuery;

    const bKoExact = bKo === normalizedQuery;

    if (aKoExact && !bKoExact) {
      return -1;
    }

    if (!aKoExact && bKoExact) {
      return 1;
    }

    /*
     * 일본어 역명 정확 일치
     */

    const aJaExact = aJa === normalizedQuery;

    const bJaExact = bJa === normalizedQuery;

    if (aJaExact && !bJaExact) {
      return -1;
    }

    if (!aJaExact && bJaExact) {
      return 1;
    }

    /*
     * 마지막은 역번호순
     */

    return a.station.code.localeCompare(b.station.code);
  });
};
