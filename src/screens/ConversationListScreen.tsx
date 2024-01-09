import {useIsFocused} from '@react-navigation/native';
import {useENS} from '@thirdweb-dev/react-native';
import {DecodedMessage} from '@xmtp/react-native-sdk';
import {Avatar, Box, Center, Fab, FlatList, HStack, VStack} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {ListRenderItem, Pressable} from 'react-native';
import EmptyBackgrund from '../../assets/images/Bg_asset';
import {Button} from '../components/common/Button';
import {Drawer} from '../components/common/Drawer';
import {Icon} from '../components/common/Icon';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {useClient} from '../hooks/useClient';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {ScreenNames} from '../navigation/ScreenNames';
import {colors} from '../theme/colors';

interface Conversation {
  isRequest: boolean;
  lastMessage: string;
  lastMessageTime: number;
  name: string;
  timeDisplay: string;
  topic: string;
}

const getMessageTimeDisplay = (time: number): string => {
  const date = new Date(time);
  // If today, show time
  // If yesterday, show yesterday
  // If this year, show month and day
  // Otherwise, show year
  if (date.getFullYear() === new Date().getFullYear()) {
    if (date.getMonth() === new Date().getMonth()) {
      if (date.getDate() === new Date().getDate()) {
        return date.toLocaleTimeString([], {
          hour: '2-digit',
          minute: '2-digit',
        });
      } else if (date.getDate() === new Date().getDate() - 1) {
        return 'Yesterday';
      } else {
        return date.toLocaleDateString([], {
          month: 'short',
          day: 'numeric',
        });
      }
    } else {
      return date.toLocaleDateString([], {
        month: 'short',
        day: 'numeric',
      });
    }
  }
  return date.toLocaleDateString([], {
    year: 'numeric',
  });
};

const useData = () => {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [requests, setRequests] = useState<Conversation[]>([]);
  const {client} = useClient();

  useEffect(() => {
    const getAllMessages = async () => {
      if (client) {
        client.conversations.streamAllMessages(
          async (message: DecodedMessage<unknown>) => {
            const {topic} = message;
            const convo = conversations.find(c => c.topic === topic);
            if (convo) {
              const newConvo: Conversation = {
                ...convo,
                lastMessage: message.content() as string,
                lastMessageTime: message.sent,
                timeDisplay: getMessageTimeDisplay(message.sent),
              };
              setConversations(prev => [
                newConvo,
                ...prev.filter(c => c.topic !== topic),
              ]);
            } else {
              const [convos] = await Promise.all([client.conversations.list()]);
              const newConvo = convos.find(c => c.topic === topic);
              if (!newConvo) {
                return;
              }
              const consent = await newConvo?.consentState();
              const newConversation: Conversation = {
                topic,
                name: newConvo?.peerAddress,
                lastMessage: message.content() as string,
                lastMessageTime: message.sent,
                timeDisplay: getMessageTimeDisplay(message.sent),
                isRequest: consent !== 'allowed',
              };
              setConversations(prev => [newConversation, ...prev]);
            }
          },
        );
        client.conversations.list().then(async convos => {
          const allMessages = await Promise.all(
            convos.map(async conversation => {
              const [messages, consent] = await Promise.all([
                conversation.messages(1),
                conversation.consentState(),
              ]);
              return {
                topic: conversation.topic,
                // TODO: ENS name lookup
                name: conversation.peerAddress,
                lastMessage: messages[0].content() as string,
                lastMessageTime: messages[0].sent,
                timeDisplay: getMessageTimeDisplay(messages[0].sent),
                isRequest: consent !== 'allowed',
              };
            }),
          );
          const sorted = allMessages.sort((a, b) => {
            return b.lastMessageTime - a.lastMessageTime;
          });
          setConversations(sorted.filter(convo => !convo.isRequest));
          setRequests(sorted.filter(convo => convo.isRequest));
        });
      }
    };
    getAllMessages();
    return () => {
      client?.conversations.cancelStreamAllMessages();
    };
  }, [client, conversations]);

  return {
    messageRequests: requests,
    messages: conversations,
  };
};

