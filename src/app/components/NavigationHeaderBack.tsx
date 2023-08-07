import { useNavigation } from '@react-navigation/native';
import { HeaderBackButtonProps } from '@react-navigation/native-stack/lib/typescript/src/types';
import React, { FC } from 'react';
import { useTheme } from 'styled-components';
import { Icon } from '~/app/components/Icon';

export const NavigationHeaderBack: FC<HeaderBackButtonProps> = (props) => {
  const theme = useTheme();
  const navigator = useNavigation();

  const goBack = () => props.canGoBack && navigator.goBack();

  return (
    <Icon
      name="arrow_back"
      size={20}
      color={theme.colors.neutral.white}
      onPress={goBack}
    />
  );
};
