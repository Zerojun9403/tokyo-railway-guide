import type { Station } from "../../types/station";
import type { Train } from "../../types/train";

export const YOKOSUKA_SOBU_COLOR = "#0067C0";

const createNextStation = (station: Station) => ({
  id: station.id,
  code: station.code,
  nameKo: station.nameKo,
  nameJa: station.nameJa,
  lineId: station.lineId,
  lineCode: station.lineCode,
  lineNameKo: station.lineNameKo,
  color: station.color,
});

const createStation = (
  id: string,
  nameKo: string,
  nameJa: string,
  type: "terminal" | "normal" = "normal",
): Station => ({
  id,
  code: id,
  nameKo,
  nameJa,
  operatorId: "jr-east",
  lineId: "yokosuka-sobu",
  lineCode: "JO",
  lineNameKo: "요코스카선·소부쾌속선",
  lineNameJa: "横須賀線・総武快速線",
  color: YOKOSUKA_SOBU_COLOR,
  type,
  directions: [],
  transfers: [],
});

const stations = [
  createStation("JO01", "구리하마", "久里浜", "terminal"),
  createStation("JO02", "기누가사", "衣笠"),
  createStation("JO03", "요코스카", "横須賀"),
  createStation("JO04", "다우라", "田浦"),
  createStation("JO05", "히가시즈시", "東逗子"),
  createStation("JO06", "즈시", "逗子"),
  createStation("JO07", "가마쿠라", "鎌倉"),
  createStation("JO08", "기타카마쿠라", "北鎌倉"),
  createStation("JO09", "오후나", "大船"),
  createStation("JO10", "도쓰카", "戸塚"),
  createStation("JO11", "히가시토쓰카", "東戸塚"),
  createStation("JO12", "호도가야", "保土ケ谷"),
  createStation("JO13", "요코하마", "横浜"),
  createStation("JO14", "신카와사키", "新川崎"),
  createStation("JO15", "무사시코스기", "武蔵小杉"),
  createStation("JO16", "니시오이", "西大井"),
  createStation("JO17", "시나가와", "品川"),
  createStation("JO18", "신바시", "新橋"),
  createStation("JO19", "도쿄", "東京"),
  createStation("JO20", "신니혼바시", "新日本橋"),
  createStation("JO21", "바쿠로초", "馬喰町"),
  createStation("JO22", "긴시초", "錦糸町"),
  createStation("JO23", "신코이와", "新小岩"),
  createStation("JO24", "이치카와", "市川"),
  createStation("JO25", "후나바시", "船橋"),
  createStation("JO26", "쓰다누마", "津田沼"),
  createStation("JO27", "이나게", "稲毛"),
  createStation("JO28", "지바", "千葉", "terminal"),
];

export const yokosukaSobuStations: Station[] = stations.map(
  (station, index) => {
    const previousStation = stations[index - 1];
    const nextStation = stations[index + 1];

    if (station.id === "JO01") {
      return {
        ...station,
        directions: [
          {
            id: "Northbound",
            label: "도쿄 · 긴시초 · 지바 방면",
            description: "도쿄 · 긴시초 · 지바 방면",
            nextStations: nextStation
              ? [createNextStation(nextStation)]
              : [],
          },
        ],
      };
    }

    if (station.id === "JO28") {
      return {
        ...station,
        directions: [
          {
            id: "Southbound",
            label: "도쿄 · 요코하마 · 구리하마 방면",
            description: "도쿄 · 요코하마 · 구리하마 방면",
            nextStations: previousStation
              ? [createNextStation(previousStation)]
              : [],
          },
        ],
      };
    }

    return {
      ...station,
      directions: [
        {
          id: "Northbound",
          label: "도쿄 · 긴시초 · 지바 방면",
          description: "도쿄 · 긴시초 · 지바 방면",
          nextStations: nextStation
            ? [createNextStation(nextStation)]
            : [],
        },
        {
          id: "Southbound",
          label: "도쿄 · 요코하마 · 구리하마 방면",
          description: "도쿄 · 요코하마 · 구리하마 방면",
          nextStations: previousStation
            ? [createNextStation(previousStation)]
            : [],
        },
      ],
    };
  },
);

export const yokosukaSobuTrains: Record<string, Train[]> = {};