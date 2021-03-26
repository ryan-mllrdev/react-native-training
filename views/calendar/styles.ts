/* eslint-disable prettier/prettier */
import {StyleSheet} from 'react-native';
import COLORS from '../shared/custom-colors';

const styles = StyleSheet.create({
  textExpired: {
    textDecorationLine: 'line-through',
    color: COLORS.white,
    textDecorationColor: COLORS.darkblue,
  },
  calendarTitleHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    color: COLORS.white,
    textAlign: 'center',
    fontFamily: 'sans-serif-thin',
    backgroundColor: COLORS.darkblue,
  },
});

export default styles;