interface ListHeaderProps {
  list: 'ALL_MESSAGES' | 'MESSAGE_REQUESTS';
  showPickerModal: () => void;
  messageRequestCount: number;
  onShowMessageRequests: () => void;
}
const ListHeader: FC<ListHeaderProps> = ({
  list,
  showPickerModal,
  messageRequestCount,
  onShowMessageRequests,
}) => {
  const {navigate} = useTypedNavigation();
  const {data} = useENS();
  const {avatarUrl} = data ?? {};

  const handleDiscoverPress = useCallback(() => {
    navigate(ScreenNames.Discover);
  }, [navigate]);

  const handleAccountPress = useCallback(() => {
    navigate(ScreenNames.Account);
  }, [navigate]);
  return (
    <VStack>
      <HStack
        w={'100%'}
        justifyContent={'space-between'}
        alignItems={'center'}
        paddingX={'16px'}
        paddingBottom={'8px'}>
        <Pressable onPress={handleAccountPress}>
          <Avatar
            width={'40px'}
            height={'40px'}
            source={avatarUrl ? {uri: avatarUrl} : undefined}
          />
        </Pressable>
        <Box
          borderRadius={'24px'}
          zIndex={10}
          paddingX={'16px'}
          paddingY={'8px'}
          backgroundColor={'white'}
          shadow={4}>
          <Box>
            <Button
              size={'sm'}
              variant={'ghost'}
              leftIcon={
                <Icon
                  name="chat-bubble-oval-left"
                  size={16}
                  type="mini"
                  color="#0F172A"
                />
              }
              rightIcon={
                <Icon
                  name="chevron-down-thick"
                  size={16}
                  type="mini"
                  color="#0F172A"
                />
              }
              onPress={showPickerModal}>
              <Text typography="text-sm/heavy">
                {list === 'ALL_MESSAGES' ? 'All Messages' : 'Message Requests'}
              </Text>
            </Button>
          </Box>
        </Box>
        <Pressable onPress={handleDiscoverPress}>
          <Icon name="sparkles" size={24} color={'#0F172A'} />
        </Pressable>
      </HStack>
      {list === 'MESSAGE_REQUESTS' ? (
        <Box
          backgroundColor={colors.actionAlertBG}
          paddingY={'8px'}
          paddingX={'16px'}>
          <Text
            typography="text-caption/regular"
            textAlign={'center'}
            color={colors.actionAlertText}>
            Message requests from addresses you’ve never interacted with show up
            here
          </Text>
        </Box>
      ) : messageRequestCount > 0 ? (
        <Pressable onPress={onShowMessageRequests}>
          <HStack
            backgroundColor={colors.actionPrimary}
            padding={'8px'}
            borderRadius={'8px'}
            alignItems={'center'}
            marginX={'16px'}>
            <Box paddingLeft={'8px'} paddingRight={'16px'}>
              <Icon name="inbox-arrow-down" color={colors.actionPrimaryText} />
            </Box>
            <Text
              flex={1}
              color={colors.actionPrimaryText}
              typography="text-xs/bold">
              {translate('message_requests_count', {
                count: String(messageRequestCount),
              })}
            </Text>
            <Box
              paddingLeft={'8px'}
              paddingRight={'16px'}
              justifyContent={'flex-end'}>
              <Icon
                name="chevron-right-thick"
                size={16}
                color={colors.actionPrimaryText}
              />
            </Box>
          </HStack>
        </Pressable>
      ) : (
        <Box />
      )}
    </VStack>
  );
};

