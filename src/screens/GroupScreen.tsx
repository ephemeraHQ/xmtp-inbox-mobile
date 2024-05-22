import {useFocusEffect, useRoute} from '@react-navigation/native';
import {RemoteAttachmentContent} from '@xmtp/react-native-sdk';
import {Box, FlatList, HStack, VStack} from 'native-base';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {KeyboardAvoidingView, ListRenderItem, Platform} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {ConversationInput} from '../components/ConversationInput';
import {GroupHeader} from '../components/GroupHeader';
import {Message} from '../components/Message';
import {Button} from '../components/common/Button';
import {Drawer} from '../components/common/Drawer';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {AddGroupParticipantModal} from '../components/modals/AddGroupParticipantModal';
import {GroupInfoModal} from '../components/modals/GroupInfoModal';
import {GroupContext, GroupContextValue} from '../context/GroupContext';
import {useClient} from '../hooks/useClient';
import {useGroup} from '../hooks/useGroup';
import {useGroupMessages} from '../hooks/useGroupMessages';
import {translate} from '../i18n';
import {useGroupParticipantsQuery} from '../queries/useGroupParticipantsQuery';
import {mmkvStorage} from '../services/mmkvStorage';
import {AWSHelper} from '../services/s3';
import {colors} from '../theme/colors';

const keyExtractor = (item: string) => item;

const useData = (id: string) => {
  const {data: messages, refetch, isRefetching} = useGroupMessages(id);
  const {data: addresses} = useGroupParticipantsQuery(id);
  const {client} = useClient();
  const {data: group} = useGroup(id);

  return {
    name: group?.id,
    myAddress: client?.address,
    messages,
    refetch,
    isRefetching,
    group,
    client,
    addresses,
  };
};

const getInitialConsentState = (
  addresses: string,
  groupId: string,
): 'allowed' | 'denied' | 'unknown' => {
  const cachedConsent = mmkvStorage.getConsent(addresses, groupId);
  // if (cachedConsent === undefined) {
  //   return 'unknown';
  // }
  // if (cachedConsent) {
  //   return 'allowed';
  // }
  // return 'denied';
  return cachedConsent ? 'allowed' : 'allowed';
};

