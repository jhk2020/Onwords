import { combineReducers } from 'redux';
import annotations from './annotationsReducer';

const rootReducer = combineReducers({
  annotations
})

export default rootReducer;
