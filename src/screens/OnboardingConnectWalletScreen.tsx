import {
  WalletConfig,
  // coinbaseWallet,
  localWallet,
  metamaskWallet,
  useAddress,
  useConnect,
  walletConnect,
} from '@thirdweb-dev/react-native';
import {Box, VStack} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Image, Linking, StyleSheet} from 'react-native';
import Config from 'react-native-config';
import LinearGradient from 'react-native-linear-gradient';
import {WalletOptionButton} from '../components/WalletOptionButton';
import {Button} from '../components/common/Button';
import {Icon} from '../components/common/Icon';
import {Modal} from '../components/common/Modal';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {TestIds} from '../consts/TestIds';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {ScreenNames} from '../navigation/ScreenNames';
import {colors} from '../theme/colors';

const handleWalletInfo = () => {
  Linking.openURL('https://ethereum.org/en/wallets/find-wallet');
};

const metamaskConfig = metamaskWallet();
// const coinbaseWalletConfig = coinbaseWallet();
const walletConnectConfig = walletConnect();
const localWalletConfig = localWallet();

export const OnboardingConnectWalletScreen = () => {
  const {navigate} = useTypedNavigation();
  const address = useAddress();
  const connect = useConnect();
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    if (address) {
      navigate(ScreenNames.OnboardingEnableIdentity);
    }
  }, [address, navigate]);

  useEffect(() => {
    if (!Config.THRID_WEB_CLIENT_ID) {
      Alert.alert('Error', 'Please set the THRID_WEB_CLIENT_ID in .env file');
    }
  }, []);

  const handleConnect = useCallback(
    async (config: WalletConfig<any>) => {
      try {
        await connect(config);
        setShowModal(false);
        // Maybe a hack, feel like address should work from the useAddress hook
        // But seems like something fairly consistently goes wrong with the hook
        navigate(ScreenNames.OnboardingEnableIdentity);
      } catch (error: any) {
        console.error(error);
        Alert.alert(translate('wallet_error'), error?.message ?? '');
      }
    },
    [connect, navigate],
  );

  return (
    <>
      <Screen
        includeTopPadding={false}
        testId={TestIds.ONBOARDING_CONNECT_WALLET_SCREEN}>
        <Box width={'100%'}>
          <Image
            source={require('../../assets/images/XmtpOrangeLogo.png')}
            style={styles.image}
            resizeMode="cover"
          />
          <LinearGradient
            colors={['#FFFFFF00', '#FFFFFFFF', '#FFFFFFFF']}
            style={styles.linearGradient}
          />
        </Box>
        <VStack
          bottom={'1/6'}
          width={'100%'}
          flex={1}
          paddingX={'24px'}
          paddingTop={'80px'}>
          <Text typography="text-4xl/bold" textAlign={'center'}>
            {translate('your_interoperable_web3_inbox')}
          </Text>
          <Text textAlign={'center'} paddingTop={2} paddingBottom={6}>
            {translate(
              'youre_just_a_few_steps_away_from_secure_wallet_to_wallet_messaging',
            )}
          </Text>
          <>
            <Button
              rightIcon={
                <Icon
                  name="arrow-right-circle-thick"
                  color={colors.backgroundPrimary}
                  type="outline"
                  size={24}
                />
              }
              testID={TestIds.ONBOARDING_CONNECT_WALLET_BUTTON}
              onPress={() => setShowModal(true)}>
              <Text
                paddingY={2}
                typography="text-lg/heavy"
                color={colors.backgroundPrimary}>
                {translate('connect_your_wallet')}
              </Text>
            </Button>
            <Text
              paddingTop={4}
              textAlign={'center'}
              typography="text-sm/semibold"
              color={colors.textTertiary}>
              {translate('no_private_keys_will_be_shared')}
            </Text>
          </>
        </VStack>
      </Screen>
      <Modal onBackgroundPress={() => setShowModal(false)} isOpen={showModal}>
        <VStack>
          <Text typography="text-xl/bold" textAlign={'center'}>
            {translate('connect_your_wallet')}
          </Text>
          <Text
            typography="text-base/regular"
            textAlign={'center'}
            marginX={'-8px'}
            paddingBottom={'24px'}>
            {translate('you_can_connect_or_create')}
          </Text>
          <WalletOptionButton
            onPress={() => handleConnect(walletConnectConfig)}
            title={translate('walletconnect')}
            icon={'walletconnect'}
            testId={TestIds.ONBOARDING_CONNECT_WALLET_CONNECT_OPTION_BUTTON}
          />
          <WalletOptionButton
            onPress={() => handleConnect(metamaskConfig)}
            title={translate('metamask')}
            icon={'metamask'}
            testId={TestIds.ONBOARDING_CONNECT_METAMASK_OPTION_BUTTON}
          />
          {/* <WalletOptionButton
            onPress={() => handleConnect(coinbaseWalletConfig)}
            title={translate('coinbase_wallet')}
            icon={'coinbase-wallet'}
            testId={TestIds.ONBOARDING_CONNECT_COINBASE_OPTION_BUTTON}
          /> */}
          <WalletOptionButton
            onPress={() => handleConnect(localWalletConfig)}
            title={translate('guest_wallet')}
            icon={'wallet'}
            testId={TestIds.ONBOARDING_CONNECT_GUEST_OPTION_BUTTON}
          />
          <Button
            variant={'ghost'}
            onPress={handleWalletInfo}
            leftIcon={
              <Icon
                name="question-mark-circle"
                type="mini"
                size={20}
                color={colors.actionPrimary}
              />
            }>
            <Text typography="text-sm/bold" color={colors.actionPrimary}>
              {translate('whats_a_wallet')}
            </Text>
          </Button>
        </VStack>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  image: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
  },
  linearGradient: {
    width: '100%',
    height: 125,
    position: 'absolute',
    top: 500,
  },
});
