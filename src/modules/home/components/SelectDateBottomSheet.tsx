import React, { useMemo, useRef } from 'react';
import { StyleSheet } from 'react-native';
import BottomSheet from 'reanimated-bottom-sheet';
import styled, { useTheme } from 'styled-components/native';
import { Typography } from '~/app/components/Typography';
import { SchedulesCalendar } from '~/modules/home/components/SchedulesCalendar/SchedulesCalendar';
import { DateData } from 'react-native-calendars';
import {
  IUseFilterByDateAtom,
  useDateRange,
} from '~/modules/home/hooks/useDateRange';

export type SelectDateBottomShetTypes = 'start' | 'end';
export type OnStartDateChange = (startDate: DateData) => void;
export type OnEndDateChange = (endDate: DateData) => void;

export const SelectDateBottomSheet = ({ dateAtom }: IUseFilterByDateAtom) => {
  const {
    bottomSheetOpenType,
    filterDateRange,
    onStartDateChange,
    onEndDateChange,
  } = useDateRange({ dateAtom });
  const theme = useTheme();
  const bottomSheetRef = useRef<BottomSheet>(null);
  const snapPoints = useMemo(() => [400, 300, 0], []);

  const styles = useMemo(() => {
    return StyleSheet.create({
      container: {
        ...theme.shadows.dp24,
        shadowColor: '#000',
        elevation: theme.elevations.dp24,
        backgroundColor: theme.colors.neutral.white,
      },
    });
  }, []);

  return (
    <BottomSheet
      enabledHeaderGestureInteraction
      enabledContentGestureInteraction={false}
      ref={bottomSheetRef}
      borderRadius={theme.radii.xxl}
      snapPoints={snapPoints}
      renderContent={() => {
      return <ContentContainerView style={styles.container}>
        <ContentTitle fontGroup="bodyLargeMedium">
          Selecione a data{' '}
          {bottomSheetOpenType === 'start' ? 'inicial' : 'final'}
        </ContentTitle>
        <SchedulesCalendar
          datesRange={[
            filterDateRange?.start?.value || '',
            filterDateRange?.end?.value || '',
          ]}
          onDateSelect={
            bottomSheetOpenType === 'start'
              ? onStartDateChange
              : onEndDateChange
          }
        />
      </ContentContainerView>
      }} />
  );
};

const ContentContainerView = styled.ScrollView``;

const ContentTitle = styled(Typography)`
  margin: 16px 0px;
  text-align: center;
`;
