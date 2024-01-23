import {LinkingOptions} from '@react-navigation/native';
import {ScreenNames} from './ScreenNames';
import {RootStackParams} from './StackParams';

export const linkingDefinition: LinkingOptions<RootStackParams> = {
  prefixes: ['xmtp://'],
  config: {
    screens: {
      [ScreenNames.OnboardingConnectWallet]: 'onboarding_connect_wallet',
      [ScreenNames.OnboardingEnableIdentity]: 'onboarding_enable_identity',
      [ScreenNames.Account]: 'account',
      [ScreenNames.ConversationList]: 'conversation_list',
      [ScreenNames.Conversation]: 'conversation/:topic',
      [ScreenNames.NewConversation]: 'new_conversation/:address',
      [ScreenNames.Discover]: 'discover',
      [ScreenNames.Search]: 'search',
      [ScreenNames.QRCode]: 'qr_code',
      [ScreenNames.UserProfiles]: 'user_profiles',
    },
  },
};
