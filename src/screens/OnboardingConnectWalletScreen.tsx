import {BlurView} from '@react-native-community/blur';
import {
  coinbaseWallet,
  localWallet,
  metamaskWallet,
  useAddress,
  useConnect,
  walletConnect,
} from '@thirdweb-dev/react-native';
import {VStack} from 'native-base';
import React, {useEffect, useState} from 'react';
import {Image, Linking} from 'react-native';
import {WalletOptionButton} from '../components/WalletOptionButton';
import {Button} from '../components/common/Button';
import {Icon} from '../components/common/Icon';
import {Modal} from '../components/common/Modal';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {ScreenNames} from '../navigation/ScreenNames';
import {colors} from '../theme/colors';

const handleWalletInfo = () => {
  Linking.openURL('https://ethereum.org/en/wallets/find-wallet');
};

const metamaskConfig = metamaskWallet();
const coinbaseWalletConfig = coinbaseWallet();
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

  return (
    <>
      <Screen>
        <Image
          source={require('../../assets/images/XmtpOrangeLogo.png')}
          style={{justifyContent: 'center', alignItems: 'center'}}
        />
        <BlurView
          blurType="light"
          blurAmount={10}
          blurRadius={10}
          style={{height: 125, marginTop: -80, width: '100%'}}
        />
        <VStack
          position={'absolute'}
          bottom={'1/6'}
          width={'100%'}
          flex={1}
          paddingX={'24px'}>
          <Text testID="welcome-text-1" typography="text-4xl/bold">
            {translate('your_interoperable_web3_inbox')}
          </Text>
          <Text>
            {translate(
              'youre_just_a_few_steps_away_from_secure_wallet_to_wallet_messaging',
            )}
          </Text>
          <>
            <Button
              rightIcon={<Icon name="arrow-right-circle" />}
              onPress={() => setShowModal(true)}>
              {translate('connect_your_wallet')}
            </Button>
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
            onPress={async () => {
              await connect(walletConnectConfig);
              setShowModal(false);
            }}
            title={translate('walletconnect')}
            icon={'walletconnect'}
          />
          <WalletOptionButton
            onPress={async () => {
              await connect(metamaskConfig);
              setShowModal(false);
            }}
            title={translate('metamask')}
            icon={'metamask'}
          />
          <WalletOptionButton
            onPress={async () => {
              await connect(coinbaseWalletConfig);
              setShowModal(false);
            }}
            title={translate('coinbase_wallet')}
            icon={'coinbase-wallet'}
          />
          {__DEV__ && (
            <WalletOptionButton
              onPress={async () => {
                await connect(localWalletConfig);
                setShowModal(false);
              }}
              title={translate('guest_wallet')}
              icon={'wallet'}
            />
          )}

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
