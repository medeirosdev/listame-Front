import React, { forwardRef } from 'react';
import { SafeAreaView, FlatList } from 'react-native';
import { getScheduleListItemData } from '~/modules/home/utils/mappers/getScheduleListItemData';
import {
  IAppointment,
  ISchedulesListItem,
} from '~/modules/appointments/types/appointments';
import { ListItem } from './anathomy/ListItem';
import { usePrivateNavigation } from '~/app/navigations/private/hooks/usePrivateNavigator';

export interface IScheduleListProps {
  appointments: ISchedulesListItem['appointments'];
}

export const ScheduleList = forwardRef<SafeAreaView, IScheduleListProps>(
  ({ appointments }, ref) => {
    const navigation = usePrivateNavigation();
    const navigateToAppointmentDetails = (
      appointmentId: IAppointment['id'],
      agendaId: IAppointment['agenda_id'],
    ) => {
      navigation.navigate('AppointmentDetails', {
        agendaId,
        appointmentId,
      });
    };

    if (!appointments?.length) return <></>;

    return (
      <SafeAreaView ref={ref}>
        <FlatList
          data={appointments}
          renderItem={({ item }) => {
            const listItemProps = getScheduleListItemData(item);
            return (
              <ListItem
                {...listItemProps}
                onPress={() =>
                  navigateToAppointmentDetails(item.id, item.agenda_id)
                }
              />
            );
          }}
          keyExtractor={(item) => item.id}
        />
      </SafeAreaView>
    );
  },
);
