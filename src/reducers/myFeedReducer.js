const initialState = {
  shown: false
}

export default function myFeed (state = initialState, action) {
  switch (action.type) {
    case 'SHOW_MY_FEED':
      return Object.assign({}, state, {
        shown: !state.shown
      });
    default:
      return state;
  }
}
