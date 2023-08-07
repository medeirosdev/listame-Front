import { combineReducers } from 'redux';
import { authReducer } from '~/modules/auth/state/slices/authSlices';
import { userReducer } from '~/modules/auth/state/slices/userSlices';

export const rootReducer = combineReducers({
  auth: authReducer,
  user: userReducer,
});
