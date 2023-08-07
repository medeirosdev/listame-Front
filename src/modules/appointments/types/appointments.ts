export interface ISchedulesListItem {
  date: string;
  appointments: IAppointment[];
}

export interface IAppointment {
  id: string;
  agenda_id: string;
  start_date: string;
  end_date: string;
  appointment_name: string;
  appointment_description: string;
  recurrence_id: null;
  notify_before: number;
  status: string;
  location: string;
  is_private: boolean;
  created_at: string;
  updated_at: string;
  user: IAgendaUser;
}

export interface IAgendaUser {
  id: string;
  name: string;
  description: string;
  avatar: string;
  is_private: string;
  members: number;
  created_by: string;
  created_at: Date;
  updated_at: Date;
  avatar_url: string;
}

export default interface ICreateAppointmentDTO {
  agendaId: string;
  startDate: string;
  endDate?: string;
  appointmentName: string;
  appointmentDescription?: string;
  notifyBefore?: number;
  recurrence?: string;
  status: string;
  location?: string;
  isPrivate: boolean;
}

export type UpdateAppointmentDTO = Partial<{
  userId: string;
  agendaIds: string[];
  startDate: string;
  endDate?: string;
  appointmentName: string;
  appointmentDescription?: string;
  status: string;
  location?: string;
  isPrivate: boolean;
  notifyBefore: number;
}>;
