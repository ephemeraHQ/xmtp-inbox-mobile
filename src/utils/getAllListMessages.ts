import {Client} from '@xmtp/react-native-sdk';
import {SupportedContentTypes} from '../consts/ContentTypes';
import {mmkvStorage} from '../services/mmkvStorage';
import {PushNotifications} from '../services/pushNotifications';
import {withRequestLogger} from './logger';

export const getAllListMessages = async (
  client?: Client<SupportedContentTypes> | null,
) => {
  try {
    if (!client) {
      return [];
    }
    try {
      const consentList = await withRequestLogger(
        client.contacts.refreshConsentList(),
        {
          name: 'consent',
        },
      );
      consentList.forEach(item => {
        mmkvStorage.saveConsent(
          client.address,
          item.value,
          item.permissionType === 'allowed',
        );
      });
    } catch (e) {
      console.log('Error fetching messages', e);
      throw new Error('Error fetching messages');
    }
    const pushClient = new PushNotifications(client);
    pushClient.subscribeToAllGroups();

    const groups = await withRequestLogger(client.conversations.listGroups(), {
      name: 'groups',
    });

    return groups;
  } catch (e) {
    console.log('Error fetching messages', e);
    throw new Error('Error fetching messages');
  }
};
