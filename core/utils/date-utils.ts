/* eslint-disable prettier/prettier */
import moment from 'moment';

const equals = (
  date1: Date,
  date2: Date,
  datePart: 'day' | 'month' | 'year' | 'minute',
) => {
  return moment(date1).isSame(moment(date2), datePart);
};

const lessThan = (
  date1: Date,
  date2: Date,
  datePart: 'day' | 'month' | 'year' | 'minute',
) => {
  return moment(date1).isBefore(moment(date2), datePart);
};

const greaterThan = (
  date1: Date,
  date2: Date,
  datePart: 'day' | 'month' | 'year' | 'minute',
) => {
  return moment(date1).isAfter(moment(date2), datePart);
};

const greaterThanOrEqual = (
  date1: Date,
  date2: Date,
  datePart: 'day' | 'month' | 'year' | 'minute',
) => {
  return moment(date1).isSameOrAfter(moment(date2), datePart);
};

const lessThanOrEqual = (
  date1: Date,
  date2: Date,
  datePart: 'day' | 'month' | 'year' | 'minute',
) => {
  return moment(date1).isSameOrBefore(moment(date2), datePart);
};

const dateDiff = (
  date1: Date,
  date2: Date,
  datePart: 'day' | 'month' | 'year' | 'minute',
) => {
  return moment(date1).diff(moment(date2), datePart);
};

export default {
  equals,
  lessThan,
  greaterThan,
  greaterThanOrEqual,
  lessThanOrEqual,
  dateDiff,
};
