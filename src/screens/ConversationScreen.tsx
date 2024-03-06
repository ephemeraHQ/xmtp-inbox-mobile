import {useRoute} from '@react-navigation/native';
import {useQueryClient} from '@tanstack/react-query';
import {RemoteAttachmentContent} from '@xmtp/react-native-sdk';
import {Box, FlatList, HStack, Pressable, VStack} from 'native-base';
import React, {useCallback, useEffect, useMemo, useState} from 'react';
import {
  Alert,
  KeyboardAvoidingView,
  ListRenderItem,
  Platform,
} from 'react-native';
import {Asset} from 'react-native-image-picker';
import {ConversationHeader} from '../components/ConversationHeader';
import {ConversationInput} from '../components/ConversationInput';
import {ConversationMessageContent} from '../components/ConversationMessageContent';
import {Button} from '../components/common/Button';
import {Drawer} from '../components/common/Drawer';
import {Icon} from '../components/common/Icon';
import {Modal} from '../components/common/Modal';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {
  ConversationContext,
  ConversationContextValue,
} from '../context/ConversationContext';
import {useClient} from '../hooks/useClient';
import {useContactInfo} from '../hooks/useContactInfo';
import {useConversation} from '../hooks/useConversation';
import {useConversationMessages} from '../hooks/useConversationMessages';
import {translate} from '../i18n';
import {QueryKeys} from '../queries/QueryKeys';
import {mmkvStorage} from '../services/mmkvStorage';
import {AWSHelper} from '../services/s3';
import {colors} from '../theme/colors';

const keyExtractor = (item: string) => item;

const getTimestamp = (timestamp: number) => {
  // If today, return hours and minutes if not return date
  const date = new Date(timestamp);
  const now = new Date();
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return date.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    });
  }
  return date.toLocaleDateString();
};

const useData = (topic: string) => {
  const {data: messages} = useConversationMessages(topic);
  const {client} = useClient();
  const {data: conversation} = useConversation(topic);
  const cachedPeerAddress = mmkvStorage.getTopicAddresses(topic)?.[0];
  const {displayName, avatarUrl} = useContactInfo(
    conversation?.peerAddress || '',
  );

  useEffect(() => {
    if (topic && conversation?.peerAddress) {
      mmkvStorage.saveTopicAddresses(topic, [conversation?.peerAddress]);
    }
  }, [conversation?.peerAddress, topic]);

  return {
    profileImage: avatarUrl,
    name: displayName,
    address: conversation?.peerAddress ?? cachedPeerAddress,
    myAddress: client?.address,
    messages,
    conversation,
    client,
  };
};

const getInitialConsentState = (address: string, peerAddress: string) => {
  const cachedConsent = mmkvStorage.getConsent(address, peerAddress);
  if (cachedConsent === undefined) {
    return 'unknown';
  }
  if (cachedConsent) {
    return 'allowed';
  }
  return 'denied';
};

