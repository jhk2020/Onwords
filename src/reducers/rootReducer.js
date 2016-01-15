import { combineReducers } from 'redux';
import annotations from './annotationsReducer';
import annotatorShown from './annotatorShownReducer';
import friends from './friendsReducer';
import userInfo from './userInfoReducer';
import spotlight from './spotlightReducer';

const rootReducer = combineReducers({
  annotations,
  annotatorShown,
  friends,
  userInfo,
  spotlight
});

export default rootReducer;
