import React, { FC } from 'react';
import { Typography } from '~/app/components/Typography';
import styled from 'styled-components/native';
import { EditProfileForm } from '~/modules/profile/components/EditProfileForm';
import { useEditProfileNameFormInputs } from '~/modules/profile/hooks/useEditProfileNameFormInputs';
import { LayoutContainer } from '~/app/components/LayoutContainer';

export const EditProfileNameScreen: FC = () => {
  const editProfileNameForm = useEditProfileNameFormInputs();

  return (
    <LayoutContainer my={24}>
      <EditProfileForm {...editProfileNameForm} />
    </LayoutContainer>
  );
};

export const UserTextInfo = styled(Typography)`
  color: ${({ theme: { colors } }) => colors.primary.blue[700]};
  align-self: center;
`;

export const UserDataWrapper = styled.View`
  margin: 12px 0px;
`;
