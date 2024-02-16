import {BlurView} from '@react-native-community/blur';
import {Box, HStack, VStack} from 'native-base';
import React, {FC, PropsWithChildren} from 'react';
import {Platform, Pressable, StyleSheet} from 'react-native';
import {useGroupName} from '../hooks/useGroupName';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {colors} from '../theme/colors';
import {GroupAvatarStack} from './GroupAvatarStack';
import {Icon} from './common/Icon';
import {Text} from './common/Text';

interface GroupHeaderProps {
  peerAddresses: string[];
  onGroupPress: () => void;
  groupId: string;
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
  groupId,
}) => {
  const {goBack} = useTypedNavigation();
  const groupDisplayName = useGroupName(peerAddresses, groupId);

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
          <Text
            typography="text-lg/heavy"
            numberOfLines={1}
            textAlign={'center'}>
            {groupDisplayName}
          </Text>
        </VStack>
        <Pressable onPress={onGroupPress}>
          <GroupAvatarStack
            style={{paddingRight: 30}}
            addresses={peerAddresses}
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
    paddingRight: Platform.OS === 'ios' ? 0 : 20,
  },
});
