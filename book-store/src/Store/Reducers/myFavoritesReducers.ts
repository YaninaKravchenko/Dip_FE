import { baseActionTypeWithPayload } from '../Actions/types';
import { actionTypes } from '../Actions/myFavoritesActions';
import { PostBook } from '../../types';

type defaultStateType = Record<'favorite', PostBook[]>;

const defaultState: defaultStateType  = {
    favorite: [],
};



export const myFavoritesReducers = (
    state = defaultState,
    action: baseActionTypeWithPayload<actionTypes, any>
) => {
    switch (action.type) {
        case actionTypes.ADD_TO_FAVORITE: {
            console.log("Action received:", action);
            const postExistsInFavorites = state.favorite.some(post => post.isbn13 === action.payload);
            
            if (postExistsInFavorites) {
                // Удаляем пост из избранного
                const updatedFavorite = state.favorite.filter(post => post.isbn13 !== action.payload);
                return {
                    ...state,
                    favorite: updatedFavorite
                };
            } else {
                // Добавляем пост в избранное
                // Здесь предполагается, что action.payload - это объект типа PostBook
                const updatedFavorite = [...state.favorite, action.payload];
                return {
                    ...state,
                    favorite: updatedFavorite
                };
            }
        }
        case actionTypes.REMOVE_FROM_FAVORITE: {
            const updatedFavorite = state.favorite.filter(post => post.isbn13 !== action.payload);
            return {
                ...state,
                favorite: updatedFavorite
            };
        }
        case actionTypes.SET_FAVORITES: {
            return {
                ...state,
                favorite: action.payload
            };
        }
        case actionTypes.CLEAR_FAVORITES:
            return {
                ...state,
                favorite: []
            };

        default:
            return state;
    }
};
