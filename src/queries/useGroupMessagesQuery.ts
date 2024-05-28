import {useQuery} from '@tanstack/react-query';
import {DecodedMessage, ReactionContent} from '@xmtp/react-native-sdk';
import {ContentTypes, SupportedContentTypes} from '../consts/ContentTypes';
import {useGroup} from '../hooks/useGroup';
import {EntityObject} from '../utils/entities';
import {getMessageId} from '../utils/idExtractors';
import {QueryKeys} from './QueryKeys';

export type GroupMessagesQueryRequestData =
  DecodedMessage<SupportedContentTypes>[];
export type GroupMessagesQueryError = unknown;

export type ReactionConent = {
  count: number;
  addressSet: Set<string>;
  addedAddressSet: Set<string>;
  addedByUser: boolean;
};

export type MessageIdReactionsMapping = Record<
  string,
  Map<string, ReactionConent>
>;
export interface GroupMessagesQueryData
  extends EntityObject<DecodedMessage<SupportedContentTypes>> {
  reactionsEntities: MessageIdReactionsMapping;
}

export interface GroupMessagesQueryOptions {
  limit?: number;
}

export const useGroupMessagesQuery = (topic: string) => {
  const {data: group} = useGroup(topic);

  return useQuery<
    GroupMessagesQueryRequestData,
    GroupMessagesQueryError,
    GroupMessagesQueryData
  >({
    queryKey: [QueryKeys.GroupMessages, topic],
    queryFn: async () => {
      if (!group) {
        return [];
      }
      return group.messages() as Promise<
        DecodedMessage<SupportedContentTypes>[]
      >;
    },
    enabled: !!group,
    select: data => {
      const ids: string[] = [];
      const entities: Record<
        string,
        DecodedMessage<SupportedContentTypes>
      > = {};
      const userId = group!.client.address;
      const reactionsEntities: MessageIdReactionsMapping = {};
      data.forEach(item => {
        const messageId = getMessageId(item);
        ids.push(messageId);
        if (messageId in entities) {
          console.error('Duplicate id');
        }
        const content = item.content();
        if (
          item.contentTypeId === ContentTypes.Reaction &&
          typeof content === 'object'
        ) {
          const reaction = content as ReactionContent;
          const messageMap = reactionsEntities[reaction.reference] ?? new Map();
          if (!messageMap.has(reaction.content)) {
            messageMap.set(reaction.content, {
              count: 0,
              addressSet: new Set(),
              addedAddressSet: new Set(),
              addedByUser: false,
            });
          }

          const reactionContent = messageMap.get(reaction.content)!;
          if (!reactionContent.addressSet.has(item.senderAddress)) {
            reactionContent.addressSet.add(item.senderAddress);
            if (reaction.action === 'added') {
              reactionContent.count++;
              reactionContent.addedAddressSet.add(item.senderAddress);
              if (item.senderAddress.toLowerCase() === userId.toLowerCase()) {
                reactionContent.addedByUser = true;
              }
            }
          }
          messageMap.set(reaction.content, reactionContent);
          reactionsEntities[reaction.reference] = messageMap;
        }

        entities[messageId] = item;
      });
      return {ids, entities, reactionsEntities};
    },
  });
};
