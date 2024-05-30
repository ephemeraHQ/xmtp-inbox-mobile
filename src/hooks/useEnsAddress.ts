import {useEffect, useState} from 'react';
import {getEnsAddress} from 'viem/ens';
import {viemClient} from '../utils/viemClient';

export const useEnsAddress = (searchText?: string) => {
  const [ensAddress, setEnsAddress] = useState<string | null>(null);

  useEffect(() => {
    if (searchText) {
      getEnsAddress(viemClient, {
        name: searchText,
      }).then(address => {
        setEnsAddress(address);
      });
    } else {
      setEnsAddress(null);
    }
  }, [searchText]);

  return {data: ensAddress};
};
