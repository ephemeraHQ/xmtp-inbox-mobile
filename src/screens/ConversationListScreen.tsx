import {useIsFocused} from '@react-navigation/native';
import {useAddress, useENS} from '@thirdweb-dev/react-native';
import {Conversation} from '@xmtp/react-native-sdk';
import {Group} from '@xmtp/react-native-sdk/build/lib/Group';
import {Box, Center, Fab, FlatList, HStack, VStack} from 'native-base';
import React, {FC, useCallback, useEffect, useState} from 'react';
import {ListRenderItem, Pressable} from 'react-native';
import {AvatarWithFallback} from '../components/AvatarWithFallback';
import {ConversationListItem} from '../components/ConversationListItem';
import {GroupListItem} from '../components/GroupListItem';
import {Button} from '../components/common/Button';
import {Drawer} from '../components/common/Drawer';
import {Icon} from '../components/common/Icon';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {useClient} from '../hooks/useClient';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {ScreenNames} from '../navigation/ScreenNames';
import {saveConsent} from '../services/mmkvStorage';
import {colors} from '../theme/colors';
import {getMessageTimeDisplay} from '../utils/getMessageTimeDisplay';

const EmptyBackground = require('../../assets/images/Bg_asset.svg').default;

const keyExtractor = (item: ListConversation | ListGroup) =>
  'conversation' in item ? item.conversation.topic : item.group.id;

interface ListItem {
  lastMessageTime: number;
  display: string;
  isRequest: boolean;
}

interface ListConversation extends ListItem {
  conversation: Conversation<any>;
}

interface ListGroup extends ListItem {
  group: Group<any>;
}

const useData = () => {
  const [initialLoading, setInitialLoading] = useState(true);
  const [listItems, setListItems] = useState<(ListConversation | ListGroup)[]>(
    [],
  );
  const [requests, setRequests] = useState<(ListConversation | ListGroup)[]>(
    [],
  );
  const {client} = useClient();

  const getAllMessages = useCallback(async () => {
    if (!client) {
      return;
    }
    const consentList = await client.contacts.refreshConsentList();
    consentList.forEach(async item => {
      saveConsent(
        client.address,
        item.value,
        item.permissionType === 'allowed',
      );
    });
    const [convos, groups] = await Promise.all([
      client.conversations.list(),
      client.conversations.listGroups(),
    ]);
    const allMessages: (ListConversation | ListGroup)[] = await Promise.all([
      ...convos.map(async conversation => {
        const [messages, consent] = await Promise.all([
          conversation.messages(1),
          conversation.consentState(),
        ]);
        const content = messages[0].content();
        return {
          conversation,
          display:
            typeof content === 'string' ? content : messages[0].fallback ?? '',
          lastMessageTime: messages[0].sent,
          isRequest: consent !== 'allowed',
        };
      }),
      ...groups.map(async group => {
        const messages = await group.messages();
        const content = messages[0].content();
        const display =
          typeof content === 'string' ? content : messages[0].fallback ?? '';
        return {
          group,
          display,
          lastMessageTime: messages[0].sent,
          isRequest: false,
        };
      }),
    ]);
    const sorted = allMessages.sort((a, b) => {
      return b.lastMessageTime - a.lastMessageTime;
    });
    setListItems(sorted.filter(convo => !convo.isRequest));
    setRequests(sorted.filter(convo => convo.isRequest));
    return;
  }, [client]);

  useEffect(() => {
    getAllMessages().then(() => setInitialLoading(false));
  }, [getAllMessages]);

  useEffect(() => {
    const startStream = () => {
      if (!client) {
        return;
      }
      client.conversations.streamAllMessages(async message => {
        const topic = message.topic;
        setListItems(prev => {
          const content = message.content();
          const messageStringContent =
            typeof content === 'string' ? content : message.fallback ?? '';
          const existingConversation = prev.find(
            it => 'topic' in it && it.topic === topic,
          );
          // Handle existing conversations here, new conversations handled in stream
          if (existingConversation) {
            return prev.map(it =>
              'topic' in it && it.topic === topic
                ? {
                    ...it,
                    lastMessage: messageStringContent,
                    lastMessageTime: message.sent,
                    timeDisplay: getMessageTimeDisplay(message.sent),
                  }
                : it,
            );
          } else {
            return prev;
          }
        });
      });
    };

    startStream();

    return () => {
      client?.conversations.cancelStreamAllMessages();
    };
  }, [client]);

  useEffect(() => {
    const startStream = () => {
      if (!client) {
        return;
      }
      client.conversations.stream(async newConversation => {
        const [messages, consent] = await Promise.all([
          newConversation.messages(1),
          newConversation.consentState(),
        ]);
        const content = messages[0].content();
        const messageStringContent =
          typeof content === 'string' ? content : messages[0].fallback ?? '';
        setListItems(prev => [
          {
            conversation: newConversation,
            display: messageStringContent,
            lastMessageTime: messages[0].sent,
            isRequest: consent !== 'allowed',
          },
          ...prev,
        ]);
      });
    };

    startStream();

    return () => {
      client?.conversations.cancelStream();
      client?.conversations.cancelStreamAllMessages();
    };
  }, [client, getAllMessages]);

  console.log('Connected as address:', client?.address);

  return {
    messageRequests: requests,
    messages: listItems,
    initialLoading,
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
  const address = useAddress();
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
          <AvatarWithFallback
            address={address ?? ''}
            avatarUri={avatarUrl}
            size={40}
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
  const {messages, messageRequests, initialLoading} = useData();
  const {navigate} = useTypedNavigation();

  const showPicker = () => {
    setShowPickerModal(true);
  };

  const handleNewMessagePress = useCallback(() => {
    navigate(ScreenNames.Search);
  }, [navigate]);

  const handleFilterPress = useCallback(
    (type: 'ALL_MESSAGES' | 'MESSAGE_REQUESTS') => {
      setList(type);
      setShowPickerModal(false);
    },
    [],
  );

  const renderItem: ListRenderItem<ListConversation | ListGroup> = useCallback(
    ({item}) => {
      if ('conversation' in item) {
        return (
          <ConversationListItem
            conversation={item.conversation}
            display={item.display}
            lastMessageTime={item.lastMessageTime}
          />
        );
      }
      return (
        <GroupListItem
          group={item.group}
          display={item.display}
          lastMessageTime={item.lastMessageTime}
        />
      );
    },
    [],
  );

  return (
    <>
      <Screen>
        <FlatList
          w={'100%'}
          h={'100%'}
          keyExtractor={keyExtractor}
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
            list === 'ALL_MESSAGES' && !initialLoading ? (
              <VStack
                justifyContent={'center'}
                alignItems={'center'}
                height={'100%'}>
                <Center paddingBottom={'32px'} alignSelf={'center'}>
                  <EmptyBackground />
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
