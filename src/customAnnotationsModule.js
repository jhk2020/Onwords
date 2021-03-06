import { loadAnns, createAnn, deleteAnn, updateAnn } from './actions/annotationsAction';

var customAnnotationsModule = function(store) {
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
    },

    beforeAnnotationDeleted: function(annotation) {
      store.dispatch(deleteAnn(annotation));
    },

    beforeAnnotationUpdated: function(annotation) {
      store.dispatch(updateAnn(annotation));
    }
  }
};

module.exports = customAnnotationsModule;
