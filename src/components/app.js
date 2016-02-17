import React, { Component } from 'react';
import AnnotatorIcon from './AnnotatorIcon';
import AnnotatorSidebar from '../containers/AnnotatorSidebarContainer';

export default class App extends Component {
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
    const { annotations, showAnnotator, annotatorShown} = this.props;
    return <div className='app-container'>
      {!annotatorShown ? <AnnotatorIcon updateView={showAnnotator} />
    : <AnnotatorSidebar annotations={annotations} updateView={showAnnotator} /> }
    </div>
  }
};

// GET RID OF USING LOCAL STORAGE
