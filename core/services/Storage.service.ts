/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';
import {TodoItem} from '../interfaces/TodoItem';

const storeJsonData = async (storeKey: string, value: TodoItem[]) => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storeKey, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getJsonData = async (storeKey: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storeKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

const storeSingleData = async (storeKey: string, value: string) => {
  try {
    const stringValue = JSON.stringify(value);
    await AsyncStorage.setItem(storeKey, stringValue);
  } catch (e) {
    console.log(e);
  }
};

const getSingleData = async (storeKey: string) => {
  try {
    const stringValue = await AsyncStorage.getItem(storeKey);
    return stringValue;
  } catch (e) {
    console.log(e);
  }
};

export default {
  storeJsonData,
  getJsonData,
  storeSingleData,
  getSingleData,
};
