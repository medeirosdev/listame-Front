import { useAgendasList } from '~/modules/home/hooks/useAgendasList';

export const useAgendasSelectOptions = () => {
  const { isLoading, agendas } = useAgendasList({ isProfile: true });

  return {
    isLoading,
    agendas: agendas?.map((agenda) => ({
      value: agenda.id,
      label: agenda.name,
    })),
  };
};
