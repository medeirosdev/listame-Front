import { UseControllerProps } from 'react-hook-form';
import { IInputProps } from '~/app/components/Input/types';

export type InputTypes = 'text' | 'textarea' | 'select' | 'date' | 'time';

export type SelectOption = { label: string; value: unknown };

export interface IFormInputProps extends IInputProps {
  name: string;
  rules: UseControllerProps['rules'];
  outsideLabel?: string;
  sideInput?: this;
  selfControlled?: boolean;
}
