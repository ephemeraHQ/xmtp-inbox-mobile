import {BlurView} from '@react-native-community/blur';
import {Box, HStack, VStack} from 'native-base';
import React, {FC, PropsWithChildren} from 'react';
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

const HeaderContainer: FC<PropsWithChildren> = ({children}) => {
  if (Platform.OS === 'ios') {
    return (
      <BlurView style={styles.blur} blurType="light" blurAmount={5}>
        {children}
      </BlurView>
    );
  }
  return <Box style={styles.blur}>{children}</Box>;
};

export const ConversationHeader: FC<ConversationHeaderProps> = ({
  peerAddress,
  onAvatarPress,
}) => {
  const {goBack} = useTypedNavigation();
  const {displayName, avatarUrl} = useContactInfo(peerAddress);

  return (
    <HeaderContainer>
      <HStack
        w={'100%'}
        alignItems={'center'}
        alignContent={'space-around'}
        justifyContent={'space-between'}
        paddingLeft={3}
        paddingRight={4}>
        <Pressable onPress={goBack}>
          <Icon name="chevron-left-thick" size={24} />
        </Pressable>

        <VStack flex={1} paddingLeft={2}>
          <Text typography="text-lg/heavy">{displayName}</Text>
          <HStack alignItems={'center'}>
            <Icon name="ethereum" size={16} />
            <Text typography="text-xs/mono medium" color={colors.textSecondary}>
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
    </HeaderContainer>
  );
};

const styles = StyleSheet.create({
  blur: {
    position: 'absolute',
    width: '100%',
    zIndex: 10,
    elevation: 10,
    paddingTop: Platform.OS === 'ios' ? 60 : 20,
    paddingBottom: 8,
  },
});
