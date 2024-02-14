import {useQuery} from '@tanstack/react-query';
import {useClient} from '../hooks/useClient';
import {getAllListMessages} from '../utils/getAllListMessages';
import {withRequestLogger} from '../utils/logger';
import {QueryKeys} from './QueryKeys';

export const useListQuery = () => {
  const {client} = useClient();
  return useQuery({
    queryKey: [QueryKeys.List, client?.address],
    queryFn: () =>
      withRequestLogger(getAllListMessages(client), {
        name: 'all_messages_list',
      }),
    enabled: Boolean(client),
  });
};
