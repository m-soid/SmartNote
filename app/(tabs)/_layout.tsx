import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { HapticTab } from '@/components/haptic-tab';
import { useColorScheme } from '@/hooks/use-color-scheme';
import { FileText, Compass } from 'lucide-react-native';

const BLUE = '#2563EB';
const GRAY = '#9CA3AF';
const WHITE = '#FFFFFF';

function TabBarIcon({
  icon,
  label,
  focused,
}: {
  icon: React.ReactNode;
  label: string;
  focused: boolean;
}) {
  return (
    <View style={tabStyles.wrapper}>
      {icon}
      <Text style={[tabStyles.label, { color: focused ? BLUE : GRAY }]}>{label}</Text>
      {focused ? <View style={tabStyles.dot} /> : <View style={tabStyles.dotPlaceholder} />}
    </View>
  );
}

const tabStyles = StyleSheet.create({
  wrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 100,
    height: 60,
    top: 15
  },
  label: {
    fontSize: 9,
    fontWeight: '700',
    letterSpacing: 0.6,
    marginTop: 2,
  },
  dot: {
    width: 4,
    height: 4,
    borderRadius: 2,
    backgroundColor: BLUE,
    marginTop: 3,
  },
  dotPlaceholder: {
    width: 4,
    height: 4,
    marginTop: 3,
  },
});

export default function TabLayout() {
  const colorScheme = useColorScheme();

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarStyle: {
          position: 'absolute',
          bottom: 24,
          left: 24,
          right: 24,
          height: 70,
          borderRadius: 35,
          backgroundColor: WHITE,
          borderTopWidth: 0,
          shadowColor: '#000',
          shadowOffset: { width: 0, height: 4 },
          shadowOpacity: 0.1,
          shadowRadius: 16,
          elevation: 10,
        },
        tabBarItemStyle: {
          height: 70,
          paddingVertical: 0,
          paddingBottom: 0,
          paddingTop: 0,
        },
        tabBarShowLabel: false,
        tabBarActiveTintColor: BLUE,
        tabBarInactiveTintColor: GRAY,
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={<FileText size={20} color={focused ? BLUE : GRAY} strokeWidth={focused ? 2.2 : 1.8} />}
              label="NOTES"
              focused={focused}
            />
          ),
        }}
      />
      <Tabs.Screen
        name="explore"
        options={{
          tabBarIcon: ({ focused }) => (
            <TabBarIcon
              icon={<Compass size={20} color={focused ? BLUE : GRAY} strokeWidth={focused ? 2.2 : 1.8} />}
              label="DISCOVER"
              focused={focused}
            />
          ),
        }}
      />
    </Tabs>
  );
}