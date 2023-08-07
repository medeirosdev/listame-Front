import React from 'react';
import { GradientContainerView } from '~/app/components/GradientContainerView';
import { LayoutContainer } from '~/app/components/LayoutContainer';
import { ForgotPasswordForm } from '~/modules/auth/components/ForgotPasswordForm';
import logo from '~/app/assets/logo/bootsplash_logo@1,5x.png';
import { Image } from 'react-native';

export const ForgotPasswordScreen = () => {
  return (
    <GradientContainerView>
      <LayoutContainer isCentered>
        <Image source={logo} />
        <ForgotPasswordForm />
      </LayoutContainer>
    </GradientContainerView>
  );
};
