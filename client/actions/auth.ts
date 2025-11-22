import { api } from '@/modules/api';
import asyncStore from '@/modules/asyncStore';
import { showToast } from '@/modules/toast';
import { useAuthStore } from '@/stores/authStore';
import { getErrorMessage } from '@/utils/common';

type LoginParams = { email: string; password: string };
type SignUpParams = { name: string; email: string; password: string };

const onLogin = async ({ email, password }: LoginParams) => {
  try {
    const res = await api.post('/auth/login', { email, password });

    const { token, user } = res.data?.data ?? {};
    console.log(' res.data?', res.data);

    if (!token || !user) {
      throw new Error('Invalid login response from server');
    }
    await Promise.all([
      asyncStore.setItem('token', token),
      asyncStore.setItem('user', JSON.stringify(user)),
    ]);

    useAuthStore.getState().setUser(user, token);
    return user;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    showToast('error', 'Login Failed', errorMessage);
    throw err;
  }
};

const onSignUp = async ({ name, email, password }: SignUpParams) => {
  try {
    const res = await api.post('/auth/signup', { name, email, password });

    const { token, user } = res.data?.data ?? {};

    if (!token || !user) {
      throw new Error('Invalid signup response from server');
    }

    await Promise.all([
      asyncStore.setItem('token', token),
      asyncStore.setItem('user', user),
    ]);

    useAuthStore.getState().setUser(user, token);

    showToast('success', 'Account created', 'Welcome aboard!');

    return user;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    showToast('error', 'Sign up failed', errorMessage);
    throw err;
  }
};
const getProfile = async () => {
  try {
    const res = await api.get('/auth/profile');
    const data = res.data?.data;
    const user = data?.user ?? data;

    if (!user) {
      throw new Error('Failed to load profile');
    }
    let token = await asyncStore.getItem('token');

    useAuthStore.getState().setUser(user, token ?? '');

    return user;
  } catch (err: any) {
    const errorMessage = getErrorMessage(err);
    showToast('error', 'Failed to load profile', errorMessage);
    throw err;
  }
};

const AuthRepository = {
  onLogin,
  onSignUp,
  getProfile,
};
export default AuthRepository;
