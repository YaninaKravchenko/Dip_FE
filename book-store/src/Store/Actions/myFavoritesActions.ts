import { baseActionTypeWithPayload } from './types';

export enum actionTypes {
    //SET_POSTS = 'SET_POST',
    ADD_TO_FAVORITE ='ADD_TO_FAVORITE',
    REMOVE_FROM_FAVORITE = 'REMOVE_FROM_FAVORITE',
}

interface IPostsActions {
   // setPosts: (posts: any[]) => baseActionTypeWithPayload<actionTypes.SET_POSTS, any[]>;
    addToFavorite: (post: any) => baseActionTypeWithPayload<actionTypes.ADD_TO_FAVORITE, any>;
    removeFromFavorite: (isbn13: string) => baseActionTypeWithPayload<actionTypes.REMOVE_FROM_FAVORITE, string>;

}

export const myFavoritesActions: IPostsActions  = {
    //setPosts: (posts) => ({ type: actionTypes.SET_POSTS, payload: posts }),
    addToFavorite: (post) => ({ type: actionTypes.ADD_TO_FAVORITE, payload: post }),
    removeFromFavorite: (isbn13) => ({ type: actionTypes.REMOVE_FROM_FAVORITE, payload: isbn13 }),
}