import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SignIn from './SignIn';
import SignUp from './SignUp';
import { LoginRouteName, SignUpRouteName } from './routes';

const AuthStack = createNativeStackNavigator();

export default function AuthNavigation() {
  return (
    <AuthStack.Navigator>
      <AuthStack.Screen name={LoginRouteName} component={SignIn} />
      <AuthStack.Screen name={SignUpRouteName} component={SignUp} />
    </AuthStack.Navigator>
  );
}
