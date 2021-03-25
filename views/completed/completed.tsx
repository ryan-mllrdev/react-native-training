/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TodoItem} from '../../core/interfaces/TodoItem';
import StorageService from '../../core/services/Storage.service';
import completedScreenStyles from './styles';

const CompletedScreen = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  useEffect(() => {
    StorageService.getData('completedList').then(data => {
      setTodoList(data);
    });
  }, [todoList]);
  return (
    <View style={completedScreenStyles.todoContainer}>
      <FlatList
        data={todoList}
        keyExtractor={item => `completed_${item.id}`}
        renderItem={({item}) => (
          <View style={completedScreenStyles.todoItem}>
            <View>
              <Text style={completedScreenStyles.todoTitle}>
                {item.title}
              </Text>
              <Text style={completedScreenStyles.todoDescription}>
                {item.description ? item.description : 'No description'}
              </Text>
            </View>
            <View style={completedScreenStyles.separator} />
            <View style={completedScreenStyles.todoDatesContainer}>
              <Icon
                name="plus"
                color="yellow"
                style={completedScreenStyles.todoDateIcon}
              />
              <Text style={completedScreenStyles.todoDateText}>
                {item.createdOn}
              </Text>
            </View>
            <View style={completedScreenStyles.todoDatesContainer}>
              <Icon
                name="check"
                color="lightgreen"
                style={completedScreenStyles.todoDateIcon}
              />
              <Text style={completedScreenStyles.todoDateText}>
                {item.completedOn}
              </Text>
            </View>
          </View>
        )}
      />
    </View>
  );
};

export default CompletedScreen;
