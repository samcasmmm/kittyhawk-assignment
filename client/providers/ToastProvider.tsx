import { toastOptions } from '@/modules/toast';
import ToastManager from 'toastify-react-native';

export const ToastProvider = () => {
  return <ToastManager options={toastOptions} />;
};
