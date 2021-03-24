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
import {Item} from 'react-native-paper/lib/typescript/components/List/List';
import {TodoItem} from '../../core/interfaces/TodoItem';
import StorageService from '../../core/services/Storage.service';
import homeScreenStyles from './styles';

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
    StorageService.getData('todoList')
      .then(todoResult => {
        todoData = todoResult;

        StorageService.getData('completedList')
          .then(completedResult => {
            if (!completedResult) {
              return;
            }
            completedData = completedResult;
          })
          .finally(() => {
            if (!allData.length) {
              return;
            }
            allData = [...todoData, ...completedData];
          });
      })
      .finally(() => {
        if (!allData.length) {
          return;
        }
        const maxId = Math.max(...allData.map(todo => todo.id));
        setLastId(maxId);
        if (todoData && todoData.length) {
          setTodoList(todoData);
        }
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
        <View style={homeScreenStyles.listItem}>
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
                        ...homeScreenStyles.todoTitle,
                        ...homeScreenStyles.textExpired,
                      }
                    : homeScreenStyles.todoTitle
                }
                value={item.title}
                placeholder="Add title"
                editable={false}
              />
              <TextInput
                style={
                  item.expiredOn && item.expiredOn <= new Date()
                    ? {
                        ...homeScreenStyles.todoDescription,
                        ...homeScreenStyles.textExpired,
                      }
                    : homeScreenStyles.todoDescription
                }
                value={item.description}
                placeholder="Add description"
                editable={false}
              />
            </Pressable>
          </View>
          <View>
            {(item.title !== undefined && item.title !== '' && item.title !== null) && (
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
            <View style={homeScreenStyles.centerModal}>
              <View style={homeScreenStyles.modalContainer}>
                <TextInput
                  style={homeScreenStyles.updateTitle}
                  placeholder="Title"
                  value={selectedItem.title}
                  onChangeText={text =>
                    setSelectedItem({...selectedItem, title: text})
                  }
                />
                <TextInput
                  style={homeScreenStyles.updateDescription}
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
                <View style={homeScreenStyles.separator} />
                <View style={homeScreenStyles.dateTextContainer}>
                  <Text style={homeScreenStyles.dateText}>Created On: </Text>
                  <Text style={homeScreenStyles.dateText}>
                    {moment(selectedItem.createdOn).format('MM/DD/yyyy')}
                  </Text>
                </View>
                <View style={homeScreenStyles.dateTextContainer}>
                  <Text style={homeScreenStyles.dateText}>Last Update: </Text>
                  <Text style={homeScreenStyles.dateText}>
                    {selectedItem.updatedOn
                      ? moment(selectedItem.updatedOn).format('MM/DD/yyyy')
                      : ''}
                  </Text>
                </View>
                <View style={homeScreenStyles.dateTextContainer}>
                  <Text style={homeScreenStyles.dateText}>Expired On: </Text>
                  <Text
                    style={
                      selectedItem.expiredOn &&
                      selectedItem.expiredOn <= new Date()
                        ? {
                            ...homeScreenStyles.dateText,
                            ...homeScreenStyles.textExpired,
                          }
                        : homeScreenStyles.dateText
                    }>
                    {selectedItem.expiredOn
                      ? moment(selectedItem.expiredOn).format('MM/DD/yyyy')
                      : ''}
                  </Text>
                </View>
                <View style={homeScreenStyles.separator} />
                <View style={homeScreenStyles.modalActionButtonsContainer}>
                  <View style={homeScreenStyles.modalActionButtons}>
                    <Button
                      color="orange"
                      title="Cancel"
                      onPress={() => {
                        setIsEdit(!isEdit);
                      }}
                    />
                  </View>
                  <View style={homeScreenStyles.modalActionButtons}>
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
            style={homeScreenStyles.todoList}
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
            style={homeScreenStyles.fab}
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
