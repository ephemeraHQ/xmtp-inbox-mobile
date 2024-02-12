import {useDisconnect, useSigner} from '@thirdweb-dev/react-native';
import {Client, RemoteAttachmentCodec} from '@xmtp/react-native-sdk';
import {VStack} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {DeviceEventEmitter, Image} from 'react-native';
import {Button} from '../components/common/Button';
import {Icon} from '../components/common/Icon';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {AppConfig} from '../consts/AppConfig';
import {EventEmitterEvents} from '../consts/EventEmitters';
import {useClientContext} from '../context/ClientContext';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {ScreenNames} from '../navigation/ScreenNames';
import {saveClientKeys} from '../services/encryptedStorage';
import {colors} from '../theme/colors';

type Step = 'CREATE_IDENTITY' | 'ENABLE_IDENTITY';

const createIdentityPromise = async () =>
  await new Promise<void>(resolve => {
    const sub = DeviceEventEmitter.addListener(
      EventEmitterEvents.CREATE_IDENTITY,
      () => {
        sub?.remove();
        resolve();
      },
    );
  });

const enableIdentityPromise = async () =>
  await new Promise<void>(resolve => {
    const sub = DeviceEventEmitter.addListener(
      EventEmitterEvents.ENABLE_IDENTITY,
      () => {
        sub?.remove();
        resolve();
      },
    );
  });

export const OnboardingEnableIdentityScreen = () => {
  const [step, setStep] = useState<Step>('CREATE_IDENTITY');
  const {navigate} = useTypedNavigation();
  const disconnect = useDisconnect();
  const signer = useSigner();
  const {setClient} = useClientContext();

  useEffect(() => {
    const startClientCreation = async () => {
      if (!signer) {
        return;
      }
      try {
        const client = await Client.create(signer, {
          enableAlphaMls: AppConfig.GROUPS_ENABLED,
          env: AppConfig.XMTP_ENV,
          preEnableIdentityCallback: async () => {
            await enableIdentityPromise();
          },
          preCreateIdentityCallback: async () => {
            await createIdentityPromise();
          },
          codecs: [new RemoteAttachmentCodec()],
        });
        const keys = await client.exportKeyBundle();
        const address = await signer.getAddress();
        saveClientKeys(address as `0x${string}`, keys);
        setClient(client);
      } catch (e) {
        console.log('Error creating client', e);
      }
    };
    startClientCreation();
  }, [setClient, signer]);

  const handleCreateIdentity = useCallback(() => {
    DeviceEventEmitter.emit(EventEmitterEvents.CREATE_IDENTITY);
    setStep('ENABLE_IDENTITY');
  }, []);

  const handleEnableIdentity = useCallback(() => {
    DeviceEventEmitter.emit(EventEmitterEvents.ENABLE_IDENTITY);
  }, []);

  const handleDisconnectWallet = useCallback(async () => {
    await disconnect();
    navigate(ScreenNames.OnboardingConnectWallet);
  }, [navigate, disconnect]);

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
