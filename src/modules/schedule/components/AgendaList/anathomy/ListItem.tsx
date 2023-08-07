import React, { FC } from 'react';
import { IAgenda } from '~/modules/schedule/types/agendas';
import { AgendaListItemShadowContainer } from '~/modules/schedule/components/AgendaListItem/AgendaListItemShadowContainer';
import { AgendaListItem } from '~/modules/schedule/components/AgendaListItem/AgendaListItem';

export interface IAgendaListItemProps {
  id: IAgenda['id'];
  name: string;
  owner?: string;
  avatar: string | null;
}

export const ListItem: FC<IAgendaListItemProps> = (props) => {
  return (
    <AgendaListItemShadowContainer>
      <AgendaListItem {...props} />
    </AgendaListItemShadowContainer>
  );
};
