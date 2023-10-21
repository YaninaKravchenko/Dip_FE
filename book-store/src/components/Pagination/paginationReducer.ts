import { baseActionTypeWithPayload } from '../../types';
import { actionTypesEnum } from '../Pagination/paginationAction';
import { IResponse } from '../Pagination/paginationAction';

type defaultStateType = {
    postsCount: number,
    postsPerPage: number,
    pagesNumber: number,
    prevPage: string,
    nextPage: string,
    currentPage: number,
};

const defaultState: defaultStateType = {
    postsCount: 0,
    postsPerPage: 4,
    pagesNumber: 0,
    prevPage: '',
    nextPage: '',
    currentPage: 1,
};

export const paginationReducer = (
    state = defaultState,
    action: baseActionTypeWithPayload<actionTypesEnum, IResponse | number>): defaultStateType => {  console.log(action);
    switch(action.type) {
        case actionTypesEnum.GET_COUNT:

            if(typeof action.payload !== 'number') {

                return { ...state, postsCount: action.payload.count};
            };

            return state;
        case actionTypesEnum.SET_PER_PAGE:
            if(typeof action.payload === 'number') {
                return {...state, postsPerPage: action.payload};
            };

            return state;
        case actionTypesEnum.GET_PREV_NEXT_POST:
            if(typeof action.payload !== 'number') {
                return {...state, prevPage: action.payload.previous, nextPage: action.payload.next,};
            };

            return state;
        default:
            return state;
    }
};