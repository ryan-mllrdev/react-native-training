/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const styles = StyleSheet.create({
  separator: {height: 10},
  todoContainer: {
    height: '100%',
    backgroundColor: 'coral',
    borderWidth: 0.8,
    borderColor: '#ffffff',
  },
  todoItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: 'white',
    padding: 3,
  },
  todoTitle: {
    color: 'white',
    fontSize: 20,
    fontFamily: 'sans-serif-thin',
    fontWeight: 'bold',
  },
  todoDescription: {
    color: 'yellow',
    fontSize: 11,
  },
  todoDatesContainer: {
    display: 'flex',
    flexDirection: 'row',
  },
  todoDateIcon: {
    fontSize: 14,
    fontWeight: '900',
  },
  todoDateText: {
    color: 'white',
    fontSize: 10,
    marginLeft: 3,
  },
});

export default styles;
