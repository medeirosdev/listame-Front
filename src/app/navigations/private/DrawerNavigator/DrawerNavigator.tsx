import * as React from 'react';
import { View, StyleSheet } from 'react-native';
import {
  createDrawerNavigator,
  DrawerContentComponentProps,
  DrawerContentScrollView,
  DrawerItem,
} from '@react-navigation/drawer';

import { TabsNavigator } from '~/app/navigations/private/TabsNavigator';
import { UserAvatar } from '~/modules/home/components/UserAvatar';
import { Row } from '~/app/components/Row';
import { Icon } from '~/app/components/Icon';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';
import { Typography } from '~/app/components/Typography';
import { getUserNames } from '~/app/utils/format/getUserNames';
import { useAppSelector } from '~/app/hooks/useAppSelector';
import { currentUserSelector } from '~/modules/auth/state/selectors/userSelectors';
import { CustomDrawerIcon } from '~/app/navigations/private/DrawerNavigator/CustomDrawerIcon';
import { deleteTokenFromSafeStorage } from '~/modules/auth/services/storage/safeStorage';
import { authActions } from '~/modules/auth/state/slices/authSlices';
import { useDispatch } from 'react-redux';
import { queryClient } from '~/app/services/queryClient';
import { DrawerParamList } from '~/app/navigations/private/DrawerNavigator/types';
import { useScreenHeaderOptions } from '~/app/navigations/private/hooks/useScreenHeaderOptions';
import { usePrivateNavigation } from '~/app/navigations/private/hooks/usePrivateNavigator';

const Drawer = createDrawerNavigator<DrawerParamList>();

const styles = StyleSheet.create({
  contentContainerStyle: {
    flex: 1,
  },
});

function CustomDrawerContent(props: DrawerContentComponentProps) {
  const theme = useTheme();
  const user = useAppSelector(currentUserSelector);
  const navigation = usePrivateNavigation();

  const dispatch = useDispatch();

  const logout = async () => {
    await queryClient.invalidateQueries();
    await deleteTokenFromSafeStorage();
    await dispatch(authActions.resetWithNewStatus('GUEST'));
  };

  return (
    <DrawerContent>
      <DrawerContentScrollView
        {...props}
        contentContainerStyle={styles.contentContainerStyle}>
        <DrawerContentHeader onPress={() => navigation.navigate('EditProfile')}>
          <Row alignItems="center">
            <UserAvatar url="" variant="medium" />
            <DrawerContentHeaderTitle fontGroup="bodyLargeRegular">
              {getUserNames(user?.name, false)}
            </DrawerContentHeaderTitle>
          </Row>
          <Icon
            name="arrow_forward_ios"
            size={20}
            color={theme.colors.primary.blue[200]}
          />
        </DrawerContentHeader>
        <DrawerContentBodyView>
          <View>
            <DrawerItem
              label={() => (
                <DrawerItemText>Política de privacidade</DrawerItemText>
              )}
              icon={() => <DrawerItemIcon name="privacy_tip" />}
              onPress={() => props.navigation.navigate('PrivacyPolicy')}
            />
            <DrawerItem
              label={() => <DrawerItemText>Termos de uso</DrawerItemText>}
              icon={() => <DrawerItemIcon name="verified_user" />}
              onPress={() => props.navigation.navigate('TermsOfUse')}
            />
            <DrawerItem
              label={() => <DrawerItemText>Contato</DrawerItemText>}
              icon={() => <DrawerItemIcon name="mail" />}
              onPress={() => props.navigation.navigate('Contact')}
            />
          </View>
          <DrawerItemExit
            label={() => <DrawerItemText>Sair</DrawerItemText>}
            icon={() => <DrawerItemIcon name="logout" />}
            onPress={() => logout()}
          />
        </DrawerContentBodyView>
      </DrawerContentScrollView>
    </DrawerContent>
  );
}

export const DrawerNavigator = () => {
  const headerOptions = useScreenHeaderOptions();

  return (
    <Drawer.Navigator
      screenOptions={{
        ...headerOptions,
        headerShown: false,
      }}
      initialRouteName="Tabs"
      drawerContent={(props) => <CustomDrawerContent {...props} />}>
      <Drawer.Screen name="Tabs" component={TabsNavigator} />
    </Drawer.Navigator>
  );
};

const DrawerContentBodyView = styled.View`
  flex: 1;
  justify-content: space-between;
`;

const DrawerContent = styled.View`
  flex: 1;
  background-color: ${({ theme: { colors } }) => colors.neutral.white};
`;

const DrawerContentHeader = styled.TouchableOpacity.attrs({
  activeOpacity: 0.7,
})`
  padding: 12px;
  border-bottom-width: 0.7px;
  border-bottom-color: ${({ theme: { colors } }) => colors.primary.blue[700]};
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const DrawerContentHeaderTitle = styled(Typography).attrs({
  numberOfLines: 1,
  overflow: 'hidden',
})`
  width: 70%;
  margin-left: 8px;
`;

const DrawerItemText = styled(Typography).attrs({
  fontGroup: 'bodyRegular',
})`
  color: ${({ theme: { colors } }) => colors.primary.blue[700]};
`;

const DrawerItemIcon = styled(CustomDrawerIcon)``;

const DrawerItemExit = styled(DrawerItem)`
  margin-bottom: 24px;
`;
