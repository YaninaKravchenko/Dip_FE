import { baseActionTypeWithPayload } from './types';

export enum actionTypes {
    ADD_ISBN13 = 'ADD_ISBN13',
    SET_CART_ITEMS = 'SET_CART_ITEMS',
}

interface IBooksActions {
    addISBN13: (isbn: string) => baseActionTypeWithPayload<actionTypes.ADD_ISBN13, string>;
    setCartItems: (cartItems: string[]) => | baseActionTypeWithPayload<actionTypes.SET_CART_ITEMS, string>
    | baseActionTypeWithPayload<actionTypes.SET_CART_ITEMS, string[]>;
}

export const booksActions: IBooksActions = {
    addISBN13: (isbn) => ({ type: actionTypes.ADD_ISBN13, payload: isbn }),
    setCartItems: (cartItems) => ({ type: actionTypes.SET_CART_ITEMS, payload: cartItems }),
}
