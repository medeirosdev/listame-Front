import { useFacebookAuth } from '~/modules/auth/hooks/useFacebookAuth';
import { useGoogleAuth } from '~/modules/auth/hooks/useGoogleAuth';

export const useSocialAuth = () => {
  const facebookAuth = useFacebookAuth();
  const googleAuth = useGoogleAuth();

  return {
    googleAuth,
    facebookAuth,
  };
};
