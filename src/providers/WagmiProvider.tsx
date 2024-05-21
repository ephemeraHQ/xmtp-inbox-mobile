import React, {FC, PropsWithChildren} from 'react';
import {mainnet} from 'viem/chains';
import {WagmiConfig, configureChains, createConfig} from 'wagmi';
import {publicProvider} from 'wagmi/providers/public';

const {publicClient, webSocketPublicClient} = configureChains(
  [mainnet],
  [publicProvider()],
);

const config = createConfig({
  autoConnect: true,
  publicClient,
  webSocketPublicClient,
});

export const WagmiProvider: FC<PropsWithChildren> = ({children}) => {
  return <WagmiConfig config={config}>{children}</WagmiConfig>;
};
