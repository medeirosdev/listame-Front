import { createAsyncThunk } from '@reduxjs/toolkit';
import { sessionApi } from '~/modules/auth/services/api/sessionApi';

import {
  deleteTokenFromSafeStorage,
  getTokenFromSafeStorage,
  setTokenInSafeStorage,
} from '~/modules/auth/services/storage/safeStorage';

import { SessionStatus } from '~/modules/auth/state/slices/authSlices';
import { userActions } from '~/modules/auth/state/slices/userSlices';
import { ILoginRequest } from '~/modules/auth/types/api/session';

export const createSessionThunk = createAsyncThunk(
  'auth/createSessionThunk',
  async (credentials: ILoginRequest, { dispatch, rejectWithValue }) => {
    try {
      const data = await sessionApi.login(credentials);
      const { token, user } = data;
      await dispatch(userActions.setUser(user));
      await setTokenInSafeStorage(token);

      return {
        token,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createGoogleSessionThunk = createAsyncThunk(
  'auth/createGoogleSessionThunk',
  async (googleAccessToken: string, { dispatch, rejectWithValue }) => {
    try {
      const data = await sessionApi.loginWithGoogle(googleAccessToken);
      const { token, user } = data;
      await dispatch(userActions.setUser(user));
      await setTokenInSafeStorage(token);

      return {
        token,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const createFacebookSessionThunk = createAsyncThunk(
  'auth/createFacebookSessionThunk',
  async (facebookAccessToken: string, { dispatch, rejectWithValue }) => {
    try {
      const data = await sessionApi.loginWithFacebook(facebookAccessToken);
      const { token, user } = data;
      await dispatch(userActions.setUser(user));
      await setTokenInSafeStorage(token);

      return {
        token,
      };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);

export const restoreSessionThunk = createAsyncThunk(
  'auth/restoreSessionThunk',
  async (_, { rejectWithValue }) => {
    const token = await getTokenFromSafeStorage();

    let status: SessionStatus = 'GUEST';

    if (!token) return rejectWithValue('Token not provided');

    const valid = await sessionApi.checkTokenValid(token);
    if (!valid) {
      await deleteTokenFromSafeStorage();
      return rejectWithValue('Token invalid');
    }

    status = 'SESSION_AUTHENTICATED';

    return {
      token,
      status,
    };
  },
);