export const ConversationListScreen = () => {
  const [list, setList] = useState<'ALL_MESSAGES' | 'MESSAGE_REQUESTS'>(
    'ALL_MESSAGES',
  );
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [showConsentDrawer, setShowConsentDrawer] = useState(false);
  const focused = useIsFocused();
  const {messages, messageRequests} = useData();
  const {navigate} = useTypedNavigation();

  const showPicker = () => {
    setShowPickerModal(true);
  };

  const handleNewMessagePress = useCallback(() => {
    navigate(ScreenNames.NewMessage);
  }, [navigate]);

  const handleFilterPress = useCallback(
    (type: 'ALL_MESSAGES' | 'MESSAGE_REQUESTS') => {
      setList(type);
      setShowPickerModal(false);
    },
    [],
  );

  const renderItem: ListRenderItem<Conversation> = ({item}) => {
    return (
      <Pressable
        onPress={() =>
          navigate(ScreenNames.Conversation, {
            topic: item.topic,
          })
        }>
        <HStack
          space={[2, 3]}
          alignItems={'center'}
          w={'100%'}
          padding={'16px'}>
          <Avatar
            source={{uri: 'https://i.pravatar.cc/300'}}
            marginRight={'16px'}
            width={'48px'}
            height={'48px'}
          />
          <VStack flex={1} style={{justifyContent: 'flex-end'}}>
            <Text
              numberOfLines={1}
              ellipsizeMode="middle"
              typography="text-base/bold">
              {item.name}
            </Text>
            <Text numberOfLines={1} typography="text-sm/regular">
              {item.lastMessage}
            </Text>
          </VStack>
          <Text
            typography="text-xs/regular"
            style={{alignSelf: 'flex-start', textAlignVertical: 'top'}}>
            {item.timeDisplay}
          </Text>
        </HStack>
      </Pressable>
    );
  };

  return (
    <>
      <Screen>
        <FlatList
          w={'100%'}
          h={'100%'}
          data={list === 'ALL_MESSAGES' ? messages : messageRequests}
          ListHeaderComponent={
            <ListHeader
              showPickerModal={showPicker}
              list={list}
              messageRequestCount={messageRequests.length}
              onShowMessageRequests={() => setList('MESSAGE_REQUESTS')}
            />
          }
          ListEmptyComponent={
            list === 'ALL_MESSAGES' ? (
              <VStack
                justifyContent={'center'}
                alignItems={'center'}
                height={'100%'}>
                <Center paddingBottom={'32px'} alignSelf={'center'}>
                  <EmptyBackgrund />
                </Center>
                <Text
                  paddingBottom={'6px'}
                  typography="text-xl/bold"
                  textAlign={'center'}>
                  {translate('youve_got_no_messages')}
                </Text>
                <Text typography="text-title/regular" textAlign={'center'}>
                  {translate('start_a_conversation_to_get_going')}
                </Text>
              </VStack>
            ) : null
          }
          renderItem={renderItem}
          ListFooterComponent={<Box height={50} />}
        />
        {!showPickerModal && focused && (
          <Fab
            position="absolute"
            size="sm"
            right={27}
            bottom={24}
            height={'48px'}
            width={'48px'}
            backgroundColor={'#4F46E5'}
            onPress={handleNewMessagePress}
            icon={
              <Icon
                name="plus-thick"
                size={28}
                color={colors.actionPrimaryText}
              />
            }
          />
        )}
      </Screen>
      <Drawer
        title={translate('filter_conversations')}
        isOpen={showPickerModal}
        onBackgroundPress={() => setShowPickerModal(false)}>
        <VStack w={'100%'} alignItems={'flex-start'}>
          <Pressable onPress={() => handleFilterPress('ALL_MESSAGES')}>
            <HStack
              w={'100%'}
              paddingX="12px"
              paddingY={'4px'}
              alignItems={'center'}>
              <Box paddingX={'4px'} paddingY={'6px'} marginRight={'12px'}>
                <Icon
                  name="chat-bubble-oval-left"
                  size={20}
                  type={list === 'ALL_MESSAGES' ? 'mini' : 'outline'}
                />
              </Box>
              <Text
                flex={1}
                typography={
                  list === 'ALL_MESSAGES'
                    ? 'text-base/bold'
                    : 'text-base/regular'
                }>
                {translate('all_messages')}
              </Text>
              {list === 'ALL_MESSAGES' ? (
                <Icon
                  name={'check-circle'}
                  size={24}
                  color={colors.actionPositive}
                />
              ) : (
                <Box />
              )}
            </HStack>
          </Pressable>
          <Pressable onPress={() => handleFilterPress('MESSAGE_REQUESTS')}>
            <HStack
              w={'100%'}
              paddingX="12px"
              paddingY={'4px'}
              alignItems={'center'}>
              <Box paddingX={'4px'} paddingY={'6px'} marginRight={'12px'}>
                <Icon
                  name="inbox-arrow-down"
                  type={list === 'MESSAGE_REQUESTS' ? 'mini' : 'outline'}
                  size={20}
                />
              </Box>
              <Text
                flex={1}
                typography={
                  list === 'MESSAGE_REQUESTS'
                    ? 'text-base/bold'
                    : 'text-base/regular'
                }>
                {translate('message_requests')}
              </Text>
              {list === 'MESSAGE_REQUESTS' ? (
                <Icon
                  name={'check-circle'}
                  size={24}
                  color={colors.actionPositive}
                />
              ) : (
                <Box />
              )}
            </HStack>
          </Pressable>
        </VStack>
      </Drawer>
      <Drawer
        title="Consent"
        isOpen={showConsentDrawer}
        onBackgroundPress={() => setShowConsentDrawer(false)}>
        <VStack>
          <Text typography="text-base/regular">
            {translate('this_address_has_never_sent_you')}
          </Text>
          <HStack w={'100%'} justifyContent={'flex-end'}>
            <Button
              variant={'ghost'}
              onPress={() => setShowConsentDrawer(false)}>
              <Text typography="text-base/bold">{translate('no')}</Text>
            </Button>
            <Button
              variant={'ghost'}
              onPress={() => setShowConsentDrawer(false)}>
              <Text typography="text-base/bold">{translate('yes')}</Text>
            </Button>
          </HStack>
        </VStack>
      </Drawer>
    </>
  );
};
