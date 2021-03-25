/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TodoItem} from '../../core/interfaces/TodoItem';
import StorageService from '../../core/services/Storage.service';
import styles from './styles';

const CompletedScreen = () => {
  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  useEffect(() => {
    StorageService.getData('completedList').then(data => {
      setTodoList(data);
    });
  }, [todoList]);
  return (
    <View style={styles.todoContainer}>
      <FlatList
        data={todoList}
        keyExtractor={item => `completed_${item.id}`}
        renderItem={({item}) => (
          <View style={styles.todoItem}>
            <View>
              <Text style={styles.todoTitle}>
                {item.title}
              </Text>
              <Text style={styles.todoDescription}>
                {item.description ? item.description : 'No description'}
              </Text>
            </View>
            <View style={styles.separator} />
            <View style={styles.todoDatesContainer}>
              <Icon
                name="plus"
                color="yellow"
                style={styles.todoDateIcon}
              />
              <Text style={styles.todoDateText}>
                {item.createdOn}
              </Text>
            </View>
            <View style={styles.todoDatesContainer}>
              <Icon
                name="check"
                color="lightgreen"
                style={styles.todoDateIcon}
              />
              <Text style={styles.todoDateText}>
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
