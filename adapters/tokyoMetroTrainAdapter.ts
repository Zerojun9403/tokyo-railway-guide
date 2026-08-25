import type { Train } from "../types/train";

import type { TokyoMetroUpcomingTrain } from "../services/tokyoMetro";

/*
 * =========================================================
 * Tokyo Railway Guide
 * Tokyo Metro Train Adapter
 * =========================================================
 *
 * Tokyo Metro API
 *        ↓
 * TokyoMetroUpcomingTrain[]
 *        ↓
 * 공통 Train[]
 *        ↓
 * TrainCard
 *
 * =========================================================
 */

/*
 * =========================================================
 * 역 이름 타입
 * =========================================================
 */

type DestinationName = {
  ko: string;
  ja: string;
};

/*
 * =========================================================
 * Tokyo Metro 역 이름
 * =========================================================
 *
 * key는 전부 소문자 + 특수문자 제거 형태로 관리한다.
 *
 * 예:
 *
 * Ikebukuro
 * ikebukuro
 * TokyoMetro.Marunouchi.Ikebukuro
 *
 * 모두 최종적으로:
 *
 * ikebukuro
 *
 * 로 변환된다.
 * =========================================================
 */

const TOKYO_METRO_DESTINATIONS: Record<string, DestinationName> = {
  /*
   * =======================================================
   * 긴자선
   * =======================================================
   */

  shibuya: {
    ko: "시부야",
    ja: "渋谷",
  },

  omotesando: {
    ko: "오모테산도",
    ja: "表参道",
  },

  gaiemmae: {
    ko: "가이엔마에",
    ja: "外苑前",
  },

  aoyamaitchome: {
    ko: "아오야마잇초메",
    ja: "青山一丁目",
  },

  akasakamitsuke: {
    ko: "아카사카미쓰케",
    ja: "赤坂見附",
  },

  tameikesanno: {
    ko: "다메이케산노",
    ja: "溜池山王",
  },

  toranomon: {
    ko: "도라노몬",
    ja: "虎ノ門",
  },

  shimbashi: {
    ko: "신바시",
    ja: "新橋",
  },

  ginza: {
    ko: "긴자",
    ja: "銀座",
  },

  kyobashi: {
    ko: "교바시",
    ja: "京橋",
  },

  nihombashi: {
    ko: "니혼바시",
    ja: "日本橋",
  },

  mitsukoshimae: {
    ko: "미쓰코시마에",
    ja: "三越前",
  },

  kanda: {
    ko: "간다",
    ja: "神田",
  },

  suehirocho: {
    ko: "스에히로초",
    ja: "末広町",
  },

  uenohirokoji: {
    ko: "우에노히로코지",
    ja: "上野広小路",
  },

  ueno: {
    ko: "우에노",
    ja: "上野",
  },

  inaricho: {
    ko: "이나리초",
    ja: "稲荷町",
  },

  tawaramachi: {
    ko: "다와라마치",
    ja: "田原町",
  },

  asakusa: {
    ko: "아사쿠사",
    ja: "浅草",
  },

  /*
   * =======================================================
   * 마루노우치선 본선
   * =======================================================
   */

  ogikubo: {
    ko: "오기쿠보",
    ja: "荻窪",
  },

  minamiasagaya: {
    ko: "미나미아사가야",
    ja: "南阿佐ケ谷",
  },

  shinkoenji: {
    ko: "신코엔지",
    ja: "新高円寺",
  },

  higashikoenji: {
    ko: "히가시코엔지",
    ja: "東高円寺",
  },

  shinnakano: {
    ko: "신나카노",
    ja: "新中野",
  },

  nakanosakaue: {
    ko: "나카노사카우에",
    ja: "中野坂上",
  },

  nishishinjuku: {
    ko: "니시신주쿠",
    ja: "西新宿",
  },

  shinjuku: {
    ko: "신주쿠",
    ja: "新宿",
  },

  shinjukusanchome: {
    ko: "신주쿠산초메",
    ja: "新宿三丁目",
  },

  shinjukugyoemmae: {
    ko: "신주쿠교엔마에",
    ja: "新宿御苑前",
  },

  yotsuyasanchome: {
    ko: "요쓰야산초메",
    ja: "四谷三丁目",
  },

  yotsuya: {
    ko: "요쓰야",
    ja: "四ツ谷",
  },

  kokkaigijidomae: {
    ko: "국회의사당앞",
    ja: "国会議事堂前",
  },

  kasumigaseki: {
    ko: "가스미가세키",
    ja: "霞ケ関",
  },

  tokyo: {
    ko: "도쿄",
    ja: "東京",
  },

  otemachi: {
    ko: "오테마치",
    ja: "大手町",
  },

  awajicho: {
    ko: "아와지초",
    ja: "淡路町",
  },

  ochanomizu: {
    ko: "오차노미즈",
    ja: "御茶ノ水",
  },

  hongosanchome: {
    ko: "혼고산초메",
    ja: "本郷三丁目",
  },

  korakuen: {
    ko: "고라쿠엔",
    ja: "後楽園",
  },

  myogadani: {
    ko: "묘가다니",
    ja: "茗荷谷",
  },

  shinotsuka: {
    ko: "신오쓰카",
    ja: "新大塚",
  },

  ikebukuro: {
    ko: "이케부쿠로",
    ja: "池袋",
  },

  /*
   * =======================================================
   * 마루노우치선 호난초 지선
   * =======================================================
   */

  honancho: {
    ko: "호난초",
    ja: "方南町",
  },

  nakanofujimicho: {
    ko: "나카노후지미초",
    ja: "中野富士見町",
  },

  nakanoshimbashi: {
    ko: "나카노신바시",
    ja: "中野新橋",
  },
  /*
   * =======================================================
   * 히비야선
   * =======================================================
   */

  nakameguro: {
    ko: "나카메구로",
    ja: "中目黒",
  },

  ebisu: {
    ko: "에비스",
    ja: "恵比寿",
  },

  hiroo: {
    ko: "히로오",
    ja: "広尾",
  },

  roppongi: {
    ko: "롯폰기",
    ja: "六本木",
  },

  kamiyacho: {
    ko: "가미야초",
    ja: "神谷町",
  },

  toranomonhills: {
    ko: "도라노몬힐즈",
    ja: "虎ノ門ヒルズ",
  },

  /*
   * kasumigaseki
   * ginza
   * ueno
   *
   * 위에서 이미 등록되어 있으므로 중복 등록하지 않는다.
   */

  hibiya: {
    ko: "히비야",
    ja: "日比谷",
  },

  higashiginza: {
    ko: "히가시긴자",
    ja: "東銀座",
  },

  tsukiji: {
    ko: "쓰키지",
    ja: "築地",
  },

  hatchobori: {
    ko: "핫초보리",
    ja: "八丁堀",
  },

  kayabacho: {
    ko: "가야바초",
    ja: "茅場町",
  },

  ningyocho: {
    ko: "닌교초",
    ja: "人形町",
  },

  kodemmacho: {
    ko: "고덴마초",
    ja: "小伝馬町",
  },

  akihabara: {
    ko: "아키하바라",
    ja: "秋葉原",
  },

  nakaokachimachi: {
    ko: "나카오카치마치",
    ja: "仲御徒町",
  },

  iriya: {
    ko: "이리야",
    ja: "入谷",
  },

  minowa: {
    ko: "미노와",
    ja: "三ノ輪",
  },

  minamisenju: {
    ko: "미나미센주",
    ja: "南千住",
  },

  kitasenju: {
    ko: "기타센주",
    ja: "北千住",
  },

  /*
   * =======================================================
   * 히비야선 ↔ 도부 스카이트리라인 직통 행선지
   * =======================================================
   */

  takenotsuka: {
    ko: "다케노쓰카",
    ja: "竹ノ塚",
  },

  kitakoshigaya: {
    ko: "기타코시가야",
    ja: "北越谷",
  },

  kitakasukabe: {
    ko: "기타카스카베",
    ja: "北春日部",
  },

  tobutsudobutsukoen: {
    ko: "도부도부쓰코엔",
    ja: "東武動物公園",
  },

  minamikurihashi: {
    ko: "미나미쿠리하시",
    ja: "南栗橋",
  },

 /*
   * =======================================================
   * 도자이선
   * =======================================================
   */

  nakano: {
    ko: "나카노",
    ja: "中野",
  },

  ochiai: {
    ko: "오치아이",
    ja: "落合",
  },

  takadanobaba: {
    ko: "다카다노바바",
    ja: "高田馬場",
  },

  waseda: {
    ko: "와세다",
    ja: "早稲田",
  },

  kagurazaka: {
    ko: "가구라자카",
    ja: "神楽坂",
  },

  iidabashi: {
    ko: "이다바시",
    ja: "飯田橋",
  },

  kudanshita: {
    ko: "구단시타",
    ja: "九段下",
  },

  takebashi: {
    ko: "다케바시",
    ja: "竹橋",
  },

  /*
   * otemachi
   * nihombashi
   * kayabacho
   *
   * 기존 도쿄메트로 매핑에 이미 존재하므로
   * 중복 등록하지 않는다.
   */

  monzennakacho: {
    ko: "몬젠나카초",
    ja: "門前仲町",
  },

  kiba: {
    ko: "기바",
    ja: "木場",
  },

  toyocho: {
    ko: "도요초",
    ja: "東陽町",
  },

  minamisunamachi: {
    ko: "미나미스나마치",
    ja: "南砂町",
  },

  nishikasai: {
    ko: "니시카사이",
    ja: "西葛西",
  },

  kasai: {
    ko: "카사이",
    ja: "葛西",
  },

  urayasu: {
    ko: "우라야스",
    ja: "浦安",
  },

  minamigyotoku: {
    ko: "미나미교토쿠",
    ja: "南行徳",
  },

  gyotoku: {
    ko: "교토쿠",
    ja: "行徳",
  },

  myoden: {
    ko: "묘덴",
    ja: "妙典",
  },

  barakinakayama: {
    ko: "바라키나카야마",
    ja: "原木中山",
  },

  nishifunabashi: {
    ko: "니시후나바시",
    ja: "西船橋",
  },

  /*
   * =======================================================
   * 도자이선 ↔ JR 주오·소부선 직통
   * =======================================================
   */

  mitaka: {
    ko: "미타카",
    ja: "三鷹",
  },

  /*
   * =======================================================
   * 도자이선 ↔ 도요고속선 직통
   * =======================================================
   */

  toyokatsutadai: {
    ko: "도요카쓰타다이",
    ja: "東葉勝田台",
  },

/*
 * =========================================================
 * 치요다선 행선지
 * =========================================================
 *
 * 치요다선은
 *
 * 오다큐선
 *    ↕
 * 요요기우에하라
 *    ↕
 * 치요다선
 *    ↕
 * 아야세
 *    ↕
 * JR 조반선 각역정차
 *
 * 형태로 직통 운전을 하기 때문에
 * 치요다선 밖의 행선지도 표시될 수 있다.
 * =========================================================
 */

/*
 * 치요다선 내
 */

yoyogiuehara: {
  ko: "요요기우에하라",
  ja: "代々木上原",
},

ayase: {
  ko: "아야세",
  ja: "綾瀬",
},

kitaayase: {
  ko: "기타아야세",
  ja: "北綾瀬",
},

/*
 * =========================================================
 * JR 조반선 각역정차 직통
 * =========================================================
 */

matsudo: {
  ko: "마쓰도",
  ja: "松戸",
},

kashiwa: {
  ko: "가시와",
  ja: "柏",
},

abiko: {
  ko: "아비코",
  ja: "我孫子",
},

toride: {
  ko: "도리데",
  ja: "取手",
},

/*
 * =========================================================
 * 오다큐선 직통
 * =========================================================
 */

seijogakuenmae: {
  ko: "세이조가쿠엔마에",
  ja: "成城学園前",
},

mukogaokayuen: {
  ko: "무코가오카유엔",
  ja: "向ヶ丘遊園",
},

shinYurigaoka: {
  ko: "신유리가오카",
  ja: "新百合ヶ丘",
},

machida: {
  ko: "마치다",
  ja: "町田",
},

sagamiono: {
  ko: "사가미오노",
  ja: "相模大野",
},

honatsugi: {
  ko: "혼아쓰기",
  ja: "本厚木",
},

isehara: {
  ko: "이세하라",
  ja: "伊勢原",
},

/*
 * 오다큐 다마선
 */

karakida: {
  ko: "가라키다",
  ja: "唐木田",
},

/*
 * =========================================================
 * 유라쿠초선 행선지
 * =========================================================
 */

/*
 * 유라쿠초선 내
 */

wakoshi: {
  ko: "와코시",
  ja: "和光市",
},

shinkiba: {
  ko: "신키바",
  ja: "新木場",
},

/*
 * =========================================================
 * 도부 도조선 직통
 * =========================================================
 */

shiki: {
  ko: "시키",
  ja: "志木",
},

kawagoeshi: {
  ko: "가와고에시",
  ja: "川越市",
},

shinrinkoen: {
  ko: "신린코엔",
  ja: "森林公園",
},

ogawamachi: {
  ko: "오가와마치",
  ja: "小川町",
},

/*
 * =========================================================
 * 세이부선 직통
 * =========================================================
 */

nerima: {
  ko: "네리마",
  ja: "練馬",
},

shakujiiKoen: {
  ko: "샤쿠지이코엔",
  ja: "石神井公園",
},

hoya: {
  ko: "호야",
  ja: "保谷",
},

kiyose: {
  ko: "기요세",
  ja: "清瀬",
},

kotesashi: {
  ko: "고테사시",
  ja: "小手指",
},

hannou: {
  ko: "한노",
  ja: "飯能",
},

/*
 * =========================================================
 * 한조몬선 행선지
 * =========================================================
 *
 * 도큐 덴엔토시선
 *      ↕
 *    시부야
 *      ↕
 *   한조몬선
 *      ↕
 *   오시아게
 *      ↕
 * 도부 스카이트리 라인
 *
 * =========================================================
 */

/*
 * 한조몬선 내
 */



kiyosumishirakawa: {
  ko: "기요스미시라카와",
  ja: "清澄白河",
},

oshiage: {
  ko: "오시아게",
  ja: "押上",
},

/*
 * =========================================================
 * 도큐 덴엔토시선 직통
 * =========================================================
 */

saginuma: {
  ko: "사기누마",
  ja: "鷺沼",
},

nagatsuta: {
  ko: "나가쓰타",
  ja: "長津田",
},

chuorinkan: {
  ko: "주오린칸",
  ja: "中央林間",
},

/*
 * =========================================================
 * 도부 스카이트리 라인 / 이세사키선 직통
 * =========================================================
 */

tobudobutsukoen: {
  ko: "도부도부쓰코엔",
  ja: "東武動物公園",
},

kuki: {
  ko: "구키",
  ja: "久喜",
},

/*
 * =========================================================
 * 도부 닛코선 직통
 * =========================================================
 */

};

