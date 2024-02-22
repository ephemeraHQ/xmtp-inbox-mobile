import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import * as React from 'react';
import {Platform} from 'react-native';
import {useClientContext} from '../context/ClientContext';
import {AccountSettingsScreen} from '../screens/AccountSettingsScreen';
import {ConversationListScreen} from '../screens/ConversationListScreen';
import {ConversationScreen} from '../screens/ConversationScreen';
import {DevScreen} from '../screens/DevScreen';
import {GroupScreen} from '../screens/GroupScreen';
import {LoadingScreen} from '../screens/LoadingScreen';
import {NewConversationScreen} from '../screens/NewConversationScreen';
import {OnboardingConnectWalletScreen} from '../screens/OnboardingConnectWalletScreen';
import {OnboardingEnableIdentityScreen} from '../screens/OnboardingEnableIdentityScreen';
import {QrCodeScreen} from '../screens/QrCodeScreen';
import {SearchScreen} from '../screens/SearchScreen';
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
  const {client, loading} = useClientContext();

  return (
    <NavigationContainer linking={linkingDefinition}>
      {loading && (
        <LoadingStack.Navigator screenOptions={{headerShown: false}}>
          <LoadingStack.Screen
            name={ScreenNames.Loading}
            component={LoadingScreen}
          />
        </LoadingStack.Navigator>
      )}
      {!loading && !client && (
        <OnboardingStack.Navigator
          screenOptions={{
            headerShown: false,
            // https://github.com/Kureev/react-native-blur/issues/595
            animation: Platform.OS === 'android' ? 'none' : 'default',
          }}>
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
      {!loading && !!client && (
        <AuthenticatedStack.Navigator
          initialRouteName={ScreenNames.ConversationList}
          screenOptions={{
            headerShown: false,
            // https://github.com/Kureev/react-native-blur/issues/595
            animation: Platform.OS === 'android' ? 'none' : 'default',
          }}>
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
            name={ScreenNames.Group}
            component={GroupScreen}
          />
          <AuthenticatedStack.Screen
            name={ScreenNames.NewConversation}
            component={NewConversationScreen}
          />
          <AuthenticatedStack.Screen
            name={ScreenNames.Search}
            component={SearchScreen}
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
          {__DEV__ && (
            <AuthenticatedStack.Screen
              name={ScreenNames.Dev}
              component={DevScreen}
              options={{
                presentation: 'modal',
              }}
            />
          )}
        </AuthenticatedStack.Navigator>
      )}
    </NavigationContainer>
  );
};
