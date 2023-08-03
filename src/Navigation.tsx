import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import SplashScreen from './SplashScreen';
import AuthNavigation from './auth/Navigation';
import { SessionHomeRouteName } from './routes';
import Account from './Account';

const RootStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function SessionTabScreens() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
      <Tab.Screen name="Settings" component={Account} />
    </Tab.Navigator>
  );
}

export default function Routes() {
  return (
    <RootStack.Navigator
      initialRouteName="SplashScreen"
      screenOptions={{ headerShown: false }}>
      <RootStack.Screen name="SplashScreen" component={SplashScreen} />
      <RootStack.Screen name="Auth" component={AuthNavigation} />
      <RootStack.Screen
        name={SessionHomeRouteName}
        component={SessionTabScreens}
      />
    </RootStack.Navigator>
  );
}
