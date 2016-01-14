// Content script that runs on every new page/refresh

import initializeAnnotator from './init';
import { renderApp } from './renderApp';
import configStore from './store/configStore';

var code = window.location.hash.substring(1);
var initialAnnotationsUserId;
var initialState = {
  annotations: [],
  annotatorShown: false,
  friends: {},
  userInfo: {}
};

if (code.substring(code.length - 11)) {
  initialAnnotationsUserId = code.substring(0, code.length - 11);
}

var identityListener = function(changes) {
  // Check if storage change is about a new user being stored (i.e. extension is initialized)
  if (changes.user && changes.user.newValue) {
    // Check if there is no user Id associated with the URI (i.e. user wants to load friend's annotations)
    if (!initialAnnotationsUserId) {
      initialAnnotationsUserId = changes.user.newValue.id
    }
    window.localStorage.setItem('user_id', initialAnnotationsUserId);

    initialState.userInfo[initialAnnotationsUserId] = {
      shown: true,
      pic: changes.user.newValue.picUrl,
      name: changes.user.newValue.fullName
    }
    console.log(initialState);
    const store = configStore(initialState);
    renderApp(store);
    initializeAnnotator(initialAnnotationsUserId, store);
  }
};

chrome.storage.sync.get('user', function(obj) {
  // Check if user has extension turned on
  if (obj.user) {
    // Check if there is user Id associated with the URI
    if (!initialAnnotationsUserId) {
      // If no user ID on URI, set user's ID in local storage and render app
      initialAnnotationsUserId = obj.user.id;
      window.localStorage.setItem('user_id', initialAnnotationsUserId);
    }
    initialState.userInfo[initialAnnotationsUserId] = {
      shown: true,
      pic: changes.user.newValue.picUrl,
      name: changes.user.newValue.fullName
    }
    const store = configStore(initialState);
    renderApp(store);
    initializeAnnotator(initialAnnotationsUserId, store);
  } else {
    // Add listener for when user-info is stored in chrome storage (i.e. user initializes Onwords)
    chrome.storage.onChanged.addListener(identityListener);
  }
});
