import {useQuery} from '@tanstack/react-query';
import {useClient} from '../hooks/useClient';
import {createEntityObject} from '../utils/entities';
import {getGroupTopic} from '../utils/idExtractors';
import {QueryKeys} from './QueryKeys';

export const useGroupsQuery = () => {
  const {client} = useClient();

  return useQuery({
    queryKey: [client?.address, QueryKeys.Groups],
    queryFn: async () => {
      const groups = await client?.conversations.listGroups();
      return groups || [];
    },
    select: data => createEntityObject(data, getGroupTopic),
  });
};
