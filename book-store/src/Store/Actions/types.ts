export type baseActionType<T> = {
    type: T;
};

export type baseActionTypeWithPayload<T, P> = {
    type: T;
    payload: P;
};