import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { HomeScreen } from '@/src/screens/HomeScreen';
import { HealthLogsScreen } from '@/src/screens/HealthLogsScreen';
import { colors } from '@/src/utils/theme';

export type HomeStackParamList = {
  Home: undefined;
  HealthLogs: undefined;
};

const Stack = createNativeStackNavigator<HomeStackParamList>();

export function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
      }}
    >
      <Stack.Screen
        name="Home"
        options={{ headerShown: false }}
      >
        {props => <HomeScreen {...props} />}
      </Stack.Screen>
      <Stack.Screen 
        name="HealthLogs" 
        component={HealthLogsScreen}
        options={{ title: 'Health Logs' }}
      />
    </Stack.Navigator>
  );
}