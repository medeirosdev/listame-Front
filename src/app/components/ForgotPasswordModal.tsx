import React, { FC } from 'react';
import { AppModal, IAppModalProps } from '~/app/components/AppModal';
import { Typography } from '~/app/components/Typography';
import { ForgotPasswordForm } from '~/modules/auth/components/ForgotPasswordForm';

export const ForgotPasswordModal: FC<IAppModalProps> = (props) => {
  return (
    <AppModal {...props}>
      <ForgotPasswordForm variant="modal" closeParentModal={props.onClose} />
    </AppModal>
  );
};
