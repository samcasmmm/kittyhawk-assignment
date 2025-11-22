import { colors } from '@/constants/colors';
import { StyleSheet, Text, View, TouchableOpacity, Alert } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

interface Todo {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
}

interface TodoCardProps {
  todo: Todo;
  onDelete: (id: string) => void;
  onToggleComplete: (id: string) => void;
}

const TodoCard = ({ todo, onDelete, onToggleComplete }: TodoCardProps) => {
  const status = todo.completed ? 'Done' : 'Pending';
  const statusColor = todo.completed
    ? { bg: '#DCFCE7', text: '#15803D' }
    : { bg: '#FEF3C7', text: '#92400E' };

  const handleDelete = () => {
    Alert.alert('Delete Todo', 'Are you sure you want to delete this todo?', [
      { text: 'Cancel', onPress: () => {}, style: 'cancel' },
      {
        text: 'Delete',
        onPress: () => onDelete(todo.id),
        style: 'destructive',
      },
    ]);
  };

  return (
    <View style={styles.card}>
      <View style={styles.topRow}>
        <View style={styles.contentSection}>
          <Text style={[styles.title, todo.completed && styles.titleStrike]}>
            {todo.title}
          </Text>
          <Text style={styles.desc} numberOfLines={2}>
            {todo.description || 'No description'}
          </Text>
        </View>
        <View style={[styles.statusPill, { backgroundColor: statusColor.bg }]}>
          <Text style={[styles.statusText, { color: statusColor.text }]}>
            {status}
          </Text>
        </View>
      </View>

      <View style={styles.bottomRow}>
        <View style={styles.buttonGroup}>
          <TouchableOpacity
            style={styles.iconButton}
            onPress={() => onToggleComplete(todo.id)}
          >
            <Ionicons
              name={
                todo.completed ? 'checkmark-circle' : 'checkmark-circle-outline'
              }
              size={20}
              color={colors.primary}
            />
          </TouchableOpacity>
          <TouchableOpacity style={styles.iconButton} onPress={handleDelete}>
            <Ionicons name='trash-outline' size={20} color='#EF4444' />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TodoCard;

const styles = StyleSheet.create({
  card: {
    backgroundColor: colors.background,
    borderRadius: 8,
    padding: 12,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: colors.inputBorder,
  },
  topRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 12,
    gap: 8,
  },
  contentSection: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colors.text,
    marginBottom: 6,
  },
  desc: {
    fontSize: 13,
    color: colors.textMuted,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  statusPill: {
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 999,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  buttonGroup: {
    flexDirection: 'row',
    gap: 8,
  },
  iconButton: {
    padding: 8,
    borderRadius: 6,
    justifyContent: 'center',
    alignItems: 'center',
  },
  titleStrike: {
    textDecorationLine: 'line-through',
    color: colors.textMuted,
  },
});
