import AsyncStorage from '@react-native-community/async-storage';

const TOKEN_KEY = '@userToken';

export const storeToken = async (token) => {
  try {
    await AsyncStorage.setItem(TOKEN_KEY, token);
    return true;
  } catch (error) {
    return false;
  }
};

export const getToken = async () => {
  try {
    const token = AsyncStorage.getItem(TOKEN_KEY);
    if (token) {
      return token;
    }
  } catch (error) {
    return null;
  }
  return null;
};
