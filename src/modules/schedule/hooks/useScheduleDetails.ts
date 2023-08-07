import { QueryKey, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo } from 'react';
import { queryClient } from '~/app/services/queryClient';
import { agendasApi } from '~/modules/home/services/api/agendasApi';
import { appointmentsApi } from '~/modules/appointments/services/api/appointmentsApi';
import { UserAgendaRole } from '~/modules/schedule/types/agendas';

export const useScheduleDetails = (id: string) => {
  const {
    data: agenda,
    isLoading: isAgendaLoading,
    error: agendaError,
  } = useQuery(['findAgendaById', id], getAgenda);

  const {
    data: appointments,
    isLoading: isAppointmentsLoading,
    error: appointmentsError,
  } = useQuery(['findAgendaAppointments', id], getAgendaAppointments);

  async function getAgenda({ queryKey }: { queryKey: QueryKey }) {
    const [_, agendaId] = queryKey;
    const agenda = await agendasApi.findById(agendaId as string);
    return agenda;
  }

  async function getAgendaAppointments({ queryKey }: { queryKey: QueryKey }) {
    const [_, agendaId] = queryKey;
    if (!agenda || !agendaId) return null;

    const appointments = await appointmentsApi.findByAgendaId(
      agendaId as string,
    );
    return appointments;
  }

  useEffect(() => {
    return () => {
      queryClient.invalidateQueries([
        'findAgendaById',
        'findAgendaAppointments',
      ]);
    };
  }, []);

  const isAgendaOwner = useMemo(
    () => agenda?.role === UserAgendaRole.OWNER,
    [id, agenda],
  );

  return {
    agenda,
    appointments,
    agendaError,
    appointmentsError,
    isLoading: isAgendaLoading || isAppointmentsLoading,
    isAgendaOwner,
  };
};
