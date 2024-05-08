import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import {QueryKeys} from '../queries/QueryKeys';
import {
  ConversationMessagesQueryRequestData,
  useConversationMessagesQuery,
} from '../queries/useConversationMessagesQuery';
import {useConversation} from './useConversation';

export const useConversationMessages = (topic: string) => {
  const {data: conversation} = useConversation(topic);
  const queryClient = useQueryClient();

  useEffect(() => {
    let cancelStream: Promise<() => void> | undefined;
    cancelStream = conversation?.streamMessages(async message => {
      queryClient.setQueryData<ConversationMessagesQueryRequestData>(
        [QueryKeys.ConversationMessages, conversation.topic],
        prevMessages => [message, ...(prevMessages ?? [])],
      );
    });
    return () => {
      cancelStream?.then(callback => {
        callback();
      });
    };
  }, [conversation, queryClient]);

  return useConversationMessagesQuery(topic);
};
