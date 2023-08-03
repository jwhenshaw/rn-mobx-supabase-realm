import React from 'react';
import { supabase } from '../lib/supabase';
import { Alert, Button, TextInput, View } from 'react-native';
import ViewContainer from '../ViewContainer';

export default function SignUp() {
  const [loading, setLoading] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');

  async function signUpWithEmail() {
    setLoading(true);
    const { error } = await supabase.auth.signUp({
      email: email,
      password: password,
    });

    if (error) {
      Alert.alert(error.message);
    }
    setLoading(false);
  }

  return (
    <ViewContainer>
      <View>
        <TextInput
          onChangeText={text => setEmail(text)}
          value={email}
          placeholder="email@address.com"
          autoCapitalize={'none'}
        />
      </View>
      <View>
        <TextInput
          onChangeText={text => setPassword(text)}
          value={password}
          secureTextEntry={true}
          placeholder="Password"
          autoCapitalize={'none'}
        />
      </View>
      <View>
        <TextInput
          onChangeText={text => setConfirmPassword(text)}
          value={confirmPassword}
          secureTextEntry={true}
          placeholder="Confirm Password"
          autoCapitalize={'none'}
        />
      </View>
      <View>
        <Button
          title="Sign up"
          disabled={
            loading || password !== confirmPassword || password.length < 8
          }
          onPress={() => signUpWithEmail()}
        />
      </View>
    </ViewContainer>
  );
}
