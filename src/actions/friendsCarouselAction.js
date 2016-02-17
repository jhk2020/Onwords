export default function toggleFriendAnnotations(friendId) {
  return (dispatch, getState) => {
    const { friends } = getState();
    if (friends[friendId].shown) {
      dispatch(toggleOffFriendAnnotations(friendId));
    } else {
      Promise.resolve(dispatch(toggleOnFriendAnnotationsAsync(friendId)))
        .then(function() {
          var ev = new CustomEvent('getFriendAnnotations', {detail: {userId: friendId}});
          document.dispatchEvent(ev);
        })
    }
  }
}

function toggleOnFriendAnnotations(friendId) {
  return {
    type: 'TOGGLE_ON_FRIEND_ANNOTATIONS',
    friendId
  }
}

function toggleOffFriendAnnotations(friendId) {
  return {
    type: 'TOGGLE_OFF_FRIEND_ANNOTATIONS',
    friendId
  }
}

function toggleOnFriendAnnotationsAsync(friendId) {
  return (dispatch) => {
    dispatch(toggleOnFriendAnnotations(friendId));
  }
}
