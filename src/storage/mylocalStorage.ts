// storage.ts
import AsyncStorage from '@react-native-async-storage/async-storage';

export const myLocalStorage = {
  set: async (key: string, value: any) => {
    try {
      const val = typeof value === 'string' ? value : JSON.stringify(value);
      await AsyncStorage.setItem(key, val);
    } catch (e) {
    }
  },

  get: async (key: string) => {
    try {
      const value = await AsyncStorage.getItem(key);
      if (!value) return null;
      try {
        return JSON.parse(value);
      } catch {
        return value; // fallback if it's plain string
      }
    } catch (e) {
      return null;
    }
  },

  remove: async (key: string) => {
    await AsyncStorage.removeItem(key);
  },
  removeAll:async()=>await AsyncStorage.clear()
};
