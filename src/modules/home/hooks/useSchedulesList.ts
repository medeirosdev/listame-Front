import { useQuery } from '@tanstack/react-query';
import { appointmentsApi } from '~/modules/appointments/services/api/appointmentsApi';
import { ISchedulesListItem } from '~/modules/appointments/types/appointments';

type UseSchedulesListReturn = {
  schedulesList?: ISchedulesListItem[];
  isSchedulesLoading?: boolean;
};

interface IUseSchedulesList {
  (): UseSchedulesListReturn;
}

export const useSchedulesList: IUseSchedulesList = () => {
  const { data: schedulesList, isLoading: isSchedulesLoading } = useQuery(
    ['appointmentsProfile'],
    appointmentsApi.list,
  );

  return {
    isSchedulesLoading,
    schedulesList,
  };
};
