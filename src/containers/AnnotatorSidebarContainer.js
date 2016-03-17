import React from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import AnnotatorSidebar from '../components/AnnotatorSidebar';
import { toggleMyFeed, searchFeed } from '../actions/feedActions';

function mapStateToProps(state) {
  return {
    myFeedShown: state.myFeed.shown
  }
}

function mapDispatchToProps(dispatch) {
  return {
    searchFeed: _.debounce(
      (query) => {
        dispatch(searchFeed(query));
      }, 200),
    toggleMyFeed: (result) => {
      dispatch(toggleMyFeed(result));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnotatorSidebar);
