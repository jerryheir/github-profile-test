import AsyncStorage from "@react-native-community/async-storage";
// import moment from "moment";

export const FORMAT_CURRENCY = (x) => {
  // eslint-disable-next-line no-useless-concat
  return "\u20A6" + " " + x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
};

export const storeItem = async (key, data) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(data));
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

export const retrieveItem = async (key) => {
  try {
    const data = await AsyncStorage.getItem(key);
    if (data) return JSON.parse(data);
    return null;
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

export const removeItem = async (key) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.log("Something went wrong", error);
  }
};

export const makePaschal = (string) => {
  if (!string) return;
  return string.charAt(0).toUpperCase() + string.substring(1, string.length);
};
