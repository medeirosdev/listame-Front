import { format } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { IScheduleListItemProps } from '~/modules/home/components/ScheduleList/anathomy/ListItem';
import { IAppointment } from '~/modules/appointments/types/appointments';

export const getScheduleListItemData = (
  listItem: IAppointment,
): IScheduleListItemProps => {
  const date = new Date(listItem.start_date);
  return {
    hour: format(date, 'HH:mm'),
    dayWithMonth: format(date, 'dd MMM', {
      locale: ptBR,
    }),
    title: listItem.appointment_name,
    description: listItem.appointment_description,
    subtitle: listItem.user?.name,
  };
};
