import { baseActionType } from '../Actions/types';
import { actionTypes } from '../Actions/modalActions';
//import { PostBook } from '../../types';


type ModalState = {
    isCartModalVisible: boolean;
};

const defaultState: ModalState = {
    isCartModalVisible: false,
};
  
  const modalReducer = (state = defaultState,  action: baseActionType<actionTypes>) => {
    switch (action.type) {
      case 'TOGGLE_CART_MODAL':
        console.log("TOGGLE_CART_MODAL action handled!"); 
        return {
          ...state,
          isCartModalVisible: !state.isCartModalVisible,
        };
      default:
        return state;
    }
  };
  
  export default modalReducer;
  