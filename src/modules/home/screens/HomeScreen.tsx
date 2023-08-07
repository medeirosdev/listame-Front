import React, { FC, useMemo } from 'react';
import {
  ActivityIndicator,
  Alert,
  TouchableWithoutFeedback,
} from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { Button } from '~/app/components/Button';
import { Icon } from '~/app/components/Icon';
import { LayoutContainer } from '~/app/components/LayoutContainer';
import { Row } from '~/app/components/Row';
import { Shadow } from '~/app/components/Shadow';
import { Typography } from '~/app/components/Typography';
import { usePrivateNavigation } from '~/app/navigations/private/hooks/usePrivateNavigator';
import { colors } from '~/app/theme/colors';
import { capitalize } from '~/app/utils/format/capitalize';
import { FloatingActionButton } from '~/modules/home/components/FloatingActionButton/FloatingActionButton';
import { FloatingActionButtonItem } from '~/modules/home/components/FloatingActionButton/FloatingActionButtonItem';
import { ListEmptyState } from '~/modules/home/components/ListEmptyState';
import { SchedulesCalendar } from '~/modules/home/components/SchedulesCalendar/SchedulesCalendar';
import { useCalendarSelection } from '~/modules/home/hooks/useCalendarSelection';
import { useScheduleListFilter } from '~/modules/home/hooks/useScheduleListFilter';
import { useSchedulesCalendar } from '~/modules/home/hooks/useSchedulesCalendar';
import { useSchedulesList } from '~/modules/home/hooks/useSchedulesList';
import { SchedulesListWithAccordion } from '~/modules/schedule/components/SchedulesListWithAccordion/SchedulesListWithAccordion';

export const HomeScreen: FC = () => {
  const theme = useTheme();
  const navigation = usePrivateNavigation();
  const { isOpen, handleCalendarOpen, selectedMonth } = useSchedulesCalendar();
  const { schedulesList, isSchedulesLoading } = useSchedulesList();
  const { isFilterLoading, filtersActiveCount, filteredList, resetFilters } =
    useScheduleListFilter();

  const hasFiltersActive = useMemo(
    () => Boolean(filtersActiveCount),
    [filtersActiveCount],
  );

  const { scheduleIndex, scheduleListRef, calendarDates } =
    useCalendarSelection({
      list:
        hasFiltersActive && filteredList?.length ? filteredList : schedulesList,
    });

  const isListEmpty = useMemo(
    () =>
      Boolean(
        (hasFiltersActive && !filteredList?.length) || !schedulesList?.length,
      ),
    [hasFiltersActive, filteredList, schedulesList],
  );

  const isLoading = useMemo(
    () => isSchedulesLoading || isFilterLoading,
    [isSchedulesLoading, isFilterLoading],
  );

  return (
    <HomeScreenPageContainer>
      <HeaderRow
        paddingHorizontal={24}
        paddingVertical={20}
        alignItems="center"
        justifyContent="space-between"
        mb={24}>
        {isOpen ? (
          <SchedulesCalendar appointmentsDates={calendarDates} />
        ) : (
          <>
            <Button
              variant="text"
              iconOrientation="left"
              icon="calendar_month"
              iconSize={20}
              onPress={handleCalendarOpen}>
              {capitalize(selectedMonth)}
            </Button>
            <FilterIconWrapper
              onPress={() => {
                navigation.navigate('Filters');
              }}>
              {isFilterLoading ? (
                <ActivityIndicator />
              ) : (
                <>
                  <Icon
                    name="filter_list"
                    size={24}
                    color={
                      hasFiltersActive
                        ? theme.colors.brand
                        : theme.colors.gray[700]
                    }
                  />
                  <FilterIconCountIndicator active={hasFiltersActive}>
                    {Boolean(hasFiltersActive) && (
                      <Typography color={colors.neutral.white}>
                        {filtersActiveCount}
                      </Typography>
                    )}
                  </FilterIconCountIndicator>
                </>
              )}
            </FilterIconWrapper>
          </>
        )}
      </HeaderRow>
      <LayoutContainer>
        {isLoading || isListEmpty ? (
          <ListEmptyState
            message={
              isLoading ? 'Carregando...' : 'Nenhum resultado encontrado.'
            }
            buttonLabel={!isLoading && hasFiltersActive ? 'Limpar filtros' : ''}
            buttonIcon={!isLoading && hasFiltersActive ? 'delete' : ''}
            buttonAction={
              !isLoading && hasFiltersActive ? resetFilters : undefined
            }
          />
        ) : (
          <SchedulesListWithAccordion
            ref={scheduleListRef}
            scheduleIndex={scheduleIndex}
            data={hasFiltersActive ? filteredList : schedulesList ?? []}
          />
        )}
      </LayoutContainer>
      <TouchableWithoutFeedback>
          <FloatingActionButton>
            <FloatingActionButtonItem
              onPress={() => navigation.navigate('NewSchedule')}
              label="Nova agenda"
              icon="menu_book"
            />
            <FloatingActionButtonItem
              onPress={() => navigation.navigate('NewAppointment')}
              label="Nova tarefa"
              icon="schedule"
            />
          </FloatingActionButton>
      </TouchableWithoutFeedback>
    </HomeScreenPageContainer>
  );
};

const HomeScreenPageContainer = styled.View`
  flex: 1;
  background-color: ${({ theme }) => theme.colors.neutral.white};
`;

const HeaderRow = styled(Row)`
  background-color: ${({ theme }) => theme.colors.primary.blue[50]};
`;

const FilterIconWrapper = styled.TouchableOpacity`
  position: relative;
`;

const FilterIconCountIndicator = styled.View<{ active?: boolean }>`
  background-color: ${({ active, theme }) =>
    active ? theme.colors.brand : 'transparent'};
  position: absolute;
  right: 20px;
  top: 20px;
  width: 24px;
  height: 24px;
  align-items: center;
  border-radius: ${({ theme: { radii } }) => `${radii.full}px`};
`;
