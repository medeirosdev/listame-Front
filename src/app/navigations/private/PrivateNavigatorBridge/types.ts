import { NavigationProp, RouteProp } from '@react-navigation/native';
import {
  NativeStackNavigationProp,
  NativeStackScreenProps,
} from '@react-navigation/native-stack';
import { IAppointment } from '~/modules/appointments/types/appointments';
import { IAgenda } from '~/modules/schedule/types/agendas';

export type PrivateBridgeParamList = {
  Drawer: undefined;
  Filters: undefined;
  ScheduleDetails: {
    id: IAgenda['id'];
  };
  EditProfile: undefined;
  EditProfileName: undefined;
  EditProfilePassword: undefined;
  ForgotPassword: undefined;
  NewAppointment: undefined;
  NewSchedule: undefined;
  NewSchedulePhoto: {
    id: IAgenda['id'];
  };
  AppointmentDetails: {
    appointmentId: IAppointment['id'];
    agendaId: IAgenda['id'];
  };
  PrivacyPolicy: undefined;
  TermsOfUse: undefined;
  Contact: undefined;
};

export type PrivateBridgeScreensNames = keyof PrivateBridgeParamList;
export type PrivateBridgeRouterParamList<T extends PrivateBridgeScreensNames> =
  RouteProp<PrivateBridgeParamList, T>;

export type PrivateBridgeNavigation =
  NativeStackNavigationProp<PrivateBridgeParamList>;
export type PrivateBridgeNavigationParams =
  NavigationProp<PrivateBridgeParamList>;
export type PrivateBridgeNavigationScreenProps =
  NativeStackScreenProps<PrivateBridgeParamList>;

export type PrivateBridgeNavigationScreenPropsGeneric<
  T extends PrivateBridgeScreensNames,
> = NativeStackScreenProps<PrivateBridgeParamList, T>;
