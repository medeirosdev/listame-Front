import { NavigationProp, RouteProp } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { PrivateBridgeParamList } from '~/app/navigations/private/PrivateNavigatorBridge/types';

export type PrivateParamList = PrivateBridgeParamList & {
  Home: undefined;
  Schedules: undefined;
  SchedulesSearch: undefined;
  Filters: undefined;
};

export type PrivateScreensNames = keyof PrivateParamList;
export type PrivateRouterParamList<T extends PrivateScreensNames> = RouteProp<
  PrivateParamList,
  T
>;

export type PrivateNavigation = NativeStackNavigationProp<PrivateParamList>;
export type PrivateNavigationParams = NavigationProp<PrivateParamList>;
export type PrivateNavigationScreenProps =
  NativeStackScreenProps<PrivateParamList>;
