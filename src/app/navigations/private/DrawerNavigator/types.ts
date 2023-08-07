import { NavigationProp, RouteProp } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';

export type DrawerParamList = {
  Tabs: undefined;
  Filters: undefined;
};

export type DrawerScreensNames = keyof DrawerParamList;
export type DrawerRouterParamList<T extends DrawerScreensNames> = RouteProp<
  DrawerParamList,
  T
>;

export type DrawerNavigation = NativeStackNavigationProp<DrawerParamList>;
export type DrawerNavigationParams = NavigationProp<DrawerParamList>;
export type DrawerNavigationScreenProps =
  NativeStackScreenProps<DrawerParamList>;
