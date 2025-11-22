import React, { useState } from 'react';
import { View, StyleSheet, Text } from 'react-native';
import { router } from 'expo-router';
import { Mail, Lock, User } from 'lucide-react-native';
import { useMutation } from '@tanstack/react-query';

import { InputField } from '@/components/ui/InputField';
import { Button } from '@/components/ui/Button';
import { HighlightedPressable } from '@/components/ui/HighlightedPressable';
import { KeyboardAvoidView } from '@/components/ui/KeyboardAvoidView';

import { colors } from '@/constants/colors';
import AuthRepository from '@/actions/auth';
import { showToast } from '@/modules/toast';

export default function SignUpScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // simple email + password validation
  const isEmailInvalid =
    email.length > 0 && !/^\S+@\S+\.\S+$/.test(email.trim());
  const isPasswordInvalid = password.length > 0 && password.length < 5;

  const isSubmitDisabled =
    !name.trim() ||
    !email.trim() ||
    !password ||
    isEmailInvalid ||
    isPasswordInvalid;

  const signUpMutation = useMutation({
    mutationFn: AuthRepository.onSignUp, // expects { name, email, password }
    onSuccess: (user) => {
      showToast('success', 'Account created', 'Welcome aboard!');
      router.replace('/(tabs)');
    },
    onError: (error: any) => {
      const message = error?.message || 'Sign up failed';
      showToast('error', 'Sign up failed', message);
    },
  });

  const onSignUp = () => {
    if (isSubmitDisabled || signUpMutation.isPending) return;

    signUpMutation.mutate({
      name: name.trim(),
      email: email.trim(),
      password,
    });
  };

  const onLoginText = () => {
    router.replace('/(auth)/login');
  };

  return (
    <KeyboardAvoidView>
      <View style={styles.container}>
        <Text style={styles.title}>Sign Up</Text>

        <View style={{ gap: 12 }}>
          <InputField
            label='Name'
            LeftIcon={User}
            placeholder='e.g., Steve'
            autoCapitalize='words'
            value={name}
            onChangeText={setName}
          />

          <InputField
            label='Email'
            LeftIcon={Mail}
            placeholder='e.g., name@example.com'
            keyboardType='email-address'
            autoCapitalize='none'
            value={email}
            onChangeText={setEmail}
            isInvalid={isEmailInvalid}
            error={isEmailInvalid ? 'Enter a valid email address' : undefined}
          />

          <InputField
            label='Password'
            LeftIcon={Lock}
            isPassword
            autoCapitalize='none'
            value={password}
            onChangeText={setPassword}
            isInvalid={isPasswordInvalid}
            error={
              isPasswordInvalid
                ? 'Password must be at least 6 characters'
                : undefined
            }
          />
        </View>

        <Button
          variant='primary'
          loading={signUpMutation.isPending}
          disabled={isSubmitDisabled || signUpMutation.isPending}
          onPress={onSignUp}
          style={styles.btn}
        >
          Sign Up
        </Button>

        <HighlightedPressable
          text='Already have an account? Log in'
          highlight='Log in'
          onPress={onLoginText}
          containerStyle={styles.signUpText}
          colors={{ normal: colors.textMuted, highlight: colors.primary }}
        />
      </View>
    </KeyboardAvoidView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', padding: 20 },
  btn: {
    marginTop: 24,
  },
  signUpText: {
    position: 'absolute',
    bottom: 20,
    alignSelf: 'center',
  },
  title: {
    fontSize: 32,
    fontWeight: '700',
    marginBottom: 24,
    color: colors.text,
    alignSelf: 'center',
  },
});
