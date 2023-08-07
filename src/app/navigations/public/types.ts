import { NavigationProp, RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type PublicParamList = {
  Login: undefined;
  ForgotPassword: undefined;
  SignUpStep1: undefined;
  SignUpStep2: undefined;
};

export type PublicScreensNames = keyof PublicParamList;
export type PublicRouterParamList<T extends PublicScreensNames> = RouteProp<
  PublicParamList,
  T
>;

export type PublicNavigation = NativeStackNavigationProp<PublicParamList>;
export type PublicNavigationParams = NavigationProp<PublicParamList>;
