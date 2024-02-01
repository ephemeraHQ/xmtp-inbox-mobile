import {ConnectWallet, darkTheme, useAddress} from '@thirdweb-dev/react-native';
import {VStack} from 'native-base';
import React, {useEffect} from 'react';
import {Image} from 'react-native';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {ScreenNames} from '../navigation/ScreenNames';

export const OnboardingConnectWalletScreen = () => {
  const {navigate} = useTypedNavigation();
  const address = useAddress();

  useEffect(() => {
    if (address) {
      // TODO: Update to manage onboarding state
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
            <ConnectWallet
              theme={darkTheme({
                colors: {
                  buttonTextColor: '#FFFFFF',
                  background: '#000000',
                  accentButtonColor: 'red',
                  // buttonTextColor: colors.actionPrimaryText,
                  // buttonBackgroundColor: colors.actionPrimary,
                },
                buttonTextColor: '#FFFFFF',
                buttonBackgroundColor: '#4F46E5',
                buttonBorderColor: '#4F46E5',
                borderRadii: {
                  xs: 200,
                  sm: 200,
                  md: 200,
                  lg: 200,
                  xl: 200,
                  xxl: 200,
                },
              })}
              buttonTitle={translate('connect_your_wallet')}
            />
          </>
        </VStack>
      </Screen>
      {/* <Modal
        onBackgroundPress={() => setShowModal(false)}
        isOpen={showModal}
        title="Modal">
        <VStack>
          <Text typography="text-xl/bold" textAlign={'center'}>
            Connect your wallet
          </Text>

          <Button
            variant={'ghost'}
            leftIcon={
              <Icon
                name="question-mark-circle"
                type="mini"
                size={20}
                color={colors.actionPrimary}
              />
            }>
            <Text typography="text-sm/bold" color={colors.actionPrimary}>
              What's a wallet?
            </Text>
          </Button>
        </VStack>
      </Modal> */}
    </>
  );
};
