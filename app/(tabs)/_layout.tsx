import { Tabs } from 'expo-router';
import { useTheme } from '@/contexts/ThemeContext';
import { Brain as Train, MapPin, Map, Bell, Settings } from 'lucide-react-native';
import { StyleSheet, View } from 'react-native';

export default function TabLayout() {
  const { theme, colors } = useTheme();
  
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.text.secondary,
        tabBarStyle: {
          backgroundColor: colors.background.secondary,
          borderTopColor: colors.border,
          height: 60,
          paddingBottom: 8,
          paddingTop: 8,
        },
        tabBarLabelStyle: {
          fontFamily: 'Inter-Medium',
          fontSize: 12,
        },
        headerStyle: {
          backgroundColor: colors.background.primary,
        },
        headerTitleStyle: {
          fontFamily: 'Inter-SemiBold',
          color: colors.text.primary,
        },
        headerShadowVisible: false,
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Schedule',
          tabBarIcon: ({ color, size }) => (
            <Train size={size} color={color} />
          ),
          headerShown: true,
          headerTitle: 'Train Schedules',
        }}
      />
      <Tabs.Screen
        name="stations"
        options={{
          title: 'Stations',
          tabBarIcon: ({ color, size }) => (
            <MapPin size={size} color={color} />
          ),
          headerShown: true,
          headerTitle: 'Station Directory',
        }}
      />
      <Tabs.Screen
        name="routes"
        options={{
          title: 'Routes',
          tabBarIcon: ({ color, size }) => (
            <Map size={size} color={color} />
          ),
          headerShown: true,
          headerTitle: 'Route Planner',
        }}
      />
      <Tabs.Screen
        name="alerts"
        options={{
          title: 'Alerts',
          tabBarIcon: ({ color, size }) => (
            <Bell size={size} color={color} />
          ),
          headerShown: true,
          headerTitle: 'Service Alerts',
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color, size }) => (
            <Settings size={size} color={color} />
          ),
          headerShown: true,
          headerTitle: 'Settings',
        }}
      />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
});