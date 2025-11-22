import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { router } from 'expo-router';
import { useAuthStore } from '@/stores/authStore';
import asyncStore from '@/modules/asyncStore';
import { Button } from '@/components/ui/Button';
import { colors } from '@/constants/colors';

export default function MyAccountScreen() {
  const { user, logout } = useAuthStore();

  const handleLogout = async () => {
    await asyncStore.removeItem('token');
    await asyncStore.removeItem('user');
    logout();
    router.replace('/(auth)/login');
  };

  const handleLogin = () => {
    router.replace('/(auth)/login');
  };

  const initials =
    user?.name
      ?.trim()
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase() ?? '?';

  return (
    <View style={styles.container}>
      <Text style={styles.title}>My Account</Text>

      <View style={styles.card}>
        <View style={styles.avatar}>
          <Text style={styles.avatarText}>{initials}</Text>
        </View>

        {user ? (
          <>
            <Text style={styles.name}>{user.name}</Text>
            <Text style={styles.email}>{user.email}</Text>

            <Button
              variant='destructive'
              onPress={handleLogout}
              style={styles.button}
            >
              Logout
            </Button>
          </>
        ) : (
          <>
            <Text style={styles.name}>You’re not logged in</Text>
            <Text style={styles.email}>
              Log in to see your account details.
            </Text>

            <Button
              variant='primary'
              onPress={handleLogin}
              style={styles.button}
            >
              Log In
            </Button>
          </>
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  title: {
    fontSize: 26,
    fontWeight: '700',
    marginBottom: 24,
    textAlign: 'center',
    color: colors.text,
  },
  card: {
    backgroundColor: colors.background,
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.05,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: colors.primary,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 12,
  },
  avatarText: {
    color: colors.primaryForeground,
    fontSize: 24,
    fontWeight: '700',
  },
  name: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginTop: 4,
    textAlign: 'center',
  },
  email: {
    fontSize: 14,
    color: colors.textMuted,
    marginTop: 4,
    marginBottom: 16,
    textAlign: 'center',
  },
  button: {
    marginTop: 8,
    alignSelf: 'stretch',
  },
});
