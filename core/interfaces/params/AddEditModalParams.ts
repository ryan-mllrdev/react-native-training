/* eslint-disable prettier/prettier */
import {TodoItem} from '../TodoItem';
export interface AddEditModalParams {
  setAddEditModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setDatePickerVisible: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedItem: React.Dispatch<React.SetStateAction<TodoItem>>;
  onUpdateTodo: (todo: TodoItem) => void;
  showAddEditModal: boolean;
  selectedItem: TodoItem;
  datePickerVisible: boolean;
}
