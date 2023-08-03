import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const SessionHomeRouteName = 'SessionHome';

export const gotoHome = (
  navigation: NativeStackScreenProps<any, any>['navigation'],
) => {
  navigation.push(SessionHomeRouteName);
};
