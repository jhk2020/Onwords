export function toggleMyFeed(result) {
  return {
    type: 'TOGGLE_MY_FEED',
    result
  }
}

export function loadMyFeed() {
  return (dispatch) => {
    chrome.storage.sync.get('user',function(data){
      const completeUri = 'http://localhost:9000/api/personalfeed?user_id=' + data.user.id;
      $.get(completeUri, function(result) {
        dispatch(loadMyFeedSuccess(result));
      });
    })
  }
}

function loadMyFeedSuccess(result) {
  return {
    type: 'LOAD_MY_FEED_SUCCESS',
    result
  }
}
