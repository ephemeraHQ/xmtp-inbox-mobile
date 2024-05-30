import React, {FC, PropsWithChildren} from 'react';
import {ClientProvider} from './ClientProvider';
import {NativeBaseProvider} from './NativeBaseProvider';
import {QueryClientProvider} from './QueryClientProvider';
import {WalletProvider} from './WalletProvider';

export const Providers: FC<PropsWithChildren> = ({children}) => {
  return (
    <NativeBaseProvider>
      <WalletProvider>
        <QueryClientProvider>
          <ClientProvider>{children}</ClientProvider>
        </QueryClientProvider>
      </WalletProvider>
    </NativeBaseProvider>
  );
};
