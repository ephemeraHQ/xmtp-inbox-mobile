import {Ethereum} from '@thirdweb-dev/chains';
import {
  localWallet,
  metamaskWallet,
  ThirdwebProvider as ThirdWeb,
  walletConnect,
} from '@thirdweb-dev/react-native';
import React, {FC, PropsWithChildren} from 'react';
import Config from 'react-native-config';

export const ThirdwebProvider: FC<PropsWithChildren> = ({children}) => {
  return (
    <ThirdWeb
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
        // coinbaseWallet(),
        walletConnect({recommended: true}),
      ]}>
      {children}
    </ThirdWeb>
  );
};
