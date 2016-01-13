export default function friends (state = [], action){
  switch (action.type) {
    case 'SORT_FRIENDS':
      const ownId = window.localStorage.getItem('user_id');
      let newState = state.slice().concat(action.friends);
      return newState;
    default:
      return state;
  }
}
