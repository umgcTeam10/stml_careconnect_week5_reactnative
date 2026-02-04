import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '@/src/screens/HomeScreen';
import { LoginScreen } from '@/src/screens/LoginScreen';
import { RoleScreen } from '@/src/screens/RoleScreen';
import { WelcomeScreen } from '@/src/screens/WelcomeScreen';
import { colors } from '@/src/utils/theme';

export type RootStackParamList = {
  Welcome: undefined;
  Login: undefined;
  Role: undefined;
  Home: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function AppNavigator() {
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
      <Stack.Screen name="Login" options={{ title: 'Log in' }} component={LoginScreen} />
      <Stack.Screen name="Role" options={{ title: 'Choose your role' }} component={RoleScreen} />
      <Stack.Screen name="Home" options={{ title: 'Home' }} component={HomeScreen} />
    </Stack.Navigator>
  );
}
