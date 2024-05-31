import {LinkingOptions} from '@react-navigation/native';
import {ScreenNames} from './ScreenNames';
import {RootStackParams} from './StackParams';

const DEEP_LINK_PREFIX = 'ephemera-chat://';

export const createDeepLink = (path: string) => `${DEEP_LINK_PREFIX}${path}`;

export const linkingDefinition: LinkingOptions<RootStackParams> = {
  prefixes: [DEEP_LINK_PREFIX],
  config: {
    screens: {
      [ScreenNames.OnboardingConnectWallet]: 'onboarding_connect_wallet',
      [ScreenNames.OnboardingEnableIdentity]: 'onboarding_enable_identity',
      [ScreenNames.Account]: 'account',
      [ScreenNames.ConversationList]: 'conversation_list',
      [ScreenNames.NewConversation]: {
        path: 'new_conversation/:addresses',
        parse: {
          addresses: addresses => addresses.split(','),
        },
      },
      [ScreenNames.CreateGroup]: 'create_group',
      [ScreenNames.QRCode]: 'qr_code',
      [ScreenNames.UserProfiles]: 'user_profiles',
    },
  },
};
