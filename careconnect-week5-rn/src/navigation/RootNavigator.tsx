import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { AppTabs, AppTabParamList } from '@/src/navigation/AppTabs';
import { AuthStack, AuthStackParamList } from '@/src/navigation/AuthStack';
import { HealthLogsScreen } from '@/src/screens/HealthLogsScreen';
import { colors } from '@/src/utils/theme';

export type RootStackParamList = {
  Auth: NavigatorScreenParams<AuthStackParamList>;
  AppTabs: NavigatorScreenParams<AppTabParamList>;
  HealthLogs: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

export function RootNavigator() {
  return (
    <Stack.Navigator
      initialRouteName="Auth"
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
        contentStyle: { backgroundColor: colors.background },
      }}
    >
      <Stack.Screen name="Auth" options={{ headerShown: false }} component={AuthStack} />
      <Stack.Screen name="AppTabs" options={{ headerShown: false }} component={AppTabs} />
      <Stack.Screen name="HealthLogs" options={{ title: 'Health Logs' }} component={HealthLogsScreen} />
    </Stack.Navigator>
  );
}
