import { ApiResponse } from '../../types';
import { baseActionTypeWithPayload } from './types';

export enum actionTypes {
    SET_SEARCH_TEXT = 'SET_SEARCH_TEXT',
    SET_FILTERED_POSTS = 'SET_FILTERED_POSTS',
}

interface ISearch {
    setSearchText: (searchText: string) => baseActionTypeWithPayload<actionTypes.SET_SEARCH_TEXT, string>;
    setFilteredPosts: (filteredPosts: ApiResponse) => baseActionTypeWithPayload<actionTypes.SET_FILTERED_POSTS, ApiResponse>;
}


export const searchActions: ISearch = {
    setSearchText: (searchText) => ({ type: actionTypes.SET_SEARCH_TEXT, payload: searchText }),
    setFilteredPosts: (filteredPosts) => ({ type: actionTypes.SET_FILTERED_POSTS, payload: filteredPosts }),
};
