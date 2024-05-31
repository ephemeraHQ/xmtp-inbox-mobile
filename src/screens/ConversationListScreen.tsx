import {Group} from '@xmtp/react-native-sdk';
import {Box, Center, FlatList, HStack, VStack} from 'native-base';
import React, {useCallback, useMemo, useState} from 'react';
import {ListRenderItem, Pressable} from 'react-native';
import {ConversationListHeader} from '../components/ConversationListHeader';
import {GroupListItem} from '../components/GroupListItem';
import {Button} from '../components/common/Button';
import {Drawer} from '../components/common/Drawer';
import {Icon} from '../components/common/Icon';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {AppConfig} from '../consts/AppConfig';
import {SupportedContentTypes} from '../consts/ContentTypes';
import {TestIds} from '../consts/TestIds';
import {useClient} from '../hooks/useClient';
import {translate} from '../i18n';
import {useListQuery} from '../queries/useListQuery';
import {mmkvStorage} from '../services/mmkvStorage';
import {colors} from '../theme/colors';

const EmptyBackground = require('../../assets/images/Bg_asset.svg').default;

const keyExtractor = (item: Group<SupportedContentTypes>) => item.topic ?? '';

const useData = () => {
  const {client} = useClient();
  const {data, isLoading, refetch, isRefetching, isError, error} =
    useListQuery();

  const {listItems, requests, requestsCount} = useMemo(() => {
    const listMessages: Group<SupportedContentTypes>[] = [];
    const requestsItems: Group<SupportedContentTypes>[] = [];
    let requestCount = 0;
    data?.forEach(item => {
      if (
        !AppConfig.GROUP_CONSENT ||
        mmkvStorage.getGroupConsent(item.id) === 'allowed'
      ) {
        listMessages.push(item);
      } else {
        requestsItems.push(item);
        if ((mmkvStorage.getGroupConsent(item.id) ?? 'unknown') === 'unknown') {
          requestCount++;
        }
      }
    });
    return {
      listItems: listMessages,
      requests: requestsItems,
      requestsCount: requestCount,
    };
  }, [data]);

  console.log('Connected as address:', client?.address);

  return {
    messageRequests: requests,
    messageRequestsCount: requestsCount,
    messages: listItems,
    isLoading,
    refetch,
    isRefetching,
    isError,
    error,
  };
};

export const ConversationListScreen = () => {
  const [list, setList] = useState<'ALL_MESSAGES' | 'MESSAGE_REQUESTS'>(
    'ALL_MESSAGES',
  );
  const [showPickerModal, setShowPickerModal] = useState(false);
  const [showConsentDrawer, setShowConsentDrawer] = useState(false);
  const {
    messages,
    messageRequests,
    messageRequestsCount,
    isLoading,
    refetch,
    isRefetching,
  } = useData();

  const showPicker = () => {
    setShowPickerModal(true);
  };

  const handleFilterPress = useCallback(
    (type: 'ALL_MESSAGES' | 'MESSAGE_REQUESTS') => {
      setList(type);
      setShowPickerModal(false);
    },
    [],
  );

  const renderItem: ListRenderItem<Group<SupportedContentTypes>> = useCallback(
    ({item}) => {
      return <GroupListItem group={item} />;
    },
    [],
  );

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
            <ConversationListHeader
              showPickerModal={showPicker}
              list={list}
              messageRequestCount={messageRequestsCount}
              onShowMessageRequests={() => setList('MESSAGE_REQUESTS')}
            />
          }
          ListEmptyComponent={
            list === 'ALL_MESSAGES' && !isLoading ? (
              <Box flexGrow={1} paddingBottom={50}>
                <VStack
                  justifyContent={'center'}
                  alignItems={'center'}
                  flexGrow={1}
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
              </Box>
            ) : null
          }
          renderItem={renderItem}
          ListFooterComponent={<Box height={50} />}
        />
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
