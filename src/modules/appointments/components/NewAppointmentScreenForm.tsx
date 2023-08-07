import React, { FC, useEffect } from 'react';
import { Row } from '~/app/components/Row';
import { SubmitErrorHandler, SubmitHandler, useForm } from 'react-hook-form';
import { Form } from '~/app/components/Form/Form';
import { Button } from '~/app/components/Button';
import { yupResolver } from '@hookform/resolvers/yup';
import { useMutation } from '@tanstack/react-query';
import { SerializedApiError } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';
import { FeedbackModal } from '~/app/components/FeedbackModal';
import { useFeedbackModal } from '~/modules/auth/hooks/useFeedbackModal';
import { usePrivateNavigation } from '~/app/navigations/private/hooks/usePrivateNavigator';
import { KeyboardAvoidingView, Platform, ScrollView } from 'react-native';
import { appointmentsApi } from '~/modules/appointments/services/api/appointmentsApi';
import {
  FormFieldType,
  useNewAppointmentFormInputs,
} from '~/modules/appointments/hooks/useNewAppointmentFormInputs';
import { useHeaderHeight } from '@react-navigation/elements';
import styled from 'styled-components/native';
import { useDateRange } from '~/modules/home/hooks/useDateRange';
import { newAppointmentDateAtom } from '~/modules/appointments/state/atom/appointmentsAtom';
import ICreateAppointmentDTO, {
  IAppointment,
} from '~/modules/appointments/types/appointments';
import { queryClient } from '~/app/services/queryClient';

interface INewAppointmentScreenFormProps {
  closeBotomSheet: () => void;
}

export const NewAppointmentScreenForm: FC<INewAppointmentScreenFormProps> = ({
  closeBotomSheet,
}) => {
  const height = useHeaderHeight();
  const navigation = usePrivateNavigation();
  const { isVisible, setIsVisible, closeModal } = useFeedbackModal();
  const { mutate, isLoading, error } = useMutation(appointmentsApi.create, {
    onSuccess: (data: IAppointment) => {
      queryClient.refetchQueries({ stale: true });
      navigation.replace('AppointmentDetails', {
        agendaId: data.agenda_id,
        appointmentId: data.id,
      });
    },
    onError: () => {
      setIsVisible(true);
    },
  });
  const { inputs, schema, selectedAgenda } = useNewAppointmentFormInputs();
  const errorMessage = (error as SerializedApiError)?.resolvedErrorMessage;
  const formData = useForm<FormFieldType>({
    resolver: yupResolver(schema),
  });

  const { filterDateRange, resetDateFilter } = useDateRange({
    dateAtom: newAppointmentDateAtom,
  });

  useEffect(() => {
    // TODO: validate date and time

    formData.setValue('startDate', filterDateRange?.start?.value ?? '');
    if (filterDateRange?.start?.value) closeBotomSheet();
  }, [filterDateRange?.start]);

  useEffect(() => {
    formData.setValue('endDate', filterDateRange?.end?.value);
    if (filterDateRange?.end?.value) closeBotomSheet();
  }, [filterDateRange?.end]);

  useEffect(() => {
    formData.setValue('agendaId', selectedAgenda);
  }, [selectedAgenda]);

  const formatDateToPayload = (date: string, time: string) => {
    if (!date.length || !date.includes('-')) return date;
    return `${date}T${time}:00`;
  };

  const onSubmitSuccess: SubmitHandler<FormFieldType> = (fields) => {
    const { startDate, startTime, endDate, endTime, ...rest } = fields;
    const payload: ICreateAppointmentDTO = {
      ...rest,
      status: '',
      isPrivate: false,
      startDate: formatDateToPayload(startDate, startTime),
    };

    if (endDate && endTime) {
      payload.endDate = formatDateToPayload(endDate, endTime);
    }

    mutate(payload);
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
          <Button
            fullWidth
            variant="outlined"
            onPress={() => navigation.goBack()}>
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
`;

const FooterButtonWrapper = styled(Row)`
  flex: 0.48;
`;