/*
 * =========================================================
 * 열차 종별
 * =========================================================
 */

const TOKYO_METRO_TRAIN_TYPE_KO: Record<string, string> = {
  local: "보통",

  express: "급행",

  semiexpress: "준급",

  rapid: "쾌속",

  rapidexpress: "쾌속급행",

  commuterexpress: "통근급행",

  commuterrapid: "통근쾌속",

  limitedexpress: "특급",
};

/*
 * =========================================================
 * ODPT 문자열에서 마지막 값 추출
 * =========================================================
 *
 * 예:
 *
 * odpt.Station:TokyoMetro.Marunouchi.Ikebukuro
 *
 * ↓
 *
 * Ikebukuro
 * =========================================================
 */

const getShortName = (value: string): string => {
  const afterColon = value.split(":").at(-1) ?? value;

  return afterColon.split(".").at(-1) ?? afterColon;
};

/*
 * =========================================================
 * 역 ID 정규화
 * =========================================================
 *
 * 대소문자뿐 아니라
 * 공백 / 하이픈 / 점 등도 제거한다.
 *
 * Ikebukuro
 * IKEBUKURO
 * ikebukuro
 *
 * ↓
 *
 * ikebukuro
 * =========================================================
 */

const normalizeStationKey = (value: string): string => {
  return getShortName(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");
};

/*
 * =========================================================
 * 전체 문자열에서도 역 찾기
 * =========================================================
 *
 * API 형식이 예상과 조금 달라도
 * 알려진 역명이 문자열에 포함되어 있으면 잡는다.
 * =========================================================
 */

const findDestinationKey = (rawValue: string): string | undefined => {
  /*
   * 1차:
   * 마지막 ID 직접 비교
   */

  const normalized = normalizeStationKey(rawValue);

  if (TOKYO_METRO_DESTINATIONS[normalized]) {
    return normalized;
  }

  /*
   * 2차:
   * 전체 문자열 비교
   */

  const fullNormalized = rawValue
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]/g, "");

  /*
   * 긴 이름부터 먼저 검사
   *
   * 예:
   * shinjuku보다
   * shinjukusanchome을 먼저 잡기 위함
   */

  const knownKeys = Object.keys(TOKYO_METRO_DESTINATIONS).sort(
    (a, b) => b.length - a.length,
  );

  return knownKeys.find((key) => fullNormalized.includes(key));
};

