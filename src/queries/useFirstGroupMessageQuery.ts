import {useQuery} from '@tanstack/react-query';
import {DecodedMessage} from '@xmtp/react-native-sdk';
import {SupportedContentTypes} from '../consts/ContentTypes';
import {useGroup} from '../hooks/useGroup';
import {QueryKeys} from './QueryKeys';

export type GroupMessagesQueryRequestData =
  | DecodedMessage<SupportedContentTypes>[]
  | undefined;
export type GroupMessagesQueryError = unknown;

export const useFirstGroupMessageQuery = (topic: string) => {
  const {data: group} = useGroup(topic);

  return useQuery<GroupMessagesQueryRequestData, GroupMessagesQueryError>({
    queryKey: [QueryKeys.FirstGroupMessage, topic],
    queryFn: async () => {
      if (!group) {
        return undefined;
      }
      const messages: DecodedMessage<SupportedContentTypes>[] =
        await group.messages({
          // limit: 1,
          // direction: 'SORT_DIRECTION_ASCENDING',
        });
      return messages;
    },
    enabled: !!group,
  });
};
