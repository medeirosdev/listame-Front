import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { PrivateParamList } from '~/app/navigations/private/types';
import { HomeScreen } from '~/modules/home/screens/HomeScreen';
import { SchedulesScreen } from '~/modules/schedule/screens/SchedulesScreen';
import { Icon } from '~/app/components/Icon';
import { GradientContainerView } from '~/app/components/GradientContainerView';
import { useTheme } from 'styled-components';
import { useScreenHeaderOptions } from '~/app/navigations/private/hooks/useScreenHeaderOptions';
import { SchedulesSearchScreen } from '~/modules/schedule/screens/SchedulesSearchScreen';

const Tab = createBottomTabNavigator<PrivateParamList>();

export const TabsNavigator = () => {
  const theme = useTheme();
  const headerOptions = useScreenHeaderOptions();
  return (
    <>
      <Tab.Navigator
        screenOptions={{
          tabBarInactiveTintColor: theme.colors.neutral.white,
          tabBarActiveTintColor: theme.colors.complementary[500],
          tabBarBackground: () => <GradientContainerView />,
          tabBarShowLabel: false,
          ...headerOptions,
        }}>
        <Tab.Screen
          name="Home"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Início',
            tabBarIcon: ({ color, size }) => (
              <Icon name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Schedules"
          component={SchedulesScreen}
          options={{
            tabBarLabel: 'Agendas',
            tabBarIcon: ({ color, size }) => (
              <Icon name="menu_book" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="SchedulesSearch"
          component={SchedulesSearchScreen}
          options={{
            tabBarLabel: 'Buscar',
            tabBarIcon: ({ color, size }) => (
              <Icon name="search" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </>
  );
};
