import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { SerializedApiError } from '~/app/utils/http/interceptors/createSerializedApiErrorInterceptor';
import {
  createFacebookSessionThunk,
  createGoogleSessionThunk,
  createSessionThunk,
  restoreSessionThunk,
} from '~/modules/auth/state/thunks/authThunks';

export type SessionStatus =
  | 'GUEST'
  | 'SESSION_RESTORING'
  | 'NETWORK_ERROR'
  | 'SESSION_AUTHENTICATED'
  | 'SESSION_ERROR'
  | 'SESSION_PENDING';

export interface AuthSliceState {
  status: SessionStatus;
  error?: SerializedApiError;
  token?: string;
}

const initialState = {
  status: 'SESSION_RESTORING',
  token: '',
  error: undefined,
} as AuthSliceState;

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthStatus: (state, action: PayloadAction<AuthSliceState['status']>) => {
      state.status = action.payload;
    },
    setToken: (state, action: PayloadAction<AuthSliceState['token']>) => {
      state.token = action.payload;
    },
    resetWithNewStatus: (
      state,
      action: PayloadAction<AuthSliceState['status']>,
    ) => {
      state.token = initialState.token;
      state.error = initialState.error;
      state.status = action.payload || initialState.status;
    },
  },

  extraReducers(builder) {
    builder.addCase(createSessionThunk.pending, (state) => {
      state.status = 'SESSION_PENDING';
      state.error = undefined;
      state.token = '';
    });

    builder.addCase(createSessionThunk.fulfilled, (state, { payload }) => {
      state.status = 'SESSION_AUTHENTICATED';
      state.error = undefined;
      state.token = payload?.token;
    });

    builder.addCase(createSessionThunk.rejected, (state, { payload }) => {
      state.status = 'SESSION_ERROR';
      state.token = '';
      state.error = payload as SerializedApiError;
    });

    builder.addCase(createGoogleSessionThunk.pending, (state) => {
      state.status = 'SESSION_PENDING';
      state.error = undefined;
      state.token = '';
    });

    builder.addCase(
      createGoogleSessionThunk.fulfilled,
      (state, { payload }) => {
        state.status = 'SESSION_AUTHENTICATED';
        state.error = undefined;
        state.token = payload?.token;
      },
    );

    builder.addCase(createGoogleSessionThunk.rejected, (state, { payload }) => {
      state.status = 'SESSION_ERROR';
      state.token = '';
      state.error = payload as SerializedApiError;
    });

    builder.addCase(createFacebookSessionThunk.pending, (state) => {
      state.status = 'SESSION_PENDING';
      state.error = undefined;
      state.token = '';
    });

    builder.addCase(
      createFacebookSessionThunk.fulfilled,
      (state, { payload }) => {
        state.status = 'SESSION_AUTHENTICATED';
        state.error = undefined;
        state.token = payload?.token;
      },
    );

    builder.addCase(
      createFacebookSessionThunk.rejected,
      (state, { payload }) => {
        state.status = 'SESSION_ERROR';
        state.token = '';
        state.error = payload as SerializedApiError;
      },
    );

    builder.addCase(restoreSessionThunk.fulfilled, (state, { payload }) => {
      state.status = payload.status as AuthSliceState['status'];
      state.token = payload.token;
    });

    builder.addCase(restoreSessionThunk.rejected, (state) => {
      state.status = 'GUEST';
      state.token = '';
    });
  },
});

export const authActions = authSlice.actions;

export const authReducer = authSlice.reducer;
