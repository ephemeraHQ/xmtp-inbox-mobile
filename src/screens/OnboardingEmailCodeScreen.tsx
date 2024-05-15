import {useLoginWithEmail} from '@privy-io/expo';
import {useRoute} from '@react-navigation/native';
import React, {useState} from 'react';
import {Button, Pressable, StyleSheet, Text, TextInput} from 'react-native';
import {Icon} from '../components/common/Icon';
import {Screen} from '../components/common/Screen';
import {useTypedNavigation} from '../hooks/useTypedNavigation';

export const OnboardingEmailCodeScreen = () => {
  const {goBack} = useTypedNavigation();
  const {params} = useRoute();
  const {email} = params as {email: string};
  const [code, setCode] = useState('');
  const [loading, setLoading] = useState(false);
  const [error] = useState('');
  const {loginWithCode} = useLoginWithEmail();

  const handleVerify = async () => {
    setLoading(true);
    try {
      const test = await loginWithCode({email, code});
      console.log('here1113', test);
    } catch (e) {
      // setError(e?.message);
    } finally {
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
      <Text style={styles.title}>Enter the code sent to {email}</Text>
      <TextInput
        style={styles.input}
        value={code}
        onChangeText={setCode}
        placeholder="Code"
        keyboardType="number-pad"
      />
      <Text style={styles.error}>{error}</Text>
      <Button title="Verify" onPress={handleVerify} disabled={loading} />
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
  error: {
    color: 'red',
    marginBottom: 16,
  },
});
