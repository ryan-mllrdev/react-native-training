/* eslint-disable prettier/prettier */
import AsyncStorage from '@react-native-community/async-storage';
import {TodoItem} from '../interfaces/TodoItem';

const storeTodoData = async (storeKey: string, value: TodoItem[]) => {
  try {
    console.log(storeKey);
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(storeKey, jsonValue);
  } catch (e) {
    console.log(e);
  }
};

const getTodoData = async (storeKey: string) => {
  try {
    const jsonValue = await AsyncStorage.getItem(storeKey);
    return jsonValue != null ? JSON.parse(jsonValue) : null;
  } catch (e) {
    console.log(e);
  }
};

export default {
  storeTodoData,
  getTodoData,
};
