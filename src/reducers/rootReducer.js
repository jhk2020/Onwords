import { combineReducers } from 'redux';
import annotations from './annotationsReducer';
import annotatorShown from './annotatorShownReducer';
import friends from './friendsReducer';
import userInfo from './userInfoReducer';
import spotlight from './spotlightReducer';
import myFeed from './myFeedReducer';

const rootReducer = combineReducers({
  annotations,
  annotatorShown,
  myFeed,
  friends,
  userInfo,
  spotlight
});

export default rootReducer;
