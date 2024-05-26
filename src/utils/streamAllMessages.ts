import {Client, DecodedMessage, Group} from '@xmtp/react-native-sdk';
import {Platform} from 'react-native';
import {SupportedContentTypes} from '../consts/ContentTypes';
import {QueryKeys} from '../queries/QueryKeys';
import {PushNotifications} from '../services/pushNotifications';
import {queryClient} from '../services/queryClient';

let cancelStreamGroups: null | Promise<() => void> = null;

export const streamAllMessages = async (
  client: Client<SupportedContentTypes>,
) => {
  cancelStreamGroups = client.conversations.streamGroups(async newGroup => {
    console.log('NEW GROUP:', newGroup);
    if (Platform.OS !== 'android') {
      const pushClient = new PushNotifications(client);
      pushClient.subscribeToGroup(newGroup.topic);
    }
    queryClient.setQueryData<Group<SupportedContentTypes>[]>(
      [QueryKeys.List, client?.address],
      prev => {
        return [newGroup, ...(prev ?? [])];
      },
    );
  });

  client.conversations.streamAllGroupMessages(async newMessage => {
    console.log('NEW MESSAGE:', newMessage);
    queryClient.setQueryData<DecodedMessage<SupportedContentTypes>[]>(
      [QueryKeys.FirstGroupMessage, newMessage.topic],
      prev => {
        return [newMessage, ...(prev ?? [])];
      },
    );
  });
};

export const cancelStreamAllMessages = async (
  client?: Client<SupportedContentTypes> | null,
) => {
  if (cancelStreamGroups) {
    const cancel = await cancelStreamGroups;
    cancel();
  }
  client?.conversations.cancelStreamAllMessages();
};
