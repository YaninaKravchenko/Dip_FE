import { baseActionTypeWithPayload } from './types';

export enum actionTypes {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
  UPDATE_NAME = 'UPDATE_NAME',
  UPDATE_PASSWORD = 'UPDATE_PASSWORD',
}

interface ISetCurrentUserAction {
  setCurrentUser: (
    userData: any
  ) => baseActionTypeWithPayload<actionTypes.SET_CURRENT_USER, any>;
  updateName: (
    name: string
  ) => baseActionTypeWithPayload<actionTypes.UPDATE_NAME, string>;
  updatePassword: (
    password: string
  ) => baseActionTypeWithPayload<actionTypes.UPDATE_PASSWORD, string>;
}

export const userAction: ISetCurrentUserAction = {
  setCurrentUser: (userData) => ({
    type: actionTypes.SET_CURRENT_USER,
    payload: userData,
  }),
  updateName: (name: string) => ({
    type: actionTypes.UPDATE_NAME,
    payload: name,
  }),
  updatePassword: (password: string) => ({
    type: actionTypes.UPDATE_PASSWORD,
    payload: password,
  }),
};
