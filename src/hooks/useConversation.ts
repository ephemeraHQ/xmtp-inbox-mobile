import {useMemo} from 'react';
import {useConversationsQuery} from '../queries/useConversationsQuery';

export const useConversation = (id: string) => {
  const conversationsQuery = useConversationsQuery();

  return useMemo(() => {
    const {data, ...rest} = conversationsQuery;
    const {entities} = data ?? {};

    const conversationData = entities?.[id];
    return {data: conversationData, ...rest};
  }, [conversationsQuery, id]);
};
