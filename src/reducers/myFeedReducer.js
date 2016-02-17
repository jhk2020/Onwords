const initialState = {
  shown: false,
  feedInfo: []
}

export default function myFeed (state = initialState, action) {
  switch (action.type) {
    case 'TOGGLE_MY_FEED':
      if (action.result === false) {
        return Object.assign({}, state, {
          shown: action.result
        });
      } else {
        return Object.assign({}, state, {
          shown: !state.shown
        });
      }
    case 'LOAD_MY_FEED_SUCCESS':
      return Object.assign({}, state, {
        feedInfo: action.result
      });
    default:
      return state;
  }
}
