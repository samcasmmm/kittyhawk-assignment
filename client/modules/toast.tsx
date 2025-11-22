import { Toast } from 'toastify-react-native';

type ToastType = 'success' | 'error' | 'info';
type ToastPosition = 'top' | 'bottom';

const toastColorConfig: Record<ToastType, { icon: string; text: string }> = {
  success: {
    icon: '#4CAF50',
    text: '#fff',
  },
  error: {
    icon: '#F44336',
    text: '#fff',
  },
  info: {
    icon: '#2196F3',
    text: '#fff',
  },
};

export const toastOptions = {
  position: 'top',
  visibilityTime: 2000,
  autoHide: true,
  iconSize: 24,
  theme: 'dark' as const,
  closeIcon: 'times-circle',
  closeIconFamily: 'FontAwesome',
  closeIconSize: 20,
} as const;

export const showToast = (
  type: ToastType,
  text1: string,
  text2?: string,
  position: ToastPosition = 'bottom'
) => {
  const colors = toastColorConfig[type];

  Toast.show({
    ...toastOptions,
    type,
    text1,
    text2,
    position,
    textColor: colors.text,
    iconColor: colors.icon,
  });
};
