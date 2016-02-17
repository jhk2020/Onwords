import React from 'react';
import { connect } from 'react-redux';
import AnnotatorSidebar from '../components/AnnotatorSidebar';
import showMyFeed from '../actions/feedActions';

function mapStateToProps(state) {
  return {
    myFeedShown: state.myFeed.shown
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showMyFeed: dispatch(showMyFeed())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnotatorSidebar);
