import {useDisconnect, useSigner} from '@thirdweb-dev/react-native';
import {Client} from '@xmtp/react-native-sdk';
import {StatusBar, VStack} from 'native-base';
import React, {useCallback, useEffect, useState} from 'react';
import {Alert, DeviceEventEmitter, Image} from 'react-native';
import {Button} from '../components/common/Button';
import {Icon} from '../components/common/Icon';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {EventEmitterEvents} from '../consts/EventEmitters';
import {useClientContext} from '../context/ClientContext';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {translate} from '../i18n';
import {ScreenNames} from '../navigation/ScreenNames';
import {QueryKeys} from '../queries/QueryKeys';
import {encryptedStorage} from '../services/encryptedStorage';
import {PushNotifications} from '../services/pushNotifications';
import {queryClient} from '../services/queryClient';
import {colors} from '../theme/colors';
import {createClientOptions} from '../utils/clientOptions';
import {getAllListMessages} from '../utils/getAllListMessages';
import {withRequestLogger} from '../utils/logger';
import {streamAllMessages} from '../utils/streamAllMessages';

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
        const clientOptions = await createClientOptions();

        const client = await Client.create(signer, {
          ...clientOptions,
          preEnableIdentityCallback: async () => {
            setStep('ENABLE_IDENTITY');
            await enableIdentityPromise();
          },
          preCreateIdentityCallback: async () => {
            await createIdentityPromise();
          },
        });

        const pushClient = new PushNotifications(client);
        pushClient.subscribeToAllGroups();
        const keys = await client.exportKeyBundle();
        const address = client.address;
        encryptedStorage.saveClientKeys(address as `0x${string}`, keys);
        queryClient.prefetchQuery({
          queryKey: [QueryKeys.List, client?.address],
          queryFn: () =>
            withRequestLogger(getAllListMessages(client), {
              name: 'all_messages_list',
            }),
        });
        setClient(client);
        streamAllMessages(client);
      } catch (e: any) {
        console.log('Error creating client', e);
        Alert.alert('Error creating client', e?.message);
      }
    };
    startClientCreation();
  }, [setClient, signer]);

  const handleCreateIdentity = useCallback(() => {
    DeviceEventEmitter.emit(EventEmitterEvents.CREATE_IDENTITY);
  }, []);

  const handleEnableIdentity = useCallback(() => {
    DeviceEventEmitter.emit(EventEmitterEvents.ENABLE_IDENTITY);
  }, []);

  const handleDisconnectWallet = useCallback(async () => {
    await disconnect();
    navigate(ScreenNames.OnboardingConnectWallet);
  }, [navigate, disconnect]);

  return (
    <Screen includeTopPadding={false}>
      <StatusBar animated={true} backgroundColor="#00000000" hidden={true} />
      <Image
        source={require('../../assets/images/xmtp-logo-empty.png')}
        style={{justifyContent: 'center', alignItems: 'center', width: '100%'}}
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
        paddingX={'24px'}>
        {step === 'CREATE_IDENTITY' ? (
          <>
            <Text textAlign={'center'} typography="text-title/regular">
              {translate('step_1_of_2')}
            </Text>
            <Text textAlign={'center'} typography="text-4xl/bold">
              {translate('create_your_xmtp_identity')}
            </Text>
            <Text marginTop={2} textAlign={'center'}>
              {translate('now_that_your_wallet_is_connected')}
            </Text>
            <Button
              marginTop={6}
              paddingX={6}
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
              <Text
                paddingLeft={6}
                paddingY={2}
                typography="text-lg/heavy"
                color={colors.backgroundPrimary}>
                {translate('create_your_xmtp_identity')}
              </Text>
            </Button>
            <Button
              marginTop={4}
              variant={'ghost'}
              onPress={handleDisconnectWallet}>
              <Text typography="text-sm/bold" color={colors.actionNegative}>
                {translate('disconnect_wallet')}
              </Text>
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
              marginTop={6}
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
              <Text
                paddingY={2}
                paddingX={6}
                typography="text-lg/heavy"
                color={colors.backgroundPrimary}>
                {translate('connect_your_wallet')}
              </Text>
            </Button>
            <Button
              marginTop={4}
              variant={'ghost'}
              onPress={handleDisconnectWallet}>
              <Text typography="text-sm/bold" color={colors.actionNegative}>
                {translate('disconnect_wallet')}
              </Text>
            </Button>
          </>
        )}
      </VStack>
    </Screen>
  );
};
