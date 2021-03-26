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
  Text,
  FlatList,
} from 'react-native';
import {FAB} from 'react-native-paper';
import {TodoItem} from '../../core/interfaces/TodoItem';
import StorageService from '../../core/services/Storage.service';
import styles from './styles';
import AddEditModal from '../shared/modal/add-edit-todo';
import dateUtils from '../../core/utils/date-utils';
import COLORS from '../shared/custom-colors';
import {IScreenParams} from '../../core/interfaces/params/IScreenParams';

interface TodoItemSectionParams {
  todo: TodoItem;
}

const HomeScreen = (params: IScreenParams) => {
  const emptyLabel = 'Empty';
  const addTitleLabel = 'Add Title';
  const addDescriptionLabel = 'Add Description';
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TodoItem>();
  const [showAddEditModal, setAddEditModalVisible] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [completedList, setCompletedList] = useState<TodoItem[]>([]);
  const [lastId, setLastId] = useState(0);

  // Get last id
  useEffect(() => {
    StorageService.getSingleData('lastId').then(lastIdResult => {
      if (!lastIdResult) {
        return;
      }
      setLastId(+lastIdResult);
    });
  }, []);

  // Get todo's
  useEffect(() => {
    console.log('fetching todo...');
    let started = true;
    StorageService.getJsonData('todo').then(todoResult => {
      if (!todoResult) {
        return;
      }
      params.setTodoList(todoResult);
      return () => {
        started = false;
      };
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get completed todos...
  useEffect(() => {
    StorageService.getJsonData('completed').then(completedResult => {
      if (!completedResult) {
        return;
      }
      setCompletedList(completedResult);
    });
  }, []);

  // Get the max id from all data
  useEffect(() => {
    const maxId = Math.max(
      ...(params.todoList.length ? params.todoList.map(a => a.id) : [0]),
      ...(completedList.length ? completedList.map(a => a.id) : [0]),
    );
    setLastId(maxId);
  }, [params.todoList, completedList]);

  useEffect(() => {
    StorageService.storeJsonData('completed', completedList);
  }, [completedList]);

  useEffect(() => {
    if (!params.todoList || (params.todoList && !params.todoList.length)) {
      StorageService.storeJsonData('todo', params.todoList);
      return;
    }
    setLastId(
      Math.max(
        ...params.todoList.map(todo => todo.id),
        ...(completedList.length ? completedList.map(todo => todo.id) : [0]),
      ),
    );
    StorageService.storeSingleData('lastId', lastId.toString());
    StorageService.storeJsonData('todo', params.todoList);
  }, [params.todoList, lastId, completedList]);

  const onAddTodo = (todoItem: TodoItem): TodoItem[] => {
    const newList = params.todoList.concat(todoItem);
    return newList;
  };

  const onUpdateTodo = (todo: TodoItem) => {
    const newList = createMode
      ? onAddTodo(todo)
      : params.todoList.map(todoItem => {
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
    params.setTodoList(newList);
    setAddEditModalVisible(!showAddEditModal);
  };

  const todoItemTitleStyle = (expiredOn: Date) => {
    return expiredOn && dateUtils.lessThanOrEqual(expiredOn, new Date(), 'day')
      ? {
          ...styles.homeScreen.todoTitle,
          ...styles.homeScreen.textExpired,
        }
      : styles.homeScreen.todoTitle;
  };

  const TodoItemSection = (todoItemParams: TodoItemSectionParams) => {
    return (
      <Pressable
        onPress={() => {
          setCreateMode(false);
          setAddEditModalVisible(true);
          setSelectedItem(todoItemParams.todo);
        }}>
        <TextInput
          style={todoItemTitleStyle(todoItemParams.todo.expiredOn)}
          value={todoItemParams.todo.title}
          placeholder={addTitleLabel}
          editable={false}
        />
        {todoItemParams.todo.expiredOn &&
          dateUtils.lessThanOrEqual(
            todoItemParams.todo.expiredOn,
            new Date(),
            'day',
          ) && (
            <Text style={styles.homeScreen.daysExpired}>
              (
              {dateUtils.dateDiff(
                new Date(),
                todoItemParams.todo.expiredOn,
                'day',
              )}
              ) day
              {dateUtils.dateDiff(
                new Date(),
                todoItemParams.todo.expiredOn,
                'day',
              ) > 1
                ? 's '
                : ' '}
              expired
            </Text>
          )}
        <TextInput
          style={styles.homeScreen.todoDescription}
          value={todoItemParams.todo.description}
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
            <TodoItemSection todo={todo} />
          </View>
          <View>
            {todo.title !== undefined &&
              todo.title !== '' &&
              todo.title !== null && (
                <Switch
                  value={todo.completed}
                  onValueChange={() => {
                    const newTodoList = params.todoList.filter(
                      todoItem => todoItem.id !== todo.id,
                    );
                    const newItem: TodoItem = {
                      ...todo,
                      completedOn: new Date(),
                    };
                    const newCompletedList = completedList.concat(newItem);
                    setCompletedList(newCompletedList);
                    params.setTodoList(newTodoList);
                  }}
                  thumbColor={
                    !todo.completed
                      ? styles.colors.lightgray
                      : styles.colors.orange
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
    <SafeAreaView style={{backgroundColor: COLORS.lightgray}}>
      <Text style={styles.homeScreen.todoTitleHeader}>Tasks</Text>
      {!params.todoList.length && (
        <Text style={styles.homeScreen.emptyText}>{emptyLabel}</Text>
      )}
      <View accessibilityRole="tab">
        <View accessibilityRole="tablist">
          {showAddEditModal && (
            <AddEditModal
              showExpiryButton={true}
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
            data={params.todoList}
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
            color={styles.colors.white}
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
