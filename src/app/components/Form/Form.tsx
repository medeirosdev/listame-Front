import React from 'react';
import { IFormInputProps, IFormProps } from '~/app/components/Form/types';
import { FormRow } from '~/app/components/Form/anathomy/FormRow';
import { View } from 'react-native';

export const Form = (props: IFormProps) => {
  const { inputs, rowsSpacing = 16 } = props;

  const {
    control,
    formState: { errors },
  } = props.formData;

  if (!inputs.length) return <></>;

  return (
    <View>
      {inputs.map((input: IFormInputProps, index) => {
        const error = String(errors[input.name]?.message || '');
        const isLast = index === inputs.length - 1;
        const inputProps = {
          ...input,
          error,
        };

        if (input.sideInput?.name) {
          const sideInputError = input?.sideInput
            ? String(errors[input.sideInput?.name]?.message || '')
            : '';

          inputProps.sideInput = {
            ...input.sideInput,
            error: sideInputError,
          };
        }
        return (
          <FormRow
            key={`${input.name}_${index}_${inputs.length}`}
            control={control}
            input={inputProps}
            spacing={isLast ? 0 : rowsSpacing}
          />
        );
      })}
    </View>
  );
};
