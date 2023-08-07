import { useAtomValue, useSetAtom } from 'jotai';
import React, { FC, useEffect, useMemo } from 'react';
import styled from 'styled-components/native';
import { Input } from '~/app/components/Input';
import { LayoutContainer } from '~/app/components/LayoutContainer';
import { Row } from '~/app/components/Row';
import { TextAlert } from '~/app/components/TextAlert';
import { Typography } from '~/app/components/Typography';
import { ListEmptyState } from '~/modules/home/components/ListEmptyState';
import { ScheduleFilterList } from '~/modules/home/components/ScheduleFilterList/ScheduleFilterList';
import { SelectDateBottomSheet } from '~/modules/home/components/SelectDateBottomSheet';
import { useAgendasList } from '~/modules/home/hooks/useAgendasList';
import { useDateRange } from '~/modules/home/hooks/useDateRange';
import {
  agendaCheckedFilterAtom,
  agendaDatesFilterAtom,
  agendaSelectedFiltersCountAtom,
  isFilteringAtom,
} from '~/modules/home/state/atoms/agendaFilterAtoms';
import { IAgenda } from '~/modules/schedule/types/agendas';

export const FiltersScreen: FC = () => {
  const {
    resetDateFilter,
    bottomSheetOpenType,
    setBottomSheetOpenType,
    filterDateRange,
  } = useDateRange({ dateAtom: agendaDatesFilterAtom });
  const { isLoading, agendas } = useAgendasList({ isProfile: true });
  const updateCheckedAgendas = useSetAtom(agendaCheckedFilterAtom);
  const setIsFiltering = useSetAtom(isFilteringAtom);
  const filtersActiveCount = useAtomValue(agendaSelectedFiltersCountAtom);

  const hasFiltersActive = useMemo(
    () => Boolean(filtersActiveCount),
    [filtersActiveCount],
  );

  useEffect(() => {
    setIsFiltering(true);

    return () => setIsFiltering(false);
  }, []);

  const onCheckAgenda = (agendaId: IAgenda['id']) => {
    updateCheckedAgendas((checkedAgendasState) => ({
      ...checkedAgendasState,
      [agendaId]: !checkedAgendasState?.[agendaId],
    }));
  };

  const clearFilters = () => {
    updateCheckedAgendas(null);
    resetDateFilter();
  };

  if (isLoading) {
    return (
      <LayoutContainer>
        <ListEmptyState message="Buscando agendas..." />
      </LayoutContainer>
    );
  }

  const onStartDatePress = () =>
    setBottomSheetOpenType((prev) => (prev === 'start' ? null : 'start'));
  const onEndDatePress = () =>
    setBottomSheetOpenType((prev) => (prev === 'end' ? null : 'end'));

  return (
    <>
      <FiltersScreenPageContainer>
        <Header>
          <Row mb={16}>
            {hasFiltersActive && (
              <TextAlert
                onPress={clearFilters}
                icon="delete"
                type="info"
                message={`Limpar Filtros (${filtersActiveCount})`}
              />
            )}
          </Row>
          <FilterTitle>Filtrar por data</FilterTitle>
          <Row alignItems="center" mt={16} justifyContent="space-between">
            <InputWrapper onPress={onStartDatePress}>
              <Input
                pointerEvents="none"
                editable={false}
                label="De"
                value={filterDateRange?.start?.label}
                placeholder=""
                iconName="calendar_month"
              />
            </InputWrapper>
            <InputWrapper onPress={onEndDatePress}>
              <Input
                pointerEvents="none"
                editable={false}
                label="Até"
                value={filterDateRange?.end?.label}
                placeholder=""
                iconName="calendar_month"
              />
            </InputWrapper>
          </Row>
        </Header>
        <LayoutContainer>
          <Row mt={16}>
            <FilterTitle>Filtrar por agenda</FilterTitle>
          </Row>

          {agendas?.length ? (
            <ScheduleFilterList
              agendas={agendas}
              onCheckAgenda={onCheckAgenda}
            />
          ) : (
            <ListEmptyState
              message="Você ainda não criou uma agenda."
              buttonLabel="Criar agenda"
              buttonIcon="add"
            />
          )}
        </LayoutContainer>
        {Boolean(bottomSheetOpenType) && (
          <SelectDateBottomSheet dateAtom={agendaDatesFilterAtom} />
        )}
      </FiltersScreenPageContainer>
    </>
  );
};

const FiltersScreenPageContainer = styled.View`
  flex: 1;
  background-color: ${({ theme: { colors } }) => colors.neutral.white};
`;

const Header = styled.View`
  margin: 24px;
  margin-bottom: 0px;
`;

const InputWrapper = styled.TouchableOpacity`
  flex: 0.48;
`;

const FilterTitle = styled(Typography).attrs({
  fontGroup: 'h6Medium',
})`
  color: ${({ theme: { colors } }) => colors.gray[900]};
`;
