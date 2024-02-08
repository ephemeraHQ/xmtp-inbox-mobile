import {useSupportedChains, useWalletContext} from '@thirdweb-dev/react-native';
import {useEffect, useMemo, useState} from 'react';
import {
  getEnsAvatar,
  getEnsName,
  saveEnsAvatar,
  saveEnsName,
} from '../services/mmkvStorage';
import {formatAddress} from '../utils/formatAddress';
import {getEnsInfo} from '../utils/getEnsInfo';

type GroupContactInfoState = Record<
  string,
  {
    address: string;
    avatarUrl: string | null;
    displayName: string | null;
  }
>;

export const useGroupContactInfo = (addresses: string[]) => {
  const [state, setState] = useState<GroupContactInfoState>({});
  const supportedChains = useSupportedChains();
  const {clientId} = useWalletContext();

  useEffect(() => {
    addresses.forEach(address => {
      const cachedName = getEnsName(address);
      const cachedAvatar = getEnsAvatar(address);

      getEnsInfo(address, supportedChains, clientId)
        .then(({ens, avatarUrl}) => {
          if (ens) {
            saveEnsName(address, ens);
            if (avatarUrl) {
              saveEnsAvatar(address, avatarUrl);
            }
            setState(prev => ({
              ...prev,
              [address]: {
                address,
                displayName: ens,
                avatarUrl,
              },
            }));
          } else {
            setState(prev => ({
              ...prev,
              [address]: {
                address,
                displayName: formatAddress(address),
                avatarUrl: null,
              },
            }));
          }
        })
        .catch(() => {
          setState(prev => ({
            ...prev,
            [address]: {
              address,
              displayName: cachedName ?? formatAddress(address),
              avatarUrl: cachedAvatar ?? null,
            },
          }));
        });
    });
  }, [addresses, supportedChains, clientId]);

  const data = useMemo(() => {
    const arr: {
      address: string;
      avatarUrl: string | null;
      displayName: string | null;
    }[] = [];

    let groupDisplayName = '';

    Object.values(state).forEach(it => {
      arr.push(it);
      groupDisplayName += it.displayName + ', ';
    });
    return {groupDisplayName, data: arr};
  }, [state]);
  return data;
};
