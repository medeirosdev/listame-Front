import AsyncStorage from '@react-native-async-storage/async-storage';
import { configureStore } from '@reduxjs/toolkit';
import { PersistConfig, persistReducer, persistStore } from 'redux-persist';
import { rootReducer } from '~/app/services/store/rootReducer';
import logger from 'redux-logger';
import { env } from '~/app/env';

export function createReduxStore() {
  const persistConfig: PersistConfig<RootState> = {
    key: 'root',
    storage: AsyncStorage,
    blacklist: ['auth'],
    version: 0,
  };

  const persistedReducer = persistReducer<RootState>(
    persistConfig,
    rootReducer,
  );

  const extraMiddlewares = env.REDUX_LOGGER_ENABLED ? [logger] : [];

  return configureStore<RootState>({
    reducer: persistedReducer as any,
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware({
        immutableCheck: false,
        serializableCheck: false,
      }).concat(extraMiddlewares) as never,
  });
}

export const store = createReduxStore();
export const persistor = persistStore(store);
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof rootReducer>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
