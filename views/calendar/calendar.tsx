/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import moment, {Moment} from 'moment';
import React, {useEffect, useState} from 'react';
import {Text, View} from 'react-native';
import CalendarPicker, {
  CalendarPickerProps,
  CustomDatesStylesFunc,
  CustomDateStyle,
  DateChangedCallback,
} from 'react-native-calendar-picker';
import {IScreenParams} from '../../core/interfaces/params/IScreenParams';
import {TodoItem} from '../../core/interfaces/TodoItem';
import StorageService from '../../core/services/Storage.service';
import dateUtils from '../../core/utils/date-utils';
import COLORS from '../shared/custom-colors';
import AddEditModal from '../shared/modal/add-edit-todo';
import styles from './styles';

const CalendarScreen = (params: IScreenParams) => {
  const [datePickerVisible, setDatePickerVisible] = useState(false);
  const [selectedItem, setSelectedItem] = useState<TodoItem>();
  const [showAddEditModal, setAddEditModalVisible] = useState(false);
  const [createMode, setCreateMode] = useState(false);
  const [completedList, setCompletedList] = useState<TodoItem[]>([]);
  const [lastId, setLastId] = useState(0);

  let today = moment();
  let day = today.clone().startOf('month');
  let customDatesStyles: CustomDateStyle[] = [];
  //   while (day.add(1, 'day').isSame(today, 'month')) {
  //     customDatesStyles.push({
  //       date: day.clone(),
  //       // Random colors
  //       style: {
  //         backgroundColor:
  //           '#' +
  //           ('#00000' + ((Math.random() * (1 << 24)) | 0).toString(16)).slice(-6),
  //       },
  //       textStyle: {color: 'black'}, // sets the font color
  //       //   containerStyle: [], // extra styling for day container
  //       //   allowDisabled: true, // allow custom style to apply to disabled dates
  //     });
  //   }

  // Get last id
  useEffect(() => {
    StorageService.getSingleData('lastId').then(lastIdResult => {
      if (!lastIdResult) {
        return;
      }
      setLastId(+lastIdResult);
    });
  }, []);

  // Get todo's
  useEffect(() => {
    StorageService.getJsonData('todo').then(todoResult => {
      if (!todoResult) {
        return;
      }
      params.setTodoList(todoResult);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Get completed todos...
  useEffect(() => {
    StorageService.getJsonData('completed').then(completedResult => {
      if (!completedResult) {
        return;
      }
      setCompletedList(completedResult);
    });
  }, []);

  // Get the max id from all data
  useEffect(() => {
    const maxId = Math.max(
      ...(params.todoList.length ? params.todoList.map(a => a.id) : [0]),
      ...(completedList.length ? completedList.map(a => a.id) : [0]),
    );
    setLastId(maxId);
  }, [params.todoList, completedList]);

  useEffect(() => {
    StorageService.storeJsonData('completed', completedList);
  }, [completedList]);

  useEffect(() => {
    if (!params.todoList || (params.todoList && !params.todoList.length)) {
      StorageService.storeJsonData('todo', params.todoList);
      return;
    }
    setLastId(
      Math.max(
        ...params.todoList.map(todo => todo.id),
        ...(completedList.length ? completedList.map(todo => todo.id) : [0]),
      ),
    );
    StorageService.storeSingleData('lastId', lastId.toString());
    StorageService.storeJsonData('todo', params.todoList);
  }, [params.todoList, lastId, completedList]);

  const onAddTodo = (todoItem: TodoItem): TodoItem[] => {
    const newList = params.todoList.concat(todoItem);
    return newList;
  };

  const onUpdateTodo = (todo: TodoItem) => {
    const newList = createMode
      ? onAddTodo(todo)
      : params.todoList.map(todoItem => {
          if (todoItem.id === todo.id) {
            const updatedItem: TodoItem = {
              ...todo,
              updatedOn: new Date(),
            };
            return updatedItem;
          }
          return todoItem;
        });

    setCreateMode(false);
    params.setTodoList(newList);
    setAddEditModalVisible(!showAddEditModal);
  };

  const onDateChange = (date: Moment, type: 'START_DATE' | 'END_DATE') => {
    setSelectedItem({
      id: lastId + 1,
      title: '',
      description: '',
      completed: false,
      createdOn: new Date(),
      expiredOn: new Date(date.toDate()),
    });
    setCreateMode(true);
    setAddEditModalVisible(true);
  };

  const datesWithAssignedTasks = (date: Moment) => {
    const todoListWithThisDate = params.todoList.filter(todo =>
      dateUtils.equals(todo.expiredOn, new Date(date.toDate()), 'day'),
    );
    if (todoListWithThisDate.length) {
      return {
        style: {
          backgroundColor: dateUtils.lessThanOrEqual(
            new Date(date.toDate()),
            new Date(),
            'day',
          )
            ? COLORS.crimson
            : COLORS.darkblue,
        },
        textStyle: dateUtils.lessThanOrEqual(
          new Date(date.toDate()),
          new Date(),
          'day',
        )
          ? styles.textExpired
          : {
              color: COLORS.white,
              fontWeight: 'bold',
            },
      };
    }
    // return params.todoList
    //   .filter(todo => todo.expiredOn && moment(todo.expiredOn) === date)
    //   .map(todo => {
    //     return {
    //       style: {
    //         backgroundColor: COLORS.darkblue,
    //       },
    //     };
    //   });
  };

  return (
    <View>
      <Text style={styles.calendarTitleHeader}>Calendar</Text>
      <CalendarPicker
        onDateChange={onDateChange}
        customDatesStyles={datesWithAssignedTasks}
      />
      {showAddEditModal && (
        <AddEditModal
          showExpiryButton={false}
          datePickerVisible={datePickerVisible}
          selectedItem={selectedItem}
          showAddEditModal={showAddEditModal}
          setSelectedItem={setSelectedItem}
          setAddEditModalVisible={setAddEditModalVisible}
          setDatePickerVisible={setDatePickerVisible}
          onUpdateTodo={onUpdateTodo}
        />
      )}
    </View>
  );
};

export default CalendarScreen;
