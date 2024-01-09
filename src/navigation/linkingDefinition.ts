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
      [ScreenNames.Conversation]: 'conversation',
      [ScreenNames.Discover]: 'discover',
      [ScreenNames.NewMessage]: 'new_message',
      [ScreenNames.QRCode]: 'qr_code',
      [ScreenNames.UserProfiles]: 'user_profiles',
    },
  },
};
