import React from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import styled from 'styled-components/native';
import { Typography } from '~/app/components/Typography';
import { IAgenda } from '~/modules/schedule/types/agendas';

import { ListItem } from './anathomy/ListItem';

export interface IAgendaListProps {
  agendas: IAgenda[];
  title?: string;
}

export const AgendaList = ({ agendas, title }: IAgendaListProps) => {
  return (
    <SafeAreaView
      style={{
        flex: 1,
      }}>
      {Boolean(title) && <AgendaListTitle>{title}</AgendaListTitle>}
      <FlatList
        data={agendas}
        renderItem={({ item }) => {
          const listItemProps = {
            id: item.id,
            name: item.name,
            owner: item.user?.name || '',
            avatar: item.avatar_url,
          };
          return <ListItem {...listItemProps} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
};

export const AgendaListTitle = styled(Typography).attrs({
  fontGroup: 'h6Medium',
})`
  margin: 24px 0px;
`;
