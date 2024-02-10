import {useQuery} from '@tanstack/react-query';
import {useGroup} from '../hooks/useGroup';
import {QueryKeys} from './QueryKeys';

export const useGroupParticipantsQuery = (id: string) => {
  const {group} = useGroup(id);

  return useQuery({
    queryKey: [QueryKeys.GroupParticipants, group?.id],
    queryFn: async () => {
      if (!group) {
        return [];
      }
      await group.sync();
      return group.memberAddresses();
    },
  });
};
