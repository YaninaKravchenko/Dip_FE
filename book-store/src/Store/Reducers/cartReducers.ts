import { baseActionTypeWithPayload } from '../Actions/types';
import { actionTypes } from '../Actions/cartActions';
import { PostBook } from '../../types';

interface CartState {
    items: PostBook[];
    totalCost: number;
}

const defaultState: CartState = {
    items: [],
    totalCost: 0
};

export const cartReducer = (state = defaultState, action: baseActionTypeWithPayload<actionTypes, any>) => {
    switch (action.type) {
        case actionTypes.ADD_TO_CART:
            const priceToAdd = action.payload && action.payload.price 
    ? parseFloat(action.payload.price.replace('$', '').replace(',', ''))
    : 0;


            return {
                ...state,
                items: [...state.items, action.payload],
                totalCost: state.totalCost + priceToAdd
            };
        case actionTypes.REMOVE_FROM_CART:
            const newItems = state.items.filter(
                (item) => item.isbn13 !== action.payload
            );
            const removedBook = state.items.find(
                (item) => item.isbn13 === action.payload
            );
            const priceToSubtract = removedBook ? parseFloat(removedBook.price) : 0;

          
            
            return {
                ...state,
                items: newItems,
                totalCost: state.totalCost - priceToSubtract
            };
        default:
            return state;
    }
};
