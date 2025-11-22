import AsyncStorage from '@react-native-async-storage/async-storage';

const setItem = async (key: string, value: any) => {
  try {
    const json = JSON.stringify(value);
    await AsyncStorage.setItem(key, json);
  } catch (err) {
    console.error(`[AsyncStorage] setItem error:`, err);
  }
};

const getItem = async <T = any>(key: string): Promise<T | null> => {
  try {
    const data = await AsyncStorage.getItem(key);
    return data ? (JSON.parse(data) as T) : null;
  } catch (err) {
    console.error(`[AsyncStorage] getItem error:`, err);
    return null;
  }
};

const removeItem = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (err) {
    console.error(`[AsyncStorage] removeItem error:`, err);
  }
};

const clearStorage = async () => {
  try {
    await AsyncStorage.clear();
  } catch (err) {
    console.error(`[AsyncStorage] clearStorage error:`, err);
  }
};

const storage = {
  setItem,
  getItem,
  removeItem,
  clearStorage,
};

export default storage;
