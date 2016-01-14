export default function friends(state = {}, action){
  switch (action.type) {
    case 'FETCH_FRIENDS':
    console.log(action.friends)
      let newState = Object.assign({}, state);
      for (var i = 0; i < action.friends.length; i++) {
        newState[action.friends[i].id] = {
          shown: false,
          pic: action.friends[i].pic_url,
          name: action.friends[i].full_name
        }
      }
      console.log(newState)
      return newState;
    default:
      return state;
  }
}



// export function shownFriends(state = [ownId], action) {
//   switch (action.type) {
//     case 'TOGGLE_FRIEND':
//       let newState = state.slice().concat([action.friend]);
//     default:
//       return state;
//   }
// }
