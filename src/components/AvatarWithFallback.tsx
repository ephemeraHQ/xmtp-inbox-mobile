import {Avatar, Box} from 'native-base';
import React, {FC} from 'react';
import {ViewStyle} from 'react-native';
import {Blockie} from './Blockie';

interface AvatarWithFallbackProps {
  address: string;
  avatarUri?: string | null;
  style?: ViewStyle;
  size: number;
}

export const AvatarWithFallback: FC<AvatarWithFallbackProps> = ({
  address,
  avatarUri,
  size,
  style,
}) => {
  if (avatarUri) {
    return (
      <Avatar
        width={`${size}px`}
        height={`${size}px`}
        source={{uri: avatarUri}}
      />
    );
  }
  if (address) {
    return (
      <Box style={style}>
        <Blockie address={address} size={size / 4} />
      </Box>
    );
  }

  return <Avatar width={`${size}px`} height={`${size}px`} source={undefined} />;
};
