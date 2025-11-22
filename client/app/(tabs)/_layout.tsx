// app/(tabs)/_layout.tsx
import React from 'react';
import { Tabs } from 'expo-router';
import { Feather } from '@expo/vector-icons';

const TAB_CONFIG = [
  { name: 'index', title: 'Home', icon: 'home' },
  { name: 'account', title: 'My Account', icon: 'user' },
];

export default function TabsLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          height: 56,
          paddingBottom: 6,
        },
      }}
    >
      {TAB_CONFIG.map(({ name, title, icon }) => (
        <Tabs.Screen
          key={name}
          name={name}
          options={{
            title,
            tabBarIcon: ({ color, size }) => (
              <Feather name={icon as any} color={color} size={size - 2} />
            ),
          }}
        />
      ))}
    </Tabs>
  );
}
