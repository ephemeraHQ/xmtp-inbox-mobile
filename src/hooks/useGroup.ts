import {useMemo} from 'react';
import {useGroupsQuery} from '../queries/useGroupsQuery';

export const useGroup = (topic: string) => {
  const groupsQuery = useGroupsQuery();

  return useMemo(() => {
    const {data, ...rest} = groupsQuery;
    const {entities} = data ?? {};

    const groupData = entities?.[topic];
    return {data: groupData, ...rest};
  }, [groupsQuery, topic]);
};
