import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { useTheme } from 'styled-components';
import { GradientContainerView } from '~/app/components/GradientContainerView';
import { PublicParamList } from '~/app/navigations/public/types';
import { ForgotPasswordScreen } from '~/modules/auth/screens/ForgotPasswordScreen';
import { LoginScreen } from '~/modules/auth/screens/LoginScreen';
import { SignUpScreenStep1 } from '~/modules/auth/screens/SignUpScreenStep1';
import { SignUpScreenStep2 } from '~/modules/auth/screens/SignUpScreenStep2';

const Stack = createNativeStackNavigator<PublicParamList>();

export const PublicNavigator: FC = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Login"
      screenOptions={{
        statusBarStyle: 'light',
      }}>
      <Stack.Screen
        name="Login"
        component={LoginScreen}
        options={{ headerShown: false }}
      />
      <Stack.Group
        screenOptions={{
          contentStyle: {
            backgroundColor: theme.colors.neutral.white,
          },
          headerTintColor: theme.colors.neutral.white,
          headerBackground: () => <GradientContainerView />,
          headerTitle: 'Lista.Me',
          headerTitleStyle: {
            fontSize: theme.fontSizes.h6,
            color: theme.colors.neutral.white,
          },
        }}>
        <Stack.Screen
          name="SignUpStep1"
          component={SignUpScreenStep1}
          options={{
            headerBackTitle: 'Login',
          }}
        />
        <Stack.Screen
          name="SignUpStep2"
          component={SignUpScreenStep2}
          options={{
            headerBackTitle: 'Etapa 1',
          }}
        />
      </Stack.Group>
      <Stack.Screen
        name="ForgotPassword"
        component={ForgotPasswordScreen}
        options={{ headerShown: false }}
      />
    </Stack.Navigator>
  );
};
