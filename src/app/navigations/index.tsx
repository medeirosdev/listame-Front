import React, { FC, useCallback, useEffect } from 'react';
import RNBootSplash from 'react-native-bootsplash';
import { NavigationContainer } from '@react-navigation/native';
import { PrivateNavigator } from '~/app/navigations/private/PrivateNavigator';
import { PublicNavigator } from '~/app/navigations/public/PublicNavigator';
import { useAuthStatus } from '~/modules/auth/hooks/useAuthStatus';
import { useAppDispatch } from '~/app/hooks/useAppDispatch';
import { restoreSessionThunk } from '~/modules/auth/state/thunks/authThunks';
import { useAppFocus } from '~/app/hooks/useAppFocus';
import { SplashScreen } from '~/modules/auth/screens/SplashScreen';

export const Navigations: FC = () => {
  const { isAuthenticated, isAuthenticatedRestoring } = useAuthStatus();
  const dispatch = useAppDispatch();

  const restoreAuth = useCallback(() => dispatch(restoreSessionThunk()), []);

  useEffect(() => {
    restoreAuth();
  }, []);

  useAppFocus({
    onFocus: restoreAuth,
  });

  useEffect(() => {
    RNBootSplash.hide();
  }, [isAuthenticatedRestoring]);

  if (isAuthenticatedRestoring) return <SplashScreen />;

  return (
    <NavigationContainer>
      {isAuthenticated ? <PrivateNavigator /> : <PublicNavigator />}
    </NavigationContainer>
  );
};
