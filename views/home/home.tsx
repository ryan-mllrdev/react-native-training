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

const HomeScreen = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [completedList, setcompletedList] = useState<TodoItem[]>([]);
  const [lastId, setLastId] = useState(0);
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TodoItem>({
    id: 0,
    title: '',
    description: '',
    completed: false,
  });

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

  const onAddTodo = () => {
    const todoItem: TodoItem = {
      id: lastId + 1,
      title: '',
      description: '',
      completed: false,
      createdOn: new Date(),
    };
    const newList = todoList.concat(todoItem);
    setTodoList(newList);
  };

  const onUpdateTodo = (todo: TodoItem) => {
    const newList = todoList.map(todoItem => {
      if (todoItem.id === todo.id) {
        const updatedItem: TodoItem = {
          ...todo,
          updatedOn: new Date(),
        };
        return updatedItem;
      }
      return todoItem;
    });

    setTodoList(newList);
    setIsEdit(!isEdit);
  };

  const ListItem = (item: TodoItem) => {
    return (
      <View>
        <View style={styles.homeScreen.listItem}>
          <View>
            <Pressable
              onPress={() => {
                setIsEdit(true);
                setSelectedItem(item);
              }}>
              <TextInput
                style={
                  item.expiredOn && item.expiredOn <= new Date()
                    ? {
                        ...styles.homeScreen.todoTitle,
                        ...styles.homeScreen.textExpired,
                      }
                    : styles.homeScreen.todoTitle
                }
                value={item.title}
                placeholder="Add title"
                editable={false}
              />
              {item.expiredOn && item.expiredOn <= new Date() && (
                <Text style={styles.homeScreen.daysExpired}>
                  ({moment(new Date()).diff(moment(item.expiredOn), 'day')}) day
                  {moment(new Date()).diff(moment(item.expiredOn), 'day') > 1
                    ? 's '
                    : ' '}
                  expired
                </Text>
              )}
              <TextInput
                style={
                  item.expiredOn && item.expiredOn <= new Date()
                    ? {
                        ...styles.homeScreen.todoDescription,
                        ...styles.homeScreen.textExpired,
                      }
                    : styles.homeScreen.todoDescription
                }
                value={item.description}
                placeholder="Add description"
                editable={false}
              />
            </Pressable>
          </View>
          <View>
            {item.title !== undefined &&
              item.title !== '' &&
              item.title !== null && (
                <Switch
                  value={item.completed}
                  onValueChange={() => {
                    const newTodoList = todoList.filter(
                      todoItem => todoItem.id !== item.id,
                    );
                    const newItem: TodoItem = {
                      ...item,
                      completedOn: new Date(),
                    };
                    const newcompletedList = completedList.concat(newItem);
                    setcompletedList(newcompletedList);
                    setTodoList(newTodoList);
                  }}
                  thumbColor={!item.completed ? 'lightgray' : 'orange'}
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
      <View accessibilityRole="tab">
        <View accessibilityRole="tablist">
          <Modal
            animationType="slide"
            transparent={true}
            visible={isEdit}
            onRequestClose={() => {
              setIsEdit(!isEdit);
            }}>
            <View style={styles.homeScreen.centerModal}>
              <View style={styles.homeScreen.modalContainer}>
                <TextInput
                  style={styles.homeScreen.updateTitle}
                  placeholder="Title"
                  value={selectedItem.title}
                  onChangeText={text =>
                    setSelectedItem({...selectedItem, title: text})
                  }
                />
                <TextInput
                  style={styles.homeScreen.updateDescription}
                  placeholder="Description"
                  value={selectedItem.description}
                  onChangeText={text =>
                    setSelectedItem({...selectedItem, description: text})
                  }
                />

                <Button
                  color={
                    selectedItem.expiredOn &&
                    selectedItem.expiredOn <= new Date()
                      ? '#dc143c'
                      : ''
                  }
                  title={
                    selectedItem.expiredOn ? 'Update Expiry' : 'Set Expiry'
                  }
                  onPress={() => setDatePickerVisible(true)}
                />

                {datePickerVisible && (
                  <DatePicker
                    value={
                      selectedItem.expiredOn
                        ? selectedItem.expiredOn
                        : new Date()
                    }
                    mode="date"
                    display="default"
                    onChange={(evt, date) => {
                      if (evt.type === 'dismissed') {
                        setDatePickerVisible(false);
                        return;
                      }
                      setDatePickerVisible(false);
                      setSelectedItem({
                        ...selectedItem,
                        expiredOn: date,
                      });
                    }}
                  />
                )}
                <View style={styles.homeScreen.separator} />
                <View style={styles.homeScreen.dateTextContainer}>
                  <Text style={styles.homeScreen.dateText}>Created On: </Text>
                  <Text style={styles.homeScreen.dateText}>
                    {moment(selectedItem.createdOn).format('MM/DD/yyyy')}
                  </Text>
                </View>
                <View style={styles.homeScreen.dateTextContainer}>
                  <Text style={styles.homeScreen.dateText}>Last Update: </Text>
                  <Text style={styles.homeScreen.dateText}>
                    {selectedItem.updatedOn
                      ? moment(selectedItem.updatedOn).format('MM/DD/yyyy')
                      : ''}
                  </Text>
                </View>
                <View style={styles.homeScreen.dateTextContainer}>
                  <Text style={styles.homeScreen.dateText}>Expired On: </Text>
                  <Text
                    style={
                      selectedItem.expiredOn &&
                      selectedItem.expiredOn <= new Date()
                        ? {
                            ...styles.homeScreen.dateText,
                            ...styles.homeScreen.textExpired,
                          }
                        : styles.homeScreen.dateText
                    }>
                    {selectedItem.expiredOn
                      ? moment(selectedItem.expiredOn).format('MM/DD/yyyy')
                      : ''}
                  </Text>
                </View>
                <View style={styles.homeScreen.separator} />
                <View style={styles.homeScreen.modalActionButtonsContainer}>
                  <View style={styles.homeScreen.modalActionButtons}>
                    <Button
                      color="orange"
                      title="Cancel"
                      onPress={() => {
                        setIsEdit(!isEdit);
                      }}
                    />
                  </View>
                  <View style={styles.homeScreen.modalActionButtons}>
                    <Button
                      color="orange"
                      title="Save"
                      onPress={() => {
                        onUpdateTodo(selectedItem);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <FlatList
            style={styles.homeScreen.todoList}
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
            color="white"
            style={styles.homeScreen.fab}
            small
            icon="plus"
            onPress={onAddTodo}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
