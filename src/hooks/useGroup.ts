import {useQuery} from '@tanstack/react-query';
import {QueryKeys} from '../queries/QueryKeys';
import {useClient} from './useClient';

export const useGroup = (id: string) => {
  const {client} = useClient();

  return useQuery({
    queryKey: [client?.address, QueryKeys.Group, id],
    queryFn: async () => {
      const groups = await client?.conversations.listGroups();
      return groups || [];
    },
    select: data => {
      return data.find(c => c.id === id);
    },
  });
};