export const ConversationScreen = () => {
  const {params} = useRoute();
  const {topic} = params as {topic: string};
  const {name, myAddress, messages, address, conversation, client} =
    useData(topic);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [consent, setConsent] = useState<'allowed' | 'denied' | 'unknown'>(
    getInitialConsentState(myAddress ?? '', address ?? ''),
  );
  const {ids, entities} = messages ?? {};
  const queryClient = useQueryClient();
  const [replyId, setReplyId] = useState<string | null>(null);
  const [reactId, setReactId] = useState<string | null>(null);

  useEffect(() => {
    if (!conversation) {
      return;
    }
    conversation.consentState().then(currentConsent => {
      setConsent(currentConsent);
    });
  }, [conversation]);

  useEffect(() => {
    if (consent === 'unknown') {
      return;
    }
    mmkvStorage.saveConsent(
      client?.address ?? '',
      address ?? '',
      consent === 'allowed',
    );
  }, [address, client?.address, consent]);

  const sendMessage = useCallback(
    async (payload: {text?: string; asset?: Asset}) => {
      if (!conversation) {
        return;
      }
      if (payload.text) {
        conversation
          ?.send(payload.text)
          .then(() => {})
          .catch(err => {
            Alert.alert('Error', err.message);
          });
      } else if (payload.asset) {
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
              conversation?.send({remoteAttachment: remote}).catch(() => {});
            });
          })
          .catch(() => {});
      }
    },
    [client, conversation],
  );

  const renderItem: ListRenderItem<string> = ({item}) => {
    const message = entities?.[item];
    if (!message) {
      return null;
    }
    const isMe = message.senderAddress === myAddress;

    return (
      <Pressable>
        <Box marginLeft={6} marginRight={6} marginY={2} flexShrink={1}>
          <VStack>
            <ConversationMessageContent message={message} isMe={isMe} />
            <Text
              flexShrink={1}
              color={colors.primaryN200}
              typography="text-xs/semi-bold"
              alignSelf={isMe ? 'flex-end' : 'flex-start'}>
              {getTimestamp(message.sent)}
            </Text>
          </VStack>
        </Box>
      </Pressable>
    );
  };

  const onConsent = useCallback(() => {
    if (address) {
      client?.contacts.allow([address]);
    }
    setConsent('allowed');
    mmkvStorage.saveConsent(myAddress ?? '', address ?? '', true);
    queryClient.invalidateQueries({
      queryKey: [QueryKeys.List, client?.address],
    });
  }, [address, client?.address, client?.contacts, myAddress, queryClient]);

  const onBlock = useCallback(() => {
    if (address) {
      client?.contacts.deny([address]);
    }
    setConsent('denied');
    mmkvStorage.saveConsent(myAddress ?? '', address ?? '', false);
  }, [address, client?.contacts, myAddress]);

  const setReply = useCallback(
    (id: string) => {
      setReplyId(id);
    },
    [setReplyId],
  );

  const setReaction = useCallback(
    (id: string) => {
      setReactId(id);
    },
    [setReactId],
  );

  const clearReply = useCallback(() => {
    setReplyId(null);
  }, [setReplyId]);

  const clearReaction = useCallback(() => {
    setReactId(null);
  }, [setReactId]);

  const conversationProviderValue = useMemo((): ConversationContextValue => {
    return {
      setReply,
      setReaction,
      clearReply,
      clearReaction,
    };
  }, [setReply, setReaction, clearReply, clearReaction]);

  return (
    <ConversationContext.Provider value={conversationProviderValue}>
      <Screen
        includeTopPadding={false}
        containerStlye={{
          alignItems: undefined,
        }}>
        <Box backgroundColor={colors.backgroundPrimary} paddingBottom={10}>
          <ConversationHeader
            peerAddress={address}
            onAvatarPress={() => setShowProfileModal(true)}
          />
          <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={{height: '100%'}}
            keyboardVerticalOffset={10}>
            <Box flex={1}>
              <FlatList
                keyExtractor={keyExtractor}
                inverted
                data={ids}
                renderItem={renderItem}
                ListFooterComponent={<Box height={'100px'} />}
              />
            </Box>
            {consent !== 'unknown' ? (
              <ConversationInput
                sendMessage={sendMessage}
                currentAddress={myAddress}
                id={topic}
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
        isOpen={Boolean(replyId)}
        onBackgroundPress={clearReply}>
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
      <Modal
        onBackgroundPress={() => setShowProfileModal(false)}
        isOpen={showProfileModal}>
        <VStack alignItems={'center'} justifyContent={'center'}>
          <Text typography="text-xl/bold" textAlign={'center'}>
            {name}
          </Text>
          <Text typography="text-sm/bold">{translate('domain_origin')}</Text>

          <Button
            variant={'ghost'}
            rightIcon={
              <Icon
                name={'arrow-right'}
                type={'mini'}
                color={colors.actionPrimary}
              />
            }>
            <Text
              typography="text-base/bold"
              color={colors.actionPrimary}
              textAlign={'center'}>
              {'lenster.xyz'}
            </Text>
          </Button>
        </VStack>
      </Modal>
    </ConversationContext.Provider>
  );
};
