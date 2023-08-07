import { api } from '~/app/services/api/api';
import { AgendaFilterParams } from '~/modules/home/services/api/agendasApi';
import { IAgenda } from '~/modules/schedule/types/agendas';
import ICreateAppointmentDTO, {
  IAppointment,
  ISchedulesListItem,
  UpdateAppointmentDTO,
} from '~/modules/appointments/types/appointments';

const BASE_URL = '/appointments';

const list = async (): Promise<ISchedulesListItem[]> => {
  const endpoint = BASE_URL.concat('/profile');
  const { data } = await api.get(endpoint);

  return data;
};

export type AppointmentsApiFilterParams = {
  agendaIds: AgendaFilterParams;
  startDate: string;
  endDate: string;
};

type AppointmentsApiFilter = (
  params: AppointmentsApiFilterParams,
) => Promise<ISchedulesListItem[]>;

const filter: AppointmentsApiFilter = async (params) => {
  const endpoint = BASE_URL.concat('/profile');

  const { data } = await api.get(endpoint, {
    params,
  });
  return data;
};

const findByAgendaId = async (
  id: IAgenda['id'],
): Promise<ISchedulesListItem[]> => {
  const endpoint = BASE_URL.concat(`/${id}`);

  const { data } = await api.get(endpoint);
  return data;
};

const create = async (appointmentData: ICreateAppointmentDTO) => {
  const endpoint = BASE_URL.concat('/');

  const { data } = await api.post(endpoint, appointmentData);
  return data;
};

const findById = async (
  appointmentId: IAppointment['id'],
): Promise<IAppointment> => {
  const endpoint = BASE_URL.concat('/profile/', appointmentId);

  const { data } = await api.get(endpoint);
  return data;
};

const deleteAppointment = async (
  appointmentId: IAppointment['id'],
  recurrenceId: IAppointment['recurrence_id'] = null,
): Promise<void> => {
  const endpoint = BASE_URL.concat('/');
  await api.delete(endpoint, {
    params: {
      appointmentId,
      reccurrenceId: recurrenceId,
    },
  });
};

const updateAppointment = async ({
  appointmentId,
  data,
}: {
  appointmentId: IAppointment['id'];
  data: UpdateAppointmentDTO;
}): Promise<void> => {
  const endpoint = BASE_URL.concat('/', appointmentId);
  await api.put(endpoint, data);
};

export const appointmentsApi = {
  list,
  filter,
  findByAgendaId,
  create,
  findById,
  deleteAppointment,
  updateAppointment,
};
