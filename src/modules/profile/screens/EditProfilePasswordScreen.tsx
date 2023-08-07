import React, { FC, useState } from 'react';
import { Typography } from '~/app/components/Typography';
import styled, { useTheme } from 'styled-components/native';
import { EditProfileForm } from '~/modules/profile/components/EditProfileForm';
import { useEditProfilePasswordFormInputs } from '~/modules/profile/hooks/useEditProfilePasswordFormInputs';
import { LayoutContainer } from '~/app/components/LayoutContainer';
import { Row } from '~/app/components/Row';
import { Link } from '@react-navigation/native';
import { DividerWithText } from '~/app/components/DividerWithText';
import { ForgotPasswordModal } from '~/app/components/ForgotPasswordModal';
import {
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';

export const EditProfilePasswordScreen: FC = () => {
  const theme = useTheme();
  const height = useHeaderHeight();
  const editProfilePasswordForm = useEditProfilePasswordFormInputs();
  const [isModalVisible, setIsModalVisible] = useState(false);

  return (
    <LayoutContainer my={24}>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={height}
        style={{
          flex: 1,
        }}>
        <ScrollView>
          <ForgotPasswordModal
            visible={isModalVisible}
            onClose={() => setIsModalVisible(false)}
          />
          <Typography fontGroup="bodySmallRegular">
            Para continuar, é necessário informar também a sua senha atual.
          </Typography>
          <Typography fontGroup="bodySmallMedium">
            Caso não lembre sua senha, clique aqui:
          </Typography>
          <Row mt={12} alignSelf="center">
            <TouchableWithoutFeedback onPress={() => setIsModalVisible(true)}>
              <Typography
                fontGroup="bodySmallRegular"
                color={theme.colors.brand}>
                Esqueci minha senha
              </Typography>
            </TouchableWithoutFeedback>
          </Row>
          <DividerWithText my={16} text="ou" color={theme.colors.brand} />
          <EditProfileForm {...editProfilePasswordForm} />
        </ScrollView>
      </KeyboardAvoidingView>
    </LayoutContainer>
  );
};

export const UserTextInfo = styled(Typography)`
  color: ${({ theme: { colors } }) => colors.primary.blue[700]};
  align-self: center;
`;

export const UserDataWrapper = styled.View`
  margin: 12px 0px;
`;
