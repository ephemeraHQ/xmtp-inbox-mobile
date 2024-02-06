import {IButtonProps, Button as NativeButton} from 'native-base';
import React from 'react';
import {Platform} from 'react-native';

export const Button = (props: IButtonProps) => {
  // Bug related to Android and icons rendered by native-base
  const rightIcon = Platform.OS === 'ios' ? props.rightIcon : undefined;
  const leftIcon = Platform.OS === 'ios' ? props.leftIcon : undefined;

  return (
    <NativeButton
      borderRadius={'120px'}
      {...props}
      rightIcon={rightIcon}
      leftIcon={leftIcon}
    />
  );
};
