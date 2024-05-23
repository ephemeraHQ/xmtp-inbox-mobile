import {useRoute} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {Box} from 'native-base';
import React, {useCallback} from 'react';
import {Alert, KeyboardAvoidingView, Platform} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {ConversationHeader} from '../components/ConversationHeader';
import {ConversationInput} from '../components/ConversationInput';
import {GroupHeader} from '../components/GroupHeader';
import {Screen} from '../components/common/Screen';
import {useClient} from '../hooks/useClient';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {ListMessages} from '../models/ListMessages';
import {ScreenNames} from '../navigation/ScreenNames';
import {QueryKeys} from '../queries/QueryKeys';

export const NewConversationScreen = () => {
  const {replace} = useTypedNavigation();
  const {params} = useRoute();
  const {addresses} = params as {addresses: string[]};
  const {client} = useClient();
  const queryClient = useQueryClient();

  const onSend = useCallback(
    async (message: {text?: string; asset?: Asset}) => {
      try {
        const canMessage = await client?.canGroupMessage(addresses);
        for (const address of addresses) {
          const lower = address.toLowerCase();
          if (!canMessage?.[lower]) {
            Alert.alert(`${address} cannot be added to a group`);
            return;
          }
        }
        try {
          const group = await client?.conversations.newGroup(
            addresses,
            'creator_admin',
          );
          if (!group) {
            Alert.alert('Error creating group');
            return;
          }
          try {
            await group?.send(message.text ?? '');
            queryClient.setQueryData<ListMessages>(
              [QueryKeys.List, client?.address],
              prev => {
                return [
                  {
                    group,
                    display: message.text ?? 'Image',
                    lastMessageTime: Date.now(),
                    isRequest: false,
                  },
                  ...(prev ?? []),
                ];
              },
            );
          } catch (error: any) {
            Alert.alert('Error sending message', error?.message);
          }
          if (group) {
            replace(ScreenNames.Group, {id: group.id});
          }
        } catch (error: any) {
          Alert.alert('Error creating group', error?.message);
        }
      } catch (error: any) {
        Alert.alert(
          'An Error has occurred',
          (typeof error === 'object' && 'message' in error && error?.message) ||
            '',
        );
      }
    },
    [addresses, client, queryClient, replace],
  );

  return (
    <Screen
      includeTopPadding={false}
      containerStlye={{
        alignItems: undefined,
      }}>
      <Box flexGrow={1} paddingBottom={'20px'}>
        {addresses.length > 1 ? (
          <GroupHeader
            peerAddresses={addresses}
            onGroupPress={() => {}}
            groupId="new_convo"
          />
        ) : (
          <ConversationHeader
            peerAddress={addresses[0]}
            onAvatarPress={() => {}}
          />
        )}
        <Box flexGrow={1} />
        <KeyboardAvoidingView
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
          keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 30}>
          <ConversationInput sendMessage={onSend} />
        </KeyboardAvoidingView>
      </Box>
    </Screen>
  );
};
