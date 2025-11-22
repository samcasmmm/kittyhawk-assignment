import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { router } from 'expo-router';
import { useMutation, useQueryClient } from '@tanstack/react-query';

import { InputField } from '@/components/ui/InputField';
import { TextArea } from '@/components/ui/TextArea';
import { Button } from '@/components/ui/Button';
import TodoRepository from '@/actions/todos';
import { colors } from '@/constants/colors';
import { showToast } from '@/modules/toast';

const AddTodoScreen = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  const queryClient = useQueryClient();

  const createTodoMutation = useMutation({
    mutationFn: TodoRepository.createTodo,
    onSuccess: () => {
      showToast('success', 'Todo created');
      queryClient.invalidateQueries({ queryKey: ['todosList'] });
      router.back();
    },
    onError: (error: any) => {
      showToast('error', 'Failed to create todo', error?.message);
    },
  });

  const isTitleInvalid = title.length > 0 && title.trim().length === 0;
  const isSubmitDisabled = !title.trim() || createTodoMutation.isPending;

  const onAddTodo = () => {
    if (isSubmitDisabled) return;

    createTodoMutation.mutate({
      title: title.trim(),
      description: description.trim() || undefined,
    });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Add Todo</Text>

      <View style={styles.form}>
        <InputField
          label='Name'
          placeholder='e.g., Buy groceries'
          autoCapitalize='sentences'
          value={title}
          onChangeText={setTitle}
          isInvalid={isTitleInvalid}
          error={isTitleInvalid ? 'Name cannot be empty' : undefined}
        />

        <TextArea
          label='Description'
          placeholder='Add some details (optional)'
          value={description}
          onChangeText={setDescription}
          rows={5}
        />
      </View>

      <Button
        variant='primary'
        loading={createTodoMutation.isPending}
        disabled={isSubmitDisabled}
        onPress={onAddTodo}
        style={styles.button}
      >
        Save Todo
      </Button>
    </View>
  );
};

export default AddTodoScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: colors.background,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    marginBottom: 16,
    color: colors.text,
  },
  form: {
    flex: 1,
    gap: 16,
  },
  button: {
    marginTop: 16,
    alignSelf: 'stretch',
  },
});
