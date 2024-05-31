import {Box, HStack, VStack} from 'native-base';
import React, {FC, useCallback} from 'react';
import {Pressable} from 'react-native';
import {AvatarWithFallback} from '../components/AvatarWithFallback';
import {Icon} from '../components/common/Icon';
import {Text} from '../components/common/Text';
import {useAddress} from '../hooks/useAddress';
import {useContactInfo} from '../hooks/useContactInfo';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {ScreenNames} from '../navigation/ScreenNames';

export interface ConversationListHeaderProps {
  list: 'ALL_MESSAGES' | 'MESSAGE_REQUESTS';
  showPickerModal: () => void;
  messageRequestCount: number;
  onShowMessageRequests: () => void;
}

export const ConversationListHeader: FC<ConversationListHeaderProps> = () => {
  const {navigate} = useTypedNavigation();
  const {address} = useAddress();
  const {avatarUrl} = useContactInfo(address);

  const handleNewMessagePress = useCallback(() => {
    navigate(ScreenNames.CreateGroup);
  }, [navigate]);

  const handleAccountPress = useCallback(() => {
    navigate(ScreenNames.Account);
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
        <Text typography="text-lg/heavy" textAlign={'center'}>
          {translate('group_chats')}
        </Text>
        <Box>
          <Pressable onPress={handleNewMessagePress}>
            <Icon name="plus-circle" size={40} color={'#4F46E5'} />
          </Pressable>
        </Box>
      </HStack>
    </VStack>
  );
};
