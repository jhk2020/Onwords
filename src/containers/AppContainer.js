import React from 'react';
import { connect } from 'react-redux';
import App from '../components/App';
import showAnnotator from '../actions/showAnnotatorAction';
import { fetchFriendsAsync, toggleFriend } from '../actions/friendsAction';
import { checkSpotlightFromHighlights } from '../actions/spotlightAction';

function mapStateToProps(state) {
  return {
    annotations: state.annotations,
    annotatorShown: state.annotatorShown,
    friends: state.friends,
    userInfo: state.userInfo
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showAnnotator: () => {
      dispatch(showAnnotator());
    },
    fetchFriends: () => {
      dispatch(fetchFriendsAsync());
    },
    toggleFriend: () => {
      dispatch(toggleFriend());
    },
    checkSpotlightFromHighlights: (newSpotlight) => {
      dispatch(checkSpotlightFromHighlights(newSpotlight));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
