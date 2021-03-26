/* eslint-disable prettier/prettier */

import React from 'react';
import moment from 'moment';
import {Button, Modal, Text, TextInput, View} from 'react-native';
import DatePicker from '@react-native-community/datetimepicker';
import {IAddEditModalParams} from '../../../core/interfaces/params/IAddEditModalParams';
import styles from '../../home/styles';
import dateUtils from '../../../core/utils/date-utils';
import COLORS from '../custom-colors';

const AddEditModal = (params: IAddEditModalParams) => {
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
      onRequestClose={() =>
        params.setAddEditModalVisible(!params.showAddEditModal)
      }>
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
              params.setSelectedItem({
                ...params.selectedItem,
                description: text,
              })
            }
          />
          {!params.showExpiryButton &&
            dateUtils.lessThanOrEqual(
              params.selectedItem.expiredOn,
              new Date(),
              'day',
            ) && (
              <Text style={{color: COLORS.crimson}}>
                Please select a date later than the current date
              </Text>
            )}
          {params.showExpiryButton && (
            <Button
              color={
                params.selectedItem.expiredOn &&
                params.selectedItem.expiredOn <= new Date()
                  ? styles.colors.crimson
                  : ''
              }
              title={
                params.selectedItem.expiredOn
                  ? updateExpiryLabel
                  : setExpiryLabel
              }
              onPress={() => params.setDatePickerVisible(true)}
            />
          )}

          {params.datePickerVisible && (
            <DatePicker
              value={
                params.selectedItem.expiredOn
                  ? new Date(params.selectedItem.expiredOn)
                  : new Date()
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
                params.selectedItem.expiredOn &&
                params.selectedItem.expiredOn <= new Date()
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
                color={styles.colors.orange}
                title={cancelLabel}
                onPress={() =>
                  params.setAddEditModalVisible(!params.showAddEditModal)
                }
              />
            </View>
            <View style={styles.homeScreen.modalActionButtons}>
              <Button
                color={styles.colors.orange}
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
