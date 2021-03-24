/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';

const expiredColor = '#dc143c';
const homeScreenStyles = StyleSheet.create({
  separator: {height: 10},
  todoList: {
    height: '100%',
  },
  listItem: {
    margin: 3,
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  todoTitle: {
    color: '#000000',
    height: 20,
    padding: 0,
    margin: 3,
    fontWeight: 'bold',
    width: 300,
  },
  textExpired: {
    textDecorationLine: 'line-through',
    color: expiredColor,
  },
  daysExpired: {
    color: expiredColor,
    fontSize: 10,
    fontWeight: 'bold',
  },
  todoDescription: {
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
    borderRadius: 7,
    padding: 10,
    backgroundColor: 'white',
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
    color: 'gray',
    fontWeight: 'bold',
  },
  updateDescription: {
    height: 30,
    padding: 0,
    fontSize: 14,
    color: 'gray',
  },
  dateTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },
  dateText: {
    fontSize: 10,
    color: 'gray',
    // fontStyle: 'italic',
  },
  fab: {
    position: 'absolute',
    margin: 16,
    right: 0,
    bottom: 0,
    backgroundColor: 'orange',
  },
});

export default {expiredColor, homeScreen: homeScreenStyles};
