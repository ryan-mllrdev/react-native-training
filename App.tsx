/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */
import React, {useState} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {NavigationContainer} from '@react-navigation/native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import CompletedScreen from './views/completed/completed';
import HomeScreen from './views/home/home';
import CalendarScreen from './views/calendar/calendar';
import {TodoItem} from './core/interfaces/TodoItem';

const Tab = createBottomTabNavigator();

const App = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);

  return (
    <NavigationContainer>
      <Tab.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#e91e63',
        }}>
        <Tab.Screen
          name="Home"
          children={() => (
            <HomeScreen todoList={todoList} setTodoList={setTodoList} />
          )}
          options={{
            tabBarLabel: 'Home',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="home" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Calendar"
          children={() => (
            <CalendarScreen todoList={todoList} setTodoList={setTodoList} />
          )}
          options={{
            tabBarLabel: 'Calendar',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons
                name="calendar"
                color={color}
                size={size}
              />
            ),
          }}
        />
        <Tab.Screen
          name="Completed"
          component={CompletedScreen}
          options={{
            tabBarLabel: 'Completed',
            tabBarIcon: ({color, size}) => (
              <MaterialCommunityIcons name="check" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default App;
