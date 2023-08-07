import { useEffect, useState } from 'react';
import * as Facebook from 'expo-auth-session/providers/facebook';
import { useAppDispatch } from '~/app/hooks/useAppDispatch';
import { createFacebookSessionThunk } from '~/modules/auth/state/thunks/authThunks';
import * as WebBrowser from 'expo-web-browser';
import { env } from '~/app/env';

WebBrowser.maybeCompleteAuthSession();

export const useFacebookAuth = () => {
  const dispatch = useAppDispatch();
  const [facebookSignInLoading, setFacebookSignInLoading] = useState(false);
  const [facebookAuthRequest, facebookAuthResponse, facebookAuthPromptAsync] =
    Facebook.useAuthRequest({
      clientId: env.FACEBOOK_APP_ID,
    });

  useEffect(() => {
    if (facebookAuthResponse?.type) {
      setFacebookSignInLoading(false);

      if (facebookAuthResponse.type === 'success') {
        const { authentication } = facebookAuthResponse;
        if (authentication?.accessToken) {
          dispatch(createFacebookSessionThunk(authentication.accessToken));
        }
      }
    }
  }, [facebookAuthResponse]);

  const facebookSignIn = () => {
    setFacebookSignInLoading(true);
    facebookAuthPromptAsync({
      useProxy: false,
    });
  };

  return {
    signInDisabled: !facebookAuthRequest,
    signInLoading: facebookSignInLoading,
    signIn: facebookSignIn,
  };
};
