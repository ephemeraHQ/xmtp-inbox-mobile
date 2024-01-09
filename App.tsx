import '@thirdweb-dev/react-native-compat';

/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */
import {Ethereum} from '@thirdweb-dev/chains';
import {
  ThirdwebProvider,
  coinbaseWallet,
  localWallet,
  metamaskWallet,
  walletConnect,
} from '@thirdweb-dev/react-native';
import {NativeBaseProvider, extendTheme} from 'native-base';
import React from 'react';
import {Config} from 'react-native-config';
import {AuthProvider} from './src/context/AuthContext';
import {ClientProvider} from './src/context/ClientContext';
import {AppNavigation} from './src/navigation/AppNavigation';
import {colors} from './src/theme/colors';

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
    <ThirdwebProvider
      activeChain={Ethereum}
      clientId={Config.THRID_WEB_CLIENT_ID}
      dAppMeta={{
        name: 'XMTP Example',
        description:
          'This basic messaging app has an intentionally unopinionated UI to help make it easier for you to build with.',
        logoUrl:
          'https://pbs.twimg.com/profile_images/1668323456935510016/2c_Ue8dF_400x400.jpg',
        url: 'https://xmtp.org',
      }}
      supportedWallets={[
        localWallet(),
        metamaskWallet(),
        coinbaseWallet(),
        walletConnect({recommended: true}),
      ]}>
      <AuthProvider>
        <NativeBaseProvider theme={theme}>
          <ClientProvider>
            <AppNavigation />
          </ClientProvider>
        </NativeBaseProvider>
      </AuthProvider>
    </ThirdwebProvider>
  );
}

export default App;
