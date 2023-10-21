import { baseActionTypeWithPayload } from '../Actions/types';
import { actionTypes } from '../Actions/searchActions';
import { ApiResponse } from '../../types';

type defaultStateType = {
  searchText: string;
  filteredPosts: ApiResponse;
};

const defaultState: defaultStateType  = {
    searchText: '',
    filteredPosts: {
      error: '0',
      total: '0',
      page: '0',
      books: []
    }
}

export const searchReducer = (
  state = defaultState,
  action: baseActionTypeWithPayload<actionTypes, ApiResponse>
) => {
  switch (action.type) {
      case actionTypes.SET_SEARCH_TEXT:
          return {
              ...state,
              searchText: action.payload,
          };
      // case actionTypes.SET_FILTERED_POSTS:
      //     // Строка для поиска
      //     const searchText = action.payload;

      //     // Фильтрация книг на основе строки поиска
      //     const filteredBooks = state.filteredPosts.books.filter(book => 
      //         book.title.toLowerCase().includes(searchText)
      //     );

      //     return {
      //         ...state,
      //         filteredPosts: {
      //             ...state.filteredPosts,
      //             books: filteredBooks
      //         }
      //     };

      case actionTypes.SET_FILTERED_POSTS:
    return {
        ...state,
        filteredPosts: {
          ...state.filteredPosts,
          ...action.payload
        }
    };


      default:
          return state;
  }
};

export default searchReducer;
  