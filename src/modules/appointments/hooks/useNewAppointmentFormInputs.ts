import { useMemo, useState } from 'react';
import { IFormInputProps } from '~/app/components/Form/types';
import * as yup from 'yup';
import ICreateAppointmentDTO from '~/modules/appointments/types/appointments';
import { newAppointmentDateAtom } from '~/modules/appointments/state/atom/appointmentsAtom';
import { useDateRange } from '~/modules/home/hooks/useDateRange';
import { useAgendasSelectOptions } from '~/modules/appointments/hooks/useAgendasSelectOptions';
import { IAgenda } from '~/modules/schedule/types/agendas';

export type FormFieldType = ICreateAppointmentDTO & {
  startTime: string;
  endTime?: string;
};

const timeInputMask = [/\d/, /\d/, ':', /\d/, /\d/];

export const useNewAppointmentFormInputs = () => {
  const [selectedAgenda, setSelectedAgenda] = useState<IAgenda['id']>('');
  const [selectedRecurrence, setSelectedRecurrence] = useState<string>('');
  const { filterDateRange } = useDateRange({
    dateAtom: newAppointmentDateAtom,
  });

  const { agendas } = useAgendasSelectOptions();
  const appointmentNameInput = useMemo<IFormInputProps>(
    () => ({
      name: 'appointmentName',
      rules: {
        required: true,
      },
      returnKeyType: 'next',
      label: 'Título',
      placeholder: 'Digite o título da tarefa',
      blurOnSubmit: false,
      outsideLabel: 'Título',
    }),
    [],
  );

  const startTimeInput = useMemo<IFormInputProps>(
    () => ({
      type: 'time',
      name: 'startTime',
      rules: {
        required: true,
        maxLength: 5,
      },
      returnKeyType: 'next',
      label: 'Ás *',
      placeholder: 'Obrigatório',
      blurOnSubmit: false,
      maxLength: 5,
      mask: timeInputMask,
    }),
    [],
  );

  const startDateInputRow = useMemo<IFormInputProps>(
    () => ({
      type: 'date',
      name: 'startDate',
      rules: {
        required: true,
      },
      returnKeyType: 'next',
      label: 'Início *',
      placeholder: 'Obrigatório',
      blurOnSubmit: false,
      outsideLabel: 'Data e hora',
      sideInput: startTimeInput,
      dateAtom: newAppointmentDateAtom,
      dateRangeType: 'start',
      value: filterDateRange?.start?.label,
    }),
    [startTimeInput, filterDateRange?.start],
  );

  const endTimeInput = useMemo<IFormInputProps>(
    () => ({
      type: 'time',
      name: 'endTime',
      rules: {
        required: true,
        maxLength: 5,
      },
      returnKeyType: 'next',
      label: 'Ás',
      placeholder: 'Opcional',
      blurOnSubmit: false,
      mask: timeInputMask,
    }),
    [],
  );

  const endDateInputRow = useMemo<IFormInputProps>(
    () => ({
      type: 'date',
      name: 'endDate',
      rules: {
        required: true,
      },
      returnKeyType: 'next',
      label: 'Término',
      placeholder: 'Opcional',
      blurOnSubmit: false,
      sideInput: endTimeInput,
      dateAtom: newAppointmentDateAtom,
      dateRangeType: 'end',
      selfControlled: true,
      value: filterDateRange?.end?.label,
    }),
    [endTimeInput, filterDateRange],
  );

  const agendaSelectInput = useMemo<IFormInputProps>(
    () => ({
      type: 'select',
      options: agendas,
      name: 'agendaId',
      rules: {
        required: true,
      },
      returnKeyType: 'next',
      label: 'Agenda',
      placeholder: 'Selecionar agenda',
      blurOnSubmit: false,
      outsideLabel: 'Adicionar em',
      onSelectedOption: (option) => setSelectedAgenda(String(option?.value)),
    }),
    [agendas],
  );

  const recurrenceSelectInput = useMemo<IFormInputProps>(
    () => ({
      type: 'select',
      options: [
        { label: 'Não repetir', value: '0' },
        { label: 'Diariamente', value: '1' },
        { label: 'Semanalmente', value: '2' },
      ],
      name: 'recurrence',
      rules: {
        required: true,
      },
      returnKeyType: 'next',
      label: 'Recorrência',
      placeholder: 'Selecionar período',
      blurOnSubmit: false,
      outsideLabel: 'Repetir',
      onSelectedOption: (option) =>
        setSelectedRecurrence(String(option?.value)),
    }),
    [],
  );

  const locationInput = useMemo<IFormInputProps>(
    () => ({
      name: 'location',
      rules: {
        required: true,
      },
      returnKeyType: 'next',
      label: 'Endereço ou link',
      placeholder: 'Adicionar local do evento',
      blurOnSubmit: false,
      outsideLabel: 'Local',
      autoCapitalize: 'none',
    }),
    [],
  );

  const appointmentDescriptionInput = useMemo<IFormInputProps>(
    () => ({
      type: 'textarea',
      name: 'appointmentDescription',
      rules: {
        required: true,
      },
      returnKeyType: 'next',
      label: '',
      placeholder: 'Digite aqui...',
      blurOnSubmit: false,
      outsideLabel: 'Descriçao da tarefa',
    }),
    [],
  );

  const schema = useMemo(() => {
    return yup
      .object({
        appointmentName: yup.string().required('Título obrigatório'),
        startDate: yup.string().required('Data de início obrigatória'),
        startTime: yup.string().required('Horário obrigatório'),
        endDate: yup.string(),
        endTime: yup.string(),
        agendaId: yup.string().required('A agenda é obrigatória.'),
        recurrence: yup.string().oneOf(['0', '1', '2']),
        location: yup.string().required('Local é obrigatório'),
        appointmentDescription: yup.string().required('Descrição obrigatória.'),
      })
      .required();
  }, []);

  return {
    inputs: [
      appointmentNameInput,
      startDateInputRow,
      endDateInputRow,
      agendaSelectInput,
      recurrenceSelectInput,
      locationInput,
      appointmentDescriptionInput,
    ],
    schema,
    selectedAgenda,
    selectedRecurrence,
  };
};
