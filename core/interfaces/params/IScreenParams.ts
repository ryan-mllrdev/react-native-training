/* eslint-disable prettier/prettier */
import {TodoItem} from '../TodoItem';

export interface IScreenParams {
  todoList: TodoItem[];
  setTodoList: React.Dispatch<React.SetStateAction<TodoItem[]>>;
}
