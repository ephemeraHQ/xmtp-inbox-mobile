import {useSupportedChains, useWalletContext} from '@thirdweb-dev/react-native';
import {useEffect, useMemo, useState} from 'react';
import {formatAddress} from '../utils/formatAddress';
import {getEnsInfo} from '../utils/getEnsInfo';
import {useClient} from './useClient';

export const useContacts = () => {
  const {client} = useClient();
  const [contacts, setContacts] = useState<{name: string; address: string}[]>(
    [],
  );
  const supportedChains = useSupportedChains();
  const {clientId} = useWalletContext();

  useEffect(() => {
    const fetchConsentList = async () => {
      const list = await client?.contacts?.consentList();
      list?.forEach(async item => {
        if (item.permissionType === 'allowed') {
          getEnsInfo(item.value, supportedChains, clientId)
            .then(({ens}) => {
              setContacts(prev => [
                ...prev,
                {
                  name: ens ?? formatAddress(item.value),
                  address: item.value,
                },
              ]);
            })
            .catch(() => {
              setContacts(prev => [
                ...prev,
                {
                  name: formatAddress(item.value),
                  address: item.value,
                },
              ]);
            });
        }
      });
    };
    fetchConsentList();
  }, [client?.contacts, client?.conversations, clientId, supportedChains]);

  // Avoids hot refresh adding the same contact multiple times
  const filterContacts = useMemo(() => {
    const map = new Map<string, {name: string; address: string}>();
    const filtered = contacts.filter(contact => {
      if (map.has(contact.address)) {
        return false;
      }
      map.set(contact.address, contact);
      return true;
    });
    return filtered;
  }, [contacts]);
  return filterContacts;
};
