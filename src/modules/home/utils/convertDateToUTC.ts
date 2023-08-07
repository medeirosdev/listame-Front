export const convertDateToUTC = (date: string): string => {
  const dateInstance = new Date(date);
  const day = dateInstance.getUTCDate();
  const month = dateInstance.getUTCMonth();
  const year = dateInstance.getUTCFullYear();
  return `${year}-${month}-${day}`;
};
