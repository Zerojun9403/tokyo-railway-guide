export const isAirportName = (
  nameKo?: string,
  nameJa?: string,
): boolean => {
  return (
    nameKo?.includes("공항") === true ||
    nameJa?.includes("空港") === true
  );
};
