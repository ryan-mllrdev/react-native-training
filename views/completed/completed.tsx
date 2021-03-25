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
    <View style={styles.completedStyles.todoContainer}>
      {!todoList.length && (
        <Text style={styles.completedStyles.emptyText}>{emptyLabel}</Text>
      )}
      <FlatList
        data={todoList}
        keyExtractor={item => `completed_${item.id}`}
        renderItem={({item}) => (
          <View style={styles.completedStyles.todoItem}>
            <View>
              <Text style={styles.completedStyles.todoTitle}>{item.title}</Text>
              <Text style={styles.completedStyles.todoDescription}>
                {item.description ? item.description : noDescriptionLabel}
              </Text>
            </View>
            <View style={styles.completedStyles.separator} />
            <View style={styles.completedStyles.todoDatesContainer}>
              <Icon
                name="plus"
                color={styles.colors.yellow}
                style={styles.completedStyles.todoDateIcon}
              />
              <Text style={styles.completedStyles.todoDateText}>
                {item.createdOn}
              </Text>
            </View>
            <View style={styles.completedStyles.todoDatesContainer}>
              <Icon
                name="check"
                color={styles.colors.lightgreen}
                style={styles.completedStyles.todoDateIcon}
              />
              <Text style={styles.completedStyles.todoDateText}>
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
