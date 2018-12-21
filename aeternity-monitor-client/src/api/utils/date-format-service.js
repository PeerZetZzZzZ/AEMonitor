/* eslint-disable import/prefer-default-export,arrow-body-style */
import moment from 'moment/min/moment.min';

export const formatDateToDayMonthYear = (date) => {
  return moment(date).format('DD-MM-YYYY');
};

export const formatDateToShortReadableFormat = (date) => {
  return moment(date).format('HH:mm:ss MM-DD');
};

export const formatDateToShortReadableFormatHours = (date) => {
  return moment(date).format('MM-DD HH:mm');
};

export const formatDateToShortReadableWithYearFormat = (date) => {
  return moment(date).format('MM-DD-YYYY, HH:mm:ss ');
};
export const formatDateToFullReadableFormat = (date) => {
  return new Date(date).toLocaleDateString('EN', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric',
  });
};
