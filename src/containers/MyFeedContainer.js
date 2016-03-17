import React from 'react';
import { connect } from 'react-redux';
import MyFeed from '../components/MyFeed';
import { loadMyFeed } from '../actions/feedActions';

function mapStateToProps(state) {
  return {
    myFeedInfo: state.myFeed.shownFeed
  }
}

function mapDispatchToProps(dispatch) {
  return {
    loadMyFeed: () => {
      dispatch(loadMyFeed());
    }
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(MyFeed);
