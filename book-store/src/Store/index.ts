import { applyMiddleware, combineReducers, createStore } from 'redux';
// import { themeReducer } from './Reducers/themeReducer';
// import { counterReducer } from './Reducers/counterReducer';
// import { selectedPostReducer } from './Reducers/selectedPostReducer';
// import { postsReducer } from './Reducers/postsReducer';
// import { tabsReducer } from './Reducers/tabsReducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';
import createSagaMiddleware from 'redux-saga';
// import { rootWatcher } from './sagas';
// import { signUpReducer } from './Reducers/signUpReducer';
// import { loginReducer } from './Reducers/loginReducer';
// import { paginationReducer } from './Reducers/paginationReducer';
import { searchReducer } from './Reducers/searchReducer';
import { myFavoritesReducers } from './Reducers/myFavoritesReducers';
import { cartReducer } from './Reducers/cartReducers';
import modalReducer from './Reducers/modalReducer';

const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  // theme: themeReducer,
  // counter: counterReducer,
  // selectedPostPopup: selectedPostReducer,
  // posts: postsReducer,
  // tabs: tabsReducer,
  // signUp: signUpReducer,
  // session: loginReducer,
  // pagination: paginationReducer,
  search: searchReducer,
  favorites: myFavoritesReducers,
  cart: cartReducer,
  modal: modalReducer,
});

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)));
// export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk, sagaMiddleware)));
// sagaMiddleware.run(rootWatcher);

export type RootState = ReturnType<typeof rootReducer>;