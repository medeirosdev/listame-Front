import React, { useMemo } from 'react';
import { Controller } from 'react-hook-form';
import styled, { css } from 'styled-components/native';
import { IFormInputProps, IFormRowProps } from '~/app/components/Form/types';
import { Input } from '~/app/components/Input';
import { Row } from '~/app/components/Row';
import { Typography } from '~/app/components/Typography';

export const FormRow: IFormRowProps = ({ control, input, spacing }) => {
  const { outsideLabel, sideInput = {} as unknown as IFormInputProps } = input;

  const hasSideInput = useMemo(() => Boolean(sideInput?.name), [sideInput]);

  const renderInput = (formInput: IFormInputProps) => {
    const inputProps: IFormInputProps = {
      ...formInput,
      key: formInput.name,
      onBlur: (event) => {
        formInput?.onBlur?.(event);
      },
      onChangeText: (text) => {
        formInput?.onChangeText?.(text);
      },
    };

    if (inputProps.selfControlled) {
      return <Input {...inputProps} />;
    }

    return (
      <Controller
        name={formInput.name}
        control={control}
        rules={formInput.rules}
        defaultValue={formInput.defaultValue}
        render={({ field: { onChange, onBlur: controllerOnBlur, value } }) => (
          <Input
            value={value}
            {...inputProps}
            onBlur={(event) => {
              inputProps?.onBlur?.(event);
              controllerOnBlur();
            }}
            onChangeText={(text) => {
              inputProps?.onChangeText?.(text);
              onChange(text);
            }}
          />
        )}
      />
    );
  };

  return (
    <Row mb={spacing} dir={Boolean(outsideLabel) ? 'column' : 'row'}>
      {Boolean(outsideLabel) && (
        <Row mb={16}>
          <FormRowOutsideLabel>{outsideLabel}</FormRowOutsideLabel>
        </Row>
      )}
      <Row
        justifyContent="space-between"
        style={{
          flex: 1,
        }}>
        <FormControllerWrapper hasSideInput={hasSideInput}>
          {renderInput(input)}
        </FormControllerWrapper>
        <FormControllerWrapper hasSideInput={hasSideInput}>
          {hasSideInput && renderInput(sideInput)}
        </FormControllerWrapper>
      </Row>
    </Row>
  );
};

const FormRowOutsideLabel = styled(Typography).attrs({
  fontGroup: 'h6Medium',
})`
  color: ${({ theme: { colors } }) => colors.gray[900]};
`;

const FormControllerWrapper = styled(Row)<{ hasSideInput?: boolean }>`
  ${({ hasSideInput }) =>
    hasSideInput &&
    css`
      flex: 0.48;
    `}
`;
