import { baseActionTypeWithPayload } from '../Actions/types';
import { actionTypes } from '../Actions/userActions';

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
      case actionTypes.UPDATE_NAME:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          name: action.payload
        }
      };
    case actionTypes.UPDATE_PASSWORD:
      return {
        ...state,
        currentUser: {
          ...state.currentUser,
          password: action.payload
        }
      };
    default:
      return state;
  }
};

export default userReducer;
