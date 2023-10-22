import { baseActionTypeWithPayload } from '../Actions/types';
import { actionTypes } from '../Actions/booksActions';

interface IBooksState {
    allIsbn13s: string[];
}

const defaultState: IBooksState = {
    allIsbn13s: [],
};

type BookActions = baseActionTypeWithPayload<actionTypes, string>;

const booksReducer = (state = defaultState, action: BookActions): IBooksState => {
    switch (action.type) {
        case actionTypes.ADD_ISBN13:
            return { ...state, allIsbn13s: [...state.allIsbn13s, action.payload] };
        default:
            return state;
    }
};

export default booksReducer;
