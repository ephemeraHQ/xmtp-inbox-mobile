import {useMemo} from 'react';
import {getGroupName} from '../services/mmkvStorage';
import {formatAddress} from '../utils/formatAddress';
import {useClient} from './useClient';

export const useGroupName = (addresses: string[], groupId: string) => {
  const {client} = useClient();
  const data = useMemo(() => {
    const groupDisplayName = addresses.map(formatAddress).join(', ');
    return groupDisplayName;
  }, [addresses]);
  const savedGroupName = getGroupName(client?.address ?? '', groupId);
  return savedGroupName ?? data;
};
