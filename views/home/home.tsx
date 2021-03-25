/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from 'moment';
import React, {useState, useEffect} from 'react';
import {
  View,
  Pressable,
  TextInput,
  Switch,
  SafeAreaView,
  Modal,
  Text,
  Button,
  FlatList,
} from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import {FAB} from 'react-native-paper';
import {TodoItem} from '../../core/interfaces/TodoItem';
import StorageService from '../../core/services/Storage.service';
import styles from './styles';
import AddEditModal from '../../modal/home/add-edit-todo';

interface TodoItemSectionParams {
  todo: TodoItem;
}

const HomeScreen = () => {
  const colors = {
    white: 'white',
    orange: 'orange',
    lightgray: 'lightgray',
  };
  const emptyLabel = 'Empty';
  const addTitleLabel = 'Add Title';
  const addDescriptionLabel = 'Add Description';
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [showAddEditModal, setAddEditModalVisible] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [completedList, setcompletedList] = useState<TodoItem[]>([]);
  const [lastId, setLastId] = useState(0);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TodoItem>();

  useEffect(() => {
    let mounted = true;
    let allData: TodoItem[] = [];
    let todoData: TodoItem[] = [];
    let completedData: TodoItem[] = [];

    // Get todo list first
    StorageService.getData('todoList')
      .then(todoResult => {
        // Skip if no result
        if (todoResult) {
          todoData = todoResult;
        }
        // Get completed list
        StorageService.getData('completedList')
          .then(completedResult => {
            // Skip if no result
            if (!completedResult) {
              return;
            }
            completedData = completedResult;
          })
          .finally(() => {
            // Merged todos and completed
            allData = [...todoData, ...completedData];
          });
      })
      .finally(() => {
        // Skip of no data
        if (!allData.length) {
          return;
        }
        // Get max id
        const maxId = Math.max(...allData.map(todo => todo.id));
        // Set last id
        setLastId(maxId);
        // Set todo list
        if (todoData && todoData.length) {
          setTodoList(todoData);
        }
        // Set completed list
        if (completedData && completedData.length) {
          setcompletedList(completedData);
        }
      });
    return () => {
      mounted = false;
    };
  }, []);

  useEffect(() => {
    let mounted = true;
    StorageService.storeData('completedList', completedList);
    return () => {
      mounted = false;
    };
  }, [completedList]);

  useEffect(() => {
    if (!todoList || (todoList && !todoList.length)) {
      return;
    }
    let mounted = true;
    setLastId(
      Math.max(
        ...todoList.map(todo => todo.id),
        ...(completedList.length ? completedList.map(todo => todo.id) : [0]),
      ),
    );
    StorageService.storeData('todoList', todoList);
    return () => {
      mounted = false;
    };
  }, [todoList, lastId, completedList]);

  const onAddTodo = (todoItem: TodoItem): TodoItem[] => {
    const newList = todoList.concat(todoItem);
    return newList;
  };

  const onUpdateTodo = (todo: TodoItem) => {
    const newList = createMode
      ? onAddTodo(todo)
      : todoList.map(todoItem => {
          if (todoItem.id === todo.id) {
            const updatedItem: TodoItem = {
              ...todo,
              updatedOn: new Date(),
            };
            return updatedItem;
          }
          return todoItem;
        });

    setCreateMode(false);
    setTodoList(newList);
    setAddEditModalVisible(!showAddEditModal);
  };

  const TodoItemSection = (params: TodoItemSectionParams) => {
    return (
      <Pressable
        onPress={() => {
          setCreateMode(false);
          setAddEditModalVisible(true);
          setSelectedItem(params.todo);
        }}>
        <TextInput
          style={
            params.todo.expiredOn && params.todo.expiredOn <= new Date()
              ? {
                  ...styles.homeScreen.todoTitle,
                  ...styles.homeScreen.textExpired,
                }
              : styles.homeScreen.todoTitle
          }
          value={params.todo.title}
          placeholder={addTitleLabel}
          editable={false}
        />
        {params.todo.expiredOn && params.todo.expiredOn <= new Date() && (
          <Text style={styles.homeScreen.daysExpired}>
            ({moment(new Date()).diff(moment(params.todo.expiredOn), 'day')}) day
            {moment(new Date()).diff(moment(params.todo.expiredOn), 'day') > 1
              ? 's '
              : ' '}
            expired
          </Text>
        )}
        <TextInput
          style={
            params.todo.expiredOn && params.todo.expiredOn <= new Date()
              ? {
                  ...styles.homeScreen.todoDescription,
                  ...styles.homeScreen.textExpired,
                }
              : styles.homeScreen.todoDescription
          }
          value={params.todo.description}
          placeholder={addDescriptionLabel}
          editable={false}
        />
      </Pressable>
    );
  };

  const ListItem = (todo: TodoItem) => {
    return (
      <View>
        <View style={styles.homeScreen.todoItem}>
          <View>
            <TodoItemSection todo={todo}/>
          </View>
          <View>
            {todo.title !== undefined &&
              todo.title !== '' &&
              todo.title !== null && (
                <Switch
                  value={todo.completed}
                  onValueChange={() => {
                    const newTodoList = todoList.filter(
                      todoItem => todoItem.id !== todo.id,
                    );
                    const newItem: TodoItem = {
                      ...todo,
                      completedOn: new Date(),
                    };
                    const newcompletedList = completedList.concat(newItem);
                    setcompletedList(newcompletedList);
                    setTodoList(newTodoList);
                  }}
                  thumbColor={
                    !todo.completed ? colors.lightgray : colors.orange
                  }
                  ios_backgroundColor="#3e3e3e"
                />
              )}
          </View>
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView>
      {!todoList.length && (
        <Text style={styles.homeScreen.emptyText}>{emptyLabel}</Text>
      )}
      <View accessibilityRole="tab">
        <View accessibilityRole="tablist">
          {showAddEditModal && (
            <AddEditModal
              datePickerVisible={datePickerVisible}
              selectedItem={selectedItem}
              showAddEditModal={showAddEditModal}
              setSelectedItem={setSelectedItem}
              setAddEditModalVisible={setAddEditModalVisible}
              setDatePickerVisible={setDatePickerVisible}
              onUpdateTodo={onUpdateTodo}
            />
          )}
          <FlatList
            style={styles.homeScreen.todoListContainer}
            data={todoList}
            keyExtractor={item => `todo_${item.id}`}
            renderItem={({item}) => (
              <ListItem
                id={item.id}
                title={item.title}
                description={item.description}
                completed={item.completed}
                createdOn={item.createdOn}
                completedOn={item.completedOn}
                updatedOn={item.updatedOn}
                expiredOn={item.expiredOn}
              />
            )}
          />
          <FAB
            color={colors.white}
            style={styles.homeScreen.fab}
            small
            icon="plus"
            onPress={() => {
              setSelectedItem({
                id: lastId + 1,
                title: '',
                description: '',
                completed: false,
                createdOn: new Date(),
              });
              setCreateMode(true);
              setAddEditModalVisible(true);
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
