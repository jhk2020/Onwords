import React, { Component } from 'react';
import MyAnnotationsButton from './MyAnnotationsButton';
import AnnotationsList from '../containers/AnnotationsListContainer';
import FriendsCarousel from '../containers/FriendsCarouselContainer';
import MyFeed from '../containers/MyFeedContainer';
import Paper from 'material-ui/lib/paper';

export default class AnnotatorSidebar extends Component {
  componentWillMount() {
    $(document).on('click', 'body', function(e) {
      if (e.target.className === 'annotator-icon') {
        return;
      }
      if(getSelection().toString()) {
        return;
      }
      if($(e.target).attr('data-reactid')) {
        e.preventDefault();
        return;
      }
      if($(e.target).is('[class^="annotator-"]') || $(e.target).is('[id^="annotator-"]')) {
          e.preventDefault();
          return;
      }
      this.props.updateView();
    }.bind(this));
  }

  componentWillUnmount() {
    $(document).off();
  }

  render() {
    const {annotations, toggleMyFeed, myFeedShown} = this.props;
    return <div className='friends-annotations-view-container'>
      <Paper className='friends-annotations-header' zDepth={2}>
        <div className='friends-annotations-buttons-container'>
          <div className='annotations-title'>ONWORDS</div>
          <MyAnnotationsButton toggleMyFeed={toggleMyFeed}/>
        </div>
        {!myFeedShown ?
          <div>
            <div className='friends-heading'>People You Follow</div>
            <FriendsCarousel />
          </div>
          : <MyFeed toggleMyFeed={toggleMyFeed}/>
        }
      </Paper>
      <br/>
      {!myFeedShown ?
        <div className='friends-annotations-list'>
          <AnnotationsList />
        </div>
        : null
      }
    </div>
  }
};
