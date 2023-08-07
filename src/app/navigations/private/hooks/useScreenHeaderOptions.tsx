import { DrawerActions } from '@react-navigation/native';
import React from 'react';
import { useTheme } from 'styled-components';
import { GradientContainerView } from '~/app/components/GradientContainerView';
import { Icon } from '~/app/components/Icon';
import { usePrivateNavigation } from '~/app/navigations/private/hooks/usePrivateNavigator';

import { UserAvatar } from '~/modules/home/components/UserAvatar';

export const useScreenHeaderOptions = (): any => {
  const theme = useTheme();

  const navigation = usePrivateNavigation();

  return {
    headerTintColor: theme.colors.neutral.white,
    headerBackground: () => <GradientContainerView />,
    headerTitle: 'Lista.Me',
    headerTitleStyle: {
      fontSize: theme.fontSizes.h6,
      color: theme.colors.neutral.white,
    },
    headerTitleAlign: 'center',
    headerRightContainerStyle: {
      right: 24,
    },
    headerRight: () => (
      <Icon name="notifications" size={24} color={theme.colors.neutral.white} />
    ),
    headerLeftContainerStyle: {
      left: 24,
    },
    headerLeft: () => (
      <UserAvatar
        variant="smallWhite"
        onPress={() => navigation.dispatch(DrawerActions.openDrawer())}
      />
    ),
  };
};
