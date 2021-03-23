/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

// import {NavigationContainer} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import {
  Button,
  FlatList,
  Modal,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Switch,
  Text,
  TextInput,
  View,
} from 'react-native';
import {TodoItem} from './core/interfaces/TodoItem';
import StoreService from './core/services/Storage.service';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Tab = createBottomTabNavigator();

const HomeScreen = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  const [isEdit, setIsEdit] = useState(false);
  const [doneList, setDoneList] = useState<TodoItem[]>([]);
  const [lastId, setLastId] = useState(0);
  const [selectedItem, setSelectedItem] = useState<TodoItem>({
    id: 0,
    text: '',
    description: '',
    done: false,
  });

  useEffect(() => {
    let allData: TodoItem[] = [];
    let todoData: TodoItem[] = [];
    let doneData: TodoItem[] = [];
    StoreService.getData('todoList')
      .then(todoResult => {
        console.log('Reading stored todos...');
        todoData = todoResult;

        StoreService.getData('doneList')
          .then(doneResult => {
            if (!doneResult) {
              return;
            }
            console.log('Reading stored done list...');
            doneData = doneResult;
          })
          .finally(() => {
            if (!allData.length) {
              return;
            }
            allData = [...todoData, ...doneData];
          });
      })
      .finally(() => {
        if (!allData.length) {
          return;
        }
        const maxId = Math.max(...allData.map(todo => todo.id));
        setLastId(maxId);
        if (todoData && todoData.length) {
          console.log('initializing todos...');
          setTodoList(todoData);
        }
        if (doneData && doneData.length) {
          console.log('initializing done list...');
          setDoneList(doneData);
        }
      });
  }, []);

  useEffect(() => {
    console.log('Storing/updating doneList...');
    StoreService.storeData('doneList', doneList);
  }, [doneList]);

  useEffect(() => {
    if (!todoList || (todoList && !todoList.length)) {
      return;
    }
    console.log('Storing new todo...');
    setLastId(
      Math.max(
        ...todoList.map(todo => todo.id),
        ...(doneList.length ? doneList.map(todo => todo.id) : [0]),
      ),
    );
    StoreService.storeData('todoList', todoList);
  }, [todoList, lastId, doneList]);

  const onAddTodo = () => {
    const todoItem = {
      id: lastId + 1,
      text: '',
      description: '',
      done: false,
    };
    setTodoList([...todoList, ...[todoItem]]);
  };

  const ListItem = (item: TodoItem) => {
    return (
      <View>
        <View style={styles.listItem}>
          <View>
            <Pressable
              onPress={() => {
                setIsEdit(true);
                setSelectedItem(item);
              }}>
              <TextInput
                style={styles.todoItemTitle}
                value={item.text}
                placeholder="Add title"
                editable={false}
              />
              <TextInput
                style={styles.todoItemDescription}
                value={item.description}
                placeholder="Add description"
                editable={false}
              />
            </Pressable>
          </View>
          <View>
            <Switch
              value={item.done}
              onValueChange={value => {
                const newList = todoList.filter((todoItem, index, arr) => {
                  return todoItem.id !== item.id;
                });
                setDoneList([...doneList, ...[item]]);
                setTodoList([...newList]);
              }}
              thumbColor={!item.done ? 'lightgray' : 'orange'}
              ios_backgroundColor="#3e3e3e"
            />
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
            <View style={styles.centerModal}>
              <View style={styles.modalContainer}>
                <TextInput
                  placeholder="Title"
                  value={selectedItem.text}
                  onChangeText={text =>
                    setSelectedItem({...selectedItem, text})
                  }
                />
                <TextInput
                  placeholder="Description"
                  value={selectedItem.description}
                  onChangeText={text =>
                    setSelectedItem({...selectedItem, description: text})
                  }
                />
                <View style={styles.modalActionButtonsContainer}>
                  <View style={styles.modalActionButtons}>
                    <Button
                      color="orange"
                      title="Cancel"
                      onPress={() => {
                        setIsEdit(!isEdit);
                      }}
                    />
                  </View>
                  <View style={styles.modalActionButtons}>
                    <Button
                      color="orange"
                      title="Save"
                      onPress={() => {
                        todoList[+selectedItem.id - 1] = selectedItem;
                        setTodoList([...todoList]);
                        setIsEdit(!isEdit);
                      }}
                    />
                  </View>
                </View>
              </View>
            </View>
          </Modal>
          <FlatList
            data={todoList}
            keyExtractor={(item, index) => `todo_${item.id}`}
            renderItem={({item}) => (
              <ListItem
                id={item.id}
                text={item.text}
                description={item.description}
                done={item.done}
              />
            )}
          />
          <Button
            onPress={onAddTodo}
            title="Add Todo"
            color="orange"
            accessibilityLabel="Learn more about this purple button"
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

const DoneScreen = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  useEffect(() => {
    StoreService.getData('doneList').then(data => {
      setTodoList(data);
    });
  }, [todoList]);
  return (
    <View>
      <FlatList
        data={todoList}
        keyExtractor={(item, index) => `done_${item.id}`}
        renderItem={({item}) => (
          <View style={{borderWidth: 1, padding: 3}}>
            <Text>{item.text}</Text>
          </View>
        )}
      />
    </View>
  );
};

const App = () => {
  const tabBarOptions = {
    inactiveTintColor: 'gray',
    activeTintColor: 'white',
    style: {
      height: 30,
      backgroundColor: 'red',
    },
    labelStyle: {
      fontSize: 18,
    },
    showIcon: true,
  };
  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}>
        <Tab.Screen
          name="Feed"
          component={HomeScreen}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Done"
          component={DoneScreen}
          options={{
            tabBarLabel: 'Done',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="check" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

const styles = StyleSheet.create({
  listItem: {
    margin: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoItemTitle: {
    color: '#000000',
    height: 20,
    padding: 0,
    margin: 3,
    fontWeight: 'bold',
    width: 300,
  },
  todoItemDescription: {
    color: 'gray',
    fontSize: 10,
    height: 15,
    padding: 0,
    margin: 3,
    width: 300,
  },
  editTextContainer: {
    display: 'flex',
    borderColor: 'lightgray',
    borderWidth: 0.5,
    color: 'gray',
    margin: 5,
  },
  editText: {
    color: 'gray',
    textAlign: 'center',
    fontSize: 12,
  },
  modalContainer: {
    display: 'flex',
    width: 300,
    borderWidth: 1,
    borderColor: 'lightgray',
    borderRadius: 15,
    padding: 10,
    backgroundColor: 'white',
  },
  modalActionButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  modalActionButtons: {
    margin: 5,
  },
  centerModal: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
});

export default App;
