import {useMutation} from '@tanstack/react-query';
import {useGroup} from '../hooks/useGroup';
import {QueryKeys} from '../queries/QueryKeys';
import {queryClient} from '../services/queryClient';
import {MutationKeys} from './MutationKeys';

export interface GroupNameQueryOptions {
  limit?: number;
}

export const useGroupNameMutation = (topic: string) => {
  const {data: group} = useGroup(topic);

  return useMutation({
    mutationKey: [MutationKeys.GroupName, topic],
    mutationFn: async (newGroupName: string) => {
      return group?.updateGroupName(newGroupName);
    },
    onSuccess: (_, newGroupName) => {
      queryClient.setQueryData([QueryKeys.GroupName, topic], newGroupName);
    },
  });
};
