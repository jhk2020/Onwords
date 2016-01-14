import React, { Component } from 'react';
import { connect } from 'react-redux';
import FriendsCarousel from '../components/FriendsCarousel';
import toggleFriendAnnotations from '../actions/friendsCarouselAction';

function mapStateToProps(state) {
  return {
    friends: state.friends
  }
}

function mapDispatchToProps(dispatch) {
  return {
    toggleFriendAnnotations: (friendId) => {
      dispatch(toggleFriendAnnotations(friendId));
    }
  }
}


export default connect(mapStateToProps, mapDispatchToProps)(FriendsCarousel);
