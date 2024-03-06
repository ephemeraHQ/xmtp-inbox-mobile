import {useMemo} from 'react';
import {mmkvStorage} from '../services/mmkvStorage';
import {formatAddress} from '../utils/formatAddress';
import {useClient} from './useClient';

export const useGroupName = (addresses: string[], groupId: string) => {
  const {client} = useClient();
  const data = useMemo(() => {
    const groupDisplayName = addresses.map(formatAddress).join(', ');
    return groupDisplayName;
  }, [addresses]);
  const savedGroupName = mmkvStorage.getGroupName(
    client?.address ?? '',
    groupId,
  );
  return savedGroupName ?? data;
};
