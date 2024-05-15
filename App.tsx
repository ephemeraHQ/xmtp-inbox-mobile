import './src/polyfills';

import {PrivyProvider} from '@privy-io/expo';
import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import {NativeBaseProvider, extendTheme} from 'native-base';
import React from 'react';
import {ClientProvider} from './src/context/ClientContext';
import {AppNavigation} from './src/navigation/AppNavigation';
import {colors} from './src/theme/colors';

const queryClient = new QueryClient();

function App(): React.JSX.Element {
  const newColorTheme = {
    primary: {
      900: colors.actionPrimary,
      800: colors.actionPrimary,
      700: colors.actionPrimary,
      600: colors.actionPrimary,
      500: colors.actionPrimary,
      400: colors.actionPrimary,
      300: colors.actionPrimary,
    },
    brand: {
      900: colors.actionPrimary,
      800: colors.actionPrimary,
      700: colors.actionPrimary,
      600: colors.actionPrimary,
      500: colors.actionPrimary,
      400: colors.actionPrimary,
      300: colors.actionPrimary,
    },
  };
  const theme = extendTheme({colors: newColorTheme});
  return (
    <PrivyProvider appId="TODO:">
      <NativeBaseProvider theme={theme}>
        <QueryClientProvider client={queryClient}>
          <ClientProvider>
            <AppNavigation />
          </ClientProvider>
        </QueryClientProvider>
      </NativeBaseProvider>
    </PrivyProvider>
  );
}

export default App;
