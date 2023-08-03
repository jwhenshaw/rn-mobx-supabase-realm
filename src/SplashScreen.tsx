import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { observer } from 'mobx-react-lite';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { AuthRouteRootName } from './auth/routes';
import { useStores } from './rootStore/useStores';
import { SessionHomeRouteName } from './routes';

type Props = NativeStackScreenProps<any, any>;

const SplashScreen = observer(({ navigation }: Props) => {
  const stores = useStores();
  const { accountStore, isReady } = stores;

  React.useEffect(() => {
    if (!isReady) {
      return;
    }

    if (!accountStore.session) {
      navigation.replace(AuthRouteRootName);
    } else {
      navigation.replace(SessionHomeRouteName);
    }
  }, [accountStore.session, navigation, isReady]);

  // @TODO - a nice loading screen or something w/ suspense
  return (
    <View style={styles.sectionContainer}>
      <Text style={styles.sectionTitle}>TODO: splash screen</Text>
    </View>
  );
});

const styles = StyleSheet.create({
  sectionContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    color: 'black',
    fontSize: 24,
    fontWeight: '600',
  },
});

export default SplashScreen;
