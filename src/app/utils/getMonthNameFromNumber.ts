import { monthNames } from '~/app/utils/constants/date';

export const getMonthNameFromNumber = (monthNumber: number) => {
  if (monthNumber >= 1 && monthNumber <= 12) {
    return monthNames[monthNumber - 1];
  }

  return '-';
};
