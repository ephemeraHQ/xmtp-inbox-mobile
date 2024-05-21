import React, {FC, PropsWithChildren} from 'react';
import {ClientProvider} from './ClientProvider';
import {NativeBaseProvider} from './NativeBaseProvider';
import {QueryClientProvider} from './QueryClientProvider';
import {ThirdwebProvider} from './ThirdwebProvider';
import {WagmiProvider} from './WagmiProvider';

export const Providers: FC<PropsWithChildren> = ({children}) => {
  return (
    <WagmiProvider>
      <ThirdwebProvider>
        <NativeBaseProvider>
          <QueryClientProvider>
            <ClientProvider>{children}</ClientProvider>
          </QueryClientProvider>
        </NativeBaseProvider>
      </ThirdwebProvider>
    </WagmiProvider>
  );
};
