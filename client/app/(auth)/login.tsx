import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock } from 'lucide-react-native';
import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { HighlightedPressable } from '@/components/ui/HighlightedPressable';
import { colors } from '@/constants/colors';
import { useMutation } from '@tanstack/react-query';
import AuthRepository from '@/actions/auth';
import { KeyboardAvoidView } from '@/components/ui/KeyboardAvoidView';
import { showToast } from '@/modules/toast';

export default function LoginScreen() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const loginMutation = useMutation({
    mutationFn: AuthRepository.onLogin,
    onSuccess: (user) => {
      showToast('success', 'Login successful');
      setLoading(false);
      router.replace('/(tabs)');
    },
    onError: (error: any) => {
      setLoading(false);
    },
  });

  const isEmailValid = !!email.trim() && /^\S+@\S+\.\S+$/.test(email.trim());
  const isPasswordValid = password.length >= 4;

  const isSubmitDisabled =
    !isEmailValid || !isPasswordValid || loginMutation.isPending;

  const onLogin = () => {
    setLoading(true);
    loginMutation.mutate({ email: email.trim(), password });
  };

  const onSignUpText = () => {
    router.replace('/(auth)/sign-up');
  };

  return (
    <KeyboardAvoidView contentContainerStyle={styles.container}>
      <Text style={styles.title}>Login</Text>

      <InputField
        label='Email'
        LeftIcon={Mail}
        placeholder='e.g., sam@mail.com'
        keyboardType='email-address'
        autoCapitalize='none'
        value={email}
        onChangeText={setEmail}
        isInvalid={!!email && !isEmailValid}
        error={!!email && !isEmailValid ? 'Enter a valid email' : undefined}
      />

      <InputField
        label='Password'
        LeftIcon={Lock}
        placeholder='e.g., admin'
        isPassword
        value={password}
        onChangeText={setPassword}
        containerStyle={{ marginTop: 14 }}
        autoCapitalize='none'
        isInvalid={!!password && !isPasswordValid}
        error={
          !!password && !isPasswordValid
            ? 'Password must be at least 4 characters'
            : undefined
        }
      />

      <Button
        variant='primary'
        loading={loading}
        disabled={isSubmitDisabled}
        onPress={onLogin}
        style={styles.btn}
      >
        Log In
      </Button>

      <HighlightedPressable
        text="Don't have an account? Sign up"
        highlight='Sign up'
        onPress={onSignUpText}
        containerStyle={styles.signUpText}
      />
    </KeyboardAvoidView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  btn: {
    marginTop: 24,
  },
  signUpText: { position: 'absolute', bottom: 20, alignSelf: 'center' },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
    color: colors.text,
    alignSelf: 'center',
  },
});
