import {useFocusEffect, useRoute} from '@react-navigation/native';
import {RemoteAttachmentContent} from '@xmtp/react-native-sdk';
import {Box, FlatList, HStack} from 'native-base';
import React, {useCallback, useMemo, useState} from 'react';
import {
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
  FlatList as RNFlatList,
  StyleSheet,
} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {ConversationInput} from '../components/ConversationInput';
import {GroupHeader} from '../components/GroupHeader';
import {Message} from '../components/Message';
import {Button} from '../components/common/Button';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {AddGroupParticipantModal} from '../components/modals/AddGroupParticipantModal';
import {GroupInfoModal} from '../components/modals/GroupInfoModal';
import {GroupContext, GroupContextValue} from '../context/GroupContext';
import {useClient} from '../hooks/useClient';
import {useGroup} from '../hooks/useGroup';
import {useGroupConsent} from '../hooks/useGroupConsent';
import {useGroupMessages} from '../hooks/useGroupMessages';
import {translate} from '../i18n';
import {useGroupParticipantsQuery} from '../queries/useGroupParticipantsQuery';
import {AWSHelper} from '../services/s3';
import {colors} from '../theme/colors';

const keyExtractor = (item: string) => item;

const useData = (topic: string) => {
  const {data: messages, refetch, isRefetching} = useGroupMessages(topic);
  const {data: addresses} = useGroupParticipantsQuery(topic);
  const {client} = useClient();
  const {data: group} = useGroup(topic);

  return {
    name: topic,
    myAddress: client?.address,
    messages,
    refetch,
    isRefetching,
    group,
    client,
    addresses,
  };
};

export const GroupScreen = () => {
  const {params} = useRoute();
  const {topic} = params as {topic: string};
  const {myAddress, messages, addresses, group, client, refetch, isRefetching} =
    useData(topic);
  const [showGroupModal, setShowGroupModal] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [replyId, setReplyId] = useState<string | null>(null);
  const {consent, allow, deny} = useGroupConsent(topic);
  const scrollRef = React.useRef<RNFlatList<string>>(null);

  const {ids, entities, reactionsEntities} = messages ?? {};

  useFocusEffect(
    useCallback(() => {
      refetch();
    }, [refetch]),
  );

  const scrollToMessage = useCallback(
    (messageId: string) => {
      scrollRef.current?.scrollToItem({
        animated: false,
        item: messageId,
      });
    },
    [scrollRef],
  );

  const clearReply = useCallback(() => {
    setReplyId(null);
  }, [setReplyId]);

  const sendMessage = useCallback(
    async (payload: {text?: string; asset?: Asset; replyId?: string}) => {
      if (!group) {
        return;
      }
      const textContent = payload.text;
      let remoteAttachment: RemoteAttachmentContent | undefined;

      if (payload.asset) {
        try {
          const encrypted = await client?.encryptAttachment({
            fileUri: payload.asset.uri ?? '',
            mimeType: payload.asset.type,
          });
          if (!encrypted) {
            return;
          }
          const response = await AWSHelper.uploadFile(
            encrypted.encryptedLocalFileUri,
            encrypted.metadata.filename ?? '',
          );
          remoteAttachment = {
            ...encrypted.metadata,
            scheme: 'https://',
            url: response,
          };
        } catch (e) {
          console.error(e);
        }
      }
      if (replyId) {
        if (remoteAttachment) {
          group?.send({
            reply: {
              reference: replyId,
              content: {
                remoteAttachment,
              },
            } as any,
          });
        } else if (textContent) {
          group?.send({
            reply: {
              reference: replyId,
              content: {
                text: textContent,
              },
            } as any,
          });
        }
        clearReply();
      } else if (remoteAttachment) {
        group?.send({
          remoteAttachment,
        });
      } else if (textContent) {
        group?.send(textContent);
      }
    },
    [clearReply, client, group, replyId],
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

  const setReply = useCallback(
    (id: string) => {
      setReplyId(id);
    },
    [setReplyId],
  );

  const conversationProviderValue = useMemo((): GroupContextValue => {
    return {
      group: group ?? null,
      setReplyId: setReply,
      clearReplyId: clearReply,
      scrollToMessage,
    };
  }, [group, setReply, clearReply, scrollToMessage]);

  return (
    <GroupContext.Provider value={conversationProviderValue}>
      <Screen
        includeTopPadding={false}
        containerStlye={{
          alignItems: undefined,
        }}>
        <Box backgroundColor={colors.backgroundPrimary} paddingBottom={10}>
          <GroupHeader
            groupId={group?.topic ?? ''}
            peerAddresses={addresses ?? []}
            onGroupPress={() => setShowGroupModal(true)}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 10 : 30}>
            <Box flex={1}>
              <FlatList
                ref={scrollRef}
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
                id={topic}
                replyMessage={replyId ? entities?.[replyId] : undefined}
                clearReply={clearReply}
              />
            ) : (
              <HStack justifyContent={'space-around'} marginX={'40px'}>
                <Button onPress={allow}>
                  <Text
                    typography="text-base/medium"
                    color={colors.backgroundPrimary}>
                    {translate('allow')}
                  </Text>
                </Button>
                <Button onPress={deny}>
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

const styles = StyleSheet.create({
  container: {
    height: '100%',
  },
});
