import {useCallback, useEffect, useState} from 'react';
import {AppConfig} from '../consts/AppConfig';
import {mmkvStorage} from '../services/mmkvStorage';
import {useClient} from './useClient';
import {useGroup} from './useGroup';

type ConsentState = 'allowed' | 'denied' | 'unknown';

const getInitialConsent = (groupId?: string): ConsentState => {
  if (!AppConfig.GROUP_CONSENT || !groupId) {
    return 'allowed';
  }
  return (mmkvStorage.getGroupConsent(groupId) as ConsentState) ?? 'unknown';
};

export const useGroupConsent = (topic: string) => {
  const {data: group} = useGroup(topic);
  const {client} = useClient();
  const [consent, setConsent] = useState<ConsentState>(
    getInitialConsent(group?.id),
  );

  useEffect(() => {
    if (!group) {
      return;
    }
    if (!AppConfig.GROUP_CONSENT) {
      setConsent('allowed');
      return;
    }
    group.consentState().then(currentConsent => {
      setConsent(currentConsent);
      mmkvStorage.saveGroupConsent(group.id, currentConsent);
    });
  }, [group, topic]);

  const allow = useCallback(async () => {
    if (!group?.id) {
      return;
    }
    await client?.contacts.allowGroups([group.id]);
    setConsent('allowed');
    mmkvStorage.saveGroupConsent(group.id, 'allowed');
  }, [client?.contacts, group?.id]);

  const deny = useCallback(async () => {
    if (!group?.id) {
      return;
    }
    await client?.contacts.denyGroups([group.id]);
    setConsent('denied');
    mmkvStorage.saveGroupConsent(group.id, 'denied');
  }, [client?.contacts, group?.id]);

  return {
    consent,
    allow,
    deny,
  };
};