/*
 * =========================================================
 * 행선지 변환
 * =========================================================
 */

const getDestination = (destinationStations: (string | null)[]) => {
  /*
   * 첫 번째 정상 행선지
   */

  const rawDestination = destinationStations.find(
    (station): station is string =>
      typeof station === "string" && station.trim().length > 0,
  );

  if (!rawDestination) {
    return {
      nameKo: undefined,

      nameJa: undefined,
    };
  }

  /*
   * ===============================================
   * 행선지 ID 검색
   * ===============================================
   */

  const destinationKey = findDestinationKey(rawDestination);

  /*
   * 매핑 성공
   */

  if (destinationKey) {
    const destination = TOKYO_METRO_DESTINATIONS[destinationKey];

    return {
      nameKo: destination.ko,

      nameJa: destination.ja,
    };
  }

  /*
   * ===============================================
   * 아직 등록하지 않은 역
   * ===============================================
   *
   * 개발 중 확인하기 위해 console에 표시
   * ===============================================
   */

  console.warn("등록되지 않은 Tokyo Metro 행선지:", rawDestination);

  const fallback = getShortName(rawDestination);

  return {
    nameKo: fallback,

    nameJa: fallback,
  };
};

/*
 * =========================================================
 * 열차 종별 변환
 * =========================================================
 */

