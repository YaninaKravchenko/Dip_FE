import { baseActionType } from './../../types';
import { baseActionTypeWithPayload } from './types';

export enum actionTypes {
    ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART',
    SET_CART_ITEMS = 'SET_CART_ITEMS',
    SET_TOTAL_COST = 'SET_TOTAL_COST',
    CLEAR_CART = 'CLEAR_CART',
};

interface ICartActions {
    addToCart: (book: any) => baseActionTypeWithPayload<actionTypes.ADD_TO_CART, any>;
    removeFromCart: (isbn13: string) => baseActionTypeWithPayload<actionTypes.REMOVE_FROM_CART, string>;
    setCartItems: (cartItems: string[]) => | baseActionTypeWithPayload<actionTypes.SET_CART_ITEMS, string>
    | baseActionTypeWithPayload<actionTypes.SET_CART_ITEMS, string[]>;
    setTotalCost: (cost: number) => baseActionTypeWithPayload<actionTypes.SET_TOTAL_COST, number>;
    clearCart: () => baseActionType<actionTypes.CLEAR_CART>;

}

export const cartActions: ICartActions  = {
    addToCart: (book) => ({ type: actionTypes.ADD_TO_CART, payload: book }),
    removeFromCart: (isbn13) => ({ type:  actionTypes.REMOVE_FROM_CART, payload: isbn13 }),
    setCartItems: (cartItems) => ({ type: actionTypes.SET_CART_ITEMS, payload: cartItems }),
    setTotalCost: (cost) => ({ type: actionTypes.SET_TOTAL_COST, payload: cost }),
    clearCart: () => ({ type: actionTypes.CLEAR_CART })
}
