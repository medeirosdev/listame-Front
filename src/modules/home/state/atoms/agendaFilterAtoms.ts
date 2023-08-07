import { atom } from 'jotai';
import { atomWithReset } from 'jotai/utils';
import { SelectDateBottomShetTypes } from '~/modules/home/components/SelectDateBottomSheet';
import { IAgenda } from '~/modules/schedule/types/agendas';

export const dateAtomInitialState = {
  start: {},
  end: {},
};

export type IDateAtom = {
  start?: {
    value?: string;
    label?: string;
  };
  end?: {
    value?: string;
    label?: string;
  };
} | null;

export type DateAtomFunction = typeof agendaDatesFilterAtom;
export type AgendaFilterChecked = Record<IAgenda['id'], boolean> | null;

export const isFilteringAtom = atomWithReset(false);
export const agendaDatesFilterAtom = atomWithReset<IDateAtom>(null);
export const bottomSheetOpenTypeAtom = atom<SelectDateBottomShetTypes | null>(
  null,
);
export const agendaCheckedFilterAtom = atomWithReset<AgendaFilterChecked>(null);
export const agendaSelectedFiltersCountAtom = atom((get) => {
  let count = 0;
  const checkedAgendas = get(agendaCheckedFilterAtom);
  if (checkedAgendas && Object.values(checkedAgendas).some(Boolean)) count++;
  if (get(agendaDatesFilterAtom) !== null) count++;
  return count;
});

export const agendasCheckedIdsAtom = atom((get) => {
  const checkedAgendas = get(agendaCheckedFilterAtom);
  if (checkedAgendas)
    return Object.keys(checkedAgendas).filter((key) => checkedAgendas[key]);
  return [];
});
