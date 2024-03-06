import {useQuery} from '@tanstack/react-query';
import {DecodedMessage} from '@xmtp/react-native-sdk';
import {SupportedContentTypes} from '../consts/ContentTypes';
import {useConversation} from '../hooks/useConversation';
import {EntityObject, createEntityObject} from '../utils/entities';
import {getMessageId} from '../utils/idExtractors';
import {QueryKeys} from './QueryKeys';

export type ConversationMessagesQueryRequestData =
  DecodedMessage<SupportedContentTypes>[];
export type ConversationMessagesQueryError = unknown;
export type ConversationMessagesQueryData = EntityObject<
  DecodedMessage<SupportedContentTypes>
>;

export const useConversationMessagesQuery = (id: string) => {
  const {data: conversation} = useConversation(id);

  return useQuery<
    ConversationMessagesQueryRequestData,
    ConversationMessagesQueryError,
    ConversationMessagesQueryData
  >({
    queryKey: [QueryKeys.ConversationMessages, id],
    queryFn: async () => {
      if (!conversation) {
        return [];
      }
      return conversation.messages();
    },
    enabled: !!conversation,
    select: data => createEntityObject(data, getMessageId),
  });
};
