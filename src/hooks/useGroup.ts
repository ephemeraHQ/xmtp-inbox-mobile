import {useMemo} from 'react';
import {useGroupsQuery} from '../queries/useGroupsQuery';

export const useGroup = (id: string) => {
  const groupsQuery = useGroupsQuery();

  return useMemo(() => {
    const {data, ...rest} = groupsQuery;
    const {entities} = data ?? {};

    const groupData = entities?.[id];
    return {data: groupData, ...rest};
  }, [groupsQuery, id]);
};
