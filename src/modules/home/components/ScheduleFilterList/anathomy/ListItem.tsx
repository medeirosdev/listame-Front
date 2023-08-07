import React, { FC } from 'react';
import styled from 'styled-components/native';
import Checkbox from 'react-native-checkbox-animated';
import { IScheduleFilterListProps } from '../ScheduleFilterList';
import { IAgenda } from '~/modules/schedule/types/agendas';
import { AgendaListItemShadowContainer } from '~/modules/schedule/components/AgendaListItem/AgendaListItemShadowContainer';
import { AgendaListItem } from '~/modules/schedule/components/AgendaListItem/AgendaListItem';

export interface IScheduleFilterListItemProps {
  id: IAgenda['id'];
  name: string;
  owner?: string;
  avatar: string | null;
  checked: boolean;
  onCheckAgenda: IScheduleFilterListProps['onCheckAgenda'];
}

export const ListItem: FC<IScheduleFilterListItemProps> = (props) => {
  const { id, checked, onCheckAgenda, ...agendaData } = props;

  return (
    <AgendaListItemShadowContainer>
      <AgendaListItem id={id} {...agendaData} />
      <ListItemCheckbox
        label=""
        onValueChange={(value) => {
          onCheckAgenda(id);
          return value;
        }}
        checked={checked}
      />
    </AgendaListItemShadowContainer>
  );
};

export const ListItemCheckbox = styled(Checkbox).attrs(
  ({ theme, checked }) => ({
    checkStyle: {
      color: theme.colors.neutral.white,
      fontSize: 14,
    },
    boxStyle: {
      backgroundColor: checked ? theme.colors.brand : 'transparent',
    },
  }),
)``;
