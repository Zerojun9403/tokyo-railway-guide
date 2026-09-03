export type TransferStationOverride = {
  targetLineId: string;
  targetStationId: string;
};

export const transferStationOverrides: Record<
  string,
  TransferStationOverride[]
> = {
  /*
   * =====================================================
   * 신주쿠니시구치 E01
   * =====================================================
   *
   * 공식 환승 대상으로 등록되어 있는 신주쿠 계열 노선만
   * 명시적으로 연결한다.
   *
   * 주의:
   * E01 신주쿠니시구치와 E27 신주쿠는
   * 서로 다른 오에도선 역이므로 직접 연결하지 않는다.
   */

  "oedo:E01": [
    {
      targetLineId: "marunouchi",
      targetStationId: "M08",
    },
    {
      targetLineId: "yamanote",
      targetStationId: "JY17",
    },
    {
      targetLineId: "chuo-sobu-local",
      targetStationId: "JB10",
    },
    {
      targetLineId: "chuo-rapid",
      targetStationId: "JC05",
    },
    {
      targetLineId: "saikyo",
      targetStationId: "JA11",
    },
    {
      targetLineId: "seibu-shinjuku",
      targetStationId: "SS01",
    },
  ],

  /*
   * =====================================================
   * 세이부신주쿠 SS01
   * =====================================================
   *
   * 신주쿠 권역의 공식 환승 노선을 명시적으로 연결한다.
   *
   * shinjuku:S01 = 도에이 신주쿠선 신주쿠
   * oedo:E01     = 도에이 오에도선 신주쿠니시구치
   */

  "seibu-shinjuku:SS01": [
    {
      targetLineId: "yamanote",
      targetStationId: "JY17",
    },
    {
      targetLineId: "chuo-rapid",
      targetStationId: "JC05",
    },
    {
      targetLineId: "chuo-sobu-local",
      targetStationId: "JB10",
    },
    {
      targetLineId: "marunouchi",
      targetStationId: "M08",
    },
    {
      targetLineId: "shinjuku",
      targetStationId: "S01",
    },
    {
      targetLineId: "oedo",
      targetStationId: "E01",
    },
  ],
};