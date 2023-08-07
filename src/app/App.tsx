import React from 'react';
import { Navigations } from './navigations';
import { ThemeProvider } from 'styled-components/native';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '~/app/services/queryClient';
import { Provider as StoreProvider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import { theme } from './theme';
import { persistor, store } from '~/app/services/store';

const App = () => (
  <ThemeProvider theme={theme}>
    <StoreProvider store={store}>
      <PersistGate persistor={persistor}>
        <QueryClientProvider client={queryClient}>
          <Navigations />
        </QueryClientProvider>
      </PersistGate>
    </StoreProvider>
  </ThemeProvider>
);

export default App;
