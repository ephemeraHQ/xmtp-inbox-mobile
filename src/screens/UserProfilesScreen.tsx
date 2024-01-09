import {useRoute} from '@react-navigation/native';
import React from 'react';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';

export const UserProfilesScreen = () => {
  const {params} = useRoute();
  const {address} = params as {address: string};

  return (
    <Screen>
      <Text>UserProfilesScreen</Text>
      <Text>{address}</Text>
    </Screen>
  );
};
