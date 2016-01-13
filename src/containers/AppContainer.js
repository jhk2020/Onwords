import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from '../components/App';
import showAnnotator from '../actions/showAnnotatorAction';
import { fetchFriends } from '../actions/friendsAction';

function mapStateToProps(state) {
  return {
    annotations: state.annotations,
    annotatorShown: state.annotatorShown,
    friends: state.friends
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showAnnotator: () => {
      dispatch(showAnnotator());
    },
    fetchFriends: () => {
      dispatch(fetchFriends());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
