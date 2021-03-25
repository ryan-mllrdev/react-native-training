/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import moment from 'moment';
import React, {useState} from 'react';
import {Button, Modal, Text, TextInput, View} from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import {AddEditModalParams} from '../../core/interfaces/params/AddEditModalParams';
import {TodoItem} from '../../core/interfaces/TodoItem';
import styles from '../../views/home/styles';

const AddEditModal = (params: AddEditModalParams) => {
  const colors = {
    white: 'white',
    orange: 'orange',
    lightgray: 'lightgray',
  };
  const dateFormat = 'MM/DD/YYYY';
  const titleLabel = 'Title';
  const descriptionLabel = 'Description';
  const createdOnLabel = 'Created On: ';
  const setExpiryLabel = 'Set Expiry';
  const updateExpiryLabel = 'Update Expiry';
  const saveLabel = 'Save';
  const cancelLabel = 'Cancel';

  return (
    <Modal
      animationType="slide"
      transparent={true}
      onRequestClose={() => params.setAddEditModalVisible(!params.showAddEditModal)}>
      <View style={styles.homeScreen.centerModal}>
        <View style={styles.homeScreen.modalContainer}>
          <TextInput
            style={styles.homeScreen.updateTitle}
            placeholder={titleLabel}
            value={params.selectedItem.title}
            onChangeText={text =>
              params.setSelectedItem({...params.selectedItem, title: text})
            }
          />
          <TextInput
            style={styles.homeScreen.updateDescription}
            placeholder={descriptionLabel}
            value={params.selectedItem.description}
            onChangeText={text =>
              params.setSelectedItem({...params.selectedItem, description: text})
            }
          />

          <Button
            color={
              params.selectedItem.expiredOn && params.selectedItem.expiredOn <= new Date()
                ? styles.expiredColor
                : ''
            }
            title={params.selectedItem.expiredOn ? updateExpiryLabel : setExpiryLabel}
            onPress={() => params.setDatePickerVisible(true)}
          />

          {params.datePickerVisible && (
            <DatePicker
              value={
                params.selectedItem.expiredOn ? params.selectedItem.expiredOn : new Date()
              }
              mode="date"
              display="default"
              onChange={(evt, date) => {
                if (evt.type === 'dismissed') {
                  params.setDatePickerVisible(false);
                  return;
                }
                params.setDatePickerVisible(false);
                params.setSelectedItem({
                  ...params.selectedItem,
                  expiredOn: date,
                });
              }}
            />
          )}
          <View style={styles.homeScreen.separator} />
          <View style={styles.homeScreen.dateTextContainer}>
            <Text style={styles.homeScreen.dateText}>{createdOnLabel}</Text>
            <Text style={styles.homeScreen.dateText}>
              {moment(params.selectedItem.createdOn).format(dateFormat)}
            </Text>
          </View>
          <View style={styles.homeScreen.dateTextContainer}>
            <Text style={styles.homeScreen.dateText}>Last Update: </Text>
            <Text style={styles.homeScreen.dateText}>
              {params.selectedItem.updatedOn
                ? moment(params.selectedItem.updatedOn).format(dateFormat)
                : ''}
            </Text>
          </View>
          <View style={styles.homeScreen.dateTextContainer}>
            <Text style={styles.homeScreen.dateText}>Expired On: </Text>
            <Text
              style={
                params.selectedItem.expiredOn && params.selectedItem.expiredOn <= new Date()
                  ? {
                      ...styles.homeScreen.dateText,
                      ...styles.homeScreen.textExpired,
                    }
                  : styles.homeScreen.dateText
              }>
              {params.selectedItem.expiredOn
                ? moment(params.selectedItem.expiredOn).format(dateFormat)
                : ''}
            </Text>
          </View>
          <View style={styles.homeScreen.separator} />
          <View style={styles.homeScreen.modalActionButtonsContainer}>
            <View style={styles.homeScreen.modalActionButtons}>
              <Button
                color={colors.orange}
                title={cancelLabel}
                onPress={() => params.setAddEditModalVisible(!params.showAddEditModal)}
              />
            </View>
            <View style={styles.homeScreen.modalActionButtons}>
              <Button
                color={colors.orange}
                title={saveLabel}
                onPress={() => {
                  params.onUpdateTodo(params.selectedItem);
                }}
              />
            </View>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default AddEditModal;
