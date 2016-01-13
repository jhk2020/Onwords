import React, { Component } from 'react';
import { connect } from 'react-redux';
import AnnotatorView from '../components/AnnotatorView';

function mapStateToProps(state) {
  return {
    annotations: state.annotations
  }
}

export default connect(mapStateToProps)(AnnotatorView);
