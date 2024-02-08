import {Group} from '@xmtp/react-native-sdk/build/lib/Group';
import {useEffect, useState} from 'react';
import {useClient} from './useClient';

export const useGroup = (id: string) => {
  if (!id) {
    throw new Error('useGroup requires an id');
  }
  const {client} = useClient();
  const [group, setGroup] = useState<Group<unknown> | null>(null);

  useEffect(() => {
    const getGroup = async () => {
      const groups = await client?.conversations.listGroups();
      const foundGroup = groups?.find(c => c.id === id);
      if (foundGroup) {
        setGroup(foundGroup);
      }
    };
    getGroup();
  }, [client, id]);

  return {
    group,
  };
};
