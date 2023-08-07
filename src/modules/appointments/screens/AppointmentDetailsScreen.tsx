import { useMutation } from '@tanstack/react-query';
import { format } from 'date-fns';
import React, { FC, useEffect, useState } from 'react';
import { ActivityIndicator, Platform, ScrollView } from 'react-native';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';
import { Button } from '~/app/components/Button';
import { FeedbackModal } from '~/app/components/FeedbackModal';
import { SelectOption } from '~/app/components/Form/types';
import { Icon } from '~/app/components/Icon';
import { LayoutContainer } from '~/app/components/LayoutContainer';
import { Row } from '~/app/components/Row';
import { Typography } from '~/app/components/Typography';
import { usePrivateNavigation } from '~/app/navigations/private/hooks/usePrivateNavigator';
import { PrivateBridgeNavigationScreenPropsGeneric } from '~/app/navigations/private/PrivateNavigatorBridge/types';
import { queryClient } from '~/app/services/queryClient';
import { SerializedApiError } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';
import { AppointmentNotificationBottomSheet } from '~/modules/appointments/components/AppointmentNotificationBottomSheet';
import { useAppointmentDetails } from '~/modules/appointments/hooks/useAppointmentDetails';
import { appointmentsApi } from '~/modules/appointments/services/api/appointmentsApi';
import { DELETE_APPOINTMENT_CONFIRM_TEXT } from '~/modules/appointments/utils/constants/modal';
import { useFeedbackModal } from '~/modules/auth/hooks/useFeedbackModal';
import { ListEmptyState } from '~/modules/home/components/ListEmptyState';
import { AgendaHeaderRow } from '~/modules/schedule/components/AgendaHeaderRow/AgendaHeaderRow';

const notifyOptions = [
  { label: 'No horário', value: 1 },
  { label: '5 minutos antes', value: 5 },
  { label: '10 minutos antes', value: 10 },
  { label: '15 minutos antes', value: 15 },
  { label: '30 minutos antes', value: 30 },
  { label: '60 minutos antes', value: 60 },
  { label: '1 dia antes', value: 1440 },
  { label: 'Não notificar', value: -1 },
];

export const AppointmentDetailsScreen: FC<
  PrivateBridgeNavigationScreenPropsGeneric<'AppointmentDetails'>
