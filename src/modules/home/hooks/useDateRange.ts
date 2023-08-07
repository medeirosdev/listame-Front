import { Atom, useAtom, WritableAtom } from 'jotai';
import { useCallback, useState } from 'react';
import { DateData } from 'react-native-calendars';
import {
  OnEndDateChange,
  OnStartDateChange,
} from '~/modules/home/components/SelectDateBottomSheet';
import {
  bottomSheetOpenTypeAtom,
  DateAtomFunction,
  dateAtomInitialState,
  IDateAtom,
} from '~/modules/home/state/atoms/agendaFilterAtoms';
import { padDatePart } from '~/modules/home/utils/formatDateObject';

export interface IUseFilterByDateAtom {
  dateAtom?: DateAtomFunction;
}

export const useDateRange = ({ dateAtom }: IUseFilterByDateAtom) => {
  const [filterDateRange, setFilterDateRange] = dateAtom
    ? useAtom(dateAtom)
    : useState<IDateAtom>(dateAtomInitialState);

  const [bottomSheetOpenType, setBottomSheetOpenType] = useAtom(
    bottomSheetOpenTypeAtom,
  );

  const onStartDateChange: OnStartDateChange = (startDate) => {
    const start = {
      value: startDate.dateString,
      label: formatDate(startDate),
    };

    setFilterDateRange((prev) => ({
      start,
      end: prev?.end,
    }));
    setBottomSheetOpenType('end');
  };

  const onEndDateChange: OnEndDateChange = (endDate) => {
    const end = {
      value: endDate.dateString,
      label: formatDate(endDate),
    };
    setFilterDateRange((prev) => ({
      start: prev?.start,
      end,
    }));
    setBottomSheetOpenType('start');
  };

  const formatDate = ({ year, month, day }: DateData) => {
    return `${padDatePart(day)}/${padDatePart(month)}/${year}`;
  };

  const resetDateFilter = () => {
    setFilterDateRange(null);
    setBottomSheetOpenType(null);
  };

  return {
    resetDateFilter,
    onStartDateChange,
    onEndDateChange,
    filterDateRange,
    bottomSheetOpenType,
    setBottomSheetOpenType,
  };
};
