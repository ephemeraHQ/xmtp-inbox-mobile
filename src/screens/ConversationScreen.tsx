import {useRoute} from '@react-navigation/native';
import {DecodedMessage, RemoteAttachmentContent} from '@xmtp/react-native-sdk';
import {
  Box,
  FlatList,
  HStack,
  KeyboardAvoidingView,
  Pressable,
  VStack,
} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {ListRenderItem, Platform} from 'react-native';
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
import {useClient} from '../hooks/useClient';
import {useContactInfo} from '../hooks/useContactInfo';
import {useConversation} from '../hooks/useConversation';
import {useConversationMessages} from '../hooks/useConversationMessages';
import {translate} from '../i18n';
import {
  getConsent,
  getTopicAddresses,
  saveConsent,
  saveTopicAddresses,
} from '../services/mmkvStorage';
import {AWSHelper} from '../services/s3';
import {colors} from '../theme/colors';

const getTimestamp = (timestamp: number) => {
  // If today, return hours and minutes if not return date
  const date = new Date(timestamp);
  const now = new Date();
  if (
    date.getDate() === now.getDate() &&
    date.getMonth() === now.getMonth() &&
    date.getFullYear() === now.getFullYear()
  ) {
    return `${date.getHours()}:${date.getMinutes()}`;
  }
  return date.toLocaleDateString();
};

const useData = (topic: string) => {
  const {messages} = useConversationMessages(topic);
  const {client} = useClient();
  const {conversation} = useConversation(topic);
  const cachedPeerAddress = getTopicAddresses(topic)?.[0];
  const {displayName, avatarUrl} = useContactInfo(
    conversation?.peerAddress || '',
  );

  useEffect(() => {
    if (topic && conversation?.peerAddress) {
      saveTopicAddresses(topic, [conversation?.peerAddress]);
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
  const cachedConsent = getConsent(address, peerAddress);
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
  const [showReply, setShowReply] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [consent, setConsent] = useState<'allowed' | 'denied' | 'unknown'>(
    getInitialConsentState(myAddress ?? '', address ?? ''),
  );

  useEffect(() => {
    if (!conversation) {
      return;
    }
    conversation.consentState().then(currentConsent => {
      setConsent(currentConsent);
    });
  }, [conversation]);

  const sendMessage = useCallback(
    async (payload: {text?: string; asset?: Asset}) => {
      if (!conversation) {
        return;
      }
      if (payload.text) {
        conversation?.send(payload.text);
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
              conversation?.send({remoteAttachment: remote}).catch(() => {});
            });
          })
          .catch(() => {});
      }
    },
    [client, conversation],
  );

  const renderItem: ListRenderItem<DecodedMessage<unknown>> = ({item}) => {
    const isMe = item.senderAddress === myAddress;

    return (
      <Pressable>
        <Box marginLeft={6} marginRight={6} marginY={2} flexShrink={1}>
          <VStack>
            <ConversationMessageContent
              message={item}
              address={myAddress ?? ''}
            />
            <Text
              flexShrink={1}
              color={colors.primaryN200}
              typography="text-xs/semi-bold"
              alignSelf={isMe ? 'flex-end' : 'flex-start'}>
              {getTimestamp(item.sent)}
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
    saveConsent(myAddress ?? '', address ?? '', true);
  }, [address, client?.contacts, myAddress]);

  const onBlock = useCallback(() => {
    if (address) {
      client?.contacts.deny([address]);
    }
    setConsent('denied');
    saveConsent(myAddress ?? '', address ?? '', false);
  }, [address, client?.contacts, myAddress]);

  return (
    <>
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
            height={'100%'}
            paddingBottom={'10px'}
            w="100%">
            <Box flex={1}>
              <FlatList
                keyExtractor={item => item.id}
                inverted
                data={messages}
                renderItem={renderItem}
                ListFooterComponent={<Box height={'100px'} />}
              />
            </Box>
            {consent !== 'unknown' ? (
              <ConversationInput
                sendMessage={sendMessage}
                currentAddress={myAddress}
                topic={topic}
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
        isOpen={showReply}
        onBackgroundPress={() => setShowReply(false)}>
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
    </>
  );
};
