import {BlurView} from '@react-native-community/blur';
import {Modal as BaseModal} from 'native-base';
import React, {FC, PropsWithChildren} from 'react';
import {StyleSheet, TouchableOpacity} from 'react-native';
import {colors} from '../../theme/colors';

interface ModalProps {
  isOpen: boolean;
  onBackgroundPress: () => void;
}

export const Modal: FC<PropsWithChildren<ModalProps>> = ({
  children,
  onBackgroundPress,
  isOpen,
}) => {
  if (!isOpen) {
    return null;
  }
  return (
    <>
      <BlurView style={styles.absolute} blurType="dark" blurAmount={10}>
        <TouchableOpacity
          onPress={onBackgroundPress}
          style={{width: '100%', height: '100%'}}
        />
      </BlurView>
      <BaseModal isOpen={isOpen} onClose={onBackgroundPress}>
        <BaseModal.Content backgroundColor={colors.backgroundPrimary}>
          <BaseModal.Body>{children}</BaseModal.Body>
        </BaseModal.Content>
      </BaseModal>
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
