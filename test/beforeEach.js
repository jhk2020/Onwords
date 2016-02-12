var node_modules = '../../node_modules/';


var beforeLoadFn;

beforeEach(function() {
  var page = require('webpage').create();

  page.onConsoleMessage = function(msg) {
      console.log('CONSOLE:', msg);
  };

  page.onError = function(msg, trace) {
    var msgStack = [msg];
    if (trace && trace.length) {
      msgStack.push('TRACE:');
      trace.forEach(function(t) {
        msgStack.push(' -> ' + t.file + ': ' + t.line + (t.function ? ' (in function "' + t.function +'")' : ''));
      });
    }
    // we need try..catch here as mocha throws error that catched by phantom.onError
    try {
      mocha.throwError(msgStack.join('\n'));
    } catch(e) { }

  page.onInitialized = function() {
    page.injectJs(node_modules + 'chai/chai.js');
    page.injectJs(node_modules + 'sinon/pkg/sinon.js');
    page.injectJs(node_modules + 'sinon-chrome/chrome.js');
    page.injectJs(node_modules + 'sinon-chrome/src/phantom-tweaks.js');
    page.evaluate(function() {
      assert = chai.assert;
    });
  };

  if (beforeLoadFn) {
    beforeLoadFn();
  }
});

afterEach(function() {
  page.close();
  beforeLoadFn = null;
})








