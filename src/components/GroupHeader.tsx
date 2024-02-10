import {BlurView} from '@react-native-community/blur';
import {Box, HStack, VStack} from 'native-base';
import React, {FC, PropsWithChildren} from 'react';
import {Platform, Pressable, StyleSheet} from 'react-native';
import {useGroupContactInfo} from '../hooks/useGroupContactInfo';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {colors} from '../theme/colors';
import {GroupAvatarStack} from './GroupAvatarStack';
import {Icon} from './common/Icon';
import {Text} from './common/Text';

interface GroupHeaderProps {
  peerAddresses: string[];
  onGroupPress: () => void;
}

const HeaderContainer: FC<PropsWithChildren> = ({children}) => {
  if (Platform.OS === 'ios') {
    return (
      <BlurView style={styles.blur} blurType="light" blurAmount={5}>
        {children}
      </BlurView>
    );
  }
  return (
    <Box backgroundColor={colors.backgroundPrimary} style={styles.blur}>
      {children}
    </Box>
  );
};

export const GroupHeader: FC<GroupHeaderProps> = ({
  peerAddresses,
  onGroupPress,
}) => {
  const {goBack} = useTypedNavigation();
  const {data, groupDisplayName} = useGroupContactInfo(peerAddresses);

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

        <VStack flex={1} paddingLeft={2} alignItems={'flex-end'}>
          <Text typography="text-lg/heavy" numberOfLines={1}>
            {groupDisplayName}
          </Text>
          {/* <HStack alignItems={'center'}>
            <Icon name="ethereum" size={16} />
            <Text typography="text-xs/mono medium" color={colors.textSecondary}>
              {formatAddress(peerAddress)}
            </Text>
          </HStack> */}
        </VStack>
        <Pressable onPress={onGroupPress}>
          <GroupAvatarStack style={{paddingRight: 30}} data={data} />
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
    paddingRight: Platform.OS === 'ios' ? 0 : 20,
  },
});
