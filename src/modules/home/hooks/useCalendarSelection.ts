import { format } from 'date-fns';
import { useAtomValue } from 'jotai';
import { useEffect, useMemo, useRef, useState } from 'react';
import { FlatList } from 'react-native';
import { isFilteringAtom } from '~/modules/home/state/atoms/agendaFilterAtoms';
import { selectedDateAtom } from '~/modules/home/state/atoms/schedulesCalendarAtoms';
import { ISchedulesListItem } from '~/modules/appointments/types/appointments';

interface IUseCalendarSelectionParams {
  list: ISchedulesListItem[] | undefined;
}

export const useCalendarSelection = ({
  list = [],
}: IUseCalendarSelectionParams) => {
  const [scheduleIndex, setScheduleIndex] = useState<number | null>(null);
  const scheduleListRef = useRef<FlatList>(null);
  const selectedDate = useAtomValue(selectedDateAtom);
  const isFiltering = useAtomValue(isFilteringAtom);

  const isIndexValid = (index: number | null) => {
    if (index === null || !Number.isInteger(index)) return false;
    return index >= 0 && index <= list.length - 1;
  };

  const findIndexBySelectedDate = (date: string) => {
    return list.findIndex((appointmentData) => {
      const formattedAppointmentDate = format(
        new Date(appointmentData.date),
        'yyyy-MM-dd',
      );
      return formattedAppointmentDate.startsWith(date);
    });
  };

  const calendarDates = useMemo(() => {
    return list?.map((appointmentObject) => appointmentObject.date) || [];
  }, [list]);

  useEffect(() => {
    if (isFiltering || !selectedDate?.dateString || !list?.length) return;
    const selectedDateIndex = findIndexBySelectedDate(selectedDate?.dateString);
    if (isIndexValid(selectedDateIndex)) setScheduleIndex(selectedDateIndex);
  }, [list, selectedDate, isFiltering]);

  useEffect(() => {
    if (!isFiltering && isIndexValid(scheduleIndex)) {
      try {
        scheduleListRef.current?.scrollToIndex({
          index: Number(scheduleIndex),
          animated: true,
          viewPosition: 0.3,
        });
      } catch (error) {}
    }
  }, [scheduleIndex, isFiltering]);

  return {
    scheduleListRef,
    scheduleIndex,
    calendarDates,
  };
};
