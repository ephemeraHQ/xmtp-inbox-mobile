import {useGroupNameMutation} from '../mutations/useGroupNameMutation';
import {useGroupNameQuery} from '../queries/useGroupNameQuery';

export const useGroupName = (groupTopic: string) => {
  const {data: groupName} = useGroupNameQuery(groupTopic ?? '');
  const {mutateAsync} = useGroupNameMutation(groupTopic ?? '');

  return {
    groupName,
    updateGroupName: async (newGroupName: string) => {
      await mutateAsync(newGroupName);
    },
  };
};
