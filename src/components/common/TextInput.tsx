import {IInputProps, Input} from 'native-base';
import React from 'react';

interface TextInputProps extends IInputProps {}

export const TextInput = (props: TextInputProps) => {
  const {style, ...rest} = props;
  return <Input style={style} {...rest} />;
};
