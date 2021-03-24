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
    <View>
      <FlatList
        data={todoList}
        keyExtractor={item => `completed_${item.id}`}
        renderItem={({item}) => (
          <View style={completedScreenStyles.completedTodos}>
            <View>
              <Text style={completedScreenStyles.completedTodoTitle}>
                {item.title}
              </Text>
              <Text style={completedScreenStyles.completedTodoDescription}>
                {item.description ? item.description : 'No description'}
              </Text>
            </View>
            <View style={completedScreenStyles.separator} />
            <View style={completedScreenStyles.completedTodoDatesContainer}>
              <Icon
                name="plus"
                color="orange"
                style={completedScreenStyles.completedTodoIcon}
              />
              <Text style={completedScreenStyles.completedTodoText}>
                {item.createdOn}
              </Text>
            </View>
            <View style={completedScreenStyles.completedTodoDatesContainer}>
              <Icon
                name="check"
                color="green"
                style={completedScreenStyles.completedTodoIcon}
              />
              <Text style={completedScreenStyles.completedTodoText}>
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