const getTrainTypeKo = (trainType: string | null): string => {
  if (!trainType) {
    return "보통";
  }

  const normalized = normalizeStationKey(trainType);

  return TOKYO_METRO_TRAIN_TYPE_KO[normalized] ?? getShortName(trainType);
};

/*
 * =========================================================
 * 단일 열차 변환
 * =========================================================
 */

export const adaptTokyoMetroTrain = (
  train: TokyoMetroUpcomingTrain,

  directionId: string,
): Train | null => {
  /*
   * 출발시간 없음
   */

  if (!train.departureTime) {
    return null;
  }

  /*
   * 이미 출발한 열차
   */

  if (train.minutesUntilDeparture === null || train.minutesUntilDeparture < 0) {
    return null;
  }

  /*
   * 행선지
   */

  const destination = getDestination(train.destinationStations ?? []);

  /*
   * =======================================================
   * 공통 Train
   * =======================================================
   */

  return {
    id:
      train.train ??
      train.trainNumber ??
      ["tokyo-metro", directionId, train.departureTime].join("-"),

    time: train.departureTime,

    minutesUntilDeparture: train.minutesUntilDeparture,

    trainType: getTrainTypeKo(train.trainType),

    destinationKo: destination.nameKo,

    destinationJa: destination.nameJa,

    status: "upcoming",
  };
};

/*
 * =========================================================
 * 여러 열차 변환
 * =========================================================
 */

export const adaptTokyoMetroTrains = (
  trains: TokyoMetroUpcomingTrain[],

  directionId: string,
): Train[] => {
  return trains
    .map((train) =>
      adaptTokyoMetroTrain(
        train,

        directionId,
      ),
    )

    .filter((train): train is Train => train !== null)

    .sort((a, b) => a.minutesUntilDeparture - b.minutesUntilDeparture);
};
