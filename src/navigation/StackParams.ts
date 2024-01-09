import {ScreenNames} from './ScreenNames';

export type LoadingStackParams = {
  [ScreenNames.Loading]: undefined;
};

export type OnboardingStackParams = {
  [ScreenNames.OnboardingConnectWallet]: undefined;
  [ScreenNames.OnboardingEnableIdentity]: undefined;
};

export type AuthenticatedStackParams = {
  [ScreenNames.Account]: undefined;
  [ScreenNames.ConversationList]: undefined;
  [ScreenNames.Conversation]: {topic: string};
  [ScreenNames.Discover]: undefined;
  [ScreenNames.NewMessage]: undefined;
  [ScreenNames.QRCode]: undefined;
  [ScreenNames.UserProfiles]: {address: string};
};

export type RootStackParams = LoadingStackParams &
  OnboardingStackParams &
  AuthenticatedStackParams;
