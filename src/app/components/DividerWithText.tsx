import React, { FC } from 'react';
import { View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Typography } from '~/app/components/Typography';
interface IDividerWithTextProps {
  text: string;
  color?: string;
  my?: number;
}

export const DividerWithText: FC<IDividerWithTextProps> = ({
  text,
  color,
  my,
}) => {
  const theme = useTheme();

  return (
    <DividerContainer my={my}>
      <DividerLeftLine color={color} />
      <View>
        <Typography
          fontGroup="bodySmallRegular"
          color={color ?? theme.colors.neutral.white}>
          {text}
        </Typography>
      </View>
      <DividerRightLine color={color} />
    </DividerContainer>
  );
};

const DividerContainer = styled.View<Pick<IDividerWithTextProps, 'my'>>`
  flex-direction: row;
  align-items: center;
  margin-top: 24px;

  ${({ my }) => my && { marginTop: `${my}px`, marginBottom: `${my}px` }}
`;

const DividerLine = styled.View<Pick<IDividerWithTextProps, 'color'>>`
  flex: 1;
  height: 1px;
  background-color: ${({ color, theme: { colors } }) =>
    color ?? colors.neutral.white};
`;

const DividerLeftLine = styled(DividerLine)`
  margin-right: 16px;
`;

const DividerRightLine = styled(DividerLine)`
  margin-left: 16px;
`;
