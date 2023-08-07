import { createAsyncThunk } from '@reduxjs/toolkit';
import { profilesApi } from '~/modules/auth/services/api/profilesApi';

export const loadUserProfilesThunk = createAsyncThunk(
  'user/loadUserProfilesThunk',
  async (_, { rejectWithValue }) => {
    try {
      const user = await profilesApi.getUserProfiles();
      return { user };
    } catch (error) {
      return rejectWithValue(error);
    }
  },
);
