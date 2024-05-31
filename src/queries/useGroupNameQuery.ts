import {useQuery} from '@tanstack/react-query';
import {useGroup} from '../hooks/useGroup';
import {QueryKeys} from './QueryKeys';

export interface GroupNameQueryOptions {
  limit?: number;
}

export const useGroupNameQuery = (topic: string) => {
  const {data: group} = useGroup(topic);

  return useQuery<string | undefined, unknown>({
    queryKey: [QueryKeys.GroupName, topic],
    queryFn: async () => {
      if (!group) {
        return undefined;
      }
      return group.groupName();
    },
    enabled: !!group,
  });
};
