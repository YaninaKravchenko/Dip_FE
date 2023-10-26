import { baseActionTypeWithPayload } from '../Actions/types';
import { actionTypes } from '../Actions/userActions';
import { ApiResponse } from '../../types';

type defaultStateType = {
    currentUser: any | null;
};

const defaultState: defaultStateType = {
    currentUser: null,
};

export const userReducer = (
    state = defaultState,
    action: baseActionTypeWithPayload<actionTypes, any>) => {
  switch (action.type) {
    case actionTypes.SET_CURRENT_USER:
      return {
        ...state,
        currentUser: action.payload,
      };
    default:
      return state;
  }
};

export default userReducer;
