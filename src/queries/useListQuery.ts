import {useQuery} from '@tanstack/react-query';
import {useClient} from '../hooks/useClient';
import {getAllListMessages} from '../utils/getAllListMessages';
import {QueryKeys} from './QueryKeys';

export const useListQuery = () => {
  const {client} = useClient();

  return useQuery({
    queryKey: [QueryKeys.List, client?.address],
    queryFn: () => getAllListMessages(client),
  });
};
