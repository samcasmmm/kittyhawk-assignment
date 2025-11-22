import React from 'react';
import {
  View,
  Text,
  FlatList,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import { Feather } from '@expo/vector-icons';
import AuthRepository from '@/actions/auth';
import TodoRepository, { Todo } from '@/actions/todos';
import { useAuthStore } from '@/stores/authStore';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { colors } from '@/constants/colors';
import { router } from 'expo-router';
import TodoCard from '@/components/ui/TodoCard';

export default function HomeScreen() {
  const userStore = useAuthStore();
  const queryClient = useQueryClient();

  useQuery({
    queryKey: ['checkProfile'],
    queryFn: AuthRepository.getProfile,
  });

  const { data: todos } = useQuery({
    queryKey: ['todosList'],
    queryFn: TodoRepository.getTodos,
  });

  const deleteTodoMutation = useMutation({
    mutationFn: (id: string) => TodoRepository.deleteTodo(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todosList'] });
    },
  });

  const updateTodoMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<Todo> }) =>
      TodoRepository.updateTodo(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['todosList'] });
    },
  });

  const onAddTodo = () => {
    router.push('/add-todo');
  };

  const handleDelete = (id: string) => {
    deleteTodoMutation.mutate(id);
  };

  const handleToggleStatus = (todo: Todo) => {
    updateTodoMutation.mutate({
      id: todo._id,
      updates: { completed: !todo?.completed },
    });
  };

  return (
    <View style={{ flex: 1 }}>
      <View style={styles.container}>
        <Text style={styles.headerText}>
          Hello, {userStore.user?.name ?? 'there'}
        </Text>

        <FlatList
          contentContainerStyle={{ paddingTop: 8, paddingBottom: 80 }}
          data={todos}
          keyExtractor={(item) => item._id}
          ListEmptyComponent={<Text style={styles.empty}>No todos yet</Text>}
          renderItem={({ item }) => (
            <TodoCard
              todo={{ ...item, id: item._id }}
              onToggleComplete={() => handleToggleStatus(item)}
              onDelete={() => handleDelete(item._id)}
            />
          )}
        />
      </View>

      {/* FAB */}
      <TouchableOpacity
        style={styles.fab}
        onPress={onAddTodo}
        activeOpacity={0.8}
      >
        <Feather name='plus' size={26} color='#fff' />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 8,
  },
  empty: {
    marginTop: 16,
    fontSize: 14,
    color: colors.textMuted,
  },
  fab: {
    position: 'absolute',
    bottom: 26,
    right: 26,
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: colors.primary,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 6,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
  },
});
