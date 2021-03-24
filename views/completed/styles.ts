/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const completedScreenStyles = StyleSheet.create({
  separator: {height: 10},
  completedTodos: {
    borderBottomWidth: 0.3,
    borderBottomColor: 'gray',
    padding: 3,
  },
  completedTodoTitle: {
    color: 'gray',
    fontWeight: 'bold',
    fontSize: 16,
  },
  completedTodoDescription: {
    color: 'gray',
    fontSize: 12,
  },
  completedTodoDatesContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  completedTodoIcon: {
    fontSize: 14,
    fontWeight: '900',
  },
  completedTodoText: {
    color: 'gray',
    fontSize: 10,
    marginLeft: 3,
  },
});

export default completedScreenStyles;
