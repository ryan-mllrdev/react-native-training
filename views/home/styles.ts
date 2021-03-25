/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import COLORS from '../shared/custom-colors';

const colors = COLORS;

const homeScreen = StyleSheet.create({
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
  todoListContainer: {
    height: '100%',
    backgroundColor: COLORS.crimson,
    borderWidth: 0.5,
    borderColor: COLORS.white,
  },
  todoItem: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 0.5,
    borderBottomColor: COLORS.white,
    padding: 3,
  },
  todoTitle: {
    color: COLORS.white,
    fontSize: 20,
    fontFamily: 'sans-serif-thin',
    fontWeight: 'bold',
    height: 20,
    padding: 0,
    margin: 3,
    width: 300,
  },
  todoDescription: {
    color: COLORS.yellow,
    fontSize: 11,
    height: 15,
    padding: 0,
    margin: 3,
    width: 300,
  },
  textExpired: {
    textDecorationLine: 'line-through',
    color: colors.darkblue,
  },
  daysExpired: {
    color: colors.expired,
    fontSize: 10,
    fontWeight: 'bold',
  },
  editTextContainer: {
    display: 'flex',
    borderColor: COLORS.lightgray,
    borderWidth: 0.5,
    color: COLORS.gray,
    margin: 5,
  },
  editText: {
    color: COLORS.gray,
    textAlign: 'center',
    fontSize: 12,
  },
  modalContainer: {
    display: 'flex',
    width: 300,
    borderWidth: 1,
    borderColor: COLORS.lightgray,
    borderRadius: 7,
    padding: 10,
    backgroundColor: COLORS.white,
  },
  modalActionButtonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
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
  updateTitle: {
    height: 30,
    padding: 0,
    fontSize: 18,
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  updateDescription: {
    height: 30,
    padding: 0,
    fontSize: 14,
    color: COLORS.gray,
  },
  dateTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dateText: {
    fontSize: 10,
    color: COLORS.gray,
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: COLORS.orange,
  },
});

export default {colors, homeScreen};
