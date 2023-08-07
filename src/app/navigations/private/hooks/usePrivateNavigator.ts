import { useNavigation } from '@react-navigation/native';
import { PrivateBridgeNavigation } from '~/app/navigations/private/PrivateNavigatorBridge/types';
import { PrivateNavigation } from '~/app/navigations/private/types';

export const usePrivateNavigation = useNavigation<PrivateNavigation>;
