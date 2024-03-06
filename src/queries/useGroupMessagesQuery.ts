import {useQuery} from '@tanstack/react-query';
import {DecodedMessage} from '@xmtp/react-native-sdk';
import {SupportedContentTypes} from '../consts/ContentTypes';
import {useGroup} from '../hooks/useGroup';
import {EntityObject, createEntityObject} from '../utils/entities';
import {getMessageId} from '../utils/idExtractors';
import {withRequestLogger} from '../utils/logger';
import {QueryKeys} from './QueryKeys';

export type GroupMessagesQueryRequestData =
  DecodedMessage<SupportedContentTypes>[];
export type GroupMessagesQueryError = unknown;
export type GroupMessagesQueryData = EntityObject<
  DecodedMessage<SupportedContentTypes>
>;

export const useGroupMessagesQuery = (id: string) => {
  const {data: group} = useGroup(id);

  return useQuery<
    GroupMessagesQueryRequestData,
    GroupMessagesQueryError,
    GroupMessagesQueryData
  >({
    queryKey: [QueryKeys.GroupMessages, id],
    queryFn: async () => {
      if (!group) {
        return [];
      }
      await withRequestLogger(group.sync(), {
        name: 'group_sync',
      });
      return group.messages() as Promise<
        DecodedMessage<SupportedContentTypes>[]
      >;
    },
    enabled: !!group,
    select: data => createEntityObject(data, getMessageId),
  });
};
