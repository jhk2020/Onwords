const initialState = {
  shown: false,
  feedInfo: [],
  shownFeed: []
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
        feedInfo: action.result.slice(),
        shownFeed: action.result.slice()
      });
    case 'UPDATE_FEED':
      return Object.assign({}, state, {
        shownFeed: action.searchResult.filter(link => link)
      });
    case 'RESTORE_FEED':
      return Object.assign({}, state, {
        shownFeed: state.feedInfo.slice()
      })
    default:
      return state;
  }
}
