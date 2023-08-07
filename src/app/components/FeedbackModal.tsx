import React, { FC, useMemo } from 'react';
import { Modal, StyleSheet, View } from 'react-native';
import styled, { useTheme } from 'styled-components/native';
import { AppModal } from '~/app/components/AppModal';
import { Button } from '~/app/components/Button';
import { ButtonProps } from '~/app/components/Button/types';
import { Row } from '~/app/components/Row';
import { Typography } from '~/app/components/Typography';
import {
  EmailFeedbackTemplates,
  EMAIL_FEEDBACK,
} from '~/modules/auth/utils/constants/email';

export interface IFeedbackModalProps {
  cancelAction?: ButtonProps['onPress'];
  confirmAction?: ButtonProps['onPress'];
  cancelText?: string;
  confirmText?: string;
  message?: string;
  isSingleAction?: boolean;
  visible?: boolean;
  onClose: () => void;
  email?: {
    template: EmailFeedbackTemplates;
    value: string;
  };
}

export const FeedbackModal: FC<IFeedbackModalProps> = (props) => {
  const {
    cancelAction,
    confirmAction,
    cancelText = 'Cancelar',
    confirmText = 'Confirmar',
    message = '',
    isSingleAction,
    visible = false,
    onClose,
    email,
  } = props;
  const theme = useTheme();

  return (
    <AppModal onClose={onClose} visible={visible}>
      {!message && !!email?.template && (
        <>
          <Typography fontGroup="bodyRegular">
            {EMAIL_FEEDBACK[email.template].concat(' ')}
            <Typography fontGroup="bodyRegular" color={theme.colors.brand}>
              {email?.value}
            </Typography>
          </Typography>
        </>
      )}
      {!!message && <Typography fontGroup="bodyRegular">{message}</Typography>}
      <Row mt={24} justifyContent="space-evenly">
        {!isSingleAction && (
          <ButtonWithMargin
            onPress={() => {
              cancelAction?.();
              onClose();
            }}
            variant="outlined">
            {cancelText}
          </ButtonWithMargin>
        )}
        <Button
          fullWidth={isSingleAction}
          onPress={() => {
            confirmAction?.();
            onClose();
          }}>
          {confirmText}
        </Button>
      </Row>
    </AppModal>
  );
};

const ButtonWithMargin = styled(Button)`
  margin-right: 8px;
`;
