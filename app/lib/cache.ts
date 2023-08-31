import AsyncStore from "@react-native-async-storage/async-storage";
import moment from "moment";

const PREFIX = "cache";
const expiryInMinutes = 5;

const store = async (key: string, value: any) => {
  const item = {
    value,
    timestamp: Date.now(),
  };
  try {
    await AsyncStore.setItem(PREFIX + key, JSON.stringify(item));
  } catch (error) {
    console.log(error);
  }
};

const isExpired = (item: any) => {
  const now = moment(Date.now());
  const storedTime = moment(item.timestamp);
  return now.diff(storedTime, "minutes") > expiryInMinutes;
};

const get = async (key: string) => {
  try {
    const value = await AsyncStore.getItem(PREFIX + key);
    if (!value) return null;
    const item = JSON.parse(value);
    if (isExpired(item)) {
      await remove(PREFIX + key);
      return null;
    }
    return item.value;
  } catch (error) {
    console.log(error);
  }
};

const remove = async (key: string) => {
  try {
    await AsyncStore.removeItem(PREFIX + key);
  } catch (error) {
    console.log(error);
  }
};

export default {
  store,
  get,
  remove,
};
