import { unMask } from 'react-native-mask-text';

export function getInitials(firstName, lastName) {
  const fistNamePart = firstName ? firstName[0] : '';
  const lastNamePart = lastName ? lastName[0] : '';
  return `${fistNamePart}${lastNamePart}`.toUpperCase();
}

export function isFirstNameValid(firstName) {
  return isNotEmpty(firstName);
}

export function isEmailValid(email) {
  return email.match(
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
  );
}

export function isPhoneNumberValid(phoneNumber) {
  return !phoneNumber || unmaskPhoneNumber(phoneNumber).length === 10;
}

export function unmaskPhoneNumber(phoneNumber) {
  return unMask(phoneNumber);
}

function isNotEmpty(string) {
  return string !== null && string.trim() !== '';
}
