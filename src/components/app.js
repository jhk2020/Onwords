import React, { Component } from 'react';
import AnnotatorButton from './annotator-button';
import AnnotatorView from '../containers/AnnotatorViewContainer';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      showAnnotatorButton: true,
      showFriendsAnnotations: false,
      spotlight: '',
      annotations: []
    };
    this.updateView = this.updateView.bind(this);
  }

  updateView(action) {
    var self = this;
    switch(action) {
      case 'showAnnotatorButton':
      debugger;
        $(function() {
          $('#annotation-header').animate({width: '0px'}, {queue: false, duration: 200});
          $('#annotation-sidebar').animate({right: -(600)}, {queue: false, duration: 200});
        })
        .promise().done(function() {
          setTimeout(function() {
            self.setState({showFriendsAnnotations: false});
            self.setState({showAnnotatorButton: true});
            self.setState({spotlight: ''});
          }, 200)
        })
        break;
      case 'showAnnotatorView':
      debugger;
        self.setState({showFriendsAnnotations: true});
        self.setState({showFeedView: false}, function() {
          setTimeout(function() {
            $(function () {
              self.setState({showAnnotatorButton: false});
              $('#annotation-sidebar').animate({right: -(300)}, {queue: false, duration: 200});
              $('#annotation-header').animate({width: '300px'}, {queue: false, duration: 200});
            })
          }, 130)
        });
        break;
      default:
        console.log('nothing happened')
    }
  }

  componentDidMount() {
    var self = this;
    document.addEventListener('spotlightAnnotation', function(e) {
      debugger;
      self.setState({spotlight: e.detail.targetAnnotation});
      self.updateView('showAnnotatorView');
    });

    var uri = window.location.href.split("?")[0];
    if (uri.substring(uri.length-11) === 'onwords1991') {
      uri = uri.substring(0, uri.length-13);
    } else {
      uri = uri;
    }

    // chrome.storage.onChanged.addListener(function(changes) {
    //   debugger;
    //   if (changes[uri] && changes[uri].newValue !== undefined) {
    //     var newAnnotations = changes[uri].newValue;
    //     var oldAnnotations = self.state.annotations;
    //     var currentSpotlight = self.state.spotlight;
    //
    //     if (newAnnotations.length === 0) {
    //       currentSpotlight = '';
    //     } else {
    //       var intersection = {};
    //       for (var i = 0; i < oldAnnotations.length; i++) {
    //         intersection[oldAnnotations[i].id] = false;
    //       };
    //
    //       for (var i = 0; i < newAnnotations.length; i++) {
    //           intersection[newAnnotations[i].id] = true;
    //       }
    //
    //       if (intersection[currentSpotlight.id]) {
    //         currentSpotlight = currentSpotlight;
    //       } else {
    //         currentSpotlight = '';
    //       }
    //     }
    //
    //     self.setState({annotations: newAnnotations, spotlight: currentSpotlight});
    //   }
    // });
  }

  changeSpotlight(annotation) {
    debugger;
    this.setState({spotlight: annotation});
  }

  render() {
    debugger;
    return (
      <div className='app-container'>
        {this.state.showAnnotatorButton ? <AnnotatorButton updateView={this.updateView} /> : null}
        {this.state.showFriendsAnnotations ? <AnnotatorView annotations={this.state.annotations} changeSpotlight={this.changeSpotlight} spotlight={this.state.spotlight} updateView={this.updateView} /> : null}
      </div>
    );
  }
};
