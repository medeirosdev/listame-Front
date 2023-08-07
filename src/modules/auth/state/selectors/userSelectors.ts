import { RootState } from '~/app/services/store';

export const currentUserSelector = (state: RootState) => state.user.user;
export const isUserProfilesLoadingSelector = (state: RootState) =>
  state.user.status === 'USER_PENDING';
