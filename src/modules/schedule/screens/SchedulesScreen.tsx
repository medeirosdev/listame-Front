import React, { FC, useState } from 'react';
import { AgendaList } from '~/modules/schedule/components/AgendaList/AgendaList';
import { LayoutContainer } from '~/app/components/LayoutContainer';
import styled from 'styled-components/native';
import { Row } from '~/app/components/Row';
import { Input } from '~/app/components/Input';
import { useAgendasList } from '~/modules/home/hooks/useAgendasList';
import { ListEmptyState } from '~/modules/home/components/ListEmptyState';
import { usePrivateNavigation } from '~/app/navigations/private/hooks/usePrivateNavigator';

export const SchedulesScreen: FC = () => {
  const { setSearch, agendas, isLoading } = useAgendasList({
    isProfile: true,
  });
  const navigation = usePrivateNavigation();

  return (
    <SchedulesScreenPageContainer>
      <HeaderRow>
        <Input
          label="Pesquisar"
          placeholder="Encontre uma agenda que você segue"
          variant="rounded"
          iconName="search"
          onChangeText={(text) => setSearch(text)}
        />
      </HeaderRow>
      <LayoutContainer>
        {agendas?.length ? (
          <AgendaList title="Minhas Agendas" agendas={agendas} />
        ) : (
          <ListEmptyState
            isLoading={isLoading}
            message="Você ainda não segue nenhuma agenda"
            buttonLabel="Buscar Agendas"
            buttonIcon="search"
            buttonAction={() => navigation.navigate('SchedulesSearch')}
          />
        )}
      </LayoutContainer>
    </SchedulesScreenPageContainer>
  );
};

export const SchedulesScreenPageContainer = styled.View`
  flex: 1;
  background-color: ${({ theme: { colors } }) => colors.neutral.white};
`;

const HeaderRow = styled(Row)`
  background-color: ${({ theme }) => theme.colors.primary.blue[50]};
  padding: 16px 24px;
`;
