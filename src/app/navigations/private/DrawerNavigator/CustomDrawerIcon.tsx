import React, { FC } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { Icon } from '~/app/components/Icon';

interface ICustomDrawerIconProps {
  name: string;
  focused?: boolean;
  mr?: number;
}

export const CustomDrawerIcon: FC<ICustomDrawerIconProps> = (props) => {
  const { name, mr } = props;
  const theme = useTheme();

  return (
    <CustomDrawerIconContainer mr={mr}>
      <Icon name={name} size={24} color={theme.colors.primary.blue[700]} />
    </CustomDrawerIconContainer>
  );
};

const CustomDrawerIconContainer = styled.View<{ mr?: number }>`
  margin-right: ${({ mr }) => `${mr || -20}px`};
`;
