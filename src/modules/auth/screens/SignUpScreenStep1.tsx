import React from 'react';
import styled from 'styled-components/native';
import { LayoutContainer } from '~/app/components/LayoutContainer';
import { Row } from '~/app/components/Row';
import { Typography } from '~/app/components/Typography';
import { SignUpFormStep1 } from '~/modules/auth/components/SignUpFormStep1';

export const SignUpScreenStep1 = () => {
  return (
    <LayoutContainer>
      <Row mb={4} mt={16}>
        <Typography fontGroup="h6Medium">Criar nova conta</Typography>
      </Row>
      <Row>
        <Typography fontGroup="bodySmallRegular">
          Digite corretamente seus dados para criar uma nova conta.
        </Typography>
      </Row>
      <FormContainer>
        <SignUpFormStep1 />
      </FormContainer>
    </LayoutContainer>
  );
};

export const FormContainer = styled.View`
  margin-top: 16px;
`;
