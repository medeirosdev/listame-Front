import React, { FC } from 'react';
import { LayoutContainer } from '~/app/components/LayoutContainer';
import { NewAppointmentScreenForm } from '~/modules/appointments/components/NewAppointmentScreenForm';
import { newAppointmentDateAtom } from '~/modules/appointments/state/atom/appointmentsAtom';
import { SelectDateBottomSheet } from '~/modules/home/components/SelectDateBottomSheet';
import { useDateRange } from '~/modules/home/hooks/useDateRange';

export const NewAppointmentScreen: FC = () => {
  const { bottomSheetOpenType, setBottomSheetOpenType } = useDateRange({
    dateAtom: newAppointmentDateAtom,
  });

  return (
    <>
      <LayoutContainer>
        <NewAppointmentScreenForm
          closeBotomSheet={() => setBottomSheetOpenType(null)}
        />
      </LayoutContainer>
      {Boolean(bottomSheetOpenType) && (
        <SelectDateBottomSheet dateAtom={newAppointmentDateAtom} />
      )}
    </>
  );
};
