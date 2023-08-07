import { atom } from 'jotai';
import { DateData } from 'react-native-calendars';

export const selectedDateAtom = atom<DateData | null>(null);
export const isCalendarOpenAtom = atom(false);
