import { baseActionType, baseActionTypeWithPayload } from './types';
import { PostBook } from '../../types';

export enum actionTypes {
    SET_FAVORITES = 'SET_FAVORITES',
    ADD_TO_FAVORITE ='ADD_TO_FAVORITE',
    REMOVE_FROM_FAVORITE = 'REMOVE_FROM_FAVORITE',
    CLEAR_FAVORITES = 'CLEAR_FAVORITES',
}

interface IPostsActions {
    setFavorites: (favoriteBooks: PostBook[]) => baseActionTypeWithPayload<actionTypes.SET_FAVORITES, PostBook[]>;
    addToFavorite: (post: any) => baseActionTypeWithPayload<actionTypes.ADD_TO_FAVORITE, any>;
    removeFromFavorite: (isbn13: string) => baseActionTypeWithPayload<actionTypes.REMOVE_FROM_FAVORITE, string>;
    clearFavorites: () => baseActionType<actionTypes.CLEAR_FAVORITES>;
}

export const myFavoritesActions: IPostsActions  = {
    setFavorites: (favoriteBooks) => ({ type: actionTypes.SET_FAVORITES, payload: favoriteBooks }),
    addToFavorite: (post) => ({ type: actionTypes.ADD_TO_FAVORITE, payload: post }),
    removeFromFavorite: (isbn13) => ({ type: actionTypes.REMOVE_FROM_FAVORITE, payload: isbn13 }),
    clearFavorites: () => ({type: actionTypes.CLEAR_FAVORITES}),
}