> = ({ route: { params } }) => {
  const theme = useTheme();
  const navigation = usePrivateNavigation();
  const [isBottomSheetOpen, setIsBottomSheetOpen] = useState(false);
  const [selectedNotificationTime, setSelectedNotificationTime] =
    useState<SelectOption | null>(null);
  const { agenda, appointment, isLoading, isAgendaOwner } =
    useAppointmentDetails(params);

  const { closeModal, isVisible, setIsVisible } = useFeedbackModal();
  const {
    mutate: deleteAppointment,
    isLoading: isDeletingAppointment,
    error,
  } = useMutation(appointmentsApi.deleteAppointment, {
    onSuccess: () => onDeleteSuccess(),
    onError: () => setIsVisible(true),
  });

  const {
    mutate: updateAppointment,
    isLoading: isUpdatingAppointment,
    error: updateError,
  } = useMutation(appointmentsApi.updateAppointment, {
    onError: () => setIsVisible(true),
  });

  const errorMessage = ((error ?? updateError) as SerializedApiError)
    ?.resolvedErrorMessage;
  const onDeleteSuccess = async () => {
    await queryClient.refetchQueries({ stale: true });
    navigation.navigate('Home');
  };

  const handleSelectedNotificationTime = (selected: SelectOption) => {
    setSelectedNotificationTime(selected);
    updateAppointment({
      appointmentId: params.appointmentId,
      data: { notifyBefore: Number(selected.value || 0) },
    });
  };

  const updateNotifyLabel = () => {
    const savedTime = notifyOptions.find(
      (option) => option.value === appointment?.notify_before,
    );
    setSelectedNotificationTime(savedTime || null);
  };

  useEffect(() => {
    updateNotifyLabel();
  }, [appointment]);

  if (!appointment?.id) {
    return (
      <ListEmptyState
        message={
          isLoading ? 'Carregando...' : 'Nenhum registro para esta tarefa'
        }
      />
    );
  }

  return (
    <>
      <FeedbackModal
        onClose={closeModal}
        visible={isVisible}
        isSingleAction={Boolean(error)}
        confirmText={Boolean(error) ? 'Fechar' : 'Confirmar'}
        cancelAction={closeModal}
        confirmAction={
          Boolean(error)
            ? () => {}
            : () => deleteAppointment(params.appointmentId)
        }
        message={errorMessage ?? DELETE_APPOINTMENT_CONFIRM_TEXT}
      />
      {agenda && (
        <AgendaHeaderRow
          id={agenda.id}
          avatar={agenda?.avatar_url}
          name={agenda.name}
          owner={agenda.user?.name}
        />
      )}
      <AppointmentDataContainer>
        <ScrollView>
          <AppointmentDataRow>
            <StrongTitle>
              {appointment?.appointment_name || 'Sem Nome'}
            </StrongTitle>
          </AppointmentDataRow>
          <AppointmentDataRow>
            <Row alignItems="center">
              <AppointmentDataDefaultIcon name="calendar_month" />
              <AppointmentDataDefaultText>
                {format(new Date(appointment?.start_date), 'dd/MM/yyyy') ||
                  'Sem Data'}
              </AppointmentDataDefaultText>
            </Row>
          </AppointmentDataRow>
          <AppointmentDataRow>
            <Row alignItems="center">
              <AppointmentDataDefaultIcon name="schedule" />
              <AppointmentDataDefaultText>
                {format(new Date(appointment?.start_date), 'HH:mm') ||
                  'Sem Horário'}
              </AppointmentDataDefaultText>
            </Row>
            <Row alignItems="center">
              <Button
                iconOrientation="left"
                iconSize={20}
                icon="notifications"
                variant="text"
                isLoading={isUpdatingAppointment}
                onPress={() => setIsBottomSheetOpen(true)}
                labelColor={theme?.colors.primary.blue[700]}>
                {selectedNotificationTime?.label || 'Lembrar-me'}
              </Button>
            </Row>
          </AppointmentDataRow>
          <AppointmentDataRow>
            <Row alignItems="center">
              <AppointmentDataDefaultIcon name="pin_drop" />
              <AppointmentDataDefaultText>
                {appointment?.location || 'Sem Local'}
              </AppointmentDataDefaultText>
            </Row>
          </AppointmentDataRow>
          <AppointmentDataRow hideBorder>
            <Row
              dir="column"
              alignSelf="flex-start"
              justifyContent="flex-start"
              alignItems="flex-start">
              <StrongTitle>Descrição</StrongTitle>
              <Description>
                {appointment?.appointment_description || 'Sem descrição'}
              </Description>
            </Row>
          </AppointmentDataRow>
        </ScrollView>

        {isAgendaOwner && (
          <AppointmentFooter>
            <AppointmentFooterButtonWrapper>
              <Button
                fullWidth
                variant="outlined"
                onPress={() => navigation.goBack()}>
                Cancelar
              </Button>
            </AppointmentFooterButtonWrapper>
            <AppointmentFooterButtonWrapper>
              <Button
                isLoading={isDeletingAppointment}
                fullWidth
                onPress={() => setIsVisible(true)}>
                Excluir
              </Button>
            </AppointmentFooterButtonWrapper>
          </AppointmentFooter>
        )}
      </AppointmentDataContainer>
      {isBottomSheetOpen && (
        <AppointmentNotificationBottomSheet
          options={notifyOptions}
          onClose={() => setIsBottomSheetOpen(false)}
          onSelect={handleSelectedNotificationTime}
        />
      )}
    </>
  );
};

export const AppointmentDataContainer = styled(LayoutContainer)`
  justify-content: space-between;
`;

export const AppointmentDataRow = styled(Row)<{ hideBorder?: boolean }>`
  padding: 24px 0px;
  border-bottom-width: ${({ hideBorder }) => (hideBorder ? '0px' : '1px')};
  border-bottom-color: ${({ theme: { colors } }) => colors.gray[300]};
  align-items: center;
  justify-content: space-between;
`;

export const AppointmentDataDefaultText = styled(Typography).attrs(
  ({ theme }) => ({
    color: theme.colors.gray[900],
    fontGroup: 'bodyMedium',
    numberOfLines: 2,
  }),
)`
  overflow: hidden;
  max-width: 90%;
`;

export const AppointmentDataDefaultIcon = styled(Icon).attrs(({ theme }) => ({
  color: theme.colors.gray[600],
  size: 20,
}))`
  margin-right: 14px;
`;

export const StrongTitle = styled(Typography).attrs(({ theme }) => ({
  color: theme.colors.gray[900],
  fontGroup: 'h6Bold',
}))``;

export const Description = styled(Typography).attrs(({ theme }) => ({
  color: theme.colors.gray[900],
  fontGroup: 'bodyRegular',
  numberOfLines: 4,
}))`
  overflow: hidden;
  max-height: 50%;
`;

const AppointmentFooter = styled(Row)`
  justify-content: space-between;
  margin-bottom: ${Platform.OS === 'android' ? '16px' : '0px'};
`;

const AppointmentFooterButtonWrapper = styled(Row)`
  flex: 0.48;
`;
