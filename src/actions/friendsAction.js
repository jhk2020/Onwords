export function toggleFriend(friend) {
  return {
    type: 'TOGGLE_FRIEND',
    friend
  }
}

export function fetchFriends(friends) {
  return {
    type: 'FETCH_FRIENDS',
    friends
  }
}

export function fetchFriendsAsync() {
  return (dispatch) => {
    var firstUserId = window.localStorage.getItem('user_id');
    var uri = window.location.href.split("?")[0];
    if (uri.substring(uri.length-11) === 'onwords1991') {
      uri = uri.substring(0, uri.length-13);
    } else {
      uri = uri;
    }

    $.get('https://test2server.herokuapp.com/api/users/uri/annotations', {uri: uri, user_id: firstUserId})
      .done(function(friends) {
        dispatch(fetchFriends(friends));
      });
  }
}
