import React, {FC, PropsWithChildren} from 'react';
import {WalletContext} from '../context/WalletContext';
import {WalletConnection} from '../models/WalletConnection';

export const WalletProvider: FC<PropsWithChildren> = ({children}) => {
  const [wallet, setWallet] = React.useState<WalletConnection | null>(null);

  return (
    <WalletContext.Provider
      value={{
        wallet,
        setWallet,
      }}>
      {children}
    </WalletContext.Provider>
  );
};
