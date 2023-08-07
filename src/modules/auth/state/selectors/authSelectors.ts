import { RootState } from '~/app/services/store';

export const authStatusSelector = (state: RootState) => state.auth.status;
export const authErrorMessageSelector = (state: RootState) =>
  state.auth.error?.resolvedErrorMessage;
