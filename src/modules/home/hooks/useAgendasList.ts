import { QueryKey, useQuery } from '@tanstack/react-query';
import { useEffect, useMemo, useState } from 'react';
import { agendasApi } from '~/modules/home/services/api/agendasApi';

export interface IUseAgendasListParams {
  isProfile?: boolean;
}

export const useAgendasList = (params: IUseAgendasListParams = {}) => {
  const [search, setSearch] = useState('');
  const [isProfile, setIsProfile] = useState(params.isProfile);
  const {
    data: listAgendasResponse,
    isLoading,
    error,
  } = useQuery(['listAgendas', isProfile], getAgenda);

  async function getAgenda() {
    const agenda = isProfile
      ? await agendasApi.profileList()
      : await agendasApi.list();

    return agenda;
  }

  const getAgendas = () => {
    if (search)
      return listAgendasResponse?.filter((agenda) =>
        agenda.name.toLowerCase().match(new RegExp(search, 'i')),
      );
    return listAgendasResponse;
  };

  useEffect(() => {
    setIsProfile(params.isProfile);
  }, [params]);

  return {
    agendas: getAgendas(),
    isLoading,
    error,
    fetchAgendas: () => {},
    search,
    setSearch,
  };
};
