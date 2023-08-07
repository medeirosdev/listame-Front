import { useEffect, useState } from 'react';
import * as Google from 'expo-auth-session/providers/google';
import { createGoogleSessionThunk } from '~/modules/auth/state/thunks/authThunks';
import { useAppDispatch } from '~/app/hooks/useAppDispatch';
import * as WebBrowser from 'expo-web-browser';
import { env } from '~/app/env';

WebBrowser.maybeCompleteAuthSession();

export const useGoogleAuth = () => {
  const dispatch = useAppDispatch();
  const [googleSignInLoading, setGoogleSignInLoading] = useState(false);

  const [googleAuthRequest, googleAuthResponse, googleAuthPromptAsync] =
    Google.useAuthRequest({
      androidClientId: env.GOOGLE_ANDROID_CLIENT_ID,
      iosClientId: env.GOOGLE_IOS_CLIENT_ID,
      webClientId: env.GOOGLE_WEB_CLIENT_ID,
    });

  useEffect(() => {
    if (googleAuthResponse?.type) {
      setGoogleSignInLoading(false);

      if (googleAuthResponse.type === 'success') {
        const { authentication } = googleAuthResponse;
        if (authentication?.accessToken) {
          dispatch(createGoogleSessionThunk(authentication.accessToken));
        }
      }
    }
  }, [googleAuthResponse]);

  const googleSignIn = () => {
    setGoogleSignInLoading(true);
    googleAuthPromptAsync({
      useProxy: false,
    });
  };

  return {
    signInDisabled: !googleAuthRequest,
    signInLoading: googleSignInLoading,
    signIn: googleSignIn,
  };
};
