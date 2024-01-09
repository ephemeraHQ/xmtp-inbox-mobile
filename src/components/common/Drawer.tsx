import {BlurView} from '@react-native-community/blur';
import {Actionsheet} from 'native-base';
import React, {FC, PropsWithChildren} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {Text} from './Text';

interface DrawerProps {
  title: string;
  isOpen: boolean;
  onBackgroundPress: () => void;
}

export const Drawer: FC<PropsWithChildren<DrawerProps>> = ({
  title,
  children,
  onBackgroundPress,
  isOpen,
}) => {
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <BlurView style={styles.absolute} blurType="extraDark" blurAmount={10}>
        <TouchableOpacity
          onPress={onBackgroundPress}
          style={{width: '100%', height: '100%'}}
        />
      </BlurView>
      <Actionsheet.Content>
        <Text typography="text-lg/heavy">{title}</Text>
        {children}
      </Actionsheet.Content>
    </>
  );
};

const styles = StyleSheet.create({
  absolute: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.65)',
  },
});
