import {LinkingOptions} from '@react-navigation/native';
import {ScreenNames} from './ScreenNames';
import {RootStackParams} from './StackParams';

export const linkingDefinition: LinkingOptions<RootStackParams> = {
  prefixes: ['xmtp-chat://'],
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
      [ScreenNames.Search]: 'search',
      [ScreenNames.UserProfiles]: 'user_profiles',
    },
  },
};
