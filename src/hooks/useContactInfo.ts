import {useSupportedChains, useWalletContext} from '@thirdweb-dev/react-native';
import {useEffect, useState} from 'react';
import {getEnsAvatar, getEnsName, saveEnsName} from '../services/mmkvStorage';
import {formatAddress} from '../utils/formatAddress';
import {getEnsInfo} from '../utils/getEnsInfo';

interface ContactInfoState {
  displayName: string | null;
  avatarUrl: string | null;
  loading: boolean;
}

export const useContactInfo = (address: string) => {
  const [state, setState] = useState<ContactInfoState>({
    displayName: null,
    avatarUrl: null,
    loading: true,
  });
  const supportedChains = useSupportedChains();
  const {clientId} = useWalletContext();

  useEffect(() => {
    const cachedName = getEnsName(address);
    const cachedAvatar = getEnsAvatar(address);
    setState({
      avatarUrl: cachedAvatar ?? null,
      displayName: cachedName ?? formatAddress(address),
      loading: true,
    });

    getEnsInfo(address, supportedChains, clientId)
      .then(({ens, avatarUrl}) => {
        if (ens) {
          setState({
            displayName: ens ?? formatAddress(address),
            loading: false,
            avatarUrl: avatarUrl ?? null,
          });
        }
      })
      .catch(() => {
        setState({
          avatarUrl: cachedAvatar ?? null,
          displayName: cachedName ?? formatAddress(address),
          loading: false,
        });
      });
  }, [address, supportedChains, clientId]);

  useEffect(() => {
    if (state.displayName) {
      saveEnsName(address, state.displayName);
    }
  }, [state.displayName, address]);

  return state;
};
