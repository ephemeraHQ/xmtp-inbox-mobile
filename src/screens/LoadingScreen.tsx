import {BlurView} from '@react-native-community/blur';
import {Box, Center} from 'native-base';
import React from 'react';
import {ImageBackground} from 'react-native';
import {Screen} from '../components/common/Screen';

export const LoadingScreen = () => {
  return (
    <Screen containerStlye={{justifyContent: 'center', alignItems: 'center'}}>
      <Center>
        <ImageBackground
          source={require('../../assets/images/welcome.png')}
          style={{justifyContent: 'center', alignItems: 'center'}}>
          <BlurView
            blurType="light"
            blurRadius={200}
            blurAmount={1}
            style={{borderRadius: 200}}>
            <Box height={'200px'} width={'200px'} borderRadius={'200px'} />
          </BlurView>
        </ImageBackground>
      </Center>
    </Screen>
  );
};
