import { baseActionType } from './../../types';
import { baseActionTypeWithPayload } from './types';
import { PostBook } from './../../types';

export enum actionTypes {
    ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART',
    SET_CART_ITEMS = 'SET_CART_ITEMS',
    SET_TOTAL_COST = 'SET_TOTAL_COST',
    CLEAR_CART = 'CLEAR_CART',
    INCREMENT_BOOK_COUNT = 'INCREMENT_BOOK_COUNT',
    DECREMENT_BOOK_COUNT = 'DECREMENT_BOOK_COUNT',
};

interface ICartActions {
    addToCart: (book: PostBook) => baseActionTypeWithPayload<actionTypes.ADD_TO_CART, PostBook>;
    removeFromCart: (isbn13: string) => baseActionTypeWithPayload<actionTypes.REMOVE_FROM_CART, string>;
    setCartItems: (cartItems: string[]) => | baseActionTypeWithPayload<actionTypes.SET_CART_ITEMS, string>
    | baseActionTypeWithPayload<actionTypes.SET_CART_ITEMS, string[]>;
    setTotalCost: (cost: number) => baseActionTypeWithPayload<actionTypes.SET_TOTAL_COST, number>;
    clearCart: () => baseActionType<actionTypes.CLEAR_CART>;
    incrementBookCount: (isbn13: string) => baseActionTypeWithPayload<actionTypes.INCREMENT_BOOK_COUNT, string>;
    decrementBookCount: (isbn13: string) => baseActionTypeWithPayload<actionTypes.DECREMENT_BOOK_COUNT, string>;

}

export const cartActions: ICartActions  = {
    addToCart: (book) => ({ type: actionTypes.ADD_TO_CART, payload: book }),
    removeFromCart: (isbn13) => ({ type:  actionTypes.REMOVE_FROM_CART, payload: isbn13 }),
    setCartItems: (cartItems) => ({ type: actionTypes.SET_CART_ITEMS, payload: cartItems }),
    setTotalCost: (cost) => ({ type: actionTypes.SET_TOTAL_COST, payload: cost }),
    clearCart: () => ({ type: actionTypes.CLEAR_CART }),
    incrementBookCount: (isbn13) => ({ type: actionTypes.INCREMENT_BOOK_COUNT, payload: isbn13 }),
    decrementBookCount: (isbn13) => ({ type: actionTypes.DECREMENT_BOOK_COUNT, payload: isbn13 }),
}
