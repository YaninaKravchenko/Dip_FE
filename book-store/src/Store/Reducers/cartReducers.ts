import { baseActionTypeWithPayload } from '../Actions/types';
import { actionTypes } from '../Actions/cartActions';
import { PostBook } from '../../types';
export interface CartItem {
    details: PostBook;
    count: number;
}

interface CartState {
    items: CartItem[];
    totalCost: number;

}



const defaultState: CartState = {
    items: [],
    totalCost: 0
};
// interface CartState {
//     items: PostBook[];
//     totalCost: number;
// }
export const cartReducer = (state = defaultState, action: baseActionTypeWithPayload<actionTypes, any>) => {
    switch (action.type) {
        // case actionTypes.ADD_TO_CART:
        //     const priceToAdd = action.payload && action.payload.price 
        //     ? parseFloat(action.payload.price.replace('$', '').replace(',', ''))
        //     : 0;

        // const newTotalAfterAdd = parseFloat((state.totalCost + priceToAdd).toFixed(2));
        case actionTypes.ADD_TO_CART:
            console.log('Received addToCart action with payload:', action.payload);
            if (!action.payload || !action.payload.isbn13) {
                return state;
              }
    //const existingItem = state.items.find(item => item.details.isbn13 === action.payload.isbn13);
    const existingItem = state.items.find(item => item.details && item.details.isbn13 === action.payload.isbn13);

    console.log(existingItem);

        let priceToAdd = 0;
            if (action.payload && action.payload.price) {
                priceToAdd = parseFloat(action.payload.price.replace('$', '').replace(',', ''));
        }

  //const priceToAdd = parseFloat(action.payload.price.replace('$', '').replace(',', ''));
       
        if (existingItem) {
            const updatedItems = state.items.map(item => item.details && 
                item.details.isbn13 === action.payload.isbn13
                ? { ...item, count: item.count + 1 }
                : item
        );
       
        const newTotalAfterAdd = parseFloat((state.totalCost + priceToAdd).toFixed(2));

        return {
            ...state,
            items: updatedItems,
            totalCost: newTotalAfterAdd
        };
    } else {
        //const priceToAdd = parseFloat(action.payload.price.replace('$', '').replace(',', ''));
        const newTotalAfterAdd = parseFloat((state.totalCost + priceToAdd).toFixed(2));

        return {
            ...state,
            items: [...state.items, { details: action.payload, count: 1 }],
            totalCost: newTotalAfterAdd
        };
    }

  
        case actionTypes.REMOVE_FROM_CART:
            
           const removedBook = state.items.find(
                (item) => item.details && item.details.isbn13 === action.payload
            );
            
            // const priceToSubtract = removedBook 
            //     ? parseFloat(removedBook.details.price.replace('$', '').replace(',', ''))
            //     : 0;
            let priceToSubtract = 0;
            if (removedBook && removedBook.details && removedBook.details.price) {
                priceToSubtract = parseFloat(removedBook.details.price.replace('$', '').replace(',', ''));
            }
            const newItems = state.items.filter(
                (item) => item.details && item.details.isbn13 !== action.payload
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

        case actionTypes.SET_CART_ITEMS:

            return {
                ...state,
                items: action.payload
            };
        case actionTypes.SET_TOTAL_COST:
            
            return {
                ...state,
                totalCost: action.payload
            };
        case actionTypes.CLEAR_CART:
            return {
                ...state,
                items: [],
                totalCost: 0
            };
            case actionTypes.INCREMENT_BOOK_COUNT:
                const incrementedBook = state.items.find(item => item.details &&  item.details.isbn13 === action.payload);
                if (!incrementedBook) return state; 
                const priceToAddIncrement = incrementedBook ? parseFloat(incrementedBook.details.price.replace('$', '').replace(',', '')) : 0;
                const incrementedItems = state.items.map(item => item.details && item.details.isbn13 === action.payload ? { ...item, count: item.count + 1 } : item);
                
                return {
                    ...state,
                    items: incrementedItems,
                    totalCost: parseFloat((state.totalCost + priceToAddIncrement).toFixed(2))
                };
        
            case actionTypes.DECREMENT_BOOK_COUNT:
                const decrementedBook = state.items.find(item => item.details && item.details.isbn13 === action.payload);
                if (!decrementedBook) return state; 
                const priceToSubtractDecrement = decrementedBook && decrementedBook.count > 1 ? parseFloat(decrementedBook.details.price.replace('$', '').replace(',', '')) : 0;
                const decrementedItems = state.items.map(item => item.details && item.details.isbn13 === action.payload && item.count > 1 ? { ...item, count: item.count - 1 } : item);
                
                return {
                    ...state,
                    items: decrementedItems,
                    totalCost: parseFloat((state.totalCost - priceToSubtractDecrement).toFixed(2))
                };
        default:
            return state;
    }
};
