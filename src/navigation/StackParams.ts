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
  [ScreenNames.Group]: {topic: string};
  [ScreenNames.NewConversation]: {addresses: string[]};
  [ScreenNames.CreateGroup]: undefined;
  [ScreenNames.QRCode]: undefined;
  [ScreenNames.UserProfiles]: {address: string};
  [ScreenNames.Dev]: undefined;
};

export type RootStackParams = LoadingStackParams &
  OnboardingStackParams &
  AuthenticatedStackParams;
