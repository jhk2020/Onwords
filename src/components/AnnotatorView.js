import React, { Component } from 'react';
import MyAnnotationsButton from './my-annotations-button';
import AnnotationsList from '../containers/annotationsListContainer';
import FriendsCarousel from '../containers/FriendsCarouselContainer';

export default class AnnotatorView extends Component {
  constructor(props) {
    super(props);
  }
  componentWillMount() {
    $(document).on('click', 'body', function(e) {
      if (e.target.className === 'annotator-button') {
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
    let {annotations} = this.props;
    return (
      <div className='friends-annotations-view-container'>
        <div className='friends-annotations-header'>
          <div className='friends-annotations-buttons-container'>
            <div className='annotations-title'>ANNOTATIONS</div>
            <MyAnnotationsButton />
          </div>

          <div className='friends-heading'>People You Follow</div>
            <FriendsCarousel />
        </div>
        <br></br>
          <div className='friends-annotations-list'>
             <AnnotationsList />
          </div>
      </div>
    );
  }
};
