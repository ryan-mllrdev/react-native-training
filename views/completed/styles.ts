/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import COLORS from '../shared/custom-colors';

const colors = COLORS;

const completedScreen = StyleSheet.create({
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
  todoTitleHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: 'sans-serif-thin',
    backgroundColor: COLORS.darkcyan,
  },
  todoContainer: {
    height: '100%',
    backgroundColor: COLORS.white,
    borderWidth: 0.8,
    borderColor: COLORS.darkcyan,
  },
  todoItem: {
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.darkcyan,
    padding: 3,
  },
  todoTitle: {
    color: COLORS.darkcyan,
    fontSize: 20,
    fontFamily: 'sans-serif-thin',
    fontWeight: 'bold',
  },
  todoDescription: {
    color: COLORS.gray,
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
    color: COLORS.gray,
    fontSize: 10,
    marginLeft: 3,
  },
});

export default { colors, completedScreen };
