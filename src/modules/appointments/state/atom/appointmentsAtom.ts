import { atomWithReset } from 'jotai/utils';
import { IDateAtom } from '~/modules/home/state/atoms/agendaFilterAtoms';

export const newAppointmentDateAtom = atomWithReset<IDateAtom>(null);
