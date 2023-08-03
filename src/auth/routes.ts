import { NativeStackScreenProps } from '@react-navigation/native-stack';

export const SignUpRouteName = 'SignUp';

export const gotoSignUp = (
  navigation: NativeStackScreenProps<any, any>['navigation'],
) => {
  navigation.push(SignUpRouteName);
};

export const LoginRouteName = 'Login';

export const gotoLogin = (
  navigation: NativeStackScreenProps<any, any>['navigation'],
) => {
  navigation.push(LoginRouteName);
};

export const AuthRouteRootName = 'Auth';

export const gotoAuthRoutes = (
  navigation: NativeStackScreenProps<any, any>['navigation'],
) => {
  navigation.push(AuthRouteRootName);
};
