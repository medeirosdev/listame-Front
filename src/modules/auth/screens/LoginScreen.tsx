import React, { FC, useEffect, useState } from 'react';
import styled, { useTheme } from 'styled-components/native';
import { GradientContainerView } from '~/app/components/GradientContainerView';
import logo from '~/app/assets/logo/bootsplash_logo.png';
import { LayoutContainer } from '~/app/components/LayoutContainer';
import { KeyboardAvoidingView, Platform, View } from 'react-native';
import { Row } from '~/app/components/Row';
import { Button } from '~/app/components/Button';
import { Typography } from '~/app/components/Typography';
import { Form } from '~/app/components/Form/Form';
import { Link } from '@react-navigation/native';
import { ITextAlertProps, TextAlert } from '~/app/components/TextAlert';
import { useLoginFormInputs } from '~/modules/auth/hooks/useLoginFormInputs';
import { useAuthStatus } from '~/modules/auth/hooks/useAuthStatus';
import { useAppSelector } from '~/app/hooks/useAppSelector';
import { authErrorMessageSelector } from '~/modules/auth/state/selectors/authSelectors';
import { useAppDispatch } from '~/app/hooks/useAppDispatch';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { createSessionThunk } from '~/modules/auth/state/thunks/authThunks';
import { yupResolver } from '@hookform/resolvers/yup';
import { DividerWithText } from '~/app/components/DividerWithText';
import { GoogleIcon } from '~/modules/auth/components/GoogleIcon';
import { useSocialAuth } from '~/modules/auth/hooks/useSocialAuth';
import { FacebookIcon } from '~/modules/auth/components/FacebookIcon';
import { useHeaderHeight } from '@react-navigation/elements';

export type FormFieldType = {
  email: string;
  password: string;
};

export const LoginScreen: FC = () => {
  const theme = useTheme();
  const headerHeight = useHeaderHeight();

  const [alert, setAlert] = useState<ITextAlertProps | undefined>();

  const { inputs, schema } = useLoginFormInputs();
  const formData = useForm<FormFieldType>({
    resolver: yupResolver(schema),
  });

  const { googleAuth, facebookAuth } = useSocialAuth();
  const { isAuthenticationLoading: isLoading } = useAuthStatus();
  const loginError = useAppSelector(authErrorMessageSelector);
  const dispatch = useAppDispatch();

  const onSubmitSuccess: SubmitHandler<FormFieldType> = async (fields) => {
    await dispatch(createSessionThunk(fields));
  };

  const onSubmitFailure: SubmitErrorHandler<FormFieldType> = (_errors) => {};

  const isFacebookButtonDisabled = () => {
    return facebookAuth.signInDisabled || googleAuth.signInLoading || isLoading;
  };

  const isGoogleButtonDisabled = () => {
    return googleAuth.signInDisabled || facebookAuth.signInLoading || isLoading;
  };

  const isSignInButtonDisabled = () => {
    return googleAuth.signInLoading || facebookAuth.signInLoading || isLoading;
  };

  useEffect(() => {
    if (loginError) {
      setAlert({
        type: 'error',
        message: loginError,
      });
    }
  }, [loginError]);

  return (
    <GradientContainerView>
      <LayoutContainer isCentered>
        <Logo source={logo} />
        <KeyboardAvoidingView
          keyboardVerticalOffset={headerHeight}
          behavior={Platform.OS === 'android' ? 'height' : 'padding'}>
          <View>
            <FormContainer>
              <Row mb={24}>
                <Typography fontGroup="bodyMedium">Acesse sua conta</Typography>
              </Row>
              <Form rowsSpacing={6} formData={formData} inputs={inputs} />
              <Row alignSelf="flex-end" my={8}>
                <Link
                  to={{
                    screen: 'ForgotPassword',
                  }}>
                  <Typography
                    fontGroup="bodySmallRegular"
                    color={theme.colors.brand}>
                    Esqueci minha senha
                  </Typography>
                </Link>
              </Row>
              <Row my={16}>
                <Button
                  fullWidth
                  disabled={isSignInButtonDisabled()}
                  isLoading={isLoading}
                  loadingText="Entrando..."
                  variant="primary"
                  onPress={formData.handleSubmit(
                    onSubmitSuccess,
                    onSubmitFailure,
                  )}>
                  Entrar
                </Button>
              </Row>
              <Row alignSelf="center">
                <Typography fontGroup="bodySmallRegular">
                  Novo por aqui?{' '}
                  <Link
                    to={{
                      screen: 'SignUpStep1',
                    }}>
                    <Typography
                      fontGroup="bodySmallMedium"
                      color={theme.colors.brand}>
                      Criar conta
                    </Typography>
                  </Link>
                </Typography>
              </Row>
              {Boolean(alert?.message) && (
                <Row mt={8}>
                  <TextAlert
                    message={alert?.message || ''}
                    type={alert?.type || 'info'}
                  />
                </Row>
              )}
            </FormContainer>
            <DividerWithText text="ou" />
            <Row justifyContent="space-evenly" mt={32}>
              <ButtonWrapper mr={16}>
                <Button
                  icon={<GoogleIcon />}
                  variant="social"
                  disabled={isGoogleButtonDisabled()}
                  fullWidth
                  isLoading={googleAuth.signInLoading}
                  onPress={googleAuth.signIn}
                />
              </ButtonWrapper>
              <ButtonWrapper>
                <Button
                  icon={<FacebookIcon />}
                  variant="social"
                  disabled={isFacebookButtonDisabled()}
                  fullWidth
                  isLoading={facebookAuth.signInLoading}
                  onPress={facebookAuth.signIn}
                />
              </ButtonWrapper>
            </Row>
          </View>
        </KeyboardAvoidingView>
      </LayoutContainer>
    </GradientContainerView>
  );
};

const Logo = styled.Image`
  align-self: center;
`;

const ButtonWrapper = styled.View<{ mr?: number }>`
  width: 50%;
  margin-right: ${({ mr }) => mr || 0}px;
`;

const FormContainer = styled.View`
  background-color: ${({ theme: { colors } }) => colors.neutral.white};
  border-radius: ${({ theme: { radii } }) => radii.xs}px;
  padding: 24px 14px;
`;
