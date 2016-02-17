import React from 'react';
import { connect } from 'react-redux';
import AnnotatorSidebar from '../components/AnnotatorSidebar';
import { toggleMyFeed } from '../actions/feedActions';

function mapStateToProps(state) {
  return {
    myFeedShown: state.myFeed.shown
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleMyFeed: (result) => {
      dispatch(toggleMyFeed(result));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnotatorSidebar);
