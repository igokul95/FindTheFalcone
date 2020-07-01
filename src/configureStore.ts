import { applyMiddleware, createStore } from 'redux';
import thunk from 'redux-thunk';

import reducer from './reducers';
// import * as actions from "./actions";


const configureStore = () => {
  const store = createStore(reducer, applyMiddleware(thunk));
  return store;
};

export default configureStore();
