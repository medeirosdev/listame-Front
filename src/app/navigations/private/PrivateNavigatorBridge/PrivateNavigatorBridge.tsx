import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { FC } from 'react';
import { useTheme } from 'styled-components';
import { GradientContainerView } from '~/app/components/GradientContainerView';
import { DrawerNavigator } from '~/app/navigations/private/DrawerNavigator/DrawerNavigator';
import { PrivateBridgeParamList } from '~/app/navigations/private/PrivateNavigatorBridge/types';
import { ContactScreen } from '~/app/screens/ContactScreen';
import { PrivacyPolicyScreen } from '~/app/screens/PrivacyPolicyScreen';
import { TermsOfUseScreen } from '~/app/screens/TermsOfUseScreen';
import { AppointmentDetailsScreen } from '~/modules/appointments/screens/AppointmentDetailsScreen';
import { NewAppointmentScreen } from '~/modules/appointments/screens/NewAppointmentScreen';
import { FiltersScreen } from '~/modules/home/screens/FiltersScreen';
import { EditProfileNameScreen } from '~/modules/profile/screens/EditProfileNameScreen';
import { EditProfilePasswordScreen } from '~/modules/profile/screens/EditProfilePasswordScreen';
import { EditProfileScreen } from '~/modules/profile/screens/EditProfileScreen';
import { NewSchedulePhotoScreen } from '~/modules/schedule/screens/NewSchedulePhotoScreen';
import { NewScheduleScreen } from '~/modules/schedule/screens/NewScheduleScreen';
import { ScheduleDetailsScreen } from '~/modules/schedule/screens/ScheduleDetailsScreen';

const Stack = createNativeStackNavigator<PrivateBridgeParamList>();

export const PrivateNavigatorBridge: FC = () => {
  const theme = useTheme();

  return (
    <Stack.Navigator
      initialRouteName="Drawer"
      screenOptions={{
        statusBarStyle: 'light',
        headerShown: false,
      }}>
      <Stack.Screen name="Drawer" component={DrawerNavigator} />
      <Stack.Screen
        name="Filters"
        component={FiltersScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.neutral.white,
          headerBackground: () => <GradientContainerView />,
          headerTitle: 'Filtros',
          headerBackTitle: 'Início',
          headerTitleStyle: {
            fontSize: theme.fontSizes.h6,
            color: theme.colors.neutral.white,
          },
        }}
      />
      <Stack.Screen
        name="NewSchedule"
        component={NewScheduleScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.neutral.white,
          headerBackground: () => <GradientContainerView />,
          headerTitle: 'Nova agenda',
          headerBackTitle: '',
          headerTitleStyle: {
            fontSize: theme.fontSizes.bodyLarge,
            color: theme.colors.neutral.white,
          },
        }}
      />
      <Stack.Screen
        name="NewSchedulePhoto"
        component={NewSchedulePhotoScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.neutral.white,
          headerBackground: () => <GradientContainerView />,
          headerTitle: 'Foto da agenda',
          headerBackTitle: '',
          headerTitleStyle: {
            fontSize: theme.fontSizes.bodyLarge,
            color: theme.colors.neutral.white,
          },
        }}
      />
      <Stack.Screen
        name="ScheduleDetails"
        component={ScheduleDetailsScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.neutral.white,
          headerBackground: () => <GradientContainerView />,
          headerTitle: 'Informações da Agenda',
          headerBackTitle: '',
          headerTitleStyle: {
            fontSize: theme.fontSizes.bodyLarge,
            color: theme.colors.neutral.white,
          },
        }}
      />
      <Stack.Screen
        name="EditProfile"
        component={EditProfileScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.neutral.white,
          headerBackground: () => <GradientContainerView />,
          headerTitle: 'Editar Perfil',
          headerBackTitle: '',
          headerTitleStyle: {
            fontSize: theme.fontSizes.bodyLarge,
            color: theme.colors.neutral.white,
          },
        }}
      />
      <Stack.Screen
        name="EditProfileName"
        component={EditProfileNameScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.neutral.white,
          headerBackground: () => <GradientContainerView />,
          headerTitle: 'Alterar Nome',
          headerBackTitle: '',
          headerTitleStyle: {
            fontSize: theme.fontSizes.bodyLarge,
            color: theme.colors.neutral.white,
          },
        }}
      />
      <Stack.Screen
        name="EditProfilePassword"
        component={EditProfilePasswordScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.neutral.white,
          headerBackground: () => <GradientContainerView />,
          headerTitle: 'Alterar Senha',
          headerBackTitle: '',
          headerTitleStyle: {
            fontSize: theme.fontSizes.bodyLarge,
            color: theme.colors.neutral.white,
          },
        }}
      />
      <Stack.Screen
        name="NewAppointment"
        component={NewAppointmentScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.neutral.white,
          headerBackground: () => <GradientContainerView />,
          headerTitle: 'Nova tarefa',
          headerBackTitle: '',
          headerTitleStyle: {
            fontSize: theme.fontSizes.bodyLarge,
            color: theme.colors.neutral.white,
          },
        }}
      />
      <Stack.Screen
        name="AppointmentDetails"
        component={AppointmentDetailsScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.neutral.white,
          headerBackground: () => <GradientContainerView />,
          headerTitle: 'Detalhes da tarefa',
          headerBackTitle: '',
          headerTitleStyle: {
            fontSize: theme.fontSizes.bodyLarge,
            color: theme.colors.neutral.white,
          },
        }}
      />
      <Stack.Screen
        name="PrivacyPolicy"
        component={PrivacyPolicyScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.neutral.white,
          headerBackground: () => <GradientContainerView />,
          headerTitle: 'Política de privacidade',
          headerBackTitle: '',
          headerTitleStyle: {
            fontSize: theme.fontSizes.bodyLarge,
            color: theme.colors.neutral.white,
          },
        }}
      />
      <Stack.Screen
        name="TermsOfUse"
        component={TermsOfUseScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.neutral.white,
          headerBackground: () => <GradientContainerView />,
          headerTitle: 'Termos de uso',
          headerBackTitle: '',
          headerTitleStyle: {
            fontSize: theme.fontSizes.bodyLarge,
            color: theme.colors.neutral.white,
          },
        }}
      />
      <Stack.Screen
        name="Contact"
        component={ContactScreen}
        options={{
          headerShown: true,
          headerTintColor: theme.colors.neutral.white,
          headerBackground: () => <GradientContainerView />,
          headerTitle: 'Contato',
          headerBackTitle: '',
          headerTitleStyle: {
            fontSize: theme.fontSizes.bodyLarge,
            color: theme.colors.neutral.white,
          },
        }}
      />
    </Stack.Navigator>
  );
};
