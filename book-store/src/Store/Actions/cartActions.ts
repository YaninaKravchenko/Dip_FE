import { baseActionTypeWithPayload } from './types';

export enum actionTypes {
    ADD_TO_CART = 'ADD_TO_CART',
    REMOVE_FROM_CART = 'REMOVE_FROM_CART',
};

interface ICartActions {
    addToCart: (book: any) => baseActionTypeWithPayload<actionTypes.ADD_TO_CART, any>;
    removeFromCart: (isbn13: string) => baseActionTypeWithPayload<actionTypes.REMOVE_FROM_CART, string>;
}

export const cartActions: ICartActions  = {
    addToCart: (book) => ({ type: actionTypes.ADD_TO_CART, payload: book }),
    removeFromCart: (isbn13) => ({ type:  actionTypes.REMOVE_FROM_CART, payload: isbn13 })
}
