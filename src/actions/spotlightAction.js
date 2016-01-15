export function checkSpotlight(newSpotlight) {
  return (dispatch, getState) => {
    const { spotlight } = getState();
    if (spotlight === newSpotlight) {
      dispatch(moveToSpotlight());
    } else {
      dispatch(changeHighlights(newSpotlight));
    }
  }
}

export function mountSpotlight(newSpotlight) {
  return {
    type: 'MOUNT_SPOTLIGHT',
    newSpotlight
  }
}

export function unmountSpotlight() {
  return {
    type: 'UNMOUNT_SPOTLIGHT'
  }
}

function changeHighlights(newSpotlight) {
  return {
    type: 'CHANGE_HIGHLIGHTS',
    newSpotlight
  }
}

function moveToSpotlight() {
  return {
    type: 'MOVE_TO_SPOTLIGHT'
  }
}
