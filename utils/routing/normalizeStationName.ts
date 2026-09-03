/*
 * 역명 비교용 정규화
 *
 * 주의:
 * - 화면에 표시되는 실제 역명을 수정하지 않는다.
 * - 라우팅에서 동일한 역인지 비교할 때만 사용한다.
 */

/*
 * 한국어 역명 정규화
 *
 * 현재는 앞뒤 공백만 제거한다.
 * 화면 표시용 데이터에는 영향을 주지 않는다.
 */
export const normalizeStationNameKo = (
  value: string,
): string => {
  return value.trim();
};

/*
 * 일본어 역명 정규화
 *
 * NFKC:
 *   空港第２ビル → 空港第2ビル
 *
 * ケ → ヶ:
 *   市ケ谷 → 市ヶ谷
 *
 * 원본 데이터는 변경하지 않고
 * 비교할 때만 정규화한다.
 */
export const normalizeStationNameJa = (
  value: string,
): string => {
  return value
    .trim()
    .normalize("NFKC")
    .replace(/ケ/g, "ヶ");
};

/*
 * 동일역 판정
 *
 * 일본어 공식 역명이 같으면 동일역으로 취급한다.
 *
 * 예:
 *
 * 이다바시 / 이이다바시
 * 飯田橋 === 飯田橋
 *
 * 도츠카 / 도쓰카
 * 戸塚 === 戸塚
 *
 * 토코로자와 / 도코로자와
 * 所沢 === 所沢
 *
 * 국회의사당앞 / 곳카이기지도마에
 * 国会議事堂前 === 国会議事堂前
 *
 * 한국어 표기 차이가 라우팅 연결을 방해하지 않도록
 * 일본어 역명을 기준으로 동일역을 판단한다.
 */
export const isSameStationName = (
  _firstNameKo: string,
  firstNameJa: string,
  _secondNameKo: string,
  secondNameJa: string,
): boolean => {
  return (
    normalizeStationNameJa(firstNameJa) ===
    normalizeStationNameJa(secondNameJa)
  );
};