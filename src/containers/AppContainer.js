import React from 'react';
import { connect } from 'react-redux';
import App from '../components/App';
import showAnnotator from '../actions/showAnnotatorAction';
import { fetchFriendsAsync, toggleFriend } from '../actions/friendsAction';
import { mountSpotlight } from '../actions/spotlightAction';

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
    mountSpotlight: (newSpotlight) => {
      dispatch(mountSpotlight(newSpotlight));
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
