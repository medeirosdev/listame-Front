import { QueryKey, useQuery } from '@tanstack/react-query';
import { appointmentsApi } from '~/modules/appointments/services/api/appointmentsApi';
import { useScheduleDetails } from '~/modules/schedule/hooks/useScheduleDetails';

export interface IUseAppointmentDetailsParams {
  appointmentId: string;
  agendaId: string;
}

export const useAppointmentDetails = (params: IUseAppointmentDetailsParams) => {
  const {
    agenda,
    isLoading: isAgendaLoading,
    isAgendaOwner,
  } = useScheduleDetails(params.agendaId);
  const { data: appointment, isLoading: isAppointmentLoading } = useQuery(
    ['findAppointmentById', params.appointmentId],
    getAppointment,
  );

  async function getAppointment({ queryKey }: { queryKey: QueryKey }) {
    const [_, appointmentId] = queryKey;
    const appointment = await appointmentsApi.findById(appointmentId as string);
    return appointment;
  }

  return {
    agenda,
    appointment,
    isLoading: isAgendaLoading || isAppointmentLoading,
    isAgendaOwner,
  };
};
