import { useAtomValue } from 'jotai';
import React, { forwardRef } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { agendasCheckedIdsAtom } from '~/modules/home/state/atoms/agendaFilterAtoms';
import { getScheduleFilterListItemData } from '~/modules/home/utils/mappers/getScheduleFilterListItemData';
import { IAgenda } from '~/modules/schedule/types/agendas';

import { ListItem } from './anathomy/ListItem';

export interface IScheduleFilterListProps {
  agendas: IAgenda[];
  onCheckAgenda: (agendaId: IAgenda['id']) => void;
}

export const ScheduleFilterList = forwardRef<
  SafeAreaView,
  IScheduleFilterListProps
>(({ agendas, onCheckAgenda }, ref) => {
  const checkedAgendas = useAtomValue(agendasCheckedIdsAtom);
  if (!agendas?.length) return <></>;

  return (
    <SafeAreaView ref={ref}>
      <FlatList
        data={agendas}
        renderItem={({ item }) => {
          const listItemProps = getScheduleFilterListItemData(
            item,
            checkedAgendas,
          );
          return <ListItem {...listItemProps} onCheckAgenda={onCheckAgenda} />;
        }}
        keyExtractor={(item) => item.id}
      />
    </SafeAreaView>
  );
});
