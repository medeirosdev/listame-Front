import React, { FC, memo } from 'react';
import { getVersion } from 'react-native-device-info';
import styled from 'styled-components/native';
import logo from '~/app/assets/logo/bootsplash_logo.png';
import { Typography } from '~/app/components/Typography';

export const SplashScreen: FC = memo(() => {
  return (
    <ContainerBackground>
      <ContainerData>
        <Logo source={logo} />
        <SplashSpinner />
        {Boolean(getVersion()) && (
          <Version>Versão {getVersion().padEnd(5, '.0')}</Version>
        )}
      </ContainerData>
    </ContainerBackground>
  );
});

const ContainerBackground = styled.View`
  background-color: ${({ theme: { colors } }) => colors.brand};
  flex: 1;
  justify-content: flex-end;
`;

const ContainerData = styled.View`
  align-items: center;
  justify-content: space-between;
  height: 50%;
`;

const SplashSpinner = styled.ActivityIndicator.attrs(({ theme }) => ({
  size: 20,
  color: theme.colors.neutral.white,
}))``;

const Version = styled(Typography).attrs(({ theme: { colors } }) => ({
  fontGroup: 'caption',
  fontType: 'caption',
  color: colors.neutral.white,
}))`
  bottom: 60px;
`;

const Logo = styled.Image``;
