var App = require('./components/app');
var React = require('react');
var test = require('./test');

var code = window.location.hash.substring(1);
var userId;

if (code.substring(code.length - 11)) {
  userId = code.substring(0, code.length - 11);
}

chrome.storage.sync.get('user', function(obj) {
  if (obj.user) {
    if (!userId) {
      userId = obj.user.id;
      window.localStorage.setItem('user_id', userId);
    }
    renderComponents();
    test.annotate(userId);
  } else {
    chrome.storage.onChanged.addListener(identityListener);
  }
});

function renderComponents() {
  $('body').append("<div class='annotation-sidebar'></div>");
  $('.annotation-sidebar').append("<div id=scrollview></div>");

  React.render(<App />, document.getElementById('scrollview'));
};

function identityListener(changes) {
  if (changes.user && changes.user.newValue) {
    renderComponents();
    test.annotate(changes.user.newValue.id);
    window.localStorage.setItem('user_id', changes.user.newValue.id);
    chrome.storage.onChanged.removeListener(identityListener);
  }
};
