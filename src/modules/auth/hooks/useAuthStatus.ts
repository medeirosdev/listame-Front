import { useAppSelector } from '~/app/hooks/useAppSelector';
import { authStatusSelector } from '~/modules/auth/state/selectors/authSelectors';

export const useAuthStatus = () => {
  const authStatus = useAppSelector(authStatusSelector);

  const isGuest = authStatus === 'GUEST';
  const isAuthenticated = authStatus === 'SESSION_AUTHENTICATED';
  const isAuthenticationError = authStatus === 'SESSION_ERROR';
  const isAuthenticationLoading = authStatus === 'SESSION_PENDING';
  const isAuthenticatedRestoring = authStatus === 'SESSION_RESTORING';

  return {
    isGuest,
    isAuthenticated,
    isAuthenticationLoading,
    isAuthenticationError,
    isAuthenticatedRestoring,
  };
};
