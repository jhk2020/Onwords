import React from 'react';
import { connect } from 'react-redux';
import AnnotationsList from '../components/AnnotationsList';

import { checkSpotlight, mountSpotlight, unmountSpotlight } from '../actions/spotlightAction';

function mapStateToProps(state) {
  return {
    userInfo: state.userInfo,
    friends: state.friends,
    annotations: state.annotations
  }
}

function mapDispatchToProps(dispatch) {
  return {
    checkSpotlight: (newSpotlight) => {
      dispatch(checkSpotlight(newSpotlight));
    },
    unmountSpotlight: () =>  {
      dispatch(unmountSpotlight());
    }
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AnnotationsList);
