// Content script that runs on every new page/refresh

var App = require('./components/app');
var React = require('react');
var initializeAnnotator = require('./init');

var code = window.location.hash.substring(1);
var initialAnnotationsUserId;

if (code.substring(code.length - 11)) {
  initialAnnotationsUserId = code.substring(0, code.length - 11);
}

var renderComponents = function() {
  var font1 = "<link href='https://fonts.googleapis.com/css?family=Source+Sans+Pro:300' rel='stylesheet' type='text/css'>";
  var font2 = "<link href='https://fonts.googleapis.com/css?family=Lato:300' rel='stylesheet' type='text/css'>";
  var font3 = "<link href='https://fonts.googleapis.com/css?family=Libre+Baskerville' rel='stylesheet' type='text/css'>";
  var font4 = "<link href='https://fonts.googleapis.com/css?family=Noto+Sans' rel='stylesheet' type='text/css'>";
  $('head').after(font1);
  $('head').after(font2);
  $('head').after(font3);
  $('head').after(font4);

  $('body').append("<div id='annotation-sidebar'></div>");
  $('#annotation-sidebar').append("<div id='annotation-header'></div>")
  $('#annotation-sidebar').append("<div id='annotation-scroll'></div>")
  React.render(<App />, document.getElementById('annotation-scroll'));
};

var identityListener = function(changes) {
  // Check if storage change is about a new user being stored (i.e. extension is initialized)
  if (changes.user && changes.user.newValue) {
    // Check if there is no user Id associated with the URI (i.e. user wants to load friend's annotations)
    if (!initialAnnotationsUserId) {
      initialAnnotationsUserId = changes.user.newValue.id
    }
    window.localStorage.setItem('user_id', changes.user.newValue.id);
    renderComponents();
    initializeAnnotator(initialAnnotationsUserId);
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
    renderComponents();
    initializeAnnotator(initialAnnotationsUserId);
  } else {
    // Add listener for when user-info is stored in chrome storage (i.e. user initializes Onwords)
    chrome.storage.onChanged.addListener(identityListener);
  }
});
