export function toggleMyFeed(result) {
  return {
    type: 'TOGGLE_MY_FEED',
    result
  }
}

export function loadMyFeed() {
  return dispatch => {
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

function updateFeed(searchResult) {
  return {
    type: 'UPDATE_FEED',
    searchResult
  }
}

function restoreFeed() {
  return {
    type: 'RESTORE_FEED'
  }
}

export function searchFeed(query) {
  return (dispatch, getState) => {
    if (query === '') {
      dispatch(restoreFeed());
      return;
    }
    let { feedInfo } = getState().myFeed;
    let promises = feedInfo.slice().map(link => {
      return new Promise((resolve, reject) => {
        resolve(boyer_moore_horspool(link, query));
      });
    });
    Promise.all(promises).then(result => {
      dispatch(updateFeed(result));
    })
  }
}

function boyer_moore_horspool(link, needle) {
    const haystack = link.title.toLowerCase();
    var badMatchTable = {},
        maxOffset = (haystack.length - needle.length),
        last = (needle.length - 1),
        offset = 0,
        scan;
    var results = [];
    Array.prototype.forEach.call(needle, function (char, i) {
        badMatchTable[char] = last - i;
    });
    while (offset <= maxOffset) {
      for (scan=last; needle[scan] === haystack[scan+offset]; scan--) {
        if (scan === 0) {
          return link;
        }
      }
      offset += (badMatchTable[haystack[offset + last]] || last+1);
    }
}
