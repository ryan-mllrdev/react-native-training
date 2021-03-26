/* eslint-disable prettier/prettier */
import React, {useEffect, useState} from 'react';
import {FlatList, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {TodoItem} from '../../core/interfaces/TodoItem';
import StorageService from '../../core/services/Storage.service';
import styles from './styles';

const CompletedScreen = () => {
  const emptyLabel = 'Empty';
  const noDescriptionLabel = 'No description';

  const [todoList, setTodoList] = useState<TodoItem[]>([]);
  useEffect(() => {
    StorageService.getJsonData('completed').then(data => {
      setTodoList(data);
    });
  }, [todoList]);
  return (
    <View style={styles.completedScreen.todoContainer}>
      <Text style={styles.completedScreen.todoTitleHeader}>Completed Tasks</Text>
      {!todoList.length && (
        <Text style={styles.completedScreen.emptyText}>{emptyLabel}</Text>
      )}
      <FlatList
        data={todoList}
        keyExtractor={item => `completed_${item.id}`}
        renderItem={({item}) => (
          <View style={styles.completedScreen.todoItem}>
            <View>
              <Text style={styles.completedScreen.todoTitle}>{item.title}</Text>
              <Text style={styles.completedScreen.todoDescription}>
                {item.description ? item.description : noDescriptionLabel}
              </Text>
            </View>
            <View style={styles.completedScreen.separator} />
            <View style={styles.completedScreen.todoDatesContainer}>
              <Icon
                name="plus"
                color={styles.colors.crimson}
                style={styles.completedScreen.todoDateIcon}
              />
              <Text style={styles.completedScreen.todoDateText}>
                {item.createdOn}
              </Text>
            </View>
            <View style={styles.completedScreen.todoDatesContainer}>
              <Icon
                name="check"
                color={styles.colors.darkcyan}
                style={styles.completedScreen.todoDateIcon}
              />
              <Text style={styles.completedScreen.todoDateText}>
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
