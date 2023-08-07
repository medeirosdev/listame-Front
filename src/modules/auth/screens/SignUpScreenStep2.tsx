import React from 'react';
import styled from 'styled-components/native';
import { LayoutContainer } from '~/app/components/LayoutContainer';
import { Row } from '~/app/components/Row';
import { Typography } from '~/app/components/Typography';
import { SignUpFormStep2 } from '~/modules/auth/components/SignUpFormStep2';

export const SignUpScreenStep2 = () => {
  return (
    <LayoutContainer>
      <Row mb={8} mt={16}>
        <Typography fontGroup="h6Medium">Última etapa</Typography>
      </Row>
      <Row>
        <Typography fontGroup="bodySmallRegular">
          Lembre-se de utilizar um e-mail válido pois o mesmo será usado para
          confirmar seu acesso.
        </Typography>
      </Row>
      <FormContainer>
        <SignUpFormStep2 />
      </FormContainer>
    </LayoutContainer>
  );
};

export const FormContainer = styled.View`
  margin-top: 16px;
`;
