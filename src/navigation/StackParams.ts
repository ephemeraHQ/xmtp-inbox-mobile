import {ScreenNames} from './ScreenNames';

export type LoadingStackParams = {
  [ScreenNames.Loading]: undefined;
};

export type OnboardingStackParams = {
  [ScreenNames.OnboardingConnectWallet]: undefined;
  [ScreenNames.OnboardingEnableIdentity]: undefined;
  [ScreenNames.OnboardingEmailEntry]: undefined;
  [ScreenNames.OnboardingEmailCode]: {email: string};
};

export type AuthenticatedStackParams = {
  [ScreenNames.Account]: undefined;
  [ScreenNames.ConversationList]: undefined;
  [ScreenNames.Group]: {id: string};
  [ScreenNames.NewConversation]: {addresses: string[]};
  [ScreenNames.Search]: undefined;
  [ScreenNames.QRCode]: undefined;
  [ScreenNames.UserProfiles]: {address: string};
  [ScreenNames.Dev]: undefined;
};

export type RootStackParams = LoadingStackParams &
  OnboardingStackParams &
  AuthenticatedStackParams;
