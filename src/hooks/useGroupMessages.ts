import {useQueryClient} from '@tanstack/react-query';
import {useEffect} from 'react';
import {ContentTypes} from '../consts/ContentTypes';
import {QueryKeys} from '../queries/QueryKeys';
import {
  GroupMessagesQueryRequestData,
  useGroupMessagesQuery,
} from '../queries/useGroupMessagesQuery';
import {useGroup} from './useGroup';

export const useGroupMessages = (id: string) => {
  const {data: group} = useGroup(id);
  const queryClient = useQueryClient();

  useEffect(() => {
    const cancelStream = group?.streamGroupMessages(async message => {
      queryClient.setQueryData<GroupMessagesQueryRequestData>(
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
      cancelStream?.then(callback => {
        callback();
      });
    };
  }, [group, queryClient]);

  return useGroupMessagesQuery(id);
};
