import {
  useEmbeddedWallet,
  type PrivyEmbeddedWalletProvider,
} from '@privy-io/expo';
import {useCallback, useEffect, useState} from 'react';

export const useProvider = () => {
  const wallet = useEmbeddedWallet();
  const [provider, setProvider] = useState<PrivyEmbeddedWalletProvider | null>(
    null,
  );

  const getProvider = useCallback(async () => {
    const walletProvider = await wallet?.getProvider?.();
    setProvider(walletProvider ?? null);
  }, [wallet]);

  useEffect(() => {
    getProvider();
  }, [getProvider]);

  return provider;
};
