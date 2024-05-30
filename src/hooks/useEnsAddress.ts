import {useEffect, useState} from 'react';
import {getEnsAddress} from 'viem/ens';
import {viemClient} from '../utils/viemClient';
import {useDebounce} from './useDebounce';

export const useEnsAddress = (searchText?: string) => {
  const [ensAddress, setEnsAddress] = useState<string | null>(null);
  const debouncedSearchText = useDebounce(searchText, 250);

  useEffect(() => {
    if (debouncedSearchText) {
      getEnsAddress(viemClient, {
        name: debouncedSearchText,
      })
        .then(address => {
          setEnsAddress(address);
        })
        .catch(e => {
          console.error('Error getting ENS address', e);
        });
    } else {
      setEnsAddress(null);
    }
  }, [debouncedSearchText]);

  return {data: ensAddress};
};
