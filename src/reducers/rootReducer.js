import { combineReducers } from 'redux';
import annotations from './annotationsReducer';
import annotatorShown from './annotatorShownReducer';
import friends from './friendsReducer';
import userInfo from './userInfoReducer';

const rootReducer = combineReducers({
  annotations,
  annotatorShown,
  friends,
  userInfo
});

export default rootReducer;
