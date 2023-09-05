import * as SecureStore from "expo-secure-store";
import logger from "./logger";

const KEY = "authToken";

const setToken = async (value: any) => {
  try {
    await SecureStore.setItemAsync(KEY, value);
  } catch (error) {
    if (error instanceof Error) logger.log(error);
  }
};

const getToken = async () => {
  try {
    const value = await SecureStore.getItemAsync(KEY);
    if (!value) return null;
    return value;
  } catch (error) {
    if (error instanceof Error) logger.log(error);
  }
};

const removeToken = async () => {
  try {
    await SecureStore.deleteItemAsync(KEY);
  } catch (error) {
    if (error instanceof Error) logger.log(error);
  }
};

export default {
  setToken,
  getToken,
  removeToken,
};
