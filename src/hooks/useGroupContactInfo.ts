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
import {useClient} from './useClient';

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
  const {client} = useClient();

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

    Object.values(state).forEach((it, index) => {
      arr.push(it);
      if (it.address === client?.address) {
        return;
      }
      groupDisplayName +=
        it.displayName +
        (index === Object.values(state).length - 1 ? '' : ', ');
    });
    return {groupDisplayName, data: arr};
  }, [client?.address, state]);
  return data;
};
