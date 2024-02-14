import {Box, HStack} from 'native-base';
import React, {FC} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {useContactInfo} from '../hooks/useContactInfo';
import {AvatarWithFallback} from './AvatarWithFallback';

interface GroupAvatarStackProps {
  addresses: string[];
  style?: ViewStyle;
}

const AvatarWithLoader = ({address}: {address: string}) => {
  const {avatarUrl, loading} = useContactInfo(address);
  if (loading) {
    return (
      <AvatarWithFallback address={address} size={32} style={styles.avatar} />
    );
  }
  return (
    <AvatarWithFallback
      style={styles.avatar}
      address={address}
      avatarUri={avatarUrl}
      size={32}
    />
  );
};

export const GroupAvatarStack: FC<GroupAvatarStackProps> = ({
  addresses,
  style,
}) => {
  return (
    <Box style={style}>
      <HStack maxW={'20px'}>
        {addresses.slice(0, 4).map(address => (
          <AvatarWithLoader key={address} address={address} />
        ))}
      </HStack>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
  },
  avatar: {
    marginRight: -25,
  },
});
