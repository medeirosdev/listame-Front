import { UseFormProps, UseFormReturn } from 'react-hook-form';
import { IFormInputProps } from '~/app/components/Form/types/form-input.props';

export interface IFormProps {
  inputs: IFormInputProps[];
  defaultValues?: UseFormProps['defaultValues'];
  rowsSpacing?: number;
  formData: UseFormReturn<any>;
}
