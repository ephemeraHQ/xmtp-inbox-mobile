import Clipboard from '@react-native-clipboard/clipboard';
import {BlurView} from '@react-native-community/blur';
import {Box, Center, Pressable} from 'native-base';
import React, {useCallback} from 'react';
import {Platform, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import QRCode from 'react-native-qrcode-svg';
import {Button} from '../components/common/Button';
import {Icon} from '../components/common/Icon';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {useAddress} from '../hooks/useAddress';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {createDeepLink} from '../navigation/linkingDefinition';
import {blues, colors, reds} from '../theme/colors';

export const QrCodeScreen = () => {
  const {goBack} = useTypedNavigation();
  const {address} = useAddress();
  const value = createDeepLink(`new_conversation/${address}`);
  const handleCopy = useCallback(() => {
    Clipboard.setString(value);
  }, [value]);
  return (
    <>
      <BlurView style={styles.absolute} blurType="light" blurAmount={10} />
      <LinearGradient
        style={styles.flex}
        colors={[reds[700], blues[900]]}
        start={{x: 0, y: 0}}
        end={{x: 0, y: 1}}>
        <Screen
          title={
            <Text typography="text-lg/heavy" color={colors.backgroundPrimary}>
              {translate('you')}
            </Text>
          }
          includeTopPadding={Platform.OS === 'android'}
          includeBackground={false}
          right={
            <Pressable onPress={goBack}>
              <Icon name="x-circle" color={colors.backTertiary} size={24} />
            </Pressable>
          }>
          <Center flex={1}>
            <Box
              padding={'22px'}
              borderRadius={'24px'}
              backgroundColor={colors.backgroundPrimary}>
              <QRCode
                value={value}
                logo={require('../../assets/images/xmtp.png')}
                logoSize={72}
                logoBackgroundColor={colors.backgroundPrimary}
                size={232}
              />
            </Box>
            <Button
              variant="ghost"
              marginTop={'32px'}
              onPress={handleCopy}
              rightIcon={
                <Icon
                  name="arrow-up-on-square"
                  type="outline"
                  color={colors.backgroundPrimary}
                  size={21}
                />
              }>
              <Text typography="text-sm/bold" color={colors.backgroundPrimary}>
                {translate('copy_your_code')}
              </Text>
            </Button>
          </Center>
        </Screen>
      </LinearGradient>
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
  flex: {
    flex: 1,
  },
});
