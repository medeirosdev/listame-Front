import { format } from 'date-fns';
import { addDays } from 'date-fns/esm';
import React, { FC, useMemo } from 'react';
import { Calendar, DateData, LocaleConfig } from 'react-native-calendars';
import { MarkingProps } from 'react-native-calendars/src/calendar/day/marking';
import { useTheme } from 'styled-components';
import styled from 'styled-components/native';
import { Icon } from '~/app/components/Icon';
import * as DateConstants from '~/app/utils/constants/date';
import { useSchedulesCalendar } from '~/modules/home/hooks/useSchedulesCalendar';

LocaleConfig.locales['pt-BR'] = {
  monthNames: DateConstants.monthNames,
  monthNamesShort: DateConstants.monthNamesShort,
  dayNames: DateConstants.dayNames,
  dayNamesShort: DateConstants.dayNamesShort,
  today: 'Hoje',
};

LocaleConfig.defaultLocale = 'pt-BR';

export interface ISchedulesCalendarProps {
  appointmentsDates?: string[];
  onDateSelect?: (dateObject: DateData) => void;
  datesRange?: string[];
}

export const SchedulesCalendar: FC<ISchedulesCalendarProps> = (props) => {
  const { appointmentsDates, datesRange = [] } = props;

  const theme = useTheme();
  const { handleCalendarOpen, selectedDate, setSelectedDate } =
    useSchedulesCalendar();

  const marked = useMemo(() => {
    const markedDates: Record<string, MarkingProps> = {};

    if (selectedDate?.dateString) {
      markedDates[selectedDate?.dateString] = {
        selected: true,
      };

      if (datesRange?.length) {
        const edgesRangeColor = theme.colors.primary.blue[700];
        const betweenRangeColor = theme.colors.primary.blue[400];

        const [startDate, endDate] = datesRange;
        const startDateObject = new Date(startDate);
        const endDateObject = new Date(endDate);

        markedDates[startDate] = {
          ...markedDates[startDate],
          color: edgesRangeColor,
          startingDay: true,
          textColor: theme.colors.neutral.white,
        };

        let betweenDate = addDays(startDateObject, 1);
        while (betweenDate.getUTCDate() < endDateObject.getUTCDate()) {
          const index = betweenDate.toISOString().split('T')[0];

          markedDates[index] = {
            color: betweenRangeColor,
            textColor:
              betweenDate.getUTCDate() === new Date().getDate()
                ? theme.colors.brand
                : theme.colors.gray[100],
          };
          betweenDate = addDays(betweenDate, 1);
        }

        markedDates[endDate] = {
          ...markedDates[endDate],
          color: edgesRangeColor,
          endingDay: true,
          textColor: theme.colors.neutral.white,
        };
      }
    }

    if (appointmentsDates) {
      appointmentsDates.forEach((date) => {
        const formattedDate = format(new Date(date), 'yyyy-MM-dd');
        markedDates[formattedDate] = {
          ...markedDates[formattedDate],
          marked: true,
          dots: [{ key: 'single-dot', color: theme.colors.task.orange }],
          type: 'multi-dot',
        };
      });
    }
    return markedDates;
  }, [selectedDate?.dateString, datesRange]);

  return (
    <CalendarWrapper>
      <Calendar
        initialDate={selectedDate?.dateString}
        markingType={datesRange?.length ? 'period' : 'multi-dot'}
        markedDates={marked}
        onDayPress={(dateObject) => {
          setSelectedDate(dateObject);
          handleCalendarOpen();
          props?.onDateSelect?.(dateObject);
        }}
        monthFormat={'MMMM'}
        renderArrow={(direction) => (
          <Icon
            color={theme.colors.primary.blue[400]}
            name={
              direction === 'right' ? 'arrow_forward_ios' : 'arrow_back_ios_new'
            }
          />
        )}
        onPressArrowLeft={(subtractMonth) => subtractMonth()}
        onPressArrowRight={(addMonth) => addMonth()}
        enableSwipeMonths={true}
        theme={{
          selectedDayBackgroundColor: theme.colors.brand,
          todayBackgroundColor: theme.colors.primary.blue[50],
        }}
      />
    </CalendarWrapper>
  );
};

const CalendarWrapper = styled.View`
  flex: 1;
`;
