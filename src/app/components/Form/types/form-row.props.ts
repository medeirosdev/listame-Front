import { FC } from 'react';
import { UseControllerProps } from 'react-hook-form';
import { IFormInputProps } from '~/app/components/Form/types/form-input.props';

export type IFormRowProps = FC<{
  input: IFormInputProps;
  spacing: number;
  control: UseControllerProps['control'];
}>;
