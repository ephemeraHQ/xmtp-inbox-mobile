import {useMemo} from 'react';
import {formatAddress} from '../utils/formatAddress';

export const useGroupName = (addresses: string[]) => {
  const data = useMemo(() => {
    const groupDisplayName = addresses.map(formatAddress).join(', ');
    return groupDisplayName;
  }, [addresses]);
  return data;
};
