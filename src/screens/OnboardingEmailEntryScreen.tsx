import {useLoginWithEmail} from '@privy-io/expo';
import React, {useState} from 'react';
import {Button, Pressable, StyleSheet} from 'react-native';
import {Icon} from '../components/common/Icon';
import {Screen} from '../components/common/Screen';
import {Text} from '../components/common/Text';
import {TextInput} from '../components/common/TextInput';
import {useTypedNavigation} from '../hooks/useTypedNavigation';
import {ScreenNames} from '../navigation/ScreenNames';

export const OnboardingEmailEntryScreen = () => {
  const {navigate, goBack} = useTypedNavigation();
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const {sendCode} = useLoginWithEmail();

  const handleNext = async () => {
    setLoading(true);
    try {
      const test = await sendCode({email});
      console.log(test);
      setLoading(false);
      console.log('email', email);
      navigate(ScreenNames.OnboardingEmailCode, {
        email,
      });
    } catch (e) {
      console.log(e);
      setLoading(false);
    }
  };

  return (
    <Screen
      left={
        <Pressable onPress={goBack}>
          <Icon name="chevron-left-thick" />
        </Pressable>
      }>
      <Text style={styles.title}>What's your email?</Text>
      <TextInput
        style={styles.input}
        value={email}
        onChangeText={setEmail}
        placeholder="Email"
        keyboardType="email-address"
        autoCapitalize="none"
        autoCorrect={false}
      />
      <Button title="Next" onPress={handleNext} disabled={loading || !email} />
    </Screen>
  );
};

const styles = StyleSheet.create({
  input: {
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
});
