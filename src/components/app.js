import React, { Component } from 'react';
import AnnotatorButton from './annotator-button';
import AnnotatorView from './AnnotatorView';

export default class App extends Component {
  constructor(props) {
    super(props);
  }

  componentWillReceiveProps(nextProps) {
    if (!nextProps.annotatorShown) {
      $('#annotation-sidebar').animate({right: -(600)}, {queue: false, duration: 200});
    } else {
      setTimeout(function() {
        $('#annotation-sidebar').animate({right: -(300)}, {queue: false, duration: 200});
      }, 100);
    }
  }

  componentDidMount() {
    document.addEventListener('spotlightAnnotation', function(e) {
      this.props.checkSpotlightFromHighlights(e.detail.targetAnnotation);
    }.bind(this));

    this.props.fetchFriends();
  }

  render() {
    let { annotations, annotatorShown, showAnnotator} = this.props;
    return (
      <div className='app-container'>
        { !annotatorShown ?
          <AnnotatorButton updateView={showAnnotator} />
        : <AnnotatorView annotations={annotations} updateView={showAnnotator} />
        }
      </div>
    );
  }
};
