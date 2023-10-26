import { baseActionTypeWithPayload } from './types';

export enum actionTypes {
  SET_CURRENT_USER = 'SET_CURRENT_USER',
}

interface ISetCurrentUserAction {
  setCurrentUser: (
    userData: any
  ) => baseActionTypeWithPayload<actionTypes.SET_CURRENT_USER, any>;
}

export const userAction: ISetCurrentUserAction = {
  setCurrentUser: (userData) => ({
    type: actionTypes.SET_CURRENT_USER,
    payload: userData,
  }),
};
