import React, { createRef, FC, useMemo } from 'react';
import { Row } from '~/app/components/Row';
import { useNavigation } from '@react-navigation/native';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '~/app/components/Form/Form';
import { PublicNavigation } from '~/app/navigations/public/types';
import { FormFieldType } from '~/modules/auth/hooks/useSignUpFormInputs';
import { TouchableOpacity, View } from 'react-native';
import { Button } from '~/app/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { SerializedApiError } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';
import { useForgotPasswordFormInputs } from '~/modules/auth/hooks/useForgotPasswordFormInputs';
import { passwordApi } from '~/modules/auth/services/api/passwordApi';
import { Typography } from '~/app/components/Typography';
import { useTheme } from 'styled-components';
import { FeedbackModal } from '~/app/components/FeedbackModal';
import { useFeedbackModal } from '~/modules/auth/hooks/useFeedbackModal';
import styled from 'styled-components/native';
import { IInputProps } from '~/app/components/Input/types';
import { IAppModalProps } from '~/app/components/AppModal';

interface IForgotPasswordForm {
  variant?: 'default' | 'modal';
  closeParentModal?: IAppModalProps['onClose'];
}

export const ForgotPasswordForm: FC<IForgotPasswordForm> = ({
  variant,
  closeParentModal,
}) => {
  const theme = useTheme();
  const isModal = useMemo(() => variant === 'modal', [variant]);
  const navigation = useNavigation<PublicNavigation>();
  const { mutate, isLoading, error } = useMutation(passwordApi.forgot);
  const { isVisible, setIsVisible, closeModal } = useFeedbackModal();
  const errorMessage = (error as SerializedApiError)?.resolvedErrorMessage;
  const submitButtonRef = createRef<TouchableOpacity>();
  const { inputs, schema } = useForgotPasswordFormInputs({
    inputVariant: isModal ? 'default' : 'fullWhite',
    handleSubmit: triggerSubmit,
  });
  const formData = useForm<FormFieldType>({
    resolver: yupResolver(schema),
  });

  function triggerSubmit() {
    if (!error && !isLoading) mutate(formData.getValues());
  }

  const onSubmitSuccess: SubmitHandler<FormFieldType> = (fields) => {
    mutate(fields, {
      onSettled() {
        setIsVisible(true);
      },
    });
  };

  const onSubmitFailure: SubmitErrorHandler<FormFieldType> = () => {};

  const handleFeedbackModalClose = () => {
    closeModal();

    if (isModal && !error) {
      closeParentModal?.();
    }
  };

  return (
    <>
      <FeedbackModal
        onClose={handleFeedbackModalClose}
        visible={isVisible}
        isSingleAction
        confirmText="Fechar"
        email={{
          template: 'FORGOT_PASSWORD',
          value: formData.getValues().email,
        }}
        message={errorMessage}
      />
      <View>
        <Row mb={8}>
          <Typography
            fontGroup="h6Medium"
            color={isModal ? '' : theme.colors.neutral.white}>
            Esqueci minha senha
          </Typography>
        </Row>
        <Row mb={32}>
          <Typography
            fontGroup="bodyRegular"
            color={isModal ? '' : theme.colors.neutral.white}>
            Digite seu e-mail para recuperar sua senha.
          </Typography>
        </Row>
        <Form formData={formData} inputs={inputs} />
      </View>
      <ForgotPasswordFormFooter>
        <Row mb={16} mt={isModal ? 16 : 0}>
          <Button
            ref={submitButtonRef}
            fullWidth
            variant={isModal ? 'primary' : 'whiteFilled'}
            isLoading={isLoading}
            onPress={formData.handleSubmit(onSubmitSuccess, onSubmitFailure)}>
            Recuperar senha
          </Button>
        </Row>
        <Row>
          <Button
            fullWidth
            variant={isModal ? 'outlined' : 'whiteOutlined'}
            onPress={() =>
              isModal ? closeParentModal?.() : navigation.navigate('Login')
            }>
            Cancelar
          </Button>
        </Row>
      </ForgotPasswordFormFooter>
    </>
  );
};

const ForgotPasswordFormFooter = styled.View`
  align-items: center;
`;
