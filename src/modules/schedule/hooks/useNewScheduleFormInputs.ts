import { useMemo, useState } from 'react';
import { IFormInputProps } from '~/app/components/Form/types';
import * as yup from 'yup';
import { ICreateAgendaDTO } from '~/modules/schedule/types/agendas';

export type FormFieldType = ICreateAgendaDTO;

export const useNewScheduleFormInputs = () => {
  const [selectedPrivacy, setSelectedPrivacy] = useState<boolean>(false);

  const scheduleNameInput = useMemo<IFormInputProps>(
    () => ({
      name: 'name',
      rules: {
        required: true,
      },
      returnKeyType: 'next',
      label: 'Nome da agenda',
      placeholder: 'Digite o nome da agenda',
      blurOnSubmit: false,
      outsideLabel: 'Agenda',
    }),
    [],
  );

  const privacySelectInput = useMemo<IFormInputProps>(
    () => ({
      type: 'select',
      options: [
        {
          label: 'Aberta ao público',
          value: false,
        },
        {
          label: 'Fechada',
          value: true,
        },
      ],
      name: 'isPrivate',
      rules: {
        required: true,
      },
      returnKeyType: 'next',
      label: 'Privacidade da agenda',
      placeholder: 'Selecione',
      blurOnSubmit: false,
      outsideLabel: 'Privacidade',
      onSelectedOption: (option) => setSelectedPrivacy(Boolean(option?.value)),
    }),
    [],
  );

  const descriptionInput = useMemo<IFormInputProps>(
    () => ({
      type: 'textarea',
      name: 'description',
      rules: {
        required: true,
      },
      returnKeyType: 'next',
      label: '',
      placeholder: 'Digite aqui...',
      blurOnSubmit: false,
      outsideLabel: 'Descriçao da agenda',
    }),
    [],
  );

  const schema = useMemo(() => {
    return yup
      .object({
        name: yup.string().required('Título obrigatório'),
        isPrivate: yup.boolean().required('Selecione a privacidade'),
        description: yup.string().required('Descrição obrigatória.'),
      })
      .required();
  }, []);

  return {
    inputs: [scheduleNameInput, privacySelectInput, descriptionInput],
    selectedPrivacy,
    schema,
  };
};
