import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import { CalendarScreen } from '@/src/screens/CalendarScreen';
import { HomeScreen } from '@/src/screens/HomeScreen';
import { MessagesScreen } from '@/src/screens/MessagesScreen';
import { ProfileScreen } from '@/src/screens/ProfileScreen';
import { TasksScreen } from '@/src/screens/TasksScreen';
import { colors } from '@/src/utils/theme';

export type AppTabParamList = {
  Home: undefined;
  Tasks: undefined;
  Calendar: undefined;
  Messages: undefined;
  Profile: undefined;
};

const Tab = createBottomTabNavigator<AppTabParamList>();

export function AppTabs() {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerStyle: { backgroundColor: colors.background },
        headerTintColor: colors.textPrimary,
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.textSecondary,
        tabBarStyle: { backgroundColor: colors.background },
        tabBarLabelStyle: { fontSize: 12 },
      }}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Tasks" component={TasksScreen} />
      <Tab.Screen name="Calendar" component={CalendarScreen} />
      <Tab.Screen name="Messages" component={MessagesScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  );
}
