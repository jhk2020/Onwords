import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/rootReducer';

export default function configureStore() {
  const createStoreWithThunk = applyMiddleware(thunk)(createStore);
  const store = createStoreWithThunk(rootReducer);

  return store;
}