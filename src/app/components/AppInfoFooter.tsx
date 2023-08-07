import React, { FC } from 'react';
import CheckBox from 'react-native-checkbox-animated';
import styled from 'styled-components/native';
import { Row } from '~/app/components/Row';
import { Typography } from '~/app/components/Typography';

interface AppInfoFooterProps {
  text: string;
  checked: boolean;
  setChecked: React.Dispatch<React.SetStateAction<boolean>>;
}

export const AppInfoFooter: FC<AppInfoFooterProps> = ({
  text,
  checked,
  setChecked,
}) => {
  return (
    <Row alignItems="center">
      <StyledCheckbox
        label=""
        onValueChange={(value) => {
          setChecked(value);
          return value;
        }}
        checked={checked}
      />
      <CheckboxLabel
        checked={checked}
        suppressHighlighting
        onPress={() => setChecked((prev) => !prev)}>
        {text}
      </CheckboxLabel>
    </Row>
  );
};

export const StyledCheckbox = styled(CheckBox).attrs(({ theme, checked }) => ({
  checkStyle: {
    color: theme.colors.neutral.white,
    fontSize: 14,
  },
  boxStyle: {
    backgroundColor: checked ? theme.colors.brand : 'transparent',
  },
}))``;

export const CheckboxLabel = styled(Typography).attrs(({ checked, theme }) => ({
  fontGroup: 'bodySmallRegular',
  color: checked ? theme.colors.primary.blue[700] : theme.colors.gray[900],
}))<{ checked?: boolean }>``;
