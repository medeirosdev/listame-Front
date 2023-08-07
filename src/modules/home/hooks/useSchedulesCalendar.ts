import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { useAtom } from 'jotai';
import { useMemo } from 'react';
import { capitalize } from '~/app/utils/format/capitalize';
import { getMonthNameFromNumber } from '~/app/utils/getMonthNameFromNumber';
import {
  isCalendarOpenAtom,
  selectedDateAtom,
} from '~/modules/home/state/atoms/schedulesCalendarAtoms';

export const useSchedulesCalendar = () => {
  const [isOpen, setIsOpen] = useAtom(isCalendarOpenAtom);
  const [selectedDate, setSelectedDate] = useAtom(selectedDateAtom);

  function handleCalendarOpen() {
    setIsOpen((prev) => !prev);
  }

  const selectedMonth = useMemo(() => {
    let month = format(new Date(), 'MMMM', {
      locale: ptBR,
    });
    if (selectedDate?.dateString) {
      month = getMonthNameFromNumber(selectedDate.month);
    }
    return capitalize(month);
  }, [selectedDate]);

  const reset = () => {
    setIsOpen(false);

    const today = new Date();
    setSelectedDate({
      dateString: today.toISOString().split('T')[0],
      day: today.getUTCDate(),
      month: today.getUTCMonth(),
      year: today.getUTCFullYear(),
      timestamp: today.getTime(),
    });
  };

  return {
    isOpen,
    handleCalendarOpen,
    selectedMonth,
    selectedDate,
    setSelectedDate,
    reset,
  };
};
