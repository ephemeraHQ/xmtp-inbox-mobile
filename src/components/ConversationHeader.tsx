import {BlurView} from '@react-native-community/blur';
import {Box, HStack, VStack} from 'native-base';
import React, {FC} from 'react';
import {Platform, Pressable, StyleSheet} from 'react-native';
import {useContactInfo} from '../hooks/useContactInfo';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {colors} from '../theme/colors';
import {formatAddress} from '../utils/formatAddress';
import {AvatarWithFallback} from './AvatarWithFallback';
import {Icon} from './common/Icon';
import {Text} from './common/Text';

interface ConversationHeaderProps {
  peerAddress: string;
  onAvatarPress: () => void;
}

export const ConversationHeader: FC<ConversationHeaderProps> = ({
  peerAddress,
  onAvatarPress,
}) => {
  const {goBack} = useTypedNavigation();
  const {displayName, avatarUrl} = useContactInfo(peerAddress);

  return (
    <BlurView style={styles.blur} blurType="light" blurAmount={5}>
      <Box width="100%">
        <HStack
          w={'100%'}
          alignItems={'center'}
          paddingLeft={3}
          paddingRight={4}>
          <Pressable onPress={goBack}>
            <Icon name="chevron-left-thick" size={24} />
          </Pressable>

          <VStack flex={1} paddingLeft={2}>
            <Text typography="text-lg/heavy">{displayName}</Text>
            <HStack alignItems={'center'}>
              <Icon name="ethereum" size={16} />
              <Text
                typography="text-xs/mono medium"
                color={colors.textSecondary}>
                {formatAddress(peerAddress)}
              </Text>
            </HStack>
          </VStack>
          <Pressable onPress={onAvatarPress}>
            <AvatarWithFallback
              avatarUri={avatarUrl}
              style={{marginLeft: 2}}
              size={40}
              address={peerAddress}
            />
          </Pressable>
        </HStack>
      </Box>
    </BlurView>
  );
};

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    elevation: 200,
    paddingTop: Platform.OS === 'ios' ? 60 : 0,
    paddingBottom: 8,
  },
});
