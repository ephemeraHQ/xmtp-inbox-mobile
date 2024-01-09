import {VStack} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {Image} from 'react-native';
import {Button} from '../components/common/Button';
import {Icon} from '../components/common/Icon';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {ScreenNames} from '../navigation/ScreenNames';
import {colors} from '../theme/colors';

type Step = 'CREATE_IDENTITY' | 'ENABLE_IDENTITY';

export const OnboardingEnableIdentityScreen = () => {
  const [step, setStep] = useState<Step>('CREATE_IDENTITY');
  const {navigate} = useTypedNavigation();
  useEffect(() => {
    // TODO: Check if identity exists
    // setStep('ENABLE_IDENTITY');
  }, []);
  const handleCreateIdentity = useCallback(() => {
    setStep('ENABLE_IDENTITY');
  }, []);

  const handleEnableIdentity = useCallback(() => {
    // return callback();
  }, []);

  const handleDisconnectWallet = useCallback(() => {
    // TODO: Disconnect wallet
    navigate(ScreenNames.OnboardingConnectWallet);
  }, [navigate]);

  return (
    <Screen>
      <Image
        source={require('../../assets/images/xmtp-logo-empty.png')}
        style={{justifyContent: 'center', alignItems: 'center'}}
      />
      <VStack
        position={'absolute'}
        bottom={'1/6'}
        backgroundColor={'warmGray.100'}
        width={'100%'}
        alignItems={'center'}
        background={colors.backgroundPrimary}
        flex={1}
        justifyContent={'space-evenly'}
        marginX={'24'}>
        {step === 'CREATE_IDENTITY' ? (
          <>
            <Text typography="text-title/regular">Step 1 of 2</Text>
            <Text typography="text-4xl/bold">Create your XMTP identity </Text>
            <Text>{translate('now_that_your_wallet_is_connected')}</Text>
            <Button
              variant={'solid'}
              backgroundColor={'brand.800'}
              rightIcon={
                <Icon
                  name="arrow-right-circle-thick"
                  size={24}
                  color={colors.actionPrimaryText}
                />
              }
              onPress={handleCreateIdentity}>
              {translate('create_your_xmtp_identity')}
            </Button>
            <Button
              variant={'ghost'}
              // backgroundColor={'brand.800'}
              onPress={handleDisconnectWallet}
              color={colors.actionNegative}>
              {translate('disconnect_wallet')}
            </Button>
          </>
        ) : (
          <>
            <Text typography="text-title/regular">Step 2 of 2</Text>
            <Text typography="text-4xl/bold">
              {translate('your_interoperable_web3_inbox')}
            </Text>
            <Text>
              {translate(
                'youre_just_a_few_steps_away_from_secure_wallet_to_wallet_messaging',
              )}
            </Text>
            <Button
              variant={'solid'}
              backgroundColor={'brand.800'}
              rightIcon={
                <Icon
                  name="arrow-right-circle-thick"
                  size={24}
                  color={colors.actionPrimaryText}
                />
              }
              onPress={handleEnableIdentity}>
              {translate('connect_your_wallet')}
            </Button>
            <Button
              variant={'ghost'}
              // backgroundColor={'brand.800'}
              onPress={handleDisconnectWallet}
              color={colors.actionNegative}>
              {translate('disconnect_wallet')}
            </Button>
          </>
        )}
      </VStack>
    </Screen>
  );
};
