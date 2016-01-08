// Background page that runs at initialization

var fetchToken = function() {
  var access_token;
  var clientID = '';
  var redirectUri = 'https://' + chrome.runtime.id + '.chromiumapp.org/provider_cb';
  var options = {
    'interactive': true,
    url: 'https://www.facebook.com/dialog/oauth?client_id=' + clientID +
         '&response_type=token&access_type=online&redirect_uri=' + encodeURIComponent(redirectUri) +
         '&scope=email'
  };

  chrome.identity.launchWebAuthFlow(options, function(redirectUri) {
    if (chrome.runtime.lastError) {
      console.error(chrome.runtime.lastError);
      return;
    }

    var string = redirectUri.slice(redirectUri.indexOf('#')+1);
    var pairs = string.split('=');
    var token = pairs[1].split('&');
    var values = {};
    values[pairs[0]] = token[0];
    if (values.hasOwnProperty('access_token')) {
      access_token = values['access_token'];
      fetchFbProfile(access_token);
    }

    // Set FB access token in chrome storage (sync)
    chrome.storage.sync.set({'access_token': access_token});
  });
};

var fetchFbProfile = function(accessToken) {
  var xhr = new XMLHttpRequest();
  var urlPrefix = 'https://graph.facebook.com/v2.5/me';
  var urlFields = '?fields=id,name,email,picture.width(700).height(700)';
  var urlSignature = '&access_token=' + accessToken;
  var url = urlPrefix + urlFields + urlSignature;
  xhr.open('GET', url, true);
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4) {
      var resp = JSON.parse(xhr.responseText);
      var profile = {};
      profile.facebook_id = resp.id;
      profile.full_name = resp.name;
      profile.pic_url = resp.picture.data.url;
      profile.email = resp.email;
      sendFbProfile(profile);
    }
  };
  xhr.send();
};

var sendFbProfile = function(data) {
  var xhr = new XMLHttpRequest();
  var url = 'https://test2server.herokuapp.com/api/users';
  xhr.open('POST', url, true);
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.onreadystatechange = function() {
    if (xhr.readyState === 4 && xhr.status === 200) {
      var resp = JSON.parse(xhr.responseText);
      var user = {
        id: resp.user_id,
        fullName: resp.full_name,
        email: resp.email,
        picUrl: resp.pic_url
      };
      // Set username in chrome storage (sync)
      chrome.storage.sync.set({'user': user});
    }
  };
  xhr.send(JSON.stringify(data));
};


// Temporary measures to clear storage for token renewal
chrome.storage.sync.clear();
chrome.storage.local.clear();

// Click event for when icon is pressed to initiate authentication process
chrome.browserAction.onClicked.addListener(function() {
  chrome.storage.sync.get('access_token', function(obj) {
    if (!obj['access_token']) {
      fetchToken();
  });
});
