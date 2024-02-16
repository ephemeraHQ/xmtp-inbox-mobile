import {useQueryClient} from '@tanstack/react-query';
import {DecodedMessage} from '@xmtp/react-native-sdk';
import {useEffect} from 'react';
import {ContentTypes, SupportedContentTypes} from '../consts/ContentTypes';
import {QueryKeys} from '../queries/QueryKeys';
import {useGroupMessagesQuery} from '../queries/useGroupMessagesQuery';
import {useGroup} from './useGroup';

export const useGroupMessages = (id: string) => {
  const {group} = useGroup(id);
  const queryClient = useQueryClient();

  useEffect(() => {
    const cancelStream = group?.streamGroupMessages(async message => {
      queryClient.setQueryData<DecodedMessage<SupportedContentTypes>[]>(
        [QueryKeys.GroupMessages, group?.id],
        prevMessages => [message, ...(prevMessages ?? [])],
      );
      if (message.contentTypeId === ContentTypes.GroupMembershipChange) {
        await group.sync();
        const addresses = await group.memberAddresses();
        queryClient.setQueryData(
          [QueryKeys.GroupParticipants, group?.id],
          addresses,
        );
      }
    });
    return () => {
      cancelStream?.();
    };
  }, [group, queryClient]);

  return useGroupMessagesQuery(id);
};
