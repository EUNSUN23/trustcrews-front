export const PASSWORD_REGEX: RegExp =
  /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{6,12}$/;

export const NICKNAME_REGEX: RegExp = /^[a-zA-Z0-9]{6,10}$/;
