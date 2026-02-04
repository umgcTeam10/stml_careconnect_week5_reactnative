import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { LoginScreen } from '@/src/screens/LoginScreen';
import { RoleScreen } from '@/src/screens/RoleScreen';
import { WelcomeScreen } from '@/src/screens/WelcomeScreen';
import { colors } from '@/src/utils/theme';

export type AuthStackParamList = {
  Welcome: undefined;
  Role: undefined;
  Login: undefined;
};

const Stack = createNativeStackNavigator<AuthStackParamList>();

export function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Welcome" options={{ headerShown: false }} component={WelcomeScreen} />
      <Stack.Screen name="Role" options={{ title: 'Choose your role' }} component={RoleScreen} />
      <Stack.Screen name="Login" options={{ title: 'Log in' }} component={LoginScreen} />
    </Stack.Navigator>
  );
}
