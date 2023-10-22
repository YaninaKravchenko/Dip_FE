import { baseActionTypeWithPayload } from './types';

export enum actionTypes {
    ADD_ISBN13 = 'ADD_ISBN13',
}

interface IBooksActions {
    addISBN13: (isbn: string) => baseActionTypeWithPayload<actionTypes.ADD_ISBN13, string>;
}

export const booksActions: IBooksActions = {
    addISBN13: (isbn) => ({ type: actionTypes.ADD_ISBN13, payload: isbn }),
}
