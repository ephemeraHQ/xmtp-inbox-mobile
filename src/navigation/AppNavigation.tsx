import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {useAuthed} from '../hooks/useAuthed';
import {AccountSettingsScreen} from '../screens/AccountSettingsScreen';
import {ConversationListScreen} from '../screens/ConversationListScreen';
import {ConversationScreen} from '../screens/ConversationScreen';
import {DiscoverScreen} from '../screens/DiscoverScreen';
import {LoadingScreen} from '../screens/LoadingScreen';
import {NewMessageScreen} from '../screens/NewMessageScreen';
import {OnboardingConnectWalletScreen} from '../screens/OnboardingConnectWalletScreen';
import {OnboardingEnableIdentityScreen} from '../screens/OnboardingEnableIdentityScreen';
import {QrCodeScreen} from '../screens/QrCodeScreen';
import {UserProfilesScreen} from '../screens/UserProfilesScreen';
import {ScreenNames} from './ScreenNames';
import {
  AuthenticatedStackParams,
  LoadingStackParams,
  OnboardingStackParams,
} from './StackParams';
import {linkingDefinition} from './linkingDefinition';

const LoadingStack = createNativeStackNavigator<LoadingStackParams>();

const AuthenticatedStack =
  createNativeStackNavigator<AuthenticatedStackParams>();

const OnboardingStack = createNativeStackNavigator<OnboardingStackParams>();

export const AppNavigation = () => {
  const {status} = useAuthed();
  return (
    <NavigationContainer linking={linkingDefinition}>
      {status === 'LOADING' && (
        <LoadingStack.Navigator screenOptions={{headerShown: false}}>
          <LoadingStack.Screen
            name={ScreenNames.Loading}
            component={LoadingScreen}
          />
        </LoadingStack.Navigator>
      )}
      {status === 'UNAUTHED' && (
        <OnboardingStack.Navigator screenOptions={{headerShown: false}}>
          <OnboardingStack.Screen
            name={ScreenNames.OnboardingConnectWallet}
            component={OnboardingConnectWalletScreen}
          />
          <OnboardingStack.Screen
            name={ScreenNames.OnboardingEnableIdentity}
            component={OnboardingEnableIdentityScreen}
          />
        </OnboardingStack.Navigator>
      )}
      {status === 'AUTHED' && (
        <AuthenticatedStack.Navigator
          initialRouteName={ScreenNames.ConversationList}
          screenOptions={{headerShown: false}}>
          <AuthenticatedStack.Screen
            name={ScreenNames.Account}
            component={AccountSettingsScreen}
            options={{
              presentation: 'modal',
            }}
          />
          <AuthenticatedStack.Screen
            name={ScreenNames.ConversationList}
            component={ConversationListScreen}
          />
          <AuthenticatedStack.Screen
            name={ScreenNames.Conversation}
            component={ConversationScreen}
          />
          <AuthenticatedStack.Screen
            name={ScreenNames.Discover}
            component={DiscoverScreen}
          />
          <AuthenticatedStack.Screen
            name={ScreenNames.NewMessage}
            component={NewMessageScreen}
            options={{
              presentation: 'modal',
            }}
          />
          <AuthenticatedStack.Screen
            name={ScreenNames.QRCode}
            component={QrCodeScreen}
            options={{
              presentation: 'modal',
            }}
          />
          <AuthenticatedStack.Screen
            name={ScreenNames.UserProfiles}
            component={UserProfilesScreen}
            options={{
              presentation: 'modal',
            }}
          />
        </AuthenticatedStack.Navigator>
      )}
    </NavigationContainer>
  );
};
