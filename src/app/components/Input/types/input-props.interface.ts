import { ComponentPropsWithRef } from 'react';
import { TextInput } from 'react-native';
import { Mask } from 'react-native-mask-input';
import { InputTypes, SelectOption } from '~/app/components/Form/types';
import { DateAtomFunction } from '~/modules/home/state/atoms/agendaFilterAtoms';
import { InputVariants } from './input-variants.type';

export interface IInputProps extends ComponentPropsWithRef<typeof TextInput> {
  label: string;
  placeholder?: string;
  iconName?: string;
  variant?: InputVariants;
  helperText?: string;
  error?: string;
  onIconPress?: (...args: unknown[]) => void;
  type?: InputTypes;
  options?: SelectOption[];
  onSelectedOption?: (option: SelectOption) => void;
  dateAtom?: DateAtomFunction;
  dateRangeType?: 'start' | 'end';
  mask?: Mask;
}
