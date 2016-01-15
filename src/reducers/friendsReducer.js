export default function friends(state = {}, action){
  switch (action.type) {
    case 'FETCH_FRIENDS':
      let newState = Object.assign({}, state);
      for (var i = 0; i < action.friends.length; i++) {
        newState[action.friends[i].id] = {
          shown: false,
          pic: action.friends[i].pic_url,
          name: action.friends[i].full_name
        }
      }
      return newState;

    case 'TOGGLE_ON_FRIEND_ANNOTATIONS':
      let newFriends = Object.assign({}, state);
      newFriends[action.friendId].shown = true;
      return newFriends;

    default:
      return state;
  }
}
