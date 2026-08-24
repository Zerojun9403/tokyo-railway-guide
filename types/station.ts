export type StationType =
  | "normal"
  | "terminal"
  | "branch"
  | "loop"
  | "multi-direction";

export type NextStation = {
  id: string;

  code: string;

  nameKo: string;
  nameJa: string;

  lineId: string;
  lineCode: string;

  lineNameKo: string;

  color: string;
};

export type StationDirection = {
  id: string;

  /*
   * 탭/방향 선택 UI에 표시되는 이름
   */
  label: string;

  /*
   * 필요할 경우 더 짧은 이름 사용
   */
  shortLabel?: string;

  /*
   * "다음 도착" 옆에 표시할 방면 설명
   *
   * 예:
   * → 우에노 · 이케부쿠로 방면
   * → 나리타공항 방면
   */
  description?: string;

  /*
   * 해당 방향의 다음 역
   *
   * 일반역 = 1개
   * 분기역 = 여러 개
   */
  nextStations: NextStation[];
};

export type TransferLine = {
  id: string;

  code: string;

  nameKo: string;
  nameJa: string;

  color: string;
};

export type Station = {
  id: string;

  operatorId: string;

  lineId: string;
  lineCode: string;

  lineNameKo: string;
  lineNameJa: string;

  code: string;

  nameKo: string;
  nameJa: string;

  color: string;

  type: StationType;

  directions: StationDirection[];

  transfers?: TransferLine[];
};
