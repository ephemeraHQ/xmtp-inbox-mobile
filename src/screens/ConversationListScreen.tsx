import {useIsFocused} from '@react-navigation/native';
import {useAddress, useENS} from '@thirdweb-dev/react-native';
import {Box, Center, Fab, FlatList, HStack, VStack} from 'native-base';
import React, {FC, useCallback, useMemo, useState} from 'react';
import {ListRenderItem, Pressable} from 'react-native';
import {AvatarWithFallback} from '../components/AvatarWithFallback';
import {GroupListItem} from '../components/GroupListItem';
import {Button} from '../components/common/Button';
import {Drawer} from '../components/common/Drawer';
import {Icon} from '../components/common/Icon';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {TestIds} from '../consts/TestIds';
import {useClient} from '../hooks/useClient';
import {useListMessages} from '../hooks/useListMessages';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {ListGroup, ListMessages} from '../models/ListMessages';
import {ScreenNames} from '../navigation/ScreenNames';
import {colors} from '../theme/colors';

const EmptyBackground = require('../../assets/images/Bg_asset.svg').default;

const keyExtractor = (item: ListGroup) => item.group?.id ?? '';

const useData = () => {
  const {client} = useClient();
  const {data, isLoading, refetch, isRefetching, isError, error} =
    useListMessages();

  const {listItems, requests} = useMemo(() => {
    const listMessages: ListMessages = [];
    const requestsItems: ListMessages = [];
    data?.forEach(item => {
      if ('conversation' in item) {
        if (item.isRequest) {
          requestsItems.push(item);
        } else {
          listMessages.push(item);
        }
      } else {
        listMessages.push(item);
      }
    });
    return {listItems: listMessages, requests: requestsItems};
  }, [data]);

  console.log('Connected as address:', client?.address);

  return {
    messageRequests: requests,
    messages: listItems,
    isLoading,
    refetch,
    isRefetching,
    isError,
    error,
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

  const handleAccountPress = useCallback(() => {
    navigate(ScreenNames.Account);
  }, [navigate]);
  const navigateToDev = useCallback(() => {
    if (__DEV__) {
      navigate(ScreenNames.Dev);
    }
  }, [navigate]);
  return (
    <VStack marginTop={'4px'}>
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
              onLongPress={navigateToDev}
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
                {list === 'ALL_MESSAGES'
                  ? translate('all_messages')
                  : translate('message_requests')}
              </Text>
            </Button>
          </Box>
        </Box>
        <Box width={10} />
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
            {translate('message_requests_from_new_addresses')}
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
  const {messages, messageRequests, isLoading, refetch, isRefetching} =
    useData();
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

  const renderItem: ListRenderItem<ListGroup> = useCallback(({item}) => {
    return (
      <GroupListItem
        group={item.group}
        display={item.display}
        lastMessageTime={item.lastMessageTime}
      />
    );
  }, []);

  return (
    <>
      <Screen testId={TestIds.CONVERSATION_LIST_SCREEN}>
        <FlatList
          w={'100%'}
          h={'100%'}
          onRefresh={refetch}
          refreshing={isRefetching}
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
            list === 'ALL_MESSAGES' && !isLoading ? (
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
            testID={TestIds.CONVERSATION_LIST_NEW_BUTTON}
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
          <Pressable
            onPress={() => handleFilterPress('ALL_MESSAGES')}
            testID={TestIds.CONVERSATION_LIST_ALL_MESSAGES_BUTTON}>
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
          <Pressable
            onPress={() => handleFilterPress('MESSAGE_REQUESTS')}
            testID={TestIds.CONVERSATION_LIST_REQUESTS_BUTTON}>
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
