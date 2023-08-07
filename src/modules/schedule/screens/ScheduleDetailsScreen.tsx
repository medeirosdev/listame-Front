import React, { FC, useEffect } from 'react';
import { LayoutContainer } from '~/app/components/LayoutContainer';
import styled, { useTheme } from 'styled-components/native';
import { Row } from '~/app/components/Row';
import { Typography } from '~/app/components/Typography';
import { PrivateBridgeNavigationScreenPropsGeneric } from '~/app/navigations/private/PrivateNavigatorBridge/types';
import { SchedulesListWithAccordion } from '~/modules/schedule/components/SchedulesListWithAccordion/SchedulesListWithAccordion';
import { useScheduleDetails } from '~/modules/schedule/hooks/useScheduleDetails';
import { ListEmptyState } from '~/modules/home/components/ListEmptyState';
import { Button } from '~/app/components/Button';
import { useAgendaFollower } from '~/modules/schedule/hooks/useAgendaFollower';
import { AgendaHeaderRow } from '~/modules/schedule/components/AgendaHeaderRow/AgendaHeaderRow';
import { usePrivateNavigation } from '~/app/navigations/private/hooks/usePrivateNavigator';
import { queryClient } from '~/app/services/queryClient';
import { agendasApi } from '~/modules/home/services/api/agendasApi';
import { useMutation } from '@tanstack/react-query';
import { useFeedbackModal } from '~/modules/auth/hooks/useFeedbackModal';
import { FeedbackModal } from '~/app/components/FeedbackModal';
import { SerializedApiError } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';
import { Icon } from '~/app/components/Icon';

export const ScheduleDetailsScreen: FC<
  PrivateBridgeNavigationScreenPropsGeneric<'ScheduleDetails'>
> = ({ route: { params } }) => {
  const {
    agenda,
    appointments,
    isAgendaOwner,
    isLoading: isAgendaLoading,
  } = useScheduleDetails(params.id);
  const theme = useTheme();
  const navigation = usePrivateNavigation();
  const { closeModal, isVisible, setIsVisible } = useFeedbackModal();

  const { isFollowing, follow, unfollow, followersCount, isLoading } =
    useAgendaFollower(params.id);

  const {
    mutate: deleteAgenda,
    isLoading: isDeletingAgenda,
    error,
  } = useMutation(agendasApi.deleteAgenda, {
    onSuccess: () => onDeleteSuccess(),
    onError: () => setIsVisible(true),
  });

  const errorMessage = (error as SerializedApiError)?.resolvedErrorMessage;
  const onDeleteSuccess = async () => {
    await queryClient.refetchQueries({ stale: true });
    navigation.canGoBack() && !navigatedFromNewPhotoScreen()
      ? navigation.goBack()
      : navigation.navigate('Home');
  };

  const navigatedFromNewPhotoScreen = () => {
    return navigation
      .getState()
      ?.routes?.some((route) => route?.name === 'NewSchedulePhoto');
  };

  if (!agenda) {
    return (
      <ListEmptyState
        message={
          isAgendaLoading ? 'Carregando...' : 'Nenhum registro para esta agenda'
        }
      />
    );
  }

  return (
    <>
      <FeedbackModal
        onClose={closeModal}
        visible={isVisible}
        isSingleAction
        confirmText="Fechar"
        message={errorMessage}
      />
      <ScheduleDetailsScreenPageContainer>
        <AgendaHeaderRow
          id={agenda.id}
          avatar={agenda.avatar_url}
          name={agenda.name}
          owner={agenda.user?.name}
        />
        <HeaderFollowersRow>
          <Typography>{followersCount} seguidores</Typography>
          {isAgendaOwner ? (
            <Button
              isLoading={isDeletingAgenda}
              variant="outlined"
              icon="delete"
              iconOrientation="left"
              iconSize={20}
              labelColor={theme.colors.task.red}
              borderColor={theme.colors.task.red}
              onPress={() => deleteAgenda(agenda.id)}>
              Excluir
            </Button>
          ) : (
            <Button
              isLoading={isAgendaLoading || isLoading}
              variant={isFollowing ? 'outlined' : 'primary'}
              onPress={isFollowing ? unfollow : follow}>
              {isFollowing ? 'Seguindo' : 'Seguir'}
            </Button>
          )}
        </HeaderFollowersRow>
        <LayoutContainer>
          <Typography fontGroup="h6Bold">Descrição</Typography>
          <DescriptionText>{agenda.description}</DescriptionText>
          <AgendaAppointmentsView>
            {!appointments?.length ? (
              <ListEmptyState message="Nenhum registro para esta agenda" />
            ) : (
              <SchedulesListWithAccordion data={appointments || []} />
            )}
          </AgendaAppointmentsView>
        </LayoutContainer>
      </ScheduleDetailsScreenPageContainer>
    </>
  );
};

export const ScheduleDetailsScreenPageContainer = styled.View`
  flex: 1;
  background-color: ${({ theme: { colors } }) => colors.neutral.white};
`;

const HeaderFollowersRow = styled(Row)`
  background-color: ${({ theme }) => theme.colors.gray[50]};
  text-align: right;
  padding: 16px 24px;
  margin-bottom: 24px;
  justify-content: space-between;
  align-items: center;
`;

const DescriptionText = styled(Typography).attrs({
  fontGroup: 'bodyRegular',
})`
  margin-top: 8px;
  margin-bottom: 24px;
`;

const AgendaAppointmentsView = styled.View`
  flex: 1;
`;
