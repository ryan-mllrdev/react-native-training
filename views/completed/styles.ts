/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import COLORS from '../shared/custom-colors';

const colors = COLORS;

const completedStyles = StyleSheet.create({
  separator: {height: 10},
  emptyText: {
    position: 'absolute',
    top: '45%',
    left: '45%',
    color: COLORS.white,
    fontWeight: 'bold',
    fontSize: 16,
    zIndex: 1,
  },
  todoContainer: {
    height: '100%',
    backgroundColor: COLORS.darkcyan,
    borderWidth: 0.8,
    borderColor: COLORS.white,
  },
  todoItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.white,
    padding: 3,
  },
  todoTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: 'sans-serif-thin',
    fontWeight: 'bold',
  },
  todoDescription: {
    color: COLORS.yellow,
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
    color: COLORS.white,
    fontSize: 10,
    marginLeft: 3,
  },
});

export default { colors, completedStyles };
