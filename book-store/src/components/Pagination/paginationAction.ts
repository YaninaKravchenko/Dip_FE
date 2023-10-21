import { baseActionTypeWithPayload } from '../../types';
import { PostBook } from '../../types';

export enum actionTypesEnum {
    GET_COUNT = 'GET_COUNT',
    SET_PER_PAGE = 'SET_PER_PAGE',
    GET_PREV_NEXT_POST = 'GET_PREV_NEXT_POST ',
};

export interface IResponse {
    count: number,
    next: string,
    previous: string,
    results: PostBook[]
};

interface IPaginationActions {
    getCount: (response: IResponse) => baseActionTypeWithPayload<actionTypesEnum, IResponse>;
    setPerPage: (perPage:number) => baseActionTypeWithPayload<actionTypesEnum, number>;
    getPrevNextPost: (response: IResponse) => baseActionTypeWithPayload<actionTypesEnum, IResponse>;
};

export const paginationActions: IPaginationActions = {
    getCount: (response) => ({
        type: actionTypesEnum.GET_COUNT,
        payload: response,
    }),
    setPerPage: (perPage) => ({
        type: actionTypesEnum.SET_PER_PAGE,
        payload: perPage,
    }),
    getPrevNextPost: (response) => ({
        type: actionTypesEnum.GET_PREV_NEXT_POST,
        payload: response,
    })
};
