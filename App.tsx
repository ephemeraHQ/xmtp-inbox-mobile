import './src/polyfills';

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
import Config from 'react-native-config';
import {mainnet} from 'viem/chains';
import {WagmiConfig, configureChains, createConfig} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';
import {ClientProvider} from './src/context/ClientContext';
import {AppNavigation} from './src/navigation/AppNavigation';
import {colors} from './src/theme/colors';

const {publicClient, webSocketPublicClient} = configureChains(
  [mainnet],
  [publicProvider()],
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

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
    <WagmiConfig config={config}>
      <ThirdwebProvider
        activeChain={Ethereum}
        autoConnect={true}
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
        <NativeBaseProvider theme={theme}>
          <ClientProvider>
            <AppNavigation />
          </ClientProvider>
        </NativeBaseProvider>
      </ThirdwebProvider>
    </WagmiConfig>
  );
}

export default App;
