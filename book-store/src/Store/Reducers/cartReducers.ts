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

        const newTotalAfterAdd = parseFloat((state.totalCost + priceToAdd).toFixed(2));

        return {
            ...state,
            items: [...state.items, action.payload],
            totalCost: newTotalAfterAdd
        };

        case actionTypes.REMOVE_FROM_CART:
            
           const removedBook = state.items.find(
                (item) => item.isbn13 === action.payload
            );
            
            const priceToSubtract = removedBook 
                ? parseFloat(removedBook.price.replace('$', '').replace(',', ''))
                : 0;

            const newItems = state.items.filter(
                (item) => item.isbn13 !== action.payload
            );

            let newTotalCost = state.totalCost - priceToSubtract;
            if (newItems.length === 0) {
                newTotalCost = 0;
            }
        
            return {
                ...state,
                items: newItems,
                totalCost: parseFloat(newTotalCost.toFixed(2))
            };

        default:
            return state;
    }
};
