import React, {createContext} from 'react';
import {WalletConnection} from '../models/WalletConnection';

interface WalletContextValue {
  wallet: WalletConnection | null;
  setWallet: React.Dispatch<React.SetStateAction<WalletConnection | null>>;
}

export const WalletContext = createContext<WalletContextValue>({
  wallet: null,
  setWallet: () => {
    throw new Error('setWallet not implemented');
  },
});

export const useWalletContext = () => {
  return React.useContext(WalletContext);
};
