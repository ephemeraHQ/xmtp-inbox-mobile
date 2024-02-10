import {useQuery} from '@tanstack/react-query';
import {useGroup} from '../hooks/useGroup';
import {QueryKeys} from './QueryKeys';

export const useGroupMessagesQuery = (id: string) => {
  const {group} = useGroup(id);

  return useQuery({
    queryKey: [QueryKeys.GroupMessages, id],
    queryFn: () => group?.messages(),
    enabled: !!group,
  });
};
