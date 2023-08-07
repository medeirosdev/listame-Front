import React, { FC } from 'react';
import { NewSchedulesScreenForm } from '~/modules/schedule/components/NewScheduleScreenForm';
import { LayoutContainer } from '~/app/components/LayoutContainer';

export const NewScheduleScreen: FC = () => {
  return (
    <LayoutContainer>
      <NewSchedulesScreenForm />
    </LayoutContainer>
  );
};
