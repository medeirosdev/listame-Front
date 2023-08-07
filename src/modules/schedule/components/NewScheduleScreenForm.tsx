import React, { FC, useEffect } from 'react';
import { Row } from '~/app/components/Row';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '~/app/components/Form/Form';
import { Button } from '~/app/components/Button';
import { useMutation } from '@tanstack/react-query';
import { SerializedApiError } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';
import { FeedbackModal } from '~/app/components/FeedbackModal';
import { useFeedbackModal } from '~/modules/auth/hooks/useFeedbackModal';
import { usePrivateNavigation } from '~/app/navigations/private/hooks/usePrivateNavigator';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { useHeaderHeight } from '@react-navigation/elements';
import styled from 'styled-components/native';
import { agendasApi } from '~/modules/home/services/api/agendasApi';
import { IAgenda } from '~/modules/schedule/types/agendas';
import {
  FormFieldType,
  useNewScheduleFormInputs,
} from '~/modules/schedule/hooks/useNewScheduleFormInputs';
import { yupResolver } from '@hookform/resolvers/yup';

export const NewSchedulesScreenForm: FC = () => {
  const height = useHeaderHeight();
  const navigation = usePrivateNavigation();
  const { mutate, isLoading, error } = useMutation(agendasApi.create);
  const { isVisible, setIsVisible, closeModal } = useFeedbackModal();
  const { inputs, schema, selectedPrivacy } = useNewScheduleFormInputs();
  const formData = useForm<FormFieldType>({
    resolver: yupResolver(schema),
  });
  const errorMessage = (error as SerializedApiError)?.resolvedErrorMessage;

  useEffect(() => {
    formData.setValue('isPrivate', selectedPrivacy);
  }, [selectedPrivacy]);

  const onSubmitSuccess: SubmitHandler<FormFieldType> = (fields) => {
    mutate(fields, {
      onError: () => {
        setIsVisible(true);
      },
      onSuccess: (data: IAgenda) =>
        navigation.replace('NewSchedulePhoto', { id: data.id }),
    });
  };

  const onSubmitFailure: SubmitErrorHandler<FormFieldType> = () => {};

  return (
    <>
      <FeedbackModal
        onClose={closeModal}
        visible={isVisible}
        isSingleAction
        confirmText="Fechar"
        message={errorMessage}
      />
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        keyboardVerticalOffset={height}
        style={{
          flex: 1,
        }}>
        <ScrollView
          style={{
            marginVertical: 24,
          }}>
          <Form inputs={inputs} formData={formData} />
        </ScrollView>
      </KeyboardAvoidingView>
      <ForgotPasswordFormFooter>
        <FooterButtonWrapper>
          <Button fullWidth variant="outlined">
            Cancelar
          </Button>
        </FooterButtonWrapper>
        <FooterButtonWrapper>
          <Button
            isLoading={isLoading}
            fullWidth
            onPress={formData.handleSubmit(onSubmitSuccess, onSubmitFailure)}>
            Salvar
          </Button>
        </FooterButtonWrapper>
      </ForgotPasswordFormFooter>
    </>
  );
};

const ForgotPasswordFormFooter = styled(Row)`
  justify-content: space-between;
  margin-bottom: ${Platform.OS === 'android' ? '16px' : '0px'};
`;

const FooterButtonWrapper = styled(Row)`
  flex: 0.48;
`;
