var customAnnotationsModule = require('./customAnnotationsModule');

var initializeAnnotator = function(userId) {
  // Grab the URI to store in chrome storage (local) for reference
  var uri = window.location.href.split("?")[0];
  if (uri.substring(uri.length - 11) === 'onwords1991') {
    targetUri = uri.substring(0, uri.length - 13);
  } else {
    targetUri = uri;
  }

  // Clear annotations stored in chrome storage (local) from previous page visits
  chrome.storage.local.remove(targetUri);

  // Annotator module to include URI, title, and user ID in every annotation object
  var pageInfoModule = function() {
    return {
      beforeAnnotationCreated: function(ann) {
        ann.uri = targetUri;
        ann.title = document.getElementsByTagName('title')[0].innerHTML || document.querySelector('meta[name="twitter:title"]').getAttribute("content");
        ann.user_id = window.localStorage.getItem('user_id');
      }
    };
  };

  // Annotator app configuration
  var app = new annotator.App();
  app.include(annotator.ui.main)
    .include(annotator.storage.http, {
      prefix: 'https://test2server.herokuapp.com',
      urls: {
        create: '/api/annotations',
        update: '/api/annotations/{id}',
        destroy: '/api/annotations/{id}',
        search: '/api/search'
      }
    })
   .include(pageInfoModule)
   .include(customAnnotationsModule);

   app.start()
    .then(function() {
      app.annotations.load({
        uri: targetUri,
        user: userId
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
