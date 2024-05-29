import {useEffect, useState} from 'react';
import {mmkvStorage} from '../services/mmkvStorage';
import {formatAddress} from '../utils/formatAddress';
import {getEnsInfo} from '../utils/getEnsInfo';

interface ContactInfoState {
  displayName: string | null;
  avatarUrl: string | null;
  loading: boolean;
}

export const useContactInfo = (address?: string) => {
  const [state, setState] = useState<ContactInfoState>({
    displayName: null,
    avatarUrl: null,
    loading: true,
  });

  useEffect(() => {
    if (!address) {
      return;
    }
    const cachedName = mmkvStorage.getEnsName(address);
    const cachedAvatar = mmkvStorage.getEnsAvatar(address);
    setState({
      avatarUrl: cachedAvatar ?? null,
      displayName: cachedName ?? formatAddress(address),
      loading: true,
    });

    getEnsInfo(address)
      .then(({ens, avatarUrl}) => {
        if (ens) {
          mmkvStorage.saveEnsName(address, ens);
          if (avatarUrl && address) {
            mmkvStorage.saveEnsAvatar(address, avatarUrl);
          } else {
            mmkvStorage.clearEnsAvatar(address);
          }
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
  }, [address]);

  useEffect(() => {
    if (!address) {
      return;
    }
    if (state.displayName) {
      mmkvStorage.saveEnsName(address, state.displayName);
    }
  }, [state.displayName, address]);

  return state;
};
