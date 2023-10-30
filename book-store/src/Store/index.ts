import { applyMiddleware, combineReducers, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
import { searchReducer } from './Reducers/searchReducer';
import { myFavoritesReducers } from './Reducers/myFavoritesReducers';
import { cartReducer } from './Reducers/cartReducers';
import modalReducer from './Reducers/modalReducer';
import booksReducer from './Reducers/booksReducers';
import userReducer from './Reducers/userReducers';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  search: searchReducer,
  favorites: myFavoritesReducers,
  cart: cartReducer,
  modal: modalReducer,
  books: booksReducer,
  user: userReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)));
// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)));
// sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof rootReducer>;