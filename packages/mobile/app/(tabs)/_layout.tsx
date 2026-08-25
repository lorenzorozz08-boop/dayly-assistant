import { Tabs } from 'expo-router';
import { Home, CheckSquare, Bell, Settings } from 'react-native-feather';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#4f46e5',
        tabBarStyle: {
          backgroundColor: '#fff',
          borderTopColor: '#e5e7eb',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarLabel: 'Home',
        }}
      />
      <Tabs.Screen
        name="tasks"
        options={{
          title: 'Attività',
          tabBarLabel: 'Attività',
        }}
      />
      <Tabs.Screen
        name="reminders"
        options={{
          title: 'Ricordi',
          tabBarLabel: 'Ricordi',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Impostazioni',
          tabBarLabel: 'Impostazioni',
        }}
      />
    </Tabs>
  );
}
