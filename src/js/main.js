// Content script that runs on every new page/refresh

var App = require('./components/app');
var React = require('react');
var initializeAnnotator = require('./test');

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
  if (changes.user && changes.user.newValue) {
    if (!userId) {
      userId = changes.user.newValue.id
    }
    window.localStorage.setItem('user_id', changes.user.newValue.id);
    renderComponents();
    test.annotate(userId);
  }
};

var code = window.location.hash.substring(1);
var userId;

if (code.substring(code.length - 11)) {
  userId = code.substring(0, code.length - 11);
}

chrome.storage.sync.get('user', function(obj) {
  // Check if user has extension turned on
  if (obj.user) {
    // Check if user wants to load friend's annotations
    // If not, set user's id in local storage and render app
    if (!userId) {
      userId = obj.user.id;
      window.localStorage.setItem('user_id', userId);
    }
    renderComponents();
    test.annotate(userId);
  } else {
    // Listens for any changes to chrome storage(?)
    chrome.storage.onChanged.addListener(identityListener);
  }
});
