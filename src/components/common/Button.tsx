import {IButtonProps, Button as NativeButton} from 'native-base';
import React from 'react';

export const Button = (props: IButtonProps) => {
  return <NativeButton borderRadius={'120px'} {...props} />;
};
