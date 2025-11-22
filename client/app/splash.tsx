import React, { useEffect } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { router } from 'expo-router';

import asyncStore from '@/modules/asyncStore';
import { useAuthStore } from '@/stores/authStore';

export default function SplashScreen() {
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const run = async () => {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      try {
        const token = await asyncStore.getItem<string>('token');
        const user = await asyncStore.getItem<any>('user');

        if (token && user) {
          setUser(user, token);
          router.replace('/(tabs)');
        } else {
          router.replace('/(auth)/login');
        }
      } catch (error) {
        console.log('Splash auth check error:', error);
        router.replace('/(auth)/login');
      }
    };

    run();
  }, [setUser]);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>KittyHawk</Text>
      <ActivityIndicator size='large' color='#2563eb' style={styles.loader} />
      <Text style={styles.loading}>Loading...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
    color: '#111827',
  },
  loader: {
    marginBottom: 10,
  },
  loading: {
    fontSize: 14,
    opacity: 0.55,
    marginTop: 6,
  },
});
