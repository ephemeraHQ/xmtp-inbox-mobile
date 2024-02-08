import {Avatar, Box} from 'native-base';
import React, {FC} from 'react';
import {StyleSheet, ViewStyle} from 'react-native';
import {AvatarWithFallback} from './AvatarWithFallback';

interface GroupAvatarStackProps {
  data: {
    avatarUrl: string | null;
    address: string;
  }[];
  style?: ViewStyle;
}

export const GroupAvatarStack: FC<GroupAvatarStackProps> = ({data, style}) => {
  return (
    <Box style={style}>
      <Avatar.Group max={3}>
        {data.map(({avatarUrl, address}) => (
          <AvatarWithFallback
            key={address}
            size={32}
            address={address}
            avatarUri={avatarUrl}
            style={styles.avatar}
          />
        ))}
      </Avatar.Group>
    </Box>
  );
};

const styles = StyleSheet.create({
  container: {
    // flexDirection: 'row',
  },
  avatar: {
    marginRight: -40,
  },
});
