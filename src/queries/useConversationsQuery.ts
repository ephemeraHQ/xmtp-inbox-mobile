import {useQuery} from '@tanstack/react-query';
import {useClient} from '../hooks/useClient';
import {createEntityObject} from '../utils/entities';
import {getConversationId} from '../utils/idExtractors';
import {QueryKeys} from './QueryKeys';

export const useConversationsQuery = () => {
  const {client} = useClient();

  return useQuery({
    queryKey: [client?.address, QueryKeys.Conversations],
    queryFn: async () => {
      const conversations = await client?.conversations.list();
      return conversations || [];
    },
    select: data => createEntityObject(data, getConversationId),
  });
};
