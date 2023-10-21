export type PostBook = {
    title: string;
    subtitle: string;
    authors: string;
    publisher: string;
    language: string;
    isbn10: string;
    isbn13: string;
    pages: string;
    year: string;
    rating: string;
    desc: string;
    price: string;
    image: string;
    url: string;
    isFavorite: boolean;
};

export interface ApiResponse {
    error: string;
    total: string;
    page?:  string;
    books: PostBook[];
};

export interface BookResponse {
    error: string;
    title: string;
    subtitle: string;
    authors: string;
    publisher: string;
    isbn10: string;
    isbn13: string;
    pages: string;
    year: string;
    rating: string;
    desc: string;
    price: string;
    image: string;
    url: string;
    pdf: {
        [key: string]: string;
    };
}

// export type UserData = {
//     userName?: string;
//     username?: string;
//     email: string;
//     password?: string;
// };

// export interface PostData {
//     title: string;
//     lesson_num: string;
//     description: string;
//     text: string;
//     image: string;
//   }

export type baseActionType<T> = {
    type: T;
};

export type baseActionTypeWithPayload<T, P> = {
    type: T;
    payload: P;
};