export const GroupScreen = () => {
  const {params} = useRoute();
  const {id} = params as {id: string};
  const {myAddress, messages, addresses, group, client, refetch, isRefetching} =
    useData(id);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [consent, setConsent] = useState<'allowed' | 'denied' | 'unknown'>(
    getInitialConsentState(myAddress ?? '', group?.id ?? ''),
  );
  const [replyId, setReplyId] = useState<string | null>(null);
  const [reactId, setReactId] = useState<string | null>(null);

  const {ids, entities, reactionsEntities} = messages ?? {};

  useEffect(() => {
    if (!group) {
      return;
    }
    // TODO: Update with consent
    setConsent('allowed');
    // group..then(currentConsent => {
    //   setConsent(currentConsent);
    // });
  }, [group]);

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const sendMessage = useCallback(
    async (payload: {text?: string; asset?: Asset}) => {
      if (!group) {
        return;
      }
      if (payload.text) {
        group?.send(payload.text);
      }
      if (payload.asset) {
        client
          ?.encryptAttachment({
            fileUri: payload.asset.uri ?? '',
            mimeType: payload.asset.type,
          })
          .then(encrypted => {
            AWSHelper.uploadFile(
              encrypted.encryptedLocalFileUri,
              encrypted.metadata.filename ?? '',
            ).then(response => {
              const remote: RemoteAttachmentContent = {
                ...encrypted.metadata,
                scheme: 'https://',
                url: response,
              };
              group?.send({remoteAttachment: remote});
            });
          })
          .catch(() => {});
      }
    },
    [client, group],
  );

  const renderItem: ListRenderItem<string> = ({item}) => {
    const message = entities?.[item];
    if (!message) {
      return null;
    }
    const reactions = reactionsEntities?.[item] ?? new Map();
    const isMe =
      message.senderAddress?.toLocaleLowerCase() ===
      myAddress?.toLocaleLowerCase();

    return <Message message={message} isMe={isMe} reactions={reactions} />;
  };

  const onConsent = useCallback(() => {
    if (addresses) {
      client?.contacts.allow(addresses);
    }
    setConsent('allowed');
    mmkvStorage.saveConsent(myAddress ?? '', id ?? '', true);
  }, [addresses, client?.contacts, myAddress, id]);

  const onBlock = useCallback(() => {
    if (addresses) {
      client?.contacts.deny(addresses);
    }
    setConsent('denied');
    mmkvStorage.saveConsent(myAddress ?? '', id ?? '', false);
  }, [addresses, client?.contacts, id, myAddress]);

  const setReply = useCallback(
    (id: string) => {
      setReplyId(id);
    },
    [setReplyId],
  );

  const clearReply = useCallback(() => {
    setReplyId(null);
  }, [setReplyId]);

  const clearReaction = useCallback(() => {
    setReactId(null);
  }, [setReactId]);

  const conversationProviderValue = useMemo((): GroupContextValue => {
    return {
      group: group ?? null,
      setReplyId: setReply,
      clearReplyId: clearReply,
    };
  }, [group, setReply, clearReply]);

  return (
    <GroupContext.Provider value={conversationProviderValue}>
      <Screen
        includeTopPadding={false}
        containerStlye={{
          alignItems: undefined,
        }}>
        <Box backgroundColor={colors.backgroundPrimary} paddingBottom={10}>
          <GroupHeader
            groupId={group?.id ?? ''}
            peerAddresses={addresses ?? []}
            onGroupPress={() => setShowGroupModal(true)}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{height: '100%'}}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 30}>
            <Box flex={1}>
              <FlatList
                keyExtractor={keyExtractor}
                inverted
                data={ids}
                renderItem={renderItem}
                ListFooterComponent={<Box height={'100px'} />}
                onRefresh={refetch}
                refreshing={isRefetching}
              />
            </Box>
            {consent !== 'unknown' ? (
              <ConversationInput
                sendMessage={sendMessage}
                currentAddress={myAddress}
                id={id}
              />
            ) : (
              <HStack justifyContent={'space-around'} marginX={'40px'}>
                <Button onPress={onConsent}>
                  <Text
                    typography="text-base/medium"
                    color={colors.backgroundPrimary}>
                    {translate('allow')}
                  </Text>
                </Button>
                <Button onPress={onBlock}>
                  <Text
                    typography="text-base/medium"
                    color={colors.backgroundPrimary}>
                    {translate('block')}
                  </Text>
                </Button>
              </HStack>
            )}
          </KeyboardAvoidingView>
        </Box>
      </Screen>

      <Drawer
        title="Test"
        isOpen={!!replyId}
        onBackgroundPress={() => setReplyId(null)}>
        <VStack w={'100%'} alignItems={'flex-start'}>
          <Box
            backgroundColor={'white'}
            paddingX={'4px'}
            paddingY={'6px'}
            marginRight={'12px'}>
            <Text>Test</Text>
          </Box>
        </VStack>
      </Drawer>
      <Drawer
        title="Test"
        isOpen={Boolean(reactId)}
        onBackgroundPress={clearReaction}>
        <VStack w={'100%'} alignItems={'flex-start'}>
          <Box
            backgroundColor={'white'}
            paddingX={'4px'}
            paddingY={'6px'}
            marginRight={'12px'}>
            <Text>Test</Text>
          </Box>
        </VStack>
      </Drawer>
      <GroupInfoModal
        shown={showGroupModal}
        hide={() => setShowGroupModal(false)}
        addresses={addresses ?? []}
        onPlusPress={() => {
          setShowGroupModal(false);
          setShowAddModal(true);
        }}
        group={group!}
        address={myAddress ?? ''}
      />
      <AddGroupParticipantModal
        shown={showAddModal}
        hide={() => setShowAddModal(false)}
        group={group!}
      />
    </GroupContext.Provider>
  );
};
