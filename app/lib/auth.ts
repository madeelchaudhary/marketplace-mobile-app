import * as SecureStore from "expo-secure-store";

const KEY = "authToken";

const setToken = async (value: any) => {
  try {
    await SecureStore.setItemAsync(KEY, value);
  } catch (error) {
    console.log(error);
  }
};

const getToken = async () => {
  try {
    const value = await SecureStore.getItemAsync(KEY);
    if (!value) return null;
    return value;
  } catch (error) {
    console.log(error);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(KEY);
  } catch (error) {
    console.log(error);
  }
};

export default {
  setToken,
  getToken,
  removeToken,
};
