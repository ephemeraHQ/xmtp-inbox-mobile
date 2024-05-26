import {useAddress, useENS} from '@thirdweb-dev/react-native';
import {Box, HStack, VStack} from 'native-base';
import React, {FC, useCallback} from 'react';
import {Pressable} from 'react-native';
import {AvatarWithFallback} from '../components/AvatarWithFallback';
import {Button} from '../components/common/Button';
import {Icon} from '../components/common/Icon';
import {Text} from '../components/common/Text';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {ScreenNames} from '../navigation/ScreenNames';
import {colors} from '../theme/colors';

export interface ConversationListHeaderProps {
  list: 'ALL_MESSAGES' | 'MESSAGE_REQUESTS';
  showPickerModal: () => void;
  messageRequestCount: number;
  onShowMessageRequests: () => void;
}

export const ConversationListHeader: FC<ConversationListHeaderProps> = ({
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
              _pressed={{backgroundColor: 'transparent'}}
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
