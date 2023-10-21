import { baseActionType } from './types';

export enum actionTypes {
    TOGGLE_CART_MODAL = 'TOGGLE_CART_MODAL',
   
};

interface IModalActions {
    toggleCartModal: () => baseActionType<actionTypes.TOGGLE_CART_MODAL>;
}

export const modalActions: IModalActions  = {
    toggleCartModal: () => {
    console.log("toggleCartModal action created!"); 
    return { type: actionTypes.TOGGLE_CART_MODAL};
}
}


//toggleCartModal: () => ({ type: actionTypes.TOGGLE_CART_MODAL}),