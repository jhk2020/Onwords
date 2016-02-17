var customAnnotationsModule = require('./customAnnotationsModule');

var initializeAnnotator = function(initialAnnotationsUserId, store) {
  // Grab the URI to store in chrome storage (local) for reference
  var uri = window.location.href.split("?")[0];
  var targetUri;
  if (uri.substring(uri.length - 11) === 'onwords1991') {
    targetUri = uri.substring(0, uri.length - 13);
  } else {
    targetUri = uri;
  }

  // Clear annotations stored in chrome storage (local) from previous page visits
  chrome.storage.local.remove(targetUri);

  // Annotator app configuration
  var app = new annotator.App();
  app.include(annotator.ui.main)
    .include(annotator.storage.http, {
      prefix: 'http://localhost:9000',
      urls: {
        create: '/api/annotations',
        update: '/api/annotations/{id}',
        destroy: '/api/annotations/{id}',
        search: '/api/search'
      }
    })
   .include(customAnnotationsModule, store);

   // Start the app and load the annotations
   app.start()
    .then(function() {
      app.annotations.load({
        uri: targetUri,
        user: initialAnnotationsUserId
      });
    });

  // Set up custom listener for when user wants to toggle on friend's annotations
  document.addEventListener('getFriendAnnotations', function(e) {
    app.annotations.load({
      uri: targetUri,
      user: e.detail.userId
    });
  });

  // Listener for message from background script to destroy Annotator app
  chrome.runtime.onMessage.addListener(function(request) {
    if (request.message === 'destroyApp') {
      document.body.removeChild(document.getElementById('annotation-sidebar'));
      app.destroy();
    }
  });
};

module.exports = initializeAnnotator;
