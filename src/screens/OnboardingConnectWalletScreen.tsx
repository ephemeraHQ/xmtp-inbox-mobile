import {Box, VStack} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, Image, Linking, StyleSheet} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import {WalletOptionButton} from '../components/WalletOptionButton';
import {Button} from '../components/common/Button';
import {Icon} from '../components/common/Icon';
import {Modal} from '../components/common/Modal';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {TestIds} from '../consts/TestIds';
import {useWalletContext} from '../context/WalletContext';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {ScreenNames} from '../navigation/ScreenNames';
import {coinbaseWallet} from '../services/coinbaseWallet';
import {randomWallet} from '../services/randomWallet';
import {colors} from '../theme/colors';

const handleWalletInfo = () => {
  Linking.openURL('https://ethereum.org/en/wallets/find-wallet');
};

export const OnboardingConnectWalletScreen = () => {
  const {navigate} = useTypedNavigation();
  const {wallet, setWallet} = useWalletContext();
  const [showModal, setShowModal] = useState(false);
  const [coinbaseEnabled, setCoinbaseEnabled] = useState(false);

  useEffect(() => {
    if (wallet) {
      navigate(ScreenNames.OnboardingEnableIdentity);
    }
  }, [wallet, navigate]);

  useEffect(() => {
    const checkCoinbaseEnabled = async () => {
      const isEnabled = await coinbaseWallet.isAvailableToConnect();
      setCoinbaseEnabled(isEnabled);
    };
    checkCoinbaseEnabled();
  }, []);

  const handleRandomWalletConnect = useCallback(async () => {
    try {
      await randomWallet.connect();
      const isConnected = await randomWallet.isConnected();
      if (isConnected) {
        setWallet(randomWallet);
        setShowModal(false);
        navigate(ScreenNames.OnboardingEnableIdentity);
      } else {
        Alert.alert('Error', 'Failed to connect to Random Wallet');
      }
    } catch (error: any) {
      setShowModal(false);
      console.log('Error connecting to Random Wallet', error);
      Alert.alert('Error', error?.message ?? '');
    }
  }, [navigate, setWallet]);

  const handleCoinbaseWalletConnect = useCallback(async () => {
    try {
      await coinbaseWallet.connect();
      const isConnected = await coinbaseWallet.isConnected();
      if (isConnected) {
        setWallet(coinbaseWallet);
        setShowModal(false);
        navigate(ScreenNames.OnboardingEnableIdentity);
      } else {
        Alert.alert('Error', 'Failed to connect to Coinbase Wallet');
      }
    } catch (error: any) {
      setShowModal(false);
      console.log('Error connecting to Coinbase Wallet', error);
      Alert.alert('Error', error?.message ?? '');
    }
  }, [navigate, setWallet]);

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
          {coinbaseEnabled && (
            <WalletOptionButton
              onPress={handleCoinbaseWalletConnect}
              title={translate('coinbase_wallet')}
              icon={'coinbase-wallet'}
              testId={TestIds.ONBOARDING_CONNECT_WALLET_CONNECT_OPTION_BUTTON}
            />
          )}
          {/* <WalletOptionButton
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
          /> */}
          {/* <WalletOptionButton
            onPress={() => handleConnect(coinbaseWalletConfig)}
            title={translate('coinbase_wallet')}
            icon={'coinbase-wallet'}
            testId={TestIds.ONBOARDING_CONNECT_COINBASE_OPTION_BUTTON}
          /> */}
          <WalletOptionButton
            onPress={handleRandomWalletConnect}
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
