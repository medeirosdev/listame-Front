import React, { FC, useState } from 'react';
import { AgendaList } from '~/modules/schedule/components/AgendaList/AgendaList';
import { LayoutContainer } from '~/app/components/LayoutContainer';
import styled from 'styled-components/native';
import { Row } from '~/app/components/Row';
import { Input } from '~/app/components/Input';
import { useAgendasList } from '~/modules/home/hooks/useAgendasList';
import { ListEmptyState } from '~/modules/home/components/ListEmptyState';

export const SchedulesSearchScreen: FC = () => {
  const { setSearch, agendas, isLoading } = useAgendasList({
    isProfile: false,
  });

  return (
    <SchedulesSearchScreenPageContainer>
      <HeaderRow>
        <Input
          label="Pesquisar"
          placeholder="Encontre uma agenda, tarefa ou perfil"
          variant="rounded"
          iconName="search"
          onChangeText={(text) => setSearch(text)}
        />
      </HeaderRow>
      <LayoutContainer>
        {agendas?.length ? (
          <AgendaList title="Agendas" agendas={agendas} />
        ) : (
          <ListEmptyState
            isLoading={isLoading}
            message="Nenhuma agenda encontrada"
          />
        )}
      </LayoutContainer>
    </SchedulesSearchScreenPageContainer>
  );
};

export const SchedulesSearchScreenPageContainer = styled.View`
  flex: 1;
  background-color: ${({ theme: { colors } }) => colors.neutral.white};
`;

const HeaderRow = styled(Row)`
  background-color: ${({ theme }) => theme.colors.primary.blue[50]};
  padding: 16px 24px;
`;
