import { NavigationContainer } from '@react-navigation/native';
import React from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import Navigation from './src/Navigation';
import { RootStore, RootStoreContext } from './src/rootStore/RootStore';

/**
 * This top-level comp should only contain providers
 * and configurations needed prior to launching the interactive app
 */
function App(): JSX.Element {
  return (
    <SafeAreaProvider>
      <RootStoreContext.Provider value={new RootStore()}>
        <NavigationContainer>
          <Navigation />
        </NavigationContainer>
      </RootStoreContext.Provider>
    </SafeAreaProvider>
  );
}

export default App;
