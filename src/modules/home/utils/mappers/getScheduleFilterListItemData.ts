import { IScheduleFilterListItemProps } from '~/modules/home/components/ScheduleFilterList/anathomy/ListItem';
import { IAgenda } from '~/modules/schedule/types/agendas';

export const getScheduleFilterListItemData = (
  listItem: IAgenda,
  checkedAgendas: IAgenda['id'][],
): Omit<IScheduleFilterListItemProps, 'onCheckAgenda'> => {
  return {
    id: listItem.id,
    name: listItem.name,
    owner: listItem.user?.name || '',
    avatar: listItem.avatar_url,
    checked: checkedAgendas.includes(listItem.id),
  };
};
