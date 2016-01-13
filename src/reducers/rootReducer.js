import { combineReducers } from 'redux';
import annotations from './annotationsReducer';
import annotatorShown from './annotatorShownReducer';
import friends from './friendsReducer';

const rootReducer = combineReducers({
  annotations,
  annotatorShown,
  friends
})

export default rootReducer;
