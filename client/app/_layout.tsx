import React from 'react';
import { Stack } from 'expo-router';
import { SafeAreaView } from 'react-native-safe-area-context';
import { StyleSheet } from 'react-native';
import QueryProvider from '@/providers/QueryProvider';
import { ToastProvider } from '@/providers/ToastProvider';
export default function RootLayout() {
  return (
    <>
      <SafeAreaView style={styles.safeArea}>
        <QueryProvider>
          <Stack
            screenOptions={{
              headerShown: false,
            }}
          >
            <Stack.Screen name='splash' />
            <Stack.Screen name='(auth)' />
            <Stack.Screen name='(tabs)' />
          </Stack>
        </QueryProvider>
      </SafeAreaView>
      <ToastProvider />
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
  },
});
