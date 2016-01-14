// import { store } from './renderApp';
import { loadAnns, createAnn, deleteAnn } from './actions/annotationsAction';

var customAnnotationsModule = function(store) {
  // Grab the URI of the page
  var uri = window.location.href.split("?")[0];
  var targetUri;
  if (uri.substring(uri.length - 11) === 'onwords1991') {
    targetUri = uri.substring(0, uri.length - 13);
  } else {
    targetUri = uri;
  }

  return {
    annotationsLoaded: function(annotations) {
      store.dispatch(loadAnns(annotations));
    },

    beforeAnnotationCreated: function(annotation) {
      annotation.uri = targetUri;
      annotation.title = document.getElementsByTagName('title')[0].innerHTML || document.querySelector('meta[name="twitter:title"]').getAttribute("content");
      annotation.user_id = window.localStorage.getItem('user_id');
    },

    annotationCreated: function(annotation) {
      store.dispatch(createAnn(annotation));
      // chrome.storage.local.get(uri, function(obj) {
      //   if (!obj[uri]) {
      //     obj[uri] = [];
      //   }
      //   obj[uri].push(annotation);
      //   obj[uri].sort(function(a,b) {
      //     if (a.offsetTop < b.offsetTop) {
      //      return -1;
      //     } else if (a.offsetTop > b.offsetTop){
      //      return 1;
      //     } else {
      //        if (a.offsetLeft < b.offsetLeft) {
      //         return -1;
      //        } else if (a.offsetLeft > b.offsetLeft){
      //         return 1;
      //        }
      //     }
      //   });
      //   var newObj = {};
      //   newObj[uri] = obj[uri];
      //   chrome.storage.local.set(newObj);
      // });
    },

    beforeAnnotationDeleted: function(annotation) {
      store.dispatch(deleteAnn(annotation));
      // var id = annotation.id;
      // $('[data-annotation-id=' + id + ']').contents().unwrap();
      // chrome.storage.local.get(uri, function(obj) {
      //   for (var i = 0; i < obj[uri].length; i++) {
      //     if (obj[uri][i].id === annotation.id) {
      //       obj[uri].splice(i, 1);
      //       var newObj = {};
      //       newObj[uri] = obj[uri];
      //       chrome.storage.local.set(newObj);
      //     }
      //   }
      // });
    },

    // For toggling highlights
    beforeRenderDeleted: function(annotations) {
      chrome.storage.local.get(uri, function(obj) {
        for (var i = 0; i < annotations.length; i++) {
          var id = annotations[i].id;
          $('[data-annotation-id=' + id + ']').contents().unwrap();
          for (var j = 0; j < obj[uri].length; j++) {
            if (obj[uri][j].id === id) {
              obj[uri].splice(j, 1);
              break;
            }
          }
        }
        var newObj = {};
        newObj[uri] = obj[uri];
        chrome.storage.local.set(newObj);
      });
    },

    beforeAnnotationUpdated: function(annotation) {
      chrome.storage.local.get(uri, function(obj) {
        for (var i = 0; i < obj[uri].length; i++) {
          if (obj[uri][i].id === annotation.id) {
            obj[uri][i].text = annotation.text;
            var newObj = {};
            newObj[uri] = obj[uri];
            chrome.storage.local.set(newObj);
          }
        }
      });
    }
  }
};

module.exports = customAnnotationsModule;
