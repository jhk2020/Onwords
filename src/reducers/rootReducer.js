import { combineReducers } from 'redux';
import annotations from './annotationsReducer';
import annotatorShown from './annotatorShownReducer';

const rootReducer = combineReducers({
  annotations,
  annotatorShown
})

export default rootReducer;
