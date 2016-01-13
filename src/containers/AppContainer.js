import React, { Component } from 'react';
import { connect } from 'react-redux';
import App from '../components/App';
import showAnnotator from '../actions/showAnnotatorAction';

function mapStateToProps(state) {
  return {
    annotations: state.annotations,
    annotatorShown: state.annotatorShown
  }
}

function mapDispatchToProps(dispatch) {
  return {
    showAnnotator: () => {
      dispatch(showAnnotator());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
